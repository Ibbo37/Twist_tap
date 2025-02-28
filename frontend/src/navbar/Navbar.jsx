import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 
import { Link as SLink } from "react-scroll";
import { useAuth } from "../utils/AuthContext";
const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();

  // Retrieve the profile picture from localStorage
  const profilePic = localStorage.getItem("profilePic");
  // Default Profile Image URL
  const defaultImage = "https://via.placeholder.com/40"; // Default image (40x40 size)

  return (
    <>
      <div>
        <header>
          <nav>
            <a href="/" className="active">Home</a>
            <Link to="/Admission" className="admission">Admission</Link>
            <Link to="/Workshop" className="workshop">Workshop</Link>
            <Link to="/Upload" className="upload">Upload</Link>
            <SLink
              to="bottom-section"
              className="nav-link"
              smooth={true}
              duration={700}
            >
              About
            </SLink>
            <a href="#">Contact</a>
            {isLoggedIn && user ? (
            <div className="user-profile">
              <Link to="/userdashboard" className="user-initials">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span>{user}</span>
                )}
              </Link>
            </div>
          ) : (
            <Link to="/login-register" className="login">
              Login
            </Link>
          )}

            {/* Default Profile Icon */}
            {/* <Link to="/profile" className="profile-icon">
              <img
                src={"/Profile/P1.webp"} // Default image will always show
                alt="Default Profile"
              />
            </Link> */}
          </nav>
        </header>
      </div>
    </>
  );
};

export default Navbar;
