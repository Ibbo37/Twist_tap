import React from "react";
import { FaUser, FaVideo, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ profilePic, user, selectedSection, onSectionChange, onLogout }) => (
  <div className="w-1/4 bg-black text-white p-6 flex flex-col justify-between">
    <div>
      <div className="flex items-center mb-6">
        <img
          src={profilePic || "/path-to-avatar.jpg"}
          alt="User Avatar"
          className="w-12 h-12 rounded-full mr-3 shadow-md border-2"
          style={{ borderColor: "rgb(254, 130, 140)" }}
        />
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "rgb(254, 130, 140)" }}>{user || "Guest User"}</h2>
          <p className="text-sm text-gray-400">{user || "N/A"}</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: "rgb(254, 130, 140)" }}>Your Account</h2>
      <ul>
        {["profile", "upload", "myUploads", "settings"].map((section) => (
          <li
            key={section}
            onClick={() => onSectionChange(section)}
            className="flex items-center space-x-2 cursor-pointer py-3 px-4 rounded-md transition-all"
            style={{
              backgroundColor: selectedSection === section ? "rgb(254, 130, 140)" : "transparent",
              color: selectedSection === section ? "black" : "white",
              hover: { backgroundColor: "rgb(254, 130, 140)", color: "black" },
            }}
          >
            {section === "profile" && <FaUser />}
            {section === "upload" && <FaVideo />}
            {section === "myUploads" && <FaVideo />}
            {section === "settings" && <FaCog />}
            <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <ul>
        <li
          onClick={onLogout}
          className="flex items-center space-x-2 cursor-pointer py-3 px-4 rounded-md transition-all"
          style={{ backgroundColor: "rgb(254, 130, 140)", color: "black" }}
        >
          <FaSignOutAlt />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  </div>
);

export default Sidebar;
