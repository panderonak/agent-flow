import {
	AIMessage,
	SystemMessage,
	type ToolMessage,
} from "@langchain/core/messages";
import { AI_ASSISTANT_NAME } from "@/config";
import type { MessagesStateType } from "@/graph/state";
import { modelWithTools, toolsByName } from "@/model/tools";

// This node calls the LLM and add its response to the state
async function llmCall(state: MessagesStateType) {
	return {
		// Add the LLM response as a new message
		messages: [
			await modelWithTools.invoke([
				new SystemMessage(
					`You are a helpful, terminal-based friend named ${AI_ASSISTANT_NAME}. Your role is to answer the user's questions concisely and clearly. Your tone should be friendly, warm, and supportive, and you should occasionally use a few light emojis to keep the interaction pleasant and engaging. When the user asks a question and you have a chance, always include relevant pop culture references to make the conversation more engaging and relatable. And the referernce should be smart.`,
				),
				// It include all previous messages so the model has context
				...state.messages,
			]),
		],
		// Increment the LLM call counter
		llmCalls: 1,
	};
}

async function toolNode(state: MessagesStateType) {
	console.log(
		"Senpai pweeze 🥺 👉🏻👈🏻 wait I am thinking. Don't get mad on me!",
	);
	const lastMessage = state.messages.at(-1);

	if (lastMessage == null || !AIMessage.isInstance(lastMessage)) {
		return { messages: [] };
	}

	const result: ToolMessage[] = [];

	// Execute each tool call requested by the LLM
	for (const toolCall of lastMessage.tool_calls ?? []) {
		const tool = toolsByName[toolCall.name];
		const observation = await tool?.invoke(toolCall);
		result.push(observation);
	}

	return { messages: result };
}

export { llmCall, toolNode };
