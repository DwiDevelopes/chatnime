// Required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: 'https://your-ngrok-subdomain.ngrok.io'  // Add your Ngrok URL here
}));

// Routing for chat page
app.get('/chat', (req, res) => {
    const room = req.query.room || 'default';
    res.sendFile(path.join(__dirname, 'index.html'), { root: __dirname });
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io with the server
const io = socketIo(server);

// Socket.io connections and events
io.on('connection', (socket) => {
    console.log('User connected');

    // When a user joins a room
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        console.log(`User joined room: ${roomName}`);
        
        // Send a welcome message to the user
        socket.emit('receiveMessage', { message: 'Welcome to ' + roomName });
    });

    // When a user sends a message to a room
    socket.on('sendMessageToRoom', (msg) => {
        io.to(msg.room).emit('receiveMessageFromRoom', msg);  // Send the message to the specific room
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
