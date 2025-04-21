import React, { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../backendOperation";
import { ToastContainer,toast } from "react-toastify";
import { useUser } from "../userContext";

const Login = () => {
  const {user,setUser} = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await checkUser(formData);
    setLoading(false);

    if (response.error) {
      toast.error(response.error.message || "Login failed");
    } else if (response.user) {
      toast.success("Login successful");
      setUser(response.user)
      if (response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/homepage/home");
      }
    } else {
      toast.error("No User Found...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer/>
      <div className="login-form-container">
        <h1>Welcome back</h1>
        <p className="subtitle">Please enter your details to sign in</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="signup-link" onClick={() => navigate("/signUp")}>
            Don't have an account? <a href="#">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
