import { Dropdown, Segment } from "semantic-ui-react";

import React from "react";

interface ThemeSelectProps {
    onSelectTheme: (theme: string | string[]) => void;
    selectedTheme: string | string[] | null;
}

const themeOptions = [
    { key: "poop", text: "Poopify", value: "poop" },
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
            <Dropdown
                placeholder="Select a Theme"
                fluid
                selection
                options={themeOptions}
                value={selectedTheme || ""}
                onChange={handleChange}
            />
        </Segment>
    );
};

export default ThemeSelect;
