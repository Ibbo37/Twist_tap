import express from "express";
import {
  getVerifiedVideos,
  getVerifiedVideosReel,
  videoUpload,
  videoUploads,
  videoVerificationCheck,
  videoVerified,
} from "../controller/adminController.js";
import { verifyjwt } from "../middleware/authMiddleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/userUpload",verifyjwt,upload.single("videoFile"), videoUpload);

router.get("/uploadVideo", verifyjwt, videoUploads);

router.get("/getVerifiedVideos", verifyjwt, getVerifiedVideos);

router.post("/adminVerified", videoVerified);

router.get("/videoVerified", videoVerificationCheck);
router.get("/getAllVideo", verifyjwt, getVerifiedVideos);

router.route("/reel").get(getVerifiedVideosReel)


export default router;
