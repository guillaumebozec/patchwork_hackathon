import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGame, addTeam, startGame } from '../api/api';

function GameSetupPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  
  const [game, setGame] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [refreshInterval, setRefreshInterval] = useState(null);

  useEffect(() => {
    loadGame();
    const interval = setInterval(loadGame, 3000);
    setRefreshInterval(interval);
    return () => clearInterval(interval);
  }, [gameId]);

  async function loadGame() {
    const g = await getGame(gameId);
    setGame(g);
    if (g.status === 'ongoing') {
      clearInterval(refreshInterval);
    //   navigate(`/game/${g.id}?team=0`);
    }
  }

  async function handleAddTeam() {
    await addTeam(gameId, teamName);
    setTeamName('');
    loadGame();
  }

  async function handleStartGame() {
    const g = await startGame(gameId);
    setGame(g);
    // Une fois démarré, on part sur la page du jeu
    clearInterval(refreshInterval);
    navigate(`/game/${g.id}?team=0`);
  }

  if (!game) return <div>Chargement...</div>;
// if (!game.teams) return <div>En attente de données de la partie...</div>;

  return (
    <div>
      <h2>Partie #{game.id}</h2>
      <p>Status : {game.status}</p>
      <h3>Équipes:</h3>
      <ul>
        {game.teams && game.teams.map(t => <li key={t.id}>{t.name} - {t.score} points</li>)}
      </ul>
      {(!game.teams || game.teams.length < 2  ) && (
        <div>
          <input type="text" placeholder="Nom de l'équipe" value={teamName} onChange={e=>setTeamName(e.target.value)}/>
          <button onClick={handleAddTeam}>Ajouter l'équipe</button>
        </div>
      )}
      {game.status === 'ready' && game.teams.length === 2 && (
        <button onClick={handleStartGame}>Démarrer la partie</button>
      )}
      {game.status === 'waiting' && <p>En attente d'au moins 2 équipes...</p>}
    </div>
  );
}

export default GameSetupPage;