
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import TeamLeadSidePanel from './TeamLeadSidePanel';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/DashBoard';
import ManageTeam from './components/ManageTeam';
import Profile from './components/Profile';
import ShiftScheduling from './components/ShiftScheduling';
const TeamLeadDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TeamLeadSidePanel />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-team" element={<ManageTeam />} />
          <Route path="shift-scheduling" element={<ShiftScheduling />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default TeamLeadDashboard;
