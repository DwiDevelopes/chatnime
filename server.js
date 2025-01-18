// Mengambil nama room dari query string di URL
const urlParams = new URLSearchParams(window.location.search);
const roomName = urlParams.get('room');

if (roomName) {
    socket.emit('joinRoom', roomName);
    document.getElementById('room-name').value = roomName;
    renderMessages(roomName);
}

const express = require('express');
const app = express();

// Routing untuk halaman chat
app.get('/chat', (req, res) => {
    const room = req.query.room || 'default';
    res.sendFile(path.join(__dirname, 'index.html'), { root: __dirname });
});

// Menggunakan Socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Menjalankan server
http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

// Routing untuk menerima pesan dari klien
io.on('connection', (socket) => {
    console.log('Client connected');

    // Mendapatkan nama room dari klien
    const room = socket.handshake.query.room || 'default';

    // Mendapatkan pesan dari klien
    socket.on('sendMessageToRoom', (msg) => {
        console.log(`Message received from client: ${msg.message}`);
        io.to(room).emit('receiveMessageFromRoom', msg);
    });

    // Mendapatkan room yang aktif dari klien
    socket.on('joinRoom', (roomName) => {
        console.log(`Room ${roomName} joined by client`);
        socket.join(roomName);
    });
});

