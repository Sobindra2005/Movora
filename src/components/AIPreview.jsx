import { useState } from "react";
import { shoppingAssistantAgent } from "../agent/agents";
import { HumanMessage } from "langchain";

export function AiPreview() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;
        setLoading(true)
        try {
            const prompt = new HumanMessage(input);

            const response = await shoppingAssistantAgent.invoke({ messages: prompt })

            setResponse(JSON.stringify(response, null, 2));

            // setResponse(response)
        } catch (error) {
            setResponse(`error: ${error.message}`);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen pt-24 bg-gray-100 p-8">
            <h1 className="mb-8 text-center text-3xl font-bold">
                AI Response Preview
            </h1>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">

                {/* Section 1 - Input */}
                <div className="rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        Input
                    </h2>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask something..."
                        className="h-40 w-full resize-none rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
                    />

                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="mt-4 w-full rounded-lg bg-black px-4 py-3 text-white transition hover:bg-gray-800"
                    >
                        {loading ? "Loading..." : "Send"}
                    </button>
                </div>

                {/* Section 3 - Response */}
                <div className="rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        Response
                    </h2>

                    <pre className="min-h-40 w-full whitespace-pre-wrap wrap-break-word rounded-lg bg-gray-100 p-4 text-gray-700">
                        {response || "Response will appear here..."}
                    </pre>
                </div>

            </div>
        </div>
    )
}