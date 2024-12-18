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
  }
};