import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameSetupPage from './pages/GameSetupPage';
import GamePage from './pages/GamePage';
import FinishedPage from './pages/FinishedPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setup/:gameId" element={<GameSetupPage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/finished/:id" element={<FinishedPage />} />
      </Routes>
    </Router>
  );
}

export default App;