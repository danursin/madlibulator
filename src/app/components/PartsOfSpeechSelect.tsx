import { Checkbox, Segment } from "semantic-ui-react";

import React from "react";

interface PartsOfSpeechSelectProps {
    onSelectParts: (parts: PartOfSpeech[]) => void;
    selectedParts: PartOfSpeech[];
}

export type PartOfSpeech = "Nouns" | "Verbs" | "Adjectives" | "Adverbs";

const partsOptions: PartOfSpeech[] = ["Nouns", "Verbs", "Adjectives", "Adverbs"];

const PartsOfSpeechSelect: React.FC<PartsOfSpeechSelectProps> = ({ onSelectParts, selectedParts }) => {
    const handleToggle = (part: PartOfSpeech) => {
        if (selectedParts.includes(part)) {
            onSelectParts(selectedParts.filter((p) => p !== part));
        } else {
            onSelectParts([...selectedParts, part]);
        }
    };

    return (
        <Segment>
            {partsOptions.map((part) => (
                <Checkbox
                    key={part}
                    label={part}
                    checked={selectedParts.includes(part)}
                    onChange={() => handleToggle(part)}
                    style={{ display: "block", marginBottom: "1em" }}
                />
            ))}
        </Segment>
    );
};

export default PartsOfSpeechSelect;
