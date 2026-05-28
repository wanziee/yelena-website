import React, { useState, useEffect } from 'react';
import './MailNotification.css';
import emailjs from '@emailjs/browser';

function MailNotification() {
  const [showMail, setShowMail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasMail, setHasMail] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Initialize EmailJS once
    emailjs.init('yv1z-J7ljhODK_mox');
  }, []);

  useEffect(() => {
    // Get today's date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if mail should be shown (today or tomorrow only)
    // You can set a specific start date if needed
    const startDate = new Date(); // Today
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1); // Tomorrow

    const currentDate = new Date();
    
    // Check if current date is within range
    if (currentDate >= startDate && currentDate <= endDate) {
      setHasMail(true);
    }
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
        const templateParams = {
          to_email: 'ichwanalghifa@gmail.com',
          finalMessage: `Hi! babyyy i want to choose ${selectedDate} for our anniversary movie date mwehehehehe... btw im so stinky baby 💕`,
          timestamp: new Date().toLocaleString()
        };

        console.log('Sending email with params:', templateParams);
        const response = await emailjs.send(
          'service_p4pf0zb',
          'template_06c1nd7',
          templateParams
        );
        console.log('Email sent successfully:', response);

        alert('Response sent successfully! 💕');
        handleCloseModal();
      } catch (error) {
        console.error('Error sending email:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        alert(`Failed to send response: ${error.text || error.message || 'Unknown error'}. Please try again or contact directly.`);
      }
    }
  };

  return (
    <>
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

      {showModal && (
        <div className="mail-modal-overlay" onClick={handleCloseModal}>
          <div className="mail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="mail-close-btn" onClick={handleCloseModal}>✕</button>
            <div className="mail-content">
              <div className="mail-header">
                <h2>💌 Invitation for my baby 💌</h2>
              </div>
              <div className="mail-body">
                <p className="mail-greeting">Sayangku Yelena 💕</p>
                <p className="mail-text">
                  Happy 3 Months Anniversary! 🎉
                </p>
                <p className="mail-text">
  I cant believe its been 3 months with you?, Time really feels different when im with someone I truly love i hope feel the same baby..
</p>
<p className="mail-text">
  And even when you get randomly mad sometimes, I still find myself smiling because of you. I dontt mind dealing with your moods at all — honestly, i feel lucky that im the one who gets to understand and face that side of you too.
</p>

<p className="mail-text">
  Sooo, to celebrate our 3rd monthsary, i wanna ask you out to watch a movie with me this weekend hehe. I was thinking maybe we could watch <i>Metamorphosis</i> together since it’s a Korean horror movie and I feel like it’d be way more fun watching it with you. 🎬👻
</p>



<p className="mail-signature">
  With all my love,<br/>
  Your Stinky Boy 💕
</p>
              </div>
              <div className="mail-footer">
                <p className="mail-date">📅 {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>

              <div className="mail-date-selection">
                <button
                  className={`date-btn ${selectedDate === '30 May' ? 'selected' : ''}`}
                  onClick={() => handleDateSelect('30 May')}
                >
                  📅 30 May
                </button>
                <button
                  className={`date-btn ${selectedDate === '31 May' ? 'selected' : ''}`}
                  onClick={() => handleDateSelect('31 May')}
                >
                  📅 31 May
                </button>
                <button
                  className="ok-btn"
                  onClick={handleOkClick}
                  disabled={!selectedDate}
                >
                  ✅ OK
                </button>
              </div>

              <div className="mail-note">
                <p className="note-text">
                  baby if ure busy on those dates u can just tell me and we can choose another date hehe 
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
