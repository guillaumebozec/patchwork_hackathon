import React, { useState } from 'react';

function CreateTeamForm({ onCreate }) {
  const [teamName, setTeamName] = useState('');
  const [teamColor, setTeamColor] = useState('');
  const [warCry, setWarCry] = useState('');
  const [teamIcon, setTeamIcon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      name: teamName,
      color: teamColor,
      warCry: warCry,
      icon: teamIcon
    });

    setTeamName('');
    setTeamColor('');
    setWarCry('');
    setTeamIcon('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', maxWidth: '400px' }}>
      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Comment s'appelle votre équipe ?</label>
        <input 
          type="text"
          placeholder="Nom de votre équipe"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
        />
      </div>

      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Quelle est la couleur de votre équipe ?</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['#FF6B6B','#9EF01A','#3AA7FF','#C77DFF','#FFE74C'].map(color => (
            <div 
              key={color}
              onClick={() => setTeamColor(color)}
              style={{
                background: color,
                width: '30px',
                height: '30px',
                borderRadius: '4px',
                cursor: 'pointer',
                border: teamColor === color ? '2px solid #000' : '2px solid transparent'
              }}
            ></div>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Quel est votre cri de guerre ?</label>
        <div style={{ display: 'flex', gap: '20px' }}>
          {[1,2,3].map(num => (
            <button 
              type="button"
              key={num} 
              onClick={() => setWarCry('sound'+num)}
              style={{
                background: '#ff9fd3',
                border: 'none',
                padding: '20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1.5rem',
                outline: warCry === 'sound' + num ? '2px solid #000' : 'none'
              }}
            >
              <span role="img" aria-label="sound">🔊</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Quel est l'icône de votre équipe ?</label>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['🎵','🎁','🏆','🐾'].map(icon => (
            <button 
              type="button"
              key={icon} 
              onClick={() => setTeamIcon(icon)}
              style={{
                background: '#ff9fd3',
                border: 'none',
                padding: '15px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1.5rem',
                outline: teamIcon === icon ? '2px solid #000' : 'none'
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <button 
        type="submit"
        style={{
          background: '#ff9fd3',
          border: 'none',
          padding: '15px 30px',
          cursor: 'pointer',
          fontSize: '1rem',
          borderRadius: '4px',
          color: '#000',
          alignSelf: 'flex-start'
        }}
      >
        Valider
      </button>
    </form>
  );
}

export default CreateTeamForm;
