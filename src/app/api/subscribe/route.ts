import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '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');

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Generate a unique invite code
    const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Create email content
    const msg = {
      to: email,
      from: {
        email: 'support@talklet.no',
        name: 'Talklet'
      },
      subject: 'Your Talklet Private Beta Invitation',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', sans-serif; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background-color: #7c3aed; color: white; padding: 30px; text-align: center; }
            .content { background-color: #f9fafb; padding: 30px; }
            .footer { background-color: #f3f4f6; padding: 20px; text-align: center; }
            .button { background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
            .code { background-color: #e5e7eb; padding: 10px; border-radius: 4px; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Talklet!</h1>
            </div>
            <div class="content">
              <h2>You're in!</h2>
              <p>Thanks for joining the Talklet private beta. We're excited to have you on board.</p>
              <p>Your personal invite code is:</p>
              <p style="text-align: center;">
                <span class="code">${inviteCode}</span>
              </p>
              <p style="text-align: center;">
                <a href="https://talklet.no/?ref=${inviteCode}" class="button">
                  Join Talklet Now
                </a>
              </p>
              <p>Share this link with friends to move up the waitlist and secure your spot faster.</p>
              <p><strong>How it works:</strong></p>
              <ul>
                <li>Small, curated tables of interesting people</li>
                <li>25-minute conversations on meaningful topics</li>
                <li>Private beta access with limited seats</li>
              </ul>
            </div>
            <div class="footer">
              <p>© 2025 Talklet. All rights reserved.</p>
              <p>You're receiving this email because you signed up for Talklet's private beta.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to Talklet!
        
        Thanks for joining the Talklet private beta. We're excited to have you on board.
        
        Your personal invite code is: ${inviteCode}
        
        Use this link to join: https://talklet.no/?ref=${inviteCode}
        
        Share this link with friends to move up the waitlist and secure your spot faster.
        
        How it works:
        - Small, curated tables of interesting people
        - 25-minute conversations on meaningful topics
        - Private beta access with limited seats
        
        © 2025 Talklet. All rights reserved.
        
        You're receiving this email because you signed up for Talklet's private beta.
      `
    };

    // Send email using SendGrid
    await sgMail.send(msg);

    // Return success response with the invite code
    return NextResponse.json({ 
      success: true, 
      inviteCode,
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
