import { OpenAI } from 'openai'
import dotenv from 'dotenv';

dotenv.config();

// Create an instance of OpenAI class
if(!process.env.OPENAI_API_KEY){
    throw new Error(`OpenAI Key is not set`);
}
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const main = async () => {
    //define the prompt 
    const prompt = "I need to start resistance training. Can you create a 7 day workout plan for to ease into it? Limit it in 100 words or less.";

    //sent api request
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `You respond with a greeting in the beginning. And you always respond in JSON format, like this: {"greeting" : "greeting here", "plan": "plan here"}`,
            }
            ,{
                role: "user",
                content: prompt
            }
        ],
        max_tokens: 200,
        n: 2,
        frequency_penalty: 1.5,
        seed: 5555,
    })

    console.log(response.choices[0].message.content);
}


main();