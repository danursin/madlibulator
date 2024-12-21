import {
    BedrockRuntimeClient
} from "@aws-sdk/client-bedrock-runtime";
import config from "../config";

const { region, accessKeyId, secretAccessKey } = config;

const client = new BedrockRuntimeClient({ region,
    credentials: {
        accessKeyId,
        secretAccessKey
    } });

export default client;