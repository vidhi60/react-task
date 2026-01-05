import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
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

  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = storedUsers.filter((u) => u.id !== id);
  
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };
  
  
  
  const handleEdit = (index) => {
    navigate("/register", { state: { editIndex: index } });
  };
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Registered Users</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
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
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
  {users.length === 0 ? (
    <tr>
      <td colSpan="9" align="center">No Data Found</td>
    </tr>
  ) : (
    users.map((u, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{u.fname} {u.mname} {u.lname}</td>
        <td>{u.city}</td>
        <td>{u.state}</td>
        <td>{u.hobby.join(", ")}</td>
        <td>{u.gender}</td>
        <td>{u.phone}</td>
        <td>{u.email}</td>

        {/* Action Column */}
        <td>
  <span
    onClick={() => handleEdit(index)}
    style={{ cursor: "pointer", marginRight: 12, color: "#0b88a8" }}
  >
    <FaEdit />
  </span>

  <span
    onClick={() => handleDelete(u.id)}
    style={{ cursor: "pointer", color: "red" }}
  >
    <FaTrash />
  </span>
</td>

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
