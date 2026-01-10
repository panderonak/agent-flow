import { TavilySearch } from "@langchain/tavily";
import model from "@/model";

const search = new TavilySearch({
	maxResults: 3,
	topic: "general",
});

const toolsByName = {
	[search.name]: search,
};

const tools = Object.values(toolsByName);

const modelWithTools = model.bindTools(tools);

export { toolsByName, modelWithTools };
