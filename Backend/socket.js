const socketIO = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

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

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`User ${userId} joined the chat as ${userType}`);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {socketId : socket.id});
            }
            else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, {socketId : socket.id});
            }
        })

        socket.on('update-location-captain', async (data) => {
            const {userId, location} = data;

            if(!location || !location.ltd || !location.lng) {
                return socket.emit('error', {message: 'Invalid location data'});
            }
            
            await captainModel.findByIdAndUpdate(userId, {
                location:{
                ltd: location.ltd,
                lng: location.lng
            }}
            );
        })

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