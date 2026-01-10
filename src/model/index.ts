import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
	model: "openai/gpt-oss-120b",
	temperature: 1,
	maxRetries: 2,
	streaming: true,
});

export default model;
