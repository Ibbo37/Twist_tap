import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react"; // Delete Icon ke liye

function MyWorkshop() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    // Fetch workshops from localStorage
    const storedWorkshops = JSON.parse(localStorage.getItem("workshops")) || [];
    setWorkshops(storedWorkshops);
  }, []);

  const handleDelete = (index) => {
    // Workshop delete karne ka logic
    const updatedWorkshops = workshops.filter((_, i) => i !== index);
    setWorkshops(updatedWorkshops);
    localStorage.setItem("workshops", JSON.stringify(updatedWorkshops));
  };

  return (
    <div className="relative h-screen w-[1100px] bg-gray-100 text-gray-900 flex flex-col items-center justify-start p-6 translate-x-[180px]">
      
      {/* Heading Thoda Niche Aur Gap Badha Diya */}
      <h1 className="text-2xl font-bold text-gray-800 mt-8 mb-10">Workshops Uploaded</h1>

      {workshops.length === 0 ? (
        <p className="mt-20 text-gray-600">No workshops uploaded yet.</p>
      ) : (
        <div className="flex flex-col gap-y-12">  
          {workshops.map((workshop, index) => (
            <div key={index} className="relative flex bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl">
              
              {/* Left Section - Workshop Details */}
              <div className="w-1/3 p-6 flex flex-col gap-5">
                <div className="translate-x-[50px]">
                  <h2 className="text-xl font-semibold text-center translate-x-[-40px]">Workshop Details</h2>
                  <p><span className="font-semibold">Style:</span> <span className="ml-2">{workshop.style}</span></p>
                  <p><span className="font-semibold">Location:</span> <span className="ml-2">{workshop.location}</span></p>
                  <p><span className="font-semibold">Date:</span> <span className="ml-2">{workshop.date}</span></p>
                  <p><span className="font-semibold">Payment:</span> <span className="ml-2">₹{workshop.payment}</span></p>
                </div>
              </div>

              {/* Center Section - Quote */}
              <div className="w-1/3 flex items-center justify-center px-6 bg-[#fe828c] text-gray-900 text-lg italic font-medium text-center leading-snug">
                "Dance is the hidden language of the soul."
              </div>

              {/* Right Section - Workshop Image */}
              <div className="w-1/3 relative">
                <img src="/DashboardImg/a1.jpg" alt="Workshop" className="w-full h-full object-cover" />
                
                {/* 🗑 Delete Button - Top Right Corner */}
                <button 
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition duration-200"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyWorkshop;
