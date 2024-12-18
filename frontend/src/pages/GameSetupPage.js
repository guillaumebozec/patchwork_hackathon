import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGame, addTeam, startGame } from '../api/api';

function GameSetupPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [ClientTeamId, setClientTeamId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      loadGame();
    }, 3000);

    return () => clearInterval(interval);
  }, [gameId]);

  useEffect(() => {
    // Vérifie si le jeu est en cours et redirige si nécessaire
    if (game && game.status === 'ongoing') {
      if (ClientTeamId !== null) {
        navigate(`/game/${game.id}?team=${ClientTeamId}`);
      }
    }
  }, [game, ClientTeamId, navigate]);

  async function loadGame() {
    try {
      const g = await getGame(gameId);
      console.log('Données de la partie :', g);
      setGame(g);
    } catch (error) {
      console.error('Erreur lors du chargement de la partie :', error);
    }
  }

  async function handleAddTeam() {
    const client = await addTeam(gameId, teamName);

    const clientTeamIndex = client.teams.findIndex(t => t.name === teamName);
    setClientTeamId(clientTeamIndex);

    setTeamName('');
    loadGame();
  }

  async function handleStartGame() {
    const g = await startGame(gameId);
    setGame(g);
  }

  if (!game) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Partie #{game.id}</h2>
      <p>Status : {game.status}</p>
      <h3>Équipes :</h3>
      <ul>
        {game.teams && game.teams.map(t => (
          <li key={t.id}>{t.name} - {t.score} points</li>
        ))}
      </ul>
      {(!game.teams || game.teams.length < 2) && (
        <div>
          <input
            type="text"
            placeholder="Nom de l'équipe"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
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