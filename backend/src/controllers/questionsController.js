const questionModel = require('../models/questionModel');
const gameModel = require('../models/gameModel');

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
      // if (!question) {
      //   return res.status(500).json({ error: 'Impossible de générer la question' });
      // }
      while (!question) {
        question = await generateQuestion(questionType);
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

const axios = require('axios');
const xml2js = require('xml2js');

async function getAnimeDetails(animeId) {
  const url = `https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=${animeId}`;
  try {
    const response = await axios.get(url);
    const result = await xml2js.parseStringPromise(response.data);
    return result;
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails de l'anime ${animeId} :`, error);
    return null; // Renvoie null si une erreur se produit
  }
}

async function getValidAnime(id) {
  let anime = await getAnimeDetails(id);
  while (!anime || !anime.ann.anime || anime.ann.anime.length === 0) {
    console.warn(`Anime avec ID ${id} non valide, génération d'un nouvel ID...`);
    id = Math.floor(Math.random() * (12000 - 1 + 1)) + 1;
    anime = await getAnimeDetails(id);
  }
  return anime;
}

async function generateAnnQuestion() {
  const [animeId1, animeId2] = await getRandomAnimeIds();

  const anime1 = await getValidAnime(animeId1);
  const anime2 = await getValidAnime(animeId2);

  const anime1Name = anime1.ann.anime[0].$.name || 'Inconnu';
  const anime2Name = anime2.ann.anime[0].$.name || 'Inconnu';

  const anime1DateInfo = anime1.ann.anime[0].info.find(info => info.$.type === 'Vintage');
  const anime2DateInfo = anime2.ann.anime[0].info.find(info => info.$.type === 'Vintage');

  if (!anime1DateInfo || !anime2DateInfo) {
    console.error('Impossible de récupérer les dates des animes.');
    return null;
  }

  const anime1Date = new Date(anime1DateInfo._);
  const anime2Date = new Date(anime2DateInfo._);

  let correctAnswer;
  if (anime1Date < anime2Date) {
    correctAnswer = anime1Name;
  } else {
    correctAnswer = anime2Name;
  }

  return {
    type: 'ann',
    question: 'Quel anime est sorti en premier ?',
    correctAnswer: correctAnswer,
    options: [anime1Name, anime2Name]
  };
}

function getLeaderboard(game) {
  const teams = game.teams.map(t => ({name: t.name, score: t.score}));
  teams.sort((a, b) => b.score - a.score);
  return teams;
}

async function getRandomAnimeIds() {
  const minId = 1; // ID minimal connu pour les animes
  const maxId = 12000; // Ajustez selon les IDs disponibles
  const randomId1 = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  let randomId2 = Math.floor(Math.random() * (maxId - minId + 1)) + minId;

  // Assurez-vous que les deux IDs sont différents
  while (randomId2 === randomId1) {
    randomId2 = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  }

  return [randomId1, randomId2];
}