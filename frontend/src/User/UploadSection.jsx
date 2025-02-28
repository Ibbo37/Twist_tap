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
        "http://localhost:5000/api/video/uploadVideo",
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Column: Upload Form */}
      <div className="w-1/2 p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Video</h2>

        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label
              htmlFor="video-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select a video file:
            </label>
            <input
              type="file"
              id="video-upload"
              accept="video/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="video-name"
              className="block text-sm font-medium text-gray-700"
            >
              Video Name
            </label>
            <input
              type="text"
              id="video-name"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full text-gray-900"
              placeholder="Enter video name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="video-description"
              className="block text-sm font-medium text-gray-700"
            >
              Video Description
            </label>
            <textarea
              id="video-description"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full text-gray-900"
              placeholder="Enter video description"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="video-genre"
              className="block text-sm font-medium text-gray-700"
            >
              Video Genre
            </label>
            <select
              id="video-genre"
              value={videoGenre}
              onChange={(e) => setVideoGenre(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full text-gray-900 bg-white"
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
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>

      {/* Right Column: Video Preview */}
      <div className="w-1/2 p-6 bg-gray-100 flex items-center justify-center">
        {previewUrl ? (
          <div className="relative w-full max-w-sm">
            <h3 className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              {videoName || "Preview"}
            </h3>
            <video
              src={previewUrl}
              controls
              className="w-full h-auto rounded border shadow-md"
            ></video>
          </div>
        ) : (
          <p className="text-gray-500">No video selected for preview.</p>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
