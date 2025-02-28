import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoVerification = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);

  // Fetch videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/video/videoVerified");
        
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Approve a single video
  const handleApprove = async (id) => {
    try {
      await axios.post("http://localhost:5000/api/video/adminVerified", {
        videoId: id,
        action: "approve",
      });

      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id)); // Remove approved video
    } catch (error) {
      console.error("Error approving video:", error);
    }
  };

  // Reject a single video
  const handleReject = async (id) => {
    try {
      await axios.post("http://localhost:5000/api/video/adminVerified", {
        videoId: id,
        action: "reject",
      });

      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id)); // Remove rejected video
    } catch (error) {
      console.error("Error rejecting video:", error);
    }
  };

  // Handle checkbox selection
  const toggleSelection = (id) => {
    setSelectedVideos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((videoId) => videoId !== id)
        : [...prevSelected, id]
    );
  };

  // Batch approve videos
  const handleBatchApprove = async () => {
    try {
      await axios.post("http://localhost:5000/api/video/adminVerified", {
        ids: selectedVideos,
        action: "approve",
      });

      setVideos((prevVideos) =>
        prevVideos.filter((video) => !selectedVideos.includes(video.id))
      );
      setSelectedVideos([]);
    } catch (error) {
      console.error("Error approving videos in batch:", error);
    }
  };

  // Batch reject videos
  const handleBatchReject = async () => {
    try {
      await axios.post("http://localhost:5000/api/video/adminVerified", {
        ids: selectedVideos,
        action: "reject",
      });

      setVideos((prevVideos) =>
        prevVideos.filter((video) => !selectedVideos.includes(video.id))
      );
      setSelectedVideos([]);
    } catch (error) {
      console.error("Error rejecting videos in batch:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Video Verification</h1>

      {/* Batch Actions */}
      {selectedVideos.length > 0 && (
        <div className="mb-4 flex gap-4">
          <button
            onClick={handleBatchApprove}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Approve Selected
          </button>
          <button
            onClick={handleBatchReject}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reject Selected
          </button>
        </div>
      )}

      {/* Video List */}
      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="p-4 bg-white rounded shadow-md flex items-center justify-between"
          >
            {/* Video Info */}
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedVideos.includes(video.id)}
                onChange={() => toggleSelection(video.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <div>
                <h3 className="font-medium">{video.title}</h3>
                <video
                  src={video.url} // Ensure this contains the correct URL from your API
                  controls
                  className="w-48 h-28 object-cover mt-2"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Approve/Reject Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(video.id)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(video.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoVerification;
