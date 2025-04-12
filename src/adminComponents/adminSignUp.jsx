import React from "react";
import "../css/adminSignUp.css";

const AdminSignUp = () => {
  return (
    <div className="admin-signup-container">
      <div className="admin-signup-form-container">
        <h1>Admin Registration</h1>
        <p className="subtitle">Create an administrator account</p>

        <form className="admin-signup-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-code">Admin Passcode</label>
            <input
              type="password"
              id="admin-code"
              placeholder="Enter admin passcode"
              required
            />
            <small className="helper-text">
              This ensures only authorized personnel can create admin accounts
            </small>
          </div>

          <button type="submit" className="admin-signup-button">
            Create Admin Account
          </button>

          <div className="login-link">
            Already have an account? <a href="/login">Back to Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignUp;
