import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  payingFor: { type: String, required: true },  // Added field
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  paymentId: { type: String, required: true },
  UserId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  
},{timestamps:true});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;