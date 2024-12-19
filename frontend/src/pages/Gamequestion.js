import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { getGame, selectQuestion, submitAnswer } from '../api/api';
import QuestionSelector from '../components/QuestionSelector';
import QuestionDisplay from '../components/QuestionDisplay';
import AnswerForm from '../components/AnswerForm';
import Leaderboard from '../components/Leaderboard';
import groupImage from '../assets/Gens travaillant technologie 1.png'; // Ajustez le chemin vers votre image

function Gamequestion() {
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();
  const team = parseInt(searchParams.get('team') || '0');
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    let interval = setInterval(() => {
      refreshGame();
    }, 3000);
    refreshGame();
    return () => clearInterval(interval);
  }, [gameId]);

  async function refreshGame() {
    try {
      const g = await getGame(gameId);
      console.log('Log : Données de la partie :', g); 
      setGame(g);
      setLoading(false);
  
      if (g.status === 'finished') {
        navigate(`/finished/${g.id}?team=${team}`);
      }
      if (!g.currentQuestion) {
        setLeaderboard(null);
        setLastResult(null);
      }
    } catch (error) {
      console.error('Erreur lors de l\'actualisation de la partie :', error);
    }
  }

  async function handleSelectQuestion(questionType) {
    await selectQuestion(gameId, questionType);
    refreshGame();
  }

  async function handleSubmitAnswer() {
    if (!selectedAnswer) return;
  
    try {
      const result = await submitAnswer(gameId, selectedAnswer);
      console.log('Réponse soumise, résultat :', result);
  
      setLastResult(result.result);
      setLeaderboard(result.leaderboard);
      setSelectedAnswer(null);
    } catch (error) {
      console.error('Erreur lors de la soumission de la réponse :', error);
    }
  }

  if (loading) return <div>Chargement...</div>;
  if (!game) return <div>Partie introuvable</div>;

  const isChoosingTeam = (team === game.currentTeamIndex);
  const answeringTeamIndex = (game.currentTeamIndex + 1) % game.teams.length;
  const isAnsweringTeam = (team === answeringTeamIndex);

  let content;

  if (leaderboard && lastResult) {
    content = (
      <div>
        <h3>Résultat : {lastResult === 'correct' ? 'Bonne réponse !' : 'Mauvaise réponse...'}</h3>
        <Leaderboard leaderboard={leaderboard} />
        <p>La partie va continuer, patientez...</p>
      </div>
    );
  } else if (!game.currentQuestion) {
    // Pas de question courante => l’équipe au tour doit choisir
    if (isChoosingTeam) {
      content = (
        <div style={{ marginTop: '30px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Choisissez une question :</h1>
          <QuestionSelector onSelect={handleSelectQuestion} />
        </div>
      );
    } else {
      content = <div style={{ marginTop: '30px' }}>En attente que l'autre équipe choisisse une question...</div>;
    }
  } else {
    // Il y a une question => l’autre équipe doit répondre
    if (isAnsweringTeam) {
      content = (
        <div style={{ marginTop: '30px' }}>
          <QuestionDisplay 
            question={game.currentQuestion} 
            isAnsweringTeam={true}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer} 
          />
          <AnswerForm onSubmit={handleSubmitAnswer} disabled={!selectedAnswer}/>
        </div>
      );
    } else {
      content = (
        <div style={{ marginTop: '30px' }}>
          <QuestionDisplay 
            question={game.currentQuestion} 
            isAnsweringTeam={false}
            selectedAnswer={null}
            onSelectAnswer={()=>{}}
          />
          <p>L'autre équipe est en train de répondre...</p>
        </div>
      );
    }
  }

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', margin: '0', padding: '0', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header className="header" style={{ background: '#ff9fd3', padding: '20px', display: 'flex', alignItems: 'center' }}>
        <div className="logo-box" style={{ background: '#ccc', padding: '10px 20px', fontWeight: 'bold', borderRadius: '4px' }}>
          Logo
        </div>
      </header>
      
      {/* Main content */}
      <main className="main-content" style={{ display: 'flex', flex: 1, background: '#f9f9f9' }}>
        {/* Left section */}
        <div className="left-section-form" style={{ flex: 1, background: '#fff', padding: '40px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <p className="part-title" style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px' }}>Partie #{game.id}</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Accueil de la partie</h2>
          <p>Vous êtes l'équipe : {team}</p>
          <p>C'est le tour de l'équipe {game.currentTeamIndex}</p>

          <h3 style={{ marginTop: '20px' }}>Équipes :</h3>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px', flexWrap: 'wrap' }}>
            {game.teams && game.teams.map((t, index) => (
              <div key={t.id} style={{ 
                border: '2px solid #000', 
                borderRadius: '8px', 
                padding: '20px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                minWidth: '120px'
              }}>
                {/* Carré de couleur représentant l'équipe */}
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: t.color || '#ccc', 
                  marginBottom: '10px' 
                }}></div>
                <p style={{ fontSize: '0.9rem', textAlign: 'center' }}>équipe {index + 1} : {t.name}</p>
              </div>
            ))}
          </div>

          {content}
        </div>
        
        {/* Right section (image) */}
        <div className="right-section" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <img 
            src={groupImage} 
            alt="Groupe de personnes" 
            className="group-image" 
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }} 
          />
        </div>
      </main>
    </div>
  );
}

export default Gamequestion;
