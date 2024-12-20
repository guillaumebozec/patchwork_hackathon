import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../api/api';

function FinishedPage() {
  const { id } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadLeaderboard();
    const audio = new Audio('../../sounds/ta-da_yrvBrlS.mp3');
    audio.play();
  }, [id]);

  async function loadLeaderboard() {
    try {
      const res = await getLeaderboard(id);
      setLeaderboard(res.leaderboard);
    } catch (error) {
      console.error('Erreur lors du chargement du leaderboard :', error);
    }
  }

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', margin: '0', padding: '0', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header className="header" style={{ background: '#ff9fd3', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff', margin: '0', fontSize: '2rem' }}>Partie terminée 🎉</h1>
      </header>

      {/* Main content */}
      <main className="main-content" style={{ flex: 1, background: '#f9f9f9', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#333' }}>Leaderboard final</h2>
        </div>

        {leaderboard.length === 0 ? (
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Chargement du leaderboard...</p>
        ) : (
          <table style={{
            width: '100%',
            maxWidth: '600px',
            borderCollapse: 'collapse',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            background: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <thead>
              <tr style={{ background: '#ff9fd3', color: '#fff', textAlign: 'left' }}>
                <th style={{ padding: '10px 15px' }}>#</th>
                <th style={{ padding: '10px 15px' }}>Équipe</th>
                <th style={{ padding: '10px 15px' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((team, index) => (
                <tr key={team.id} style={{ borderBottom: '1px solid #ddd', background: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ padding: '10px 15px', fontWeight: 'bold' }}>{index + 1}</td>
                  <td style={{ padding: '10px 15px' }}>{team.name}</td>
                  <td style={{ padding: '10px 15px', color: '#333', fontWeight: 'bold' }}>{team.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {/* Button to go back */}
      <footer className="footer" style={{ padding: '20px', textAlign: 'center', background: '#ff9fd3' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            color: '#fff',
            background: '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          }}
        >
          Retour à l'accueil
        </button>
      </footer>
    </div>
  );
}

export default FinishedPage;