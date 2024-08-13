import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import axios from 'axios';
import ProductManagerSidePanel from '../ProductManagerSidePanel';
import CloseIcon from '@mui/icons-material/Close';

const AssignEmployees = () => {
  const [teamName, setTeamName] = useState('');
  const [employees, setEmployees] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState('');
  const [teams, setTeams] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [dialogMode, setDialogMode] = useState('create'); // 'create' or 'edit'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamLeadsResponse, employeesResponse, projectsResponse, teamsResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/teams/users/team_lead'),
          axios.get('http://localhost:8080/api/teams/users/employee'),
          axios.get('http://localhost:8080/api/projects/allprojects'),
          axios.get('http://localhost:8080/api/teams')
        ]);

        setTeamLeads(teamLeadsResponse.data);
        setEmployees(employeesResponse.data);
        setProjects(projectsResponse.data);
        setTeams(teamsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateTeam = () => {
    axios.post('http://localhost:8080/api/teams', {
      name: teamName,
      leadId: selectedTeamLead,
      memberIds: selectedEmployees.map(emp => emp.id),
      project: { id: selectedProject }
    })
    .then(response => {
      alert('Team created successfully');
      setOpenDialog(false);
      setTeamName('');
      setSelectedProject('');
      setSelectedEmployees([]);
      setSelectedTeamLead('');
      setTeams(prevTeams => [...prevTeams, response.data]);
    })
    .catch(error => {
      console.error('There was an error creating the team!', error);
    });
  };

  const handleEditTeam = () => {
    axios.put(`http://localhost:8080/api/teams/${editingTeam.id}`, {
      name: teamName,
      leadId: selectedTeamLead,
      memberIds: selectedEmployees.map(emp => emp.id),
      project: { id: selectedProject }
    })
    .then(response => {
      alert('Team updated successfully');
      setOpenDialog(false);
      setTeamName('');
      setSelectedProject('');
      setSelectedEmployees([]);
      setSelectedTeamLead('');
      setEditingTeam(null);
      setTeams(prevTeams => prevTeams.map(team => team.id === editingTeam.id ? response.data : team));
    })
    .catch(error => {
      console.error('There was an error updating the team!', error);
    });
  };

  const handleDeleteTeam = (teamId) => {
    axios.delete(`http://localhost:8080/api/teams/${teamId}`)
      .then(() => {
        alert('Team deleted successfully');
        setTeams(teams.filter(team => team.id !== teamId));
      })
      .catch(error => {
        console.error('There was an error deleting the team!', error);
      });
  };

  const handleEditClick = (team) => {
    setEditingTeam(team);
    setTeamName(team.name);
    setSelectedProject(team.project?.id || '');
    setSelectedTeamLead(team.leadId || '');
    setSelectedEmployees(team.members || []);
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setTeamName('');
    setSelectedProject('');
    setSelectedEmployees([]);
    setSelectedTeamLead('');
    setEditingTeam(null);
  };

  const handleEmployeeAdd = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee && !selectedEmployees.some(emp => emp.id === employee.id)) {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
  };

  const handleEmployeeRemove = (employeeId) => {
    setSelectedEmployees(selectedEmployees.filter(emp => emp.id !== employeeId));
  };

  const handleTeamLeadChange = (event) => {
    setSelectedTeamLead(event.target.value);
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleCreateTeamButtonClick = () => {
    setDialogMode('create');
    setOpenDialog(true);
  };

  return (
    <div>
      <ProductManagerSidePanel />
      <Container>
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Assign Employees
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTeamButtonClick}
            style={{ marginBottom: '20px' }}
          >
            Create Team
          </Button>
          <Typography variant="h5" gutterBottom>
            Created Teams
          </Typography>
          {teams.map(team => (
            <Paper key={team.id} style={{ padding: '10px', margin: '10px 0' }}>
              <Typography variant="h6">{team.name}</Typography>
              <Typography>Team Lead: {team.leadUsername || 'N/A'}</Typography>
              <Typography>
                Members: {team.memberUsernames && team.memberUsernames.length > 0 
                  ? team.memberUsernames.join(', ') 
                  : 'No members assigned'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditClick(team)}
                style={{ marginTop: '10px' }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteTeam(team.id)}
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Delete
              </Button>
            </Paper>
          ))}
        </Paper>
      </Container>

      {/* Dialog for Creating and Editing Teams */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogMode === 'create' ? 'Create Team' : 'Edit Team'}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDialogClose}
            aria-label="close"
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Team Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Project</InputLabel>
            <Select
              value={selectedProject}
              onChange={handleProjectChange}
              label="Project"
            >
              {projects.map(project => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Team Lead</InputLabel>
            <Select
              value={selectedTeamLead}
              onChange={handleTeamLeadChange}
              label="Team Lead"
            >
              {teamLeads.map(teamLead => (
                <MenuItem key={teamLead.id} value={teamLead.id}>
                  {teamLead.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Employees</InputLabel>
            <Select
              multiple
              value={selectedEmployees.map(emp => emp.id)}
              onChange={(e) => {
                const selectedIds = e.target.value;
                setSelectedEmployees(employees.filter(emp => selectedIds.includes(emp.id)));
              }}
              label="Employees"
            >
              {employees.map(employee => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <List>
            {selectedEmployees.map(employee => (
              <ListItem key={employee.id}>
                <ListItemText primary={employee.username} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleEmployeeRemove(employee.id)}>
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {dialogMode === 'edit' && (
            <Typography variant="body1" gutterBottom style={{ marginTop: '20px' }}>
              {selectedEmployees.length === 0 ? 'No employees selected' : `Selected Employees: ${selectedEmployees.map(emp => emp.username).join(', ')}`}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={dialogMode === 'create' ? handleCreateTeam : handleEditTeam}
            color="primary"
          >
            {dialogMode === 'create' ? 'Create Team' : 'Update Team'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AssignEmployees;
