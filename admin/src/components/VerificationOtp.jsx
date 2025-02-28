import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './verification.css'; 


const VerificationOtp = () => {
  const [code, setCode] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newCode = [...code];
      if (code[index] === '') {
        if (index > 0) {
          inputsRef.current[index - 1].focus();
        }
      } else {
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredCode = code.join('');
    if (enteredCode.length === 6) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/verifyOtp', {
          method: 'POST',
          credentials:"include",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ verifyOtp: enteredCode }),
        });

        const data = await response.json();
        if (response.ok) {
          navigate('/reset-password');
        } else {
          setError(data.message || 'Verification failed');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Server error. Please try again later.');
      }
    } else {
      setError('Please enter a 6-digit code');
    }
  };

  return (
    <div className="verification-container">
      <div className="form-box">
        <h1 className="form-title">Verify Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            {code.map((num, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputsRef.current[index] = el)}
                className="code-input"
                value={num}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button type="submit" className="submit-button">
            Verify
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default VerificationOtp;
