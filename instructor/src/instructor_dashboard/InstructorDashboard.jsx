import React, { useState } from "react";
import { FiUsers, FiSettings, FiLogOut, FiDollarSign, FiCamera } from "react-icons/fi";
import { MdOutlineEventNote, MdUpload } from "react-icons/md";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

function InstructorDashboard() {
  const [instructor, setInstructor] = useState({
    name: "John Don",
    email: "johndon@company.com",
    experience: "5 Years",
    danceStyles: ["Hip-Hop", "Salsa", "Contemporary"],
    followers: 1500,
  });
  const [students] = useState(120);
  const [workshops, setWorkshops] = useState([
    { name: "Hip-Hop Basics", students: 30, date: "March 10" },
    { name: "Salsa Advanced", students: 50, date: "March 20" },
  ]);
  const [earnings] = useState(5000);
  const [profileImage, setProfileImage] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("dashboard");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...instructor });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleEditSubmit = () => {
    setInstructor(editFormData);
    setShowEditForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const monthlyData = [
    { month: "Jan", students: 100, followers: 1200, earnings: 4000 },
    { month: "Feb", students: 110, followers: 1300, earnings: 4500 },
    { month: "Mar", students: 120, followers: 1500, earnings: 5000 },
  ];

  const earningsData = [
    { month: "Oct", earnings: 3500 },
    { month: "Nov", earnings: 4000 },
    { month: "Dec", earnings: 4500 },
    { month: "Jan", earnings: 4800 },
    { month: "Feb", earnings: 5000 },
  ];

  const allData = [
    { month: "Jan", students: 100, followers: 1200, earnings: 4000, workshops: 5 },
    { month: "Feb", students: 110, followers: 1300, earnings: 4500, workshops: 6 },
    { month: "Mar", students: 120, followers: 1500, earnings: 5000, workshops: 7 },
  ];

  const workshopProgressData = [
    { month: "Mar-Agust", completed: workshops.length, goal: 50 },
  ];

  return (
    <div className="min-h-screen w-[1520px] flex bg-gray-900 text-white relative">
      {/* Sidebar Section */}
      <aside className="w-1/5 bg-gray-800 p-6 flex flex-col gap-16 shadow-lg border-r border-[#fe828c]">
        <div className="text-center flex flex-col items-center relative top-5">
          <label className="bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center relative cursor-pointer overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <FiCamera className="text-[#fe828c] text-3xl" />
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          <div className="mt-4">
            <h2 className="text-xl font-bold text-[#fe828c]">{instructor.name}</h2>
            <p className="text-sm text-gray-400">{instructor.email}</p>
          </div>
          <button
            onClick={() => setShowEditForm(true)}
            className="mt-4 text-[#fe828c] text-sm font-semibold border border-[#fe828c] px-4 py-2 rounded-full"
          >
            Edit Profile
          </button>
        </div>
        <nav className="flex flex-col gap-6 mt-12">
          {[ 
            { icon: <FiUsers />, label: "Dashboard", action: () => setActiveSidebar("dashboard") },
            { icon: <MdUpload />, label: "Upload Workshop", action: () => setActiveSidebar("upload") },
            { icon: <FiDollarSign />, label: "Payment", action: () => setActiveSidebar("payment") },
            { icon: <FiSettings />, label: "Settings", action: () => setShowLogoutModal(true) }
          ].map((btn, index) => (
            <button 
              key={index} 
              onClick={btn.action} 
              className={`flex items-center gap-10 hover:bg-[#fe828c] hover:text-black transition py-3 px-5 rounded-lg font-bold text-lg ${activeSidebar === btn.label.toLowerCase() ? 'bg-[#fe828c] text-black' : ''}`}
            >
              <span className="text-5xl">{btn.icon}</span>{btn.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Dashboard Section */}
      <main className="w-4/5 p-8 flex flex-col gap-10 pt-20">
        <h1 className="text-4xl font-bold text-[#fe828c] mt-20 text-center">Instructor Dashboard</h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-4 gap-6">
          {[ 
            { icon: <FiUsers />, label: "Total Students", value: students },
            { icon: <MdOutlineEventNote />, label: "Workshops", value: workshops.length },
            { icon: <FiDollarSign />, label: "Earnings", value: `$${earnings}` },
            { icon: <FiUsers />, label: "Followers", value: instructor.followers }
          ].map((card, index) => (
            <div
              key={index}
              className={`w-65 bg-gray-800 text-white border border-[#fe828c] shadow-md p-12 flex items-center rounded-lg gap-3 transform transition hover:scale-105 text-3xl relative ${index === 0 ? 'left-[20px]' : index === 1 ? 'left-[12px]' : ''}`}
            >
              <div className="text-[#fe828c] text-7xl">{card.icon}</div>
              <div>
                <p className="text-2xl font-semibold text-[#fe828c]">{card.label}</p>
                <p className="text-5xl font-bold">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-16">
          {/* Monthly Stats Chart */}
          <div className="bg-gray-800 p-6 rounded-lg border border-[#fe828c] transform translate-x-4">
            <h2 className="text-xl font-bold text-[#fe828c]">Monthly Stats</h2>
            <ResponsiveContainer width="80%" height={180} className="mx-auto">
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#fe828c" />
                <YAxis stroke="#fe828c" />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#ffdd57" />
                <Line type="monotone" dataKey="followers" stroke="#57ffb8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Earnings Over Time Chart */}
          <div className="bg-gray-800 p-6 rounded-lg border border-[#fe828c] transform -translate-x-4">
            <h2 className="text-xl font-bold text-[#fe828c]">Earnings Over Time</h2>
            <ResponsiveContainer width="80%" height={180} className="mx-auto">
              <BarChart data={earningsData}>
                <XAxis dataKey="month" stroke="#fe828c" />
                <YAxis stroke="#fe828c" />
                <Tooltip />
                <Bar dataKey="earnings" fill="#fe828c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16">
          {/* All Instructor Data Chart */}
          <div className="bg-gray-800 p-6 rounded-lg border border-[#fe828c] transform translate-x-4">
            <h2 className="text-xl font-bold text-[#fe828c]">All Instructor Data</h2>
            <ResponsiveContainer width="80%" height={180} className="mx-auto">
              <LineChart data={allData}>
                <XAxis dataKey="month" stroke="#fe828c" />
                <YAxis stroke="#fe828c" />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#ffdd57" />
                <Line type="monotone" dataKey="followers" stroke="#57ffb8" />
                <Line type="monotone" dataKey="earnings" stroke="#fe828c" />
                <Line type="monotone" dataKey="workshops" stroke="#00c2ff" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Workshop Progress Chart */}
          <div className="bg-gray-800 p-6 rounded-lg border border-[#fe828c] transform -translate-x-4">
            <h2 className="text-xl font-bold text-[#fe828c]">Workshop Progress</h2>
            <ResponsiveContainer width="80%" height={180} className="mx-auto">
              <BarChart data={workshopProgressData}>
                <XAxis dataKey="month" stroke="#fe828c" />
                <YAxis stroke="#fe828c" />
                <Tooltip />
                <Bar dataKey="completed" fill="#fe828c" />
                <Bar dataKey="goal" fill="#ffdd57" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg w-1/3">
              <h2 className="text-2xl font-bold text-[#fe828c] mb-4">Edit Profile</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(); }}>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="p-2 bg-gray-700 text-white border border-[#fe828c] rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="p-2 bg-gray-700 text-white border border-[#fe828c] rounded"
                  />
                  <input
                    type="text"
                    name="experience"
                    value={editFormData.experience}
                    onChange={handleChange}
                    placeholder="Experience"
                    className="p-2 bg-gray-700 text-white border border-[#fe828c] rounded"
                  />
                  <input
                    type="text"
                    name="danceStyles"
                    value={editFormData.danceStyles.join(", ")}
                    onChange={handleChange}
                    placeholder="Dance Styles (comma separated)"
                    className="p-2 bg-gray-700 text-white border border-[#fe828c] rounded"
                  />
                  <button
                    type="submit"
                    className="mt-4 p-2 bg-[#fe828c] text-white font-semibold rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default InstructorDashboard;
