import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const songs = [
    {
      id: 1,
      title: 'Be With You',
      artist: 'My fav song',
      duration: '3:30',
      durationSeconds: 210,
      cover: '🎵',
      url: '/music/Be With You.mp3'
    },
    {
      id: 2,
      title: 'Your Universe',
      artist: 'Rico Blanco',
      duration: '4:15',
      durationSeconds: 255,
      cover: '💫',
      url: '/music/Rico Blanco - Your Universe Lyrics_Letra.mp3'
    },
    {
      id: 3,
      title: 'Your Song',
      artist: 'Parokya Ni Edgar',
      duration: '3:45',
      durationSeconds: 225,
      cover: '🎶',
      url: '/music/Your Song - Parokya Ni Edgar Lyrics.mp3'
    },
    {
      id: 4,
      title: 'Pag-Ibig ay Kanibalismo II',
      artist: 'fitterkarma',
      duration: '4:00',
      durationSeconds: 240,
      cover: '💔',
      url: '/music/fitterkarma - Pag-Ibig ay Kanibalismo II Lyrics.mp3'
    }
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      if (duration) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setProgress(0);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setProgress(0);
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentSong = songs[currentSongIndex];
  const currentTime = (progress / 100) * currentSong.durationSeconds;

  return (
    <div className="music-player-container">
      <h2 className="music-title">🎵  Songs for Yelena 🎵</h2>
      <p className="music-subtitle">Hope this songs can make u happy</p>

      <div className="player-wrapper">
        <div className="now-playing">
          <div className="album-cover">{currentSong.cover}</div>
          <div className="song-info">
            <h3 className="song-title">{currentSong.title}</h3>
            <p className="song-artist">{currentSong.artist}</p>
          </div>
        </div>

        <div className="player-controls">
          <button className="control-btn prev-btn" onClick={prevSong}>
            ⏮️ Previous
          </button>
          <button
            className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <button className="control-btn next-btn" onClick={nextSong}>
            Next ⏭️
          </button>
        </div>

        <div className="progress-section">
          <span className="time-display">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar"
          />
          <span className="time-display">{currentSong.duration}</span>
        </div>
      </div>

      <div className="playlist">
        <h3 className="playlist-title">📋 Playlist</h3>
        <div className="playlist-items">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className={`playlist-item ${index === currentSongIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentSongIndex(index);
                setProgress(0);
              }}
            >
              <div className="playlist-item-cover">{song.cover}</div>
              <div className="playlist-item-info">
                <p className="playlist-item-title">{song.title}</p>
                <p className="playlist-item-artist">{song.artist}</p>
              </div>
              <span className="playlist-item-duration">{song.duration}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="player-message">
        <p>uk i actually confused which song u like most hehe but i hope u like this playlistt. well i will keep update it everytime i know songs that u like</p>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}

export default MusicPlayer;
