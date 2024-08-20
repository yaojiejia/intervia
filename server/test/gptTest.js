import chatGPT from "../lib/openai/openai.js"
import { getGptHistory, historyToString, getLeetCode, getTechnicalQuestion, getFirstSession, createMsg, createSession} from "../lib/helper/dbHelper.js";


const technicalQuetion = await getTechnicalQuestion();
const gptRes = await chatGPT(technicalQuetion.beginning);

console.log(gptRes);