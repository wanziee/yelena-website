import React, { useState, useEffect } from 'react';
import './MailNotification.css';
import emailjs from '@emailjs/browser';

function MailNotification() {
  const [showMail, setShowMail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasMail, setHasMail] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Initialize EmailJS once
    emailjs.init('yv1z-J7ljhODK_mox');
  }, []);

  useEffect(() => {
    // Show mail notification
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);

    const currentDate = new Date();

    if (currentDate >= startDate && currentDate <= endDate) {
      setHasMail(true);
    }

    // Animation trigger
    setTimeout(() => {
      setShowMail(true);
    }, 1000);
  }, []);

  const handleMailClick = () => {
    setShowModal(true);
    setHasMail(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleOkClick = async () => {
  if (selectedDate) {
    try {
      setIsLoading(true);

      const formattedDate = new Date(selectedDate).toLocaleDateString(
        'en-US',
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      );

      const templateParams = {
        to_email: 'ichwanalghifa@gmail.com',
        finalMessage: `Hi! babyyy i want to choose ${formattedDate} for our anniversary movie date mwehehehehe... btw im so stinky baby 💕`,
        timestamp: new Date().toLocaleString(),
      };

      console.log('Sending email with params:', templateParams);

      const response = await emailjs.send(
        'service_p4pf0zb',
        'template_06c1nd7',
        templateParams
      );

      console.log('Email sent successfully:', response);

      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);
handleCloseModal();

setTimeout(() => {
  setShowSuccess(false);
}, 4000);
      }, 1500);

    } catch (error) {
      setIsLoading(false);

      console.error('Error sending email:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));

      alert(
        `Failed to send response: ${
          error.text || error.message || 'Unknown error'
        }. Please try again or contact directly.`
      );
    }
  }
};

  return (
    <>
      {(hasMail || showModal) && <div className="dark-overlay"></div>}
      {hasMail && (
        <div
          className={`mail-icon-container ${showMail ? 'animate' : ''}`}
          onClick={handleMailClick}
          title="You have mail!"
        >
          <div className="flower flower-1">🌸</div>
          <div className="flower flower-2">🌼</div>
          <div className="flower flower-3">🌷</div>

          <div className="mail-icon">
            <img
              src="/images/email.png"
              alt="mail"
              className="mail-image"
            />

            {showMail && <span className="mail-badge">!</span>}
          </div>
        </div>
      )}
      {showSuccess && (
  <div className="success-popup">
    <div className="success-heart">💖</div>

    <h3 className="success-title">
      Response Sent Successfully!
    </h3>

    <p className="success-text">
      Yayyy your movie date response has been sent hehe 🥺💕
    </p>
  </div>
)}

      {showModal && (
        <div
          className="mail-modal-overlay"
          onClick={handleCloseModal}
        >
          <div
            className="mail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mail-close-btn"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            <div className="mail-content">
              <div className="mail-header">
                <h2>💌 Invitation for my baby 💌</h2>
              </div>

              <div className="mail-body">
                <p className="mail-greeting">
                  Sayangku Yelena 💕
                </p>

                <p className="mail-text">
                  Happy 3 Months Anniversary! 🎉
                </p>

                <p className="mail-text">
                  I cant believe its been 3 months with you? Time really
                  feels different when im with someone i truly love i hope
                  feel the same baby..
                </p>

                <p className="mail-text">
                  And even when you get randomly mad sometimes, i still
                  find myself smiling because of you. i dont mind dealing
                  with your moods at all — honestly, i feel lucky that im
                  the one who gets to understand and face that side of you
                  too.
                </p>

                <p className="mail-text">
                  Sooo, to celebrate our 3rd monthsary, i wanna ask you
                  to watch a movie with me this weekend hehe. i was
                  thinking maybe we could watch <i>Metamorphosis</i>{' '}
                  together, it’s a Korean horror movie and i feel
                  like it’d be way more fun watching it with you. 🎬👻
                </p>

                <p className="mail-signature">
                  With all my love,
                  <br />
                  Your Stinky Boy 💕
                </p>
              </div>

              <div className="mail-footer">
                <p className="mail-date">
                  📅{' '}
                  {new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {/* DATE PICKER */}
<div className="mail-date-selection">


  <div className="date-picker-card">
    <div className="date-picker-top">
      <span className="calendar-icon">📅</span>

      <div>
        <p className="date-label">
          Choose Our Movie Date
        </p>

        <p className="date-subtext">
          Pick any date you want babyyy, ill make time for you no matter what 🥺💕
        </p>
      </div>
    </div>

    <input
      type="date"
      className="date-input"
      value={selectedDate}
      onChange={(e) =>
        handleDateSelect(e.target.value)
      }
      min={
        new Date().toISOString().split('T')[0]
      }
    />
  </div>

  <button
    className={`ok-btn ${isLoading ? 'loading' : ''}`}
    onClick={handleOkClick}
    disabled={!selectedDate || isLoading}
  >
    {isLoading ? (
      <span className="loading-content">
        <span className="spinner"></span>
        Sending...
      </span>
    ) : (
      '💌 Send Response'
    )}
  </button>
</div>

              <div className="mail-note">

                <p className="note-text">
                  btw sorry if its looking bad bcs im making this when im
                  going home in a car rn hehe
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MailNotification;