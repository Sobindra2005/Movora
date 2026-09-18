import { tool } from '@langchain/core/tools'
import { z } from 'zod'
import { products } from './data.js';
import { searchAgent, weatherAgent } from './agents.js';
import { HumanMessage } from 'langchain';

export const searchProductTool = tool(
    ({ value }) => {
        const searchValue = value.toLowerCase();

        const results = products.filter((item) => {
            return item.keywords.some((keyword) => keyword.toLocaleLowerCase().includes(searchValue))
        })

        if (results.length === 0) {
            return "NO products found."
        }

        return JSON.stringify(results)
    },
    {
        name: 'search_product',
        description: `search product by exactly one field: 
    product name , category or brand . 
    use value for that field , never use the customer's full sentence.
    `,
        schema: z.object({
            value: z.string().describe('only the name , category or brand')
        })
    }
)

export const checkProductStockTool = tool(
    ({ value }) => {
        return "No Stock Available"
    },
    {
        name: 'check_product_stock',
        description: `check stock of products
    `,
        schema: z.object({
            value: z.string().describe('product name')
        })
    }
)

export const weatherTool = tool(
    async ({ message }) => {
        const agent = await weatherAgent()

        const prompt = new HumanMessage(message);

        const response = await agent.invoke({ messages: prompt })

        return response.messages.at(-1).content
    },
    {
        name: "weather_agent",
        description:
            "Delegate weather-related questions to the weather specialist.",
        schema: z.object({
            message: z.string().describe("The weather question to investigate"),
        }),
    }
)

export const searchTool = tool(
    async ({ query }) => {
        const agent = await searchAgent()

        const prompt = new HumanMessage(query);

        const response = await agent.invoke({ messages: prompt })

        return response.messages.at(-1).content
    },
    {
        name: "weather_agent",
        description:
            "Delegate weather-related questions to the weather specialist.",
        schema: z.object({
            query: z.string().describe("The weather question to investigate"),
        }),
    }
)