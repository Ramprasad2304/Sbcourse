import React from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText } from '@mui/material';
import ProductManagerSidePanel from '../ProductManagerSidePanel';

const timeOffRequests = [
  { id: 1, employee: 'John Doe', date: '2024-07-25', status: 'Pending' },
  { id: 2, employee: 'Jane Smith', date: '2024-07-26', status: 'Approved' },
];

const TimeOffs = () => {
  const handleAccept = (id) => {
    console.log('Accepting time-off request with id:', id);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductManagerSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Time Off Requests
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Pending Time Off Requests</Typography>
          <List>
            {timeOffRequests.map(request => (
              <ListItem key={request.id}>
                <ListItemText
                  primary={`Employee: ${request.employee}`}
                  secondary={`Date: ${request.date} - Status: ${request.status}`}
                />
                {request.status === 'Pending' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAccept(request.id)}
                  >
                    Accept
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default TimeOffs;
