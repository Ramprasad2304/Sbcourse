
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, People, Category as CategoryIcon, Message as MessageIcon, AccountCircle } from '@mui/icons-material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const AdminSidePanel = () => {
  return (
    <Drawer
    sx={{
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        backgroundColor: '#134B70', 
      },
      '& .MuiListItem-root': {
        color: '#fff', // Text color of the list items
      },
      '& .MuiListItemIcon-root': {
        color: '#fff', // Icon color of the list items
      },
    }}
      variant="permanent"
      anchor="left"
    >
      <List>
      
        <ListItem button component={Link} to="/home">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/admin-dashboard/dashboard">
          <ListItemIcon><AutoAwesomeMosaicIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin-dashboard/manage-user">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Manage Users" />
        </ListItem>
        {/* <ListItem button component={Link} to="/admin-dashboard/category">
          <ListItemIcon><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Category" />
        </ListItem> */}
        <ListItem button component={Link} to="/admin-dashboard/message">
          <ListItemIcon><MessageIcon /></ListItemIcon>
          <ListItemText primary="Message" />
        </ListItem>
        <ListItem button component={Link} to="/admin-dashboard/profile">
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default AdminSidePanel;
