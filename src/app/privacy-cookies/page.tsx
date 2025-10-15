
"use client"

import Link from "next/link";

export default function PrivacyCookies() {
  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img width={'100px'} src={'/logo.png'} alt="Talklet Logo" />
        </div>
      </header>

      <main className="main">
        <div className="content">
          <h1 className="title">Talklet – Privacy & Cookies Policy</h1>
          <p className="updated">Last updated: 15.10.2025</p>

          <section className="section">
            <h2>1. What we collect & how long we keep it</h2>
            <p>
              We collect your email address when you join the waitlist. We use this for launch updates, 
              feature announcements, and occasional product news.
            </p>
            <p>
              We keep your email data only as long as necessary for these purposes (for example, 
              until you unsubscribe or request deletion).
            </p>
          </section>

          <section className="section">
            <h2>2. Your rights & data control</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Export your data (we can provide a download)</li>
              <li>Request deletion of your data</li>
              <li>Correct or update your data</li>
            </ul>
            <p>You can contact us at <a href="mailto:support@talklet.com">support@talklet.com</a> to exercise these rights.</p>
          </section>

          <section className="section">
            <h2>3. How data is stored & shared</h2>
            <p>
              Your email is stored securely in Supabase. We use SendGrid to send emails, 
              and Google Analytics / Google Ads for analytics and remarketing.
            </p>
            <p>We do not share or sell your email to any other third parties.</p>
            <p>
              If data is transferred outside the EU/EØS, we ensure standard contractual clauses or other safeguards.
            </p>
          </section>

          <section className="section">
            <h2>4. Cookies & tracking</h2>
            <p>We use cookies for:</p>
            <ul>
              <li>Essential functionality (necessary for site operations)</li>
              <li>Analytics cookies (via Google Analytics)</li>
              <li>Marketing & remarketing cookies (via Google Ads)</li>
            </ul>
            <p>
              These cookies help us understand site usage and run ads. All non-essential cookies 
              are inactive until you give consent via cookie banner.
            </p>
            <p>You can accept or reject cookies, and update preferences anytime.</p>
            <p>
              Cookies persist for varying durations (e.g. 30 days, 90 days), depending on type.
            </p>
          </section>

          <section className="section">
            <h2>5. Policy changes</h2>
            <p>
              We may update this policy occasionally. Any changes will be posted with a new Last updated date. 
              Continued use implies acceptance of the updated terms.
            </p>
          </section>

          <section className="section">
            <h2>6. Contact & controller</h2>
            <p>Talklet AS is the data controller.</p>
            <p>If you have questions or requests, contact us at:</p>
            <p>📧 <a href="mailto:support@talklet.com">support@talklet.com</a></p>
          </section>

          <div className="back-link">
            <Link href="/">← Back to Home</Link>
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
          margin-bottom: 2rem;
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
        
        .content {
          background: rgba(255, 255, 255, 0.9);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          margin-bottom: 2rem;
        }
        
        .title {
          font-size: 2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        
        .updated {
          text-align: center;
          color: #666;
          font-style: italic;
          margin-bottom: 2rem;
        }
        
        .section {
          margin-bottom: 2rem;
        }
        
        .section h2 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #4f46e5;
          margin-bottom: 1rem;
          border-bottom: 2px solid #e0e7ff;
          padding-bottom: 0.5rem;
        }
        
        .section p {
          line-height: 1.6;
          color: #444;
          margin-bottom: 1rem;
        }
        
        .section ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .section li {
          line-height: 1.6;
          color: #444;
          margin-bottom: 0.5rem;
        }
        
        .section a {
          color: #4f46e5;
          text-decoration: underline;
        }
        
        .section a:hover {
          color: #4338ca;
        }
        
        .back-link {
          text-align: center;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }
        
        .back-link a {
          color: #4f46e5;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: background-color 0.2s;
        }
        
        .back-link a:hover {
          background-color: #e0e7ff;
        }
        
        .footer {
          margin-top: 2rem;
          color: #666;
          padding: 1.5rem 0;
          text-align: center;
        }
        
        /* Mobile adjustments */
        @media (max-width: 768px) {
          .content {
            padding: 1.5rem;
          }
          
          .title {
            font-size: 1.5rem;
          }
          
          .section h2 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}