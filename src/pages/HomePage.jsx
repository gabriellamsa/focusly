import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold">
          Welcome to <span className="text-gray-300">Focusly</span>
        </h1>
        <p className="text-lg text-gray-400">
          Stay focused, be productive, and organize your tasks effortlessly.
        </p>

        <button
          onClick={() => navigate("/task-manager")}
          className="px-6 py-3 bg-gray-700 text-gray-200 font-bold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HomePage;
