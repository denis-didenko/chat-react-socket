import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        //origin: 'http://localhost:3000',
        origin: 'https://62c859015521e23e4c8bf39e--chat-react-socket-io.netlify.app',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', socket => {
    socket.on('join-room', room => {
        socket.join(room);
        io.to(room).emit('joined-room-clients', io.sockets.adapter.rooms.get(room).size);
    });

    socket.on('send-message', data => {
        console.log('data: ', data);
        socket.to(data.room).emit('receive-message', data);
    });

    socket.on('disconnect', () => {
        console.log('User are disconnected', socket.id);
    });
});

httpServer.listen(process.env.PORT || 5000, () => {
    console.log('listening on port 5000');
});
