import React, { useState } from 'react';

function InstProfile() {
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState('Arshi');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [style, setStyle] = useState('');
  const [experience, setExperience] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('imageUpload').click();
  };

  const handleSave = () => {
    setUserName(name);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
<div className="flex flex-col self-start items-center justify-center p-6 relative h-screen w-[1100px] bg-gray-100 text-gray-900 translate-x-[150px] gap-10 overflow-hidden">
  {/* Profile Upload Section */}
  <div className="flex flex-col items-center relative mt-0 mb-12">
    <div className="relative cursor-pointer">
      <div className="w-36 h-36 rounded-full border-4 border-gray-400 overflow-hidden shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
        {image ? (
          <img src={image} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-lg">No Image</div>
        )}
      </div>
      <button 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#fe828c] hover:bg-pink-600 text-white text-sm px-4 py-1 rounded-full shadow-md transition duration-300"
        onClick={triggerFileInput}
      >
        Upload
      </button>
    </div>
    <input type="file" id="imageUpload" className="hidden" onChange={handleImageChange} />
    <p className="mt-4 text-2xl font-semibold">Username: {userName}</p>
  </div>

  {/* Instructor Details Form */}
  <div className="p-10 bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg w-[800px] border border-gray-300">
    <h2 className="text-3xl font-bold text-center text-[#fe828c] mb-8">Instructor Details</h2>

    <div className="space-y-4">
      <div className="flex flex-col">
        <label className="text-xl font-semibold text-gray-700 translate-x-[50px]">Name:</label>
        <input type="text" placeholder="   Enter Name" value={name} onChange={(e) => setName(e.target.value)} 
          className="w-[90%] h-14 text-lg p-4 mt-2 border rounded-lg bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#fe828c] translate-x-[40px]" />
      </div>

      <div className="flex flex-col">
        <label className="text-xl font-semibold text-gray-700 translate-x-[50px]">Age:</label>
        <input type="number" placeholder="   Enter Age" value={age} onChange={(e) => setAge(e.target.value)} 
          className="w-[90%] h-14 text-lg p-4 mt-2 border rounded-lg bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#fe828c] translate-x-[40px]" />
      </div>

      <div className="flex flex-col">
        <label className="text-xl font-semibold text-gray-700 translate-x-[40px]">Dance Style:</label>
        <select value={style} onChange={(e) => setStyle(e.target.value)} 
          className="w-[90%] h-14 text-lg p-4 mt-2 border rounded-lg bg-gray-200 text-gray-900 focus:ring-2 focus:ring-[#fe828c] translate-x-[40px]">
          <option value="">Select Style</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="Salsa">Salsa</option>
          <option value="Bollywood">Bollywood</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xl font-semibold text-gray-700 translate-x-[40px]">Experience:</label>
        <input type="text" placeholder="   Enter Experience" value={experience} onChange={(e) => setExperience(e.target.value)} 
          className="w-[90%] h-14 text-lg p-4 mt-2 border rounded-lg bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#fe828c] translate-x-[40px]" />
      </div>
    </div>

    <button onClick={handleSave} 
      className="w-[95%] h-10 mt-6 bg-[#fe828c] hover:bg-pink-600 text-white py-4 rounded-lg font-semibold text-xl shadow-md transition duration-300 translate-x-[22px] translate-y-[20px]">
      Save
    </button>

  </div>

  {/* Popup Message */}
  {showPopup && (
    <div className="absolute top-10 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold">
      Saved Successfully!
    </div>
  )}
</div>
  );
}

export default InstProfile;
