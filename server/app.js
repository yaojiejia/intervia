import express from 'express';
import authRoute from './routes/authRoute.js';
import interviewRoute from './routes/interviewRoute.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());

app.use("/auth", authRoute);
app.use("/start", interviewRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});