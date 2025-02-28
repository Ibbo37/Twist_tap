import React, { useState, useEffect, useRef } from "react";
import Navbar from "../navbar/Navbar";
import { FaSearch } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Workshop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [imageScale, setImageScale] = useState(1.5); // Initial size increased
  const imageContainerRef = useRef(null);
  const aboutSectionRef = useRef(null); // Ref for the "About Our Workshops" section
  const imageSectionRef = useRef(null); // Ref for the image section
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Get the position of the image section and the About section
      const imageSectionPosition =
        imageSectionRef.current.offsetTop +
        imageSectionRef.current.offsetHeight;
      const aboutSectionPosition = aboutSectionRef.current.offsetTop;

      // Zoom the image only while you're in the image section
      if (
        scrollPosition < imageSectionPosition &&
        scrollPosition < aboutSectionPosition
      ) {
        const newScale = Math.max(1, 1.5 - scrollPosition / 380); // Apply zoom effect only in image section
        setImageScale(newScale);

        if (imageContainerRef.current) {
          imageContainerRef.current.style.transform = `scale(${newScale})`;
        }
      }
    };

    // Image change logic
    const imageChangeInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000); // Change image every 3 seconds

    // Scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(imageChangeInterval); // Cleanup the interval when the component unmounts
    };
  }, []);

  const images = [
    "/WorkshopImg/s1.jpg",
    "/WorkshopImg/s5.jpg",
    "/WorkshopImg/s3.jpg",
    "/WorkshopImg/s7.jpg",
    "/WorkshopImg/s14.jpg",
    "/WorkshopImg/s18.jpg",
    "/WorkshopImg/s8.jpg",
    "/WorkshopImg/s9.jpg",
    "/WorkshopImg/s10.jpg",
    "/WorkshopImg/s2.jpg",
    "/WorkshopImg/s12.jpg",
    "/WorkshopImg/s15.jpg",
    "/WorkshopImg/s14.jpg",
    "/WorkshopImg/s18.jpg",
    "/WorkshopImg/s19.jpg",
    "/WorkshopImg/s16.jpg",
    "/WorkshopImg/s5.jpg",
    "/WorkshopImg/s8.jpg",
    "/WorkshopImg/s12.jpg",
    "/WorkshopImg/s15.jpg",
    "/WorkshopImg/s7.jpg",
    "/WorkshopImg/s20.jpg",
    "/WorkshopImg/s11.jpg",
    "/WorkshopImg/s1.jpg",
  ];

  const workshopData = [
    {
      title: "Modern Dance Workshop  ",
      date: "March 10, 2025",
      location: "Dadar",
      highlights: [
        "Focus on modern techniques.",
        "Group performance opportunity.",
      ],
    },
    {
      title: "Hip Hop Dance Workshop ",
      date: "April 5, 2025",
      location: "Kurla",
      highlights: [
        "Learn essential Hip Hop moves.",
        "Freestyle dance session.",
      ],
    },
    {
      title: "Ballet Basics Workshop ",
      date: "May 20, 2025",
      location: "vashi",
      highlights: [
        "Learn the foundational movements of Ballet.",
        "Perfect your posture and grace.",
      ],
    },
    {
      title: "Salsa Dance Workshop   ",
      date: "June 15, 2025",
      location: "Online",
      highlights: ["Learn basic Salsa steps.", "Interactive virtual lessons."],
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enables automatic slide change
    autoplaySpeed: 2000, // Time interval between slides (2 seconds)
    arrows: false, // Hide arrows
  };

  const imagesChoreographers = [
    "/WorkshopImg/s7.jpg",
    "/WorkshopImg/a1.jpg",
    "/WorkshopImg/a2.jpg",
    "/WorkshopImg/a3.jpg",
    "/WorkshopImg/a4.jpg",
  ];

  const choreographers = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Sarah Lee",
  ];
  const rightImages = [
    "/WorkshopImg/right1.png", // For first workshop
    "/WorkshopImg/right2.png", // For second workshop
    "/WorkshopImg/right3.png", // For third workshop
    "/WorkshopImg/right4.png", // For fourth workshop
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen text-center pt-0">
        <h1 className="text-5xl font-extrabold text-[#fe828c] mb-10 mt-10">
          Workshop
        </h1>

        {/* Image Section */}
        <div
          ref={imageSectionRef}
          className="relative w-full h-[600px] overflow-hidden"
        >
          <div
            className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 transition-all duration-500 ease-in-out"
            ref={imageContainerRef}
            style={{ transform: `scale(${imageScale})` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="transition-all duration-500 ease-in-out"
              >
                <img
                  src={image}
                  alt={`Workshop ${index + 1}`}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            ))}
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center bg-gray-800 rounded-full px-4 py-2 w-full max-w-lg z-10">
            <input
              type="text"
              className="flex-grow bg-transparent text-white placeholder-gray-400 p-2 outline-none"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FaSearch className="text-[#fe828c] ml-3 text-2xl" />
          </div>
        </div>

