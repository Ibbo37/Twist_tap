import Video from "../model/video.model.js";
import ffmpeg from "fluent-ffmpeg";
import cloudinary from "../utils/cloudinary.js";

export const videoUpload = async (req, res) => {
  try {
    const { videoName, videoDescription, videoGenre, uploadedBy } = req.body;

    if (!uploadedBy || !videoGenre || !videoName || !videoDescription) {
      return res.status(400).json({ message: "Please fill all details" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No video file provided." });
    }

    const videoPath = req.file.path;

      try {
        // Upload video to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(videoPath, {
          resource_type: "video",
          folder: "user_videos",
        });
        console.log(uploadResult.secure_url);
        
        
        const newVideo = await Video.create({
          videoName,
          videoDescription,
          videoGenre,
          uploadedBy: req.user._id,
          videoURL: uploadResult.secure_url,
        });

        res.status(201).json({ message: "Video uploaded successfully!" });
      } catch (cloudinaryError) {
        res
          .status(500)
          .json({ error: "Failed to upload video to Cloudinary." });
      }
   
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const videoVerified = async (req, res) => {
  const { videoId, action } = req.body;

  // Validate request body
  if (!videoId || !action) {
    return res
      .status(400)
      .json({ message: "Video ID and action are required" });
  }

  if (!["approve", "reject"].includes(action)) {
    return res
      .status(400)
      .json({ message: "Invalid action. Use 'approve' or 'reject'" });
  }

  try {
    // Find video by ID
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    
    if (action === "approve") {
      video.isVerified = true;
      video.status = "approved";
    } else if (action === "reject") {
      video.isVerified = false;
      video.status = "rejected";
    }

    // Save the updated video
    await video.save();

    // Respond with success and the updated video
    return res.status(200).json({
      message: `Video ${
        action === "approve" ? "approved" : "rejected"
      } successfully`,
      video,
    });
  } catch (error) {
    console.error("Error verifying video:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getVerifiedVideos = async (req, res) => {
  try {
    const verifiedVideos = await Video.find({
      isVerified: true,
      status: "approved",
    }).populate("uploadedBy");

    res.status(200).json(verifiedVideos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch videos." });
  }
};

export const videoVerificationCheck = async (req, res) => {
  try {
    const videos = await Video.find({ isVerified: "pending" });
    console.log(videos);
    
    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching videos.",
      error: error.message,
    });
  }
};

export const videoUploads = async (req, res) => {
  try {
      
    const videos = await Video.find({ uploadedBy: req.user._id });

    if (!videos.length) {
      return res.status(404).json({ message: "No videos found for this user" });
    }

    
    res.status(200).json(videos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

