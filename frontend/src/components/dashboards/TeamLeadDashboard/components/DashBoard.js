import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Divider,
  Paper,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TeamLeadSidePanel from '../TeamLeadSidePanel';

const Dashboard = () => {
  const [team, setTeam] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ date: '', time: '', reason: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadId = JSON.parse(localStorage.getItem('id'));
        if (!leadId) {
          console.error('No leadId found in localStorage.');
          return;
        }

        console.log('Fetching team details...');
        const teamResponse = await axios.get(`http://localhost:8080/api/teams/by-lead/${leadId}`);
        console.log('Team response:', teamResponse.data);
        setTeam(teamResponse.data[0]);

        console.log('Fetching schedule...');
        const scheduleResponse = await axios.get(`http://localhost:8080/api/product_manager/schedule/schedule/${leadId}`);
        console.log('Schedule response:', scheduleResponse.data);
        setSchedule(scheduleResponse.data);

        console.log('Fetching time off requests...');
        const requestsResponse = await axios.get(`http://localhost:8080/api/timeoffrequests/by-team-lead/${leadId}`);
        console.log('Requests response:', requestsResponse.data);
        setRequests(requestsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const teamLeadId = JSON.parse(localStorage.getItem('id'));
      const teamLeadName = localStorage.getItem('username');
      const dateTime = `${newRequest.date}T${newRequest.time}`; // Combine date and time

      const payload = {
        ...newRequest,
        teamLeadId,
        teamLeadName,
        status: 'Pending',
        requestDate: dateTime, // Assuming backend expects a combined date-time string
      };

      await axios.post('http://localhost:8080/api/timeoffrequests', payload);

      // Refresh requests
      console.log('Request submitted. Fetching updated requests...');
      const response = await axios.get(`http://localhost:8080/api/timeoffrequests/by-team-lead/${teamLeadId}`);
      console.log('Updated requests response:', response.data);
      setRequests(response.data);

      // Close the dialog and reset the form
      setOpen(false);
      setNewRequest({ date: '', time: '', reason: '' });
    } catch (error) {
      console.error('Error submitting time off request:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/timeoffrequests/${id}`);
      console.log('Request deleted. Fetching updated requests...');
      // Refresh requests
      const leadId = JSON.parse(localStorage.getItem('id'));
      const response = await axios.get(`http://localhost:8080/api/timeoffrequests/by-team-lead/${leadId}`);
      console.log('Updated requests response:', response.data);
      setRequests(response.data);
    } catch (error) {
      console.error('Error deleting time off request:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TeamLeadSidePanel sx={{ flexShrink: 0, width: 150 }} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Dashboard
        </Typography>

        {/* Display team details */}
        {team && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
              Team Details
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

        {/* Display team lead's schedule */}
        <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
          My Schedule
        </Typography>
        <Grid container spacing={3}>
          {schedule.map((shift) => (
            <Grid item xs={12} sm={6} md={4} key={shift.id}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{`Scheduled Time: ${new Date(shift.scheduleDateTime).toLocaleString()}`}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Time Off Requests Section */}
        <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2 }}>
          Time Off Requests
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Request Time Off
        </Button>
        <Divider sx={{ my: 2 }} />
        {requests.length > 0 ? (
          requests.map((request) => (
            <Paper key={request.id} sx={{ mb: 2, p: 2, position: 'relative' }}>
              <Typography variant="h6">{new Date(request.requestDate).toLocaleDateString()}</Typography>
              <Typography variant="body1">{request.reason}</Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {request.status}
              </Typography>
              <IconButton
                sx={{ position: 'absolute', top: 8, right: 8 }}
                color="error"
                onClick={() => handleDelete(request.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))
        ) : (
          <Typography variant="body1">No time off requests found.</Typography>
        )}

        {/* Time Off Request Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Request Time Off</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="date"
              label="Date"
              type="date"
              fullWidth
              value={newRequest.date}
              onChange={handleRequestChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              name="time"
              label="Time"
              type="time"
              fullWidth
              value={newRequest.time}
              onChange={handleRequestChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              name="reason"
              label="Reason"
              type="text"
              fullWidth
              value={newRequest.reason}
              onChange={handleRequestChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Dashboard;
