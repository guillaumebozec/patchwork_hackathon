import React from 'react';

function AnswerForm({ onSubmit, disabled }) {
  return (
    <button onClick={onSubmit} disabled={disabled}>
      Valider la réponse
    </button>
  );
}

export default AnswerForm;