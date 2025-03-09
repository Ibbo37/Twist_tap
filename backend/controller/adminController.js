import Video from "../model/video.model.js";
import cloudinary from "../utils/cloudinary.js";

export const videoUpload = async (req, res) => {
  try {
    const { videoName, videoDescription, videoGenre, uploadedBy } = req.body;
    console.log(req.body);

    if (!uploadedBy || !videoGenre || !videoName || !videoDescription) {
      return res.status(400).json({ message: "Please fill all details" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No video file provided." });
    }

    const videoPath = req.file.path;

    try {
      
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
  const { _id, action, reason } = req.body;
  console.log(_id, action);
  

  
  if (!_id || !action) {
    return res.status(400).json({ message: "Video ID and action are required" });
  }

  if (!["approve", "reject"].includes(action)) {
    return res.status(400).json({ message: "Invalid action. Use 'approve' or 'reject'" });
  }

  try {
    
    const video = await Video.findById(_id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

   
    if (action === "approve") {
      video.isVerified = true;
      video.videoStatus = "approved";  
    } else if (action === "reject" && reason) {
      video.isVerified = false;
      video.videoStatus = "rejected"; 
      video.reason = reason; 
    }

    
    await video.save();
    return res.status(200).json({
      message: `Video ${action === "approve" ? "approved" : "rejected"} successfully`,
      video,
    });
  } catch (error) {
    console.error("Error verifying video:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getVerifiedVideos = async (req, res) => {
  try {
    
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized access." });
    }

    // ✅ Fetch Only Approved Videos Uploaded by Logged-in User
    const verifiedVideos = await Video.find({
      
      videoStatus: "approved",
      uploadedBy: req.user._id // ✅ Sirf current user ke videos fetch honge
    }).populate("uploadedBy", "name email");

    // ✅ If No Videos Found
    if (!verifiedVideos.length) {
      return res.status(404).json({ success: false, message: "No verified videos found for this user." });
    }

    res.status(200).json({ success: true, data: verifiedVideos });

  } catch (error) {
    console.error("Error fetching verified videos:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};



export const videoVerificationCheck = async (req, res) => {
  try {
    
    const videos = await Video.find({ videoStatus: "pending" });

    console.log("Pending Videos: ", videos.length); 

    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error("Error fetching pending videos:", error.message); 

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

