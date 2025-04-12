import React from "react";
import "../css/signUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const naviagte = useNavigate();

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1>Create an account</h1>
        <p className="subtitle">Please fill in the details to sign up</p>

        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="matric">Matric Number</label>
            <input
              type="text"
              id="matric"
              placeholder="Enter your matric number"
              required
            />
          </div>

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
              This ensures only administrators can create accounts
            </small>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          <div className="login-link" onClick={()=>{navigate("/login")}}>
            Already have an account? <a href="/login">Back to Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
