import express from 'express';
import { startInterview, conversation } from '../lib/config/interviewConfig.js';

const router = express.Router();



router.post("/chat/start", async (req, res) => {
    const {userId} = req.body;
    
    const {gptRes, sessionId} = await startInterview(userId);
    
    res.send({gptRes,sessionId})
    
});

router.post("/chat/conversation", async (req, res) => {
    const {sessionId, message} = req.body;
    const gptRes = await conversation(sessionId, message)
    res.send({gptRes, sessionId})

})

router.post("/chat/r1", async(req,res) =>{
    
}) 


export default router;









