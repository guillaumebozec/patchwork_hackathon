const axios = require('axios');
const { RAWG_API_URL, RAWG_API_KEY } = require('../config/env');

module.exports = {
  async getPopularGames() {
    try {
        const randomNumber = Math.floor(Math.random() * (5000 - 100 + 1)) + 100;
  
        // 2. Premier fetch : récupérer le nom de la ville et du pays
        const response =  await axios.get(`${RAWG_API_URL}games?key=${RAWG_API_KEY}&page=${randomNumber}&page_size=2&ordering=--rating&dates=2020-01-01,2024-12-31`);
        data = response.data.results;

        const result = [{
          name: data[0].name,
          date: data[0].released
        },{
            name: data[1].name,
            date: data[1].released
          }];
  
        return result;
      } catch (error) {
        console.error('Erreur lors de la récupération des données RAWG :', error.message);
        throw new Error('Impossible de récupérer les données RAWG');
      }
  }

};