let games = [];
let teamIdCounter = 1;

module.exports = {
  createGame: (teams = []) => {
    const newGame = {
      id: games.length + 1,
      teams: teams,
      currentTeamIndex: 0,
      questionsAsked: 0,
      status: 'arrived'
    };
    games.push(newGame);
    return newGame;
  },

  getGameById: (id) => games.find(g => g.id === id),

  updateGame: (id, data) => {
    let game = games.find(g => g.id === id);
    if (game) {
      Object.assign(game, data);
    }
    return game;
  },
  startGame: (gameId) => {
    const game = games.find(g => g.id === gameId);
    if(!game) return null;
    if(game.teams.length < 2) return null;
    game.status = 'ongoing';
    game.currentTeamIndex = 0;
    return game;
  },
  resetGames: () => { games = []; },

  addTeamToGame: (gameId, teamName) => {
    const game = games.find(g => g.id === gameId);
    if (!game) return null;

    if (!game.teams) {
      game.teams = [];
    }
    if (game.teams.length >= 2) {
      return game;
    }

    const newTeam = {
      id: teamIdCounter++,
      name: teamName,
      score: 0
    };
    game.teams.push(newTeam);

    if (game.teams.length === 2) {
      game.status = 'ready'; 
    } else {
      game.status = 'waiting';
    }

    return game;
  },
  updateScore: (gameId, teamId, points) => {
    console.log(gameId, teamId, points);
    console.log("games : " + JSON.stringify(games, null, 2));
  
    // Trouver le jeu
    // const game = games.find(g => g.id === gameId);
    const game = games.find(g => g.id === Number(gameId));
    if (!game) {
      console.error(`Jeu introuvable avec l'ID ${gameId}`);
      return null;
    }
  
    // Trouver l'équipe
    const team = game.teams.find(t => t.id === teamId);
    if (!team) {
      console.error(`Équipe introuvable avec l'ID ${teamId}`);
      return null;
    }
  
    console.log('Log : Ajout de', points, 'points à', team.name);
    team.score += points;
  
    // Mettre à jour le jeu
    module.exports.updateGame(gameId, game);
  
    console.log("GameModel mis à jour");
    return team;
  },

  getLeaderboard: (gameId) => {
    const game = games.find(g => g.id === gameId);
    if (!game) {
      console.error(`Jeu introuvable avec l'ID ${gameId}`);
      return null;
    }

    // Créer le leaderboard basé sur les scores des équipes
    const leaderboard = [...game.teams] // Copie pour éviter de modifier l'original
      .sort((a, b) => b.score - a.score) // Tri décroissant par score
      .map((team, index) => ({
        rank: index + 1, // Ajouter le rang
        id: team.id,
        name: team.name,
        score: team.score,
      }));

    return leaderboard;
  },
};