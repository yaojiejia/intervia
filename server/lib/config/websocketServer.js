import { createServer } from 'http';
import { getGptHistory, historyToString, getLeetCode, getTechnicalQuestion, getFirstSession, createMsg, createSession} from "../helper/dbHelper.js";
import { Server } from 'socket.io';
import { startInterview } from './interviewConfig.js'; 

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('startInterview', async (userId) => {
    const session = await createSession(userId);
    const response = await startInterview(userId, session.id);
    socket.emit('interviewStarted', response);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(6000, () => {
  console.log('listening on *:6000');
});