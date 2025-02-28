import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

const MyUploadsSection = ({ selectedVideo, onVideoSelect }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/video/getAllVideos", {
          withCredentials: true,
        });
        setVideos(response.data); 
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (video) => {
    onVideoSelect(video); 
  };

  const handleEditClick = (video) => {
    console.log("Edit video:", video);
  };

  const handleDeleteClick = (videoId) => {
    console.log("Delete video with ID:", videoId);
  };

  return (
    <div className="flex h-screen">
      
      <div className="w-1/4 p-4 overflow-y-auto">
        <h3 className="text-xl font-semibold mb-2 text-black">Reel Videos</h3>
        {loading ? (
          <p className="text-blue-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {videos.map((video) => (
              <div
                key={video.uniqueId} 
                onClick={() => handleVideoClick(video)}
                className="cursor-pointer"
              >
                <div className="relative" style={{ width: "100%", paddingBottom: "177%" }}>
                  <video
                    src={video.path}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    controls
                  />
                </div>
                <h4 className="text-black">{video.videoName}</h4>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <div className="w-3/4 p-4 border-l overflow-y-auto">
        {selectedVideo && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black">
              Selected Video: {selectedVideo.videoName}
            </h3>

            
            <div className="mb-4">
              <h4 className="font-semibold text-black">Unique ID:</h4>
              <p className="text-gray-600">{selectedVideo.uniqueId}</p>
            </div>

            
            <div className="text-black mb-4 flex items-center gap-2">
              {selectedVideo.videoStatus === "approved" ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaTimes className="text-red-500" />
              )}
              <p className="text-gray-600">Status: {selectedVideo.videoStatus}</p>
            </div>

            
            <div className="mb-4">
              <h4 className="font-semibold text-black">Description:</h4>
              <p className="text-gray-600">{selectedVideo.videoDescription || "No description available"}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-black">Genre:</h4>
              <p className="text-gray-600">{selectedVideo.videoGenre || "No genre specified"}</p>
            </div>

            
            <div style={{ position: "relative", paddingBottom: "177%" }}>
              <video
                src={selectedVideo.path}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                controls
              />
            </div>

            
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleEditClick(selectedVideo)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                <FaEdit className="inline mr-2" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(selectedVideo.uniqueId)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                <FaTrash className="inline mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyUploadsSection;
