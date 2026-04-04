const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. VERİTABANI BAĞLANTISI (Not ettiğin linki buraya yapıştıracaksın)
mongoose.connect('mongodb+srv://MyLibrary:0Mopesy0@cluster0.ufttfij.mongodb.net/?appName=Cluster0')
    .then(() => console.log("Veritabanına bağlanıldı!"))
    .catch(err => console.log("Bağlantı hatası:", err));

// 2. MODELLER (Şemalar)
const UserSchema = new mongoose.Schema({
    ad: String, eposta: { type: String, unique: true }, sifre: String
});
const User = mongoose.model('User', UserSchema);

const BookSchema = new mongoose.Schema({
    kitapAdi: String, yazar: String, kategori: String, 
    puan: { type: Number, default: 0 }, 
    okumaDurumu: { type: String, enum: ['Okundu', 'Okunuyor', 'Okunacak'], default: 'Okunacak' },
    yorumlar: [{ kullanıcı: String, metin: String }]
});
const Book = mongoose.model('Book', BookSchema);

// 3. API METOTLARI (Gereksinimler)

// Üye Ol (POST /auth/register)
app.post('/auth/register', async (req, res) => {
    try {
        const yeniUser = new User(req.body);
        await yeniUser.save();
        res.status(201).json({ mesaj: "Kayıt başarılı!" });
    } catch (err) { res.status(400).json({ hata: "E-posta zaten kayıtlı." }); }
});

// Kitap Ekle (POST /books)
app.post('/books', async (req, res) => {
    const yeniKitap = new Book(req.body);
    await yeniKitap.save();
    res.json(yeniKitap);
});

// --- YENİ EKLENEN 7 GEREKSİNİM ---

// 1. Giriş Yap (POST /auth/login)
app.post('/auth/login', async (req, res) => {
    const { eposta, sifre } = req.body;
    const user = await User.findOne({ eposta, sifre });
    if (user) {
        res.json({ mesaj: "Giriş başarılı!", kullanici: user.ad });
    } else {
        res.status(400).json({ hata: "E-posta veya şifre hatalı." });
    }
});

// 2. Şifremi Unuttum (POST /auth/forgot-password)
app.post('/auth/forgot-password', async (req, res) => {
    const { eposta, yeniSifre } = req.body;
    const user = await User.findOneAndUpdate({ eposta }, { sifre: yeniSifre }, { new: true });
    if (user) {
        res.json({ mesaj: "Şifreniz başarıyla güncellendi." });
    } else {
        res.status(404).json({ hata: "Kullanıcı bulunamadı." });
    }
});

// 3. Çıkış Yap (POST /auth/logout)
app.post('/auth/logout', (req, res) => {
    // Çıkış işlemi genelde arayüzden (frontend) silinerek yapılır, API sadece onay döner.
    res.json({ mesaj: "Çıkış başarılı. Oturum sonlandırıldı." });
});

// 4. Puan Ver (POST /books/:bookId/ratings)
app.post('/books/:bookId/ratings', async (req, res) => {
    const { puan } = req.body;
    const kitap = await Book.findByIdAndUpdate(req.params.bookId, { puan: puan }, { new: true });
    res.json({ mesaj: "Puan başarıyla eklendi", kitap });
});

// 5. Kitaba Yorum Ekle (POST /books/:bookId/comments)
app.post('/books/:bookId/comments', async (req, res) => {
    const { kullanici, metin } = req.body;
    const kitap = await Book.findById(req.params.bookId);
    kitap.yorumlar.push({ kullanici, metin });
    await kitap.save();
    res.json({ mesaj: "Yorum başarıyla eklendi", kitap });
});

// 6. Okuma Durumu Güncelle (PUT /books/:bookId/reading-status)
app.put('/books/:bookId/reading-status', async (req, res) => {
    const { durum } = req.body; 
    const kitap = await Book.findByIdAndUpdate(req.params.bookId, { okumaDurumu: durum }, { new: true });
    res.json({ mesaj: "Okuma durumu güncellendi", kitap });
});

// 7. Kitap Bilgilerini Düzenle (PUT /books/:bookId)
app.put('/books/:bookId', async (req, res) => {
    const kitap = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    res.json({ mesaj: "Kitap bilgileri başarıyla güncellendi", kitap });
});

// --- GÜNCELLENMİŞ FİLTRELEME VE LİSTELEME KODU ---
// Eski app.get('/books') kodunu silip bunu yapıştırabilirsin.
app.get('/books', async (req, res) => {
    const { genre, minRating, readingStatus, sortBy, order } = req.query;
    let query = {};
    if (genre) query.kategori = genre;
    if (minRating) query.puan = { $gte: Number(minRating) };
    if (readingStatus) query.okumaDurumu = readingStatus;

    let books = await Book.find(query).sort({ [sortBy || 'kitapAdi']: order === 'desc' ? -1 : 1 });
    res.json(books);
});

// Kitap Sil (DELETE /books/:id)
app.delete('/books/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ mesaj: "Kitap silindi." });
});

// Sunucuyu Başlat
app.listen(3000, () => console.log("Sunucu 3000 portunda hazır!"));