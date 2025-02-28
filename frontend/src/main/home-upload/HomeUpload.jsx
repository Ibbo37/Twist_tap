import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./HomeUpload.css"; // Ensure this CSS file exists
import Upload from '../../upload/Upload';

const HomeUpload = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true); // For the looping video
  const videoRefs = [useRef(null), useRef(null), useRef(null)]; // Refs for main videos
  const loopingVideoRef = useRef(null); // Ref for looping video
  const navigate = useNavigate(); // Initialize navigate

  const handlePlayPause = (videoId) => {
    if (currentVideo === videoId) {
      // Toggle play/pause for the same video
      if (isPlaying) {
        videoRefs[videoId - 1].current.pause();
      } else {
        videoRefs[videoId - 1].current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Play new video and pause the current one
      if (currentVideo !== null) {
        videoRefs[currentVideo - 1].current.pause();
      }
      videoRefs[videoId - 1].current.play();
      setCurrentVideo(videoId);
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    if (loopingVideoRef.current) {
      loopingVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleGetStarted = () => {
    navigate("/upload"); // Navigate to the Upload page
  };

  return (
    <div className="home-upload">
      <h2 className="heading">Upload</h2>
      <div className="video-container">
        {/* Video sections */}
        <div className="video-wrapper">
          <video
            ref={videoRefs[0]}
            className="video"
            onClick={() => handlePlayPause(1)}
            autoPlay={false}
          >
            <source src="/UploadImg/HUpload4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            className="play-button"
            onClick={() => handlePlayPause(1)}
            style={{ display: isPlaying && currentVideo === 1 ? "none" : "block" }}
          >
            {isPlaying && currentVideo === 1 ? "⏸️" : "▶️"}
          </button>
          <div
            className="get-start-card"
            style={{ display: isPlaying && currentVideo === 1 ? "none" : "block" }}
          >
            Get Started
          </div>
        </div>

        <div className="video-wrapper">
          <video
            ref={videoRefs[1]}
            className="video"
            onClick={() => handlePlayPause(2)}
            autoPlay={false}
          >
            <source src="/UploadImg/HUpload3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            className="play-button"
            onClick={() => handlePlayPause(2)}
            style={{ display: isPlaying && currentVideo === 2 ? "none" : "block" }}
          >
            {isPlaying && currentVideo === 2 ? "⏸️" : "▶️"}
          </button>
          <div
            className="get-start-card"
            style={{ display: isPlaying && currentVideo === 2 ? "none" : "block" }}
          >
            Learn & Groove
          </div>
        </div>

        <div className="video-wrapper">
          <video
            ref={videoRefs[2]}
            className="video"
            onClick={() => handlePlayPause(3)}
            autoPlay={false}
          >
            <source src="/UploadImg/HUpload2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            className="play-button"
            onClick={() => handlePlayPause(3)}
            style={{ display: isPlaying && currentVideo === 3 ? "none" : "block" }}
          >
            {isPlaying && currentVideo === 3 ? "⏸️" : "▶️"}
          </button>
          <div
            className="get-start-card"
            style={{ display: isPlaying && currentVideo === 3 ? "none" : "block" }}
          >
            Dance Your Way
          </div>
        </div>

        {/* Text and Button Section */}
        <div className="text-section">
          <p className="description">
            It’s time to showcase your talent! Upload your dance videos and let the world see your unique style. Whether you're just starting or you've been dancing for years, this is the platform to share your journey and inspire others.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>

        {/* Looping Video Section */}
        <div className="looping-video-section">
          <video
            ref={loopingVideoRef}
            className="looping-video"
            loop
            muted
            autoPlay
          >
            <source src="/UploadImg/HUploadV.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button className="audio-button" onClick={toggleAudio}>
            {isMuted ? "🔇 Enable Sound" : "🔊 Disable Sound"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeUpload;
