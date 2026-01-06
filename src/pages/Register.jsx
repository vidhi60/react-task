import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // 🔹 ORIGINAL DATA (edit compare)
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
    setForm((prev) => {
      const exists = prev.hobby.includes(value);
      return {
        ...prev,
        hobby: exists
          ? prev.hobby.filter((h) => h !== value)
          : [...prev.hobby, value],
      };
    });
  };

  // 🔹 CHECK IF FORM CHANGED (EDIT MODE)
  const isFormChanged = () => {
    if (!initialForm) return false;
    return JSON.stringify(form) !== JSON.stringify(initialForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // EDIT
    if (isEdit) {
      users[editIndex] = {
        ...users[editIndex],
        ...form,
        password: users[editIndex].password,
        confirm: users[editIndex].confirm,
      };
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("User updated successfully");
      setTimeout(() => navigate("/dashboard"), 1500);
      return;
    }

    // VALIDATION
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

    if (form.password !== form.confirm) {
      toast.error("Password not match");
      return;
    }

  
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Registration successful");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="auth-layout">
      {/* LEFT */}
      <div className="auth-left">
        <div className="hexagon">
          <img src="/logo2.png" alt="Company Logo" className="logo-img" />
        </div>
      </div>

      {/* RIGHT */}
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

          {/* HOBBY */}
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
          <input name="email" placeholder="Email" value={form.email} disabled={isEdit} onChange={handleChange} />

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

          <ToastContainer
            position="top-right"
            autoClose={false}
            hideProgressBar={true}
            closeOnClick
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
