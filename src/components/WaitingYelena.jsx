import React, { useState, useEffect } from 'react';
import './WaitingYelena.css';

function WaitingYelena() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [cuteAnimation, setCuteAnimation] = useState('🌟');
  const [waterCount, setWaterCount] = useState(0);
  const [restTime, setRestTime] = useState(0);

  const cuteQuotes = [
    "ure the stinkiest star in the sky of my heart! ✨",
    "every second of your struggle makes me love you more stinky! 💕",
    "ure a superhero whos sick but still studying hard, thats why ur a mommy soo cool! 🦸‍♀️",
    "You're like coffee - bitter at first but sweet in the end! (stinky i got that from google dont rate it okii)☕",
    "Just study a little, focus on getting healthy first love! 🥺",
    "lets watch moviee again in the weekend",
    "ur amazing for studying while you're sick! ur so paking cooollllll  (danggg ur hott i mean imeann ur bodyy cus u sick right right) 👏",
  ];

  const animations = ['🌟', '💖', '🌙', '⭐', '🌸', '🦋', '🌺', '✨', '🎀', '🍭'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCuteAnimation(animations[Math.floor(Math.random() * animations.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % cuteQuotes.length);
  };

  const addWater = () => {
    setWaterCount(waterCount + 1);
  };

  const startRest = () => {
    setRestTime(5);
    const timer = setInterval(() => {
      setRestTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="waiting-container">
      <div className="cute-header">
        <div className="floating-animation">{cuteAnimation}</div>
        <h2>🌸 Whaiting Yelena 🌸</h2>
        <div className="floating-animation">{cuteAnimation}</div>
      </div>

      <div className="motivation-card">
        <h3>💕 Love Words for You 💕</h3>
        <div className="quote-container">
          <p className="quote-text">{cuteQuotes[currentQuoteIndex]}</p>
          <div className="quote-indicator">
            {cuteQuotes.map((_, index) => (
              <span
                key={index}
                className={`indicator-dot ${index === currentQuoteIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
        <button onClick={getNextQuote} className="quote-btn">
          🔄 Next quote
        </button>
      </div>

      <div className="health-reminder">
        <h3>🏥 Health Reminders for My Love 🏥</h3>
        <div className="reminder-grid">
          <div className="reminder-item">
            <span className="reminder-icon">💧</span>
            <div>
              <h4>Study Hydration</h4>
              <p>You've drank {waterCount} glasses while studying!</p>
              <button onClick={addWater} className="water-btn">
                Study water break! 💧
              </button>
            </div>
          </div>

          <div className="reminder-item">
            <span className="reminder-icon">📚</span>
            <div>
              <h4>Study Break Time</h4>
              {restTime > 0 ? (
                <p className="rest-timer">⏰ {restTime} seconds of brain rest...</p>
              ) : (
                <p>Your brain needs 5 minutes to absorb knowledge!</p>
              )}
              <button onClick={startRest} className="rest-btn" disabled={restTime > 0}>
                {restTime > 0 ? 'Brain recharging... 🧠' : 'Study break! 🛌'}
              </button>
            </div>
          </div>

          <div className="reminder-item">
            <span className="reminder-icon">🍎</span>
            <div>
              <h4>Brain Fuel Food</h4>
              <p>Eat something to power your studying brain!</p>
              <p className="cute-note">Healthy snacks make you study better! 🥕</p>
            </div>
          </div>

          <div className="reminder-item">
            <span className="reminder-icon">👀</span>
            <div>
              <h4>Eye Rest Reminder</h4>
              <p>Look away from screen every 20 minutes!</p>
              <p className="cute-note">Your eyes need rest too while studying! 👓</p>
            </div>
          </div>
        </div>
      </div>

      <div className="love-message">
        <h3>💌 Message from Stinkydoo 💌</h3>
        <div className="message-content">
          <p className="love-text">
Stinky, I know youre not feeling 100% right now, but im honestly really impressed by how you still stay committed to your studies. uree really really cool, the coolest girl i know, and it shows how strong and responsible you are.
Just make sure you take small breaks and dontt ignore your body okiii... Keep going at your own pace — ur doing great, and i believe in you.
          </p>
          <p className="love-text">
            imm proud of you for still being enthusiastic about studying.
            But id rather see you healthy and happy.
            im waiting for you to get well okiiii... 💕
          </p>
          <div className="signature">
            <p>From Stinkydoo who loves you the most,</p>
            <p className="love-signature">❤️ Stinkydoo ❤️</p>
          </div>
        </div>
      </div>

      <div className="cute-footer">
        <p>🌈 get Well Soon My Love 🌈</p>
        <p>🦋 im praying for your quick recovery! 🦋</p>
      </div>
    </div>
  );
}

export default WaitingYelena;
