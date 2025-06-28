const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Modeli içe aktar
const Text = require('./models/Text');

const app = express();
const PORT = 5001; // Backend'in çalışacağı port

// Gerekli middleware'ler
app.use(cors()); // Frontend'den gelen isteklere izin ver
app.use(express.json()); // Gelen JSON verilerini işle

// MongoDB'ye bağlan
// .env dosyasından bağlantı adresini almak en iyi pratiktir.
// Şimdilik doğrudan yazabiliriz. 'YOUR_CONNECTION_STRING' kısmını kendi adresinizle değiştirin.
const MONGO_URI = "mongodb+srv://asrinsevim:654321Wq@cluster0.tj1ixdb.mongodb.net/Ready2ReadDB?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB veritabanına başarıyla bağlanıldı.'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));


// --- API Rotaları (Endpoints) ---

// 1. Tüm metinlerin listesini getiren rota (sadece başlık ve zorluk)
app.get('/api/texts', async (req, res) => {
  try {
    const texts = await Text.find({}, 'title difficulty'); // Sadece title ve difficulty alanlarını al
    res.status(200).json(texts);
  } catch (error) {
    res.status(500).json({ message: 'Metinler getirilirken bir hata oluştu.' });
  }
});

// 2. ID'ye göre tek bir metnin tüm detaylarını getiren rota
app.get('/api/texts/:id', async (req, res) => {
  try {
    const text = await Text.findById(req.params.id);
    if (!text) {
      return res.status(404).json({ message: 'Metin bulunamadı.' });
    }
    res.status(200).json(text);
  } catch (error) {
    res.status(500).json({ message: 'Metin getirilirken bir hata oluştu.' });
  }
});


// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Backend sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});