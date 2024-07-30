import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from "@prisma/client";
import path from 'path';

const prisma = new PrismaClient();
const csvFolder = '../source/leetcode';

// Function to import data from a single CSV file
function importCSVToMongoDB(csvFilePath) {
  const filename = path.basename(csvFilePath);
  const companyName = filename.split('_')[0].toLowerCase();

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        await prisma.leetcode.create({
          data: {
            number: row['ID'], // Assuming 'ID' is the column name in your CSV
            question: row['Title'], // Assuming 'Title' is the column name
            difficulty: row['Difficulty'], // Assuming 'Difficulty' is the column name
            company: companyName,
          },
        });
        console.log(`Inserted: ${row['Title']}`);
      } catch (error) {
        console.error('Error inserting data', error);
      }
    })
    .on('end', () => {
      console.log(`${filename} successfully processed`);
    });
}

function importAllCSVFiles() {
    fs.readdir(csvFolder, (err, files) => {
      if (err) {
        console.error('Error listing CSV files', err);
        return;
      }
  
      // Step 1: Create an empty array to hold the paths
      const csvFilePaths = [];
  
      // Step 2: Iterate over each file and add its path to the array if it ends with '.csv'
      files.forEach(file => {
        if (file.endsWith('.csv')) {
          const csvFilePath = path.join(csvFolder, file);
          csvFilePaths.push(csvFilePath);
        }
      });

    //   console.log(csvFilePaths);

      for (let i = 65; i < 80; i++) {
        importCSVToMongoDB(csvFilePaths[i]);
      }
  
      
    });
  }

importAllCSVFiles();

// importCSVToMongoDB('../source/leetcode/adobe_6months.csv');