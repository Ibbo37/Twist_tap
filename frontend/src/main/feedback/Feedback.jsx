import React, { useState, useEffect } from 'react';
import './Feedback.css'; // CSS file for styling

const feedbackData = [
  {
    quote: "Twist'n Tap is amazing! It’s more than just learning dance; it’s a community where I feel supported, challenged, and inspired. Highly recommend!",
    name: "Shyama Chawla",
    image: "/FeedbackImg/F1.jpeg", // Update path
    rating: "★★★★★",
  },
  {
    quote: "Twist'n Tap has completely transformed my dance journey! The tutorials are easy to follow, and the workshops have helped me improve my skills tremendously.",
    name: "Sneha Panda",
    image: "/FeedbackImg/F2.jpeg", // Update path
    rating: "★★★★★",
  },
  {
    quote: "I love how accessible dance learning is through Twist'n Tap. No matter where I am, I can always practice and grow. It's a great platform for dancers at all levels!",
    name: "Sneha Panda",
    image: "/FeedbackImg/F3.jpeg", // Update path
    rating: "★★★★★",
  },
  {
    quote: "The instructors at Twist'n Tap are incredibly knowledgeable, and the interactive workshops keep me motivated. This platform is a game-changer for dance enthusiasts.",
    name: "Snehal",
    image: "/FeedbackImg/F4.jpeg", // Update path
    rating: "★★★★★",
  },
  {
    quote: "As someone who’s always wanted to learn dance but never had the time or resources, Twist'n Tap has made it possible. The step-by-step lessons are perfect for beginners!",
    name: "Sneha Mourya",
    image: "/FeedbackImg/F1.jpeg", // Update path
    rating: "★★★★★",
  }
];

const Feedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
    }, 5000); // 5+ seconds for auto-change

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const goToNextFeedback = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
  };

  const goToPreviousFeedback = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + feedbackData.length) % feedbackData.length
    );
  };

  const { quote, name, image, rating } = feedbackData[currentIndex];

  return (
    <div className="feedback-section">
      <h1 className="feedback-heading">Hear From Our Students</h1>
      <div className="feedback-container">
        <button className="previous-button" onClick={goToPreviousFeedback}>←</button>
        <div className="feedback-item">
          <div className="feedback-quote">
            <span className="quote-icon">“</span>
            <p className="feedback-text">{quote}</p>
          </div>
          <div className="feedback-footer">
            <div className="student-info">
              <img src={image} alt={name} className="student-image" />
              <span className="student-name">{name}</span>
            </div>
            <div className="rating">{rating}</div>
          </div>
        </div>
        <button className="next-button" onClick={goToNextFeedback}>→</button>
      </div>
    </div>
  );
};

export default Feedback;
