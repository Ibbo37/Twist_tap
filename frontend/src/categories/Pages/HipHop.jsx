import React, { useState, useRef, useEffect } from 'react';
import './HipHop.css'; // Import the CSS file
import Navbar from '../../navbar/Navbar';
import { Link } from 'react-router-dom';

const HipHop = () => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  const [activeCard, setActiveCard] = useState(null);

  const [showAdmission, setShowAdmission] = useState(false); // State to toggle the Admission component

  const handleClick = () => {
    setShowAdmission(!showAdmission); // Toggle the state
  };

  const handleCardClick = (cardId) => {
    setActiveCard(cardId === activeCard ? null : cardId); // Toggle card visibility
  };

  return (
    <>
      <Navbar /> {/* Navbar remains as-is */}

      {/* Main content section */}
      <div className="hiphop-container">
        <h1 className="hiphop-heading">Hip Hop</h1>

        {/* First Video (Manual Play) */}
        <video className="hiphop-video" controls>
          <source src="/CategoriesImg/Pages/HipHopV1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* About Hip Hop Section */}
      <div className="hiphop-info">
        <div className="about-info">
          <h2 className="about-heading">About Hip Hop</h2>
          <p>
            Hip Hop dance is a vibrant and energetic dance style that originated in the 1970s in New York City.
            It evolved from street culture and includes various styles like breakdancing (b-boying), locking, and popping. 
            Hip Hop is a fusion of dance, music, and fashion, with a strong emphasis on creative expression and rhythm. 
            This dance form not only enhances physical fitness but also serves as a powerful medium for self-expression 
            through its unique moves and style.
          </p>

          {/* Hover card (Video auto-play here) */}
          <div className="hover-card">
            <div className="hover-card-content">
              <video className="hover-card-video" autoPlay loop muted>
                <source src="/CategoriesImg/Pages/hiphopV2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="hover-card-text">
                <h2 className="hover-card-heading">More About Hip Hop</h2>
                <p className="hover-card-description">
                  <b>- Origins:</b> Hip hop dance began in the 1970s in the South Bronx, New York, as part of hip hop culture, alongside music and graffiti art<br />
                  <b>- Styles:</b> It includes styles like "Breaking", "Locking", "Popping", and "Krumping", each with unique movements influenced by music and environment.<br />
                  <b>- Influence:</b> Hip hop dance is shaped by hip hop, rap, and funk music, reflecting themes of freedom and personal expression.<br />
                  <b>- Characteristics:</b> Known for energetic, improvisational movements, focusing on sharp footwork and creative, freestyle elements.<br />
                  <b>- Performance:</b> Initially performed on the streets, hip hop dance now appears in competitions, music videos, and theater, both in groups and solo.<br />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image styling (original image on the right side) */}
        <img
          className="hiphop-image"
          src="/CategoriesImg/Pages/hiphop2.webp" // Original image on the right
          alt="Hip Hop"
        />
      </div>

      {/* Image Grid Section */}
      <div className="image-grid-section">
        <h2 className="grid-heading">Styles Of Hip Hop</h2>
        <div className="image-grid">
          {/* First Image */}
          <div className={`grid-item ${activeCard === 1 ? 'active' : ''}`} onClick={() => handleCardClick(1)}>
            <img src="/CategoriesImg/Pages/style1.jpg" alt="Hip Hop 1" className="grid-image grid-image1" />
            <p className="grid-text">Breaking</p>
            {activeCard === 1 && (
              <div className="card1">
                <p>Also known as B-boying, this acrobatic style is characterized by complicated floor work, spinning, and contorting.</p>
              </div>
            )}
          </div>

          {/* Second Image */}
          <div className={`grid-item ${activeCard === 2 ? 'active' : ''}`} onClick={() => handleCardClick(2)}>
            <img src="/CategoriesImg/Pages/style2.webp" alt="Hip Hop 2" className="grid-image grid-image2" />
            <p className="grid-text">Locking</p>
            {activeCard === 2 && (
              <div className="card2">
                <p>This style involves quick movements, sharp pauses, and exaggerated gestures. Dancers quickly move their bodies and then freeze them in place.</p>
              </div>
            )}
          </div>

          {/* Third Image */}
          <div className={`grid-item ${activeCard === 3 ? 'active' : ''}`} onClick={() => handleCardClick(3)}>
            <img src="/CategoriesImg/Pages/style3.webp" alt="Hip Hop 3" className="grid-image grid-image3" />
            <p className="grid-text">Popping</p>
            {activeCard === 3 && (
              <div className="card3">
                <p>This style involves quickly contracting muscles to create a jerking effect in the dancer's body.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admission Section (Placed Last) */}
      <div className="admission-section">
        {/* Main heading */}
        <h1 className="admission-heading">Admission</h1>

        <div className="admission-container">
          {/* Left side image (kept as is) */}
          <div className="admission-left">
            <img
              className="admission-image"
              src="/CategoriesImg/Pages/add1.jpg"
              alt="Admission"
            />
          </div>

          {/* Right side heading and quote */}
          <div className="admission-right">
            <h2 className="admission-quote-heading"></h2>
            <p className="admission-quote-text">
              "Join Twist'n Tap and take the first step towards your dance dreams. Enroll now to learn, grow, and groove with expert guidance!"
            </p>
            {/* Click Here Button */}
            <h3 className="admission-click-here"><Link to="/admission" className='.no-link-style'>Click Here</Link></h3>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default HipHop;
