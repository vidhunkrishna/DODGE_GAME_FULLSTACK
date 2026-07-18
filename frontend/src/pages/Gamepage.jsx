import { useState } from "react";
import GameCanvas from "../components/GameCanvas";
import { FiLogOut } from "react-icons/fi";
import { FaHome, FaTrophy } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Gamepage() {
  const navigate = useNavigate();
  const [isplaying, setIsplaying] = useState(false);
  function handleLogout() {
    localStorage.removeItem("jwt");

    navigate("/");
  }

  return (
    <>
      {!isplaying && (
        <div className="bg-[#1a1a2e] text-white flex justify-between p-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => window.location.reload()}
              className="cursor-pointer flex items-center"
            >
              <FaHome size={25} />
              Home
            </button>
            <button onClick={handleLogout} className="cursor-pointer flex gap-2">
              <FiLogOut className="text-white text-2xl" />
              Signout
            </button>
            <button
              onClick={() => navigate("/leaderboard")}
              className="cursor-pointer flex items-center gap-2"
            >
              <FaTrophy size={25} />
              LeaderBoard
            </button>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="cursor-pointer flex items-center gap-2"
          >
            <FaUser size={22} />
            Profile
          </button>
        </div>
      )}
      <GameCanvas
        onGameStart={() => setIsplaying(true)}
        onGameEnd={() => setIsplaying(false)}
      />
    </>
  );
}
