import express from 'express';
import authRoute from './routes/authRoute.js';
import interviewRoute from './routes/interviewRoute.js';
import dotenv from 'dotenv';
dotenv.config();    
const app = express();
app.use(express.json());

app.use("/auth", authRoute);
app.use("/start", interviewRoute);

// TEST: api route for client proxy testing
app.get("/api", (req, res) => {
    res.send("Hello from the server!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});