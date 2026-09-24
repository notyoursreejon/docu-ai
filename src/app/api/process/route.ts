import { NextResponse } from 'next/server';
import { extractTextFromImage } from '@/services/ai/ocr';
import { formatRawTextToHTML } from '@/services/ai/formatter';

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: 'Missing imageBase64' }, { status: 400 });
    }

    // 1. Perform OCR
    const rawText = await extractTextFromImage(imageBase64);

    // 2. Format with AI to generate HTML
    const formattedHtml = await formatRawTextToHTML(rawText);

    return NextResponse.json({ html: formattedHtml });
  } catch (error) {
    console.error("OCR Processing Error:", error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
