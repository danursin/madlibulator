"use client";

import { Button, Container, Header } from "semantic-ui-react";
import React, { useState } from "react";
import { SubmitRequestBody, SubmitResponseBody } from "./api/submit/route";

import ReplacementWordSelect from "./components/ReplacementWordSelect";
import ResultDisplay from "./components/ResultDisplay";
import TextSelect from "./components/TextSelect";

export default function HomePage() {
    const [selectedText, setSelectedText] = useState<string | null>(null);
    const [replacementWords, setReplacementWords] = useState<string>("");
    const [result, setResult] = useState<SubmitResponseBody | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleGenerate = async () => {
        setLoading(true);
        const response = await fetch("/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: selectedText,
                replacementWords
            } as SubmitRequestBody)
        });

        const data = (await response.json()) as SubmitResponseBody;
        setLoading(false);
        setResult(data);
    };

    return (
        <Container style={{ marginTop: "2em" }}>
            <Header as="h1" textAlign="center">
                Word Chaos Generator
            </Header>

            {/* Step 1: Select Text */}
            <TextSelect onSelectText={(text) => setSelectedText(text)} />

            {/* Step 2: Select Theme or Custom Words */}
            {selectedText && (
                <ReplacementWordSelect onSelectWords={(theme) => setReplacementWords(theme)} selectedWords={replacementWords} />
            )}

            {/* Generate Button */}
            {selectedText && replacementWords && (
                <Button primary fluid onClick={handleGenerate} style={{ marginTop: "1em" }} loading={loading}>
                    Generate
                </Button>
            )}

            {/* Step 4: Display Result */}
            {result && <ResultDisplay result={result} />}
        </Container>
    );
}
