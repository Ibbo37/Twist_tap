import exprees from "express";
import { Practice } from "../controller/Practice.js";
import upload from "../utils/multer.js";


const prac = exprees.Router();

prac.route("/pracvideo").post(upload.single("video"),Practice)

export default prac;