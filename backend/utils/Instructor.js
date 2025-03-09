import { v2 as Instructor } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
// Configure Cloudinary
Instructor.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME_INSTRUCTOR, 
  api_key: process.env.CLOUDINARY_API_KEY_INSTRUCTOR,      
  api_secret: process.env.CLOUDINARY_API_SECRET_INSTRUCTOR
});

export default Instructor;
