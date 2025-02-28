import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import { Clock } from 'lucide-react';

const Workshopreg = () => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [slots, setSlots] = useState([
    { time: '2:00 PM - 4:00 PM', available: 10, total: 10 },
    { time: '4:00 PM - 6:00 PM', available: 50, total: 50 },
    { time: '6:00 PM - 8:00 PM', available: 50, total: 50 },
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    location: 'Studio A, Downtown',
    day: 'Sunday',
    date: '21st Mar 2025',
  });

  const handleSlotChange = (event) => {
    const selectedTime = event.target.value;
    setSelectedSlot(selectedTime);

    // Update available and booked seats
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.time === selectedTime
          ? { ...slot, available: slot.available - 1 }
          : slot
      )
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration submission
    alert(`Registration successful for ${formData.name}`);
  };

  return (
    <>
      <Navbar />
      {/* Page Container */}
      <div className="min-h-screen bg-black p-8 relative pb-32">
        {/* Centered Heading */}
        <h1 className="text-5xl text-[#fe828c] font-bold mb-0 text-center">
          Book Now
        </h1>

        {/* Choreographer Card aligned to the left */}
        <div className="absolute top-[155px] left-10 w-[350px] h-[620px] bg-white rounded-xl shadow-lg p-6">
          {/* Image Section */}
          <img
            src="/WorkshopImg/wreg1.jpg"
            alt="Hip Hop Choreographer"
            className="w-full h-[180px] object-cover rounded-lg mb-4"
          />

          {/* Choreographer Info */}
          <div className="space-y-3">
            <p className="text-gray-800">
              <span className="text-[#fe828c] font-bold">Name:</span> John Doe
            </p>
            <p className="text-gray-800">
              <span className="text-[#fe828c] font-bold">Dance Style:</span> Hip Hop
            </p>
            <p className="text-gray-800">
              <span className="text-[#fe828c] font-bold">Expertise:</span> Popping, Locking, and Freestyle Moves
            </p>
            <p className="text-gray-800">
              <span className="text-[#fe828c] font-bold">Experience:</span> 10+ years in international competitions
            </p>
            <p className="text-gray-800">
              <span className="text-[#fe828c] font-bold">Achievements:</span> Winner of World Dance Battle 2020
            </p>
            <p className="text-gray-800">
              <span className="text-[#fe828c] font-bold">Followers:</span> 120k+ on social media
            </p>
            <p className="text-gray-800">
              <span className="text-[#fe828c] font-bold">Age:</span> 28
            </p>
            <p className="text-gray-800">
              <span className="text-[#fe828c] font-bold">Choreography Style:</span> Focused on storytelling through dance
            </p>
          </div>
        </div>

        {/* Video Section with Time Slots Overlay */}
        <div
          className="absolute left-[360px] right-10 h-[620px] w-[1090px] relative mt-[-128px]"
          style={{ top: '200px' }}
        >
          {/* Video Section */}
          <video
            src="/WorkshopImg/HipHopV1.mp4"
            className="w-full h-full rounded-lg object-cover"
            loop
            muted
            autoPlay
            playsInline
          ></video>

          {/* Time Slot and Location Overlay */}
          <div className="absolute inset-0 flex flex-col justify-start p-6 bg-transparent">
            <div className="flex space-x-8 text-white text-lg font-semibold mb-4">
              <span className="px-4 py-1">Location: Studio A, Downtown</span>
              <span className="px-5 py-2 text-white">Day: Sunday | Date: 11th Feb 2025</span>
            </div>

            {/* Slot List with Radio Buttons and Seat Availability */}
            <div className="flex space-x-8 items-start mt-6">
              {slots.map((slot) => (
                <div key={slot.time} className="bg-white bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transform transition-all cursor-pointer w-1/3">
                  <label className="flex flex-col items-center">
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.time}
                      disabled={slot.available === 0}
                      checked={selectedSlot === slot.time}
                      onChange={handleSlotChange}
                      className="form-radio h-5 w-5 text-[#fe828c] mb-2"
                    />
                    <Clock className="text-[#fe828c] mb-2" />
                    <span className="text-white font-medium">{slot.time}</span>
                    <span className="text-white text-sm mt-1">
                      Total Seats: {slot.total}
                    </span>
                    <span className="text-white text-sm">
                      Booked: {slot.total - slot.available} | Available: {slot.available}
                    </span>
                    <div className="w-full h-4 bg-gray-300 rounded-full relative overflow-hidden my-2">
                      <div
                        className={`h-full ${slot.available > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${(slot.available / slot.total) * 100}%` }}
                      ></div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Register Form Text and Quotes Below Slots */}
          <div className="absolute bottom-8 left-10 w-[1090px] text-center text-white">
            <p className="text-sm font-bold mb-1">Fill the register form to confirm your spot!</p>
            <p className="text-xs italic">"Dance is the hidden language of the soul." - Martha Graham</p>
            <p className="text-xs italic mt-2">"Movement is a medicine for creating change in a person's physical, emotional, and mental states." - Carol Welch</p>
          </div>
        </div>

{/* Register Now Heading Positioned Below the Card */}
<div className="mt-[250px]">
  <h2 className="text-4xl text-[#fe828c] font-bold text-center flex items-center justify-center space-x-3">
    <span>Register Now</span>
    <span className="text-2xl">➡️</span>
  </h2>
</div>

{/* Registration Form */}
<div className="max-w-xl mx-auto mt-8 bg-gradient-to-r from-[#fe828c] to-[#ffffff] p-6 rounded-lg shadow-lg">
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-bold text-gray-700">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="age" className="block text-sm font-bold text-black">Age</label>
      <input
        type="number"
        id="age"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-800"
        required
        min="1"
        max="100"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="location" className="block text-sm font-bold text-black">Location</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-800"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="day" className="block text-sm font-bold text-black">Day</label>
      <input
        type="text"
        id="day"
        name="day"
        value={formData.day}
        onChange={handleInputChange}
        className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-800"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="date" className="block text-sm font-bold text-black">Date</label>
      <input
        type="text"
        id="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-800"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="slot" className="block text-sm font-bold text-black">Select Time Slot</label>
      <input
        type="text"
        id="slot"
        name="slot"
        value={selectedSlot}
        disabled
        className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-800"
      />
    </div>

    {/* Payment Section */}
    <div className="mb-6 flex justify-between">
      <p className="text-lg font-bold text-black">Payment Here</p>
      <button
        type="submit"
        className="bg-[#fe828c] text-white px-6 py-2 rounded-lg hover:bg-[#e95e76] transition-all"
      >
        Payment
      </button>
    </div>

    {/* Submit/ Register Button */}
    <div className="mb-6 flex justify-center">
      <button
        type="submit"
        className="bg-[#fe828c] text-white px-[250px] py-3 rounded-lg hover:bg-[#e95e76] transition-all"
      >
        Register
      </button>
    </div>
  </form>
</div>

      </div>
    </>
  );
};

export default Workshopreg;
