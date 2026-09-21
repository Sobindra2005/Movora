import { tool } from "@langchain/core/tools";
import { Command } from "@langchain/langgraph";
import { ChatOllama } from "@langchain/ollama";
import { createAgent, HumanMessage } from "langchain";
import z from "zod";

const llm = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama3.1:8b",
    temperature: 1,
});

const getMyName = new tool(
    (_, runtime) => {
        console.log(runtime)
        return runtime.context.userName;
    },
    {
        name: 'get_my_name',
        description: "give user name"
    }
)

const updateMyFavoriteColor = new tool(
    ({ favoriteColor }) => {
        return new Command({
            update: {
                favoriteColor: favoriteColor
            }
        })
    },
    {
        name: 'update_my_favorite_color',
        description: 'update user favorite color',
        schema: z.object({
            favoriteColor: z.string().describe("user's favorite color")
        })
    }
)

const agent = createAgent({
    model: llm,
    tools: [getMyName, updateMyFavoriteColor],
    systemPrompt:
        `
    You are a helpful assistant
    `,
    contextSchema: z.object({
        userName: z.string().describe('name of the user ')
    }),
    stateSchema: z.object({
        favoriteColor: z.string().describe("user favorite color")
    })
});

async function ExecuteLLm(message) {
    console.log("this is executing")
    const result = await agent.invoke({
        messages: [new HumanMessage(message)],
        favoriteColor: 'red'
    },
        {
            context: {
                userName: "sobhindra budhathoki"
            }
        }
    )

    console.log(result)
    console.log(result.messages.at(-1).content)
}

ExecuteLLm("my favorite color is blue")