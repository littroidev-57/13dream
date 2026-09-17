import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SuccessStory from '@/models/SuccessStory';
import { initialSuccessStories } from '@/lib/seedData';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    try {
      await dbConnect();
      const filter = category ? { category } : {};
      let stories = await SuccessStory.find(filter).sort({ createdAt: -1 });

      if (!stories || stories.length === 0) {
        await SuccessStory.insertMany(initialSuccessStories);
        stories = await SuccessStory.find(filter).sort({ createdAt: -1 });
      }

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
    const body = await request.json();
    await dbConnect();
    const story = await SuccessStory.create(body);
    return NextResponse.json({ success: true, data: story }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
