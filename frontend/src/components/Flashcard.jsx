import React, { useState } from 'react';
import './Flashcard.css'; // Stil dosyası için (aşağıda)

function Flashcard({ word, definition }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Karta tıklandığında dönme efekti için state'i değiştiriyoruz.
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          <h2>{word}</h2>
        </div>
        <div className="flashcard-back">
          <p>{definition}</p>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;