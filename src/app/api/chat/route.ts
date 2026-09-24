import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, documentContext } = await req.json();

  const systemPrompt = documentContext 
    ? `You are the DocuAI Support Assistant. The user is currently editing a document with the following content:\n\n<document>\n${documentContext}\n</document>\n\nAnswer their questions based on this document context.`
    : "You are the DocuAI Support Assistant. Your primary purpose is to help users successfully create and convert documents using the DocuAI platform. Keep your answers concise, helpful, and focused on document conversion, OCR, formatting, and exporting to PDF/Word. Do not behave like a general-purpose AI.";

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages,
    system: systemPrompt,
  });

  return result.toDataStreamResponse();
}
