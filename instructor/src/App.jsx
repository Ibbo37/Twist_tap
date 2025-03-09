import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import React from "react";
import { AuthProvider } from "./utils/AuthContext";  
import AuthForm from "./login-register/AuthForm";
import VerificationPage from "./components/VerificationPage";
import VerificationOtp from "./components/VerificationOtp";
import ResetPassword from "./components/ResetPassword";
import ForgetPassword from "./components/ForgetPassword";
import InstructorDashboard from "./instructor_dashboard/InstructorDashboard";
import Profile from "./InstructorProfile/Profile";
import InstructorUpload from "./components/InstructorUpload";

function App() {
  return (
    <AuthProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/signup/verification" element={<VerificationPage />} />
          <Route path="/verification-otp" element={<VerificationOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} /> 
          <Route path="/instructordashboard" element={<InstructorDashboard/>} /> 
          <Route path='/insdashboard' element={<Profile />} />
          <Route path="/uploads" element={<InstructorUpload/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
