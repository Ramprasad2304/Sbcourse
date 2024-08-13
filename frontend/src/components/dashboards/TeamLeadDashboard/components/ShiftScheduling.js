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
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TeamLeadSidePanel from '../TeamLeadSidePanel';

const ShiftScheduling = () => {
  const [teams, setTeams] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newScheduleDateTime, setNewScheduleDateTime] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const teamLeadId = localStorage.getItem('id');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/teams/by-lead/${teamLeadId}`);
        const teamsData = response.data;
        setTeams(teamsData);

        const allEmployees = teamsData.flatMap(team =>
          team.memberUsernames.map((username, index) => ({
            username,
            id: team.memberIds[index],
          }))
        );
        setEmployeeOptions(allEmployees);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [teamLeadId]);

  useEffect(() => {
    const fetchSchedules = async () => {
      if (selectedTeam) {
        try {
          const response = await axios.get(`http://localhost:8080/api/schedules/employee/${selectedTeam.memberIds.join(',')}`);
          setSchedules(response.data);
        } catch (error) {
          console.error('Error fetching schedules:', error);
        }
      }
    };

    fetchSchedules();
  }, [selectedTeam]);

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

  useEffect(() => {
    const fetchTimeOffRequests = async () => {
      if (selectedEmployee) {
        try {
          const response = await axios.get(`http://localhost:8080/api/timeoffs/by-employee/${selectedEmployee.username}`);
          setTimeOffRequests(response.data);
        } catch (error) {
          console.error('Error fetching time off requests:', error);
        }
      }
    };

    fetchTimeOffRequests();
  }, [selectedEmployee]);

  const handleAddSchedule = async () => {
    if (selectedTeam && selectedEmployee && newScheduleDateTime) {
      try {
        const payload = {
          employeeId: selectedEmployee.id,
          employeeUsername: selectedEmployee.username,
          scheduleDateTime: newScheduleDateTime,
        };

        const response = await axios.post('http://localhost:8080/api/schedules', payload);
        setSchedules((prev) => [...prev, response.data]);
        setNewScheduleDateTime('');
        setSelectedEmployee(null);
      } catch (error) {
        console.error('Error adding schedule:', error);
      }
    } else {
      alert('Please select an employee and set a schedule date and time.');
    }
  };

  const handleEditSchedule = async () => {
    if (editingSchedule && newScheduleDateTime) {
      try {
        const updatedSchedule = {
          ...editingSchedule,
          scheduleDateTime: newScheduleDateTime,
        };

        const response = await axios.put(`http://localhost:8080/api/schedules/${editingSchedule.id}`, updatedSchedule);
        setSchedules((prev) =>
          prev.map((sched) => (sched.id === editingSchedule.id ? response.data : sched))
        );
        setEditingSchedule(null);
        setNewScheduleDateTime('');
      } catch (error) {
        console.error('Error updating schedule:', error);
      }
    } else {
      alert('Please set a schedule date and time.');
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/schedules/${id}`);
      setSchedules((prev) => prev.filter((sched) => sched.id !== id));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleOpenStatusDialog = (requestId) => {
    setSelectedRequestId(requestId);
    setStatusDialogOpen(true);
  };

  const handleStatusChange = async () => {
    if (selectedRequestId && status) {
      try {
        const payload = { status };
  
        await axios.put(`http://localhost:8080/api/timeoffs/update-status/${selectedRequestId}`, payload, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        setTimeOffRequests((prev) =>
          prev.map((req) =>
            req.id === selectedRequestId ? { ...req, status } : req
          )
        );
        setStatusDialogOpen(false);
      } catch (error) {
        console.error('Error updating time-off status:', error);
      }
    }
  };
  

  return (
    <Box sx={{ p: 3 }}>
      <TeamLeadSidePanel />
      <Typography variant="h4" gutterBottom>
        Shift Scheduling
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
          <Typography variant="h6">Add/Edit Schedule</Typography>
          <br></br>
          <TextField
            label="Schedule Date & Time"
            type="datetime-local"
            value={newScheduleDateTime}
            onChange={(e) => setNewScheduleDateTime(e.target.value)}
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
          {editingSchedule ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleEditSchedule}
            >
              Update Schedule
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSchedule}
            >
              Add Schedule
            </Button>
          )}
        </Paper>
      )}

      {selectedEmployee && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Time-Off Requests</Typography>
          <List>
            {timeOffRequests.map((request) => (
              <ListItem key={request.id}>
                <ListItemText
                  primary={`Employee: ${request.employeeName || 'Unknown'}`}
                  secondary={`Reason: ${request.reason || 'Unknown'} - Status: ${request.status || 'Pending'} - Requested At: ${request.requestDate ? new Date(request.requestDate).toLocaleString() : 'Unknown'}`}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpenStatusDialog(request.id)}
                  sx={{ mr: 1 }}
                >
                  Update Status
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <Dialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
      >
        <DialogTitle>Update Time-Off Status</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <FormControlLabel value="approved" control={<Radio />} label="Approved" />
              <FormControlLabel value="denied" control={<Radio />} label="Denied" />
              <FormControlLabel value="pending" control={<Radio />} label="Pending" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusChange} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShiftScheduling;
