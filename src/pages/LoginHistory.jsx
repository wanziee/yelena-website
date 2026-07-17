import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseConfig';
import './LoginHistory.css';

function LoginHistory({ onLogout }) {
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterUser, setFilterUser] = useState('all');

  useEffect(() => {
    fetchLoginHistory();
  }, [filterUser]);

  const fetchLoginHistory = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('login_history')
        .select('*')
        .order('login_time', { ascending: false });

      if (filterUser !== 'all') {
        query = query.eq('username', filterUser);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setLoginHistory(data || []);
    } catch (error) {
      console.error('Error fetching login history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    
    console.log('Original dateString:', dateString);
    
    // Parse the date string
    const date = new Date(dateString);
    console.log('Parsed date:', date);
    console.log('Parsed date UTC string:', date.toUTCString());
    console.log('Parsed date ISO string:', date.toISOString());
    
    // Convert to Jakarta time by adding 7 hours (UTC+7)
    const jakartaDate = new Date(date.getTime() + (7 * 60 * 60 * 1000));
    console.log('Jakarta date:', jakartaDate);
    console.log('Jakarta date string:', jakartaDate.toString());
    
    const dateStr = jakartaDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const timeStr = jakartaDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    const relativeTime = getRelativeTimeLabel(dateString);
    
    console.log('Formatted:', `${dateStr} at ${timeStr} (${relativeTime})`);
    
    return `${dateStr} at ${timeStr} (${relativeTime})`;
  };

  const getRelativeTimeLabel = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0);
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays > 1) return `${diffDays} days ago`;
    return 'today';
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'mobile': return '📱';
      case 'tablet': return '📱';
      case 'desktop': return '💻';
      default: return '💻';
    }
  };

  return (
    <div className="login-history-container">
      <header className="login-history-header">
        <h1 className="login-history-title">🔐 Login History Monitor</h1>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <div className="login-history-controls">
        <div className="filter-section">
          <label>Filter by User:</label>
          <select 
            value={filterUser} 
            onChange={(e) => setFilterUser(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Users</option>
            <option value="zie">zie</option>
            <option value="yelena">yelena</option>
          </select>
        </div>
        <button onClick={fetchLoginHistory} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="login-history-content">
        {loading ? (
          <p className="loading">Loading login history...</p>
        ) : loginHistory.length === 0 ? (
          <p className="no-data">No login history found.</p>
        ) : (
          <div className="login-history-table-container">
            <table className="login-history-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Login Time</th>
                  <th>Device</th>
                  <th>Country</th>
                  <th>Browser</th>
                  <th>OS</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((login) => (
                  <tr key={login.id}>
                    <td>
                      <span className="username-badge">{login.username || 'Unknown'}</span>
                    </td>
                    <td>{formatTime(login.login_time)}</td>
                    <td>
                      <span className="device-cell">
                        <span className="device-icon">{getDeviceIcon(login.device_type)}</span>
                        {login.device_model || 'Unknown'}
                      </span>
                    </td>
                    <td>{login.country || 'Unknown'}</td>
                    <td>{login.browser_name || 'Unknown'}</td>
                    <td>{login.os_name || 'Unknown'}</td>
                    <td>{login.ip_address || 'Unknown'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginHistory;
