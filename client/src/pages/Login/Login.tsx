import "./style.css";
import log from "../../../assets/icons/log.svg";
import React, { useState } from "react";
import register from "../../../assets/icons/register.svg";
import { User, Lock, Mail, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInRole, setSignInRole] = useState("");
  const [signUpRole, setSignUpRole] = useState("");
  const navigate = useNavigate();

  // Function to navigate based on selected role
  const navigateToRoleDashboard = (role: string) => {
    switch (role) {
      case "student":
        navigate("/student2");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "faculty":
        navigate("/teacher");
        break;
      default:
        alert("Please select a role to continue");
    }
  };

  // Handle Sign In form submission
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInRole) {
      alert("Please select a role");
      return;
    }
    navigateToRoleDashboard(signInRole);
  };

  // Handle Sign Up form submission
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpRole) {
      alert("Please select a role");
      return;
    }
    navigateToRoleDashboard(signUpRole);
  };

  return (
    <div className={`login-container ${isSignUp ? "login-sign-up-mode" : ""}`}>
      <div className="login-forms-container">
        <div className="login-signin-signup">
          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="login-sign-in-form">
            <h2 className="login-title">Sign in</h2>
            <div className="login-input-field">
              <div className="login-icon-wrapper">
                <User size={20} />
              </div>
              <input type="text" placeholder="Username" />
            </div>
            <div className="login-input-field">
              <div className="login-icon-wrapper">
                <Lock size={20} />
              </div>
              <input type="password" placeholder="Password" />
            </div>
            <div className="login-input-field">
              <div className="login-icon-wrapper">
                <ChevronDown size={20} />
              </div>
              <select
                value={signInRole}
                onChange={(e) => setSignInRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>
            <input type="submit" value="Login" className="login-btn login-solid" />
          </form>

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="login-sign-up-form">
            <h2 className="login-title">Sign up</h2>
            <div className="login-input-field">
              <div className="login-icon-wrapper">
                <User size={20} />
              </div>
              <input type="text" placeholder="Username" />
            </div>
            <div className="login-input-field">
              <div className="login-icon-wrapper">
                <Mail size={20} />
              </div>
              <input type="email" placeholder="Email" />
            </div>
            <div className="login-input-field">
              <div className="login-icon-wrapper">
                <Lock size={20} />
              </div>
              <input type="password" placeholder="Password" />
            </div>
            <div className="login-input-field">
              <div className="login-icon-wrapper">
                <ChevronDown size={20} />
              </div>
              <select
                value={signUpRole}
                onChange={(e) => setSignUpRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>
            <input type="submit" className="login-btn" value="Sign up" />
          </form>
        </div>
      </div>

      {/* Panels */}
      <div className="login-panels-container">
        <div className="login-panel login-left-panel">
          <div className="login-content">
            <h3>New here?</h3>
            <p>
              Join us today! Enter your personal details and start your journey
              with us.
            </p>
            <button
              className="login-btn login-transparent"
              onClick={() => setIsSignUp(true)}
            >
              Sign up
            </button>
          </div>
          <img src={log} className="login-image" alt="" />
        </div>

        <div className="login-panel login-right-panel">
          <div className="login-content">
            <h3>One of us?</h3>
            <p>
              If you already have an account, just sign in. We've missed you!
            </p>
            <button
              className="login-btn login-transparent"
              onClick={() => setIsSignUp(false)}
            >
              Sign in
            </button>
          </div>
          <img src={register} className="login-image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
