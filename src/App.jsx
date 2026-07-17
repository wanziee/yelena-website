import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AdminLogin from './pages/AdminLogin';
import LoginHistory from './pages/LoginHistory';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/main" />} />
          <Route path="/main" element={isLoggedIn ? <MainPage onLogout={handleLogout} currentUser={currentUser} /> : <Navigate to="/" />} />
          <Route path="/login-history" element={!isAdminLoggedIn ? <AdminLogin onLogin={handleAdminLogin} /> : <LoginHistory onLogout={handleAdminLogout} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
