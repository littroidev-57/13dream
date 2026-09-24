import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { initialBlogs } from '@/lib/seedData';

export async function GET() {
  try {
    try {
      await dbConnect();
      let blogs = await Blog.find({}).sort({ publishedAt: -1 });

      return NextResponse.json({ success: true, count: blogs.length, data: blogs });
    } catch (dbError) {
      console.warn('MongoDB not available, returning seed blogs:', dbError.message);
      return NextResponse.json({ success: true, count: initialBlogs.length, data: initialBlogs });
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, image, category } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const calculatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await dbConnect();
    const blog = await Blog.create({
      title,
      slug: calculatedSlug,
      excerpt: excerpt || '',
      content,
      image: image || '',
      category: category || 'Study Abroad',
      publishedAt: new Date(),
    });

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
