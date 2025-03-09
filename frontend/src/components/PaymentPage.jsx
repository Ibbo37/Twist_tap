import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    payingFor: "",
  });

  const [loading, setLoading] = useState(false); // Track API request state
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleClick = () => {
    if (!loading && !Object.values(formData).some((field) => !field)) {
      navigate("/payments");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    const userInfo = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      amount: formData.amount,
      payingFor: formData.payingFor,
    };

    localStorage.setItem("userDetails", JSON.stringify(userInfo));
    try {
      const res = await fetch("http://localhost:5000/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 200) {

        alert("Payment initiated successfully!");
        // Redirect to Payment Confirmation Page
        navigate("/paymentconfirmation"); // Add navigation here
      } else {
        alert(`Error: ${data.message || "Something went wrong!"}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-black via-pink-500 to-black flex flex-col">
      {/* Header Section */}
      <header className="w-full bg-white shadow-2xl py-6 px-6 lg:px-16 flex items-center justify-start space-x-6">
        <img src="/path/to/placeholder-logo.png" alt="Twist'n Tap Logo" className="h-16 mt-4" />
        <h1
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black via-pink-500 to-black drop-shadow-md"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Twist'n Tap{" "}
          <span className="text-black" style={{ fontFamily: "'Raleway', sans-serif" }}>
            Dance Studio
          </span>
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 lg:px-20 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-[95vw]">
        {/* Left Section: Pricing Plans */}
        <div className="bg-white p-12 rounded-lg shadow-2xl flex flex-col space-y-10 w-full">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-md">
            In-Studio Classes
          </h2>
          <div className="space-y-10">
            {/* Regular Plans */}
            <div className="p-6 rounded-lg bg-gradient-to-r from-pink-200 to-pink-400 text-white shadow-md">
              <h3 className="text-3xl font-bold mb-2">Regular Plans</h3>
              <ul className="text-lg space-y-2">
                <li>Drop-ins - <span className="font-bold">INR 690</span></li>
                <li>Regular Batch (4 Classes) - <span className="font-bold">INR 2,500</span></li>
                <li>Regular Batch (8 Classes) - <span className="font-bold">INR 4,800</span></li>
              </ul>
            </div>

            {/* Open Class Plans */}
            <div className="p-6 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500 text-white shadow-md">
              <h3 className="text-3xl font-bold mb-2">Open Class Plans</h3>
              <ul className="text-lg space-y-2">
                <li>5 Classes (1 Month) - <span className="font-bold">INR 3,000</span></li>
                <li>10 Classes (1 Month) - <span className="font-bold">INR 5,700</span></li>
                <li>20 Classes (2 Months) - <span className="font-bold">INR 9,440</span></li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-r from-pink-300 to-purple-400 text-white shadow-md">
              <h3 className="text-3xl font-bold mb-2">Intensive Training Program</h3>
              <ul className="text-lg space-y-2">
                <li>1 Month - <span className="font-bold">INR 24,200</span></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="mt-6 text-lg text-gray-700">
              <p>
                Contact us: <span className="font-bold text-black">9702662960</span>
              </p>
              <p>
                Email: <span className="font-bold text-black">studio@twistntap.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Payment Form */}
        <div className="bg-white p-16 rounded-lg shadow-2xl flex flex-col space-y-10 w-full">
          <h2 className="text-4xl font-bold text-gray-800">Payment Details</h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-medium text-lg">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-4 text-black focus:ring-2 focus:ring-pink-500 focus:outline-none text-lg placeholder-gray-400"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-medium text-lg">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-4 text-black focus:ring-2 focus:ring-pink-500 focus:outline-none text-lg placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-gray-700 font-medium text-lg">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                className="w-full border border-gray-300 rounded-lg p-4 text-black focus:ring-2 focus:ring-pink-500 focus:outline-none text-lg placeholder-gray-400"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Paying For Input */}
            <div>
              <label className="block text-gray-700 font-medium text-lg">Paying for</label>
              <input
                type="text"
                name="payingFor"
                value={formData.payingFor}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-4 text-black focus:ring-2 focus:ring-pink-500 focus:outline-none text-lg placeholder-gray-400"
                placeholder="E.g., 1-month program"
              />
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-gray-700 font-medium text-lg">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-4 text-black focus:ring-2 focus:ring-pink-500 focus:outline-none text-lg placeholder-gray-400"
                placeholder="Enter amount"
              />
            </div>

            <button
              type="submit"
              disabled={loading || Object.values(formData).some((field) => !field)}
              onClick={handleClick}
              className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out text-lg 
      ${loading || Object.values(formData).some((field) => !field) ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700 text-white"}`}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </main>
      <footer className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-black text-white py-8 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-lg">© 2025 Twist'n Tap Dance Studio. All rights reserved.</p>
          <p className="text-sm mt-2">Making Dance Accessible for All Levels</p>
          <p className="text-xs mt-2">
            You agree to share information entered on this page with Nritya Shakti Foundation (owner of this page) and Easebuzz, adhering to applicable laws.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PaymentPage;
