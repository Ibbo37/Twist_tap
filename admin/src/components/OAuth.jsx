import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { app } from '../../firebase';
import './OAuth.css';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    
    const navigate = useNavigate();
    
    const handleGoogleClick = async () => {
      try {
        
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
    
        
        const result = await signInWithPopup(auth, provider);
        console.log("Google Sign-In Result:", result);
    
        
        const res = await fetch('http://localhost:5000/google', {
          method: "POST",
          
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({
            username: result.user.displayName,
            email: result.user.email,
          }),
          credentials: "include",
        });
    
        const data = await res.json();
        console.log("API Response:", data);
    
        
        if (res.ok) {
          navigate("/");
        } else {
          console.log("Login failed:", data.message);
        }
      } catch (error) {
        console.error("Could not sign in with Google:", error);
      }
    };
    

    const handleFacebookClick = async () => {
        try {
            const provider = new FacebookAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);
        } catch (error) {
            console.log('Could not sign in with Facebook');
        }
    };

    const handleGithubClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);
        } catch (error) {
            console.log('Could not sign in with GitHub');
        }
    };

    return (
        <div className="oauth-container">
            <button onClick={handleGoogleClick} className="oauth-button google">
                <FcGoogle className="icon" />
            </button>
            <button onClick={handleFacebookClick} className="oauth-button facebook">
                <FaFacebook className="icon" />
            </button>
            <button onClick={handleGithubClick} className="oauth-button github">
                <FaGithub className="icon" />
            </button>
        </div>
    );
};

export default OAuth;
