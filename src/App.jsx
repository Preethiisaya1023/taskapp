import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

// -- Home Component --
function Home({ tasks, deleteTask }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8 text-center">Task Manager</h1>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found. Please add one.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-indigo-100">
            <tr>
              <th className="p-4 text-left border-b border-gray-300">Title</th>
              <th className="p-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(({ id, title }) => (
              <tr key={id} className="hover:bg-indigo-50 transition-colors">
                <td className="p-4 border-b border-gray-300">{title}</td>
                <td className="p-4 border-b border-gray-300 text-center space-x-3">
                  <Link
                    to={`/edit/${id}`}
                    className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTask(id)}
                    className="inline-block px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/create"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 transition"
        >
          + Add New Task
        </Link>
      </div>
    </div>
  );
}

// -- CreateTask Component --
function CreateTask({ addTask }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }
    addTask({ title: title.trim() });
    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium" htmlFor="title">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          placeholder="Enter task title"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

// -- EditTask Component --
function EditTask({ tasks, updateTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const taskToEdit = tasks.find((task) => task.id === id);
  const [title, setTitle] = React.useState(taskToEdit ? taskToEdit.title : "");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!taskToEdit) {
      navigate("/");
    }
  }, [taskToEdit, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }
    updateTask(id, { title: title.trim() });
    navigate("/");
  }

  if (!taskToEdit) return null;

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium" htmlFor="title">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          placeholder="Enter task title"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}

// -- Main App Component --
function App() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage or empty array
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task) {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks((prev) => [...prev, newTask]);
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function updateTask(id, updated) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updated } : task))
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-indigo-50">
        <nav className="bg-indigo-700 p-4 shadow-md">
          <div className="max-w-4xl mx-auto flex justify-between items-center text-white">
            <Link to="/" className="font-bold text-xl hover:text-indigo-300">
              Task Manager
            </Link>
            <div className="space-x-6">
              <Link to="/" className="hover:text-indigo-300">
                Home
              </Link>
              <Link to="/create" className="hover:text-indigo-300">
                Create Task
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home tasks={tasks} deleteTask={deleteTask} />} />
          <Route path="/create" element={<CreateTask addTask={addTask} />} />
          <Route
            path="/edit/:id"
            element={<EditTask tasks={tasks} updateTask={updateTask} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
