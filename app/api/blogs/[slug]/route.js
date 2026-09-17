import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { initialBlogs } from '@/lib/seedData';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    try {
      await dbConnect();
      let blog = await Blog.findOne({ slug });

      if (!blog) {
        blog = initialBlogs.find((b) => b.slug === slug);
      }

      if (!blog) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: blog });
    } catch (dbError) {
      console.warn('DB error, searching seed blogs:', dbError.message);
      const blog = initialBlogs.find((b) => b.slug === slug);
      if (!blog) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: blog });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();

    await dbConnect();
    const updated = await Blog.findOneAndUpdate({ slug }, body, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    await dbConnect();
    const deleted = await Blog.findOneAndDelete({ slug });
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
