import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeSidePanel from '../EmployeeSidePanel';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const MyShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShifts = async () => {
      setLoading(true);
      try {
        // Retrieve employee ID from local storage
        const employeeId = localStorage.getItem('id');
        
        if (!employeeId) {
          throw new Error('Employee ID not found in local storage');
        }
        
        const response = await axios.get(`http://localhost:8080/api/schedules/employee/${employeeId}`);
        setShifts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <EmployeeSidePanel />
      <Typography variant="h4" gutterBottom>
        My Shifts
      </Typography>
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{`Error: ${error}`}</Typography>
        ) : shifts.length > 0 ? (
          <List>
            {shifts.map((shift) => (
              <ListItem key={shift.id}>
                <ListItemText
                  primary={`Shift on ${new Date(shift.scheduleDateTime).toLocaleString()}`}
                  secondary={`Employee: ${shift.employeeUsername}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No shifts scheduled.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default MyShifts;
