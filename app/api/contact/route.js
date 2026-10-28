import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';
import { sendContactNotification, sendStudentContactGreeting } from '@/lib/email';
import { getClientIp, checkRateLimit } from '@/lib/rateLimit';
import { validateFormSpam } from '@/lib/spamFilter';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(request) {
  try {
    const auth = verifyAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }


    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // 1. Check IP rate limit (max 5 requests per 10 minutes, min 3s burst interval)
    const rateLimit = checkRateLimit(clientIp, {
      maxRequests: 5,
      windowSeconds: 600,
      minIntervalSeconds: 3,
    });

    if (!rateLimit.allowed) {
      console.warn(`[Security] Contact rate limit exceeded for IP: ${clientIp} (${rateLimit.reason})`);
      return NextResponse.json(
        {
          success: false,
          msg: false,
          error: rateLimit.message,
          retryAfter: rateLimit.retryAfter,
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 2. Anti-Spam Bot Heuristic Filter (Honeypot, Gibberish Name, Fast Submission)
    const spamCheck = validateFormSpam(body);
    if (spamCheck.isSpam) {
      console.warn(`[AntiSpam] Blocked bot contact message from IP: ${clientIp}. Reason: ${spamCheck.reason} (${spamCheck.details})`);
      return NextResponse.json({
        success: true,
        msg: true,
        message: 'We will get back to you shortly',
        data: { blocked: true },
      });
    }

    // 3. Google reCAPTCHA Verification (if configured)
    const recaptchaToken = body.recaptchaToken || body['g-recaptcha-response'];
    const recaptchaResult = await verifyRecaptcha(recaptchaToken, clientIp);
    if (!recaptchaResult.success) {
      return NextResponse.json(
        {
          success: false,
          msg: false,
          error: recaptchaResult.error || 'reCAPTCHA verification failed. Please try again.',
        },
        { status: 400 }
      );
    }

    const { name, phone, email, subject, message } = body;

    const formattedData = {
      name: name || body.user || '',
      phone: phone || body.con_phone || '',
      email: email || body.con_email || '',
      subject: subject || body.con_subject || 'General Inquiry',
      message: message || body.con_message || '',
    };

    if (!formattedData.name || !formattedData.phone || !formattedData.email || !formattedData.message) {
      return NextResponse.json(
        { success: false, msg: false, error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    let savedContact = null;
    try {
      await dbConnect();

      // Check if contact already exists by phone or email to prevent duplicate entries
      const filterConditions = [];
      if (formattedData.phone) filterConditions.push({ phone: formattedData.phone });
      if (formattedData.email) filterConditions.push({ email: formattedData.email });

      const existing = filterConditions.length > 0
        ? await Contact.findOne({ $or: filterConditions }).sort({ createdAt: -1 })
        : null;

      if (existing) {
        savedContact = await Contact.findByIdAndUpdate(
          existing._id,
          {
            $set: {
              ...formattedData,
              updatedAt: new Date(),
            },
          },
          { returnDocument: 'after' }
        );
      } else {
        savedContact = await Contact.create(formattedData);
      }
    } catch (dbError) {
      console.warn('Database write fallback:', dbError.message);
    }

    // Trigger Resend email notifications (Admin alert + Sender confirmation)
    try {
      await Promise.allSettled([
        sendContactNotification(formattedData),
        sendStudentContactGreeting(formattedData),
      ]);
    } catch (emailError) {
      console.error('Email notification error (non-blocking):', emailError);
    }

    return NextResponse.json({
      success: true,
      msg: true,
      message: 'We will get back to you shortly',
      data: savedContact || formattedData,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json({ success: false, msg: false, error: error.message }, { status: 500 });
  }
}
