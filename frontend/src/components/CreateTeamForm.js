import React, { useState } from 'react';

function CreateTeamForm({ onCreate }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(name);
    setName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Nom de l'équipe"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Créer</button>
    </form>
  );
}

export default CreateTeamForm;