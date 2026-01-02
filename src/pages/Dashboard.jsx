import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(data);
  }, []);

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Registered Users</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>City</th>
              <th>State</th>
              <th>Hobby</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="8" align="center">
                  No Data Found
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{u.fname} {u.mname} {u.lname}</td>
                  <td>{u.city}</td>
                  <td>{u.state}</td>
                  <td>{Array.isArray(u.hobby) ? u.hobby.join(", ") : u.hobby}</td>
                  <td>{u.gender}</td>
                  <td>{u.phone}</td>
                  <td>{u.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
