import React, { useState, useEffect } from 'react';
import SidePanel from '../AdminSidePanel';
import { TextField, List, ListItem, ListItemText, Divider, Box, Typography, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch users and extract unique companies
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/users');
        const users = response.data;
        setUsers(users);

        const companies = [...new Set(users.map(user => user.company))];
        setCategories(companies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredCategories = categories.filter(category =>
    category && category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredUsers = selectedCategory
    ? users.filter(user => user.company === selectedCategory)
    : [];

  const handleEditClick = (user) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/admin/users/${editUser.id}`, editUser);
      setUsers(users.map(user => (user.id === editUser.id ? editUser : user)));
      setOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  return (
    <div>
      <SidePanel />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Categories
        </Typography>
        <TextField
          label="Search Categories"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <List>
          {filteredCategories.map((category, index) => (
            <ListItem button key={index} onClick={() => handleCategoryClick(category)}>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>

        {selectedCategory && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Users in {selectedCategory}
            </Typography>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <Card key={user.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
                    <Typography variant="body2">Role: {user.role}</Typography>
                    <Typography variant="body2">Email: {user.email}</Typography>
                    {/* <Button variant="contained" color="primary" onClick={() => handleEditClick(user)} sx={{ mt: 2 }}>
                      Edit
                    </Button> */}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>No users found in this category</Typography>
            )}
          </Box>
        )}

        {editUser && (
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Edit the details of the user.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name="firstName"
                label="First Name"
                type="text"
                fullWidth
                value={editUser.firstName}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="lastName"
                label="Last Name"
                type="text"
                fullWidth
                value={editUser.lastName}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={editUser.email}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="role"
                label="Role"
                type="text"
                fullWidth
                value={editUser.role}
                onChange={handleInputChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </div>
  );
};

export default Category;
