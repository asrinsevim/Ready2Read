const mongoose = require('mongoose');

// Önce kelimeler için bir alt şema tanımlıyoruz.
const VocabSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  definition: {
    type: String,
    required: true
  }
});

// Ana metin şeması
const TextSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] // Sadece bu değerleri kabul et
  },
  content: {
    type: String,
    required: true
  },
  // vocab alanı, VocabSchema'dan oluşan bir dizi olacak.
  vocab: [VocabSchema]
});

// Şemayı bir model olarak dışa aktarıyoruz.
module.exports = mongoose.model('Text', TextSchema);