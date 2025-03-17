import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './assets/styles.css';

export default function VerificationPage() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; // Get email from navigation state

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError('Email is missing. Please register again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/api/users/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Email verified successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/'); // Redirect to login page
        }, 2000);
      } else {
        throw new Error(data.error || 'OTP verification failed');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1 className="form-title">Verify OTP</h1>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleVerifyOtp} className="form-content">
          <div className="form-group">
            <label htmlFor="otp" className="form-label">Enter OTP</label>
            <input
              id="otp"
              type="text"
              placeholder="Enter the OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">Verify OTP</button>
        </form>
        <p className="form-footer">
          Didn't receive OTP? <a href="/register" className="form-link">Register again</a>
        </p>
      </div>
    </div>
  );
}
