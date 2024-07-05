import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();

export const createInterview = async (id, type, difficulty, company) => {
    //Start with the starting question from db
    //Ask chatgpt that, return the response in here
    //repeat the process until the interview is over
    const startingQuestion = await prisma.technical.findFirst({
        where: {
            difficulty: difficulty,
            company: company
        }
    });

    const leetcode = await prisma.technical.findFirst({
        where: {
            difficulty: difficulty,
            company: company
        }
    });


    
};


