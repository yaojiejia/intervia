import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({path: "../../.env"});

const openai = new OpenAI({
    organization: process.env.ORG_ID,
    project: process.env.PROJECT_ID,

});

async function main() {
    
    const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Say this is a test" }],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

main();