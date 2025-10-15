"use client"
import React, { useState, FormEvent, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // Check localStorage for cookie preference on component mount
  useEffect(() => {
    const cookiePreference = localStorage.getItem('cookiesAccepted');
    if (cookiePreference !== null) {
      setShowCookieBanner(false);
      setCookiesAccepted(cookiePreference === 'true');
    }
  }, []);

  // Google Ads conversion tracking function
  const gtagReportConversion = (url?: string) => {
    const callback = function () {
      if (typeof(url) != 'undefined') {
        window.location.href = url;
      }
    };
    
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as { gtag: (...args: unknown[]) => void }).gtag;
      gtag('event', 'conversion', {
        'send_to': 'AW-17648364616/BI1vCKmIhq0bEMjYst9B',
        'event_callback': callback
      });
    }
    return false;
  };

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
      
      // Track conversion only if cookies are accepted
      if (cookiesAccepted) {
        gtagReportConversion();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptCookies = () => {
    setShowCookieBanner(false);
    setCookiesAccepted(true);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  const handleRejectCookies = () => {
    setShowCookieBanner(false);
    setCookiesAccepted(false);
    localStorage.setItem('cookiesAccepted', 'false');
  };

  return (
    <>
      {/* Google Ads Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-17648364616/BI1vCKmIhq0bEMjYst9B',
                  'event_callback': callback
              });
              return false;
            }
          `
        }}
      />
    <div className="container">
      <header className="header">
        <div className="logo">
          <img width={'100px'} src={'/logo.png'} alt="Talklet Logo" />
        </div>
      </header>

      <main className="main">
        <div className="hero">
          <h1 className="headline">
            Small tables. Real talk. AI that listens.
          </h1>
          <p className="subheadline">
A new way to talk online – real conversations with AI presence.
Forget noisy calls and endless chatter. Talklet creates small, curated tables where up to 6 people meet for meaningful discussions — guided by an AI that listens, balances the flow, and captures the essence of every conversation.
    </p>
    <p className="subheadline">
Every session ends with a smart AI summary, so you can revisit key ideas without recordings or notes.          </p>

          <div className="features-section">
            <h2 className="features-title">Features</h2>
            <div className="features-list">
              <div className="feature-item">
                <strong>Small, curated tables</strong> – Just 6 people, 35–60 minutes, one topic.
              </div>
              <div className="feature-item">
                <strong>AI moderator</strong> – Ensures balance and flow in the conversation.
              </div>
              <div className="feature-item">
                <strong>AI summaries</strong> – Automatic highlights after each talk.
              </div>
              <div className="feature-item">
                <strong>Private and safe</strong> – No recordings, only live transcription for summaries.
              </div>
            </div>
          </div>

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
                  You’ll receive your personal invite link after signup.
Invite friends to move up the waitlist and secure your spot for the first real AI-powered conversations online.
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
        <div className="support-section">
          <button 
            className="support-button"
            onClick={() => window.location.href = 'mailto:support@talklet.com'}
          >
            Contact Support
          </button>
          <p className="support-text">Or contact us directly at: support@talklet.com</p>
        </div>
        <div className="footer-links">
          <a href="/privacy-cookies" className="footer-link">Privacy & Cookies</a>
        </div>
        <p>© Talklet 2025</p>
      </footer>

      {showCookieBanner && (
        <div className="cookie-banner">
          <div className="cookie-content">
            <p className="cookie-text">
              We use cookies to improve your experience and measure traffic.
            </p>
            <div className="cookie-actions">
              <button 
                className="cookie-btn cookie-accept"
                onClick={handleAcceptCookies}
              >
                Accept
              </button>
              <button 
                className="cookie-btn cookie-reject"
                onClick={handleRejectCookies}
              >
                Reject
              </button>
              <a 
                href="/privacy-cookies" 
                className="cookie-link"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      )}

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
        
        .features-section {
          margin: 2.5rem auto;
          padding: 0 0.5rem;
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .features-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #333;
          text-align: center;
        }
        
        .features-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        
        .feature-item {
          background-color: rgba(255, 255, 255, 0.8);
          padding: 1.2rem;
          border-radius: 10px;
          border-left: 4px solid #4f46e5;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          font-size: 1rem;
          line-height: 1.5;
          color: #444;
        }
        
        .feature-item strong {
          color: #4f46e5;
          font-weight: 600;
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
        
        .footer-links {
          margin: 1rem 0;
        }
        
        .footer-link {
          color: #666;
          text-decoration: underline;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        
        .footer-link:hover {
          color: #4f46e5;
        }
        
        .support-section {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .support-button {
          background-color: #10b981;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
          box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
        }
        
        .support-button:hover {
          background-color: #059669;
        }
        
        .support-button:active {
          transform: translateY(1px);
        }
        
        .support-text {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
        }
        
        .cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid #e5e7eb;
          box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          padding: 1rem;
        }
        
        .cookie-content {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .cookie-text {
          font-size: 0.9rem;
          color: #374151;
          margin: 0;
          flex: 1;
          min-width: 200px;
        }
        
        .cookie-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        
        .cookie-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .cookie-accept {
          background-color: #4f46e5;
          color: white;
        }
        
        .cookie-accept:hover {
          background-color: #4338ca;
        }
        
        .cookie-reject {
          background-color: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }
        
        .cookie-reject:hover {
          background-color: #e5e7eb;
        }
        
        .cookie-link {
          color: #4f46e5;
          text-decoration: underline;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .cookie-link:hover {
          color: #4338ca;
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
          
          .features-section {
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
          
          .cookie-content {
            flex-direction: column;
            text-align: center;
          }
          
          .cookie-actions {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </div>
    </>
  );
}