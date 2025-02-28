import React from "react";
import "./HomeChoreographer.css"; // Ensure to link the correct CSS file

const HomeChoreographer = () => {
  return (
    <>
      <h1 className="workshop-heading">Attend Workshops of Expert Choreographer</h1>

      {/* Container for the grid of cards */}
      <div className="Wcard-container">
        {/* 5 cards */}
        <div className="Wcard">
          <div className="Wimage">
            <img src="/WorkshopImg/HW1.webp" alt="Workshop" />
          </div>
          <div className="Wtext">
            <h3>Workshop 1</h3>
          </div>

          {/* Upper Hover Content */}
          <div className="Wcard-upper">
            <p><strong>Experience:</strong> 5+ years in dance education</p>
            <p><strong>Networks:</strong> International Dance Council</p>
          </div>

          {/* Lower Hover Content */}
          <div className="Wcard-lower">
            <p><strong>Styles of Dance:</strong> Ballet, Hip Hop, Jazz</p>
            <p>Other details...</p>
          </div>
        </div>

        <div className="Wcard">
          <div className="Wimage">
            <img src="/WorkshopImg/HW2.jpg" alt="Workshop" />
          </div>
          <div className="Wtext">
            <h3>Workshop 2</h3>
          </div>

          {/* Upper Hover Content */}
          <div className="Wcard-upper">
            <p><strong>Experience:</strong> 6+ years in dance education</p>
            <p><strong>Networks:</strong> Dance World Network</p>
          </div>

          {/* Lower Hover Content */}
          <div className="Wcard-lower">
            <p><strong>Styles of Dance:</strong> Salsa, Contemporary, Tango</p>
            <p>Other details...</p>
          </div>
        </div>

        <div className="Wcard">
          <div className="Wimage">
            <img src="/WorkshopImg/HW3.avif" alt="Workshop" />
          </div>
          <div className="Wtext">
            <h3>Workshop 3</h3>
          </div>

          {/* Upper Hover Content */}
          <div className="Wcard-upper">
            <p><strong>Experience:</strong> 8+ years in dance education</p>
            <p><strong>Networks:</strong> Global Dance Connection</p>
          </div>

          {/* Lower Hover Content */}
          <div className="Wcard-lower">
            <p><strong>Styles of Dance:</strong> Ballet, Contemporary, Jazz</p>
            <p>Other details...</p>
          </div>
        </div>

        <div className="Wcard">
          <div className="Wimage">
            <img src="/WorkshopImg/HW4.jpg" alt="Workshop" />
          </div>
          <div className="Wtext">
            <h3>Workshop 4</h3>
          </div>

          {/* Upper Hover Content */}
          <div className="Wcard-upper">
            <p><strong>Experience:</strong> 10+ years in dance education</p>
            <p><strong>Networks:</strong> Dance Educators Alliance</p>
          </div>

          {/* Lower Hover Content */}
          <div className="Wcard-lower">
            <p><strong>Styles of Dance:</strong> Hip Hop, Jazz, Ballet</p>
            <p>Other details...</p>
          </div>
        </div>

        <div className="Wcard">
          <div className="Wimage">
            <img src="/WorkshopImg/HW5.jpeg" alt="Workshop" />
          </div>
          <div className="Wtext">
            <h3>Workshop 5</h3>
          </div>

          {/* Upper Hover Content */}
          <div className="Wcard-upper">
            <p><strong>Experience:</strong> 7+ years in dance education</p>
            <p><strong>Networks:</strong> Dance Experts Worldwide</p>
          </div>

          {/* Lower Hover Content */}
          <div className="Wcard-lower">
            <p><strong>Styles of Dance:</strong> Tap, Contemporary, Ballet</p>
            <p>Other details...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeChoreographer;
