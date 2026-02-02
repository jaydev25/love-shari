import React, { useState } from 'react';

function SetupPage({ onGenerateLink }) {
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

    // Create the shareable link
    const encodedName = encodeURIComponent(wifeName);
    const encodedEmail = encodeURIComponent(wifeEmail);
    const baseUrl = window.location.origin + window.location.pathname;
    const link = `${baseUrl}?wife=${encodedName}&email=${encodedEmail}&myEmail=${encodeURIComponent(myEmail)}`;
    
    setGeneratedLink(link);
    
    // Store the data temporarily for the component
    setTimeout(() => {
      onGenerateLink(wifeName, wifeEmail, myEmail);
    }, 500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="setup-container">
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
          <button 
            className="button copy-button" 
            onClick={handleCopyLink}
          >
            {copied ? '✓ Copied!' : 'Copy Link'}
          </button>
          <p style={{ fontSize: '12px', marginTop: '10px', color: '#999' }}>
            Share this link with your wife and let the magic happen! 💕
          </p>
        </div>
      )}
    </div>
  );
}

export default SetupPage;
