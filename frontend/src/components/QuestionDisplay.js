// import React from 'react';

// function QuestionDisplay({ question, isAnsweringTeam, selectedAnswer, onSelectAnswer }) {
//   if(!question) return null;

//   return (
//     <div>
//       <h3>{question.question}</h3>
//       <ul>
//         {question.options.map((opt, i) => (
//           <li 
//             key={i}
//             style={{ border: (selectedAnswer === opt) ? '2px solid blue' : '1px solid #ccc', cursor: isAnsweringTeam ? 'pointer' : 'default' }}
//             onClick={() => isAnsweringTeam && onSelectAnswer(opt)}
//           >
//             {opt}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default QuestionDisplay;

import React from 'react';

function QuestionDisplay({ question, isAnsweringTeam, selectedAnswer, onSelectAnswer }) {
  if (!question) return null;

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '20px', textAlign: 'center' }}>{question.question}</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {question.options.map((opt, i) => (
          <li
            key={i}
            style={{
              background: selectedAnswer === opt ? '#ff9fd3' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '10px',
              textAlign: 'center',
              color: selectedAnswer === opt ? '#fff' : '#333',
              cursor: isAnsweringTeam ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              boxShadow: selectedAnswer === opt ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
            }}
            onClick={() => isAnsweringTeam && onSelectAnswer(opt)}
            onMouseOver={(e) => {
              if (isAnsweringTeam) e.target.style.backgroundColor = '#ffcadc';
            }}
            onMouseOut={(e) => {
              if (isAnsweringTeam && selectedAnswer !== opt) e.target.style.backgroundColor = '#fff';
            }}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionDisplay;