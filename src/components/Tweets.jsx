import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseConfig';
import './Tweets.css';

function Tweets() {
  const [tweetText, setTweetText] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('zie');
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedImage(null);
      setImagePreview('');
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'];
    const isImageType = file.type.startsWith('image/');
    const isHeicExtension = ['heic', 'heif'].includes(extension);

    if (!isImageType && !isHeicExtension) {
      alert('Please choose a supported image file (jpg, png, webp, heic).');
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview('');
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('tweets-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from('tweets-images')
      .getPublicUrl(uploadData?.path || fileName);

    return publicUrlData?.publicUrl || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tweetText.trim() && !selectedImage) return;

    try {
      setUploading(true);
      const color = selectedPerson === 'zie' ? 'blue' : 'pink';
      let imageUrl = null;

      if (selectedImage) {
        try {
          imageUrl = await uploadImage(selectedImage);
        } catch (uploadError) {
          console.warn('Image upload failed, posting text only:', uploadError);
        }
      }

      const insertPayload = {
        text: tweetText.trim(),
        color,
        person: selectedPerson,
        ...(imageUrl ? { image_url: imageUrl } : {}),
      };

      let { data, error } = await supabase
        .from('tweets')
        .insert([insertPayload])
        .select();

      if (error && imageUrl) {
        const fallbackPayload = {
          text: tweetText.trim(),
          color,
          person: selectedPerson,
        };
        ({ data, error } = await supabase
          .from('tweets')
          .insert([fallbackPayload])
          .select());
      }

      if (error) throw error;

      setTweetText('');
      setSelectedImage(null);
      setImagePreview('');
      fetchTweets();
    } catch (error) {
      console.error('Error adding tweet:', error);
      alert(`Failed to post tweet: ${error.message || error}`);
    } finally {
      setUploading(false);
    }
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
        <div className="tweet-actions">
          <label className="image-upload-button">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <span>{selectedImage ? 'Change photo' : '📷 Add photo'}</span>
          </label>
          {selectedImage && (
            <button type="button" className="remove-image-button" onClick={handleRemoveImage}>
              Remove
            </button>
          )}
        </div>

        {imagePreview && (
          <div className="image-preview-wrapper">
            <img src={imagePreview} alt="Preview" className="image-preview" />
          </div>
        )}

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
          <button type="submit" className="tweet-button" disabled={uploading || (!tweetText.trim() && !selectedImage)}>
            {uploading ? 'Posting...' : 'Tweet'}
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
              {tweet.image_url && (
                <img src={tweet.image_url} alt="Tweet attachment" className="tweet-image" />
              )}
              <p className="tweet-date">
                {formatDate(tweet.created_at)} · <span className="tweet-relative">{getRelativeTimeLabel(tweet.created_at)}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tweets;
