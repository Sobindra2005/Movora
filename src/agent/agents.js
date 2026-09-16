import { ChatOllama } from "@langchain/ollama";
import { ChatGroq } from "@langchain/groq"
import { createAgent, HumanMessage } from "langchain";
import { checkProductStockTool, searchProductTool } from "./tools.js";

const llm = new ChatOllama({
    baseUrl: 'http://localhost:11434',
    model: 'llama3.1:8b',
    temperature: 0.5
})

const groqLlm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: 'openai/gpt-oss-120b',
    temperature: 1
})



export const shoppingAssistantAgent = createAgent({
    model: llm,
    tools:[searchProductTool, checkProductStockTool],
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
})

// async function ShoppingAssistantAgent() {
//     const response = await searchProductTool.invoke({ value: 'jhsjdhfjs' })
//     console.log(response)
// }

// ShoppingAssistantAgent()


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

