import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();

export const createInterview = async (id, type, difficulty, company) => {
    //Start with the starting question from db
    //Ask chatgpt that, return the response in here and pass it to voiceToText
    //voicetotext is user and will return the response back to here
    //repeat the process until the interview is over

    
};

function voiceToText () {
    return 
}

