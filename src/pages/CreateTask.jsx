import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTask = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }
    addTask({ title: title.trim() });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">Create Task</h1>

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
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
