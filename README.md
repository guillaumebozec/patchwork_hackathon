# Patchwork - TeamTrivia

**Patchwork** est un projet réalisé lors d'un hackathon. Son objectif est de proposer une plateforme web de teambuilding en exploitant trois APIs originales :  
- Une API sur les jeux vidéo (RawgIO).  
- Une API sur les animes (AnimeNewsNetwork).  
- Une API sur la qualité de l'air (OpenAQ).  

Le résultat est **TeamTrivia**, une plateforme interactive inspirée de Kahoot, où les joueurs se posent mutuellement des questions pour tester leurs connaissances tout en renforçant les liens d'équipe.  

---

## Fonctionnalités principales
- **Choix de questions** : Les participants choisissent une question à poser à un autre joueur.  
- **Score en temps réel** : Suivez les scores pour voir qui mène la partie.  
- **Expérience interactive** : Une interface engageante et un sound design audacieux pour améliorer l'expérience utilisateur.  

---

## Structure du projet

Le projet est divisé en deux parties :  

### 1. Backend  
- Développé en **Node.js**.  
- Configure les APIs et sert de point d'entrée pour les données.  

### 2. Frontend  
- Développé en **React.js**.  
- Offre une interface utilisateur intuitive pour jouer à TeamTrivia.

---

## Prérequis
Avant de commencer, assurez-vous d'avoir :  
- **Node.js** installé sur votre machine.  
- **npm** (ou **yarn**) pour gérer les dépendances.  

---

## Installation et Configuration

### 1. Configuration du backend  
1. Rendez-vous dans le dossier `/backend/src/config`.  
2. Ouvrez le fichier `env.js` et ajoutez vos clés API :  
   ```javascript
   module.exports = {
      PORT: process.env.PORT || 3001,
      OPENAQ_API_URL: 'https://api.openaq.org/v3/locations/',
      OPENAQ_API_KEY : 'VOTRE API KEY',
      RAWG_API_URL: 'https://api.rawg.io/api/',
      RAWG_API_KEY: 'VOTRE API KEY', 
      ANN_API_URL: 'https://cdn.animenewsnetwork.com/encyclopedia/api.xml?', 
   };
   ```
3. Revenez au dossier `/backend`.  
4. Installez les dépendances nécessaires :  
   ```bash
   npm install
   ```
5. Lancez le serveur backend :  
   ```bash
   node src/server.js
   ```

### 2. Configuration du frontend  
1. Rendez-vous dans le dossier `/frontend/src/api`.  
2. Ouvrez le fichier `api.js` et remplacez l'IP par celle de votre machine pour pointer vers l'API :  
   ```javascript
   const API_BASE_URL = "http://192.168.X.X:3000/api";
   export default API_BASE_URL;
   ```
3. Revenez au dossier `/frontend`.  
4. Installez les dépendances nécessaires :  
   ```bash
   npm install
   ```
5. Lancez le serveur frontend :  
   ```bash
   npm run start
   ```

---

## Utilisation

1. Ouvrez un navigateur web.  
2. Accédez à l'URL suivante :  
   - En local : `http://localhost:3000/home`.  
   - En réseau local (si configuré) : `http://192.168.X.X:3000/home`.  
3. Profitez de TeamTrivia et testez vos connaissances avec vos coéquipiers !  

---

## Contribution
Les contributions sont les bienvenues ! Si vous souhaitez améliorer le projet, vous pouvez :  
1. Cloner ce dépôt.  
2. Créer une branche dédiée :  
   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   ```
3. Proposer vos modifications via une Pull Request.

---

## Auteurs
Ce projet a été réalisé par l'équipe **Patchwork** lors d'un hackathon. Merci à tous les membres pour leur contribution !

---

## License
Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, le modifier et le distribuer.
