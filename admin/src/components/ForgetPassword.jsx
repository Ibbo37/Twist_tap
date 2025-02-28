import React, { useState } from 'react';
import './ForgetPassword.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate email input
    if (!email) {
      setError('Please enter your email');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgetpassword', {
        method: 'POST',
        credentials: 'include', // Sends cookies with request
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json(); // Parse the JSON response
  
      if (response.ok) {
        // Navigate to OTP verification page on success
        navigate('/verification-otp');
      } else {
        // Display error message from backend
        setError(data.message || 'Error sending the email. Please try again.');
      }
    } catch (error) {
      // Handle fetch errors
      
      setError('An unexpected error occurred. Please try again.');
    }
  };
  
  return (
    <div className="forgot-password-container">
      <div className="form-box">
        <h1 className="form-title">Forgot Your Password?</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="input-field"
            />
          </div>
          
          <button type="submit" className="submit-button">
            Send Reset Link
          </button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ForgetPassword;
