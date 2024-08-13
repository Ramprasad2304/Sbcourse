import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductManagerSidePanel from './ProductManagerSidePanel';
import Dashboard from './components/DashBoard';
import AssignEmployees from './components/AssignEmployees';
import ViewTeamLeadSchedule from './components/ViewTeamLeadSchedule';
import CreateProjects from './components/CreateProjects';
import Profile from './components/Profile';

const ProductManagerDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ProductManagerSidePanel />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assign-employees" element={<AssignEmployees />} />
          <Route path="view-team-lead-schedule" element={<ViewTeamLeadSchedule />} />
          <Route path="create-projects" element={<CreateProjects />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default ProductManagerDashboard;
