import { Form, Segment } from "semantic-ui-react";
import React, { useState } from "react";

import PresetTextModal from "./PresetTextModal";

interface TextSelectProps {
    onSelectText: (text: string) => void;
}

const TextSelect: React.FC<TextSelectProps> = ({ onSelectText }) => {
    const [text, setText] = useState<string>("");

    const handlePresetSelect = (selectedText: string) => {
        setText(selectedText);
        onSelectText(selectedText);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        onSelectText(newText);
    };

    return (
        <Segment>
            <PresetTextModal onPresetSelect={handlePresetSelect} />
            <Form>
                <Form.TextArea
                    placeholder="Enter custom text here..."
                    value={text}
                    onChange={handleTextChange}
                    style={{ marginTop: "1em", width: "100%" }}
                />
            </Form>
        </Segment>
    );
};

export default TextSelect;
