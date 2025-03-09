import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyjwt = async (req, res, next) => {
  try {
   

    const token = req.cookies?.accesstoken || req.headers.authorization?.split(" ")[1];
   console.log(token);
   

    if (!token) {
      return res.status(401).json({ message: "No token provided. Unauthorized access." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("Decoded token:", decoded);
    } catch (err) {
      console.error("JWT Error:", err.name, err.message);
      return res.status(401).json({
        message: err.name === "TokenExpiredError" ? "Session expired. Please log in again." : "Invalid token.",
      });
    }

    const user = await User.findById(decoded._id).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
