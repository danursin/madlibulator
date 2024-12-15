import { Header, Segment } from "semantic-ui-react";

import React from "react";

interface ResultDisplayProps {
    result: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    return (
        <Segment>
            <Header as="h3">Your Generated Text:</Header>
            <p>{result}</p>
        </Segment>
    );
};

export default ResultDisplay;
