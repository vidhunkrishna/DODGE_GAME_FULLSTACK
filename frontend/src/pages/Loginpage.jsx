import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { TbBrandGoogle } from "react-icons/tb";
const provider = new GoogleAuthProvider();

export default function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseToken = await result.user.getIdToken();

      

      const response = await axios.post("http://localhost:8080/auth/google", {
        token: firebaseToken,
      });

      

      localStorage.setItem("jwt", response.data.token);

      navigate("/game");
    } catch (error) {
      console.log(error);
    }
  };

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: email,
        password: password,
      });


      localStorage.setItem("jwt", response.data.token);

      navigate("/game");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center  items-center bg-linear-to-br from-slate-900 to-slate-800 text-white">
      <h1 className="text-4xl font-bold mb-3">DODGE GAME</h1>

      <h1 className="text-2xl font-semibold mb-5">LOGIN PAGE</h1>

      <form
        onSubmit={handlelogin}
        className="flex flex-col justify-center items-center gap-2"
      >
        <input
          value={email}
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          className="input-field"
        />

        <input
          value={password}
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          className="input-field"
        />

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>

      <p className="font-medium mt-2">or login with</p>

      <button
        onClick={handleGoogleLogin}
        className=" group cursor-pointer rounded-full  w-12 h-12 bg-slate-800 flex items-center justify-center transition duration-300 hover:bg-slate-700 hover:scale-110 mt-3"
      >
        <TbBrandGoogle className="text-xl text-white group-hover:hidden" />
        <FaGoogle className="text-xl text-white hidden group-hover:block" />
      </button>
      <div className="flex flex-row mt-2">
        <p className="font-semibold">Not a member? </p>

        <Link to="/signup" className="lastext">
          Register here
        </Link>
      </div>  
    </div>
  );
}
