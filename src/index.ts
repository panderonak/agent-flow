import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";
import { HumanMessage } from "@langchain/core/messages";
import { agent } from "@/graph";

async function main() {
	const rl = readline.createInterface({ input, output });

	while (true) {
		const message = await rl.question(`YOU -> `);

		if (message === "/bye") {
			break;
		}

		const res = await agent.invoke(
			{ messages: [new HumanMessage(message)] },
			// Here we hardcoded the thread_id
			// Usually it comes from the database
			{ configurable: { thread_id: "frieren" } },
		);

		const lastMessage = res.messages.at(-1);
		console.log(`AI -> ${lastMessage?.content}`);
	}

	rl.close();
}

main();
