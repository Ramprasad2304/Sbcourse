import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, List, ListItem, ListItemText, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ProductManagerSidePanel from '../ProductManagerSidePanel';

const ViewTeamLeadSchedule = () => {
  const [teamLeads, setTeamLeads] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState(null);
  const [newScheduleDateTime, setNewScheduleDateTime] = useState('');
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateStatusDialog, setOpenUpdateStatusDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchTeamLeads = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/product_manager/schedule/team_leads');
        if (Array.isArray(response.data)) {
          setTeamLeads(response.data);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching team leads:', error);
      }
    };

    fetchTeamLeads();
  }, []);

  useEffect(() => {
    if (selectedTeamLead) {
      const fetchSchedules = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/product_manager/schedule/schedule/${selectedTeamLead.id}`);
          if (response.status === 204) {
            console.log('No content available for this team lead.');
            setSchedules([]);
          } else if (Array.isArray(response.data)) {
            setSchedules(response.data);
          } else {
            console.error('Unexpected response data:', response.data);
          }
        } catch (error) {
          console.error('Error fetching schedules:', error);
        }
      };

      fetchSchedules();
    }
  }, [selectedTeamLead]);

  useEffect(() => {
    if (selectedTeamLead) {
      const fetchTimeOffRequests = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/timeoffrequests');
          if (Array.isArray(response.data)) {
            const filteredRequests = response.data.filter(request => request.teamLeadId === selectedTeamLead.id);
            setTimeOffRequests(filteredRequests);
          } else {
            console.error('Unexpected response data:', response.data);
          }
        } catch (error) {
          console.error('Error fetching time off requests:', error);
        }
      };

      fetchTimeOffRequests();
    }
  }, [selectedTeamLead]);

  const handleOpenAssignDialog = () => {
    setOpenAssignDialog(true);
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false);
    setNewScheduleDateTime('');
  };

  const handleAssignSchedule = async () => {
    if (selectedTeamLead) {
      try {
        const payload = {
          teamLeadId: selectedTeamLead.id,
          teamLeadUsername: selectedTeamLead.username,
          scheduleDateTime: newScheduleDateTime
        };

        const response = await axios.post('http://localhost:8080/api/product_manager/schedule/schedule', payload);
        setSchedules(prev => [...prev, response.data]);
        handleCloseAssignDialog();
      } catch (error) {
        console.error('Error assigning schedule:', error);
      }
    }
  };

  const handleOpenEditDialog = (schedule) => {
    setSelectedSchedule(schedule);
    setNewScheduleDateTime(schedule.scheduleDateTime);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedSchedule(null);
    setNewScheduleDateTime('');
  };

  const handleUpdateSchedule = async () => {
    if (selectedSchedule) {
      try {
        const payload = {
          ...selectedSchedule,
          scheduleDateTime: newScheduleDateTime
        };

        const response = await axios.put(`http://localhost:8080/api/product_manager/schedule/schedule/${selectedSchedule.id}`, payload);
        setSchedules(prev => prev.map(schedule => schedule.id === selectedSchedule.id ? response.data : schedule));
        handleCloseEditDialog();
      } catch (error) {
        console.error('Error updating schedule:', error);
      }
    }
  };

  const handleOpenDeleteDialog = (schedule) => {
    setSelectedSchedule(schedule);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedSchedule(null);
  };

  const handleDeleteSchedule = async () => {
    if (selectedSchedule) {
      try {
        await axios.delete(`http://localhost:8080/api/product_manager/schedule/schedule/${selectedSchedule.id}`);
        setSchedules(prev => prev.filter(schedule => schedule.id !== selectedSchedule.id));
        handleCloseDeleteDialog();
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };

  const handleOpenUpdateStatusDialog = (request) => {
    setSelectedRequest(request);
    setOpenUpdateStatusDialog(true);
  };

  const handleCloseUpdateStatusDialog = () => {
    setOpenUpdateStatusDialog(false);
    setSelectedRequest(null);
  };

  const handleUpdateStatus = async (status) => {
    if (selectedRequest) {
      try {
        const payload = { ...selectedRequest, status };
        await axios.put(`http://localhost:8080/api/timeoffrequests/${selectedRequest.id}`, payload);
        setTimeOffRequests(prev => prev.map(request => request.id === selectedRequest.id ? { ...request, status } : request));
        handleCloseUpdateStatusDialog();
      } catch (error) {
        console.error('Error updating time-off request status:', error);
      }
    }
  };

  const handleRadioChange = (event) => {
    handleUpdateStatus(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <ProductManagerSidePanel />
      <Typography variant="h4" sx={{ mb: 2 }}>View Team Lead Schedule</Typography>
      <FormControl fullWidth sx={{ mb: 2 }} >
        <InputLabel>Team Lead</InputLabel>
        <Select
          value={selectedTeamLead ? selectedTeamLead.id : ''}
          onChange={(event) => {
            const selectedLead = teamLeads.find(lead => lead.id === event.target.value);
            setSelectedTeamLead(selectedLead || null);
          }}
          label="Team Lead"
        >
          {teamLeads.map(lead => (
            <MenuItem key={lead.id} value={lead.id}>
              {lead.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleOpenAssignDialog} disabled={!selectedTeamLead}>
          Assign Schedule
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Schedules</Typography>
        {schedules.length === 0 ? (
          <Typography>No schedules assigned</Typography>
        ) : (
          schedules.map(schedule => (
            <Paper key={schedule.id} style={{ padding: '16px', marginBottom: '8px' }}>
              <Typography variant="body1">{schedule.scheduleDateTime}</Typography>
              <Button variant="outlined" color="primary" onClick={() => handleOpenEditDialog(schedule)} sx={{ mr: 1 }}>
                Edit
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleOpenDeleteDialog(schedule)}>
                Delete
              </Button>
            </Paper>
          ))
        )}
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Time-Off Requests</Typography>
        <List>
          {timeOffRequests.map(request => (
            <ListItem key={request.id}>
              <ListItemText
                primary={`Team Lead: ${request.teamLeadName}`}
                secondary={`Date: ${new Date(request.requestDate).toDateString()} - Reason: ${request.reason} - Status: ${request.status}`}
              />
              <Button variant="outlined" color="primary" onClick={() => handleOpenUpdateStatusDialog(request)}>
                Update Status
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Assign Schedule Dialog */}
      <Dialog open={openAssignDialog} onClose={handleCloseAssignDialog}>
        <DialogTitle>Assign Schedule</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Schedule Date and Time"
            type="datetime-local"
            value={newScheduleDateTime}
            onChange={(e) => setNewScheduleDateTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignDialog}>Cancel</Button>
          <Button onClick={handleAssignSchedule} color="primary">Assign</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Schedule Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Schedule</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Schedule Date and Time"
            type="datetime-local"
            value={newScheduleDateTime}
            onChange={(e) => setNewScheduleDateTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleUpdateSchedule} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Schedule Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this schedule?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteSchedule} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={openUpdateStatusDialog} onClose={handleCloseUpdateStatusDialog}>
        <DialogTitle>Update Time-Off Request Status</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup value={selectedRequest?.status || ''} onChange={handleRadioChange}>
              <FormControlLabel value="Approved" control={<Radio />} label="Approved" />
              <FormControlLabel value="Denied" control={<Radio />} label="Denied" />
              <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateStatusDialog}>Cancel</Button>
          <Button onClick={() => handleUpdateStatus(selectedRequest?.status || 'Pending')} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewTeamLeadSchedule;
