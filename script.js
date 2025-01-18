
// Memilih avatar yang akan digunakan
function selectAvatar(avatarSrc) {
    document.getElementById('selected-avatar').src = avatarSrc;
    localStorage.setItem('selectedAvatar', avatarSrc);  // Menyimpan pilihan avatar
}

// Menampilkan avatar yang dipilih (jika ada) ketika halaman dimuat
window.onload = function() {
    var selectedAvatar = localStorage.getItem('selectedAvatar');
    if (selectedAvatar) {
        document.getElementById('selected-avatar').src = selectedAvatar;
    }
    var currentRoom = localStorage.getItem('currentRoom');
    if (currentRoom) {
        document.getElementById('room-name').value = currentRoom;
        renderMessages(currentRoom); // Render pesan untuk room tertentu
    }
};

// Fungsi untuk merender pesan dari localStorage
function renderMessages(room) {
var chatBox = document.getElementById('chat-box');
chatBox.innerHTML = ''; // Clear chat box
var messages = JSON.parse(localStorage.getItem('messages')) || [];
var roomMessages = messages.filter(function(msg) {
return msg.room === room;
});
roomMessages.forEach(function(msg) {
var newMessage = document.createElement('div');
newMessage.classList.add('message');

var avatar = document.createElement('img');
avatar.src = msg.avatar;
newMessage.appendChild(avatar);

var sender = document.createElement('span');
sender.classList.add('sender');
sender.textContent = msg.name + ": ";

var messageContent = document.createElement('span');
messageContent.classList.add('content');
messageContent.textContent = msg.message;

newMessage.appendChild(sender);
newMessage.appendChild(messageContent);

// Menambahkan media (gambar/video/stiker) jika ada
if (msg.media) {
    var mediaElement = document.createElement(msg.media.type === 'video' ? 'video' : 'img');
    mediaElement.classList.add('media');

    // Jika media adalah stiker, tambahkan kelas 'sticker'
    if (msg.media.type === 'image' && msg.media.src.includes('sticker')) {
        mediaElement.classList.add('sticker');
    }

    mediaElement.src = msg.media.src;
    if (msg.media.type === 'video') {
        mediaElement.controls = true;
    }
    newMessage.appendChild(mediaElement);
}

// Menambahkan waktu pengiriman
var timeSent = document.createElement('span');
timeSent.classList.add('time-sent');
timeSent.textContent = new Date(msg.timestamp).toLocaleTimeString(); // Format waktu
newMessage.appendChild(timeSent);

chatBox.appendChild(newMessage);
});
}


        
        // Menampilkan waktu pesan di chat
        function displayTime(timestamp) {
            var date = new Date(timestamp);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var formattedTime = hours + ":" + minutes + ":" + seconds;
            return formattedTime;
        }
        

   
    // Menyimpan stiker yang dipilih
    let selectedSticker = null;

    // Fungsi untuk memilih stiker
    function selectSticker(stickerSrc) {
        selectedSticker = stickerSrc;  // Menyimpan stiker yang dipilih
        document.getElementById('selected-avatar').src = stickerSrc;  // Menampilkan stiker yang dipilih
    }

// Sound to play when sending a message
const sendMessageSound = new Audio('n.mp3'); // replace with your own sound file

// Add the play sound function
function playSendMessageSound() {
sendMessageSound.play();
}
// Modifikasi event listener untuk mengirim pesan
document.getElementById('send-btn').addEventListener('click', function() {
var nameInput = document.getElementById('name');
var messageInput = document.getElementById('message');
var fileInput = document.getElementById('file-input');
var name = nameInput.value.trim();
var message = messageInput.value.trim();
var avatar = document.getElementById('selected-avatar').src;
var room = localStorage.getItem('currentRoom');
var media = null;

// Jika stiker dipilih, gunakan stiker sebagai media
if (selectedSticker) {
media = {
    type: 'image',
    src: selectedSticker
};
} else if (fileInput.files.length > 0) {
var file = fileInput.files[0];
media = {
    type: file.type.startsWith('video') ? 'video' : 'image',
    src: URL.createObjectURL(file)
};
}

if (name !== "" && message !== "" && room) {
var messages = JSON.parse(localStorage.getItem('messages')) || [];

// Menambah pesan baru dengan avatar yang dipilih dan room yang aktif
messages.push({
    name: name,
    message: message,
    avatar: avatar,
    room: room,
    media: media,
    timestamp: Date.now() // Menambahkan timestamp pesan
});

// Menyimpan kembali pesan-pesan ke localStorage
localStorage.setItem('messages', JSON.stringify(messages));

// Render pesan terbaru
renderMessages(room);

// Play the sound when sending a message
playSendMessageSound();

// Bersihkan input
nameInput.value = '';
messageInput.value = '';
fileInput.value = ''; // Reset file input
selectedSticker = null;  // Reset stiker setelah pengiriman
}
});

