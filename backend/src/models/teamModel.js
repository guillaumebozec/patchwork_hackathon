let teams = [];

module.exports = {
  getTeams: () => teams,
  addTeam: (name) => {
    const newTeam = { id: teams.length + 1, name, score: 0 };
    teams.push(newTeam);
    return newTeam;
  },
  updateScore: (teamId, points) => {
    console.log(teamId, points)
    // const team = teams.find(t => t.id === teamId);
    const team = teams[teamId];
    console.log("teams : " +teams)
    console.log("team : " + team)
    if(team) {
      console.log('Log : Ajout de', points, 'points à', team.name);
      team.score += points;
    }
    console.log("TeamModel")
    return team;
  },
  resetTeams: () => { teams = []; }
};