import { io } from 'socket.io-client';

const socket = io('http://localhost:6000');

socket.on('connect', () => {
  console.log('connected to server');

  // Start the interview
  socket.emit('startInterview', '66888f1da11be6fe6d48e68e');
});

socket.on('interviewStarted', (data) => {
  console.log('Interview started:', data);
});
// TODO implement the reply function with speech to text in the front-end
socket.on('disconnect', () => {
  console.log('disconnected from server');
});
