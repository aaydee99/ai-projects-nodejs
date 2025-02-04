import {OpenAI} from 'openai'

const openAI = new OpenAI();

const context: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [{
    role: 'system',
    content: 'You are a helpful assistant',
}];
const createChat = async()=>{
    const response = await openAI.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: context,
        // max_tokens: 60,
        // n: 2,
        // seed: 8888,
        // frequency_penalty: 1.5,
    })
    const responseMessage = await response.choices[0].message;
    context.push(responseMessage)
    console.log(responseMessage.content);
}
process.stdin.addListener('data', async(input) => {
    const userInput = input.toString().trim();
    context.push({role: 'user', content: userInput});
    await createChat();
})