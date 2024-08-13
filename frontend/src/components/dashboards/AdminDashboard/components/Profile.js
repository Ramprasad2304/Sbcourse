import React, { useState, useEffect } from 'react';
import SidePanel from '../AdminSidePanel';
import { TextField, Button, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({
    id: null,
    username: '',
    email: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const username = localStorage.getItem('username');
      if (username) {
        try {
          const response = await axios.get(`http://localhost:8080/api/auth/profile/${username}`);
          setProfile({
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            password: '', // Don't display the current password
          });
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        navigate('/login'); // Redirect to login if no username in local storage
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put('http://localhost:8080/api/auth/update', {
        id: profile.id,
        username: profile.username,
        email: profile.email,
        password: profile.password,
      });
      console.log('Profile updated:', profile);
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/auth/delete/${profile.id}`);
      console.log('Profile deleted');
      // Optionally redirect after deletion
      navigate('/login');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
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
                  label="Username"
                  name="username"
                  variant="outlined"
                  fullWidth
                  value={profile.username}
                  onChange={handleChange}
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={profile.password}
                  onChange={handleChange}
                  disabled={isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                {isEditing ? (
                  <>
                    <Button type="submit" variant="contained" color="primary">
                      Save
                    </Button>
                    {/* <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={handleDelete}
                      style={{ marginLeft: '10px' }}
                    >
                      Delete
                    </Button> */}
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
