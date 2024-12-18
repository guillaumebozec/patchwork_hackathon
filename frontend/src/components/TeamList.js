import React from 'react';

function TeamList({ teams }) {
  return (
    <div>
      <h3>Liste des équipes</h3>
      <ul>
        {teams.map(team => (
          <li key={team.id}>{team.name} - Score: {team.score}</li>
        ))}
      </ul>
    </div>
  );
}

export default TeamList;