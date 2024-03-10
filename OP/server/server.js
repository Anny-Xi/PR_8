// express
import express from 'express';

// Import LLM
import { ChatOpenAI } from "@langchain/openai"
import { ChatAnthropic } from "@langchain/anthropic";

const controller = new AbortController();

const messages = [
    ["system", "You are dietitian. You knows how to make balanced and delicious meal. You will give people advice as they require, but when they wants unhealthy food, you will also give advice to build a healthy meal with unhealthy food. You will also tell them how much calorie the food contains. You will also log what the person eat and calculate the calories. If you get empty spaces send, you will ask if they can send their question. Please give advice in the original language the human is using."],
    ["human", "I want to have some chicken nuggets for the dinner, can you give me some advice"],
    ["ai", "I would recommend to put some tuna salade aside the nuggets, also have some hummus as dipping. if you want guide to prepare the salade, I will help you with it.  "]
];


const modelOpenAi  = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})

const modelAnthropic = new ChatAnthropic({
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    modelName: "claude-3-sonnet-20240229",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


// console.log("hello world");

// console.log(process.env.AZURE_OPENAI_API_KEY);

app.get('/', async(req,res)=> {
    res.send('Hello my CHAT gpt');
});

app.post('/', async (req, res) => {
    // const prompt = req.body.prompt;
    const advice = req.body.advice;// Destructure only required fields

    async function callOpenAI(advice) {
        
        setTimeout(() => {
            controller.abort();
        }, 3000);

        messages.push(["human", advice]);
        const reply = await modelOpenAi.invoke(messages) // await must be there

        console.log(reply)

        messages.push(["ai", reply.content]);

        console.log(messages)
        console.log(reply.content)
        res.json({ ai: reply.content })
    }

    try {
        // Validate incoming data
        if (!advice) {
            return res.status(400).json({ message: 'give us your require please' });
        }
    
        callOpenAI(advice)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get('/anthropic', async (req, res) => {
    const result = await modelAnthropic.invoke("Waarom is lucht blauw?");
    console.log(result)
});

app.post('/anthropic', async (req, res) => {
    
    const advice = req.body.advice;// Destructure only required fields

    async function callAnthropicAI(advice) {

        setTimeout(() => {
            controller.abort();
        }, 3000);

        messages.push(["human", advice]);
        const reply = await modelAnthropic.invoke(messages) // await must be there

        console.log(reply)

        messages.push(["ai", reply.content]);

        console.log(messages)
        console.log(reply.content)
        res.json({ ai: reply.content })
    }

    try {
        // Validate incoming data
        if (!advice) {
            return res.status(400).json({ message: 'give us your require please' });
        }

        callAnthropicAI(advice)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on Port ${process.env.PORT}`);
})







