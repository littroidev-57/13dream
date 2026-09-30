import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Enquiry from '@/models/Enquiry';
import { sendEnquiryNotification, sendStudentEnquiryGreeting } from '@/lib/email';

export async function GET() {
  try {
    await dbConnect();
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, qualification, preferred_destination, preferredintake, check } = body;

    // Support both frontend camelCase and original PHP snake_case input fields
    const formattedData = {
      name: name || body.user || '',
      phone: phone || body.userphone || '',
      email: email || body.useremail || '',
      qualification: qualification || body.LastQualification || '',
      preferredDestination: preferred_destination || body.preferredDestination || body.country || 'General',
      preferredIntake: preferredintake || body.preferredIntake || 'Upcoming Intake',
      interest: body.interest || '',
      studyLevel: body.studyLevel || '',
      city: body.city || '',
      office: body.office || 'Bareilly',
      counseling: body.counseling || 'In Person',
      source: body.source || 'Enquiry Form',
      consent: check !== undefined ? Boolean(check) : true,
    };

    if (!formattedData.name || !formattedData.phone || !formattedData.email) {
      return NextResponse.json(
        { success: false, msg: false, error: 'Please fill in name, phone, and email' },
        { status: 400 }
      );
    }

    let savedRecord = null;
    try {
      await dbConnect();

      // Check if enquiry already exists by phone or email to prevent duplicate entries
      const filterConditions = [];
      if (formattedData.phone) filterConditions.push({ phone: formattedData.phone });
      if (formattedData.email) filterConditions.push({ email: formattedData.email });

      const existing = filterConditions.length > 0
        ? await Enquiry.findOne({ $or: filterConditions }).sort({ createdAt: -1 })
        : null;

      if (existing) {
        // Update existing enquiry without making a duplicate entry
        savedRecord = await Enquiry.findByIdAndUpdate(
          existing._id,
          {
            $set: {
              ...formattedData,
              interest: formattedData.interest || existing.interest,
              preferredDestination: formattedData.preferredDestination !== 'General'
                ? formattedData.preferredDestination
                : existing.preferredDestination,
              updatedAt: new Date(),
            },
          },
          { returnDocument: 'after' }
        );
      } else {
        savedRecord = await Enquiry.create(formattedData);
      }
    } catch (dbError) {
      console.warn('Database write bypassed or local MongoDB not running. Logging submission:', dbError.message);
    }

    // Trigger Resend email notifications (Admin alert + Student greeting)
    try {
      await Promise.allSettled([
        sendEnquiryNotification(formattedData),
        sendStudentEnquiryGreeting(formattedData),
      ]);
    } catch (emailError) {
      console.error('Email notification error (non-blocking):', emailError);
    }

    return NextResponse.json({
      success: true,
      msg: true,
      message: 'We will get back to you shortly',
      data: savedRecord || formattedData,
    });
  } catch (error) {
    console.error('Error in enquiry submission:', error);
    return NextResponse.json({ success: false, msg: false, error: error.message }, { status: 500 });
  }
}
