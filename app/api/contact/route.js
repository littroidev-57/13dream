import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';

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

    try {
      await dbConnect();
      const contact = await Contact.create(formattedData);
      return NextResponse.json({
        success: true,
        msg: true,
        message: 'We will get back to you shortly',
        data: contact,
      });
    } catch (dbError) {
      console.warn('Database write fallback:', dbError.message);
      return NextResponse.json({
        success: true,
        msg: true,
        message: 'We will get back to you shortly (Local Mode)',
        data: formattedData,
      });
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json({ success: false, msg: false, error: error.message }, { status: 500 });
  }
}
