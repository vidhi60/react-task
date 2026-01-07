import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, deleteUser } from "../store/userSlice";
import { logout } from "../store/authSlice";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.list);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });

  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (index) => {
    navigate("/register", { state: { editIndex: index } });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Registered Users</h2>
        <button className="logout-btn" onClick={handleLogout}>
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
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="9" align="center">
                  No Data Found
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr key={u.id}>
                  <td>{index + 1}</td>
                  <td>{u.fname} {u.mname} {u.lname}</td>
                  <td>{u.city}</td>
                  <td>{u.state}</td>
                  <td>{u.hobby.join(", ")}</td>
                  <td>{u.gender}</td>
                  <td>{u.phone}</td>
                  <td>{u.email}</td>

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
