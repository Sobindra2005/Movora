import { ChatOllama } from "@langchain/ollama";
import { createAgent, HumanMessage } from "langchain";
import { preferenceSystemPrompt, recommendSystemPrompt, reserchSystemPrompt } from "./prompt";
import { RawPreferenceSchema, RecommendationSchema } from "./schema";
import { discoverMoviesTool } from "./tools";

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

const researchAgent = createAgent({
    model: llm,
    systemPrompt: reserchSystemPrompt,
    tools: [discoverMoviesTool]
})

const recommendationAgent = createAgent({
    model: llm,
    systemPrompt: recommendSystemPrompt,
    responseFormat: RecommendationSchema,
});


export const userPreferences = async (message) => {
    console.log("preference analyzer started .....")
    const response = await preferenceAgent.invoke({
        messages: [new HumanMessage(message)]
    })


    return response.structuredResponse;
}

export const movieResearcher = async (preference) => {
    const result = await researchAgent.invoke({
        messages: [new HumanMessage(`
Genres: ${JSON.stringify(preference.genreNames)}
Release Year: ${JSON.stringify(preference.releaseYear)}`)],
    });

    const response = result.messages.at(-1).content;
    const movieList = JSON.parse(result.messages.at(-2).content)

    return { response, movieList };
}

export const movieRecommendation = async (movieResearcherResponse) => {
    const result = await recommendationAgent.invoke({
        messages: [new HumanMessage(`
Here are 6 movie options:
${movieResearcherResponse}
        `)]
    });

    console.log(result)

    console.log(JSON.parse(result.structuredResponse))

    return JSON.parse(result.structuredResponse)
}