import React, { useEffect, useState, useRef } from "react";
import "./Home.css"; // Ensure this CSS file contains your original styles
import Navbar from "../../navbar/Navbar";
import { Categories } from "../../categories/Categories";
import HomeUpload from '../home-upload/HomeUpload'
import HomeChoreographer from "../home-choreographer/HomeChoreographer";
import About from '../about/About'




const Home = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      image: "/HomeImg/img2.jpg",
      title: "Twist'n Tap",
      name: "BALLET",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis culpa similique consequuntur, reprehenderit dicta repudiandae.",
    },
    {
      id: 2,
      image: "/HomeImg/img1.jpg",
      title: "Twist'n Tap",
      name: "hiphop",
      description:
        "Welcome to Twist'n Tap – an online platform where you can learn dance from expert choreographers through engaging workshops and tutorials. No matter your location or skill level, start your dance journey with us today!",
    },
    {
      id: 3,
      image: "/HomeImg/img3.webp",
      title: "Twist'n Tap",
      name: "HIPHOP",
      description:
        "Welcome to Twist'n Tap – an online platform where you can learn dance from expert choreographers through engaging workshops and tutorials. No matter your location or skill level, start your dance journey with us today!",
    },
    {
      id: 4,
      image: "/HomeImg/img4.jpg",
      title: "Twist'n Tap",
      name: "ba",
      description:
        "Welcome to Twist'n Tap – an online platform where you can learn dance from expert choreographers through engaging workshops and tutorials.",
    },
    {
      id: 5,
      image: "/HomeImg/img5.webp",
      title: "Twist'n Tap",
      name: "OWL",
      description:
        "Welcome to Twist'n Tap – an online platform where you can learn dance from expert choreographers through engaging workshops and tutorials.",
    },
    {
      id: 6,
      image: "/HomeImg/img6.jpg",
      title: "Twist'n Tap",
      name: "OWL",
      description:
        "Welcome to Twist'n Tap – an online platform where you can learn dance from expert choreographers through engaging workshops and tutorials.",
    },
    {
      id: 7,
      image: "/HomeImg/img7.jpeg",
      title: "Twist'n Tap",
      name: "OWL",
      description:
        "Welcome to Twist'n Tap – an online platform where you can learn dance from expert choreographers through engaging workshops and tutorials.",
    },
    {
      id: 8,
      image: "/HomeImg/img8.jpg",
      title: "Twist'n Tap",
      name: "OWL",
      description:
        "Welcome to Twist'n Tap – an online platform where you can learn dance from expert choreographers through engaging workshops and tutorials.",
    },
    {
      id: 9,
      image: "/HomeImg/img9.webp",
      title: "Twist'n Tap",
      name: "OWL",
      description:
        "Welcome to Twist'n Tap – an online platform where you can learn dance from expert choreographers through engaging workshops and tutorials.",
    },
    {
      id: 10,
      image: "/HomeImg/img10.avif",
      title: "Twist'n Tap",
      name: "OWL",
      description:
        "Welcome to Twist'n Tap – an online platform where you can learn dance from expert choreographers through engaging workshops and tutorials.",
    },
    {
      id: 11,
      image: "/HomeImg/img11.jpeg",
      title: "Twist'n Tap",
      name: "OWL",
      description:
        "Welcome to Twist'n Tap – an online platform where you can learn dance from expert choreographers through engaging workshops and tutorials.",
    },
    {
      id: 12,
      image: "/HomeImg/img12.webp",
      title: "Twist'n Tap",
      name: "OWL",
      description:
        "Welcome to Twist'n Tap – an online platform where you can learn dance from expert choreographers through engaging workshops and tutorials.",
    },
  ]);

  const carouselRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [key, setKey] = useState(0); // Unique key to trigger re-render of items

  useEffect(() => {
    if (!isAnimating) {
      const autoSlide = setInterval(() => nextSlide(), 7000);
      return () => clearInterval(autoSlide);
    }
  }, [isAnimating]); // Re-trigger on animation state change

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const currentItems = [...items];
    const firstItem = currentItems.shift();
    currentItems.push(firstItem);
    setItems(currentItems); // Update the items array, triggering re-render

    // Reset animation by updating a key or class to force reflow
    setKey((prevKey) => prevKey + 1); // This forces the element to re-render and reset the animation

    setTimeout(() => setIsAnimating(false), 700);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const currentItems = [...items];
    const lastItem = currentItems.pop();
    currentItems.unshift(lastItem);
    setItems(currentItems); // Update the items array, triggering re-render

    // Reset animation by updating a key or class to force reflow
    setKey((prevKey) => prevKey + 1); // This forces the element to re-render and reset the animation

    setTimeout(() => setIsAnimating(false), 700);
  };

  const aboutRef = useRef(null);

  // Function to scroll to the About section
  
  return (
    <>
      <Navbar />
      <div className="carousel" ref={carouselRef}>
        <div className="list">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="item"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="content">
                <div className="title">{item.title}</div>
                <div className="name">{item.name}</div>
                <div className="des">{item.description}</div>
                <div className="btn">
                  <button>See More</button>
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="arrows">
          <button className="prev" onClick={prevSlide}>
            &lt;
          </button>
          <button className="next" onClick={nextSlide}>
            &gt;
          </button>
        </div>

        {/* Time Running Animation */}
        {/* <div className="timeRunning">

        </div> */}
      </div>
      <div>
       <Categories/>       
       </div>
      <div>
         <HomeUpload/>
      </div>
      <div>
         <HomeChoreographer/> 
      </div>
     
      <div>
         <About/> 
               </div>
    </>
  );
};

export default Home;