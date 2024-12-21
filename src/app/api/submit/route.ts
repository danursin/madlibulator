import { NextRequest, NextResponse } from "next/server";

import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import client from "@/app/services/BedrockClient";

export type SubmitRequestBody = { 
    text: string; 
    replacementWords: string; 
};

export type SubmitResponseBody = {
    modifiedText: string;
};

const MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0";

export async function POST(req: NextRequest) {
  try {
    const { text, replacementWords } = await req.json() as SubmitRequestBody;

    if (!text || !replacementWords) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const system = `
    <instructions>
        Rewrite the input text by creatively replacing various parts of speech from this list of words: [${replacementWords}]. The result should be humorous, lighthearted, and coherent. 
        The result should be a creative and humorous rewrite of the original text but retain the original structure and remain coherent and grammatically correct.
        
        Return the result in strict JSON format according to the following schema. Do not return any other text besides the JSON response. 

        <desired_output_format>
            {
                "modifiedText": "The modified text goes here to be shown to the end user."
            }
        </desired_output_format>
    </instructions>
    `;
    
    const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        temperature: 0.9,
        system,
        messages: [
            {
                role: "user",
                content: [{ type: "text", text }],
            },
        ]
      };
    
      // Invoke Claude with the payload and wait for the response.
      const apiResponse = await client.send(
        new InvokeModelCommand({
          contentType: "application/json",
          accept: "application/json",
          body: JSON.stringify(payload),
          modelId: MODEL_ID
        }),
      );

      const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
      const responseBody = JSON.parse(decodedResponseBody);
      const output = responseBody.content[0].text;

      const json = JSON.parse(output);

    // Return the modified text
    return NextResponse.json(json as SubmitResponseBody);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error.", details: (error as Error).message },
      { status: 500 }
    );
  }
}
