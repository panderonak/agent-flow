// Build the graph (how the agent flows from one step to another)

import { END, MemorySaver, START, StateGraph } from "@langchain/langgraph";
import { shouldContinue } from "@/graph/edges";
import { llmCall, toolNode } from "@/graph/nodes";
import { MessagesState } from "@/graph/state";

// Store graph state in memory so it can be reused between steps
const checkpointer = new MemorySaver();

// Create and configure the agent graph
export const agent = new StateGraph(MessagesState)
	.addNode("llmCall", llmCall)
	.addNode("toolNode", toolNode)
	// Start the graph by calling the LLM
	.addEdge(START, "llmCall")
	// After the LLM runs, decide whether to:
	// - call a tool, or
	// - stop the graph
	.addConditionalEdges("llmCall", shouldContinue, ["toolNode", END])
	// After a tool runs, go back to the LLM
	.addEdge("toolNode", "llmCall")
	// Finalize and compile the graph
	.compile({ checkpointer });
