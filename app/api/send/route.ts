import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_EMAILS } from '@/lib/constants/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  firmSize: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    if (!body.name || !body.email || !body.firmSize) {
      return NextResponse.json(
        { error: 'Name, email, and firm size are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'CaseDelta Leads <casedeltaleads@blueprintsw.com>',
      to: [CONTACT_EMAILS.SUPPORT],
      replyTo: body.email,
      subject: `Enterprise Pricing Inquiry: ${body.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: 600; color: #000; }
              .value { color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2 style="margin: 0;">Enterprise Pricing Inquiry</h2>
            </div>
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${body.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${body.email}</div>
            </div>
            <div class="field">
              <div class="label">Firm Size:</div>
              <div class="value">${body.firmSize}</div>
            </div>
            ${body.message ? `
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${body.message}</div>
              </div>
            ` : ''}
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
              Submitted from casedelta.com/pricing
            </div>
          </body>
        </html>
      `,
      text: `Enterprise Pricing Inquiry\n\nName: ${body.name}\nEmail: ${body.email}\nFirm Size: ${body.firmSize}${body.message ? `\nMessage: ${body.message}` : ''}\n\nSubmitted from casedelta.com/pricing`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: data?.id }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
