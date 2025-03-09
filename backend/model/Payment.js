import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Added user reference
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "INR" }, // ✅ Default currency INR set ki hai
    status: { 
      type: String, 
      enum: ["Pending",  "Failed", "Success"], 
      default: "Pending" 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
