import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SidePanel from '../EmployeeSidePanel';

const TimeOff = () => {
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ date: '', reason: '' });

  // Fetch time-off requests for the logged-in employee
  useEffect(() => {
    const fetchRequests = async () => {
      const employeeName = localStorage.getItem('username'); // Assuming username is stored in localStorage
      try {
        const response = await axios.get(`http://localhost:8080/api/timeoffs/by-employee/${employeeName}`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching time-off requests:', error);
      }
    };

    fetchRequests();
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
    const id = localStorage.getItem('id'); // Assuming id is stored in localStorage
    const employeeName = localStorage.getItem('username'); 
    console.log(employeeName); 
    console.log(id); // Assuming username is stored in localStorage
    try {
      const payload = {
        id: id, // Include the ID in the request payload
        employeeId: id, // Include employeeId
        employeeName: employeeName, // Include employeeName
        reason: newRequest.reason,
        status: 'Pending', // Default status
        requestDate: new Date().toISOString(), // Set current date and time
      };
      const response = await axios.post('http://localhost:8080/api/timeoffs', payload);
      setRequests([...requests, response.data]);
      setOpen(false);
      setNewRequest({ date: '', reason: '' });
    } catch (error) {
      console.error('Error submitting time-off request:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/timeoffs/${id}`);
      setRequests(requests.filter((request) => request.id !== id));
    } catch (error) {
      console.error('Error deleting time-off request:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Time Off Requests
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Request Time Off
        </Button>
        <Divider sx={{ my: 2 }} />
        {requests.map((request) => (
          <Paper key={request.id} sx={{ mb: 2, p: 2, position: 'relative' }}>
            <Typography variant="h6">
              {request.requestDate ? new Date(request.requestDate).toLocaleDateString() : 'No Date'}
            </Typography>
            <Typography variant="body1">{request.reason}</Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {request.status || 'Pending'}
            </Typography>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(request.id)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}

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

export default TimeOff;
