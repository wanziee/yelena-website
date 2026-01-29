import React, { useState } from 'react';
import './Series.css';

function Series() {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const episodes = [
    {
      id: 1,
      title: "Episode 1: First flight, first meeting",
      description: "Ichwan’s first flight to meet Yelena for the very first time. A simple beginning of their story.",
      thumbnail: "images/thumbnail-eps-1.png",
      youtubeUrl: "https://www.youtube.com/watch?v=1PlCT4nzrrg",
      duration: "5:44"
    }
  ];

  const handleEpisodeClick = (episode) => {
    window.open(episode.youtubeUrl, '_blank');
  };

  return (
    <div className="series-container">
      <div className="series-header">
        <h2>Animation Series 🎮</h2>
        <p>Watch our animation series!</p>
      </div>

      <div className="episodes-list">
        {episodes.map((episode) => (
          <div 
            key={episode.id} 
            className="episode-card-horizontal"
            onClick={() => handleEpisodeClick(episode)}
          >
            <div className="episode-thumbnail-horizontal">
              <img 
                src={episode.thumbnail} 
                alt={episode.title}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/320x180/ff69b4/ffffff?text=Episode+${episode.id}`;
                }}
              />
              <div className="play-overlay">
                <div className="play-button">▶️</div>
              </div>
              <div className="duration-badge">{episode.duration}</div>
            </div>
            <div className="episode-info-horizontal">
              <h3>{episode.title}</h3>
              <p>{episode.description}</p>
              <button className="watch-btn">
                📺 Watch on YouTube
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="coming-soon">
        <h3>🚀 More Episodes Coming Soon! 🚀</h3>
        <p>Stay tuned for more exciting Roblox animation episodes!</p>
        <div className="placeholder-episodes">
          {[2, 3, 4].map((num) => (
            <div key={num} className="placeholder-episode">
              <div className="placeholder-thumbnail">
                <span>Episode {num}</span>
                <span>Coming Soon</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Series;
