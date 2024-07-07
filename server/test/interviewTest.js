import { startInterview, roundOneInterview, roundTwoInterview} from "../lib/config/interviewConfig.js";
import { getGptHistory, getUserHistory, getFirstSession, getLeetCode, getTechnicalQuestion, createSession, createMsg} from "../lib/helper/dbHelper.js";


// const session = await startInterview('66888f1da11be6fe6d48e68e');
// await roundOneInterview(session.sessionId, 'im a software engineer at google.');
const res1 = await roundTwoInterview('668a0e38a37b0e03e263df83', 'test.', 'Medium', 'adobe');

// const res1 = await getGptHistory('668a0e38a37b0e03e263df83');

console.log(res1);