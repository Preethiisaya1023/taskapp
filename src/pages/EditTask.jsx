import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = ({ tasks, updateTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const taskToEdit = tasks.find((task) => task.id === id);

  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!taskToEdit) {
      navigate("/");
    }
  }, [taskToEdit, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }
    updateTask(id, { title: title.trim() });
    navigate("/");
  };

  if (!taskToEdit) return null;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">Edit Task</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="block mb-2 font-semibold">
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
          className="w-full border border-gray-300 rounded px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
