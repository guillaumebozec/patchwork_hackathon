// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getLeaderboard } from '../api/api';

// function FinishedPage() {
//   const { id } = useParams();
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     loadLeaderboard();
//   }, [id]);

//   async function loadLeaderboard() {
//     const res = await getLeaderboard(id);
//     setLeaderboard(res.leaderboard);
//   }

//   return (
//     <div>
//       <h2>Partie terminée</h2>
//       <h3>Leaderboard final</h3>
//       <ul>
//         {leaderboard.map((team, i) => (
//           <li key={i}>{team.name} - {team.score}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default FinishedPage;