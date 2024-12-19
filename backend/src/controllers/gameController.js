// const gameModel = require('../models/gameModel');
// const teamModel = require('../models/teamModel');

// module.exports = {
//   createGame(req, res) {
//     const teams = teamModel.getTeams();
//     if(teams.length < 2) return res.status(400).json({error: 'Au moins 2 équipes nécessaires'});
//     const game = gameModel.createGame(teams);
//     res.json(game);
//   },

//   getGame(req, res) {
//     const { id } = req.params;
//     const game = gameModel.getGameById(parseInt(id));
//     if(!game) return res.status(404).json({error: 'Partie introuvable'});
//     res.json(game);
//   },

//   nextRound(req, res) {
//     const { id } = req.params;
//     let game = gameModel.getGameById(parseInt(id));
//     if(!game) return res.status(404).json({error: 'Partie introuvable'});
//     // Logique de passage au round suivant
//     game.currentRound += 1;
//     game = gameModel.updateGame(game.id, { currentRound: game.currentRound });
//     res.json(game);
//   }
// };

// const gameModel = require('../models/gameModel');
// const teamModel = require('../models/teamModel');

// module.exports = {
//   createGame(req, res) {
//     const teams = teamModel.getTeams();
//     if(teams.length < 2) return res.status(400).json({error: 'Au moins 2 équipes nécessaires'});
//     const game = gameModel.createGame(teams);
//     res.json(game);
//   },

//   getGame(req, res) {
//     const { id } = req.params;
//     const game = gameModel.getGameById(parseInt(id));
//     if(!game) return res.status(404).json({error: 'Partie introuvable'});
//     res.json(game);
//   }
// };


const gameModel = require('../models/gameModel');

module.exports = {
  createGame(req, res) {
    const game = gameModel.createGame();
    res.json(game);
  },
  
  getGame(req, res) {
    const { id } = req.params;
    const game = gameModel.getGameById(parseInt(id));
    if(!game) return res.status(404).json({error: 'Partie introuvable'});
    res.json(game);
  },
  
  addTeamToGame(req, res) {
    const { id } = req.params;
    const { name, color, warCry, icon } = req.body;
    if(!name) return res.status(400).json({error: 'Le nom de l\'équipe est requis'});

    const game = gameModel.addTeamToGame(parseInt(id), name, color, warCry, icon);
    if(!game) return res.status(404).json({error: 'Partie introuvable'});
    
    res.json(game);
  },
  
  startGame(req, res) {
    const { id } = req.params;
    const game = gameModel.startGame(parseInt(id));
    if(!game) return res.status(400).json({error: 'Impossible de démarrer la partie'});
    res.json(game);
  }
};