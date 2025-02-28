import mongoose from "mongoose";
const unverified = new mongoose.Schema({
    username:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    role:{
        type:String,
        enum:["MasterAdmin","Admin","User","Instructor"],
        default:"User"
    },
    verify:{
        type: String
    },
    verifyexpiry:{
        type: String
    }

})
export const Unverified = mongoose.model("Demo",unverified)
