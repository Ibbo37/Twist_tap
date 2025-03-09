import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // ✅ Workshop ka naam
    description: { type: String, required: true }, // ✅ Short overview
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Instructor reference
    date: { type: Date, required: true }, // ✅ Date of workshop
    duration: { type: Number, required: true }, // ✅ Duration in hours
    price: { type: Number, default: 0 }, // ✅ Price (0 means free)
    isActive: { type: Boolean, default: true }, // ✅ Active status
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ✅ Registered users
  },
  { timestamps: true }
);

const Workshop = mongoose.model("Workshop", workshopSchema);
export default Workshop;
