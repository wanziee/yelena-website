import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const correctPasswords = ['2005-07-05', '2006-07-10'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (correctPasswords.includes(password)) {
      setError('');
      onLogin();
    } else {
      setError('Who aree uuuuu?? r u even yelena? do u even know herr??  how do u know herr? ru her ex or somethng? go away u stinkiestttt hushh hushhhh 😤');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-box">
          <h1 className="login-title">💕 Yelena's Gallery 💕</h1>
          <p className="login-subtitle">Hope this can make u happier</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password... 🔐"
                className="password-input"
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="login-button">
              Enter gallery ❤️
            </button>
          </form>
          
          <p className="hint">💡 Hint: ichwan's birthday or yelena's birthday</p>
        </div>
        
        <div className="background-animation">
          <div className="heart heart1">❤️</div>
          <div className="heart heart2">💕</div>
          <div className="heart heart3">💖</div>
          <div className="heart heart4">💗</div>
          <div className="heart heart5">💝</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
