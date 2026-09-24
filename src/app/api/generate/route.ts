import { NextResponse } from 'next/server';
import { generatePDF } from '@/services/document/pdf';
import { generateDOCX } from '@/services/document/docx';

export async function POST(req: Request) {
  try {
    const { html, format, filename = 'document' } = await req.json();

    if (!html || !format) {
      return NextResponse.json({ error: 'Missing html or format parameter' }, { status: 400 });
    }

    if (format === 'pdf') {
      const pdfBuffer = await generatePDF(html);
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}.pdf"`,
        },
      });
    }

    if (format === 'docx') {
      const docxBuffer = await generateDOCX(html);
      return new NextResponse(docxBuffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': `attachment; filename="${filename}.docx"`,
        },
      });
    }

    return NextResponse.json({ error: 'Unsupported format' }, { status: 400 });
  } catch (error) {
    console.error("Document Generation Error:", error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}
