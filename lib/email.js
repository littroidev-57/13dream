import { Resend } from 'resend';

// Lazy-initialize Resend instance
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

const DEFAULT_TO = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'contact@13dreamsconsultants.com';
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || '13 Dreams Notifications <onboarding@resend.dev>';

/**
 * Send an email notification for student enquiry / apply form submissions
 */
export async function sendEnquiryNotification(data) {
  const resend = getResendClient();
  if (!resend) {
    console.warn('[Resend] RESEND_API_KEY is not configured in environment variables. Email notification skipped.');
    return { success: false, skipped: true };
  }

  const toEmail = DEFAULT_TO;
  const fromEmail = DEFAULT_FROM;
  const formattedDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8fa; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 28px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 0; font-size: 13px; opacity: 0.9; }
          .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-top: 10px; }
          .content { padding: 24px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          .table th, .table td { padding: 12px 14px; text-align: left; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
          .table th { width: 38%; color: #64748b; font-weight: 600; background: #f8fafc; }
          .table td { color: #0f172a; font-weight: 500; }
          .highlight { color: #dc2626; font-weight: 700; }
          .btn-group { margin-top: 24px; display: flex; gap: 12px; }
          .btn { display: inline-block; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none; text-align: center; }
          .btn-primary { background: #dc2626; color: #ffffff; }
          .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 New Student Enquiry Received</h1>
            <p>13 Dreams Consultants — Lead Notification</p>
            <span class="badge">${data.source || 'Study Abroad Enquiry'}</span>
          </div>

          <div class="content">
            <table class="table">
              <tr>
                <th>Student Name</th>
                <td class="highlight">${data.name || 'N/A'}</td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td><a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none;">${data.email || 'N/A'}</a></td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td><a href="tel:${data.phone}" style="color: #0f172a; font-weight: 700; text-decoration: none;">${data.phone || 'N/A'}</a></td>
              </tr>
              <tr>
                <th>Target Destination</th>
                <td class="highlight">${data.preferredDestination || 'Not specified'}</td>
              </tr>
              <tr>
                <th>Study Level</th>
                <td>${data.studyLevel || data.qualification || 'Not specified'}</td>
              </tr>
              <tr>
                <th>Target Intake</th>
                <td>${data.preferredIntake || 'Upcoming'}</td>
              </tr>
              <tr>
                <th>Nearest Office</th>
                <td>${data.office || 'Bareilly'}</td>
              </tr>
              <tr>
                <th>Counselling Mode</th>
                <td>${data.counseling || 'In Person'}</td>
              </tr>
              ${data.interest ? `
              <tr>
                <th>Financial / Details</th>
                <td>${data.interest}</td>
              </tr>` : ''}
              ${data.city ? `
              <tr>
                <th>City</th>
                <td>${data.city}</td>
              </tr>` : ''}
              <tr>
                <th>Submission Time</th>
                <td>${formattedDate}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${data.email}?subject=Regarding Your Study Abroad Enquiry - 13 Dreams Consultants" style="display: inline-block; padding: 12px 24px; background: #dc2626; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 13px;">
                Reply to Student
              </a>
              <a href="tel:${data.phone}" style="display: inline-block; padding: 12px 24px; background: #0f172a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 13px; margin-left: 8px;">
                Call Student
              </a>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0;">Automated lead notification sent to ${toEmail} by 13 Dreams Consultants website.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `🎓 New Lead: ${data.name} [${data.preferredDestination || 'General'}]`,
      html,
    });
    console.log('[Resend] Enquiry notification email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('[Resend] Failed to send enquiry email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send an email notification for Contact Us form submissions
 */
export async function sendContactNotification(data) {
  const resend = getResendClient();
  if (!resend) {
    console.warn('[Resend] RESEND_API_KEY is not configured in environment variables. Email notification skipped.');
    return { success: false, skipped: true };
  }

  const toEmail = DEFAULT_TO;
  const fromEmail = DEFAULT_FROM;
  const formattedDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8fa; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 28px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 24px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          .table th, .table td { padding: 12px 14px; text-align: left; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
          .table th { width: 35%; color: #64748b; font-weight: 600; background: #f8fafc; }
          .table td { color: #0f172a; font-weight: 500; }
          .message-box { margin-top: 18px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #dc2626; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
          .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📩 New Contact Us Message</h1>
            <p>13 Dreams Consultants — Customer Inquiry</p>
          </div>

          <div class="content">
            <table class="table">
              <tr>
                <th>Sender Name</th>
                <td style="font-weight: 700; color: #0f172a;">${data.name || 'N/A'}</td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td><a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none;">${data.email || 'N/A'}</a></td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td><a href="tel:${data.phone}" style="color: #0f172a; font-weight: 700; text-decoration: none;">${data.phone || 'N/A'}</a></td>
              </tr>
              <tr>
                <th>Subject</th>
                <td style="font-weight: 600;">${data.subject || 'General Inquiry'}</td>
              </tr>
              <tr>
                <th>Date & Time</th>
                <td>${formattedDate}</td>
              </tr>
            </table>

            <h3 style="font-size: 14px; color: #64748b; margin: 20px 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
            <div class="message-box">${data.message || 'No message content provided.'}</div>

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject || 'Inquiry at 13 Dreams Consultants')}" style="display: inline-block; padding: 12px 24px; background: #dc2626; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 13px;">
                Reply via Email
              </a>
              <a href="tel:${data.phone}" style="display: inline-block; padding: 12px 24px; background: #0f172a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 13px; margin-left: 8px;">
                Call Sender
              </a>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0;">Automated contact notification sent to ${toEmail} by 13 Dreams Consultants website.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `📩 Contact Form: ${data.name} - ${data.subject || 'Inquiry'}`,
      html,
    });
    console.log('[Resend] Contact notification email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('[Resend] Failed to send contact email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send an automated student greeting / confirmation email when they submit an enquiry
 */
export async function sendStudentEnquiryGreeting(data) {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, skipped: true };
  }

  if (!data.email) {
    return { success: false, error: 'No student email provided' };
  }

  const fromEmail = DEFAULT_FROM;
  const studentEmail = data.email.trim();
  const studentName = data.name || 'Student';
  const destination = data.preferredDestination || 'your chosen destination';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8fa; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0 0 8px 0; font-size: 22px; font-weight: 700; }
          .header p { margin: 0; font-size: 14px; opacity: 0.95; }
          .content { padding: 28px 24px; }
          .greeting { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 16px; }
          .text { font-size: 14px; line-height: 1.65; color: #475569; margin-bottom: 16px; }
          .steps-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 20px 0; }
          .step-item { display: flex; align-items: flex-start; margin-bottom: 12px; font-size: 13px; color: #334155; }
          .step-item:last-child { margin-bottom: 0; }
          .step-num { background: #dc2626; color: #ffffff; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; margin-right: 10px; flex-shrink: 0; margin-top: 2px; }
          .contact-card { background: #fef2f2; border: 1px solid #fee2e2; border-radius: 12px; padding: 16px; margin: 24px 0 16px 0; text-align: center; }
          .btn-wa { display: inline-block; background: #25d366; color: #ffffff; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; margin-top: 12px; }
          .footer { background: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 Thank You for Contacting 13 Dreams!</h1>
            <p>Your Study Abroad Journey Begins Here</p>
          </div>

          <div class="content">
            <p class="greeting">Dear ${studentName},</p>
            <p class="text">
              We are thrilled that you reached out to <strong>13 Dreams Consultants</strong>! We have successfully received your enquiry regarding study abroad counselling and student visa assistance for <strong>${destination}</strong>.
            </p>

            <div class="steps-box">
              <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #0f172a; font-weight: 700;">What Happens Next:</h4>
              <div class="step-item">
                <span class="step-num">1</span>
                <div><strong>Profile Evaluation:</strong> Our senior counsellor is reviewing your target country, course, and qualification.</div>
              </div>
              <div class="step-item">
                <span class="step-num">2</span>
                <div><strong>Free Counselling Call:</strong> An expert advisor will call you at <strong>${data.phone || 'your phone'}</strong> within 24 hours to schedule your 100% free consultation.</div>
              </div>
              <div class="step-item">
                <span class="step-num">3</span>
                <div><strong>University Shortlisting:</strong> We will provide you with a curated list of top global universities, scholarships, and visa checklist.</div>
              </div>
            </div>

            <p class="text">
              Remember, all our initial profile assessments and university counselling services are <strong>100% FREE</strong> with zero hidden service fees!
            </p>

            <div class="contact-card">
              <p style="margin: 0 0 6px 0; font-weight: 700; font-size: 14px; color: #991b1b;">Need Immediate Assistance?</p>
              <p style="margin: 0; font-size: 13px; color: #7f1d1d;">Call our senior counsellors directly at <strong>+91 9759053463</strong> or chat with us on WhatsApp:</p>
              <a href="https://wa.me/919759053463?text=Hi%2013%20Dreams,%20I%20just%20submitted%20my%20study%20abroad%20enquiry" class="btn-wa">
                💬 Chat on WhatsApp
              </a>
            </div>

            <p class="text" style="margin-top: 24px;">
              Warm regards,<br>
              <strong>The Student Admissions Team</strong><br>
              13 Dreams Consultants Private Limited<br>
              <span style="font-size: 12px; color: #64748b;">Bareilly (UP) &amp; Khatima (Uttarakhand)</span>
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0 0 4px 0;">13 Dreams Consultants Private Limited — ISO Aligned Overseas Education Advisors</p>
            <p style="margin: 0;"><a href="https://13dreamsconsultants.com" style="color: #dc2626; text-decoration: none;">www.13dreamsconsultants.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: studentEmail,
      subject: `🎓 We've Received Your Enquiry - 13 Dreams Consultants`,
      html,
    });
    console.log('[Resend] Student greeting email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('[Resend] Could not deliver student greeting email (may require verified custom domain):', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send an automated confirmation email to user when they submit the Contact Us form
 */
export async function sendStudentContactGreeting(data) {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, skipped: true };
  }

  if (!data.email) {
    return { success: false, error: 'No email provided' };
  }

  const fromEmail = DEFAULT_FROM;
  const userEmail = data.email.trim();
  const userName = data.name || 'Valued Visitor';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8fa; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0 0 8px 0; font-size: 22px; font-weight: 700; }
          .content { padding: 28px 24px; }
          .text { font-size: 14px; line-height: 1.65; color: #475569; margin-bottom: 16px; }
          .footer { background: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📩 We've Received Your Message!</h1>
            <p style="margin: 0; font-size: 14px; opacity: 0.95;">13 Dreams Consultants</p>
          </div>

          <div class="content">
            <p style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Dear ${userName},</p>
            <p class="text">
              Thank you for getting in touch with 13 Dreams Consultants. This is an automated confirmation that our support team has received your message regarding: <strong>${data.subject || 'General Inquiry'}</strong>.
            </p>
            <p class="text">
              Our team will review your query and get back to you shortly by email or phone at <strong>${data.phone || 'your contact number'}</strong>.
            </p>
            <p class="text">
              If you have an urgent question, feel free to call our helpline directly at <strong>+91 9759053463</strong> or email us at <strong>contact@13dreamsconsultants.com</strong>.
            </p>
            <p class="text" style="margin-top: 24px;">
              Warm regards,<br>
              <strong>13 Dreams Consultants Team</strong><br>
              <a href="https://13dreamsconsultants.com" style="color: #dc2626; text-decoration: none;">www.13dreamsconsultants.com</a>
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0;">13 Dreams Consultants Private Limited • Bareilly &amp; Khatima</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: userEmail,
      subject: `📩 We've Received Your Message - 13 Dreams Consultants`,
      html,
    });
    console.log('[Resend] User confirmation email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('[Resend] Could not deliver user confirmation email:', error.message);
    return { success: false, error: error.message };
  }
}
