import express from "express";
import { getVerifiedVideos, videoUpload, videoUploads, videoVerificationCheck, videoVerified } from "../controller/adminController.js";
import { verifyjwt } from "../middleware/authMiddleware.js";
import { roleAuth } from "../middleware/roleAuth.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.route("/uploadVideo").post(verifyjwt,upload.single("video"),videoUpload)
router.route("/getVerifiedVideos").get(getVerifiedVideos)
router.route("/adminVerified").post(verifyjwt,roleAuth,videoVerified)
router.route("/videoVerified").get(videoVerificationCheck)
router.route("/uploadVideo").get(verifyjwt,videoUploads)
export default router;