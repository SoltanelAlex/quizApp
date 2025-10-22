"use client"; 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizQuestion from '../../components/QuizQuestion'; 

// Array-ul de date (întrebările) rămâne în afara componentei, deoarece nu folosește hook-uri.
const questions = [
  {
    question: 'În ce an a avut loc Unirea Principatelor Române?',
    options: ['1859', '1918', '1821', '1877'],
    correct: ['1859'],
  },
  {
    question: 'Cine a fost primul domnitor al Țării Românești?',
    options: ['Mihai Viteazul', 'Mircea cel Bătrân','Basarab I', 'Vlad Țepeș'],
    correct: ['Basarab I'],
  },
  {
    question: 'În ce bătălie a învins Mihai Viteazul armata otomană?',
    options: ['Bătălia de la Rovine','Bătălia de la Călugăreni', 'Bătălia de la Posada', 'Bătălia de la Șelimbăr'],
    correct: ['Bătălia de la Călugăreni'],
  },
  {
    question: 'Ce rol a avut Alexandru Ioan Cuza în istoria României?',
    options: ['A fost primul domnitor al Principatelor Unite', 'A cucerit Transilvania', 'A fost rege al României', 'A inițiat reforma agrară'],
    correct: ['A fost primul domnitor al Principatelor Unite'],
  },
  {
    question: 'În ce an s-a semnat Tratatul de la Trianon?',
    options: ['1920', '1918', '1940', '1938'],
    correct: ['1920'],
  },
];

// Aceasta este funcția Componentă React pe care Next.js o așteaptă.
export default function HistoryQuizPage() {
  
  // TOATE HOOK-URILE TREBUIE SĂ FIE ÎN INTERIORUL ACESTEI FUNCȚII
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  const handleOptionChange = (questionIndex, option) => {
    const updatedAnswers = [...selectedAnswers];
    if (!updatedAnswers[questionIndex]) {
      updatedAnswers[questionIndex] = [];
    }
    if (updatedAnswers[questionIndex].includes(option)) {
      updatedAnswers[questionIndex] = updatedAnswers[questionIndex].filter((opt) => opt !== option);
    } else {
      updatedAnswers[questionIndex].push(option);
    }
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let points = 0;

    questions.forEach((question, index) => {
      const selected = selectedAnswers[index] || [];
      const correct = question.correct;
      // Simplificarea verificării: pentru fiecare răspuns corect neselectat, pierzi puncte
      if (JSON.stringify(selected.sort()) === JSON.stringify(correct.sort())) {
        points += 10;
      }
    });

    const newScore = score + points;
    setScore(newScore);
    localStorage.setItem('score', newScore);

    // Redirecționare
    router.push('/');
  };

  return (
    <div>
      <h1>Quiz de Istorie</h1>
      {questions.map((question, index) => (
        <QuizQuestion
          key={index}
          question={question}
          selectedOptions={selectedAnswers[index] || []}
          onOptionChange={(option) => handleOptionChange(index, option)}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <h2>Scorul tău: {score}</h2>
    </div>
  );
};