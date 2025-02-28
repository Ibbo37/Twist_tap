import mongoose from "mongoose";
const VerifySchema = new mongoose.Schema({
    Email:{
        type:String
    },
    VerifyCode:{
        type: String
    }
})

export const Verify= mongoose.model("verify",VerifySchema)