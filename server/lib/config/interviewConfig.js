import { PrismaClient } from "@prisma/client";
import { getGptHistory, historyToString, getLeetCode, getTechnicalQuestion, getFirstSession, createMsg, createSession } from "../helper/dbHelper.js";
import * as redisClient from '../redis/redis.js';
import dotenv from "dotenv";
import chatGPT from "../openai/openai.js";
dotenv.config();
const prisma = new PrismaClient();
await redisClient.connect();

let rounds = 1;

export const startInterview = async (userId, sessionId) => {
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("Error, user not found.");
    }

    const technicalQuestion = await getTechnicalQuestion();
    if (!technicalQuestion) {
        throw new Error("Error, technical question is under");
    }

    let gptRes;
    if (rounds == 1) {
        // if (!technicalQuestion.beginning) {
        //     throw new Error("Error, technical question beginning is null or undefined");
        // }
        gptRes = await chatGPT("You will be the interviewer for a job that is looking to hire software engineers. I am the interviewee. We will simulate a real-life interview. Do not include dialog names of who is saying what. Just say what an interviewer would say. Do not address me as a ChatGPT user. You can now start the interview as an interviewer. Begin with the a professional opening then stop to let the interviewee answer. Do not make it sound like this is in the middle of a conversation.");
    } else if (rounds == 3) {
        if (!technicalQuestion.roundOne) {
            throw new Error("Error, technical question roundOne is null or undefined");
        }
        gptRes = await chatGPT(technicalQuestion.roundOne);
    } else if (rounds == 6) {
        if (!technicalQuestion.roundTwo) {
            throw new Error("Error, technical question roundTwo is null or undefined");
        }
        gptRes = await chatGPT(technicalQuestion.roundTwo);
    } else {
        if (!technicalQuestion.beginning) {
            throw new Error("Error, technical question beginning is null or undefined");
        }
        gptRes = await chatGPT(technicalQuestion.beginning);
    }

    await createMsg(sessionId, "gpt", gptRes);

    rounds++;
    return { gptRes };
}

export const review = async (userId) => {};