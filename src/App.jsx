import React, { useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <MainPage onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  );
}

export default App;
