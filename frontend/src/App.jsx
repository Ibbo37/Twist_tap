import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Correct imports
import React, { Profiler } from "react";
import Home from "./main/home/Home";
import AuthForm from "./login-register/AuthForm";
import HipHop from "./categories/Pages/HipHop"; // Importing category pages

import Upload from "./upload/Upload";
import Workshop from "./workshop/Workshop";
import Workshopreg from "./workshop/Workshopreg";
import {AuthProvider, useAuth} from "./utils/AuthContext";
import {AccessTokenProvider} from "./utils/RefreshTokenContext";
import Profile from "./profile/Profile";
import TrainingPage from "./components/TrainingPage";
import ApprovedVideos from "./Admin/ApprovedVideos";
import AdminDashboard from "./Admin/AdminDashboard";
import UserDashboard from "./User/userDashbaord";
import PaymentPage from "./components/PaymentPage";
import PaymentConfirmation from "./components/PaymentConfirmation";
import VideoVerification from "./Admin/VideoVerification";
import ResetPassword from "./components/ResetPassword";
import ForgetPassword from "./components/ForgetPassword";
import VerificationOtp from "./components/VerificationOtp";

  import VerificationPage from "./components/VerificationPage";

function App() {
  return (
    <AuthProvider>
      <AccessTokenProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login-register" element={<AuthForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/hiphop" element={<HipHop />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/workshop/workshopreg" element={<Workshopreg />} />

            <Route path="/signup/verification" element={<VerificationPage/>}/>

            <Route path="/admission" element={<TrainingPage />} />
            <Route path="/approvedVideos" element={<ApprovedVideos />} />
            <Route path="/admissionDashboard" element={<AdminDashboard />} />

            <Route path="/videoVerification" element={<VideoVerification />} />

            <Route path="/verification-otp" element={<VerificationOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path='/userdashboard' element={<UserDashboard />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/paymentconfirmation" element={<PaymentConfirmation />} />

          </Routes>
        </Router>
      </AccessTokenProvider>
    </AuthProvider>
  );
}

export default App;
