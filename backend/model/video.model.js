import mongoose from "mongoose";

const generateUniqueId = async function () {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    uniqueId = Math.floor(1000 + Math.random() * 9000);
    const existingVideo = await Video.findOne({ videoId: uniqueId });
    if (!existingVideo) isUnique = true; 
  }
  
  return uniqueId;
};

const videoSchema = new mongoose.Schema(
  {
    videoId: { type: Number, unique: true },
    videoName: { type: String, required: true },
    videoDescription: { type: String, required: true },
    videoGenre: { type: String, required: true },
    category: { type: String, default: "General" }, 
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isVerified: { type: Boolean, default: false },
    videoStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    videoURL: { type: String, required: true },
    likes: { type: Number, default: 0 }, 
    views: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);


videoSchema.pre("save", async function (next) {
  if (!this.videoId) {
    this.videoId = await generateUniqueId();
  }
  next();
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
