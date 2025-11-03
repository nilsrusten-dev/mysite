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
      subject: 'Welcome to Talklet 🎉 Something real is starting soon',
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
              <h1>You're in — welcome to the very start of Talklet 👋</h1>
            </div>
            <div class="content">
              <p>Hi,</p>
              <p>You just joined something rare — a space built for real conversations, not noise.<br>
              We're thrilled to have you here. 🎉</p>
              <p>Talklet is all about meaningful small-group talks — honest voices, curious minds, and ideas that matter. You've joined early, which means you're helping shape what this place becomes.</p>
              <p>When we open the first tables, you'll be one of the first invited to talk, listen, and see what happens when people meet without algorithms getting in the way.</p>
              <p>Until then, keep an eye on your inbox — we'll only send updates that matter.</p>
              <p>And if you know someone who'd love being part of this from the very beginning, share <a href="https://talklet.com" style="color: #7c3aed; text-decoration: none;">talklet.com</a>.<br>
              Every person you bring in helps build the kind of conversations the internet forgot to make space for. 💬</p>
              <p>See you soon,<br>
              — The Talklet Team</p>
            </div>
            <div class="footer">
              <p>© 2025 Talklet. All rights reserved.</p>
              <p>You're receiving this email because you signed up for early access to Talklet.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi,


You just joined something rare — a space built for real conversations, not noise.
We're thrilled to have you here. 🎉

Talklet is all about meaningful small-group talks — honest voices, curious minds, and ideas that matter. You've joined early, which means you're helping shape what this place becomes.

When we open the first tables, you'll be one of the first invited to talk, listen, and see what happens when people meet without algorithms getting in the way.

Until then, keep an eye on your inbox — we'll only send updates that matter.

And if you know someone who'd love being part of this from the very beginning, share talklet.com.
Every person you bring in helps build the kind of conversations the internet forgot to make space for. 💬

See you soon,
— The Talklet Team

© 2025 Talklet. All rights reserved.
You're receiving this email because you signed up for early access to Talklet.
      `
    };

    // Send email using SendGrid
    await sgMail.send(msg);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Subscription error:', JSON.stringify(error));
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
