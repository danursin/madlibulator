import { Form, Segment } from "semantic-ui-react";

import React from "react";

interface ThemeSelectProps {
    onSelectTheme: (theme: string | string[]) => void;
    selectedTheme: string | string[] | null;
}

const themeOptions = [
    { key: "poopify", text: "Poopify", value: "poopify" },
    { key: "pirate", text: "Pirate Speak", value: "pirate" },
    { key: "custom", text: "Custom Words", value: "custom" }
];

const ThemeSelect: React.FC<ThemeSelectProps> = ({ onSelectTheme, selectedTheme }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: React.SyntheticEvent<HTMLElement>, { value }: any) => {
        if (value === "custom") {
            const customWords = prompt("Enter comma-separated replacement words:");
            onSelectTheme(customWords ? customWords.split(",") : []);
        } else {
            onSelectTheme(value);
        }
    };

    return (
        <Segment>
            <Form>
                <Form.Dropdown
                    placeholder="Select a Theme"
                    fluid
                    selection
                    label="Theme selector"
                    options={themeOptions}
                    value={selectedTheme || ""}
                    onChange={handleChange}
                />
            </Form>
        </Segment>
    );
};

export default ThemeSelect;
