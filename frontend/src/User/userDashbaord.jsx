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
    <div className="h-screen w-screen bg-black flex">
      <Sidebar
        profilePic={profilePic}
        user={user}
        selectedSection={selectedSection}
        onSectionChange={setSelectedSection}
        onLogout={handleLogout}
        className="bg-black text-white"
      />
      <div className="w-3/4 bg-black p-8 overflow-y-auto text-white border-l-2 border-pink-500">
        {selectedSection === "profile" && (
          <ProfileSection profilePic={profilePic} user={user} onProfilePicUpload={handleProfilePicUpload} />
        )}
        {selectedSection === "upload" && <UploadSection className="text-pink-400" />}
        {selectedSection === "myUploads" && (
          <MyUploadsSection selectedVideo={selectedVideo} onVideoSelect={setSelectedVideo} className="text-pink-400" />
        )}
        {selectedSection === "settings" && <SettingsSection user={user} className="text-pink-400" />}
      </div>
    </div>
  );
};

export default UserDashboard;
