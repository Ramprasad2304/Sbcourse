import React, { useState, useEffect } from 'react';
import SidePanel from '../AdminSidePanel';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import axios from 'axios';

const COLORS = ['#FF9999', '#66B2FF', '#99FF99', '#FFCC99', '#FFB6C1']; // Add color for Admin if needed

const StyledCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
});

const CardHeader = styled(Typography)({
  fontWeight: 'bold',
  color: '#333',
});

const CardValue = styled(Typography)({
  fontWeight: '600',
  color: '#00796b',
  fontSize: '2rem',
});

const RecentActivity = styled(Box)({
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

const ActivityItem = styled(Box)({
  marginBottom: '8px',
  padding: '8px',
  borderBottom: '1px solid #e0e0e0',
});

const DashBoard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCompanies: 0,
    totalMessages: 0,
  });

  const [roleDistribution, setRoleDistribution] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const fetchRoleDistribution = async () => { 
      try {
        const response = await axios.get('http://localhost:8080/api/admin/users'); // Fetch all users
        const users = response.data;
        const roleCount = users.reduce((acc, user) => {
          const role = user.role; // Assuming 'role' is the field for user roles
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {});

        const roleData = Object.keys(roleCount).map(role => ({
          name: role,
          value: roleCount[role]
        }));
        setRoleDistribution(roleData);
      } catch (error) {
        console.error('Error fetching role distribution:', error);
      }
    };

    const fetchRecentMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/contact/conall');
        const sortedMessages = response.data
          .sort((a, b) => b.id - a.id) // Sort by ID descending
          .slice(0, 5); // Get the most recent 5 messages
        setRecentMessages(sortedMessages);
      } catch (error) {
        console.error('Error fetching recent messages:', error);
      }
    };

    fetchStats();
    fetchRoleDistribution();
    fetchRecentMessages();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <SidePanel />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <CardHeader variant="h6">Total Users</CardHeader>
                <CardValue variant="h4">{stats.totalUsers}</CardValue>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <CardHeader variant="h6">Total Companies</CardHeader>
                <CardValue variant="h4">{stats.totalCompanies}</CardValue>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <CardHeader variant="h6">Total Messages</CardHeader>
                <CardValue variant="h4">{stats.totalMessages}</CardValue>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>Distribution of Users</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roleDistribution}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={120}
                      fill="#8884d8"
                    >
                      {roleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          const { name, value } = payload[0];
                          return (
                            <div style={{ backgroundColor: '#fff', border: '1px solid #ddd', padding: '8px' }}>
                              <p>{name}: {value}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>Recent Messages</Typography>
                <RecentActivity>
                  {recentMessages.map((message) => (
                    <ActivityItem key={message.id}>Message from: {message.email}</ActivityItem>
                  ))}
                </RecentActivity>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashBoard;
