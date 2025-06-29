// frontend/src/pages/KelimePratikSayfasi.jsx

// 1. Gerekli hook'ları ve kütüphaneleri import et
import './KelimePratikSayfasi.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // URL'den parametre almak için
import axios from 'axios'; // API isteği yapmak için

import Flashcard from '../components/Flashcard'; // Flashcard bileşenimiz

function KelimePratikSayfasi() {
  // 2. URL'den metnin ID'sini al
  // (App.jsx'te rotayı <Route path="/pratik/:id" ... /> olarak ayarlaman gerekir)
  const { id } = useParams();

  // 3. State'leri tanımla
  const [textData, setTextData] = useState(null); // Gelen veriyi saklamak için
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);   // Yüklenme durumunu yönetmek için
  const [error, setError] = useState(null);       // Hata durumunu yönetmek için

  // 4. Veriyi API'den çekmek için useEffect kullan
  useEffect(() => {
    // Veri çekme işlemini yapacak async fonksiyon
    const fetchText = async () => {
      try {
        setLoading(true); // İstek başlarken yükleniyor durumunu aç

        // Backend'deki API endpoint'ine istek at
        const response = await axios.get(`https://ready2read-api.onrender.com/api/texts/${id}`); // http://localhost:5001
        
        // Gelen veriyi state'e kaydet
        setTextData(response.data);
        setError(null); // Başarılı olursa eski hatayı temizle
      } catch (err) {
        // Hata olursa hata state'ini güncelle
        setError('An error occurred while loading texts.');
        console.error(err);
      } finally {
        // İstek bitince (başarılı ya da hatalı) yükleniyor durumunu kapat
        setLoading(false);
      }
    };

    fetchText();
  }, [id]); // Bu hook, sadece 'id' değiştiğinde tekrar çalışır

  // Buton fonksiyonları (bunlar aynı kalır)
  const showNextCard = () => {
    if (currentIndex < textData.vocab.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const showPrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 5. Yüklenme ve Hata durumları için arayüz göster
  if (loading) {
    return <div style={{ textAlign: 'center', fontSize: '2em' }}>Loading...</div>;
  }
  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', fontSize: '2em' }}>{error}</div>;
  }
  if (!textData) {
    return <div>Data not found.</div>
  }

  // 6. Veri başarıyla yüklendikten sonra gösterilecek ana arayüz
   return (
    <div className="vocab-page-container">
      <Link to="/" className="back-to-home-button">
        &larr; Back to Homepage
      </Link>
      
      <div className="vocab-content">
        
        {/* --- KONTROL EDİLECEK 1: BAŞLIK --- */}
        {/* Bu H1 etiketinin burada olduğundan emin ol */}
        <h1>
          {textData.title}
          <span>Vocabulary Practice</span>
        </h1>
        
        <Flashcard
          word={textData.vocab[currentIndex].word}
          definition={textData.vocab[currentIndex].definition}
        />

        {/* --- KONTROL EDİLECEK 2: NAVİGASYON BUTONLARI --- */}
        {/* Bu div ve içindeki butonların burada olduğundan emin ol */}
        <div className="navigation">
          <button onClick={showPrevCard} disabled={currentIndex === 0}>
            Previous
          </button>
          <span>{currentIndex + 1} / {textData.vocab.length}</span>
          <button onClick={showNextCard} disabled={currentIndex === textData.vocab.length - 1}>
            Next
          </button>
        </div>
      </div>
      <Link to={`/article/${id}`} className="to-article-button">
      Ready2Read &rarr;
      </Link>
    </div>
  );
}

export default KelimePratikSayfasi;
