import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/forgotpassword.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();  // Hook for navigation

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/password-reset/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.text(); // Using `text()` instead of `json()`

      if (response.ok) {
        setSuccessMessage(data); // Display the success message

        // Redirect the user to the next page (e.g., Reset Password Page)
        setTimeout(() => {
          navigate("/reset-password"); // Redirect to Reset Password page
        }, 2000); // Optional: delay for 2 seconds before redirecting
      } else {
        throw new Error(data || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    }
  };

  return (
    <div className="reset-page-layout">
      <div className="reset-page-container">
        <div className="reset-form-container">
          <h1 className="reset-form-title">Forgot Password</h1>

          {error && <p className="reset-error-message">{error}</p>}
          {successMessage && <p className="reset-success-message">{successMessage}</p>}

          <form onSubmit={handleForgotPassword} className="reset-form-content">
            <div className="reset-form-group">
              <label htmlFor="email" className="reset-form-label">
                Enter your email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="reset-form-input"
              />
            </div>

            <button type="submit" className="reset-form-button">
              Send OTP
            </button>
          </form>

          <div className="reset-form-footer">
            <a href="/login" className="reset-form-link">
              Remember your password? Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
