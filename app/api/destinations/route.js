import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Destination from '@/models/Destination';
import { destinationsData } from '@/lib/seedData';

export async function GET() {
  try {
    try {
      await dbConnect();
      const destinations = await Destination.find({}).sort({ order: 1 });
      if (destinations && destinations.length > 0) {
        return NextResponse.json({ success: true, count: destinations.length, data: destinations });
      }
    } catch (dbError) {
      console.warn('MongoDB query failed, falling back to static seed data:', dbError.message);
    }
    return NextResponse.json({ success: true, count: destinationsData.length, data: destinationsData });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
