import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { getGame, selectQuestion, submitAnswer } from '../api/api';
import QuestionSelector from '../components/QuestionSelector';
import QuestionDisplay from '../components/QuestionDisplay';
import AnswerForm from '../components/AnswerForm';
import Leaderboard from '../components/Leaderboard';

function GamePage() {
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

  if (loading) return <div>Chargement...</div>;
  if (!game) return <div>Partie introuvable</div>;

  // Logique d’affichage :
  // 1. Si game.currentQuestion n'existe pas, c'est à l'équipe game.currentTeamIndex de choisir une question
  //    si team === game.currentTeamIndex => afficher QuestionSelector
  //    sinon => "En attente que l'autre équipe choisisse"
  
  // 2. Si game.currentQuestion existe, alors l'équipe qui doit répondre est l'autre équipe.
  //    answeringTeamIndex = (game.currentTeamIndex + 1) % game.teams.length
  //    si team === answeringTeamIndex => afficher la question + form de réponse
  //    sinon => spectateur ("L'autre équipe est en train de répondre...")
  
  // 3. Si lastResult existe (après submitAnswer), on affiche le leaderboard temporairement puis on re-check l'état.

  const isChoosingTeam = (team === game.currentTeamIndex);
  const answeringTeamIndex = (game.currentTeamIndex + 1) % game.teams.length;
  const isAnsweringTeam = (team === answeringTeamIndex);

  async function handleSelectQuestion(questionType) {
    const result = await selectQuestion(gameId, questionType);
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
    if (isChoosingTeam) {
      content = <QuestionSelector onSelect={handleSelectQuestion} />;
    } else {
      content = <div>En attente que l'autre équipe choisisse une question...</div>;
    }
  } else {
    if (isAnsweringTeam) {
      content = (
        <>
          <QuestionDisplay 
            question={game.currentQuestion} 
            isAnsweringTeam={true}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer} 
          />
          <AnswerForm onSubmit={handleSubmitAnswer} disabled={!selectedAnswer}/>
        </>
      );
    } else {
      content = (
        <>
          <QuestionDisplay 
            question={game.currentQuestion} 
            isAnsweringTeam={false}
            selectedAnswer={null}
            onSelectAnswer={()=>{}}
          />
          <p>L'autre équipe est en train de répondre...</p>
        </>
      );
    }
  }

  return (
    <div>
      <h2>Partie #{game.id}</h2>
      <p>Vous êtes l'équipe : {team}, c'est le tour de l'équipe {game.currentTeamIndex}</p>
      {content}
    </div>
  );
}

export default GamePage;