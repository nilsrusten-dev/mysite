"use client"
import React, { useState, FormEvent } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setInviteCode(data.inviteCode);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img width={'100px'} src={'/logo.png'} alt="Talklet Logo" />
        </div>
      </header>

      <main className="main">
        <div className="hero">
          <h1 className="headline">
            A new way to talk online – small, curated tables. Real conversations.
          </h1>
          <p className="subheadline">
            Forget noisy calls. Talklet is built for real, small-group conversations – just 6 people, 35-60 minutes, meaningful topics.
          </p>

          {/* YouTube Video Embed */}
          <div className="video-container">
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/lbQViMBMsXM"
                title="Talklet Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {!submitted ? (
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <p className="helper-text">
                  You will get a personal invite link after signup. Invite friends to move up the waitlist and secure your spot.
                </p>
              </div>
              {error && <div className="error-message">{error}</div>}
              <button 
                type="submit" 
                className="cta-button"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Join the private beta'}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <p>Thanks! Check your inbox. Here is your link: 
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

      <footer className="footer">
        <p>© Talklet 2025</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }
        
        .header {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
          padding: 1rem 0;
        }
        
        .logo img {
          max-width: 100px;
          height: auto;
        }
        
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 800px;
        }
        
        .hero {
          text-align: center;
          width: 100%;
        }
        
        .headline {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          color: #333;
          line-height: 1.3;
        }
        
        .subheadline {
          font-size: 1.1rem;
          margin-bottom: 2.5rem;
          color: #555;
          line-height: 1.6;
          padding: 0 0.5rem;
        }
        
        .video-container {
          margin: 2.5rem 0;
          width: 100%;
          padding: 0 0.5rem;
        }
        
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          background: #000;
        }
        
        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        
        .form {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          padding: 0 0.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        input[type="email"] {
          width: 100%;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          box-sizing: border-box;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .helper-text {
          font-size: 0.9rem;
          color: #666;
          margin-top: 0.8rem;
          line-height: 1.4;
        }
        
        .cta-button {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.2s, transform 0.1s;
          box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
        }
        
        .cta-button:hover:not(:disabled) {
          background-color: #4338ca;
        }
        
        .cta-button:active:not(:disabled) {
          transform: translateY(1px);
        }
        
        .cta-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .error-message {
          color: #e11d48;
          margin: 1rem 0;
          padding: 0.8rem;
          background-color: #fdf2f8;
          border-radius: 6px;
          border-left: 4px solid #e11d48;
        }
        
        .success-message {
          background-color: #f0fdf4;
          color: #166534;
          padding: 1.2rem;
          border-radius: 8px;
          margin: 1.5rem 0;
          border-left: 4px solid #22c55e;
        }
        
        .success-message a {
          color: #166534;
          font-weight: 600;
          margin-left: 0.3rem;
          text-decoration: underline;
        }
        
        .micro-badges {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-top: 2.5rem;
          flex-wrap: wrap;
        }
        
        .micro-badges span {
          background-color: #e0e7ff;
          color: #3730a3;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          white-space: nowrap;
        }
        
        .footer {
          margin-top: 3rem;
          color: #666;
          padding: 1.5rem 0;
          text-align: center;
        }
        
        /* Tablet styles */
        @media (min-width: 768px) {
          .container {
            padding: 1.5rem;
          }
          
          .headline {
            font-size: 2.5rem;
          }
          
          .subheadline {
            font-size: 1.2rem;
            padding: 0 1.5rem;
          }
          
          .video-container {
            padding: 0 1.5rem;
          }
          
          .form {
            padding: 0 1.5rem;
          }
        }
        
        /* Desktop styles */
        @media (min-width: 1024px) {
          .headline {
            font-size: 3rem;
          }
          
          .subheadline {
            font-size: 1.3rem;
            padding: 0 2rem;
          }
        }
        
        /* Mobile adjustments */
        @media (max-width: 480px) {
          .headline {
            font-size: 1.6rem;
          }
          
          .subheadline {
            font-size: 1rem;
          }
          
          .micro-badges {
            flex-direction: column;
            align-items: center;
          }
          
          .micro-badges span {
            width: fit-content;
          }
        }
      `}</style>
    </div>
  );
}