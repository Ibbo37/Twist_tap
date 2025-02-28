import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsSection = ({ user }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "PATCH", 
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password changed successfully!");
        setTimeout(() => {
          navigate("/userdashboard"); 
        }, 2000);
      } else {
        setError(data.message || "Error changing password");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Account Settings</h1>

        {/* Email Display (Static for now) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full shadow-sm bg-gray-100"
            value="exampleuser@example.com"
            readOnly
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Password Input */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {password ? (showPassword ? "👁️" : "🙈") : "🙈"}
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {confirmPassword ? (showConfirmPassword ? "👁️" : "🙈") : "🙈"}
            </span>
          </div>

          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsSection;
