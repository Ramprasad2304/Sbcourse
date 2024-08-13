
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeSidePanel from './EmployeeSidePanel';
import Dashboard from './components/Dashboard';
import Message from './components/Message';
import Profile from './components/Profile';
import MyShifts from './components/MyShifts';
import TimeOff from './components/TimeOff';

const EmployeeDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <EmployeeSidePanel />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="message" element={<Message />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-shifts" element={<MyShifts />} />
          <Route path="time-off" element={<TimeOff />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;
