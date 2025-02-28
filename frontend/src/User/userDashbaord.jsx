import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ProfileSection from "./ProfileSection";
import UploadSection from "./UploadSection";
import MyUploadsSection from "./MyUploadsSection";
import SettingsSection from "./SettingsSection";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("profile");
  const [profilePic, setProfilePic] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedProfilePic = localStorage.getItem("profilePic");
    if (savedProfilePic) setProfilePic(savedProfilePic);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login-register");
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setProfilePic(fileURL);
      localStorage.setItem("profilePic", fileURL);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-gray-100 to-blue-50 flex">
      <Sidebar
        profilePic={profilePic}
        user={user}
        selectedSection={selectedSection}
        onSectionChange={setSelectedSection}
        onLogout={handleLogout}
      />
      <div className="w-3/4 bg-white p-8 overflow-y-auto">
        {selectedSection === "profile" && (
          <ProfileSection profilePic={profilePic} user={user} onProfilePicUpload={handleProfilePicUpload} />
        )}
        {selectedSection === "upload" && <UploadSection />}
        {selectedSection === "myUploads" && (
          <MyUploadsSection selectedVideo={selectedVideo} onVideoSelect={setSelectedVideo} />
        )}
        {selectedSection === "settings" && <SettingsSection user={user} />}
      </div>
    </div>
  );
};

export default UserDashboard;
