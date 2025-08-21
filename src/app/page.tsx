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

      <footer className="talklet-footer">
        <p>© Talklet 2025</p>
      </footer>

      <style jsx>{`
        .talklet-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: linear-gradient(135deg, #faf7f4 0%, #f3f4f6 100%);
          color: #1a1a1a;
        }
        
        .talklet-header {
          padding: 2rem 5%;
        }
        
        .talklet-logo {
          font-weight: 800;
          font-size: 2rem;
          color: #7c3aed;
          letter-spacing: -0.5px;
        }
        
        .talklet-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 5%;
        }
        
        .talklet-hero {
          max-width: 600px;
          text-align: center;
          padding: 3.5rem 3rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .talklet-headline {
          font-size: 2.75rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          color: #1a1a1a;
          letter-spacing: -0.5px;
        }
        
        .talklet-subheadline {
          font-size: 1.35rem;
          color: #666;
          margin-bottom: 2.5rem;
          line-height: 1.5;
        }
        
        .talklet-form {
          margin-bottom: 2.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        input {
          width: 100%;
          padding: 1.2rem 1.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1.1rem;
          transition: all 0.2s ease;
        }
        
        input:focus {
          outline: none;
          border-color: #7c3aed;
          box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
        }
        
        input:disabled {
          background-color: #f3f4f6;
          cursor: not-allowed;
        }
        
        .helper-text {
          font-size: 0.95rem;
          color: #666;
          margin-top: 0.75rem;
          line-height: 1.5;
        }
        
        .error-message {
          color: #ef4444;
          margin-bottom: 1rem;
          font-size: 0.95rem;
          background-color: #fef2f2;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border-left: 4px solid #ef4444;
        }
        
        .cta-button {
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 1.2rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.3);
        }
        
        .cta-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.4);
        }
        
        .cta-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .success-message {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 1.75rem;
          border-radius: 12px;
          margin-bottom: 2.5rem;
          box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
        }
        
        .success-message a {
          color: white;
          text-decoration: underline;
          font-weight: 600;
          margin: 0 0.25rem;
        }
        
        .micro-badges {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          font-size: 0.95rem;
          color: #666;
          font-weight: 500;
        }
        
        .micro-badges span {
          position: relative;
        }
        
        .micro-badges span:not(:last-child):after {
          content: "•";
          position: absolute;
          right: -0.875rem;
          color: #d1d5db;
        }
        
        .talklet-footer {
          text-align: center;
          padding: 2.5rem;
          color: #666;
          font-size: 0.95rem;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .talklet-hero {
            padding: 2.5rem 2rem;
            margin: 1rem;
          }
          
          .talklet-headline {
            font-size: 2.25rem;
          }
          
          .talklet-subheadline {
            font-size: 1.15rem;
          }
          
          .micro-badges {
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .micro-badges span:not(:last-child):after {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
