import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./login_register/Register";
import "./index.css";
import InstructorUpload from "./component/InstructorUpload";

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen flex justify-center items-center">
        <Routes>
          {/* Default Home Route */}
          <Route path="/" element={<h1 className="text-pink-500 text-3xl">Welcome to Instructor Portal</h1>} />
          
          {/* Instructor Registration Route */}
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<InstructorUpload />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;