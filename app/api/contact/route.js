import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';
import { sendContactNotification, sendStudentContactGreeting } from '@/lib/email';

export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
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
      savedContact = await Contact.create(formattedData);
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
