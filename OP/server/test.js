import { ChatOpenAI } from "@langchain/openai"
const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})
const joke = await model.invoke("I want a other balanced meal and also give me how many gram each meal would be and calorie!")
console.log(joke.content)