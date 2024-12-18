const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/', gameController.createGame);
router.get('/:id', gameController.getGame);
router.post('/:id/teams', gameController.addTeamToGame);
router.post('/:id/start', gameController.startGame);

module.exports = router;