import React from "react";
import { Link } from "react-router-dom";

const Home = ({ tasks, deleteTask }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-600">
        Task Manager
      </h1>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found. Add one!</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border border-gray-300 py-3 px-6 text-left">Title</th>
              <th className="border border-gray-300 py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(({ id, title }) => (
              <tr key={id} className="hover:bg-indigo-50">
                <td className="border border-gray-300 py-2 px-6">{title}</td>
                <td className="border border-gray-300 py-2 px-6 text-center space-x-2">
                  <Link
                    to={`/edit/${id}`}
                    className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTask(id)}
                    className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="text-center mt-8">
        <Link
          to="/create"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded shadow-md transition"
        >
          + Add New Task
        </Link>
      </div>
    </div>
  );
};

export default Home;
