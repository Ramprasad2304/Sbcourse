
import React from 'react';
import AdminSidePanel from './AdminSidePanel';
import { Box, CssBaseline } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Category from './components/Category';
import Profile from './components/Profile';
import Message from './components/Message';
import DashBoard from './components/DashBoard';
import ManageUsers from './components/ManageUsers';

const AdminDashboard = ({ user }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminSidePanel user={user} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '',
          p: 3,
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="manage-user" element={<ManageUsers />} />
          <Route path="category" element={<Category />} />
          <Route path="message" element={<Message />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
