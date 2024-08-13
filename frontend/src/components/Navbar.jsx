import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='Navbar'>
      <div className='nav-content'>
        <div className='nav-left'>
          <Link to="/" className='nav-title'>Schdu</Link>
        </div>
        <div className='nav-right'>
          <p className='nav-item' onClick={() => handleNavigation('/')}>Home</p>
          <p className='nav-item' onClick={() => handleNavigation('/about')}>About</p>
          <p className='nav-item' onClick={() => handleNavigation('/contact')}>Contact</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
