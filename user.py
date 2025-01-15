import socket
import threading
import tkinter as tk
import time

# Client sebagai Subject
class Client:
    def __init__(self, server_ip='127.0.0.1', port=12345):
        self.server_ip = server_ip
        self.port = port
        self.handlers = []  # Daftar observer (Thinkers)

    def attach(self, thinker: tk):
        """Menambahkan observer (Thinker) ke dalam list"""
        self.handlers.append(thinker)

    def detach(self, thinker: tk):
        """Menghapus observer (Thinker) dari list"""
        self.handlers.remove(thinker)

    def notify(self, message):
        """Memberitahukan semua thinker tentang pesan baru"""
        for thinker in self.handlers:
            message = thinker.update(message)  # Proses pesan dengan Thinker
        return message

    def connect(self):
        """Mencoba untuk terhubung ke server"""
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        retries = 5
        attempt = 0

        while attempt < retries:
            try:
                print(f"Mencoba terhubung ke server {self.server_ip}:{self.port}...")
                self.socket.connect((self.server_ip, self.port))
                print("Koneksi berhasil!")
                return True
            except socket.error as e:
                attempt += 1
                print(f"Gagal terhubung, mencoba lagi... ({attempt}/{retries})")
                time.sleep(3)  # Tunggu beberapa detik sebelum mencoba lagi

        print("Gagal terhubung ke server.")
        return False

    def send_message(self, message):
        """Mengirim pesan ke server"""
        self.socket.send(message.encode('utf-8'))

    def receive_message(self):
        """Menerima pesan dari server dan memberi tahu observer"""
        while True:
            message = self.socket.recv(1024).decode('utf-8')
            if message:
                print(f"Pesan diterima dari server: {message}")
                self.notify(message)  # Memberitahukan observer

    def run(self):
        """Menjalankan client"""
        if not self.connect():
            return

        # Thread untuk menerima pesan
        receive_thread = threading.Thread(target=self.receive_message)
        receive_thread.start()

        while True:
            message = input("Kirim pesan (ketik 'exit' untuk keluar): ")
            if message.lower() == 'exit':
                self.send_message(message)
                break
            processed_message = self.notify(message)  # Memproses pesan dengan Thinker
            self.send_message(processed_message)

        self.socket.close()
