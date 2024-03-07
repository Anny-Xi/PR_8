// express
import express from 'express';

// communication met GPT
import { ChatOpenAI } from "@langchain/openai"

const messages = [
    ["system", "You are dietitian. You knows how to make balanced and delicious meal, you will give people advice as they require, but when they wants unhealthy food, you will also give advice to build a healthy meal with unhealthy food. You will also give people instruction for making the dish. Please give advice in the original language the request is sent."],
    // ["human", " "],
    // ["ai", " "],

    ["human", "Help me make the tom yum soup"],
    ["ai", `Tom yum soup is a classic Thai soup that is tangy, spicy, and fragrant with the flavors of lemongrass, chili, and lime. It can be made with chicken, shrimp, or a combination of both.\n Here's how you can make it at home: \n Ingredients: \n- 1 pound chicken breast or shrimp, peeled and deveined \n- 4 cups chicken broth or water \n- 2 stalks lemongrass, bruised \n- 3-4 kaffir lime leaves \n- 3-4 bird's eye chili, sliced \n- 2 tablespoons fish sauce \n- 1 tablespoon sugar \n- 1/4 cup lime juice \n- 1/4 cup chopped cilantro \n- 1/4 cup sliced green onions \n- Salt to taste \n\nInstructions: \n1. In a large pot, bring the chicken broth or water to a boil. Add the chicken breast or shrimp and simmer until cooked through. \n2. Remove the chicken or shrimp from the pot and set it aside. \n3. Add the lemongrass, kaffir lime leaves, and sliced chili to the pot and simmer for 10-15 minutes to infuse the broth with the aromatics. \n4. Strain the broth through a fine-mesh sieve and return it to the pot. \n5. Add the fish sauce, sugar, and lime juice to the pot and stir to combine. \n6. Add the chicken or shrimp back to the pot along with the chopped cilantro and sliced green onions. \n7. Simmer for a few more minutes until everything is heated through. \n8. Season with salt if necessary. \n9. Serve the hot and spicy Tom Yum soup in bowls. Tom yum soup pairs well with steamed rice or noodles. \n\nEnjoy this healthy and flavorful soup! `]
];


const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


console.log("hello world");

console.log(process.env.AZURE_OPENAI_API_KEY);


app.get('/chat', (req, res) => {
    console.log("ai");
    res.send('Hello my CHAT gpt');
})


app.post('/', async (req, res) => {
    // const prompt = req.body.prompt;
    const advice = req.body.advice;// Destructure only required fields

    async function callOpenAI(advice) {
        messages.push(["human", advice]);
        const reply = await model.invoke(messages)
        messages.push(["ai", reply.content]);

        console.log(messages)
        console.log(reply.content)
        res.json({ai:reply.content})
    }

    try {
        // Validate incoming data
        if (!advice) {
            return res.status(400).json({message: 'give us your require please'});
        }
        callOpenAI(advice)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server listening on Port ${process.env.PORT}`);
})







