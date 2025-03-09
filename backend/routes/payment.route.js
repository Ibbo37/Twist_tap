import express from "express";
import { createOrder, verifyPayment } from "../controller/payment.controller.js";
import { verifyjwt } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/order", createOrder);
router.post("/verify", verifyjwt,verifyPayment);

export default router;
