import express from 'express';
import authRoute from './routes/authRoute.js';
const app = express();
app.use(express.json());

app.use("/auth", authRoute);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});