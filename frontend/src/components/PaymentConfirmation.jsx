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
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-black via-pink-500 to-black">
      <div className="bg-white shadow-2xl rounded-2xl p-16 w-[1200px] h-[800px] flex font-sans">
        
        {/* Left Section */}
        <div className="w-1/2 pr-12 flex flex-col justify-start">
          <div>
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-black mb-6">
              Hello, <span className="font-bold text-pink-600">{userInfo.name}</span>
            </h2>
            <p className="text-gray-600 text-2xl mb-6 font-semibold">Please confirm your information:</p>
          </div>
          
          <div className="space-y-8"> {/* Increased space between items */}
            <ul className="text-gray-700 text-xl md:text-2xl pl-8 list-none">
              <li className="flex flex-col mb-6">
                <div className="flex items-center mb-2">
                  <span className="w-3 h-3 bg-pink-600 rounded-full mr-6"></span>
                  <span className="font-semibold text-pink-600">Name:</span>
                </div>
                <span className="text-black font-medium ml-4 text-lg md:text-xl">{userInfo.name}</span>
              </li>
              <li className="flex flex-col mb-6">
                <div className="flex items-center mb-2">
                  <span className="w-3 h-3 bg-pink-600 rounded-full mr-6"></span>
                  <span className="font-semibold text-pink-600">Email:</span>
                </div>
                <span className="text-black font-medium ml-4 text-lg md:text-xl">{userInfo.email}</span>
              </li>
              <li className="flex flex-col mb-6">
                <div className="flex items-center mb-2">
                  <span className="w-3 h-3 bg-pink-600 rounded-full mr-6"></span>
                  <span className="font-semibold text-pink-600">Phone:</span>
                </div>
                <span className="text-black font-medium ml-4 text-lg md:text-xl">{userInfo.phone}</span>
              </li>
              <li className="flex flex-col mb-6">
                <div className="flex items-center mb-2">
                  <span className="w-3 h-3 bg-pink-600 rounded-full mr-6"></span>
                  <span className="font-semibold text-pink-600">Paying for:</span>
                </div>
                <span className="text-black font-medium ml-4 text-lg md:text-xl">{userInfo.payingFor}</span>
              </li>
              <li className="flex flex-col mb-6">
                <div className="flex items-center mb-2">
                  <span className="w-3 h-3 bg-pink-600 rounded-full mr-6"></span>
                  <span className="font-semibold text-pink-600">Amount:</span>
                </div>
                <span className="text-black font-medium ml-4 text-lg md:text-xl">₹{userInfo.amount}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 pl-12 text-center flex flex-col justify-between">
          {/* Easebuzz Button - positioned in the right corner */}
          <div className="flex justify-end mb-6">
            <div className="bg-pink-600 text-white px-6 py-3 rounded-lg text-xl font-semibold">
              Easebuzz
            </div>
          </div>
          
          {/* Logo - Centered */}
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Nrityashakti_logo.jpg/150px-Nrityashakti_logo.jpg"
            alt="Nritya Shakti Foundation"
            className="w-36 h-36 object-contain mx-auto mb-6"
          />
          
          {/* Twist'n Tap Text - Custom Font and Style */}
          <h1
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black via-pink-500 to-black drop-shadow-md mb-6"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Twist'n Tap
          </h1>
          
          {/* Total Amount - Lowered slightly */}
          <p className="text-2xl font-semibold text-gray-700 mb-6">Total Amount: ₹{userInfo.amount}</p>
          
          {/* Pay Now Button - Positioned at the bottom right */}
          <div className="mt-auto flex justify-end">
            <button className="w-[200px] bg-pink-600 text-white py-2 rounded-lg text-xl font-semibold hover:bg-pink-700 transition-all duration-300 ease-in-out shadow-lg">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
