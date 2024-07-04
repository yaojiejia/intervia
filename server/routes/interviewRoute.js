import express from 'express';
import { createInterview } from '../lib/config/interviewConfig.js';

const router = express.Router();



router.post("/start", async (req, res) => {
    const {id, type, difficulty, company, k1, k2, k3, k4} = req.body;
   
    createInterview(id, type, difficulty, company);
    
    
});




export default router;
