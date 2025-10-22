"use client"; 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizQuestion from '../../components/QuizQuestion'; 

// Array-ul de întrebări rămâne în exterior.
const questions = [
  {
    question: 'Care este cel mai lung fluviu din lume?',
    options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
    correct: ['Nile'],
},
{
    question: 'În ce an a avut loc Revoluția Franceză?',
    options: ['1789', '1812', '1492', '1914'],
    correct: ['1789'],
},
{
    question: 'Care este capitala Japoniei?',
    options: ['Tokyo', 'Kyoto', 'Osaka', 'Nagoya'],
    correct: ['Tokyo'],
},
{
    question: 'Cine a pictat „Mona Lisa”?',
    options: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello'],
    correct: ['Leonardo da Vinci'],
},
{
    question: 'Câte state are SUA?',
    options: [ '52', '48', '51', '50'],
    correct: ['50'],
},

];

// FIX: Am redefinit și exportat funcția ca o Componentă React
export default function GeneralKnowledgeQuizPage() {
  
  // TOATE HOOK-URILE SUNT ACUM FOLOSITE CORECT ÎN INTERIOR
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
      if (JSON.stringify(selected.sort()) === JSON.stringify(correct.sort())) {
        points += 10;
      }
    });

    const newScore = score + points;
    setScore(newScore);
    localStorage.setItem('score', newScore);

    // home link
    router.push('/');
  };

  return (
    <div>
      <h1>Quiz de Cultură Generală</h1>
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