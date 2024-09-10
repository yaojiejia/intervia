import { PrismaClient } from "@prisma/client";
import { getGptHistory, historyToString, getLeetCode, getTechnicalQuestion, getFirstSession, createMsg, createSession } from "../helper/dbHelper.js";
import {technicalQuestion, instruction} from "../script/technicalQuestion.js";
import * as redisClient from '../redis/redis.js';
import dotenv from "dotenv";
import chatGPT from "../openai/openai.js";
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();
const prisma = new PrismaClient();
await redisClient.connect();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('startInterview', async (msg) => {
    try {
      const res = await startInterview(msg, "66c4f3935abbc8813ca14411");
      io.emit('startInterview', { msg: res, response: res.gptRes, socket: socket.id });
      console.log('Message sent:', res);
    } catch (e) {
      console.log(e);
      socket.emit('error', e.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

let rounds = 1;

export const startInterview = async (msg, sessionId) => {
  console.log("msg coming in! " + msg);
  await createMsg(sessionId, "user: ", msg);
  if (!technicalQuestion) {
    throw new Error("Error, technical question is under");
  }

  let gptRes;

  try {
    gptRes = await chatGPT(msg);
    console.log(gptRes);
  } catch (error) {
    console.error("Error:", error);
  }

  const history = await historyToString(sessionId);

  const roundQuestions = {
    1: technicalQuestion[0],
    3: technicalQuestion[1],
    6: technicalQuestion[2],
    default: instruction + history
  };

  const question = roundQuestions[rounds] || roundQuestions.default;

  try {
    gptRes = await chatGPT(question);
    console.log(gptRes);
  } catch (error) {
    console.error("Error:", error);
  }

  rounds++;
  await createMsg(sessionId, "chatbot: ", gptRes);
  return { gptRes };
}

const port = 4000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});