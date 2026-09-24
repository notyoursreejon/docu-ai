// @ts-ignore - html-to-docx doesn't have robust types
import HTMLtoDOCX from 'html-to-docx';

export async function generateDOCX(htmlContent: string): Promise<Buffer> {
  const wrappedHtml = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body>${htmlContent}</body>
    </html>
  `;

  const docxBuffer = await HTMLtoDOCX(wrappedHtml, null, {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: true,
  });

  return Buffer.from(docxBuffer);
}
