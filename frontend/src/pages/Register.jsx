import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";

import loginAnimation from "../assets/login-animation2.json";
import "./Login.css";

export default function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "EMPLOYEE",
    department: "ENGINEERING",
    designation: "FRONTEND_DEVELOPER",
    team: "Frontend Team"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {

    if (
      !form.fullName ||
      !form.username ||
      !form.email ||
      !form.phone ||
      !form.password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/api/auth/register",
        form
      );

      alert("Registration Successful");

      navigate("/");

    } catch (err) {

      console.log(err);

      alert("Registration Failed");

    }

  };

  return (

    <div className="login-page">

      <div className="login-card shadow-lg">

        <div className="login-left">

          <Lottie
            animationData={loginAnimation}
            loop={true}
          />

        </div>

        <div className="login-right">

          <h2>Create Account 🚀</h2>

          <p className="text-muted mb-4">
            Register to join Jira Enterprise.
          </p>

          <div className="mb-3">
            <label className="form-label">Full Name</label>

            <input
              type="text"
              className="form-control"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>

            <input
              type="text"
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>

            <input
              type="text"
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
          </div>

          <div className="mb-3">

            <label className="form-label">Password</label>

            <div className="input-group">

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🔒" : "👀"}
              </button>

            </div>

          </div>

          <div className="mb-3">

            <label className="form-label">Role</label>

            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="MANAGER">Manager</option>
            </select>

          </div>

          <div className="mb-3">

            <label className="form-label">Department</label>

            <select
              className="form-select"
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option value="ENGINEERING">Engineering</option>
              <option value="DEVOPS">DevOps</option>
              <option value="QA">QA</option>
              <option value="DESIGN">Design</option>
              <option value="PRODUCT">Product</option>
              <option value="DATA">Data</option>
              <option value="HR">HR</option>
            </select>

          </div>

          <div className="mb-3">

            <label className="form-label">Designation</label>

            <select
              className="form-select"
              name="designation"
              value={form.designation}
              onChange={handleChange}
            >
              <option value="FRONTEND_DEVELOPER">Frontend Developer</option>
              <option value="BACKEND_DEVELOPER">Backend Developer</option>
              <option value="FULLSTACK_DEVELOPER">Full Stack Developer</option>
              <option value="DEVOPS_ENGINEER">DevOps Engineer</option>
              <option value="QA_ENGINEER">QA Engineer</option>
              <option value="UI_UX_DESIGNER">UI / UX Designer</option>
              <option value="ANDROID_DEVELOPER">Android Developer</option>
              <option value="IOS_DEVELOPER">iOS Developer</option>
              <option value="DATA_ENGINEER">Data Engineer</option>
              <option value="ML_ENGINEER">ML Engineer</option>
              <option value="PRODUCT_MANAGER">Product Manager</option>
            </select>

          </div>

          <div className="mb-4">

            <label className="form-label">Team</label>

            <input
              type="text"
              className="form-control"
              name="team"
              value={form.team}
              onChange={handleChange}
              placeholder="Example: Backend Team"
            />

          </div>

          <button
            className="btn btn-success w-100"
            onClick={register}
          >
            Register
          </button>

          <p className="text-center mt-4">

            Already have an account?

            <Link to="/" className="ms-2">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}