// frontend/src/pages/ArticlePage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ArticlePage.css';

function ArticlePage() {
  const { id } = useParams();
  const [textData, setTextData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bu useEffect kancasında hiçbir değişiklik yok. Veriyi eskisi gibi çekiyoruz.
  useEffect(() => {
    const fetchText = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://ready2read-api.onrender.com/api/texts/${id}`);  // https://ready2read-api.onrender.com
        setTextData(response.data);
        setError(null);
      } catch (err) {
        setError('An error occurred while loading the text.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchText();
  }, [id]);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!textData) return <div>Text not found.</div>;

  // --- DEĞİŞİKLİK BURADA BAŞLIYOR ---

  // 1. Gelen tek parça metni '\n' karakterinden bölerek bir paragraflar dizisi oluştur.
  const paragraphs = textData.content.split('\n');

  return (
    <div className="article-container">
      <Link to={`/pratik/${id}`} className="back-to-vocab-button">
        &larr; Back to Vocabulary Practice
      </Link>
      <h1 className="article-title">{textData.title}</h1>
      <p className="article-difficulty">Difficulty: {textData.difficulty}</p>
      
      <div className="article-content">
        {/* 2. Oluşturulan 'paragraphs' dizisini .map() fonksiyonu ile dön */}
        {paragraphs.map((paragraph, index) => (
          // Boş paragrafların (arka arkaya Enter'a basmaktan kaynaklanan)
          // HTML'de gereksiz boşluk oluşturmasını engellemek için kontrol
          paragraph.trim() && <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default ArticlePage;