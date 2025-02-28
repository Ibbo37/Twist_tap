import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

export const Categories = () => {
  const danceCategories = [
    { name: 'Hip Hop', image: './CategoriesImg/hip_hop1.jpg', description: 'Hip Hop is a cultural movement and style of dance that originated in the streets of New York.', path: 'hiphop' },
    { name: 'Kathak', image: './CategoriesImg/kathak.jpg', description: 'Kathak is one of the 8 classical dances of India, known for its storytelling through intricate footwork and gestures.', path: '/kathak' },
    { name: 'Ballet', image: './CategoriesImg/Ballet.jpg', description: 'Ballet is a highly technical form of dance that combines grace, strength, and precision.', path: '/ballet' },
    { name: 'Contemporary', image: './CategoriesImg/Contemporary1.jpg', description: 'Contemporary dance is an expressive style of dance that blends elements from different genres including modern, jazz, and ballet.', path: '/contemporary' },
    { name: 'Salsa', image: './CategoriesImg/Salsa.jpg', description: 'Salsa is a popular social dance with Latin American origins, known for its energetic rhythm and footwork.', path: '/salsa' },
    { name: 'Jazz', image: './CategoriesImg/Jazz.webp', description: 'Jazz is a lively dance form characterized by energetic moves and improvisational style.', path: '/jazz' },
    { name: 'Folk Dance', image: './CategoriesImg/Folk Dance1.avif', description: 'Folk dances are traditional dances that express cultural heritage and stories.', path: '/folk-dance' },
    { name: 'Tap Dance', image: './CategoriesImg/Tap Dance1.jpeg', description: 'Tap dance focuses on rhythm and sound created by the tap shoes striking the floor.', path: '/tap-dance' },
    { name: 'Breakdance', image: './CategoriesImg/Breakdance.webp', description: 'Breakdance, also known as B-boying, is an athletic and acrobatic street dance style.', path: '/breakdance' },
    { name: 'Bharatanatyam', image: './CategoriesImg/Bharatanatyam1.jpg', description: 'Bharatanatyam is a classical Indian dance known for its intricate hand gestures and storytelling.', path: '/bharatanatyam' }
  ];

  return (
    <div className="categories-container">
      <h2 className="categories-heading">Dance Categories</h2>
      <div className="cards-wrapper">
        {danceCategories.map((category, index) => (
          <div key={index} className="category-card">
            {/* Link is wrapping the entire card */}
            <Link to={category.path} className="category-card-link">   
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <img
                  src="./CategoriesImg/rm-logo.png"
                  alt="Twist and Tap Logo"
                  className="category-logo"
                />
              </div>
              <p className="category-description">{category.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
