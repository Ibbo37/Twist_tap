import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './resetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    
    setError('');
    setSuccess('');

    
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'PATCH',
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' ,
        },
        
        body: JSON.stringify({ password }),
      });
      console.log(document.cookie);
      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successful!');
        setTimeout(() => {
          navigate('/login-register');
        }, 2000); 
      } else {
        setError(data.message || 'Error resetting password');
      }
    } catch (error) {
      setError('Server error. Please try again later.');
      console.error(error.message);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="form-box">
        <h1 className="form-title">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className="input-field"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {password ? (showPassword ? '👁️' : '🙈') : '🙈'}
            </span>
          </div>

          <div className="input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="input-field"
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {confirmPassword ? (showConfirmPassword ? '👁️' : '🙈') : '🙈'}
            </span>
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
