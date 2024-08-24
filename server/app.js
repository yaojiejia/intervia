// import express from 'express';
// import authRoute from './routes/authRoute.js';
// import interviewRoute from './routes/interviewRoute.js';
// import dotenv from 'dotenv';
// dotenv.config();    
// const app = express();
// app.use(express.json());

// app.use("/auth", authRoute);
// app.use("/start", interviewRoute);

// // TEST: api route for client proxy testing
// app.get("/api", (req, res) => {
//     res.send("Hello from the server!");
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//     console.log("Server is running on port " + port);
// });

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('startInterview', (msg) => {
    console.log('Message received:', msg);
    io.emit('startInterview', {msg: msg, response: 'socket receive msg', socket: socket.id});
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});