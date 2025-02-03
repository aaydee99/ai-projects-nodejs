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
    const prompt = "I need to start resistance traning. Can you create a 7 day workout plan for to ease into it? Limit it in 100 words or less.";

    //sent api request
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
    })

    console.log(response.choices[0].message.content);
}


main();