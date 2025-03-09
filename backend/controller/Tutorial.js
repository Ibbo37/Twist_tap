import TTutorial from "../model/Tutorail_schema.js";
import cloudinary from "../utils/cloudinary.js";



export const uploadTutorial = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !req.file) {
            return res.status(400).json({ message: "Title and Video URL are required!" });
        }
        const videoPath = req.file.path;
        const uploadResult = await cloudinary.uploader.upload(videoPath, {
            resource_type: "video",
            folder: "Tutorial",
        });
        if (!uploadResult.secure_url) {
            return res.status(500).json({ message: "Error uploading video!" });
        }
        const newTutorial = new TTutorial({
            title,
            videoUrl: uploadResult.secure_url,
            description,
        });

        await newTutorial.save();
        res.status(201).json({ message: "Tutorial uploaded successfully!", tutorial: newTutorial });
    } catch (error) {
        res.status(500).json({ message: "Error uploading tutorial!", error });
    }
};

// ✅ 2. Fetch All Tutorials (Student)
export const getAllTutorials = async (req, res) => {
    try {
        const tutorials = await TTutorial.find().sort({ createdAt: -1 });
        res.status(200).json(tutorials);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tutorials!", error });
    }
};

// ✅ 3. Fetch Single Tutorial by ID
export const getTutorialById = async (req, res) => {
    try {
        const { id } = req.params;
        const tutorial = await TTutorial.findById(id);

        if (!tutorial) {
            return res.status(404).json({ message: "Tutorial not found!" });
        }

        res.status(200).json(tutorial);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tutorial!", error });
    }
};
