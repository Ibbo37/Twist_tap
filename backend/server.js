import express from "express";
import bodyParser from "body-parser";
import { DBConnect } from "./DBConnect.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/user.route.js";
import video from "./routes/video.router.js";
import admissionRouter from "./routes/admission.route.js";
import paymentRoutes from "./routes/payment.route.js";
import adminDashboard from "./routes/admin.route.js";
import adminTutorial from "./routes/Tutorial.js";
import practiceRoutes from "./routes/practice.js";


const app = express();
const port = 5000;

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5175","http://localhost:5176"],
    credentials: true,
  })
);

DBConnect();

app.use("/api/auth", router);
app.use("/api/video",video)
app.use("/api/payments", paymentRoutes);
app.use("/api/admission", admissionRouter); 
app.use("/api/admin",adminTutorial); 

app.use("/api/adminDashboard",adminDashboard )
app.use("/api/practice", practiceRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


