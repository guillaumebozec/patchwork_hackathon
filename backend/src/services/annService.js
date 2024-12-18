const axios = require('axios');
const { ANN_API_URL } = require('../config/env');
const xml2js = require('xml2js');

module.exports = {
  async getAnimeData() {
    const response = await axios.get(ANN_API_URL);
    const result = await xml2js.parseStringPromise(response.data);
    return result;
  }
};