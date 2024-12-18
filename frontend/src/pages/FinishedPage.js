import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLeaderboard } from '../api/api';

function FinishedPage() {
  const { id } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    loadLeaderboard();
    var audio = new Audio('../../sounds/ta-da_yrvBrlS.mp3');
    audio.play();
  }, [id]);

  async function loadLeaderboard() {
    const res = await getLeaderboard(id);
    setLeaderboard(res.leaderboard);
  }

  return (
    <div>
      <h2>Partie terminée</h2>
      <h3>Leaderboard final</h3>

      {leaderboard.length === 0 ? (
        <p>Chargement du leaderboard...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Équipe</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, index) => (
              <tr key={team.id}>
                <td>{index + 1}</td>
                <td>{team.name}</td>
                <td>{team.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FinishedPage;