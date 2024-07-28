import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({path: "../../.env"});

const openai = new OpenAI({
    organization: process.env.ORG_ID,
    project: process.env.PROJECT_ID,

});

async function chatGPT(input) {
    const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
        stream: true,
    });
    let result = ""; 
    for await (const chunk of stream) {
        result += chunk.choices[0]?.delta?.content || ""; 
    }
    console.log(result);
    return result; 
}

export default chatGPT;