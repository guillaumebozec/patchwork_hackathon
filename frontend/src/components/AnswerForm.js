import React from 'react';

function AnswerForm({ onSubmit, disabled }) {
  return (
    <button
    onClick={onSubmit}
    disabled={disabled}
    style={{
      backgroundColor: disabled ? '#ccc' : '#ff9fd3',
      color: disabled ? '#888' : '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 20px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      marginTop: '20px',
    }}
    onMouseOver={(e) => {
      if (!disabled) e.target.style.backgroundColor = '#e68db8';
    }}
    onMouseOut={(e) => {
      if (!disabled) e.target.style.backgroundColor = '#ff9fd3';
    }}
    onMouseDown={(e) => {
      if (!disabled) e.target.style.transform = 'scale(0.95)';
    }}
    onMouseUp={(e) => {
      if (!disabled) e.target.style.transform = 'scale(1)';
    }}
  >
    Valider la réponse
  </button>
  );
}

export default AnswerForm;