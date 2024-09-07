import chatGPT from "../lib/openai/openai.js";
import { getGptHistory, historyToString, getLeetCode, getTechnicalQuestion, getFirstSession, createMsg, createSession } from "../lib/helper/dbHelper.js";
import technicalQuestion from "../lib/script/technicalQuestion.js";

async function runTest() {
    try {
        // const technicalQuetion = await getTechnicalQuestion();
        const gptRes = await chatGPT(technicalQuestion[0]);
        console.log(gptRes);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        process.exit(0); // Ensure the process exits after completion
    }
}

runTest();