import React, { useState } from "react";
import axios from "axios";

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoGenre, setVideoGenre] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile || !videoName || !videoDescription || !videoGenre) {
      alert("Please fill out all fields and select a video file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("videoName", videoName);
    formData.append("videoDescription", videoDescription);
    formData.append("videoGenre", videoGenre);
    formData.append("uploadedBy", "User123");

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:5000/api/video/uploadVideos",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Video uploaded successfully:", response.data);
      alert("Response will Appear in 24 hrs");
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Error uploading video. Please try again.");
    } finally {
      setUploading(false);
      setSelectedFile(null);
      setPreviewUrl("");
      setVideoName("");
      setVideoDescription("");
      setVideoGenre("");
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <div className="w-1/2 p-6 bg-gray-900 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#fe828c]">
          Upload Video
        </h2>

        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#fe828c] mb-2">
              Select a video file:
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300 border border-gray-600 rounded-lg cursor-pointer bg-gray-800 focus:outline-none focus:ring focus:ring-[#fe828c]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#fe828c]">
              Video Name
            </label>
            <input
              type="text"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              className="mt-2 p-3 border border-gray-600 rounded-md w-full text-black"
              placeholder="Enter video name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#fe828c]">
              Video Description
            </label>
            <textarea
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              className="mt-2 p-3 border border-gray-600 rounded-md w-full text-black"
              placeholder="Enter video description"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#fe828c]">
              Video Genre
            </label>
            <select
              value={videoGenre}
              onChange={(e) => setVideoGenre(e.target.value)}
              className="mt-2 p-3 border border-gray-600 rounded-md w-full text-black bg-white"
            >
              <option value="">Select genre</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="documentary">Documentary</option>
              <option value="horror">Horror</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="education">Education</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 text-white rounded ${
              uploading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#fe828c] hover:bg-pink-600"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>

      <div className="w-1/2 p-6 bg-gray-800 flex items-center justify-center">
        {previewUrl ? (
          <div className="relative w-full max-w-sm">
            <h3 className="absolute top-4 left-4 bg-[#fe828c] text-black px-2 py-1 rounded">
              {videoName || "Preview"}
            </h3>
            <video
              src={previewUrl}
              controls
              className="w-full h-auto rounded border border-[#fe828c] shadow-md"
            ></video>
          </div>
        ) : (
          <p className="text-gray-400">No video selected for preview.</p>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
