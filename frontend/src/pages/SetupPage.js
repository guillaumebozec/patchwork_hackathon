import React, { useState } from 'react';
import { createGame } from '../api/api';
import { useNavigate } from 'react-router-dom';

function SetupPage() {
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  const handleCreateGame = async () => {
    const g = await createGame();
    setGame(g);
  }

  const handleGoToGame = () => {
    navigate(`/game/${game.id}`);
  }

  return (
    <div>
      <h2>Setup</h2>
      {!game && <button onClick={handleCreateGame}>Créer une partie</button>}
      {game && (
        <div>
          <p>Partie créée: ID {game.id}</p>
          <button onClick={handleGoToGame}>Aller au jeu</button>
        </div>
      )}
    </div>
  );
}

export default SetupPage;