const express = require('express');
const { PORT } = require('./config/env');
const bodyParser = require('body-parser');
const cors = require('cors');

const questionsRoutes = require('./routes/questionsRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/questions', questionsRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/games', gameRoutes);

app.get('/', (req, res) => {
  res.send('Backend du projet TeamTrivia Battle');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});