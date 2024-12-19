const axios = require('axios');
const xml2js = require('xml2js');

async function getAnimeDetails(animeId) {
  const url = `https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=${animeId}`;
  try {
    const response = await axios.get(url);
    const result = await xml2js.parseStringPromise(response.data);
    return result;
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails de l'anime ${animeId} :`, error);
    return null;
  }
}