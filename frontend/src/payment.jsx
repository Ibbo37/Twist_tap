import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });

  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const storedData = localStorage.getItem("userDetails");
    if (storedData) {
      setUserInfo(JSON.parse(storedData));
    }
  }, []);

  const handlePayment = async () => {
    if (!userInfo.amount || userInfo.amount <= 0) {
      alert("Invalid amount");
      return;
    }

    const response = await fetch("http://localhost:5000/api/payments/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: userInfo.amount }),
    });

    const order = await response.json();

    if (!order.id) {
      alert("Error creating order");
      return;
    }

    const options = {
      key: "rzp_test_QAJbWl9eBMtmT1",
      amount: order.amount,
      currency: "INR",
      name: "Your Business Name",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        const verifyRes = await fetch("http://localhost:5000/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: order.amount / 100,
          }),
          credentials: "include"
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert("Payment Successful: " + response.razorpay_payment_id);
          navigate("/paymentconfirmation"); // ✅ Redirect to success page
        } else {
          alert("Payment Verification Failed");
        }
      },
      prefill: {
        name: userInfo.name || "Test User",
        email: userInfo.email || "test@example.com",
        contact: userInfo.phone || "9999999999",
      },
      theme: {
        color: "#ff4081",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-pink-500 to-black p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Payment Details
        </h2>

        <div className="space-y-4 text-lg">
          <p>
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            <span className="text-black">{userInfo.name || "N/A"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            <span className="text-black">{userInfo.email || "N/A"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Phone:</span>{" "}
            <span className="text-black">{userInfo.phone || "N/A"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Amount:</span>{" "}
            <span className="text-black">₹{userInfo.amount || "N/A"}</span>
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handlePayment}
            className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg text-lg transition-transform transform hover:scale-105 hover:bg-pink-700 shadow-lg"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
