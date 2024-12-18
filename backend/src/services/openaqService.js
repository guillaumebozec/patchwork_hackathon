const axios = require('axios');
const { OPENAQ_API_URL, OPENAQ_API_KEY } = require('../config/env');

module.exports = {
  async getAirQualityData() {
    try {
      const randomNumber = Math.floor(Math.random() * (9000 - 100 + 1)) + 100;
      const locationResponse = await axios.get(`${OPENAQ_API_URL}${randomNumber}`, {
        headers: { "X-API-Key": OPENAQ_API_KEY }
      });
      while((!locationResponse.data || !locationResponse.data.results || locationResponse.data.results.length === 0))
      {
         locationResponse = await axios.get(`${OPENAQ_API_URL}${randomNumber}`, {
          headers: { "X-API-Key": OPENAQ_API_KEY }
        });
      }

      // if (!locationResponse.data || !locationResponse.data.results || locationResponse.data.results.length === 0) {
      //   throw new Error('Données de localisation introuvables');
      // }

      const locality = locationResponse.data.results[0].locality || 'Inconnu';
      const country = locationResponse.data.results[0].country.name || 'Inconnu';

      const airQualityResponse = await axios.get(`${OPENAQ_API_URL}${randomNumber}/latest`, {
        headers: { "X-API-Key": OPENAQ_API_KEY }
      });

      if (!airQualityResponse.data || !airQualityResponse.data.results || airQualityResponse.data.results.length === 0) {
        throw new Error('Données de qualité de l’air introuvables');
      }

      const airQualityValue = airQualityResponse.data.results[0].value;

      const result = {
        city: locality,
        country: country,
        value: airQualityValue
      };

      return result;
    } catch (error) {
      console.error('Erreur lors de la récupération des données OpenAQ :', error.message);
      throw new Error('Impossible de récupérer les données OpenAQ');
    }
  }

};