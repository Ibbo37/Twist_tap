import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./Card";

const InstructorDashboard = () => {
  const [workshops, setWorkshops] = useState([
    { id: 1, title: "Hip-Hop Basics", date: "2025-03-10" },
    { id: 2, title: "Salsa Night", date: "2025-03-15" },
  ]);

  const [newWorkshop, setNewWorkshop] = useState({ title: "", date: "" });
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const navigate = useNavigate();

  const addWorkshop = () => {
    if (newWorkshop.title && newWorkshop.date) {
      setWorkshops([...workshops, { id: Date.now(), ...newWorkshop }]);
      setNewWorkshop({ title: "", date: "" });
    }
  };

  const editWorkshop = (workshop) => {
    setEditingWorkshop(workshop);
    setNewWorkshop({ title: workshop.title, date: workshop.date });
  };

  const updateWorkshop = () => {
    setWorkshops(
      workshops.map((ws) =>
        ws.id === editingWorkshop.id ? { ...ws, ...newWorkshop } : ws
      )
    );
    setEditingWorkshop(null);
    setNewWorkshop({ title: "", date: "" });
  };

  const deleteWorkshop = (id) => {
    setWorkshops(workshops.filter((ws) => ws.id !== id));
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Instructor Dashboard</h2>
      <Card className="mb-4">
        <CardContent>
          <input
            type="text"
            placeholder="Workshop Title"
            value={newWorkshop.title}
            onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="date"
            value={newWorkshop.date}
            onChange={(e) => setNewWorkshop({ ...newWorkshop, date: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          {editingWorkshop ? (
            <button
              onClick={updateWorkshop}
              className="bg-blue-500 text-white p-2 w-full rounded-md"
            >
              Update Workshop
            </button>
          ) : (
            <button
              onClick={addWorkshop}
              className="bg-green-500 text-white p-2 w-full rounded-md"
            >
              Add Workshop
            </button>
          )}
        </CardContent>
      </Card>
      <ul>
        {workshops.map((workshop) => (
          <Card key={workshop.id} className="mb-2">
            <CardContent className="flex justify-between items-center">
              <span>{workshop.title} - {workshop.date}</span>
              <div>
                <button
                  onClick={() => editWorkshop(workshop)}
                  className="bg-yellow-500 text-white p-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteWorkshop(workshop.id)}
                  className="bg-red-500 text-white p-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </ul>
      <button
        onClick={() => navigate("/cards")}
        className="bg-purple-500 text-white p-2 w-full rounded-md mt-4"
      >
        Upload Workshop
      </button>
    </div>
  );
};

export default InstructorDashboard;