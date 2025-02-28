import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    videoName: {
      type: String,
      required: true,
    },
    videoDescription: {
      type: String,
      required: true,
    },
    videoGenre: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    videoStatus:{
        type: String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
    videoURL:{
        type: String,
        required:true
    }
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
