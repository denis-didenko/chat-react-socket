import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', socket => {
    console.log(socket.id);

    socket.on('join-room', room => {
        socket.join(room);
    });

    socket.on('send-message', data => {
        socket.to(data.room).emit('receive-message', data);
    });

    socket.on('disconnect', () => {
        console.log('User are disconnected', socket.id);
    });
});

httpServer.listen(5000, () => {
    console.log('listening on port 5000');
});
