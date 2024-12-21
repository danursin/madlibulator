import { NextRequest, NextResponse } from "next/server";

import { PartOfSpeech } from "@/app/components/PartsOfSpeechSelect";

export type SubmitRequestBody = { 
    text: string; 
    theme: string; 
    parts: PartOfSpeech[]; 
};

export async function POST(req: NextRequest) {
  try {
    const { text, theme, parts } = await req.json() as SubmitRequestBody;

    if (!text || !theme || !parts) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const modifiedText = text.toUpperCase();

    // Return the modified text
    return NextResponse.json({ modifiedText });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error.", details: (error as Error).message },
      { status: 500 }
    );
  }
}
