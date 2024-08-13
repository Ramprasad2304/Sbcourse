
import React, { useState } from 'react';
import SidePanel from '../TeamLeadSidePanel';
import { TextField, Button, Grid, Card, CardContent } from '@mui/material';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Admin',
    email: 'admin@example.com',
    role: 'Administrator',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic
    console.log('Profile updated:', profile);
  };

  return (
    <div>
      <SidePanel />
      <h2>Profile</h2>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={profile.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={profile.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Role"
                  name="role"
                  variant="outlined"
                  fullWidth
                  value={profile.role}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
