import React, { useState } from "react";
import "./login.css"; 
import "boxicons/css/boxicons.min.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { Link, useNavigate } from "react-router-dom";

import OAuth from "../components/OAuth";



const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  
  const handleLoginClick = () => {
    setIsLogin(true);
    setErrorMessage(""); 
  };

  const handleRegisterClick = () => {
    setIsLogin(false);
    setErrorMessage(""); 
  };

 
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.user.name);
        


      
        Toastify({
            text: "🎉 Login Successful!",
            duration: 3000, 
            gravity: "top", 
            position: "center", 
            stopOnFocus: true,
            style: {
                background: "linear-gradient(90deg, #d4fc79, #96e6a1)", 
                color: "green", 
                fontSize: "16px", 
                fontWeight: "bold", 
                borderRadius: "12px", 
                padding: "15px", 
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", 
                textAlign: "center", 
                position: "relative", 
            },
        }).showToast();
       addGreenLine();
       setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
        Toastify({
            text: "❌ Login Failed! Please Try Again.",
            duration: 3000, 
            gravity: "top", 
            position: "center",
            stopOnFocus: true, // Pause when hovered
            style: {
                background: "linear-gradient(90deg, #ff9a9e, #fecfef)", // Attractive gradient
                color: "red", // Red text
                fontSize: "16px", // Larger font for readability
                fontWeight: "bold", // Bold text
                borderRadius: "12px", // Smoother corners
                padding: "15px", // More padding
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", // Glow effect
                textAlign: "center", // Center-align the text
                position: "relative", // For progress bar positioning
            },
        }).showToast();
        addGreenLine();
    }
    
    // Function to add an enhanced green progress line
    function addGreenLine() {
        const toastContainer = document.querySelector(".toastify");
        if (toastContainer) {
            const progressBar = document.createElement("div");
            progressBar.style.position = "absolute";
            progressBar.style.bottom = "0"; // Position at the bottom of the toast
            progressBar.style.left = "0";
            progressBar.style.width = "100%";
            progressBar.style.height = "5px"; // Slightly thicker progress bar
            progressBar.style.backgroundColor = "#4caf50"; // Bright green progress bar
            progressBar.style.borderRadius = "0 0 12px 12px"; // Match the toast's rounded corners
            progressBar.style.animation = "progressBar 3s linear";
            toastContainer.appendChild(progressBar);
        }
    }
    
    
    const style = document.createElement("style");
    style.innerHTML = `
    @keyframes progressBar {
        from {
            width: 100%;
        }
        to {
            width: 0;
        }
    }
    
    /* Toastify Container Custom Styles */
    .toastify {
        position: fixed !important; /* Make sure it is fixed on the screen */
        top: 20px; /* 20px from the top of the screen */
        left: 50%; /* Center horizontally */
        transform: translateX(-150%) !important; /* Adjust this to move it slightly left */
        z-index: 9999; /* Ensure it is above other elements */
    }
    `;
    document.head.appendChild(style);

      console.log("Login Successful", data);
     
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    }
  };

  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
     
      const data = await response.json();
      if (response.ok) {
      
        Toastify({
        text: "🎉Registration Successful!",
        duration: 3000, 
        gravity: "top", 
        position: "center", 
        stopOnFocus: true,
        style: {
            background: "linear-gradient(90deg, #d4fc79, #96e6a1)", 
            color: "green", 
            fontSize: "16px", 
            fontWeight: "bold", 
            borderRadius: "12px", 
            padding: "15px", 
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", 
            textAlign: "center", 
            position: "relative", 
        },
    }).showToast();
   addGreenLine();
   setTimeout(() => {
    navigate('/signup/verification');
  }, 3000);
} else {
    Toastify({
        text: "❌ Login Failed! Please Try Again.",
        duration: 3000, 
        gravity: "top", 
        position: "center",
        stopOnFocus: true, // Pause when hovered
        style: {
            background: "linear-gradient(90deg, #ff9a9e, #fecfef)", // Attractive gradient
            color: "red", // Red text
            fontSize: "16px", // Larger font for readability
            fontWeight: "bold", // Bold text
            borderRadius: "12px", // Smoother corners
            padding: "15px", // More padding
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", // Glow effect
            textAlign: "center", // Center-align the text
            position: "relative", // For progress bar positioning
        },
    }).showToast();
    addGreenLine();
}

