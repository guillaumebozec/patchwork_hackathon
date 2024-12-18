const teamModel = require('../models/teamModel');

module.exports = {
  createTeam(req, res) {
    const { name } = req.body;
    if(!name) return res.status(400).json({error: 'Le nom est requis'});
    const team = teamModel.addTeam(name);
    res.json(team);
  },

  listTeams(req, res) {
    const teams = teamModel.getTeams();
    res.json(teams);
  },

  updateTeamScore(req, res) {
    const { teamId, points } = req.body;
    const updatedTeam = teamModel.updateScore(parseInt(teamId), parseInt(points));
    if(!updatedTeam) return res.status(404).json({error: 'Équipe introuvable'});
    res.json(updatedTeam);
  }
};