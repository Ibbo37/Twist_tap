import { useState } from "react";

const TPracticeUpload = ({ lessonId, onClose }) => {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(""); // Store errors

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleUpload = async () => {
    if (!video) return setError("Please select a video to upload!");
    
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("video", video);
    formData.append("lessonId", lessonId);

    try {
      const response = await fetch("http://localhost:5000/api/practice/pracvideo", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      alert("Practice video uploaded successfully!");
      onClose(); // Close modal after upload
    } catch (error) {
      console.error("Upload Error:", error);
      setError(error.message || "Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-lg w-96 text-center">
        <h2 className="text-xl font-bold mb-4">Upload Practice Video</h2>
        
        <input type="file" accept="video/*" onChange={handleFileChange} className="mb-4" />

        {/* 📌 File Preview */}
        {preview && (
          <video src={preview} controls className="w-full h-40 mt-2 rounded-lg"></video>
        )}

        {/* 📌 Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleUpload}
            className="bg-[rgb(254,130,140)] text-black px-4 py-2 rounded-lg font-semibold hover:bg-pink-600"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <button
            onClick={onClose}
            className="bg-gray-400 px-4 py-2 rounded-lg font-semibold hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TPracticeUpload;
