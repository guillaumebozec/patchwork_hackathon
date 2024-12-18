const API_BASE_URL = 'http://10.134.199.218:3001/api';

export async function createGame() {
  const res = await fetch(`${API_BASE_URL}/games`, { method: 'POST' });
  return res.json();
}

export async function getGame(gameId) {
  const res = await fetch(`${API_BASE_URL}/games/${gameId}`);
  return res.json();
}

export async function addTeam(gameId, name) {
  const res = await fetch(`${API_BASE_URL}/games/${gameId}/teams`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ name })
  });
  return res.json();
}

export async function startGame(gameId) {
  const res = await fetch(`${API_BASE_URL}/games/${gameId}/start`, {method:'POST'});
  return res.json();
}

export async function selectQuestion(gameId, questionType) {
  const res = await fetch(`${API_BASE_URL}/questions/${gameId}/selectQuestion`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ questionType })
  });
  return res.json();
}

export async function submitAnswer(gameId, answer) {
  const res = await fetch(`${API_BASE_URL}/questions/${gameId}/answer`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({answer})
  });
  return res.json();
}

export async function getLeaderboardAPI(gameId) {
  const res = await fetch(`${API_BASE_URL}/questions/${gameId}/leaderboard`);
  return res.json();
}