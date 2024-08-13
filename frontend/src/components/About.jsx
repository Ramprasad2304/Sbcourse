import React from 'react';
import Navbar from './Navbar';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import '../styles/About.css';
import illustration from '../assets/illu-2.png'; // Importing the image
import Footer from './Footer.jsx';

const About = () => {
  return (
    <div className="about">
      <Navbar />
      <div className="about-content">
        <img src={illustration} alt="Illustration" className="about-image" />
        <div className="about-text">
          <h1>About Us</h1>
          <p>Welcome to WorkForce, where we simplify staff scheduling and management for teams of all sizes. Our platform offers seamless integration and a user-friendly interface designed to streamline your scheduling processes.</p>
          <p>At WorkForce, we are committed to providing the best scheduling solutions to help your team stay organized and efficient. Learn more about our services and how we can assist you in achieving your goals.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
