import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadFormData {
  name: string;
  email: string;
  company?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadFormData = await request.json();
    
    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'CaseDelta Leads <casedeltaleads@blueprintsw.com>',
      to: ['camren@casedelta.com'],
      replyTo: body.email,
      subject: `New Lead: ${body.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                border-bottom: 2px solid #000;
                padding-bottom: 10px;
                margin-bottom: 20px;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: 600;
                color: #000;
              }
              .value {
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2 style="margin: 0;">New CaseDelta Lead</h2>
            </div>
            
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${body.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${body.email}</div>
            </div>
            
            ${body.company ? `
              <div class="field">
                <div class="label">Law Firm:</div>
                <div class="value">${body.company}</div>
              </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
              This lead was submitted from casedelta.com/get-info
            </div>
          </body>
        </html>
      `,
      text: `New CaseDelta Lead\n\nName: ${body.name}\nEmail: ${body.email}${body.company ? `\nLaw Firm: ${body.company}` : ''}\n\nThis lead was submitted from casedelta.com/get-info`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        messageId: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
