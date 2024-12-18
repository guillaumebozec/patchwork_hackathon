import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGame, addTeam, startGame } from '../api/api';
import groupImage from '../assets/Gens travaillant technologie 1.png'; // Remplacez par le chemin correct de votre image

function Createam() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamColor, setTeamColor] = useState('');
  const [warCry, setWarCry] = useState('');
  const [teamIcon, setTeamIcon] = useState('');
  const [ClientTeamId, setClientTeamId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      loadGame();
    }, 3000);

    return () => clearInterval(interval);
  }, [gameId]);

  useEffect(() => {
    if (game && game.status === 'ongoing') {
      if (ClientTeamId !== null) {
        navigate(`/game/${game.id}?team=${ClientTeamId}`);
      }
    }
  }, [game, ClientTeamId, navigate]);

  async function loadGame() {
    try {
      const g = await getGame(gameId);
      console.log('Données de la partie :', g);
      setGame(g);
    } catch (error) {
      console.error('Erreur lors du chargement de la partie :', error);
    }
  }

  async function handleAddTeam(e) {
    e.preventDefault();
    const newTeamData = {
      name: teamName,
    //   color: teamColor,
    //   warCry: warCry,
    //   icon: teamIcon
    };
    const client = await addTeam(gameId, teamName);

    const clientTeamIndex = client.teams.findIndex(t => t.name === teamName);
    setClientTeamId(clientTeamIndex);

    setTeamName('');
    // setTeamColor('');
    // setWarCry('');
    // setTeamIcon('');
    loadGame();
  }

  async function handleStartGame() {
    const g = await startGame(gameId);
    setGame(g);
  }

  if (!game) return <div>Chargement...</div>;

  const canAddTeams = !game.teams || game.teams.length < 2;
  const canStart = game.status === 'ready' && game.teams && game.teams.length === 2;

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif', margin: '0', padding: '0' }}>
      {/* Header */}
      <header className="header" style={{ background: '#ff9fd3', padding: '20px', display: 'flex', alignItems: 'center' }}>
        <div className="logo-box" style={{ background: '#ccc', padding: '10px 20px', fontWeight: 'bold', borderRadius: '4px' }}>
          Logo
        </div>
      </header>
      
      <main className="main-content" style={{ display: 'flex', flex: 1, background: '#f9f9f9' }}>
        {/* Section Gauche (Formulaire + infos partie) */}
        <div className="left-section-form" style={{ flex: 1, background: '#fff', padding: '40px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <p className="part-title" style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px' }}>Partie #{game.id}</p>
          
          {game.status !== 'ongoing' && (
            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Créez votre Équipe :</h1>
              <form onSubmit={handleAddTeam} className="team-form" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontWeight: 'bold' }}>Comment s'appelle votre équipe ?</label>
                  <input 
                    type="text"
                    placeholder="Nom de votre équipe"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    disabled={!canAddTeams}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontWeight: 'bold' }}>Quel est la couleur de votre équipe ?</label>
                  <div className="color-options" style={{ display: 'flex', gap: '10px' }}>
                    {['#FF6B6B','#9EF01A','#3AA7FF','#C77DFF','#FFE74C'].map(color => (
                      <div 
                        key={color}
                        className={`color-box ${teamColor === color ? 'selected' : ''}`} 
                        style={{
                          background: color,
                          width: '30px',
                          height: '30px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          border: teamColor === color ? '2px solid #000' : '2px solid transparent'
                        }} 
                        onClick={() => canAddTeams && setTeamColor(color)}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontWeight: 'bold' }}>Quel est votre cri de guerre ?</label>
                  <div className="sound-options" style={{ display: 'flex', gap: '20px' }} >
                    {[1,2,3].map(num => (
                      <button 
                        type="button"
                        key={num} 
                        className={`sound-button ${warCry === 'sound'+num ? 'selected' : ''}`} 
                        onClick={() => {canAddTeams && setWarCry('sound'+num) ;var audio = new Audio('../../sounds/ahou-ahou-ahou.mp3');
                          audio.play();}}
                        onSelect={() => {
                          
                        }}
                        style={{
                          background: '#ff9fd3',
                          border: 'none',
                          padding: '20px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '1.5rem',
                          outline: warCry === 'sound'+num ? '2px solid #000' : 'none'
                        }}
                      >
                        <span role="img" aria-label="sound">🔊</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontWeight: 'bold' }}>Quel est l'icône de votre équipe ?</label>
                  <div className="icon-options" style={{ display: 'flex', gap: '20px' }}>
                    {['🎵','🎁','🏆','🐾'].map(icon => (
                      <button 
                        type="button"
                        key={icon} 
                        className={`icon-button ${teamIcon === icon ? 'selected' : ''}`} 
                        onClick={() => canAddTeams && setTeamIcon(icon)}
                        style={{
                          background: '#ff9fd3',
                          border: 'none',
                          padding: '15px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '1.5rem',
                          outline: teamIcon === icon ? '2px solid #000' : 'none'
                        }}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {canAddTeams && (
                  <button 
                    className="validate-button"
                    type="submit"
                    style={{
                      background: '#ff9fd3',
                      border: 'none',
                      padding: '15px 30px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      borderRadius: '4px',
                      color: '#000',
                      alignSelf: 'flex-start'
                    }}
                  >
                    Valider
                  </button>
                )}
              </form>
            </div>
          )}

          <div style={{ marginTop: '40px' }}>
            <h3>Équipes :</h3>
            <ul>
              {game.teams && game.teams.map(t => (
                <li key={t.id}>{t.name} - {t.score} points</li>
              ))}
            </ul>
          </div>

          {game.status === 'waiting' && <p>En attente d'au moins 2 équipes...</p>}
          {canStart && (
            <button onClick={handleStartGame}
              style={{
                background: '#ff9fd3',
                border: 'none',
                padding: '15px 30px',
                cursor: 'pointer',
                fontSize: '1rem',
                borderRadius: '4px',
                color: '#000',
                alignSelf: 'flex-start',
                marginTop: '20px'
              }}
            >
              Démarrer la partie
            </button>
          )}

        </div>

        {/* Section Droite (Image) */}
        <div className="right-section" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <img src={groupImage} alt="Groupe de personnes" className="group-image" style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }} />
        </div>
      </main>
    </div>
  );
}

export default Createam;
