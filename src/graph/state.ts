// This is the single source of truth for what data every node in the graph can read and write.

import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

// This defines the entire graph state schema.
export const MessagesState = Annotation.Root({
	// Spread in the built-in messages state.
	// This adds a `messages` field that:
	// - stores conversation messages
	// - automatically appends new messages returned by nodes
	// - avoids manual message merging
	...MessagesAnnotation.spec,

	// Custom state field to track how many times the LLM is called
	llmCalls: Annotation<number>({
		reducer: (x, y) => x + y,
		default: () => 0,
	}),
});

export type MessagesStateType = typeof MessagesState.State;
