let questions = [];

module.exports = {
  getQuestions: () => questions,
  addQuestion: (questionData) => {
    const newQuestion = {
      id: questions.length + 1,
      ...questionData
    };
    questions.push(newQuestion);
    return newQuestion;
  },
  resetQuestions: () => { questions = []; }
};