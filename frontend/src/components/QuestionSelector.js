import React, { useState } from 'react';

function QuestionSelector({ onSelect }) {
  const [type, setType] = useState('openaq');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelect(type);
  }

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        background: '#f9f9f9',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '20px' }}>Choisissez le type de question</h3>
      <select
        value={type}
        onChange={e => setType(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '20px',
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <option value="openaq">Qualité de l'air (OpenAQ)</option>
        <option value="rawg">Jeux vidéo (RawgIO)</option>
        <option value="ann">Anime (ANN)</option>
      </select>
      <button
        type="submit"
        style={{
          backgroundColor: '#ff9fd3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#e68db8';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#ff9fd3';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        Valider
      </button>
    </form>
  );
}

export default QuestionSelector;