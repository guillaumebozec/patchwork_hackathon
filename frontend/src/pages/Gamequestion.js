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

      if (result.result === 'correct') {
        const audio = new Audio('../../sounds/crowd_small_chil_ec049202_9klCwI6.mp3');
        audio.play();
      } else {
        const audio = new Audio('../../sounds/error_CDOxCYm.mp3');
        audio.play();
      }

      setLastResult(result.result);
      setLeaderboard(result.leaderboard);
      setSelectedAnswer(null);
    } catch (error) {
      console.error('Erreur lors de la soumission de la réponse :', error);
    }
  }

  if (loading || !game) {
    return <div>Chargement en cours...</div>;
  }

  if (!game) {
    return <div>Partie introuvable</div>;
  }

  const isChoosingTeam = team === game.currentTeamIndex;
  const answeringTeamIndex = (game.currentTeamIndex + 1) % game.teams.length;
  const isAnsweringTeam = team === answeringTeamIndex;

  let content;

  if (leaderboard && lastResult) {
    content = (
      <div>
        <h3>Résultat : {lastResult === 'correct' ? 'Bonne réponse ! 🎉' : 'Mauvaise réponse... ❌'}</h3>
        <Leaderboard leaderboard={leaderboard} />
        <p>La partie va continuer, patientez...</p>
      </div>
    );
  } else if (!game.currentQuestion) {
    if (isChoosingTeam) {
      content = (
        <div style={{ marginTop: '30px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>C'est à votre tour de choisir une question :</h1>
          <QuestionSelector onSelect={handleSelectQuestion} />
        </div>
      );
    } else {
      content = (
        <div style={{ marginTop: '30px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>En attente que l'autre équipe choisisse une question...</h1>
        </div>
      );
    }
  } else {
    if (isAnsweringTeam) {
      content = (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '20px' }}>Répondez à la question sélectionnée :</h2>
          <QuestionDisplay
            question={game.currentQuestion}
            isAnsweringTeam={true}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />
          <AnswerForm onSubmit={handleSubmitAnswer} disabled={!selectedAnswer} />
        </div>
      );
    } else {
      content = (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '20px' }}>L'autre équipe est en train de répondre...</h2>
          <QuestionDisplay
            question={game.currentQuestion}
            isAnsweringTeam={false}
            selectedAnswer={null}
            onSelectAnswer={() => {}}
          />
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
          <div style={{ margin: '20px 0' }}>
            <h3 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '10px' }}>Équipes</h3>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {game.teams.map((t, index) => (
                <div
                  key={t.id}
                  style={{
                    border: `2px solid ${index === game.currentTeamIndex ? '#ff9fd3' : 'transparent'}`,
                    padding: '10px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    backgroundColor: index === team ? '#d1ffd8' : '#f0f0f0',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  {t.icon && (
                    <img
                      src={t.icon}
                      alt={`Icône de l'équipe ${index}`}
                      style={{ width: '60px', height: '60px', marginBottom: '10px', borderRadius: '50%' }}
                    />
                  )}
                  <p style={{ fontWeight: 'bold' }}>Équipe #{index + 1}</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '5px' }}>{t.name}</p>
                </div>
              ))}
            </div>
          </div>
          {content}
        </div>

        {/* Right section (image) */}
        <div className="right-section" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <img
            src={groupImage}
            alt="Groupe de personnes"
            className="group-image"
            style={{ maxWidth: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </main>
    </div>
  );
}

export default Gamequestion;
