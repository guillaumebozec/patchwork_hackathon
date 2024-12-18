import React, { useEffect, useState } from 'react';
import { getTeams, createTeam } from '../api/api';
import TeamList from '../components/TeamList';
import CreateTeamForm from '../components/CreateTeamForm';

function TeamsPage() {
  const [teams, setTeams] = useState([]);

  const loadTeams = async () => {
    const data = await getTeams();
    setTeams(data);
  }

  const handleCreateTeam = async (name) => {
    await createTeam(name);
    loadTeams();
  }

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div>
      <h2>Gestion des équipes</h2>
      <CreateTeamForm onCreate={handleCreateTeam}/>
      <TeamList teams={teams}/>
    </div>
  );
}

export default TeamsPage;