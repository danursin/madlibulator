import { NextRequest, NextResponse } from "next/server";

import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import client from "@/app/services/BedrockClient";

export type SubmitRequestBody = { 
    text: string; 
    replacementWords: string; 
    temperature?: number | undefined; 
};

const MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0";

export async function POST(req: NextRequest) {
  try {
    const { text, replacementWords, temperature = 0.9 } = await req.json() as SubmitRequestBody;

    if (!text || !replacementWords || !temperature) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const prompt = `
    <instructions>
        Rewrite the following text by creatively replacing various parts of speech from this list of words: [${replacementWords}]. The result should be humorous, lighthearted, and coherent. 
        The result should be a creative and humorous rewrite of the original text but retain the original structure and remain coherent.
        ONLY RETURN THE MODIFIED TEXT.
    </instructions>
    <input>
        ${text}
    </input>
    `;
    
    const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        temperature,
        messages: [
            {
                role: "user",
                content: [{ type: "text", text: prompt }],
            },
        ]
      };
    
      // Invoke Claude with the payload and wait for the response.
      const apiResponse = await client.send(
        new InvokeModelCommand({
          contentType: "application/json",
          body: JSON.stringify(payload),
          modelId: MODEL_ID
        }),
      );

      const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
      const responseBody = JSON.parse(decodedResponseBody);
      const modifiedText = responseBody.content[0].text;

    // Return the modified text
    return NextResponse.json({ modifiedText });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error.", details: (error as Error).message },
      { status: 500 }
    );
  }
}
