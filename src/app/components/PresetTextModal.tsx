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

const PresetTextModal: React.FC<PresetTextModalProps> = ({ onPresetSelect }) => {
    const [open, setOpen] = useState(false);
    const [presets, setPresets] = useState<Preset[]>([]);

    const handleOpen = () => {
        setOpen(true);
        // Fetch presets dynamically
        fetch("/data/presets.json")
            .then((res) => res.json())
            .then((data) => setPresets(data));
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
