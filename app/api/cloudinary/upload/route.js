import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
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
