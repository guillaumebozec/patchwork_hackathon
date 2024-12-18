const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController');

router.get('/', teamsController.listTeams);
router.post('/', teamsController.createTeam);
router.put('/score', teamsController.updateTeamScore);

module.exports = router;