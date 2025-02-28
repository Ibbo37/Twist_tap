import React, { useState } from "react";
import axios from "axios"; // ✅ Import axios

const ApplicationForm = () => {
  const [programDuration, setProgramDuration] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    city: "",
    personalStatement: "",
    statementOfPurpose: "",
    programDuration: "",
  });

  // Handle dropdown selection
  const handleSelect = (value) => {
    setProgramDuration(value);
    setFormData({ ...formData, programDuration: value }); // ✅ Sync with formData
    setIsDropdownOpen(false);
  };

  const [message, setMessage] = useState("");
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admission/submit-admission",
        formData
      );
      setMessage(response.data.message);

     
      setFormData({
        fullName: "",
        age: "",
        email: "",
        phone: "",
        city: "",
        personalStatement: "",
        statementOfPurpose: "",
        programDuration: "",
      });
      setProgramDuration("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center p-[150px]">
      <div className="bg-white shadow-xl rounded-xl p-16 w-full max-w-6xl mx-auto transition-all duration-300 ease-in-out transform hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Admission Form
        </h1>
        <form className="space-y-12" onSubmit={handleSubmit}>
          {/* Full Name and Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-700 font-medium mb-4">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-8 border-2 border-pink-300 rounded-xl shadow-md focus:ring focus:outline-none focus:ring-pink-300 focus:border-pink-500 text-gray-800 bg-white transition-all duration-300 ease-in-out"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-4">Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-8 border-2 focus:outline-none border-pink-300 rounded-xl shadow-md focus:ring focus:ring-pink-300 focus:border-pink-500 text-gray-800 bg-white transition-all duration-300 ease-in-out"
                placeholder="Enter your age"
                required
              />
            </div>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-700 font-medium mb-4">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-8 border-2 focus:outline-none border-pink-300 rounded-xl shadow-md focus:ring focus:ring-pink-300 focus:border-pink-500 text-gray-800 bg-white transition-all duration-300 ease-in-out"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-4">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-8 border-2 focus:outline-none border-pink-300 rounded-xl shadow-md focus:ring focus:ring-pink-300 focus:border-pink-500 text-gray-800 bg-white transition-all duration-300 ease-in-out"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium mb-4">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-8 border-2 focus:outline-none border-pink-300 rounded-xl shadow-md focus:ring focus:ring-pink-300 focus:border-pink-500 text-gray-800 bg-white transition-all duration-300 ease-in-out"
              placeholder="Enter your city"
              required
            />
          </div>

          {/* Personal Statement */}
          <div>
            <label className="block text-gray-700 font-medium mb-4">Personal Statement *</label>
            <textarea
              name="personalStatement"
              value={formData.personalStatement}
              onChange={handleChange}
              className="w-full p-8 border-2 focus:outline-none border-pink-300 rounded-xl shadow-md focus:ring focus:ring-pink-300 focus:border-pink-500 text-gray-800 bg-white transition-all duration-300 ease-in-out"
              rows="6"
              placeholder="Tell us a little bit about yourself!"
              required
            ></textarea>
          </div>

          {/* Statement of Purpose */}
          <div>
            <label className="block text-gray-700 font-medium mb-4">Statement of Purpose *</label>
            <textarea
              name="statementOfPurpose"
              value={formData.statementOfPurpose}
              onChange={handleChange}
              className="w-full p-8 border-2 focus:outline-none border-pink-300 rounded-xl shadow-md focus:ring focus:ring-pink-300 focus:border-pink-500 text-gray-800 bg-white transition-all duration-300 ease-in-out"
              rows="6"
              placeholder="Tell us why you would like to join this program"
              required
            ></textarea>
          </div>

          {/* Program Duration */}
          <div>
            <label className="block text-gray-700 font-medium mb-4">Program Duration *</label>
            <select
              value={programDuration}
              onChange={(e) => handleSelect(e.target.value)}
              className="w-full p-6 border-2 border-pink-300 rounded-xl shadow-md focus:ring focus:ring-pink-300 focus:border-pink-500 text-gray-800 bg-white transition-all duration-300 ease-in-out"
              required
            >
              <option value="" disabled>Choose an option</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="9">9 Months</option>
              <option value="12">12 Months</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button type="submit" className="bg-pink-600 text-white px-24 py-6 rounded-xl shadow-lg hover:bg-pink-700 transition-all duration-300 ease-in-out transform hover:scale-110">
              Submit
            </button>
          </div>
          {message && (
            <p className="text-center text-gray-600 mt-4">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
