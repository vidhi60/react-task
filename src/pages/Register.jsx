import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";



const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
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

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "hobby") {
      let hobbies = [...form.hobby];
      checked ? hobbies.push(value) : hobbies.splice(hobbies.indexOf(value), 1);
      setForm({ ...form, hobby: hobbies });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleHobbyChange = (value) => {
    setForm((prev) => ({
      ...prev,
      hobby: prev.hobby[0] === value ? [] : [value], // ek j allow
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(form).includes("")) {
      alert("all the fill details");
      return;
    }

    if (form.password !== form.confirm) {
      alert("Password not match");
      return;
    }


    const oldUsers = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = [...oldUsers, form];


    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Registration ");
    navigate("/");
  };


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        First Name
        <input name="fname" placeholder="" onChange={handleChange} />
        Middle Name
        <input name="mname" placeholder="" onChange={handleChange} />
        Last Name
        <input name="lname" placeholder="" onChange={handleChange} />

        <select name="city" onChange={handleChange}>
          <option value="">Select City</option>
          <option>Surat</option>
          <option>Ahmedabad</option>
          <option>Pune</option>
          <option>Vadodra</option>
        </select>

        <select name="state" onChange={handleChange}>
          <option value="">Select State</option>
          <option>Gujarat</option>
          <option>Maharashtra</option>
        </select>

        Hobby
        <div className="hobby-group">

          <div className={form.hobby.includes("Reading") ? "active" : ""}>
            <input
              type="checkbox"
              checked={form.hobby.includes("Reading")}
              onChange={() => handleHobbyChange("Reading")}
            />
            <span>Reading</span>
          </div>

          <div className={form.hobby.includes("Music") ? "active" : ""}>
            <input
              type="checkbox"
              checked={form.hobby.includes("Music")}
              onChange={() => handleHobbyChange("Music")}
            />
            <span>Music</span>
          </div>

        </div>

        Gender
        <div className="hobby-group1">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              checked={form.gender.includes("Male")}
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              checked={form.gender.includes("Female")}
            />
            Female
          </label>
        </div>


        <input name="phone" placeholder="Phone Number" onChange={handleChange} />
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          autoComplete="off"
          onChange={handleChange}
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            placeholder="Password"
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
            value={form.confirm}
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <span className="password-icon" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>


        <button onClick={handleSubmit} className="auth-btn">REGISTER</button>
      </div>
    </div>
  );
};

export default Register;
