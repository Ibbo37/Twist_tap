import express from "express";
import { initiatePayment, retrievePayment, verifyPayment } from "../controller/payment.controller.js";
import { verifyjwt } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/initiate", verifyjwt,initiatePayment);  // User starts the payment
router.post("/verify", verifyPayment);
router.get("/retrieve", retrievePayment)  // Verify payment after success

export default router;
