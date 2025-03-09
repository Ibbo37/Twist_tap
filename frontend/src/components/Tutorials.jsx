import { useEffect, useState } from "react";
import TPracticeUpload from "../components/TPracticeUpload"; // Import Modal Component

const Tutorials = () => {
    const [videos, setVideos] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null); // State for modal

    useEffect(() => {
        fetch("http://localhost:5000/api/admin/getAllTutorial")
            .then((res) => res.json())
            .then((data) => setVideos(data))
            .catch((err) => console.log("Error fetching tutorials:", err));
    }, []);

    return (
        <div className="min-h-screen bg-black text-white px-10 py-12 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-[rgb(254,130,140)] mb-10 text-center">
                Dance Tutorials
            </h2>

            <div className="w-full max-w-6xl flex flex-col items-center gap-10">
                {videos.map((video) => (
                    <div
                        key={video._id}
                        className="bg-gray-900 p-6 rounded-2xl shadow-xl flex flex-col items-center transition-transform transform hover:scale-105 w-full max-w-5xl"
                    >
                        {/* 📌 Video Player */}
                        <div className="relative w-[95%]">
                            <video className="w-full h-[calc(95vw*0.5625)] max-h-[550px] rounded-lg object-cover" controls>
                                <source src={video.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        {/* 📌 Lesson Title & Description */}
                        <div className="mt-5 text-center w-full">
                            <h3 className="text-xl font-semibold text-[rgb(254,130,140)]">
                                {video.title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1 max-w-3xl mx-auto">
                                {video.description}
                            </p>
                        </div>

                        {/* 📌 Instructor Profile & Buttons */}
                        <div className="flex items-center justify-between mt-5 w-full px-6">
                            {/* Instructor Profile */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={video.instructorProfile}
                                    alt="Instructor"
                                    className="w-12 h-12 rounded-full border-2 border-[rgb(254,130,140)]"
                                />
                                <p className="text-sm text-gray-300">{video.instructorName}</p>
                            </div>

                            {/* 📌 Attempt Button */}
                            <button
                                className="bg-[rgb(254,130,140)] text-black px-5 py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
                                onClick={() => setSelectedLesson(video._id)} // Open Modal
                            >
                                Attempt Practice
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 📌 Modal Open Tabhi Hoga Jab `selectedLesson` Set Hoga */}
            {selectedLesson && <TPracticeUpload lessonId={selectedLesson} onClose={() => setSelectedLesson(null)} />}
        </div>
    );
};

export default Tutorials;
