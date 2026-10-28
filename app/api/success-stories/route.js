import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SuccessStory from '@/models/SuccessStory';
import { initialSuccessStories } from '@/lib/seedData';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    try {
      await dbConnect();
      const filter = category ? { category } : {};
      let stories = await SuccessStory.find(filter).sort({ createdAt: -1 });

      return NextResponse.json({ success: true, count: stories.length, data: stories });
    } catch (dbError) {
      console.warn('DB error, returning seed stories:', dbError.message);
      const filtered = category
        ? initialSuccessStories.filter((s) => s.category === category)
        : initialSuccessStories;
      return NextResponse.json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const auth = verifyAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }

    const body = await request.json();
    await dbConnect();
    const story = await SuccessStory.create(body);
    return NextResponse.json({ success: true, data: story }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

