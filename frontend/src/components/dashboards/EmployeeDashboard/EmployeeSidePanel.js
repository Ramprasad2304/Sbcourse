
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Message, AccountCircle, Schedule, Event } from '@mui/icons-material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const EmployeeSidePanel = () => {
  return (
    <Drawer
    sx={{
      width:240 ,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        backgroundColor: '#134B70', 
      },
      '& .MuiListItem-root': {
        color: '#fff', 
      },
      '& .MuiListItemIcon-root': {
        color: '#fff', 
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
        <ListItem button component={Link} to="/employee-dashboard">
          <ListItemIcon><AutoAwesomeMosaicIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* <ListItem button component={Link} to="/employee-dashboard/message">
          <ListItemIcon><Message /></ListItemIcon>
          <ListItemText primary="Message" />
        </ListItem> */}
        
        <ListItem button component={Link} to="/employee-dashboard/my-shifts">
          <ListItemIcon><Schedule /></ListItemIcon>
          <ListItemText primary="My Shifts" />
        </ListItem>
        <ListItem button component={Link} to="/employee-dashboard/time-off">
          <ListItemIcon><Event /></ListItemIcon>
          <ListItemText primary="Time Off" />
        </ListItem>
        <ListItem button component={Link} to="/employee-dashboard/profile">
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default EmployeeSidePanel;
