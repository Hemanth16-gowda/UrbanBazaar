import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/forgotpassword.css";

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!otp.trim() || !newPassword.trim()) {
      setError("OTP and new password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/password-reset/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, newPassword }),
      });

      // Use text() to handle plain text responses
      const data = await response.text();

      if (response.ok) {
        setSuccessMessage(data); // Show the success message

        // Redirect to the login page after 2 seconds (optional delay for message display)
        setTimeout(() => {
          navigate("/"); // Redirect to login page
        }, 2000);
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
          <h1 className="reset-form-title">Reset Password</h1>

          {error && <p className="reset-error-message">{error}</p>}
          {successMessage && <p className="reset-success-message">{successMessage}</p>}

          <form onSubmit={handleResetPassword} className="reset-form-content">
            <div className="reset-form-group">
              <label htmlFor="otp" className="reset-form-label">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="reset-form-input"
              />
            </div>

            <div className="reset-form-group">
              <label htmlFor="newPassword" className="reset-form-label">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="reset-form-input"
              />
            </div>

            <button type="submit" className="reset-form-button">
              Reset Password
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
