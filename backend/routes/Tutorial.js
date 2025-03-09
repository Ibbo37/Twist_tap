import exprees from "express";
import { getAllTutorials, uploadTutorial } from "../controller/Tutorial.js";
import upload from "../utils/multer.js";


const tut = exprees.Router();


tut.route("/uploadTutorial").post(upload.single("videoUrl"),uploadTutorial)
tut.route("/getAllTutorial").get(getAllTutorials)

export default tut;