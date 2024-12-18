const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');

router.post('/:gameId/selectQuestion', questionsController.selectQuestion);
router.post('/:gameId/answer', questionsController.submitAnswer);
router.get('/:gameId/leaderboard', questionsController.getLeaderboard);
router.get('/', questionsController.getAllQuestions);

module.exports = router;