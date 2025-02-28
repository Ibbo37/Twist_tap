import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";


export const verifyjwt = async (req, res, next) => {
  try {
   
    const token= req.cookies?.accesstoken
    console.log(token);
    
    if (!token) {
      return res.status(401).json({ message: "No token provided. Unauthorized access." });
    }
   
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    
    
    const user = await User.findById(decoded._id).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
