import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TeamLeadSidePanel from '../TeamLeadSidePanel';

const ManageTeam = () => {
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDate, setNewTaskDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTaskTime, setNewTaskTime] = useState('08:00');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [employeeUsernameMap, setEmployeeUsernameMap] = useState({});
  const [editTask, setEditTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskUpdateData, setTaskUpdateData] = useState({
    taskName: '',
    date: '',
    time: '',
    status: ''
  });

  // Fetch team lead ID from local storage
  const teamLeadId = localStorage.getItem('id');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/teams/by-lead/${teamLeadId}`);
        const teamsData = response.data;
        setTeams(teamsData);

        // Extract employee options directly from the teams data
        const allEmployees = teamsData.flatMap(team =>
          team.memberUsernames.map((username, index) => ({
            username,
            id: team.memberIds[index],
          }))
        );
        setEmployeeOptions(allEmployees);
        // Create a map of employee IDs to usernames
        const usernameMap = allEmployees.reduce((map, emp) => {
          map[emp.id] = emp.username;
          return map;
        }, {});
        setEmployeeUsernameMap(usernameMap);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/employeetasks/team-lead/${teamLeadId}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTeams();
    fetchTasks();
  }, [teamLeadId]);

  useEffect(() => {
    if (selectedTeam && selectedTeam.memberUsernames) {
      const employees = selectedTeam.memberUsernames.map((username, index) => ({
        username,
        id: selectedTeam.memberIds[index],
      }));
      setEmployeeOptions(employees);
    } else {
      setEmployeeOptions([]);
    }
  }, [selectedTeam]);

  const handleAssignTask = async () => {
    if (selectedTeam && selectedEmployee) {
      try {
        const payload = {
          taskName: newTaskName,
          teamLeadId: selectedTeam.leadId,
          employeeId: selectedEmployee.id,
          date: newTaskDate,
          time: newTaskTime,
          status: 'Not Started', // Set default status
        };

        const response = await axios.post('http://localhost:8080/api/employeetasks/post', payload);
        setTasks((prev) => [...prev, response.data]);
        setNewTaskName('');
        setNewTaskDate(new Date().toISOString().split('T')[0]);
        setNewTaskTime('08:00');
        setSelectedEmployee(null);
      } catch (error) {
        console.error('Error assigning task:', error);
      }
    } else {
      alert('Please select an employee to assign the task to.');
    }
  };

  const handleOpenDialog = (task) => {
    setEditTask(task);
    setTaskUpdateData({
      taskName: task.taskName,
      date: task.date,
      time: task.time,
      status: task.status
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditTask(null);
  };

  const handleUpdateTask = async () => {
    if (editTask) {
      try {
        await axios.put(`http://localhost:8080/api/employeetasks/${editTask.id}`, taskUpdateData);
        setTasks(prev => prev.map(task => (task.id === editTask.id ? { ...task, ...taskUpdateData } : task)));
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/employeetasks/${taskId}`);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <TeamLeadSidePanel />
      <Typography variant="h4" gutterBottom>
        Manage Team
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Teams</Typography>
        <List>
          {teams.map((team) => (
            <ListItem
              key={team.id}
              button
              onClick={() => setSelectedTeam(team)}
            >
              <ListItemText
                primary={`Team: ${team.name}`}
                secondary={`Project: ${team.project.name} - Lead: ${team.leadUsername}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {selectedTeam && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Assign Task to Team</Typography>
          <TextField
            label="Task Name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time"
            type="time"
            value={newTaskTime}
            onChange={(e) => setNewTaskTime(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Autocomplete
            options={employeeOptions}
            getOptionLabel={(option) => option.username}
            onChange={(event, value) => {
              if (value) {
                setSelectedEmployee(value);
              } else {
                setSelectedEmployee(null);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Employee"
                variant="outlined"
                fullWidth
              />
            )}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAssignTask}
          >
            Assign Task
          </Button>
        </Paper>
      )}

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Tasks</Typography>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <ListItemText
                primary={`Task: ${task.taskName}`}
                secondary={`Assigned to: ${employeeUsernameMap[task.employeeId] || `Employee ${task.employeeId}`} - Due Date: ${task.date} ${task.time} - Status: ${task.status}`}
              />
              <IconButton onClick={() => handleOpenDialog(task)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Dialog for updating task */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            value={taskUpdateData.taskName}
            onChange={(e) => setTaskUpdateData(prev => ({ ...prev, taskName: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            value={taskUpdateData.date}
            onChange={(e) => setTaskUpdateData(prev => ({ ...prev, date: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time"
            type="time"
            value={taskUpdateData.time}
            onChange={(e) => setTaskUpdateData(prev => ({ ...prev, time: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Status"
            value={taskUpdateData.status}
            onChange={(e) => setTaskUpdateData(prev => ({ ...prev, status: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateTask} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageTeam;
