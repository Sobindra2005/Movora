import { ChatOllama } from "@langchain/ollama";
import { createAgent, HumanMessage } from "langchain";
import { preferenceSystemPrompt } from "./prompt";
import { RawPreferenceSchema } from "./schema";

const llm = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama3.1:8b",
    temperature: 0.5,
});

const preferenceAgent = createAgent({
    model: llm,
    systemPrompt: preferenceSystemPrompt,
    responseFormat: RawPreferenceSchema
})

export const userPreferences = async (message) => {
    console.log("preference analyzer started .....")
    const response = await preferenceAgent.invoke({
        messages: [new HumanMessage(message)]
    })

    console.log('response',response)
    console.log('response',response.structuredResponse)

    return response.messages.at(-1).content;
}