import React, { useState } from "react";
import "./profile.css";
import axios from "axios";
import Navbar from "../navbar/Navbar";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [profileData, setProfileData] = useState({
    name: "None",
    age: "None",
    address: "None",
    email: "None",
  });
  const [editedData, setEditedData] = useState(profileData);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post("http://localhost:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImageUrl(response.data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setProfileData(editedData);
  };

  return (
    <>
      <Navbar />
      <div className="profile-header">
        <h1>Your Profile</h1>
      </div>
      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-image-section">
            <div className="image-wrapper">
              <img
                src={imageUrl || "/Profile/P1.webp"}
                alt="Profile"
                className="profile-image"
              />
              <label className="file-label">
                <input type="file" className="file-input" onChange={handleImageUpload} />
                <span>Choose Photo</span>
              </label>
            </div>
            {imageUrl && (
              <p className="upload-message">Profile Image Uploaded Successfully!</p>
            )}
          </div>
          <div className="profile-info">
            <div className="info-item">
              <label>Name:</label>
              <p>{profileData.name}</p>
            </div>
            <div className="info-item">
              <label>Age:</label>
              <p>{profileData.age}</p>
            </div>
            <div className="info-item">
              <label>Address:</label>
              <p>{profileData.address}</p>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <p>{profileData.email}</p>
            </div>
          </div>
        </div>

        {/* Edit Profile Fields */}
        <div className="profile-fields">
          <h3>Edit Profile</h3>
          <div className="field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={editedData.age}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={editedData.address}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={editedData.email}
              onChange={handleChange}
            />
          </div>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
