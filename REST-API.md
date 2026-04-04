# REST API Metotları

**API Test Videosu:** https://youtu.be/KMk4VLjfXHE

**REST API Domain Adresi:** https://my-library-dijital-kutuphane.vercel.app

---

### 1. Üye Ol
* **Metot:** POST
* **Yol:** `/auth/register`
* **Request Body:**
  ```json
  {
    "ad": "Test Kullanici",
    "eposta": "test@kutuphane.com",
    "sifre": "123456"
  }

### 2. Giriş Yap
* **Metot:** POST
* **Yol:** `/auth/login`
* **Request Body:**
  ```json
  {
  "eposta": "test@kutuphane.com",
  "sifre": "123456"
  }
  
### 3. Şifremi Unuttum
* **Metot:** POST
* **Yol:** `/auth/forgot-password`
* **Request Body:**
  ```json
  {
  "eposta": "test@kutuphane.com",
  "yeniSifre": "yeni12345"
  }

### 4. Çıkış Yap
* **Metot:** POST
* **Yol:** `/auth/logout`
* **Request Body:**
 

### 5. Kitap Ekle
* **Metot:** POST
* **Yol:** `/books`
* **Request Body:**
  ```json
  {
  "kitapAdi": "Kralkatili Güncesi",
  "yazar": "Patrick Rothfuss",
  "kategori": "Fantastik"
  }

### 6. Puan Ver
* **Metot:** POST
* **Yol:** `/books/{bookId}/ratings`
* **Request Body:**
  ```json
  {
  "puan": 5
  }

### 7. Kitaba Yorum Ekle
* **Metot:** POST
* **Yol:** `/books/{bookId}/comments`
* **Request Body:**
  ```json
  {
  "kullanici": "Test Kullanici",
  "metin": "Evreni çok güzel kurgulanmış, harika bir kitap!"
  }

### 8. Okuma Durumu Güncelle
* **Metot:** PUT
* **Yol:** `/books/{bookId}/reading-status`
* **Request Body:**
  ```json
  {
  "durum": "Okunuyor"
  }

### 9. Kitap Bilgilerini Düzenle
* **Metot:** PUT
* **Yol:** `/books/{bookId}`
* **Request Body:**
  ```json
  {
  "kategori": "Epik Fantastik",
  "puan": 10
  }

### 10. Kitabı Sil
* **Metot:** DELETE
* **Yol:** `/books/{bookId}`
* **Request Body:**

### 11. Filtreleme
* **Metot:** GET
* **Yol:** `/books?genre={genre}&minRating={value}&readingStatus={status}`
* **Request Body:**

### 12. Kitapları Sıralama
* **Metot:** GET
* **Yol:** `/books?sortBy={field}&order={asc|desc}`
* **Request Body:**
