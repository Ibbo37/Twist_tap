import dotenv from "dotenv";
import Payment from "../model/Payment.js";

dotenv.config();

// 💳 Initiate Payment
export const retrievePayment = async (req, res) => {
  try{
    const payments = await Payment.find({ UserId: req.user._id });
    res.status(200).json(payments);
  }
  catch(error){
    res.status(500).json({ success: false, message: "Payment retrieval failed", error });
  }
}

export const initiatePayment = async (req, res) => {
  try {
    const { name, email, phone, amount, payingFor } = req.body;
    console.log("Name",name);
    
    // Create a new payment record (status: pending)
    const newPayment = new Payment({
      name,
      email,
      phone,
      amount,
      payingFor,   
      paymentId: `PAY_${Date.now()}`,
      UserId: req.user._id
    });

    await newPayment.save();

    // Generate Easebuzz Payment Link
    const paymentLink = `https://pay.easebuzz.in/easy_collect/${newPayment.paymentId}`;

    res.status(200).json({ success: true, paymentLink });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment initiation failed", error });
  }
};

// ✅ Verify Payment Status
export const verifyPayment = async (req, res) => {
  try {
    const { paymentId, status } = req.body;

    // Update payment status in DB
    const payment = await Payment.findOneAndUpdate(
      { paymentId },
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.json({ success: true, message: "Payment status updated", payment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment verification failed", error });
  }
};
