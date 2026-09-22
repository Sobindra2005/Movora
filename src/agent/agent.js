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

export async function recommendMovies(researchResponse, movieList) {
    const result = await recommendationAgent.invoke({
        messages: [new HumanMessage(`
Here are 6 movie options:
${researchResponse}
        `)]
    });

    let recommendations = [];
    if (result.structuredResponse?.recommendations) {
        try {
            recommendations = JSON.parse(result.structuredResponse.recommendations);
        } catch (e) {
            console.error("Failed to parse recommendations string", e);
        }
    }

    console.log(result)

    // Map the selected recommendations to the full movie data from movieList
    const finalMovies = recommendations.map(rec => {
        const fullMovie = movieList.find(m => m.id === rec.id) || {};
        return {
            ...fullMovie,
            reason: rec.reason,
            poster_path: fullMovie.posterPath || fullMovie.poster_path
        };
    });

    return finalMovies;
}
