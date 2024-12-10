import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/v1/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Registration successful! Redirecting to login...");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Create Account</h1>
        <p className="login-subtitle">Join us and start your journey</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Register
          </button>
        </form>
        <p className="register-prompt">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="register-link">
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
