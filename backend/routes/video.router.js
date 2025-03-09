import express from "express";
import { 
  getVerifiedVideos, 
  videoUpload, 
  videoUploads, 
  videoVerificationCheck, 
  videoVerified 
} from "../controller/adminController.js";
import { verifyjwt } from "../middleware/authMiddleware.js";
import { roleAuth } from "../middleware/roleAuth.js";
import upload from "../utils/multer.js";

const router = express.Router();

// ✅ Upload Video (POST)
router.post("/uploadVideos", verifyjwt, upload.single("video"), videoUpload);

// ✅ Get Uploaded Videos for a User (GET)
router.get("/uploadVideo", verifyjwt, videoUploads);

// ✅ Get Verified Videos (For Public/Users)
router.get("/getVerifiedVideos",verifyjwt, getVerifiedVideos);


router.post("/adminVerified",videoVerified);

// ✅ Check Video Verification Status
router.get("/videoVerified", videoVerificationCheck);
router.get("/getAllVideo",verifyjwt,getVerifiedVideos)

export default router;
