import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};

    if (!email) {
      temp.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      temp.email = "Invalid email format";
    }

    if (!password) {
      temp.password = "Password is required";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      localStorage.setItem("auth", true);
      navigate("/dashboard");
    } else {
      setErrors({ general: "Invalid email or password" });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form autoComplete="off" onSubmit={handleLogin}>
          <div className="auth-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="auth-group password-group1">
            <label>Password</label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="password-icon1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

            {errors.password && (
              <p className="error">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="error center">{errors.general}</p>
          )}

          <button type="submit" className="auth-btn">
            LOGIN
          </button>

          <div className="auth-links">
            <p>
              Not registered?{" "}
              <span onClick={() => navigate("/register")}>Sign Up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
