import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      setForm(users[editIndex]);
    }
  }, [isEdit, editIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleHobbyChange = (value) => {
    setForm((prev) => ({
      ...prev,
      hobby: prev.hobby[0] === value ? [] : [value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isEdit) {
      users[editIndex] = {
        ...users[editIndex],
        ...form,
        password: users[editIndex].password,
        confirm: users[editIndex].confirm,
      };
      localStorage.setItem("users", JSON.stringify(users));
      alert("User updated successfully");
      navigate("/dashboard");
    } else {
      if (Object.values(form).includes("")) {
        alert("Please fill all details");
        return;
      }

      if (form.password !== form.confirm) {
        alert("Password not match");
        return;
      }

      users.push(form);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful");
      navigate("/");
    }
  };

  return (
    <div className="auth-layout">
      {/* LEFT PANEL */}
      <div className="auth-left">
        <div className="hexagon">
          <img src="/logo2.png" alt="Company Logo" className="logo-img" />
        </div>
      </div>

      {/* RIGHT PANEL */}
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

          {/* Hobby */}
          <label>Hobby</label>
          <div className="hobby-group">
            <label className={`hobby-box ${form.hobby.includes("Reading") ? "active" : ""}`}>
              <input type="checkbox" checked={form.hobby.includes("Reading")} onChange={() => handleHobbyChange("Reading")} />
              <span>Reading</span>
            </label>

            <label className={`hobby-box ${form.hobby.includes("Music") ? "active" : ""}`}>
              <input type="checkbox" checked={form.hobby.includes("Music")} onChange={() => handleHobbyChange("Music")} />
              <span>Music</span>
            </label>
          </div>

          {/* Gender */}
          <label>Gender</label>
          <div className="gender-group">
            <label className="gender-box">
              <input type="radio" name="gender" value="Male" checked={form.gender === "Male"} onChange={handleChange} />
              <span>Male</span>
            </label>

            <label className="gender-box">
              <input type="radio" name="gender" value="Female" checked={form.gender === "Female"} onChange={handleChange} />
              <span>Female</span>
            </label>
          </div>

          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />

          {/* Password */}
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

          <button className="auth-btn" onClick={handleSubmit}>
            {isEdit ? "UPDATE" : "REGISTER"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