{/*--------------------------------ABOUT WORKSHOP---------------------------------------------*/}   


        {/* About Workshops Section */}
        <div
          ref={aboutSectionRef}
          className="mt-10 ml-10 px-4 flex items-center"
        >
          {/* Image Slider Section */}
          <div className="w-4/3 relative overflow-hidden mt-12 ">
            <img
              src={images[currentImageIndex]}
              alt={`Workshop Slide ${currentImageIndex + 1}`}
              className="w-[600px] h-[250px] object-cover rounded-xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right Content */}
          <div className="w-full text-left pl-8">
            <h2 className="text-5xl font-bold text-[#fe828c] text-center text-left mt-10">
              About Our Workshops
            </h2>

            <p className="text-lg text-center leading-relaxed text-white-700 mt-8">
              Our workshops are designed to help dancers of all levels improve
              their skills and learn new techniques. Whether you're a beginner
              or an advanced dancer, we have something for everyone. Join us and
              take your dancing to the next level!
            </p>
          </div>
        </div>

{/*--------------------------------UPCOMING WORKSHOP----------------------------------------------*/}   
{/* Upcoming Workshops Section */}
<div className="mt-24 px-4 overflow-visible">
  <h2 className="text-5xl font-bold text-[#fe828c] mb-10">
    Upcoming Workshops
  </h2>

  {/* Slider Container with Gradient Background */}
  <div className="p-6 bg-gradient-to-r from-black via-white to-[#fe828c] rounded-lg shadow-lg">
    <Slider {...sliderSettings}>
      {workshopData.map((workshop, index) => (
        <div
          key={index}
          className="flex items-center bg-white p-6 rounded-lg shadow-lg mb-6 w-full h-[300px] overflow-visible"
        >
          {/* Left Image & Choreographer Info */}
          <div className="w-1/3 text-center mr-10 relative">
            <img
              src={imagesChoreographers[index]}
              alt={`Choreographer ${index + 1}`}
              className="w-full h-[200px] object-cover rounded-lg mx-auto mb-4 -mr-7"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {choreographers[index]}
            </h3>
          </div>

          {/* Right Content */}
          <div className="flex-1 justify-center ml-auto mt-3 relative">
            {/* Workshop Title */}
            <div className="text-right mr-[400px] ml-8 mt-[-260px] mt-8">
              <h3 className="text-3xl font-semibold text-gray-800">
                {workshop.title}
              </h3>
            </div>

            {/* Date */}
            <div className="text-1xl text-right mr-[500px] mt-3">
              <div className="text-black">Date: {workshop.date}</div>
            </div>

            {/* Location */}
            <div className="text-1xl text-right mr-[515px] mt-3">
              <div className="text-black">
                Location: {workshop.location}
              </div>
            </div>

            {/* Highlights Section */}
            <div className="text-1xl text-center mr-[-475px] mt-4">
              <div className="text-black mr-[200px]">
                <strong>Highlights</strong>
                <ul className="mr-[15px] mt-1">
                  {workshop.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Register Button */}
            <div className="text-right mr-[500px] mt-[15px] relative z-10">
              <Link
                to={
                  workshop.title === "Hip Hop"
                    ? "/Workshop/Workshopreg"
                    : workshop.title === "Salsa"
                    ? "/Workshop/Workshopreg2"
                    : Math.random() > 0.5
                    ? "/Workshop/Workshopreg"
                    : "/Workshop/Workshopreg2"
                }
                className="inline-block py-2 px-6 text-center bg-[#fe828c] text-white rounded-lg hover:bg-[#e77285] transition duration-300 ease-in-out"
              >
                Register Now
              </Link>
            </div>

            {/* Right-Side Image */}
            <div className="absolute top-10 left-0">
              <img
                src="/WorkshopImg/u6.avif"
                alt="Right Side Image"
                className="w-[350px] h-[250px] object-cover mt-[-60px] ml-[1050px] rounded-lg"
              />
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
</div>


{/*--------------------------------INSTRUCTOR / CHOREOGRAPHER ----------------------------------------------*/}   
{/* Instructor/Choreographer Section */}
<div className="mt-16 px-4 text-center">
  <h2 className="text-3xl font-bold text-[#fe828c] mb-4">
    Meet Our Instructors
  </h2>
  <div className="flex justify-center flex-wrap gap-4">
    {[
      { name: "Chris Brown", role: "Dance Mentor", img: "/WorkshopImg/HW2.jpg", instagram: "https://instagram.com/chrisbrown" },
      { name: "John Doe", role: "Choreographer & Dance Expert", img: "/WorkshopImg/HW2.jpg", instagram: "https://instagram.com/johndoe" },
      { name: "Jane Smith", role: "Professional Dancer & Instructor", img: "/WorkshopImg/HW2.jpg", instagram: "https://instagram.com/janesmith" },
      { name: "Emma Green", role: "Dance Trainer", img: "/WorkshopImg/HW2.jpg", instagram: "https://instagram.com/emmagreen" },
      { name: "Alex White", role: "Choreographer", img: "/WorkshopImg/HW2.jpg", instagram: "https://instagram.com/alexwhite" },
      { name: "Olivia Black", role: "Dance Coach", img: "/WorkshopImg/HW2.jpg", instagram: "https://instagram.com/oliviablack" }
    ].map((instructor, index) => (
      <div 
        key={index} 
        className="bg-white border-2 border-[#fe828c] shadow-lg hover:shadow-2xl hover:scale-105 transition-all rounded-2xl p-4 w-56"
      >
        <img
          src={instructor.img}
          alt={instructor.name}
          className="w-full h-28 object-cover rounded-xl mb-2"
        />
        <h3 className="text-lg font-semibold text-gray-800">{instructor.name}</h3>
        <p className="text-sm text-gray-600">{instructor.role}</p>
        <a
  href={instructor.instagram}
  className="text-[#fe828c] hover:text-black mt-2 inline-block font-bold"
>
  Follow on Instagram
</a>

      </div>
    ))}
  </div>
</div>


{/* Testimonials Section */}
<div className="mt-16 mb-10 px-4">
  <h2 className="text-3xl font-bold text-[#fe828c] mb-4">
    What Our Participants Say
  </h2>
  <div className="flex flex-wrap justify-center space-x-4">
    <div className="bg-white p-6 rounded-lg shadow-[0px_5px_15px_#fe828c] w-full md:w-1/3">
      <p className="text-lg text-gray-700">
        "This workshop completely transformed my dancing! I learned new techniques and improved my skills in just a few days."
      </p>
      <p className="text-gray-600 font-semibold mt-4">- Sarah Johnson</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-[0px_5px_15px_#fe828c] w-full md:w-1/3">
      <p className="text-lg text-gray-700">
        "The instructors were amazing! I felt motivated and confident throughout the workshop. Highly recommend!"
      </p>
      <p className="text-gray-600 font-semibold mt-4">- Michael Lee</p>
    </div>
  </div>

        </div>


      </div>
    </>
  );
};

export default Workshop;
