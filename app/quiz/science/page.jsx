"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import QuizQuestion from '../../components/QuizQuestion'; 

const questions = [
  {
    question: 'Ce este fotosinteza?',
    options: ['Procesul prin care plantele produc oxigen', 'Procesul de digestie', 'Formarea norilor', 'Topirea ghețarilor'],
    correct: ['Procesul prin care plantele produc oxigen'],
},
{
    question: 'Ce planetă este cunoscută ca „Planeta Roșie”?',
    options: [ 'Venus','Marte', 'Jupiter', 'Mercur'],
    correct: ['Marte'],
},
{
    question: 'Care este cel mai abundent gaz din atmosfera Pământului?',
    options: [ 'Oxigen','Azot', 'Dioxid de carbon', 'Heliu'],
    correct: ['Azot'],
},
{
    question: 'Ce este gravitația?',
    options: [ 'Forța care ține avioanele în aer', 'Efectul de rotație al Pământului', 'Magnetismul între polii Pământului','Forța care atrage obiectele către centrul Pământului'],
    correct: ['Forța care atrage obiectele către centrul Pământului'],
},
{
    question: 'Ce element chimic are simbolul „H”?',
    options: ['Hidrogen', 'Heliu', 'Mercur', 'Oxigen'],
    correct: ['Hidrogen'],
},

];

const scienceQuiz = () => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const router = useRouter(); // Folosim router din `next/navigation`

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

    // Redirecționăm către pagina principală
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

export default scienceQuiz;
