import React from 'react';

function GameControl({ onStartGame, game, onNextRound }) {

  return (
    <div>
      <h3>Contrôle du jeu</h3>
      {!game && (
        <button onClick={onStartGame}>Démarrer une partie</button>
      )}
      {game && (
        <div>
          <p>Partie ID: {game.id}</p>
          <p>Round actuel: {game.currentRound}</p>
          <button onClick={() => onNextRound(game.id)}>Round suivant</button>
        </div>
      )}
    </div>
  );
}

export default GameControl;