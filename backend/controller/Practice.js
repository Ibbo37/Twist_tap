import PracticeVideo from "../model/PracticeVideo.js";
import Instructor from "../utils/Instructor.js";


export const Practice = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const videoPath = req.file.path;
        const uploadResult = await Instructor.uploader.upload(videoPath, {
            resource_type: "video",
            folder: "PracticeVideos",
        });
        if (!uploadResult.secure_url) {
            return res.status(500).json({ message: "Error uploading video!" });
        }
        const prac = await PracticeVideo.create({
            lessonId : req.body.lessonId,
            videoUrl: uploadResult.secure_url,
        });
        const videoUrl = prac.videoUrl;

        res.status(201).json({ message: "Video uploaded successfully", videoUrl });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

