"use client";

import { Button, Container, Header, Input } from "semantic-ui-react";
import React, { useState } from "react";

import ReplacementWordSelect from "./components/ReplacementWordSelect";
import ResultDisplay from "./components/ResultDisplay";
import { SubmitRequestBody } from "./api/submit/route";
import TextSelect from "./components/TextSelect";

export default function HomePage() {
    const [selectedText, setSelectedText] = useState<string | null>(null);
    const [replacementWords, setReplacementWords] = useState<string>("");
    const [temperature, setTemperature] = useState<number>(0.9);
    const [result, setResult] = useState<string | null>(null);
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
                replacementWords,
                temperature
            } as SubmitRequestBody)
        });

        const data = await response.json();
        setLoading(false);
        setResult(data.modifiedText);
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

            {/* Step 3: Select Parts of Speech */}
            {selectedText && replacementWords && (
                <Input
                    type="range"
                    label="Temperature"
                    min={0}
                    max={1}
                    step={0.1}
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                />
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
