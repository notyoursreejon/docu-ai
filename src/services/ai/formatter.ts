import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function formatRawTextToHTML(rawText: string): Promise<string> {
  const prompt = `
    You are an expert document formatter. I will provide you with raw text, possibly extracted via OCR.
    Your job is to clean up OCR errors, detect logical headings, paragraphs, lists, and tables, and output well-structured HTML suitable for a rich text editor.
    Do NOT output a full HTML document (no <html>, <head>, or <body> tags). Just output the semantic HTML elements (<h1>, <p>, <ul>, <table>, etc.).
    Preserve all original information, do not hallucinate content.
    
    RAW TEXT:
    ${rawText}
  `;

  try {
    const { text } = await generateText({
      model: openai('gpt-4o') as any,
      prompt,
    });
    
    return text.trim();
  } catch (error) {
    console.error("AI Formatting Error:", error);
    // Fallback if AI fails: just wrap in basic HTML
    return `<p>${rawText.replace(/\n/g, '<br/>')}</p>`;
  }
}
