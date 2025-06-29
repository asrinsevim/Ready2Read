// frontend/src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Oluşturduğumuz CSS dosyasını import ediyoruz

function HomePage() {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/texts'); // https://ready2read-api.onrender.com
        setTexts(response.data);
        setError(null);
      } catch (err) {
        setError('An error occurred while loading texts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTexts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  // JSX kısmını className'ler ile güncelliyoruz
  return (
    <div className="homepage-container">
      <h1>Articles</h1>
      <div className="text-list">
        {texts.map(text => (
          // Link bileşenine "text-card" class'ını ekliyoruz
          <Link to={`/pratik/${text._id}`} key={text._id} className="text-card">
            <h3>{text.title}</h3>
            <p>Difficulty: {text.difficulty}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Stil objesini silebiliriz çünkü artık CSS dosyasından geliyor
// const linkStyle = { ... };

export default HomePage;