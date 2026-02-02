import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ValentinePage() {
  const { data } = useParams();
  const navigate = useNavigate();
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBunny, setShowBunny] = useState(false);
  const [randomBunnyIndex, setRandomBunnyIndex] = useState(0);
  const noButtonRef = useRef(null);

  // Decode the base64 data
  let decodedWifeName = '';
  let decodedWifeEmail = '';
  let decodedMyEmail = '';
  
  try {
    const decodedData = JSON.parse(atob(data));
    decodedWifeName = decodedData.wifeName;
    decodedWifeEmail = decodedData.wifeEmail;
    decodedMyEmail = decodedData.myEmail;
  } catch (error) {
    console.error('Error decoding data:', error);
  }

  const handleYes = async () => {
    setLoading(true);
    
    try {
      // Send email using mailto link
    //   const mailtoLink = `mailto:${decodedMyEmail}?subject=${encodeURIComponent(decodedWifeName + ' said YES!')}&body=${encodeURIComponent(`Great news!\n\n${decodedWifeName} has agreed to be your Valentine!\n\nHer email: ${decodedWifeEmail}\n\nYou are the luckiest person alive! 💕`)}`;
      
      // Create a temporary link and click it
    //   const link = document.createElement('a');
    //   link.href = mailtoLink;
    //   link.click();

      setAnswered(true);
    } catch (error) {
      console.error('Error:', error);
      setAnswered(true);
    }
    setLoading(false);
  };

  const handleNoHover = () => {
    if (noButtonRef.current) {
      const randomX = (Math.random() - 0.5) * 300;
      const randomY = (Math.random() - 0.5) * 300;
      noButtonRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`;
        const randomIndex = Math.floor(Math.random() * 5);
        setRandomBunnyIndex(randomIndex);
        setShowBunny(true);
        setTimeout(() => setShowBunny(false), 3000);
    }
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    handleNoHover();
    const randomIndex = Math.floor(Math.random() * 5);
    setRandomBunnyIndex(randomIndex);
    setShowBunny(true);
    setTimeout(() => setShowBunny(false), 2000);
  };

  const handleBackToGenerate = () => {
    navigate('/');
  };

  if (answered) {
    return (
      <div className="valentine-container">
        <div className="success-icon">🎉</div>
        <div className="success-message">
          YES! 💕
        </div>
        <img 
        src={`${process.env.PUBLIC_URL}/cute-bunny-snowball-6.webp`}
        alt="Bunny Snowball"
        />
        <p style={{ fontSize: '20px', color: '#666', marginBottom: '20px' }}>
          An email confirmation has been sent to {decodedMyEmail}
        </p>
        <p style={{ fontSize: '18px', color: '#999' }}>
          {decodedWifeName} just made you the happiest person! 💌
        </p>
        <button className="button back-button" onClick={handleBackToGenerate}>
          Create Another Link
        </button>
      </div>
    );
  }

  return (
    <div className="valentine-container">
      {showBunny && (
        <div className="bunny-snowball">
          <img 
            src={`${process.env.PUBLIC_URL}/cute-bunny-snowball-${randomBunnyIndex}.webp`}
            alt="Bunny Snowball"
            className="bunny-image"
          />
        </div>
      )}
      
      <h1>💕 Will you be my Valentine? 💕</h1>
      <div className="wife-name">{decodedWifeName}?</div>
      <p>You mean the world to me...</p>
      
      <div className="button-group">
        <button 
          className="button yes-button"
          onClick={handleYes}
          disabled={loading}
        >
          {loading ? 'Processing...' : '💚 YES'}
        </button>
        
        <button 
          ref={noButtonRef}
          className="button no-button"
          onMouseEnter={handleNoHover}
          onClick={handleNoClick}
          onTouchStart={handleNoHover}
          style={{
            transition: 'transform 0.2s ease-out',
            cursor: 'pointer'
          }}
        >
          ❌ NO
        </button>
      </div>
    </div>
  );
}

export default ValentinePage;
