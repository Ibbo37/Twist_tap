import mongoose from "mongoose";

const PracticeVideoSchema = new mongoose.Schema({
    lessonId: { type: String, required: true },
    videoUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});
const PracticeVideo = mongoose.model("PracticeVideo", PracticeVideoSchema);
export default PracticeVideo;
