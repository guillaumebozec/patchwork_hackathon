import React from 'react';

function QuestionList({ questions }) {
  return (
    <div>
      <h3>Questions</h3>
      <ul>
        {questions.map(q => (
          <li key={q.id}>
            <strong>[{q.type}]</strong> {q.question}<br/>
            Réponse: {q.correctAnswer} <br/>
            Options: {q.options && q.options.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;