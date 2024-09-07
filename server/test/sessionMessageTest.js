import chatGPT from "../lib/openai/openai.js";
import { getGptHistory, historyToString, getLeetCode, getTechnicalQuestion, getFirstSession, createMsg, createSession } from "../lib/helper/dbHelper.js";
import technicalQuestion from "../lib/script/technicalQuestion.js";

const t = await historyToString("66c4f3935abbc8813ca14411")

console.log(t)