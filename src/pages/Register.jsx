import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const editIndex = location.state?.editIndex;
  const isEdit = editIndex !== undefined;

  const [form, setForm] = useState({
    id: Date.now(),
    fname: "",
    mname: "",
    lname: "",
    city: "",
    state: "",
    hobby: [],
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [initialForm, setInitialForm] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      setForm(users[editIndex]);
      setInitialForm(users[editIndex]);
    }
  }, [isEdit, editIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleHobbyChange = (value) => {
    setForm((prev) => ({
      ...prev,
      hobby: prev.hobby.includes(value)
        ? prev.hobby.filter((h) => h !== value)
        : [...prev.hobby, value],
    }));
  };

  const isFormChanged = () =>
    initialForm && JSON.stringify(form) !== JSON.stringify(initialForm);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (
      !form.fname ||
      !form.mname ||
      !form.lname ||
      !form.city ||
      !form.state ||
      !form.gender ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !form.confirm ||
      form.hobby.length === 0
    ) {
      toast.error("Please fill all details");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (form.phone.length !== 10) {
      toast.error("Mobile number must be 10 digits");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Password not match");
      return;
    }

    if (isEdit) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users[editIndex] = { ...users[editIndex], ...form };
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("User updated successfully");
      setTimeout(() => navigate("/dashboard", { replace: true }), 1500);
      return;
    }


    dispatch(registerUser(form))
      .unwrap()
      .then(() => {
        toast.success("Registration successful");
        setTimeout(() => navigate("/", { replace: true }), 1500);
      })
      .catch(() => {
        toast.error("Registration failed");
      });
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="hexagon">
          <img src="/logo2.png" alt="Company Logo" className="logo-img" />
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>{isEdit ? "EDIT USER" : "REGISTER"}</h2>

          <input name="fname" placeholder="First Name" value={form.fname} onChange={handleChange} />
          <input name="mname" placeholder="Middle Name" value={form.mname} onChange={handleChange} />
          <input name="lname" placeholder="Last Name" value={form.lname} onChange={handleChange} />

          <select name="city" value={form.city} onChange={handleChange}>
            <option value="">Select City</option>
            <option>Surat</option>
            <option>Ahmedabad</option>
            <option>Pune</option>
            <option>Vadodra</option>
          </select>

          <select name="state" value={form.state} onChange={handleChange}>
            <option value="">Select State</option>
            <option>Gujarat</option>
            <option>Maharashtra</option>
          </select>

          <label>Hobby</label>
          <div className="hobby-group">
            {["Reading", "Music", "Sports", "Travel"].map((h) => (
              <label key={h} className={`hobby-box ${form.hobby.includes(h) ? "active" : ""}`}>
                <input
                  type="checkbox"
                  checked={form.hobby.includes(h)}
                  onChange={() => handleHobbyChange(h)}
                />
                <span>{h}</span>
              </label>
            ))}
          </div>

          <label>Gender</label>
          <div className="gender-group">
            {["Male", "Female"].map((g) => (
              <label key={g} className="gender-box">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                />
                <span>{g}</span>
              </label>
            ))}
          </div>

          
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            maxLength={10}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
              setForm({ ...form, phone: onlyNumbers });
            }}
          />

       
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            disabled={isEdit}
            onChange={handleChange}
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              disabled={isEdit}
              onChange={handleChange}
            />
            <span className="password-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="password-container">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirm"
              placeholder="Confirm Password"
              value={form.confirm}
              disabled={isEdit}
              onChange={handleChange}
            />
            <span className="password-icon" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            className="auth-btn"
            onClick={handleSubmit}
            disabled={isEdit && !isFormChanged()}
          >
            {isEdit ? "UPDATE" : "REGISTER"}
          </button>

          <div className="auth-divider"></div>
          <p className="auth-bottom-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Login</span>
          </p>

          <ToastContainer hideProgressBar />
        </div>
      </div>
    </div>
  );
};

export default Register;
