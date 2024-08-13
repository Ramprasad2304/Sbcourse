// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, user }) => {
  const isSessionValid = () => {
    const expirationTime = localStorage.getItem('expiration');
    if (!expirationTime) return false;
    return new Date().getTime() < parseInt(expirationTime, 10);
  };

  return isSessionValid() ? <Element user={user} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
