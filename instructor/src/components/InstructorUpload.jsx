import { useState } from "react";

const InstructorUpload = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!video || !title || !description) {
      return alert("All fields are required!");
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:5000/api/instructor/uploadTutorial", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Tutorial uploaded successfully!");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-lg w-[400px] text-center shadow-lg">
        <h2 className="text-2xl font-bold text-[rgb(254,130,140)] mb-4">Upload Tutorial</h2>

        <input
          type="text"
          placeholder="Tutorial Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 rounded-lg text-black"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-2 rounded-lg text-black"
        />

        <input type="file" accept="video/*" onChange={handleFileChange} className="mb-3" />

        <button
          onClick={handleUpload}
          className="bg-[rgb(254,130,140)] text-black px-4 py-2 rounded-lg font-semibold hover:bg-pink-600"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default InstructorUpload;
