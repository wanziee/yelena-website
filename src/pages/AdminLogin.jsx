import React, { useState } from 'react';
import { supabase } from '../supabaseConfig';
import './AdminLogin.css';

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check admin password against database
      const { data: admins, error: adminError } = await supabase
        .from('users')
        .select('*')
        .eq('username', 'admin')
        .eq('password_hash', 'ichwan400');

      if (adminError) throw adminError;

      if (admins && admins.length > 0) {
        onLogin();
      } else {
        setError('Invalid admin password');
        setPassword('');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-content">
        <div className="admin-login-box">
          <h1 className="admin-login-title">🔐 Admin Login</h1>
          <p className="admin-login-subtitle">Login History Monitor</p>
          
          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="admin-password-input"
              />
            </div>
            
            {error && <div className="admin-error-message">{error}</div>}
            
            <button type="submit" className="admin-login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Access Admin Panel'}
            </button>
          </form>
          
          <p className="admin-hint">💡 Only for authorized administrators</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
