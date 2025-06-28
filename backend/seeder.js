// backend/seeder.js

const mongoose = require('mongoose');
const Text = require('./models/Text'); // Text modelimizi import ediyoruz
const { sampleTexts } = require('../frontend/src/dummyData'); // Dummy datamızı import ediyoruz

// VERİTABANI BAĞLANTISI
// server.js'teki MONGO_URI'nizin aynısını buraya yapıştırın
const MONGO_URI = "mongodb+srv://asrinsevim:654321Wq@cluster0.tj1ixdb.mongodb.net/Ready2ReadDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('Seeder için MongoDB bağlantısı başarılı.'))
    .catch(err => console.error('Seeder MongoDB bağlantı hatası:', err));

// VERİYİ İÇERİ AKTARAN FONKSİYON
const importData = async () => {
    try {
        // Önce mevcut tüm verileri silerek tekrarı önle
        await Text.deleteMany();

        // dummyData.js'ten gelen veriyi veritabanına ekle
        await Text.insertMany(sampleTexts);

        console.log('Veri başarıyla içeri aktarıldı! ✅');
        process.exit();
    } catch (error) {
        console.error('Veri aktarma hatası:', error);
        process.exit(1); // Hata ile çık
    }
};

// VERİYİ SİLEN FONKSİYON
const deleteData = async () => {
    try {
        // Tüm verileri sil
        await Text.deleteMany();

        console.log('Veri başarıyla silindi! 🗑️');
        process.exit();
    } catch (error) {
        console.error('Veri silme hatası:', error);
        process.exit(1); // Hata ile çık
    }
};

// KOMUT SATIRI ARGÜMANLARINI KONTROL ET
// 'node seeder.js -i' komutu çalıştırılırsa veriyi import et
if (process.argv[2] === '-i') {
    importData();
}
// 'node seeder.js -d' komutu çalıştırılırsa veriyi sil
else if (process.argv[2] === '-d') {
    deleteData();
}