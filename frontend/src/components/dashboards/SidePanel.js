
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, People, Category, Message, AccountCircle } from '@mui/icons-material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const SidePanel = ({ role }) => {
  const renderMenuItems = () => {
    switch (role) {
      case 'admin':
        return (
          <>
            <ListItem button component={Link} to="/admin-dashboard/home">
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
            <ListItem button component={Link} to="/admin-dashboard/category">
              <ListItemIcon><Category /></ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
            <ListItem button component={Link} to="/admin-dashboard/message">
              <ListItemIcon><Message /></ListItemIcon>
              <ListItemText primary="Message" />
            </ListItem>
            <ListItem button component={Link} to="/admin-dashboard/profile">
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </>
        );
      case 'employee':
        return (
          <>
            <ListItem button component={Link} to="/employee-dashboard/home">
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/employee-dashboard/my-shifts">
              <ListItemIcon><Category /></ListItemIcon>
              <ListItemText primary="My Shifts" />
            </ListItem>
            <ListItem button component={Link} to="/employee-dashboard/time-off">
              <ListItemIcon><Message /></ListItemIcon>
              <ListItemText primary="Time Off" />
            </ListItem>
            <ListItem button component={Link} to="/employee-dashboard/profile">
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </>
        );
      case 'hr':
        return (
          <>
            <ListItem button component={Link} to="/hr-dashboard/home">
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/hr-dashboard/manage-employees">
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Manage Employees" />
            </ListItem>
            <ListItem button component={Link} to="/hr-dashboard/leave-requests">
              <ListItemIcon><Category /></ListItemIcon>
              <ListItemText primary="Leave Requests" />
            </ListItem>
            <ListItem button component={Link} to="/hr-dashboard/profile">
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </>
        );
      case 'team_lead':
        return (
          <>
            <ListItem button component={Link} to="/team-lead-dashboard/home">
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/team-lead-dashboard/manage-team">
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Manage Team" />
            </ListItem>
            <ListItem button component={Link} to="/team-lead-dashboard/shift-scheduling">
              <ListItemIcon><Category /></ListItemIcon>
              <ListItemText primary="Shift Scheduling" />
            </ListItem>
            <ListItem button component={Link} to="/team-lead-dashboard/profile">
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='sidepanel'>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {renderMenuItems()}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default SidePanel;
