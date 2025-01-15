import socket
import threading
import tkinter as tk
# server.py
from server import Server

if __name__ == '__main__':
    server = Server()
    server.start()

class Server(tk.Frame):
    def __init__(self, host='0.0.0.0', port=12345):
        self.server_ip = host
        self.port = port
        self.client_handlers = []

    def handle_client(self, client_socket):
        """Menerima pesan dari client dan mengirimkan balasan"""
        while True:
            try:
                message = client_socket.recv(1024).decode('utf-8')
                if message.lower() == 'exit':
                    break
                print(f"Pesan diterima dari client: {message}")
                # Proses pesan dengan Thinker sebelum mengirimkan balasan
                processed_message = self.update(message)
                client_socket.send(f"Server: {processed_message}".encode('utf-8'))
            except:
                break

        client_socket.close()

    def start(self):
        """Menjalankan server"""
        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server.bind((self.server_ip, self.port))
        server.listen(5)
        print("Server berjalan dan menunggu koneksi...")

        while True:
            client_socket, addr = server.accept()
            print(f"Koneksi diterima dari {addr}")
            client_handler = threading.Thread(target=self.handle_client, args=(client_socket,))
            client_handler.start()

    def update(self, message):
        """Mengupdate pesan dengan Thinker"""
        print(f"Server menerima pesan: {message}")
        # Modifikasi pesan jika perlu
        return message
