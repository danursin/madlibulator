"use client";

import { Button, List, Modal } from "semantic-ui-react";
import React, { useState } from "react";

interface Preset {
    label: string;
    content: string;
}

interface PresetTextModalProps {
    onPresetSelect: (text: string) => void;
}

const presets: Preset[] = [
    {
        label: "Gettysburg Address",
        content:
            "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal."
    },
    {
        label: "I Have a Dream Speech",
        content:
            "I have a dream that one day every valley shall be exalted, every hill and mountain shall be made low, the rough places will be made plain, and the crooked places will be made straight; 'and the glory of the Lord shall be revealed and all flesh shall see it together.'"
    },
    {
        label: "Taylor Swift Song - Blank Space",
        content: "Got a long list of ex-lovers, they'll tell you I'm insane. But I got a blank space, baby, and I'll write your name."
    },
    {
        label: "Declaration of Independence",
        content:
            "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness."
    },
    {
        label: "Shakespeare - Hamlet",
        content:
            "To be or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles."
    },
    {
        label: "Martin Luther King Jr. - Letter from Birmingham Jail",
        content:
            "Injustice anywhere is a threat to justice everywhere. We are caught in an inescapable network of mutuality, tied in a single garment of destiny. Whatever affects one directly, affects all indirectly."
    },
    {
        label: "The Star-Spangled Banner",
        content: "O say can you see, by the dawn's early light, what so proudly we hailed at the twilight's last gleaming?"
    },
    {
        label: "J.K. Rowling - Harry Potter",
        content: "It does not do to dwell on dreams and forget to live, remember that."
    },
    {
        label: "Robert Frost - The Road Not Taken",
        content: "Two roads diverged in a wood, and I—I took the one less traveled by, and that has made all the difference."
    },
    {
        label: "Movie Quote - Star Wars",
        content: "May the Force be with you."
    }
];

const PresetTextModal: React.FC<PresetTextModalProps> = ({ onPresetSelect }) => {
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
                Select Preset Text
            </Button>

            <Modal open={open} onClose={handleClose} size="small">
                <Modal.Header>Select a Preset Text</Modal.Header>
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

export default PresetTextModal;
