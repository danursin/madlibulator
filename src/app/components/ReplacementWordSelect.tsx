import { Form, Segment } from "semantic-ui-react";

import PresetReplacementWordsModal from "./PresetReplacementWordsModal";
import React from "react";

interface ReplacementWordSelectProps {
    onSelectWords: (theme: string) => void;
    selectedWords: string;
}

const ReplacementWordSelect: React.FC<ReplacementWordSelectProps> = ({ onSelectWords, selectedWords }) => {
    const handlePresetSelect = (selectedText: string) => {
        onSelectWords(selectedText);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        onSelectWords(newText);
    };
    return (
        <Segment>
            <PresetReplacementWordsModal onPresetSelect={handlePresetSelect} />
            <Form>
                <Form.TextArea
                    placeholder="Enter custom text here..."
                    value={selectedWords || ""}
                    onChange={handleTextChange}
                    style={{ marginTop: "1em", width: "100%" }}
                />
            </Form>
        </Segment>
    );
};

export default ReplacementWordSelect;
