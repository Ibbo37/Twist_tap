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
        const response = await axios.get("http://localhost:5000/api/video/getAllVideo", {
          withCredentials: true,
        });
  
        console.log("API Response:", response.data);
        console.log("Videos Array:", response.data.data);
  
        if (Array.isArray(response.data.data)) {
          setVideos(response.data.data);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
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

  const handleDeleteClick = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/video/delete/${videoId}`, {
        withCredentials: true,
      });
      setVideos(videos.filter((video) => (video.videoId || video._id) !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      
      <div className="w-1/4 p-4 overflow-y-auto bg-gray-900">
        <h3 className="text-xl font-semibold mb-2 text-[rgb(254,130,140)]">Reel Videos</h3>
        {loading ? (
          <p className="text-[rgb(254,130,140)]">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {videos.map((video) => (
              <div key={video.videoId || video._id} onClick={() => handleVideoClick(video)} className="cursor-pointer">
                <div className="relative aspect-w-16 aspect-h-9">
                  <video
                    src={video.videoURL} 
                    className="absolute inset-0 w-full h-full object-cover border-2 border-[rgb(254,130,140)]"
                    controls
                  />
                </div>
                <h4 className="text-[rgb(254,130,140)]">{video.videoName}</h4>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-3/4 p-4 border-l border-[rgb(254,130,140)] overflow-y-auto">
        {selectedVideo && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[rgb(254,130,140)]">
              Selected Video: {selectedVideo.videoName}
            </h3>

            <div className="mb-4">
              <h4 className="font-semibold text-[rgb(254,130,140)]">Unique ID:</h4>
              <p className="text-gray-400">{selectedVideo.videoId || selectedVideo._id}</p>
            </div>

            <div className="text-white mb-4 flex items-center gap-2">
              {selectedVideo.videoStatus === "approved" ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaTimes className="text-red-500" />
              )}
              <p className="text-gray-400">Status: {selectedVideo.videoStatus}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-[rgb(254,130,140)]">Description:</h4>
              <p className="text-gray-400">{selectedVideo.videoDescription || "No description available"}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-[rgb(254,130,140)]">Genre:</h4>
              <p className="text-gray-400">{selectedVideo.videoGenre || "No genre specified"}</p>
            </div>

            <div className="relative aspect-w-16 aspect-h-9">
              <video
                src={selectedVideo.videoURL}
                className="absolute inset-0 w-full h-full object-cover border-2 border-[rgb(254,130,140)]"
                controls
              />
            </div>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleEditClick(selectedVideo)}
                className="bg-[rgb(254,130,140)] text-black py-2 px-4 rounded hover:bg-pink-500 flex items-center gap-2"
              >
                <FaEdit />
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(selectedVideo.videoId || selectedVideo._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center gap-2"
              >
                <FaTrash />
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
