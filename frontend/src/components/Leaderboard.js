// import React from 'react';

// function Leaderboard({ leaderboard }) {
//   return (
//     <div>
//       <h3>Leaderboard</h3>
//       <ul>
//         {leaderboard.map((team, i) => (
//           <li key={i}>{team.name} - {team.score} points</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Leaderboard;

import React from 'react';

function Leaderboard({ leaderboard }) {
  return (
    <div
      style={{
        background: '#f9f9f9',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <h3
        style={{
          fontSize: '1.8rem',
          color: '#333',
          marginBottom: '20px',
        }}
      >
        Leaderboard
      </h3>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {leaderboard.map((team, i) => (
          <li
            key={i}
            style={{
              background: i % 2 === 0 ? '#fff' : '#f1f1f1',
              padding: '15px 20px',
              marginBottom: '10px',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <span style={{ fontWeight: 'bold', color: '#555' }}>{i + 1}. {team.name}</span>
            <span style={{ fontWeight: 'bold', color: '#ff9fd3' }}>{team.score} points</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;