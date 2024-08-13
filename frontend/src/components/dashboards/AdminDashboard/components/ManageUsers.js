import React, { useState, useEffect } from 'react';
import SidePanel from '../AdminSidePanel';
import { Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, TextField, Modal, IconButton } from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    username:'',
    company:'',
  });

  useEffect(() => {
    // Fetch list of users
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:8080/api/admin/users'); // Ensure this endpoint is correct
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      username: user.username,
      company: user.company,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleSave = async () => {
    if (!selectedUser) {
      console.warn('No user selected for editing');
      return;
    }
  
    try {
      console.log('Saving user:', selectedUser.id, editUser);
      await axios.put(`http://localhost:8080/api/admin/users/${selectedUser.id}`, editUser);
      setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...editUser } : user)));
      handleClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  const handleDelete = async (userId) => {
    try {
      console.log('Deleting user:', userId);
      await axios.delete(`http://localhost:8080/api/admin/users/delete/${userId}`);
      setUsers(users.filter(user => user.id !== userId)); // Update state after deletion
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SidePanel />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Users
        </Typography>

        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 4 }}
        />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            User List
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={() => handleEdit(user)} sx={{ mr: 1 }}>
                          Edit
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No users found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Edit User
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={editUser.firstName}
            onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={editUser.lastName}
            onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Company"
            variant="outlined"
            fullWidth
            value={editUser.company}
            onChange={(e) => setEditUser({ ...editUser, company: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={editUser.username}
            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            value={editUser.password}
            onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ManageUsers;
