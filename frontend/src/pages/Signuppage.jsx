import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const Signuppage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handlesignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        email: email,
        username: username,
        password: password,
      });
      alert("user created successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center  items-center bg-linear-to-br from-slate-900 to-slate-800 text-white">
        <h1 className="text-4xl font-bold mb-3">DODGE GAME</h1>
        <h1 className="text-2xl font-semibold mb-5"> SIGN IN </h1>
        <form
          onSubmit={handlesignin}
          className="flex flex-col justify-center items-center gap-2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">
            REGISTER
          </button>
        </form>
        <div className="flex flex-row mt-2">
          <p className="font-semibold">Already have an account?</p>

          <Link to="/" className="lastext">
            Login here
          </Link>
        </div>
      </div>
    </>
  );
};
