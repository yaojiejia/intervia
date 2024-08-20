// import { startInterview, roundOneInterview, roundTwoInterview, conversation} from "../lib/config/interviewConfig.js";
import { getGptHistory,getFirstSession, getLeetCode, getTechnicalQuestion, createSession, createMsg, historyToString} from "../lib/helper/dbHelper.js";


// const session = await startInterview('66888f1da11be6fe6d48e68e');
// const res = await roundOneInterview('668afb56029186d2fe1315e9', 'im a student studying computer science and i am interested in software engineering.');
// const res2 = await conversation('668afb56029186d2fe1315e9', 'sorry for the wrong answer, the left child is always less than the parent node and the right child is always greater than the parent node.');
// const res1 = await historyToString('668a0e38a37b0e03e263df83');
// const res = await roundTwoInterview('668afb56029186d2fe1315e9', 'test', 'Easy', 'adobe') 
const leet = await getLeetCode('Easy', 'adobe');
console.log(leet);