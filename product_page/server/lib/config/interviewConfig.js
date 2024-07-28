import { PrismaClient } from "@prisma/client";
import { getGptHistory, historyToString, getLeetCode, getTechnicalQuestion, getFirstSession, createMsg, createSession} from "../helper/dbHelper.js";
import * as redisClient from '../lib/redis/redis.js'
import dotenv from "dotenv";
import chatGPT from "../openai/openai.js"
dotenv.config();
const prisma = new PrismaClient();
await redisClient.connect()



export const startInterview = async (userId) => {
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });

    if (!user) {
        return "Error, user not found."
    }

    

    const session = await createSession(user.id);

    const technicalQuetion = await getTechnicalQuestion();

    const gptRes = await chatGPT(technicalQuetion.beginning);

    await createMsg(session.id, "gpt", gptRes);

    return {gptRes, sessionId: session.id};
}


export const roundOneInterview = async (sessionId, text) => {

    const session = getFirstSession(sessionId);

    if (!session) {
        return "Error, session not found."
    }

    const technicalQuetion = await getTechnicalQuestion();
    
    const gptRes = await chatGPT(technicalQuetion.roundOne);
    
    await createMsg(sessionId, "user", text);
    await createMsg(sessionId, "gpt", gptRes);

    return {gptRes, sessionId: sessionId};
    
};

export const roundTwoInterview = async (sessionId, text, difficulty, company) => {
    const session = getFirstSession(sessionId);

    if (!session) {
        return "Error, session not found."
    }

    const leetcodeQuestion = await getLeetCode(difficulty, company);

    const technicalQuetion = await getTechnicalQuestion();

    const prompt = technicalQuetion.roundTwo

    console.log(leetcodeQuestion.question)

    const gptPrompt = prompt.replace(new RegExp('Leetcode', 'g'), 'leetcode question:' + leetcodeQuestion.number + leetcodeQuestion.question);;

    console.log(gptPrompt);

    const gptRes = await chatGPT(gptPrompt);
    
    await createMsg(sessionId, "user", text);
    await createMsg(sessionId, "gpt", gptRes);

    return {gptRes, sessionId: sessionId};


};


export const conversation = async (sessionId, text) => {
    const session = getFirstSession(sessionId);

    if (!session) {
        return "Error, session not found."
    }

    const getHistory = await historyToString(sessionId);

    const gptPrompt = "this is your history chat logs with the user," + getHistory + " please make a make suggestions, validation, and correction to user's latest chat as an interviewer" + text + "please make suggestions modifications, do not include any past chat histories"
    
    const gptRes = await chatGPT(gptPrompt);

    await createMsg(sessionId, "user", text);
    await createMsg(sessionId, "gpt", gptRes);

    return {gptRes, sessionId: sessionId};

};

export const review = async (userId) => {};

