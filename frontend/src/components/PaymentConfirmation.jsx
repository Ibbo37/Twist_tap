import React, { useEffect, useState } from "react";

const PaymentConfirmation = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("userDetails");
    if (data) {
      setUserInfo(JSON.parse(data));
    }
  }, []);

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-black via-pink-500 to-black p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 max-w-5xl w-full flex flex-col md:flex-row font-sans">
        
        {/* Left Section */}
        <div className="md:w-1/2 w-full pr-0 md:pr-10 flex flex-col justify-start">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-black mb-4">
            Thank You, <span className="font-bold text-pink-600">{userInfo.name}!</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-4 font-semibold">
            Your payment has been successfully received. Here are your details:
          </p>

          <ul className="text-gray-700 text-lg md:text-lg space-y-4">
            {["Name", "Email", "Phone", "Paying for", "Amount"].map((field, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-center mb-1">
                  <span className="w-3 h-3 bg-pink-600 rounded-full mr-3"></span>
                  <span className="font-semibold text-pink-600">{field}:</span>
                </div>
                <span className="text-black font-medium ml-6 text-base">
                  {field === "Amount" ? `₹${userInfo.amount}` : userInfo[field.toLowerCase().replace(" ", "")]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full text-center flex flex-col justify-between mt-6 md:mt-0">
          
          {/* Payment Success Message */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg md:text-xl font-semibold shadow-md">
              Payment Successful ✅
            </div>
          </div>

          {/* Logo */}
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Nrityashakti_logo.jpg/150px-Nrityashakti_logo.jpg"
            alt="Nritya Shakti Foundation"
            className="w-24 md:w-32 h-24 md:h-32 object-contain mx-auto my-4"
          />

          {/* Twist'n Tap Text */}
          <h1
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black via-pink-500 to-black drop-shadow-md mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Twist'n Tap
          </h1>

          {/* Total Amount */}
          <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
            Total Paid: <span className="text-pink-600">₹{userInfo.amount}</span>
          </p>

          {/* Thank You Message */}
          <p className="text-gray-600 text-lg">
            🎉 Enjoy your session! You will receive a confirmation email shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
