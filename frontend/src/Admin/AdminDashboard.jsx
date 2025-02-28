import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const admin = {
    photo: "https://via.placeholder.com/80", 
    name: "John Doe",
    age: 35,
    gender: "Male",
    qualification: "MBA in Management",
    experience: 10,
    projects: 25,
  };

  const metrics = [
    { label: "Total Users", value: "1,250" },
    { label: "Active Projects", value: "12" },
    { label: "Revenue", value: "$75,000" },
    { label: "Tasks Completed", value: "320" },
  ];

  const recentActivities = [
    "Updated project 'Dashboard Revamp'.",
    "Completed task 'User Authentication'.",
    "Added new team member 'Sarah Smith'.",
  ];

  const chartData = [
    { name: "Jan", Users: 400 },
    { name: "Feb", Users: 300 },
    { name: "Mar", Users: 500 },
    { name: "Apr", Users: 700 },
    { name: "May", Users: 600 },
  ];

  const menuItems = ["Dashboard", "Projects", "Analytics", "Settings"];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex min-h-screen transition ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-64 h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } shadow-md flex flex-col`}
      >
        <div className="p-4 text-lg font-bold text-center border-b">
          Admin Panel
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Search..."
            className={`w-full p-2 text-sm rounded ${
              isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200"
            }`}
          />
        </div>
        <ul className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 transition rounded ${
                isDarkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="p-4 text-center">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 text-sm font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Toggle {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Admin Details */}
        <section className="mb-6">
          <div
            className={`${
              isDarkMode ? "bg-gray-900" : "bg-white"
            } shadow rounded-lg p-6 flex items-center space-x-6`}
          >
            <img
              src={admin.photo}
              alt="Admin"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <h2 className="text-xl font-semibold">{admin.name}</h2>
              <p>Age: {admin.age}</p>
              <p>Gender: {admin.gender}</p>
              <p>Qualification: {admin.qualification}</p>
              <p>Experience: {admin.experience} years</p>
              <p>Projects Managed: {admin.projects}</p>
            </div>
          </div>
        </section>

        {/* Metrics Cards */}
        <section className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                } shadow rounded-lg p-6 text-center`}
              >
                <h3 className="text-lg font-medium">{metric.label}</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activities */}
        <section className="mb-6">
          <div
            className={`${
              isDarkMode ? "bg-gray-900" : "bg-white"
            } shadow rounded-lg p-6`}
          >
            <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
            <ul className="space-y-3">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <p>{activity}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Chart */}
        <section>
          <div
            className={`${
              isDarkMode ? "bg-gray-900" : "bg-white"
            } shadow rounded-lg p-6`}
          >
            <h3 className="text-lg font-medium mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke={isDarkMode ? "#ccc" : "#000"} />
                <YAxis stroke={isDarkMode ? "#ccc" : "#000"} />
                <Tooltip />
                <Bar
                  dataKey="Users"
                  fill={isDarkMode ? "#4a90e2" : "#1976d2"}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
