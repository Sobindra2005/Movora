import { HumanMessage } from "langchain";
import { searchAgent, TripPlannerAgent } from "./agents.js";


const interactingWithTripPlanner = async () => {
    const agent = TripPlannerAgent

    const prompt = new HumanMessage("suggest me a best spot to visit inside Nepal");
    const response = await agent.invoke({ messages: prompt })

    console.log(response.messages.at(-1).content)

}

interactingWithTripPlanner();

// const interactWithTavilyMcp = async () => {
//     const agent = await searchAgent();
//     const prompt = new HumanMessage(`suggest some of the popular spots inside kathmandu for hiking`);

//     const response = await agent.invoke({ messages: prompt })

//     console.log(response);
//     console.log(`\n\n`, response.messages.at(-1).content)
// }


// const interactWithWeather = async () => {
//   const agent = await weatherAgent();
//   const prompt = new HumanMessage(`What's the current weather in kathmandu?`)
//   const response = agent.invoke({ messages: prompt })

//   console.log((await response).messages.at(-1).content)
// }


// interactWithTavilyMcp();



