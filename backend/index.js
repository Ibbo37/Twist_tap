
import express from "express"
import multer from "multer"
import cors from "cors"
import {v2 as cloudinary} from "cloudinary"
import bodyParser from "body-parser";

const app = express();
const port = 5000;


app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle video uploads
// app.post("/upload", upload.single("video"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const result = await cloudinary.uploader.upload_stream(
//       { resource_type: "video" },
//       (error, result) => {
//         if (error) {
//           return res.status(500).json({ error });
//         }

//         res
//           .status(200)
//           .json({ message: "Upload successful", url: result.secure_url });
//       }
//     );

//     // Send file buffer to Cloudinary
//     result.end(req.file.buffer);
//   } catch (error) {
//     console.error("Upload failed: ", error);
//     res.status(500).json({ message: "Upload failed", error });
//   }
// });

// // Route to fetch videos from Cloudinary
// app.get("/videos", async (req, res) => {
//   try {
//     const result = await cloudinary.api.resources({
//       resource_type: "video",
//       max_results: 10,
//     });

//     res.status(200).json(result.resources); // Send videos to frontend
//   } catch (error) {
//     res.status(500).json({ error });
//     console.error("Error fetching videos:", error);
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
