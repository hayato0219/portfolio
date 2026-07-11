import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface ChatRequestBody {
  systemPrompt?: string;
  question?: string;
}

const DEFAULT_MODEL = 'gemini-3.5-flash';

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const { systemPrompt = '', question = '' } = body;
  if (!question.trim()) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

  try {
    const upstream = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: `${systemPrompt}\n\nUser question: ${question}` }] },
        ],
        generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
      }),
    });

    if (!upstream.ok) {
      // Surface the upstream status so the client can localize the message.
      return NextResponse.json(
        { error: 'upstream_error' },
        { status: upstream.status }
      );
    }

    const data = await upstream.json();
    const text: string | undefined =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({ error: 'empty_response' }, { status: 502 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json({ error: 'network_error' }, { status: 502 });
  }
}
