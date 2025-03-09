import Razorpay from "razorpay";
import Payment from "../model/Payment.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});


export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const options = {
      amount: parseInt(amount) * 100,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log("Razorpay Error: ", error);
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;

    
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid Payment Signature" });
    }

    
    const newPayment = new Payment({
      userId: req.user._id,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: amount,
      currency: "INR",
      status: "Success",
    });

    await newPayment.save();
    res.json({ success: true, message: "Payment verified and saved" });
  } catch (error) {
    console.log("Payment Verification Error: ", error);
    res.status(500).json({ error: "Error verifying payment" });
  }
};
