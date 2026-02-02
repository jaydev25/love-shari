import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GeneratePage() {
  const navigate = useNavigate();
  const [wifeName, setWifeName] = useState('');
  const [wifeEmail, setWifeEmail] = useState('');
  const [myEmail, setMyEmail] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = (e) => {
    e.preventDefault();
    
    if (!wifeName.trim() || !wifeEmail.trim() || !myEmail.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Encode parameters using base64 for shorter URL
    const data = JSON.stringify({
      wifeName: wifeName,
      wifeEmail: wifeEmail,
      myEmail: myEmail
    });
    const encodedData = btoa(data);

    // Create the shareable link with clean URLs
    const baseUrl = window.location.origin + window.location.pathname;
    const link = `${baseUrl}#/v/${encodedData}`;
    
    setGeneratedLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    if (generatedLink) {
      const data = JSON.stringify({
        wifeName: wifeName,
        wifeEmail: wifeEmail,
        myEmail: myEmail
      });
      const encodedData = btoa(data);
      navigate(`/v/${encodedData}`);
    }
  };

  return (
    <div className="generate-container">
      <h1>💌 Create Your Valentine Link</h1>
      
      <form onSubmit={handleGenerateLink}>
        <div className="form-group">
          <label htmlFor="wifeName">Your Wife's Name</label>
          <input
            id="wifeName"
            type="text"
            value={wifeName}
            onChange={(e) => setWifeName(e.target.value)}
            placeholder="Enter her beautiful name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="wifeEmail">Your Wife's Email</label>
          <input
            id="wifeEmail"
            type="email"
            value={wifeEmail}
            onChange={(e) => setWifeEmail(e.target.value)}
            placeholder="her@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="myEmail">Your Email (for response)</label>
          <input
            id="myEmail"
            type="email"
            value={myEmail}
            onChange={(e) => setMyEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        <button type="submit" className="button">
          Generate Valentine Link
        </button>
      </form>

      {generatedLink && (
        <div className="link-display">
          <p><strong>📎 Your Valentine Link:</strong></p>
          <p>{generatedLink}</p>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <button 
              className="button copy-button" 
              onClick={handleCopyLink}
              type="button"
            >
              {copied ? '✓ Copied!' : 'Copy Link'}
            </button>
            <button 
              className="button"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', marginTop: 0 }}
              onClick={handleShareLink}
              type="button"
            >
              Preview Link
            </button>
          </div>
          <p style={{ fontSize: '12px', marginTop: '10px', color: '#999' }}>
            Share this link with your wife and let the magic happen! 💕
          </p>
        </div>
      )}
    </div>
  );
}

export default GeneratePage;
