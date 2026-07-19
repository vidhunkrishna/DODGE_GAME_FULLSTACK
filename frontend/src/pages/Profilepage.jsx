import axios from "axios";
import { FaUserAlt, FaSpinner } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
export default function Profilepage() {
  const [player, setPlayer] = useState(null);
  const fileinputRef = useRef(null);
  const [imageversion, setImageVersion] = useState(null);
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        "https://dodge-game-fullstack.onrender.com/players/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPlayer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  if (!player) {
    return <FaSpinner />;
  }
  const formatedDateTime = new Date(player.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const uploadprofile = async (file) => {
    const token = localStorage.getItem("jwt");
    const formData = new FormData();
    formData.append("image", file);
    await axios.post(
      "https://dodge-game-fullstack.onrender.com/players/upload-pic",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    await fetchProfile();
    setImageVersion(Date.now());
  };
  return (
    <div className="overflow-y-auto h-screen bg-linear-to-br from-slate-900 to-slate-800 text-white">
      <div className="flex items-center justify-center">
        <div
          className="w-40 h-40  text-6xl mt-23 rounded-full border-4  border-dashed flex justify-center items-center overflow-hidden cursor-pointer"
          onClick={() => fileinputRef.current.click()}
        >
          {player.profilepic ? (
            <img
              src={player.profilepic}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FaUserAlt />
          )}
          <input
            type="file"
            ref={fileinputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                uploadprofile(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex  flex-col justify-center items-center mt-2">
          <p className="font-bold text-3xl">Profile</p>
          <div className="flex">
            <p className="mr-3">Username :</p>
            <p> {player.username}</p>
          </div>
          <div className="flex">
            <p className="mr-3">Email :</p>
            <h1>{player.email}</h1>
          </div>
          <div className="flex">
            <p className="mr-3">CreatedDate :</p>
            <h1>{formatedDateTime}</h1>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold mt-3">Stats</h1>
          <div className="flex">
            <p className="mr-3">Total Games :</p>
            <h1>{player.totalGames}</h1>
          </div>
          <div className="flex">
            <p className="mr-3">Total Deaths :</p>
            <h1>{player.totalDeaths}</h1>
          </div>
          <div className="flex">
            <p className="mr-3">Highest Score :</p>
            <h1>{player.highestScore}</h1>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col">
        <p className=" flex font-bold text-3xl mt-2 justify-center items-center mb-3">
          GameSessions
        </p>
        <div className="w-5/6">
          <div className="grid grid-cols-[0.5fr_0.8fr_1fr_0.8fr_2fr_0.8fr] bg-slate-700 py-2 font-bold rounded-xl">
            <p className="text-center">ID</p>
            <p className="text-center">Score</p>
            <p className="text-center">Survival</p>
            <p className="text-center">Deaths</p>
            <p className="text-center">Played At</p>
            <p className="text-center">Difficulty</p>
          </div>
          {player.gameSession.length === 0 ? (
            <p className="text-center mt-4">No Games played yet</p>
          ) : (
            [...player.gameSession].reverse().map((session, i) => (
              <div key={session.id}>
                <div className="grid grid-cols-[0.5fr_0.8fr_1fr_0.8fr_2fr_0.8fr] bg-slate-700 rounded-xl p-2 mt-2 gap-y-0.2 justify-center items-center  hover:scale-105 ease-in-out transition-all duration-150">
                  <p className="text-center">{i + 1}</p>
                  <p className="text-center">{session.score}</p>
                  <p className="text-center">{session.survivalTime}</p>
                  <p className="text-center">{session.deaths}</p>
                  <p className="whitespace-nowrap text-center">
                    {new Date(session.playedAt).toLocaleString("en-IN")}
                  </p>
                  <p className="text-center">{session.difficulty}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex items-center justify-center flex-col mt-6">
        <p className="font-bold text-3xl mb-3">Achievements</p>

        <div className="w-5/6">
          <div className="grid grid-cols-[0.5fr_2fr_4fr] bg-slate-700 py-2 font-bold rounded-xl">
            <p className="text-center">ID</p>
            <p className="text-center">Title</p>
            <p className="text-center">Description</p>
          </div>

          {player.achievements.length === 0 ? (
            <p className="text-center mt-4">No Achievements yet</p>
          ) : (
            player.achievements.map((achievement, i) => (
              <div
                key={achievement.id}
                className="grid grid-cols-[0.5fr_2fr_4fr] bg-slate-700 rounded-xl p-2 mt-2 hover:scale-105 transition-all duration-150"
              >
                <p className="text-center">{i + 1}</p>
                <p className="text-center">{achievement.title}</p>
                <p className="text-center">{achievement.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
