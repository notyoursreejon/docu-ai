import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  try {
    const { prompt, text } = await req.json();

    if (!prompt || !text) {
      return NextResponse.json({ error: 'Missing prompt or text' }, { status: 400 });
    }

    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      system: "You are an AI writing assistant inside a document editor. The user wants you to modify their selected text. Return ONLY the newly modified text without any markdown wrappers or quotes, as it will be directly injected back into their document.",
      prompt: `Instruction: ${prompt}\n\nSelected Text:\n${text}`,
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Editor AI Error:", error);
    return NextResponse.json({ error: 'Failed to process text' }, { status: 500 });
  }
}
