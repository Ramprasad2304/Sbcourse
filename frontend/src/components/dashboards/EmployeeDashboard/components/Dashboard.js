import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EmployeeSidePanel from '../EmployeeSidePanel';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState({});
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employee ID from local storage
        const employeeId = JSON.parse(localStorage.getItem('id'));
        if (!employeeId) return;

        // Fetch tasks for the employee
        const tasksResponse = await axios.get(`http://localhost:8080/api/employeetasks/employee/${employeeId}`);
        setTasks(tasksResponse.data);

        // Initialize status state
        const initialStatus = {};
        tasksResponse.data.forEach(task => {
          initialStatus[task.id] = task.status;
        });
        setStatus(initialStatus);

        // Fetch team details for the employee
        const teamResponse = await axios.get(`http://localhost:8080/api/teams/by-employee/${employeeId}`);
        setTeam(teamResponse.data[0]); // Assuming only one team per employee
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Update status of the task using PUT method
      await axios.put(`http://localhost:8080/api/employeetasks/${taskId}/status/${newStatus}`);
      // Update local state with the new status
      setStatus(prevStatus => ({
        ...prevStatus,
        [taskId]: newStatus
      }));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' , ml:1}}>
      <EmployeeSidePanel sx={{ flexShrink: 0, width: 150 }} /> {/* Adjust width and prevent shrinking */}
      <Box sx={{ flexGrow: 1, p: 0 }}> {/* Adjust padding to reduce margin */}
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Employee Dashboard
        </Typography>

        {/* Display team details */}
        {team && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
              My team Details
            </Typography>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{`Team Name: ${team.name}`}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Project: {team.project.name}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Description: {team.project.description}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Lead Username: {team.leadUsername}</Typography>
                <Typography variant="body2">Members: {team.memberUsernames.join(', ')}</Typography>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Display tasks */}
        <Grid container spacing={3}>
          {tasks.map(task => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card sx={{ mb: 2, width: 300, height: 200 }}>
                <CardContent>
                  <Typography variant="h6" noWrap>{task.taskName}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Date: {task.date}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>Time: {task.time}</Typography>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status[task.id] || task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                       label="status"
                    >
                      <MenuItem value="Not Started">Not Started</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
