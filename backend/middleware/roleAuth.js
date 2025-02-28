import { User } from "../model/user.model.js"

export const roleAuth = async (req,res) =>{
    const user = await User.findById(req.user._id)
    if(user.role !== "Admin"){
        return res.status(401).json({message: "Unauthorized"})
    }
}