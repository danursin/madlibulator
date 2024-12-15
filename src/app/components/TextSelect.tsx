import { Button, Segment } from "semantic-ui-react";

import React from "react";

interface TextSelectProps {
    onSelectText: (text: string) => void;
}

const TextSelect: React.FC<TextSelectProps> = ({ onSelectText }) => {
    const handlePresetSelect = () => {
        onSelectText("This is a preset text snippet.");
    };

    const handleCustomText = () => {
        const customText = prompt("Enter your own text:");
        if (customText) onSelectText(customText);
    };

    return (
        <Segment>
            <Button fluid onClick={handlePresetSelect}>
                Select Preset Text
            </Button>
            <Button fluid onClick={handleCustomText} style={{ marginTop: "1em" }}>
                Enter Custom Text
            </Button>
        </Segment>
    );
};

export default TextSelect;
