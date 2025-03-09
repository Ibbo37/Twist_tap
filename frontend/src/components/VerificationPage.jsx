import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
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
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ verify: enteredCode }),
        });

        const data = await response.json();
        if (response.ok) {
          navigate('/login-register');
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-pink-400 text-2xl font-semibold mb-4">Verify Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            {code.map((num, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 bg-gray-700 border-2 border-pink-400 text-pink-400 text-xl text-center font-medium rounded-md focus:outline-none focus:border-pink-300 transition-all"
                value={num}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button type="submit" className="w-full py-2 bg-pink-400 text-black font-semibold text-lg rounded-md transition-all hover:bg-pink-300">
            Verify
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default VerificationPage;
