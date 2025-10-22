import React from 'react';

const QuizQuestion = ({ question, selectedOptions, onOptionChange }) => {
  return (
    <div className="quiz-question">
      <h2>{question.question}</h2>
      <ul className="quiz-options">
        {question.options.map((option, index) => (
          <li key={index}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => onOptionChange(option)}
            />
            <label>{option}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestion;
