// src/pages/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import axios from "axios";

import { login as saveLogin } from "../services/auth";
import loginAnimation from "../assets/login-animation.json";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
        }
      );

      saveLogin(res.data);
      navigate("/dashboard");
    } catch {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <Lottie animationData={loginAnimation} loop />
        </div>

        <div className="login-right">
          <span className="login-tag">Task Management Platform</span>

          <h1>Welcome Back 👋</h1>

          <p>
            Sign in to continue managing your projects, teams and sprint
            progress.
          </p>

          <div className="login-field">
            <label>Username</label>

            <input
              className="login-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Password</label>

            <div className="password-box">
              <input
                className="login-input password-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <div className="login-footer">
            New here?
            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}