const http = require("http");
const app = require("./app");
const { initializeSocket } = require('./socket');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

// Initialize socket.io
initializeSocket(server);

const startServer = () => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying ${port + 1}`);
            port++;
            startServer();
        } else {
            console.error('Server error:', err);
        }
    });
};

startServer();