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

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

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
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-lg bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-[rgb(254,130,140)]">
          Account Settings
        </h1>

        {/* Email Display */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[rgb(254,130,140)]">Email Address</label>
          <input
            type="email"
            className="mt-1 p-3 border border-gray-700 rounded-md w-full shadow-sm bg-gray-800 text-white"
            value="exampleuser@example.com"
            readOnly
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Password Input */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-[rgb(254,130,140)]">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-700 rounded-md focus:outline-none bg-gray-800 text-white"
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-[rgb(254,130,140)]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-[rgb(254,130,140)]">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-3 border border-gray-700 rounded-md focus:outline-none bg-gray-800 text-white"
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-[rgb(254,130,140)]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "🙈"}
            </span>
          </div>

          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[rgb(254,130,140)] text-black rounded-md hover:bg-[rgb(240,110,120)] focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsSection;
