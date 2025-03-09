import { useState, useEffect } from "react";
import axios from "axios";
import "./Upload.css";
import Navbar from "../navbar/Navbar";

function Upload() {
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);

  const [images, setImages] = useState([
    "/UploadImg/u1.png",
    "/UploadImg/u2.png",
    "/UploadImg/u3.png",
    "/UploadImg/u4.png",
    "/UploadImg/u5.png",
  ]);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video file!");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      alert(response.data.message);
      fetchVideos();
    } catch (error) {
      alert("Upload failed");
      console.error(error);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/video/reel");
      console.log("API Response:", response.data); // Debugging response
      setVideos(response.data.data || []); // Ensure an array
    } catch (error) {
      console.error("Failed to fetch videos", error);
      setVideos([]); // Fallback to empty array
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="upload-main-container">
        {/* Heading */}
        <div className="upload-main-upload-heading">
          <h1>Upload Video to Cloudinary</h1>
        </div>

        {/* Description and First Image Slider Side by Side */}
        <div className="upload-main-content">
          <div className="upload-main-description-text">
            <p>
              Upload your creative videos to Cloudinary and share your passion
              with the world. Showcase your work effortlessly and keep it
              secure. It’s simple, quick, and efficient.
            </p>
          </div>
          <div className="upload-image-slider">
            <div className="upload-image-slider-wrapper">
              {images.concat(images).map((image, index) => (
                <img key={index} src={image} alt={`image ${index}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="upload-main-description">
          <input type="file" accept="video/*" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>

        {/* Video placed between description and cards */}
        <div className="upload-side-video">
          <video
            controls
            className="side-video"
            src="/UploadImg/HUploadV2.mp4"
          />
        </div>

        {/* Animated Cards Section */}
        <div className="upload-cards-container">
          {[
            "1.Choose Your File",
            "2.Select Your Video",
            "3.Click Open",
            "Click on Upload",
          ].map((text, index) => (
            <div key={index} className={`upload-card card-${index + 1}`}>
              {text}
            </div>
          ))}
        </div>

        {/* Reel Videos */}
        <div className="upload-videos-container">
          <h2>Reels</h2>
          {Array.isArray(videos) && videos.length > 0 ? (
            videos.map((video, index) => (
              <video
                key={index}
                className="upload-video-item"
                controls
                src={video.videoURL}
              />
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Upload;
