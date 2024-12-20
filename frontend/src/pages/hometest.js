import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { createGame } from "../api/api";

import groupImage from "../assets/Gens travaillant technologie 1.png";

function Hometest() {
  const navigate = useNavigate();
  const [existingGameId, setExistingGameId] = useState("");

  const handleCreateGame = async () => {
    try {
      const game = await createGame();
      if (game.error) {
        console.error(game.error);
      } else {
        navigate(`/setup/${game.id}`);
      }
    } catch (err) {
      console.error("Erreur lors de la création de la partie:", err);
    }
  };

  const handleJoinGame = () => {
    if (existingGameId) {
      navigate(`/setup/${existingGameId}`);
    }
  };
  return (
    <div className="container">
      {/* Barre supérieure avec fond rose */}
      <header className="header">
        {/* <div className="logo-box">
          Logo
        </div> */}
        <img
          src="../../logo.png"
          alt="Logo"
          className="logo-box"
          style={{
            width: "50px",
            background: "#ccc",
            fontWeight: "bold",
            borderRadius: "4px",
          }}
        />
      </header>

      <main className="main-content">
        <div className="left-section">
          <h1>Bienvenue</h1>
          <button className="start-button" onClick={handleCreateGame}>
            Créez une partie
          </button>
          <div className="join-game">
            <input
              type="text"
              className="input-join"
              placeholder="ID de la partie"
              value={existingGameId}
              onChange={(e) => setExistingGameId(e.target.value)}
            />
            <button onClick={handleJoinGame} className="button-join">
              Rejoindre une partie
            </button>
          </div>
        </div>

        <div className="right-section">
          <img
            src={groupImage}
            alt="Groupe de personnes"
            className="group-image"
          />
        </div>
      </main>
    </div>
  );
}

export default Hometest;
