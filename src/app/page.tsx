"use client";

import { Button, Container, Header } from "semantic-ui-react";
import PartsOfSpeechSelect, { PartOfSpeech } from "./components/PartsOfSpeechSelect";
import React, { useState } from "react";

import ResultDisplay from "./components/ResultDisplay";
import { SubmitRequestBody } from "./api/submit/route";
import TextSelect from "./components/TextSelect";
import ThemeSelect from "./components/ThemeSelect";

export default function HomePage() {
    const [selectedText, setSelectedText] = useState<string | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<string | string[] | null>("poopify");
    const [selectedPartsOfSpeech, setSelectedPartsOfSpeech] = useState<PartOfSpeech[]>(["Adjectives", "Verbs"]);
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
                theme: selectedTheme,
                parts: selectedPartsOfSpeech
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
            {selectedText && <ThemeSelect onSelectTheme={(theme) => setSelectedTheme(theme)} selectedTheme={selectedTheme} />}

            {/* Step 3: Select Parts of Speech */}
            {selectedText && selectedTheme && (
                <PartsOfSpeechSelect onSelectParts={(parts) => setSelectedPartsOfSpeech(parts)} selectedParts={selectedPartsOfSpeech} />
            )}

            {/* Generate Button */}
            {selectedText && selectedTheme && selectedPartsOfSpeech.length > 0 && (
                <Button primary fluid onClick={handleGenerate} style={{ marginTop: "1em" }} loading={loading}>
                    Generate
                </Button>
            )}

            {/* Step 4: Display Result */}
            {result && <ResultDisplay result={result} />}
        </Container>
    );
}
