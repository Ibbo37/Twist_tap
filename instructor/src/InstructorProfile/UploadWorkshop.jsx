import React, { useState } from "react";

function UploadWorkshop() {
  const [style, setStyle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [payment, setPayment] = useState("");
  const [showPopup, setShowPopup] = useState(false); // ✅ Pop-up ke liye state

  const handleSlotChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSlots((prev) =>
      checked ? [...prev, value] : prev.filter((slot) => slot !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation: Sabhi fields required hain
    if (!style || !location || !date || selectedSlots.length === 0 || !payment) {
      alert("⚠️ Please fill all fields before confirming!");
      return;
    }

    // Workshop Data
    const workshopData = { style, location, date, selectedSlots, payment };

    // Save to LocalStorage
    const existingWorkshops = JSON.parse(localStorage.getItem("workshops")) || [];
    existingWorkshops.push(workshopData);
    localStorage.setItem("workshops", JSON.stringify(existingWorkshops));

    console.log("Workshop Saved:", workshopData);

    // ✅ Show success pop-up
    setShowPopup(true);

    // Reset Form
    setStyle("");
    setLocation("");
    setDate("");
    setSelectedSlots([]);
    setPayment("");

    // ✅ Pop-up 2 seconds baad hide hoga
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 relative h-screen w-[1100px] bg-gray-100 text-gray-900 translate-x-[180px] gap-10 overflow-hidden">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Workshop</h1>
      <div className="w-full max-w-200 p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-lg font-semibold translate-x-[30px]">Style:</label>
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            placeholder="Enter the style"
            className="p-2 h-12 border border-[#fe828c] rounded placeholder-gray-500 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 w-[750px] translate-x-[25px]"
          />

          <label className="text-lg font-semibold translate-x-[30px]">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the location"
            className="p-2 h-12 border border-[#fe828c] rounded placeholder-gray-500 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 w-[750px] translate-x-[25px]"
          />

          <label className="text-lg font-semibold translate-x-[30px]">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 h-12 border border-[#fe828c] rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 w-[750px] translate-x-[25px]"
          />

          <label className="text-lg font-semibold translate-x-[30px]">Slot Time:</label>
          <div className="flex flex-col gap-2 w-[750px] translate-x-[35px]">
            {["2-4", "4-6", "6-8"].map((slot) => (
              <div key={slot} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={slot}
                  onChange={handleSlotChange}
                  checked={selectedSlots.includes(slot)}
                />
                <span>{slot}</span>
              </div>
            ))}
          </div>

          <label className="text-lg font-semibold translate-x-[30px]">Payment:</label>
          <input
            type="text"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            placeholder="Enter the payment details"
            className="p-2 h-12 border border-[#fe828c] rounded placeholder-gray-500 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 w-[750px] translate-x-[25px]"
          />

          <button type="submit" className="mt-4 p-3 bg-blue-500 text-white rounded hover:bg-blue-600 h-12">
            Confirm
          </button>
        </form>
      </div>

      {/* ✅ Success Pop-up Message */}
      {showPopup && (
        <div className="fixed bottom-10 right-10 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          ✅ Workshop Uploaded Successfully!
        </div>
      )}
    </div>
  );
}

export default UploadWorkshop;
