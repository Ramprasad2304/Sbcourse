import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import AdminDashboard from './components/dashboards/AdminDashboard/AdminDashboard';
import EmployeeDashboard from './components/dashboards/EmployeeDashboard/EmployeeDashboard';
// import HRDashboard from './components/dashboards/HRDashboard/HRDashboard';
import TeamLeadDashboard from './components/dashboards/TeamLeadDashboard/TeamLeadDashboard';
import ProductManagerDashboard from './components/dashboards/ProductManagerDashboard/ProductManagerDashboard';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    console.log(userInfo);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    
    setUser(null);
  };

  const isSessionValid = () => {
    const expirationTime = localStorage.getItem('expiration');
    if (!expirationTime)return false;
    return new Date().getTime() < parseInt(expirationTime, 10);
    
  };
  

  const ProtectedRoute = ({ element }) => {
  
    return isSessionValid() ? element : <Navigate to="/login" />;
  };


  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin-dashboard/*" element={<ProtectedRoute element={<AdminDashboard user={user} />} />} />
        <Route path="/employee-dashboard/*" element={<ProtectedRoute element={<EmployeeDashboard user={user} />} />} />
        {/* <Route path="/hr-dashboard/*" element={<ProtectedRoute element={<HRDashboard user={user} />} />} /> */}
        <Route path="/team-lead-dashboard/*" element={<ProtectedRoute element={<TeamLeadDashboard user={user} />} />} />
        <Route path="/product-manager-dashboard/*" element={<ProtectedRoute element={<ProductManagerDashboard user={user} />} />} />
        <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/home" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
