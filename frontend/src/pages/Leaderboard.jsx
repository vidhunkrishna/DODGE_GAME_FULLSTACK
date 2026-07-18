import { useEffect, useState } from "react";
import axios from "axios";

export default function LeaderboardPage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        "https://dodge-game-fullstack.onrender.com/players/leaderboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPlayers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">🏆 Leaderboard</h1>

      <div className="max-w-3xl mx-auto">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="flex justify-between items-center bg-slate-800 rounded-xl px-6 py-4 mb-3"
          >
            <div className="flex gap-4 items-center">
              <span className="font-bold text-xl">#{index + 1}</span>

              <span>{player.username}</span>
            </div>

            <span className="font-bold text-cyan-400">
              {player.highestScore}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
