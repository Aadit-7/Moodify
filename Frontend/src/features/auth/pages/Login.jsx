import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import InputContainer from "../components/InputContainer";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
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
          <button className="button">Login</button>
        </form>
        <p>
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
