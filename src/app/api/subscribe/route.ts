import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  sgMail.setApiKey(process.env.SENDGRID_KEY || '');
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );
  try {
    // Check if request body exists and is valid JSON
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { email } = body;

    // Validate email exists in the request
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

     // Store email in Supabase
    const { data, error: supabaseError } = await supabase
      .from('subscribers') // 
      .insert([{ email }]);

    if (supabaseError) {
      console.error('Supabase insert error:', supabaseError);
      return NextResponse.json(
        { error: 'Failed to save email in database' },
        { status: 500 }
      );
    }

    // Create email content
    const msg = {
      to: email,
      from: {
        email: 'contact@talklet.no',
        name: 'Talklet'
      },
      subject: 'Welcome to Talklet 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', sans-serif; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background-color: #7c3aed; color: white; padding: 30px; text-align: center; }
            .content { background-color: #f9fafb; padding: 30px; }
            .footer { background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #555; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Talklet!</h1>
            </div>
            <div class="content">
              <p>Hi,</p>
              <p>Thanks for signing up! 🎉</p>
              <p>We’re building <strong>Talklet</strong> – a social experiment for real conversations and real connections online.</p>
              <p>You’re now among the very first to get updates. No spam, just the moments that matter.</p>
              <p>Launch is only a few months away. Stay tuned – together we can push the future forward.</p>
              <p>– The Talklet Team</p>
            </div>
            <div class="footer">
              <p>© 2025 Talklet. All rights reserved.</p>
              <p>You're receiving this email because you signed up for Talklet updates.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi,

Thanks for signing up! 🎉
We’re building Talklet – a social experiment for real conversations and real connections online.

You’re now among the very first to get updates. No spam, just the moments that matter.

Launch is only a few months away. Stay tuned – together we can push the future forward.

– The Talklet Team

© 2025 Talklet. All rights reserved.
You're receiving this email because you signed up for Talklet updates.
      `
    };

    // Send email using SendGrid
    await sgMail.send(msg);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      key: process.env.SENDGRID_KEY,
      subscriber: data,
    });

  } catch (error) {
    console.error('Subscription error:', JSON.stringify(error));
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