// Fungsi untuk merender pesan dari localStorage
function renderMessages(room) {
var chatBox = document.getElementById('chat-box');
chatBox.innerHTML = ''; // Clear chat box
var messages = JSON.parse(localStorage.getItem('messages')) || [];
var roomMessages = messages.filter(function(msg) {
return msg.room === room;
});
roomMessages.forEach(function(msg) {
var newMessage = document.createElement('div');
newMessage.classList.add('message');

var avatar = document.createElement('img');
avatar.src = msg.avatar;
newMessage.appendChild(avatar);

var sender = document.createElement('span');
sender.classList.add('sender');
sender.textContent = msg.name + ": ";

var messageContent = document.createElement('span');
messageContent.classList.add('content');
messageContent.textContent = msg.message;

newMessage.appendChild(sender);
newMessage.appendChild(messageContent);

// Menambahkan media (gambar/video/stiker) jika ada
if (msg.media) {
    var mediaElement = document.createElement(msg.media.type === 'video' ? 'video' : 'img');
    mediaElement.classList.add('media');

    // Jika media adalah stiker, tambahkan kelas 'sticker'
    if (msg.media.type === 'image' && msg.media.src.includes('sticker')) {
        mediaElement.classList.add('sticker');
    }

    mediaElement.src = msg.media.src;
    if (msg.media.type === 'video') {
        mediaElement.controls = true;
    }
    newMessage.appendChild(mediaElement);
}

// Menambahkan waktu pengiriman
var timeSent = document.createElement('span');
timeSent.classList.add('time-sent');
timeSent.textContent = new Date(msg.timestamp).toLocaleTimeString(); // Format waktu
newMessage.appendChild(timeSent);

// Menambahkan checkbox untuk memilih pesan
var checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.classList.add('message-checkbox');
checkbox.id = 'checkbox-' + msg.timestamp; // Set ID untuk setiap checkbox
checkbox.onclick = function() {
    console.log('Checkbox clicked:', msg.message);
};
newMessage.appendChild(checkbox);

chatBox.appendChild(newMessage);
});
}



// Tambahkan pemutar audio untuk backsound
const checkSound = new Audio('ceklis.mp3');  // Ganti dengan file audio yang sesuai

// Fungsi untuk menandai pesan dengan tanda centang dan memainkan suara
function toggleCheckBox(event) {
const checkbox = event.target;
if (checkbox.checked) {
console.log('Pesan ditandai dengan centang');
checkSound.play();  // Memainkan suara saat checkbox dicentang
} else {
console.log('Pesan tidak ditandai dengan centang');
checkSound.play();  // Memainkan suara saat checkbox dicopot centangnya
}
}

// Menghubungkan event listener ke checkbox
document.getElementById('chat-box').addEventListener('change', function(event) {
if (event.target && event.target.classList.contains('message-checkbox')) {
toggleCheckBox(event);
}
});



// Kirim pesan jika menekan Enter
document.getElementById('message').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('send-btn').click();
    }
});

// Buat room baru
document.getElementById('create-room-btn').addEventListener('click', function() {
    var roomName = document.getElementById('room-name').value.trim();
    if (roomName !== "") {
        localStorage.setItem('currentRoom', roomName);
        renderMessages(roomName); // Render pesan untuk room baru
    }
});

// Bergabung ke room yang sudah ada
document.getElementById('join-room-btn').addEventListener('click', function() {
    var roomName = document.getElementById('room-name').value.trim();
    if (roomName !== "") {
        localStorage.setItem('currentRoom', roomName);
        renderMessages(roomName); // Render pesan untuk room yang sudah ada
    }
});
// Mendengarkan pesan yang diterima dari server
socket.on('receiveMessage', function(msg) {
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(msg);
    localStorage.setItem('messages', JSON.stringify(messages));

    var room = localStorage.getItem('currentRoom');
    renderMessages(room);
    // Putar suara ketika pesan baru diterima
    var audio = new Audio('n.mp3');  // Sesuaikan dengan path file audio
    audio.play();
});
