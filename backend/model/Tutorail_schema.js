import mongoose from "mongoose";

const TTutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,  
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TTutorial = mongoose.model("TTutorial", TTutorialSchema);
export default TTutorial;
