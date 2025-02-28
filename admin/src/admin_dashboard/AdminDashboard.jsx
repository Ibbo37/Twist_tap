import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Home, Users, Video, CreditCard, Calendar, Settings } from "lucide-react";

const data = [
  { name: "Jan", videos: 30, payments: 20, workshops: 10 },
  { name: "Feb", videos: 40, payments: 25, workshops: 15 },
  { name: "Mar", videos: 50, payments: 30, workshops: 20 },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "Users", icon: Users },
    { name: "Videos", icon: Video },
    { name: "Payments", icon: CreditCard },
    { name: "Workshops", icon: Calendar },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="flex w-screen h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-[22rem] bg-gray-800 py-16 px-10 flex flex-col h-full shadow-lg space-y-8">
        <h1 className="text-5xl font-bold text-center text-pink-400 mb-24">Admin Panel</h1>
        <div className="mt-12 bg-gray-900 h-12 w-full"></div>
        <div className="flex flex-col gap-6 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-6 py-4 px-6 rounded-lg w-full text-left text-2xl transition-all duration-300 hover:bg-gray-700 ${
                activeTab === item.name.toLowerCase() ? "bg-gray-700" : "bg-gray-900"
              }`}
              onClick={() => setActiveTab(item.name.toLowerCase())}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gray-700 rounded-lg">
                <item.icon className="w-8 h-8 text-pink-400" />
              </div>
              <span className="font-semibold flex-1">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background gap between Sidebar and Main Content */}
      <div className="w-12 bg-gray-900"></div>

      {/* Main Content */}
      <div className="flex-1 p-16 overflow-auto h-full">
        <h2 className="text-5xl font-semibold text-pink-400 mb-12">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>

        {/* Dark background gap between Admin Panel heading and Dashboard */}
        <div className="mt-12 bg-gray-900 h-16 w-full"></div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { title: "Total Users", value: "2500" },
            { title: "Total Videos", value: "1805" },
            { title: "Payments", value: "$12,450" },
            { title: "Workshops", value: "150" },
          ].map((card, index) => (
            <div key={index} className="bg-gray-700 p-10 rounded-lg shadow-md text-center">
              <h3 className="text-3xl font-medium text-pink-300">{card.title}</h3>
              <p className="text-6xl font-bold mt-6">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Background gap between Overview Cards and Chart Section */}
        <div className="mt-16 bg-gray-900 h-12 w-full"></div>

        {/* Chart Section */}
        <div className="bg-gray-800 p-10 rounded-lg shadow-lg mt-12">
          <h3 className="text-4xl font-semibold mb-8 text-pink-300">Monthly Overview</h3>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#fff" tick={{ fontSize: 18 }} />
              <YAxis stroke="#fff" tick={{ fontSize: 18 }} />
              <Tooltip wrapperStyle={{ fontSize: "18px" }} />
              <Bar dataKey="videos" fill="#ff4a8d" radius={[8, 8, 0, 0]} barSize={60} />
              <Bar dataKey="payments" fill="#ff85b3" radius={[8, 8, 0, 0]} barSize={60} />
              <Bar dataKey="workshops" fill="#ffc2d1" radius={[8, 8, 0, 0]} barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
