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
      <h1>DODGE GAME</h1>
      <h1> SIGN IN </h1>
      <form onSubmit={handlesignin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">REGISTER</button>
      </form>
      <p>Already have an account?</p>

      <Link to="/">Login here</Link>
    </>
  );
};
