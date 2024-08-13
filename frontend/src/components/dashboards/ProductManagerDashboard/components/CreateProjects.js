import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, Card, CardContent, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import ProductManagerSidePanel from '../ProductManagerSidePanel';

const CreateProjects = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null); // To track the project being edited
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    // Fetch all projects on component mount
    axios.get('http://localhost:8080/api/projects/allprojects')
      .then(response => {
        console.log('Fetched projects:', response.data); // Log the fetched projects
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects', error);
      });
  }, []);

  const handleCreateProject = () => {
    axios.post('http://localhost:8080/api/projects', {
      name: projectName,
      description: projectDescription
    })
    .then(response => {
      console.log('Project created:', response.data); // Log the newly created project
      alert('Project created successfully');
      setProjectName('');
      setProjectDescription('');
      // Optionally refresh the list of projects
      setProjects([...projects, response.data]);
    })
    .catch(error => {
      console.error('There was an error creating the project!', error);
    });
  };

  const handleEditClick = (project) => {
    setEditProject(project);
    setEditName(project.name);
    setEditDescription(project.description);
  };

  const handleEditSave = () => {
    axios.put(`http://localhost:8080/api/projects/${editProject.id}`, {
      name: editName,
      description: editDescription
    })
    .then(response => {
      console.log('Project updated:', response.data);
      alert('Project updated successfully');
      setProjects(projects.map(project =>
        project.id === editProject.id ? response.data : project
      ));
      setEditProject(null);
    })
    .catch(error => {
      console.error('There was an error updating the project!', error);
    });
  };

  const handleDeleteClick = (projectId) => {
    axios.delete(`http://localhost:8080/api/projects/${projectId}`)
    .then(() => {
      console.log('Project deleted');
      alert('Project deleted successfully');
      setProjects(projects.filter(project => project.id !== projectId));
    })
    .catch(error => {
      console.error('There was an error deleting the project!', error);
    });
  };

  console.log('Projects state:', projects); // Log the projects state

  return (
    <div>
      <ProductManagerSidePanel />
      <Container>
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Create New Project
          </Typography>
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            label="Project Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateProject}
            style={{ marginTop: '20px' }}
          >
            Create Project
          </Button>
          <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
            Existing Projects
          </Typography>
          <Grid container spacing={3}>
            {Array.isArray(projects) ? (
              projects.map(project => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{project.name}</Typography>
                      <Typography variant="body2">{project.description}</Typography>
                      <div style={{ marginTop: '10px' }}>
                        <IconButton onClick={() => handleEditClick(project)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(project.id)} color="secondary">
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body2">No projects available</Typography>
            )}
          </Grid>
        </Paper>
        {editProject && (
          <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Edit Project
            </Typography>
            <TextField
              label="Project Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
              label="Project Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditSave}
              style={{ marginTop: '20px' }}
            >
              Save Changes
            </Button>
          </Paper>
        )}
      </Container>
    </div>
  );
};

export default CreateProjects;
