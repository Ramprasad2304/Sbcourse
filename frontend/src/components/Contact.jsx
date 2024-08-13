import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import '../styles/Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/contact/conpost', {
        name: name,
        email: email,
        message: message
      });
      setName('');
      setEmail('');
      setMessage('');
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <div className="contact-us">
      <Navbar />
      <div className="contact">
        <div className="contact-content">
          <div className="contact-info">
            <Typography variant="h4" className="contact-heading">
              Get in Touch
            </Typography>
            <Typography variant="body1" className="contact-description">
              If you have any questions or need support, feel free to reach out to us using the contact form below. We look forward to hearing from you!
            </Typography>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Email:</label>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="message">Message:</label>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="contact-button"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