// Function to add an enhanced green progress line
function addGreenLine() {
    const toastContainer = document.querySelector(".toastify");
    if (toastContainer) {
        const progressBar = document.createElement("div");
        progressBar.style.position = "absolute";
        progressBar.style.bottom = "0"; 
        progressBar.style.left = "0";
        progressBar.style.width = "100%";
        progressBar.style.height = "5px"; 
        progressBar.style.backgroundColor = "#4caf50"; 
        progressBar.style.borderRadius = "0 0 12px 12px"; 
        progressBar.style.animation = "progressBar 3s linear";
        toastContainer.appendChild(progressBar);
    }
}

// Add CSS animation for the progress bar
const style = document.createElement("style");
style.innerHTML = `
@keyframes progressBar {
    from {
        width: 100%;
    }
    to {
        width: 0;
    }
}

/* Toastify Container Custom Styles */
.toastify {
    position: fixed !important; /* Make sure it is fixed on the screen */
    top: 20px; /* 20px from the top of the screen */
    left: 50%; /* Center horizontally */
    transform: translateX(-150%) !important; /* Adjust this to move it slightly left */
    z-index: 9999; /* Ensure it is above other elements */
}
`;
document.head.appendChild(style);
    } catch (error) {
      setErrorMessage(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      
      <div
        className="col col-1"
        style={{
          borderRadius: isLogin ? "0 30% 20% 0" : "0 20% 30% 0",
        }}
      >
        <div className="image-layer">
          <img
            src="/LoginImg/white-outline.png"
            className="form-image-main"
            alt="Main"
          />
          <
            img src="/LoginImg/left_img.png"
            className="form-image left"
            alt="Main"
          />
          <
            img src="/LoginImg/coin.png"
            className="form-image coin"
            alt="Main"
          />
          <
            img src="/LoginImg/cloud.png"
            className="form-image cloud"
            alt="Main"
          />
          <
            img src="/LoginImg/dots.png"
            className="form-image dots"
            alt="Main"
          />
          <
            img src="/LoginImg/spring.png"
            className="form-image spring"
            alt="Main"
          />
        </div>
        <p className="featured-words">
          You Are Few Minutes Away From Boosting Your Skills With{" "}
          <span>Twist'n Tap</span>
        </p>
      </div>

      {/* Right Column */}
      <div className="col col-2">
        {/* Button Box */}
        <div className="btn-box">
          <button
            className="btn btn-1"
            id="login"
            onClick={handleLoginClick}
            style={{
              backgroundColor: isLogin ? "#21264D" : "rgba(255,255,255,0.2)",
            }}
          >
            Sign In
          </button>
          <button
            className="btn btn-2"
            id="Register"
            onClick={handleRegisterClick}
            style={{
              backgroundColor: isLogin ? "rgba(255,255,255,0.2)" : "#21264D",
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        <div
          className="login-form"
          style={{
            left: isLogin ? "50%" : "150%",
            opacity: isLogin ? 1 : 0,
          }}
        >
          <div className="form-title">
            <span>Sign In</span>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={handleLoginSubmit}>
            <div className="form-inputs">
              <div className="input-box">
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="bx bx-user icon"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className="bx bx-lock-alt icon"></i>
              </div>
              <div className="forgot-pass">
          <Link to="/forgetPassword">Forgot Password?</Link>
        </div>
              <div className="input-box">
                <button className="input-submit">
                  <span>Sign In</span>
                  <i className="bx bx-right-arrow-alt"></i>
                </button>
                <OAuth/>
              </div>
            </div>
          </form>
        </div>

        
        <div
          className="register-form"
          style={{
            left: isLogin ? "-50%" : "50%",
            opacity: isLogin ? 0 : 1,
          }}
        >
          <div className="form-title">
            <span>Create Account</span>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-inputs">
              <div className="input-box">
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="bx bx-envelope icon"></i>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <i className="bx bx-user icon"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className="bx bx-lock-alt icon"></i>
              </div>
              
              <div className="input-box">
                <button className="input-submit">
                  <span>Sign Up</span>
                  <i className="bx bx-right-arrow-alt"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;