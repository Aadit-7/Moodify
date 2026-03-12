import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../style/register.scss";
import InputContainer from "../components/InputContainer";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <InputContainer
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Username"}
            placeholder={"Enter your username"}
          />
          <InputContainer
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label={"Email"}
            placeholder={"Enter your email"}
          />
          <InputContainer
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"Enter your password"}
          />

          <button className="button">Register</button>
        </form>
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
