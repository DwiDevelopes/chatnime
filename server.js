const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Menyajikan file HTML dan sumber daya lainnya

// Ketika ada koneksi baru dari client
io.on('connection', (socket) => {
    console.log('A user connected');

    // Mendengarkan pesan dari client
    socket.on('sendMessage', (msg) => {
        io.emit('receiveMessage', msg); // Mengirim pesan ke semua pengguna yang terhubung
    });

    // Ketika pengguna terputus
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Jalankan server pada port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
