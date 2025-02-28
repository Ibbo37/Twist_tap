import { sendVerificationEmail } from "../helper/sendVerificationEmail.js";
import { Unverified } from "../model/Unverified.model.js";
import { User } from "../model/user.model.js";

const generateaccesstoken = async (id) => {
  try { 
    const user = await User.findById(id);
    
    if (!user) {
      throw new Error("User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error.message);
    throw new Error("Failed to generate tokens");
  }
};

const setCookie = (res, accesstoken, refreshtoken) => {
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 60 * 60 * 1000, 
  };
  res.cookie("accesstoken", accesstoken, options);
  const options1 = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  };
  res.cookie("refreshtoken", refreshtoken, options1);
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const Register = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {


    if (!username || !password || !email) {
      return res.status(400).json({ message: "Please fill all details" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or Email already exists",
      });
    }

    const verifyexpiry = new Date();
    verifyexpiry.setSeconds(verifyexpiry.getSeconds() + 50); 
    const verify = generateVerificationCode();
    await sendVerificationEmail(email, verify)
    const unverified = await Unverified.create({
      email,
      password,
      username,
      role,
      verify,
      verifyexpiry,
    });
    return res.status(201).json({
      message: "User registered successfully",
      
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const verify = async (req, res) => {
  const { verify } = req.body;

  console.log(verify);

  try {
    if (!verify) {
      return res.status(400).json({ message: "Please provide a verification code" });
    }

    
    const unverifiedUser = await Unverified.findOne({ verify });
    if (!unverifiedUser) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

   
    const currentTime = new Date();
    if (currentTime > unverifiedUser.verifyexpiry) {
      await Unverified.deleteOne({ email: unverifiedUser.email });
      return res.status(400).json({ message: "Verification code has expired" });
    }

    
    const user = await User.create({
      username: unverifiedUser.username,
      email: unverifiedUser.email,
      password: unverifiedUser.password, 
      role: unverifiedUser.role,
    });

    
    const { accessToken, refreshToken } = await generateaccesstoken(user._id);
    setCookie(res, accessToken, refreshToken);

   
    return res.status(201).json({
      message: "User verified and registered successfully",
      user:{
        name: user.username,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all details" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateaccesstoken(user._id);
    setCookie(res, accessToken, refreshToken);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loginUser = await User.findById(user._id).select("-password -refreshToken");
    
    return res
      .status(200)
      .json({ message: "Login successful", user:{
        name: loginUser.username,
        email: loginUser.email,
        role: loginUser.role,
        accessToken:accessToken,
      }, }
);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const Logout = async (req, res) => {
  console.log(req.user._id);
  try {
    await User.findByIdAndDelete(
      req.user._id,
      {
        $set: { refreshToken: undefined }
      },
      {
        new: true
      }
    )
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, 
    };
    const options1 = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    };
    return res
      .status(200)
      .clearCookie("accesstoken", options)
      .clearCookie("refreshtoken", options1)
      .json({ message: "Logout Successful", });
  } catch (error) {
    console.error("Logout failed", error)
  }
};

export const Google = async (req, res) => {
  try {
   
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      
      const generatePassword = Math.random().toString(36).slice(-8);
  
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: generatePassword,
      });
    }

    const {accessToken, refreshToken} = await generateaccesstoken(user._id)
    setCookie(res, accessToken, refreshToken);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loginUser = await User.findById(user._id).select("-password -refreshToken");
    
    return res
      .status(200)
      .json({ message: "Login Successful", user: loginUser }
);

  } catch (error) {
    console.error("Google login error:", error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

