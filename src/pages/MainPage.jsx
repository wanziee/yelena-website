import React, { useState } from 'react';
import './MainPage.css';
import Gallery from '../components/Gallery';
import MusicPlayer from '../components/MusicPlayer';
import WaitingYelena from '../components/WaitingYelena';
import Series from '../components/Series';

function MainPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState('gallery');

  return (
    <div className="main-container">
      <header className="header">
        <h1 className="header-title">💕 Yelena's Memory 💕</h1>
        <button onClick={onLogout} className="logout-btn">
          Logout 👋
        </button>
      </header>

      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          🖼️ Photo Gallery
        </button>
        <button
          className={`nav-tab ${activeTab === 'music' ? 'active' : ''}`}
          onClick={() => setActiveTab('music')}
        >
          🎵 Love Songs
        </button>
        <button
          className={`nav-tab ${activeTab === 'waiting' ? 'active' : ''}`}
          onClick={() => setActiveTab('waiting')}
        >
          🌸 Whaiting Yelena
        </button>
        <button
          className={`nav-tab ${activeTab === 'series' ? 'active' : ''}`}
          onClick={() => setActiveTab('series')}
        >
          📺 Series
        </button>
      </nav>

      <main className="content">
        {activeTab === 'gallery' && <Gallery />}
        {activeTab === 'music' && <MusicPlayer />}
        {activeTab === 'waiting' && <WaitingYelena />}
        {activeTab === 'series' && <Series />}
      </main>

      <footer className="footer">
        <p>💖 Made with Stinky Love for Stinky Yelena 💖</p>
      </footer>
    </div>
  );
}

export default MainPage;
