import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VerVerificationOtp = () => {
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
          credentials: 'include',
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-pink-500 mb-4">Verify Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-4">
            {code.map((num, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 text-xl text-center border-2 border-pink-500 rounded-md outline-none focus:border-pink-300"
                value={num}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button type="submit" className="w-full py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-400 transition">
            Verify
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default VerVerificationOtp;
