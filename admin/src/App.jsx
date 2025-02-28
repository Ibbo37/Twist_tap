import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import React from "react";
import AuthForm from "./login-register/AuthForm";
import VerificationPage from "./components/VerificationPage";
import VerificationOtp from "./components/VerificationOtp";
import ResetPassword from "./components/ResetPassword";
import ForgetPassword from "./components/ForgetPassword";
import AdminDashboard from "./admin_dashboard/AdminDashboard";
import Admin from "./admin_dashboard/Admin";


function App() {

  return (
    
        <Router>

          <Routes>
            
            <Route path="/" element={<AuthForm />} />
            <Route path="/signup/verification" element={<VerificationPage/>} />
            

            {/* <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/approvedVideos" element={<ApprovedVideos />} />
            <Route path="/videoVerification" element={<VideoVerification />} /> */}

            <Route path="/verification-otp" element={<VerificationOtp/>} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} /> 
            <Route path="/admindashboard" element={<AdminDashboard />} /> 
            <Route path="/Admin" element={<Admin/>}/>        
          </Routes>
        </Router>
     
  );
}

export default App;
