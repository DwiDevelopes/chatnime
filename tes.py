from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from time import sleep

# Inisialisasi WebDriver dengan WebDriverManager
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

# Buka WhatsApp Web
driver.get("https://web.whatsapp.com/+628123456789")
sleep(15)  # Waktu untuk memindai QR code

def kirim_pesan(nomor_tujuan, pesan):
    # Temukan kotak pencarian kontak dan masukkan nomor tujuan
    search_box = driver.find_element(By.XPATH, '//div[@contenteditable="true"][@data-tab="3"]')
    search_box.click()
    search_box.send_keys(nomor_tujuan)
    sleep(2)

    # Klik pada kontak yang ditemukan
    kontak = driver.find_element(By.XPATH, f'//span[@title="{nomor_tujuan}"]')
    kontak.click()

    # Masukkan pesan dan kirim
    message_box = driver.find_element(By.XPATH, '//div[@contenteditable="true"][@data-tab="1"]')
    message_box.send_keys(pesan)
    message_box.send_keys(Keys.RETURN)

# Loop untuk mengirim pesan
nomor_tujuan = '088975682804'  # Ganti dengan nomor yang dituju
pesan = 'Halo, ini adalah pesan otomatis.'

for i in range(10):  # Jumlah pengulangan
    kirim_pesan(nomor_tujuan, pesan)
    sleep(3)  # Waktu jeda antar pesan
