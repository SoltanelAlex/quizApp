"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '../app/styles.css'
const HomePage = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);
  const resetScore = () => {
    localStorage.setItem('score', 0);
    setScore(0);
  };

  return (
    <div className='divHome'>
      <h1 className='h1Home'>Quiz App</h1>
      <h2>Scorul tău: {score} puncte</h2>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link href="/quiz/science">Quiz Știință</Link>
        <Link href="/quiz/general-knowledge">Quiz Cultură Generală</Link>
        <Link href="/quiz/history">Quiz Istorie</Link>
      </nav>
      <button onClick={resetScore} className='resetButton'>Resetează Scorul</button> 

    </div>
  );
};

export default HomePage;
 