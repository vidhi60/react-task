import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    if (!email) temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) temp.email = "Invalid email format";
    if (!password) temp.password = "Password is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ✅ FINAL SAFE LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        setErrors({ general: err });
      });
  };

  // ❌ NO navigation here
  useEffect(() => {
    if (error) {
      setErrors({ general: error });
    }
  }, [error]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>LOGIN</h2>

        <form onSubmit={handleLogin} className="login-form">
          <div className="auth-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-icon1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {errors.general && (
            <p className="error center">{errors.general}</p>
          )}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          <div className="auth-divider"></div>
          <p className="auth-bottom-text">
            Not registered?{" "}
            <span onClick={() => navigate("/register")}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
