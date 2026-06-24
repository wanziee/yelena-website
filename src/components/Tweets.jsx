import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseConfig';
import './Tweets.css';

function Tweets() {
  const [tweetText, setTweetText] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('zie');
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const { data, error } = await supabase
        .from('tweets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTweets(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tweets:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tweetText.trim()) {
      try {
        const color = selectedPerson === 'zie' ? 'blue' : 'pink';
        const { data, error } = await supabase
          .from('tweets')
          .insert([{ text: tweetText, color: color, person: selectedPerson }])
          .select();
        
        if (error) throw error;
        
        setTweetText('');
        fetchTweets();
      } catch (error) {
        console.error('Error adding tweet:', error);
        alert(`Failed to post tweet: ${error.message || error}`);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${dateStr} at ${timeStr}`;
  };

  return (
    <div className="tweets-container">
      <h2 className="tweets-title">💬 Tweets</h2>
      
      <div className="tweets-notice">
        <p>We may not be together anymore, but if you ever need someone to talk to or vent to, you can always come to me. Whatever it is, you don’t have to carry it alone.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="tweet-form">
        <textarea
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="just say anything stinky"
          className="tweet-input"
          maxLength="280"
        />
        <div className="color-selector">
          <span className="color-label">Who are you:</span>
          <button
            type="button"
            className={`color-option zie ${selectedPerson === 'zie' ? 'active' : ''}`}
            onClick={() => setSelectedPerson('zie')}
          >
            zie
          </button>
          <button
            type="button"
            className={`color-option yelena ${selectedPerson === 'yelena' ? 'active' : ''}`}
            onClick={() => setSelectedPerson('yelena')}
          >
            yelena
          </button>
        </div>
        <div className="tweet-footer">
          <span className="char-count">{tweetText.length}/280</span>
          <button type="submit" className="tweet-button" disabled={!tweetText.trim()}>
            Tweet
          </button>
        </div>
      </form>

      <div className="tweets-list">
        {loading ? (
          <p className="loading">Loading tweets...</p>
        ) : tweets.length === 0 ? (
          <p className="no-tweets">No tweets yet.</p>
        ) : (
          tweets.map(tweet => (
            <div key={tweet.id} className={`tweet-card ${tweet.color || 'pink'}`}>
              <p className="tweet-person">{tweet.person || 'unknown'}</p>
              <p className="tweet-text">{tweet.text}</p>
              <p className="tweet-date">{formatDate(tweet.created_at)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tweets;
