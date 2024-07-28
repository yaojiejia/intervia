import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import * as redisClient from '../lib/redis/redis.js'
dotenv.config();
const prisma = new PrismaClient();
await redisClient.connect()

export const getGptHistory = async (sessionId) => {
    try {
    const chatGptHistoryMsg = await prisma.message.findMany({
        where: {
          sessionId: sessionId,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

    return chatGptHistoryMsg;
    }
    catch (error) {
        console.error(error);
        return "Error, no chatGpt messages found."
    }
};

export const historyToString = async (sessionId) => {
    try {
      const chatGptHistoryMsg = await getGptHistory(sessionId);
      const formattedMessages = chatGptHistoryMsg.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
      return formattedMessages;
    } catch (error) {
      console.error(error);
      return "Error, no chatGpt messages found.";
    }
  };

export const getLeetCode = async (difficulty, company) => {
    const leetcodeQuestions = await prisma.leetcode.findMany({
        where: {
            difficulty: difficulty,
            company: company
        }
    });

    if (leetcodeQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * leetcodeQuestions.length);
        const leetcodeQuestion = leetcodeQuestions[randomIndex];
        return leetcodeQuestion;
    } else {
        return "Error, no leetcode questions found."
    }
};

export const getTechnicalQuestion = async () => {
    try{
        if (await redisClient.get('technicalQuestion')!=null){
            return redisClient.get('technicalQuestion')
        }
        else{
            let technicalQuestion = await prisma.technical.findFirst();
            await redisClient.set('technicalQuestion', technicalQuestion)
            return technicalQuestion;
        }
    }   
    catch (error) {
        console.error(error);
        return "Error, no technical questions found."
    }
};  

export const getFirstSession = async (sessionId) => {
    try{
    const session = await prisma.session.findFirst({
        where: {
            id: sessionId
        }
    });
    return session;
    }
    catch (error) {
        console.error(error);
        return "Error, no session found."
    }
};


export const createMsg = async (sessionId, sender, text) => {
    try{
    const newMsg = await prisma.message.create({
        data: {
            sessionId,
            sender,
            text,
            createdAt: new Date()
        }
    });
    return newMsg;
    }
    catch (error) {
        console.error(error);
        return "Error, message not created."
    }
}

export const createSession = async (userId) => {
    try{
    const newSession = await prisma.session.create({
        data: {
            userId: userId,
            createdAt: new Date()
        }
    });
    return newSession;
}
    
    catch (error) {
        console.error(error);
        return "Error, session not created."
    }
}
