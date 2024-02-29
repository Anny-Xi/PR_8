// express
import express from 'express';

// communicatie met GPT
import { ChatOpenAI } from "@langchain/openai"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/chat', (req, res) => {
    console.log("ai");
    res.send('Hello my CHAT gpt');
})

app.get('/joke', async (req, res) => {
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Origin', '*');

    console.log("message");

    const acceptedType = req.accepts('json');

    if (!acceptedType) {
        res.status(400).json({message: 'Not Acceptable'});
        return;
    }
    try {
        res.status(200).json(`here is the joke ${joke.content}`);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/', async (req, res) => {
    const {prompt} = req.body; // Destructure only required fields

    try {
        // Validate incoming data
        if (!prompt) {
            return res.status(400).json({message: 'give us your require please'});
        }

        const answer = await model.invoke(prompt)
        res.status(201).json(answer);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server listening on Port ${process.env.PORT}`);
})

console.log("hello world");

console.log(process.env.AZURE_OPENAI_API_KEY);




const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})
// const joke = await model.invoke("I want a other balanced meal and also give me how many gram each meal would be and calorie!")
const joke = await model.invoke("Tell me a programmer joke")
// console.log(joke.content)
