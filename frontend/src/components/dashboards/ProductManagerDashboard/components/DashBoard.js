import React, { useState, useEffect } from 'react';
import ProductManagerSidePanel from '../ProductManagerSidePanel';
import { Box, Typography, Paper, Grid, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const StyledPaper = styled(Paper)({
  padding: '16px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsResponse, projectsResponse, teamLeadsResponse, employeesResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/teams'),
          axios.get('http://localhost:8080/api/teams/projects'),
          axios.get('http://localhost:8080/api/teams/users/team_lead'),
          axios.get('http://localhost:8080/api/teams/users/employee')
        ]);

        setTeams(teamsResponse.data);
        setProjects(projectsResponse.data);
        setTeamLeads(teamLeadsResponse.data);
        setEmployees(employeesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const numberOfTeams = teams.length;
  const numberOfProjects = projects.length;
  const numberOfCompletedProjects = projects.filter(p => p.completed).length;
  const numberOfEmployeesWorking = employees.length;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Prepare data for pie chart
  const pieData = filteredProjects.map(project => ({
    name: project.name,
    value: 1  // Each project is counted as one unit for the pie chart
  }));

  const COLORS = ['#FF9999', '#66B2FF', '#99FF99', '#FFCC99'];

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductManagerSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Product Manager Dashboard
        </Typography>
        
        <StyledPaper sx={{ mb: 3 }}>
          <TextField
            label="Search Projects"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </StyledPaper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>Project Overview</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        const { name } = payload[0].payload;
                        return (
                          <div style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
                            <p>{name}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>  
            <StyledPaper>
              <Typography variant="h6" gutterBottom>Stats</Typography>
              <Typography variant="body1">Number of teams: {numberOfTeams}</Typography>
              <Typography variant="body1">Number of projects: {numberOfProjects}</Typography>
              <Typography variant="body1">Number of completed projects: {numberOfCompletedProjects}</Typography>
              <Typography variant="body1">Number of employees working on projects: {numberOfEmployeesWorking}</Typography>
            </StyledPaper>
          </Grid>

          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>Projects</Typography>
              {filteredProjects.map((project) => (
                <Typography key={project.id} variant="body1">
                  <strong>{project.name}:</strong> {project.description}
                </Typography>
              ))}
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
