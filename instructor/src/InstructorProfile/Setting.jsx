import React from "react";

function Setting() {
  // Function to show alert
  const handleSubmit = () => {
    alert("Password updated successfully!");
  };

  return (
    <div className="flex flex-col self-start items-center justify-center p-6 relative h-screen w-[1100px] bg-gray-100 text-gray-900 translate-x-[180px] gap-10 overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] h-[300px]">
        <h2 className="text-2xl font-semibold text-center mb-6">Account Settings</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-black mb-1 translate-x-[20px]">Email Address</label>
          <input
            type="email"
            className="w-[90%] px-4 py-2 border border-gray-300 rounded-md h-10 translate-x-[18px]"
            placeholder="Enter your email"
          />
        </div>

        {/* New Password Field */}
        <div className="mb-4 relative">
          <label className="block text-black  mb-1 translate-x-[18px]">New Password</label>
          <input
            type="password"
            placeholder="Enter your new password"
            className="w-[90%] px-4 py-2 border border-gray-300 rounded-md h-10 translate-x-[20px]"
          />
          <span className="absolute right-12 top-7 text-xl">🙈</span>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4 relative">
          <label className="block text-black mb-1 translate-x-[18px]">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your new password"
            className="w-[90%] px-4 py-2 border border-gray-300 rounded-md h-10 translate-x-[20px]"
          />
          <span className="absolute right-12 top-7 text-xl">🙈</span>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="absolute top-115 w-[50%] bg-[#fe828c] text-white py-2 rounded-md font-semibold hover:bg-[#ff9eab] transition h-10 translate-x-[20px]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Setting;
