"use client";

import { Button, List, Modal } from "semantic-ui-react";
import React, { useState } from "react";

interface PresetReplacementWordsModalProps {
    onPresetSelect: (text: string) => void;
}

const presets = [
    {
        label: "Poopify",
        content: "poop, fart, butt, stinky, smelly"
    },
    {
        label: "Food Items",
        content: "apple, pizza, burger, ice cream, chocolate"
    },
    {
        label: "Pirate Talk",
        content: "arrr, matey, booty, scallywag, ahoy"
    },
    {
        label: "Fantasy Creatures",
        content: "dragon, elf, goblin, mermaid, centaur"
    },
    {
        label: "Tech Jargon",
        content: "algorithm, pixel, cloud, bandwidth, byte"
    },
    {
        label: "Sports Terms",
        content: "goal, touchdown, slam dunk, homerun, referee"
    },
    {
        label: "Nature Words",
        content: "tree, river, mountain, flower, sunshine"
    },
    {
        label: "Spooky Words",
        content: "ghost, skeleton, witch, pumpkin, cauldron"
    },
    {
        label: "Shakespearean Lingo",
        content: "thou, thee, hath, dost, yonder"
    }
];
const PresetReplacementWordsModal: React.FC<PresetReplacementWordsModalProps> = ({ onPresetSelect }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSelect = (content: string) => {
        onPresetSelect(content);
        handleClose();
    };

    return (
        <>
            <Button onClick={handleOpen} fluid>
                Select Preset Replacement Words
            </Button>

            <Modal open={open} onClose={handleClose} size="small">
                <Modal.Header>Select Preset Replacement Words</Modal.Header>
                <Modal.Content>
                    <List selection>
                        {presets.map((preset, index) => (
                            <List.Item key={index} onClick={() => handleSelect(preset.content)}>
                                <List.Content>
                                    <List.Header>{preset.label}</List.Header>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={handleClose}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default PresetReplacementWordsModal;
