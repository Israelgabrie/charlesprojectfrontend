import React, { useState } from "react";
import "../css/adminSignUp.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser } from "../backendOperation";
import ClipLoader from "react-spinners/ClipLoader";

const AdminSignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminPassCode, setAdminPassCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const userObject = {
      email,
      password,
      adminPassCode,
    };

    setLoading(true);
    const response = await addUser(userObject);
    setLoading(false);

    if (response && !response.error) {
      toast.success("Admin account created successfully");
      setTimeout(() => navigate("/login"), 3000);
    } else {
      toast.error(response?.error?.message || "Failed to create admin account");
    }
  };

  return (
    <div className="admin-signup-container">
      <div className="admin-signup-form-container">
        <h1>Admin Registration</h1>
        <p className="subtitle">Create an administrator account</p>

        <form className="admin-signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-code">Admin Passcode</label>
            <input
              onChange={(e) => setAdminPassCode(e.target.value)}
              value={adminPassCode}
              type="password"
              id="admin-code"
              placeholder="Enter admin passcode"
              required
            />
            <small className="helper-text">
              This ensures only authorized personnel can create admin accounts
            </small>
          </div>

          <button type="submit" className="admin-signup-button" disabled={loading}>
            {loading ? <ClipLoader size={20} color="#fff" /> : "Create Admin Account"}
          </button>

          <div className="login-link">
            Already have an account? <a href="/login">Back to Login</a>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminSignUp;
