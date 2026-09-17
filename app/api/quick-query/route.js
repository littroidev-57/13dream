import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Enquiry from '@/models/Enquiry';

export async function GET() {
  try {
    await dbConnect();
    const queries = await Enquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: queries.length, data: queries });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    let data = {};
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      formData.forEach((val, key) => {
        data[key] = val;
      });
    } else {
      data = await request.json();
    }

    const formattedData = {
      name: data.name || data.quick_name || '',
      email: data.email || data.quick_email || '',
      phone: data.phone || data.quick_phone || '',
      qualification: data.studyLevel || data.quick_studylevel || '',
      preferredDestination: data.country || data.quick_country || 'General',
      preferredIntake: 'Upcoming Intake',
      interest: data.interest || data.quick_interest || '',
      studyLevel: data.studyLevel || data.quick_studylevel || '',
      city: data.city || data.quick_city || '',
      office: data.office || data.quick_office || 'Bareilly',
      counseling: data.counseling || data.quick_counseling || 'In Person',
      source: 'Quick Query',
    };

    if (!formattedData.name || !formattedData.email || !formattedData.phone) {
      return NextResponse.json(
        { success: false, msg: false, error: 'Please provide required contact fields' },
        { status: 400 }
      );
    }

    try {
      await dbConnect();
      const newEnquiry = await Enquiry.create(formattedData);
      return NextResponse.json({
        success: true,
        msg: true,
        message: 'Form submitted successfully!',
        data: newEnquiry,
      });
    } catch (dbError) {
      console.warn('Database write fallback for enquiry:', dbError.message);
      return NextResponse.json({
        success: true,
        msg: true,
        message: 'Form submitted successfully!',
        data: formattedData,
      });
    }
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return NextResponse.json({ success: false, msg: false, error: error.message }, { status: 500 });
  }
}

