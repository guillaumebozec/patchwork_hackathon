import React from 'react';

function QuestionDisplay({ question, isAnsweringTeam, selectedAnswer, onSelectAnswer }) {
  if(!question) return null;

  return (
    <div>
      <h3>{question.question}</h3>
      <ul>
        {question.options.map((opt, i) => (
          <li 
            key={i}
            style={{ border: (selectedAnswer === opt) ? '2px solid blue' : '1px solid #ccc', cursor: isAnsweringTeam ? 'pointer' : 'default' }}
            onClick={() => isAnsweringTeam && onSelectAnswer(opt)}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionDisplay;