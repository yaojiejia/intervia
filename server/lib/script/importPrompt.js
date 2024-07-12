import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from "@prisma/client";
import path from 'path';

const prisma = new PrismaClient();

function createPrompt (){
    const filePath = "../source/pe.csv"
    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        await prisma.technical.create({
          data: {
            beginning: row['b'],
            roundOne: row['r1'],
            roundTwo: row['r2'],
            roundThree: row['r3'],
            ending: row['e'],
          },
        });
        console.log(`Inserted: ${row['b']}`);
      } catch (error) {
        console.error('Error inserting data', error);
      }
    })
    .on('end', () => {
      console.log(`successfully processed`);
    });

}
createPrompt();