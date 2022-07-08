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
    socket.on('join-room', room => {
        socket.join(room);
        socket.emit('joined-room-clients', io.sockets.adapter.rooms.get(room).size);
    });

    socket.on('send-message', data => {
        console.log('data: ', data);
        socket.to(data.room).emit('receive-message', data);
    });

    socket.on('disconnect', () => {
        console.log('User are disconnected', socket.id);
    });
});

httpServer.listen(5000, () => {
    console.log('listening on port 5000');
});
