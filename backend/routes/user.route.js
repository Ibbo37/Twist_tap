import { Router } from "express";
import { Google, Login, Logout, Register, verify } from "../controller/user.controller.js";
import { verifyjwt } from "../middleware/authMiddleware.js";
import { ForgetPassword, resetPassword, verifyotp } from "../controller/Password.js";
const router = Router()

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/logout").post(verifyjwt,Logout)
router.route("/google").post(Google)
router.route("/verify").post(verify)
router.route('/verifyOtp').post(verifyotp)
router.route('/forgetpassword').post(ForgetPassword)

router.route("/reset-password").patch(verifyjwt,resetPassword)
export default router;



