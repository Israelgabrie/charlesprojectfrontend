import React, { useEffect, useState } from "react";
import "../css/signUp.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import the CSS for toast styling
import { addUser } from "../backendOperation";
import ClipLoader from "react-spinners/ClipLoader";

const SignUp = () => {
  const navigate = useNavigate();
  const [matricNumber, setMatricNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log({
      matricNumber,
      email,
      password,
      confirmPassword,
      adminCode,
    });
  }, [matricNumber, email, password, confirmPassword, adminCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const userObject = {
      idNumber: matricNumber,
      email,
      password,
      adminPassCode: adminCode,
    };

    setLoading(true);
    const response = await addUser(userObject);
    console.log(response)
    setLoading(false);

    if (response && !response.error) {
      toast.success("Account created successfully");
      setTimeout(()=>{
        navigate("/login");
      },3000)
    } else {
      toast.error(response?.error?.message || "Failed to create account");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1>Create an account</h1>
        <p className="subtitle">Please fill in the details to sign up</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="matric">Matric Number</label>
            <input
              onChange={(e) => setMatricNumber(e.target.value)}
              value={matricNumber}
              type="text"
              id="matric"
              placeholder="Enter your matric number"
              required
            />
          </div>

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
              onChange={(e) => setAdminCode(e.target.value)}
              value={adminCode}
              type="password"
              id="admin-code"
              placeholder="Enter admin passcode"
              required
            />
            <small className="helper-text">
              This ensures only administrators can create accounts
            </small>
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? <ClipLoader size={20} color="#fff" /> : "Sign Up"}
          </button>

          <div className="login-link" onClick={() => navigate("/login")}>
            Already have an account? <a href="/login">Back to Login</a>
          </div>
        </form>
      </div>

      {/* ✅ ToastContainer should be rendered */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignUp;
