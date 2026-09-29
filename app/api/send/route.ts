import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_EMAILS } from '@/lib/constants/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  /**
   * Optional since 2026-08-28. The homepage CTA asks for an email and nothing
   * else, because every field added to a one-line capture costs completions.
   * The pricing and demo forms still collect a name and still send one.
   */
  name?: string;
  email: string;
  firmSize?: string;
  message?: string;
  source?: "pricing" | "demo" | "home";
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    const source = body.source ?? "pricing";
    /* A map rather than nested ternaries: adding a fourth source used to mean
       editing three separate conditionals and getting one of them wrong. */
    const SOURCES = {
      pricing: { label: "Enterprise Pricing Inquiry", from: "casedelta.com/pricing" },
      demo: { label: "Demo Booking", from: "casedelta.com/demo" },
      home: { label: "Homepage Email Capture", from: "casedelta.com" },
    } as const;
    const { label: headerLabel, from: submittedFrom } = SOURCES[source] ?? SOURCES.pricing;
    const subjectPrefix = headerLabel;
    const displayName = body.name?.trim() || "(not given)";

    const firmSizeBlock = body.firmSize
      ? `<div class="field"><div class="label">Firm Size:</div><div class="value">${body.firmSize}</div></div>`
      : '';
    const firmSizeText = body.firmSize ? `\nFirm Size: ${body.firmSize}` : '';

    const { data, error } = await resend.emails.send({
      from: 'CaseDelta Leads <casedeltaleads@blueprintsw.com>',
      to: [CONTACT_EMAILS.SUPPORT],
      replyTo: body.email,
      subject: `${subjectPrefix}: ${body.name?.trim() || body.email}`,
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
              <h2 style="margin: 0;">${headerLabel}</h2>
            </div>
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${displayName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${body.email}</div>
            </div>
            ${firmSizeBlock}
            ${body.message ? `
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${body.message}</div>
              </div>
            ` : ''}
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
              Submitted from ${submittedFrom}
            </div>
          </body>
        </html>
      `,
      text: `${headerLabel}\n\nName: ${displayName}\nEmail: ${body.email}${firmSizeText}${body.message ? `\nMessage: ${body.message}` : ''}\n\nSubmitted from ${submittedFrom}`,
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
