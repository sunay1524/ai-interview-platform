import React, { useState } from "react";
import "./auth.login.scss";
import { useNavigate, Link, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
const Login = () => {

  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleLogin({ email, password });

      navigate("/");
    }
    catch (err) {
      console.log(err.response?.data?.message);
    }
  }
  if (loading) {
    return <h1 className="loading" > Loading ..... </h1>
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit} className="loginForm">
          <label htmlFor="email">Email</label>
          <input onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />

          <label htmlFor="password">Password</label>
          <input onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />

          <button type="submit">Login</button>

          <p className="auth-link">
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;