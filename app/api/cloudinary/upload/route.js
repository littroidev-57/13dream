import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { verifyAdminAuth } from '@/lib/auth';

export async function POST(request) {
  try {
    // 1. Enforce admin authentication
    const auth = verifyAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Restrict file size (e.g. max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    // Allowed mime types (images, pdfs)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'File type not allowed. Please upload an image or PDF.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

    const result = await uploadToCloudinary(base64Data, '13dreams_uploads');
    return NextResponse.json({ success: true, url: result.url, public_id: result.public_id });
  } catch (error) {
    console.error('Upload route error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
