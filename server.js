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

// Filtreleme ve Listeleme (GET /books)
app.get('/books', async (req, res) => {
    const { genre, minRating, sortBy, order } = req.query;
    let query = {};
    if (genre) query.kategori = genre;
    if (minRating) query.puan = { $gte: Number(minRating) };

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