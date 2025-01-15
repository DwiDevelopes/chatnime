const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// Ketika klien terhubung
io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);

    // Bergabung ke room tertentu
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        console.log(socket.id + ' joined room: ' + roomName);
    });

    // Menerima pesan dan mengirimnya ke room yang sesuai
    socket.on('sendMessageToRoom', (msg) => {
        console.log('Message received: ', msg);
        // Mengirim pesan ke semua klien dalam room tertentu
        io.to(msg.room).emit('receiveMessageFromRoom', msg);
    });

    // Ketika klien disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

// Menjalankan server pada port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
