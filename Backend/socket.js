const socketIO = require('socket.io');

let io;

const initializeSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

const sendMessageToSocketId = (socketId, message) => {
    if (!io) {
        io.to(socketId).emit('message', message);
    }
    else {
        console.error('Socket.io not initialized');
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
}; 