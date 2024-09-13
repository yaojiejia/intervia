import express from 'express';
import authRoute from './routes/authRoute.js';
import dotenv from 'dotenv';
dotenv.config();    
const app = express();
app.use(express.json());

app.use("/auth", authRoute);



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});