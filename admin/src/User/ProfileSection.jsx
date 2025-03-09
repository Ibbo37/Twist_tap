import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const ProfileSection = ({ profilePic, user, onProfilePicUpload }) => {
 
  const videoStats = {
    labels: ["Pending", "Approved", "Deleted"],
    datasets: [
      {
        data: [5, 12, 3], 
        backgroundColor: ["#FFBB33", "#4CAF50", "#F44336"],
        borderColor: ["#FFBB33", "#4CAF50", "#F44336"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} videos`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4 text-center">Your Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={profilePic || "/path-to-avatar.jpg"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full shadow-md"
          />
          <label
            htmlFor="profilePicUpload"
            className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-full cursor-pointer"
          >
            Upload
          </label>
          <input
            id="profilePicUpload"
            type="file"
            className="hidden"
            onChange={onProfilePicUpload}
          />
        </div>
        <h3 className="text-xl font-semibold mt-4">{user || "Guest User"}</h3>
        <p className="text-gray-500">Username: {user || "N/A"}</p>
      </div>

      
      <div className="mt-8" style={{ width: "250px", height: "250px" }}> 
        <Pie data={videoStats} options={chartOptions} />
      </div>
    </div>
  );
};

export default ProfileSection;
