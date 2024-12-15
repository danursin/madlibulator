"use client";

import { Button, Container, Header } from "semantic-ui-react";
import React, { useState } from "react";

import PartsOfSpeechSelect from "./components/PartsOfSpeechSelect";
import ResultDisplay from "./components/ResultDisplay";
import TextSelect from "./components/TextSelect";
import ThemeSelect from "./components/ThemeSelect";

export default function HomePage() {
    const [selectedText, setSelectedText] = useState<string | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<string | string[] | null>(null);
    const [selectedPartsOfSpeech, setSelectedPartsOfSpeech] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);

    const handleGenerate = () => {
        // Placeholder logic for result generation
        const generatedResult = `Text: ${selectedText}, Theme: ${selectedTheme}, Parts of Speech: ${selectedPartsOfSpeech.join(", ")}`;
        setResult(generatedResult);
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
                <Button primary fluid onClick={handleGenerate} style={{ marginTop: "1em" }}>
                    Generate
                </Button>
            )}

            {/* Step 4: Display Result */}
            {result && <ResultDisplay result={result} />}
        </Container>
    );
}
