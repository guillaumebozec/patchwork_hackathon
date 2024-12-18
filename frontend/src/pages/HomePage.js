import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../api/api';

function HomePage() {
  const navigate = useNavigate();
  const [existingGameId, setExistingGameId] = useState('');

  const handleCreateGame = async () => {
    try {
      const game = await createGame();
      if (game.error) {
        console.error(game.error);
      } else {
        navigate(`/setup/${game.id}`);
      }
    } catch (err) {
      console.error('Erreur lors de la création de la partie:', err);
    }
  }

  const handleJoinGame = () => {
    if (existingGameId) {
      navigate(`/setup/${existingGameId}`);
    }
  }

  return (
    <div>
      <h1>TeamTrivia Battle</h1>
      <button onClick={handleCreateGame}>Créer une partie</button>
      <div>
        <input type="text" placeholder="ID de la partie" value={existingGameId} onChange={e=>setExistingGameId(e.target.value)}/>
        <button onClick={handleJoinGame}>Rejoindre une partie</button>
      </div>
    </div>
  );
}

export default HomePage;