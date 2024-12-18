let teams = [];

module.exports = {
  getTeams: () => teams,
  addTeam: (name) => {
    const newTeam = { id: teams.length + 1, name, score: 0 };
    teams.push(newTeam);
    return newTeam;
  },
  updateScore: (teamId, points) => {
    const team = teams.find(t => t.id === teamId);
    if(team) {
      team.score += points;
    }
    return team;
  },
  resetTeams: () => { teams = []; }
};