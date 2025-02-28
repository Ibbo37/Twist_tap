import { sendVerificationEmail } from "../helper/sendVerificationEmail.js";
import { User } from "../model/user.model.js";
import { Verify } from "../model/Verify.model.js";
import bcrypt from "bcrypt";
export const ForgetPassword = async (req, res) => {

  const { email } = req.body
  try {
    const exitEmail = await User.findOne({ email })
    if (!exitEmail) {
      return res
        .status(401)
        .json({ message: " The Email you Provide is doesn't Exit" })
    }
    const verifyTokens = Math.floor(100000 + Math.random() * 900000)

    const verifyCode = await Verify.create({
      Email: email,
      VerifyCode: verifyTokens
    })

    await sendVerificationEmail(email, verifyTokens)
    return res.status(200).json({ message: " Email has Send" })
  } catch (error) {
    console.log("Internal Server Error", error.message);
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const verifyotp = async (req, res) => {
  const { verifyOtp } = req.body;

  try {
    console.log(verifyOtp);


    const existingVerification = await Verify.findOne({ VerifyCode: verifyOtp });

    console.log(existingVerification.VerifyCode);


    if (existingVerification && existingVerification.VerifyCode) {
      return res.status(200).json({ message: "Verification Code is Right" });
    }

    return res.status(400).json({ message: "Verification Code is Wrong" });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  console.log(req.user._id);
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    if (!password) {
      return res
        .status(400)
        .json({ message: "Please Enter Password" })
    }
    const update = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          password: hashedPassword
        }
      }, {
      new: true
    }
    )
    if (!update) {
      return res
        .status(401)
        .json({
          message: " Not Update "
        })
    }
    return res
      .status(200)
      .json({
        message: "Update is Completed"
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal Server Error"
      })
  }
}