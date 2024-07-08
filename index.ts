import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req: any, res: any) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {

  console.log('a user connected');
  socket.emit('server-message', 'you successfully connected');
  io.emit('server-message', 'a client connected');
  sendHello(socket)
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('server-message', 'a client disconnected');
  });
});

async function sendHello(socket: any) {
  while (true) {
    socket.emit('server-message', 'Hello from server');
    await new Promise((resolve) => setTimeout(resolve, 4000));
  }

}


server.listen(80, () => {
  console.log('server running at http://localhost:80');
});