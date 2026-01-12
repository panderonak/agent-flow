# Agent Flow

A conversational AI agent built with LangChain and LangGraph that features tool-calling capabilities and persistent memory. The agent can search the web using Tavily and maintain conversation context across interactions. I built this project for learning and understanding how agents works.

https://github.com/user-attachments/assets/2ca267bb-fcc8-4afc-b5f7-6df05cb1b5e8

## Table of contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project structure](#project-structure)
- [Process of building](#process-of-building)
- [What I learned](#what-i-learned)

## Features

- **Interactive CLI Interface**: Chat with the AI assistant directly from your terminal
- **Tool Integration**: Web search capabilities powered by Tavily
- **Persistent memory** — Conversation history is stored using LangGraph’s built-in memory, allowing the agent to remember earlier messages within a thread.

<img width="989" height="630" alt="image" src="https://github.com/user-attachments/assets/bc1f4dcf-a3e8-45fd-a90f-165c822a359d" />

## Tech Stack

- TypeScript (v5+) – Primary language with static typing
- LangChain
- LangGraph

## Installation

1. Clone the repository:
```bash
git clone https://github.com/panderonak/agent-flow.git
cd agent-flow
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env` file in the root directory with your API keys:
```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

## Usage

Start the interactive chat:
```bash
bun run src/index.ts
```

Type your messages at the `YOU ->` prompt. The AI assistant will respond to your queries and can use web search when needed.

To exit the conversation, type:
```
/bye
```

## Project Structure

```
src/
├── index.ts     # Main entry point and CLI interface
├── config.ts    # Configuration settings
├── model/
│   ├── index.ts    # LLM model configuration (Groq)
│   └── tools.ts   # Tool definitions (Tavily search)
└── graph/
    ├── index.ts    # Agent graph definition
    ├── state.ts    # State schema
    ├── nodes.ts    # Graph nodes (llmCall, toolNode)
    └── edges.ts    # Conditional routing logic
```

## Process of Building

I first implemented the functionality for taking user input (the user’s message). Next, I defined the web search tool and the model. After that, I defined the graph state, which is a shared data structure representing the current state of the application.

I then created the LLM node, the tool node, and a `shouldContinue` node. These are functions that handle the agent’s logic. Each node receives the current stae as input, performs some computation or side effect, and returns an updated state.

Finally, I built and compiled the agent. When the user provides a message as input, the agent is invoked, and its response is printed to the terminal.

## What I learned

I learned what AI agents are and how they work. For example, if a user asks, “What is the current weather?”
But LLM does not have access to real-time data because it is trained on static data such as articles, books, and Wikipedia, and then deployed. After deployment, it does not automatically have access to the internet or live information.

To get real-time data, an LLM needs access to external tools. These tools are essentially functions. Behind the scenes, we can perform a web search, fetch the weather data, and pass that information to the LLM. Based on this data, the LLM generates the final response.

<img width="1115" height="680" alt="image" src="https://github.com/user-attachments/assets/13bed7d9-0696-4d5a-b072-5609e5434063" />

LLM cannot perform actions on its own; it only has the ability to reason and generate text. To perform actions—such as searching the web—we must provide external tools. When an LLM is able to invoke and use these tools, it is referred to as an AI agent.

