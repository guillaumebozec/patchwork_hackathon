import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameSetupPage from './pages/GameSetupPage';
import GamePage from './pages/GamePage';
import FinishedPage from './pages/FinishedPage';
import Hometest from './pages/hometest';
import Createam from './pages/Createam';
import Gamequestion from './pages/Gamequestion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setup/:gameId" element={<Createam />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/finished/:id" element={<FinishedPage />} />
        <Route path="/home" element={<Hometest/>} />
        <Route path="/createam/:gameId" element={<Createam/>} />
        <Route path="/gamequestion/:gameId" element={<Gamequestion/>}/>
      </Routes>
    </Router>
  );
}

export default App;