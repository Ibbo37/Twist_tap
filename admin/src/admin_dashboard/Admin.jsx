import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Admin() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUserVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/video/videoVerified");
        if (!response.ok) throw new Error("Failed to fetch videos");

        const data = await response.json();
        console.log("API Response:", data); 

       
        const videosArray = Array.isArray(data.data) ? data.data : [];
        setVideos(videosArray.filter(video => video.videoStatus === "pending"));

      } catch (error) {
        console.error("Error fetching user videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserVideos();
  }, []);


  const handleApprove = async (id) => {
    if (!id) return;
    try {
      const response = await fetch('http://localhost:5000/api/video/adminVerified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, action: "approve" }),
        credentials: "include",  
      });
      

      if (!response.ok) throw new Error('Approval failed');

      setVideos((prevVideos) => prevVideos.filter(video => video._id !== id));
      setSelectedVideo(null);

      alert('✅ Video Approved Successfully!'); 

    } catch (error) {
      console.error('Error approving video:', error);
    }
  };

  const handleDecline = async (id) => {
    if (!id) return;
    const reason = prompt('Enter reason for decline:');
    if (!reason) return;

    try {
      const response = await fetch('http://localhost:5000/api/video/adminVerified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, action: "reject", reason }),
      });

      if (!response.ok) throw new Error('Decline failed');

      setVideos((prevVideos) => prevVideos.filter(video => video._id !== id));
      setSelectedVideo(null);

      alert('❌ Video Declined!'); // ✅ Alert after UI update

    } catch (error) {
      console.error('Error declining video:', error);
    }
  };


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 grid grid-cols-4 gap-4 h-screen">

      <div className="col-span-1.5 bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Pending Videos</h2>
        <input
          type="text"
          placeholder="Search by Name or ID..."
          className="w-full p-2 mb-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => setSearch('')}
        />
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : videos.length === 0 ? (
          <p className="text-center text-gray-500">No pending videos</p>
        ) : (
          <ul>
            {videos.filter(video =>
              video.videoName.toLowerCase().includes(search.toLowerCase()) ||
              video.uniqueId.includes(search)
            ).map((video) => (
              <li key={video._id} className="mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg" onClick={() => setSelectedVideo(video)}>
                📽 {video.videoName} ({video.videoId})
              </li>
            ))}
          </ul>
        )}
      </div>


      <div className="col-span-2.5 bg-white p-6 rounded-lg shadow-md flex flex-col">
        {selectedVideo ? (
          <>
            <h2 className="text-xl font-bold mb-2 text-center">{selectedVideo.videoName}</h2>
            <video controls className="w-full max-w-[500px] rounded-lg shadow mb-4">
              {selectedVideo?.videoURL ? (
                <source src={selectedVideo.videoURL} type="video/mp4" />
              ) : selectedVideo?.path ? (
                <source src={selectedVideo.path} type="video/mp4" />
              ) : (
                <p className="text-red-500">⚠ Video source not found</p>
              )}
              Your browser does not support the video tag.
            </video>

            <p className="text-gray-700 text-center">{selectedVideo.videoDescription}</p>
            <div className="mt-4 flex gap-4 w-full justify-center">
              <button onClick={() => handleApprove(selectedVideo._id)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all">✔ Approve</button>
              <button onClick={() => handleDecline(selectedVideo._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all">✖ Decline</button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">Select a video to review</p>
        )}
      </div>
    </motion.div>

  );
}