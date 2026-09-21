import { ChatOllama } from "@langchain/ollama";
import { createAgent, HumanMessage, toolStrategy } from "langchain";
import { checkProductStockTool, searchProductTool, searchTool, weatherTool } from "./tools.js";
import { MemorySaver } from "@langchain/langgraph";
import { MultiServerMCPClient } from "@langchain/mcp-adapters";

const checkpointer = new MemorySaver();

const llm = new ChatOllama({
  baseUrl: 'http://localhost:11434',
  model: 'llama3.1:8b',
  temperature: 1
})

export const client = new MultiServerMCPClient({
  "weather": {
    "command": "npx",
    "args": ["-y", "@dangahagan/weather-mcp@latest"]
  },
  "tavily": {
    "transport": 'http',
    "url": "https://mcp.tavily.com/mcp/?tavilyApiKey=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"
  }
})


export const weatherAgent = async () => {
  const tools = await client.getTools("weather")

  return createAgent({
    model: llm,
    systemPrompt: `
      You are a weather specialist.
      Use the available weather tools to answer weather-related questions.
    `,
    tools
  })
}

export const searchAgent = async () => {
  const tools = await client.getTools("tavily");

  return createAgent({
    model: llm,
    systemPrompt: `
      You are a research specialist.
      Use Tavily to search the web and gather relevant information.
      `,
    tools: tools
  })
}

export const TripPlannerAgent = createAgent({
  model: llm,
  systemPrompt: `
    You are a supervisor agent.

    Your job is to understand the user's request
    and delegate work to the appropriate specialist.

    Use the specialists when appropriate.
    Combine their results into a clear final answer.

    while using tools , ensure to properly follow the schema mentioned in each tool
`,
  tools: [weatherTool, searchTool]
})

// interactWithWeather()

// const groqLlm = new ChatGroq({
//     apiKey: import.meta.env.VITE_GROQ_API_KEY,
//     model: 'openai/gpt-oss-120b',
//     temperature: 1
// })

export const shoppingAssistantAgent = createAgent({
  model: llm,
  tools: [searchProductTool, checkProductStockTool],
  systemPrompt: `
           <ROLE>
           You are a shopping assistant.
           </ROLE>

           <GOAL>
           Help customer find products.
           </GOAL>

           <CONSTRAINTS>
           -Never invent or assume product
           -If required information is unavailable , clearly tell customer
           </CONSTRAINTS>

           <OUTPUT>
           -Give clear and concise answer
           </OUTPUT>
       `,
  checkpointer: checkpointer
})


// async function ShoppingAssistantAgent() {
//     const response = await searchProductTool.invoke({ value: 'jhsjdhfjs' })
//     console.log(response)
// }



// async function InteractWithLLM() {
//     const response = await llm.stream('what is the capital of Moon?');

//     for await (const chunks of response) {
//         process.stdout.write(chunks.content)
//     }
// }

// InteractWithLLM()

// function sum() {

//     console.log('hello ')

//     return 1;

//     console.log("hiii")

// }


// function* printAnything() {
//     yield 2;

//     yield 3;

//     yield 5;
// }

// const response = printAnything()


// const a = response.next();
// const b = response.next();
// const c = response.next();
// const d = response.next()

// console.log(a , b , c , d )

// for await (const data of printAnything()){
//     console.log(data)
// }

[
  {
    name: '',
    description: ''
  }
]

const outputSchema = z.object({
  movies: z.array(
    z.object({
      name: z.string().describe('movie title'),
      description: z.string().describe("movies description")
    })
  )
})

// llm.invoke().withStructuredOutput(outputSchema)

const PersonalAgent = createAgent({
  model: llm,
  systemPrompt: 'you are Movie recommender',
  responseFormat: toolStrategy(outputSchema)
})

async function interact() {
  const response = await PersonalAgent.invoke({ messages: new HumanMessage('suggest me the best movies of all time ') })
  console.log(response,
    "\n\n",
    response.messages.at(-1).content
  )
}

interact()
