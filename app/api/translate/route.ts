// /app/api/translate/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text, targetLanguage } = await req.json();
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY; // 서버 환경 변수에서 API 키 가져오기

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ translatedText: data.data.translations[0].translatedText });
    } else {
      return NextResponse.json(
        { error: 'Translation API request failed', details: response.statusText },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
