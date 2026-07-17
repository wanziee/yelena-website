import React, { useState } from 'react';
import { supabase } from '../supabaseConfig';
import { detectDevice, getIPAddress, getCountryFromIP } from '../utils/deviceDetection';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check password against database
      const { data: users, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('password_hash', password);

      if (userError) throw userError;

      if (users && users.length > 0) {
        const user = users[0];
        
        // Get device info
        const deviceInfo = detectDevice();
        const ipAddress = await getIPAddress();
        const country = await getCountryFromIP(ipAddress);

        // Log login history
        const { error: historyError } = await supabase
          .from('login_history')
          .insert({
            user_id: user.id,
            ip_address: ipAddress,
            country: country,
            device_type: deviceInfo.deviceType,
            device_model: deviceInfo.deviceModel,
            browser_name: deviceInfo.browserName,
            os_name: deviceInfo.osName,
            user_agent: deviceInfo.userAgent
          });

        if (historyError) {
          console.error('Error logging login history:', historyError);
        }

        // Successful login
        onLogin(user);
      } else {
        setError('Who aree uuuuu?? r u even yelena? do u even know herr??  how do u know herr? ru her ex or somethng? go away u stinkiestttt hushh hushhhh 😤');
        setPassword('');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
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
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Enter gallery ❤️'}
            </button>
          </form>
          
          <p className="hint">💡 Hint: ichwan's birthday or yelena's birthday</p>
          <p className="format-hint">Format: year-month-day (0000-00-00)</p>
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
