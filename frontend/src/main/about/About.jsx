import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-section">
      {/* Logo and Text Container */}
      <div className="about-container">
        <div className="icon-container">
          <img src="/HomeAboutUsImg/icon2.png" alt="Logo" className="about-logo" />
        </div>
        <div className="text-container">
          <span className="about-text">Twist and Tap</span>
        </div>
      </div>

      {/* Quote Section */}
      <div className="quote-container">
        <p className="about-quote">
          "At Twist’n Tap, dance is more than movement—it's a celebration of passion, creativity, and expression."
        </p>
      </div>

      {/* Discover, Quick Links, Contact Section */}
      <div className="side-section-container">
        {/* Discover Section */}
        <div className="discover-section">
          <h3 className="discover-heading">Discover</h3>
          <ul className="discover-list">
            <li>Home</li>
            <li>About</li>
            <li>Feedback</li>
            <li>Upload</li>
            <li>Admission</li>
            <li>Workshop</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="quicklinks-section">
          <h3 className="quicklinks-heading">Quick Links</h3>
          <ul className="quicklinks-list">
            <li>Contact Us</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h3 className="contact-heading">Contact</h3>
          <ul className="contact-list">
            <li>
              <strong>Address:</strong> Chembur, India
            </li>
            <li>
              <strong>Email:</strong> moyemoye40@vesasc.com
            </li>
            <li>
              <strong>Phone:</strong> 012345678910
            </li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div className="subscribe-section">
          <h3 className="subscribe-heading">Join Us</h3>
          <p className="subscribe-text">
            Stay in the loop with Moye Moye Travels. Subscribe for exclusive travel updates, deals, and inspirations – your passport to a world of exciting journeys awaits!
          </p>
          <input
            type="email"
            className="subscribe-input"
            placeholder="Enter your email"
          />
          <button className="subscribe-button">Join</button>
        </div>
      </div>
    </div>
  );
};

export default About;
