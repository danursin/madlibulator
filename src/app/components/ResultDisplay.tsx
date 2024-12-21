import { Header, Icon, Segment } from "semantic-ui-react";

import React from "react";
import { SubmitResponseBody } from "../api/submit/route";

interface ResultDisplayProps {
    result: SubmitResponseBody;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    return (
        <Segment>
            <Header as="h3">
                Your Generated Text:
                <Icon name="sound" link onClick={() => window.speechSynthesis.speak(new SpeechSynthesisUtterance(result.modifiedText))} />
            </Header>
            <p>{result.modifiedText}</p>
        </Segment>
    );
};

export default ResultDisplay;
