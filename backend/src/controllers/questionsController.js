const questionModel = require('../models/questionModel');
const gameModel = require('../models/gameModel');
const teamModel = require('../models/teamModel');

const openaqService = require('../services/openaqService');
const rawgService = require('../services/rawgService');
const annService = require('../services/annService');

module.exports = {
  async selectQuestion(req, res) {
    try {
      const { gameId } = req.params;
      const { questionType } = req.body;

      const game = gameModel.getGameById(parseInt(gameId));
      if (!game) return res.status(404).json({ error: 'Partie introuvable' });
      const selectingTeam = game.teams[game.currentTeamIndex];
      game.currentQuestionType = questionType;
      const question = await generateQuestion(questionType);
      if (!question) {
        return res.status(500).json({ error: 'Impossible de générer la question' });
      }

      game.currentQuestion = question;
      game.currentQuestionStartTime = Date.now();
      game.currentQuestionDeadline = Date.now() + 180000;

      gameModel.updateGame(game.id, game);

      questionModel.addQuestion(question);

      res.json({
        message: 'Question sélectionnée et démarrée',
        question: question,
        deadline: game.currentQuestionDeadline
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la sélection de la question' });
    }
  },

  async submitAnswer(req, res) {
    try {
      const { gameId } = req.params;
      const { answer } = req.body;

      const game = gameModel.getGameById(parseInt(gameId));
      if (!game || !game.currentQuestion) return res.status(404).json({ error: 'Pas de question en cours' });

      if (Date.now() > game.currentQuestionDeadline) {
        return res.status(400).json({ error: 'Temps écoulé pour répondre' });
      }

      const answeringTeamIndex = (game.currentTeamIndex + 1) % game.teams.length;
      console.log('answeringTeamIndex', answeringTeamIndex);
      const answeringTeam = game.teams[answeringTeamIndex];

      let isCorrect = (answer === game.currentQuestion.correctAnswer);

      if (isCorrect) {
        gameModel.updateScore(gameId,answeringTeam.id, 10); // +10 points par bonne réponse
      } else {
      }
      delete game.currentQuestion;
      delete game.currentQuestionDeadline;
      delete game.currentQuestionType;
      delete game.currentQuestionStartTime;

      if (!game.questionsAsked) game.questionsAsked = 0;
      game.questionsAsked++;

      if (game.questionsAsked >= 10) {
        game.status = 'finished';
      } else {
        game.currentTeamIndex = answeringTeamIndex;
      }

      gameModel.updateGame(game.id, game);

      const leaderboard = getLeaderboard(game);

      res.json({
        result: isCorrect ? 'correct' : 'incorrect',
        leaderboard,
        gameStatus: game.status
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la soumission de la réponse' });
    }
  },

  getLeaderboard(req, res) {
    const { gameId } = req.params;
    const game = gameModel.getGameById(parseInt(gameId));
    if (!game) return res.status(404).json({ error: 'Partie introuvable' });

    const leaderboard = getLeaderboard(game);
    res.json({ leaderboard });
  },

  getAllQuestions(req, res) {
    const questions = questionModel.getQuestions();
    res.json(questions);
  }
};

async function generateQuestion(questionType) {
  switch (questionType) {
    case 'openaq':
      return await generateOpenAQQuestion();
    case 'rawg':
      return await generateRawgQuestion();
    case 'ann':
      return await generateAnnQuestion();
    default:
      return null;
  }
}

async function generateOpenAQQuestion() {
  const villeA = await openaqService.getAirQualityData();
  const villeB = await openaqService.getAirQualityData();

  const villeAName = villeA.city + " (" + villeA.country + ")";
  const villeBName = villeB.city + " (" + villeB.country + ")";
  const villeAValue = villeA.value;
  const villeBValue = villeB.value;

  let correctAnswer;
  if (villeAValue < villeBValue) {
    correctAnswer = villeAName;
  } else {
    correctAnswer = villeBName;
  }

  return {
    type: 'openaq',
    question: 'Quelle ville a la meilleure qualité de l’air actuellement ?',
    correctAnswer: correctAnswer,
    options: [villeAName, villeBName],
  };
}

async function generateRawgQuestion() {
  const games = await rawgService.getPopularGames();
  const game1 = games[0];
  const game2 = games[1];

  let correctAnswer;
  if (new Date(game1.date) < new Date(game2.date)) {
    correctAnswer = game1.name;
  } else {
    correctAnswer = game2.name;
  }

  return {
    type: 'rawg',
    question: 'Lequel de ces jeux est sorti en premier ?',
    correctAnswer: correctAnswer,
    options: [game1.name, game2.name]
  };
}

async function generateAnnQuestion() {
  const data = await annService.getAnimeData();
  const anime1 = {name: 'X', date: '1995-04-01'};
  const anime2 = {name: 'Y', date: '1998-07-12'};
  
  let correctAnswer;
  if (new Date(anime1.date) < new Date(anime2.date)) {
    correctAnswer = anime1.name;
  } else {
    correctAnswer = anime2.name;
  }

  return {
    type: 'ann',
    question: 'Quel anime est sorti en premier ?',
    correctAnswer: correctAnswer,
    options: [anime1.name, anime2.name]
  };
}

function getLeaderboard(game) {
  const teams = game.teams.map(t => ({name: t.name, score: t.score}));
  teams.sort((a, b) => b.score - a.score);
  return teams;
}