import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Home, Users, Video, CreditCard, Calendar, Settings } from "lucide-react";

const defaultChartData = [
  { name: "Jan", videos: 30, payments: 20, workshops: 10 },
  { name: "Feb", videos: 40, payments: 25, workshops: 15 },
  { name: "Mar", videos: 50, payments: 30, workshops: 20 },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState(defaultChartData);
  const [overview, setOverview] = useState({ users: 0, videos: 0, payments: 0, workshops: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const usersRes = await fetch("http://localhost:5000/api/adminDashboard/user/counts");
        const videosRes = await fetch("http://localhost:5000/api/adminDashboard/videos/count");
        const paymentsRes = await fetch("http://localhost:5000/api/adminDashboard/payments/count");
        const workshopsRes = await fetch("http://localhost:5000/api/adminDashboard/workshop/count");
        const chartRes = await fetch("http://localhost:5000/api/adminDashboard/monthly/count");

        const usersData = await usersRes.json();
        const videosData = await videosRes.json();
        const paymentsData = await paymentsRes.json();
        const workshopsData = await workshopsRes.json();
        const chartData = await chartRes.json();

        setOverview({
          users: usersData.count || 0,
          videos: videosData.count || 0,
          payments: paymentsData.total || 0,
          workshops: workshopsData.count || 0,
        });

        setData(chartData || defaultChartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex w-screen h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-[22rem] bg-gray-800 py-16 px-10 flex flex-col h-full shadow-lg space-y-8">
        <h1 className="text-5xl font-bold text-center text-pink-400 mb-24">Admin Panel</h1>
        <div className="flex flex-col gap-6 flex-1">
          {[
            { name: "Dashboard", icon: Home },
            { name: "Users", icon: Users },
            { name: "Videos", icon: Video },
            { name: "Payments", icon: CreditCard },
            { name: "Workshops", icon: Calendar },
            { name: "Settings", icon: Settings },
          ].map((item) => (
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

      {/* Main Content */}
      <div className="flex-1 p-16 overflow-auto h-full">
        <h2 className="text-5xl font-semibold text-pink-400 mb-12">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { title: "Total Users", value: overview.users },
            { title: "Total Videos", value: overview.videos },
            { title: "Payments", value: `$${overview.payments}` },
            { title: "Workshops", value: overview.workshops },
          ].map((card, index) => (
            <div key={index} className="bg-gray-700 p-10 rounded-lg shadow-md text-center">
              <h3 className="text-3xl font-medium text-pink-300">{card.title}</h3>
              <p className="text-6xl font-bold mt-6">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-gray-800 p-10 rounded-lg shadow-lg mt-12">
          <h3 className="text-4xl font-semibold mb-8 text-pink-300">Monthly Overview</h3>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#fff" tick={{ fontSize: 18 }} />
              <YAxis stroke="#fff" tick={{ fontSize: 18 }} />
              <Tooltip wrapperStyle={{ fontSize: "18px" }} />
              <Bar dataKey="videos" fill="#ff4a8d" />
              <Bar dataKey="payments" fill="#ff85b3" />
              <Bar dataKey="workshops" fill="#ffc2d1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
