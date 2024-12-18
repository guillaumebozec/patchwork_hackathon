// PAGE PLUS UTILISÉE

import React, { useEffect, useState } from 'react';
import { getQuestions, createOpenAQQuestion, createRawgQuestion, createAnnQuestion } from '../api/api';
import QuestionList from '../components/QuestionList';

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);

  const loadQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleCreateOpenAQ = async () => {
    await createOpenAQQuestion();
    loadQuestions();
  };

  const handleCreateRawg = async () => {
    await createRawgQuestion();
    loadQuestions();
  };

  const handleCreateAnn = async () => {
    await createAnnQuestion();
    loadQuestions();
  };

  return (
    <div>
      <h2>Questions</h2>
      <div>
        <button onClick={handleCreateOpenAQ}>Créer question OpenAQ</button>
        <button onClick={handleCreateRawg}>Créer question RawgIO</button>
        <button onClick={handleCreateAnn}>Créer question ANN</button>
      </div>
      <QuestionList questions={questions}/>
    </div>
  );
}

export default QuestionsPage;