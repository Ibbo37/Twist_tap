import React from "react";
import { useNavigate } from "react-router-dom";

const TuitionPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handlePaymentClick = () => {
    navigate("/payment"); 
  }
  return (
    <div>
      {/* Tuition Fee Section */}
      <section className="py-8"> {/* Padding added only for this section */}
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
            Tuition Fee
          </h1>
          <div className="space-y-4 text-center text-gray-700 text-lg">
            <p>
              3 months: <span className="font-bold">50,848/-</span>
            </p>
            <p>
              6 months: <span className="font-bold">85,424/-</span>
            </p>
            <p>
              9 months: <span className="font-bold">1,12,966/-</span>
            </p>
            <p>
              1 year: <span className="font-bold">1,62,712/-</span>
            </p>
            <p className="text-red-500 text-sm">
              * All prices are exclusive of 18% GST
            </p>
          </div>
          <div className="text-center mt-4">
          <button
              onClick={handlePaymentClick}
              className="bg-pink-600 text-white px-16 py-4 rounded-xl shadow-lg hover:bg-pink-700 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              Pay Here
            </button>

          </div>
        </div>
      </section>

      {/* Housing/Accommodation Section */}
      <section
        className="relative  bg-cover bg-center" /* Padding for this section */
        style={{
          backgroundImage: `url('https://via.placeholder.com/1920x1080')`, // Replace with your image URL
        }}
      >
        {/* Overlay for text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mt-4 mb-6"> {/* Minimal margin for proximity */}
            Housing/Accommodation
          </h2>
          <p className="text-lg text-white">
            We have students from different cities/countries all through the
            year coming and staying in Mumbai for the course. We would like to
            help you by suggesting the best possible places available near
            Nritya Shakti Studio.
          </p>
          <p className="text-lg text-white mt-4">
            For more information about our accommodation services, please
            contact us at <span className="font-bold">+91 8169270738</span>.
          </p>
          <p className="text-lg text-white">
            We are committed to helping you settle safely and conveniently,
            tailored to your budget and requirements.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TuitionPage;
