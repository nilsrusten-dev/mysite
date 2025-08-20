'use client';
import React, { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [inviteCode] = useState('YOURCODE'); // This would be generated dynamically in a real app

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the email
    console.log('Email submitted:', email);
    setSubmitted(true);
  };

  return (
    <div className="talklet-container">
      <header className="talklet-header">
        <div className="talklet-logo">Talklet</div>
      </header>

      <main className="talklet-main">
        <div className="talklet-hero">
          <h1 className="talklet-headline">
            Be the first to try a social experiment unlike anything before.
          </h1>
          <p className="talklet-subheadline">
            Small, curated tables. 25-minute conversations with meaningful topics.
          </p>

          {!submitted ? (
            <form className="talklet-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="helper-text">
                  You'll get a personal invite link after signup. Invite friends to move up the waitlist and secure your spot.
                </p>
              </div>
              <button type="submit" className="cta-button">
                Join the private beta
              </button>
            </form>
          ) : (
            <div className="success-message">
              <p>Thanks! Check your inbox. Here's your link: 
                <a href={`https://talklet.no/?ref=${inviteCode}`}>talklet.no/?ref={inviteCode}</a> 
                — share it to skip the line.
              </p>
            </div>
          )}

          <div className="micro-badges">
            <span>Private beta</span>
            <span>Invite-only</span>
            <span>Limited seats</span>
          </div>
        </div>
      </main>

      <footer className="talklet-footer">
        <p>© Talklet 2025</p>
      </footer>
    </div>
  );
}
