import React, { useState } from 'react';

function QuestionSelector({ onSelect }) {
  const [type, setType] = useState('openaq');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelect(type);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Choisissez le type de question</h3>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="openaq">Qualité de l'air (OpenAQ)</option>
        <option value="rawg">Jeux vidéo (RawgIO)</option>
        <option value="ann">Anime (ANN)</option>
      </select>
      <button type="submit">Valider</button>
    </form>
  );
}

export default QuestionSelector;