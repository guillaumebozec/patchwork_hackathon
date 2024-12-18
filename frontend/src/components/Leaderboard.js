import React from 'react';

function Leaderboard({ leaderboard }) {
  return (
    <div>
      <h3>Leaderboard</h3>
      <ul>
        {leaderboard.map((team, i) => (
          <li key={i}>{team.name} - {team.score} points</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;