import React, { useState } from "react";
import { FaUser, FaUpload, FaChalkboardTeacher, FaCog, FaSignOutAlt } from "react-icons/fa";
import InstProfile from "./InstProfile"; // Import Instructor Profile Page
import UploadWorkshop from "./UploadWorkshop";
import MyWorkshop from "./MyWorkshop";
import Setting from "./Setting";

function Profile() {
  const [selectedMenu, setSelectedMenu] = useState("profile"); // Default "profile"

  // Function to Render Selected Component
  const renderContent = () => {
    if (selectedMenu === "profile") return <InstProfile />;
    if (selectedMenu === "upload") return <UploadWorkshop />;
    if (selectedMenu === "workshop") return <MyWorkshop />;
    if (selectedMenu === "settings") return <Setting />;
  };

  return (
    <div className="flex bg-white h-screen">
      {/* Sidebar */}
      <div className="w-90 h-screen bg-black text-white p-6 flex flex-col fixed left-0 top-0 shadow-2xl">
        {/* Profile Section */}
        <div className="flex flex-col items-center border-b border-gray-700 pb-6">
          <div className="w-28 h-28 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 text-5xl shadow-lg">
            <FaUser />
          </div>
          <h2 className="mt-4 text-2xl font-semibold">Instructor Name</h2>
        </div>

        {/* Extra Gap */}
        <div className="mt-8"></div>

        {/* Menu List */}
        <nav className="flex-1">
          <ul className="space-y-6 px-4">
            {[ 
              { id: "profile", icon: <FaUser />, label: "Profile" },
              { id: "upload", icon: <FaUpload />, label: "Upload Workshop" },
              { id: "workshop", icon: <FaChalkboardTeacher />, label: "My Workshop" },
              { id: "settings", icon: <FaCog />, label: "Settings" },
            ].map((item) => (
              <li
                key={item.id}
                className={`flex items-center gap-6 px-6 py-4 text-xl rounded-lg cursor-pointer transition-all w-full h-16 shadow-md
                  ${
                    selectedMenu === item.id
                      ? "bg-[#fe828c]"
                      : "bg-gray-900 hover:bg-[#4b4b4b]"
                  }`}
                onClick={() => setSelectedMenu(item.id)}
              >
                {item.icon} <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          className="mt-12 flex items-center gap-6 px-6 py-4 text-xl w-full h-16 rounded-lg bg-black text-white transition-all shadow-md hover:bg-[#F61313FF] active:bg-red-600"
        >
          <FaSignOutAlt className="text-2xl" /> <span>Logout</span>
        </button>
      </div>

      {/* Right Side Content Area */}
      <div className="ml-80 flex-1 p-6">{renderContent()}</div>
    </div>
  );
}

export default Profile;
