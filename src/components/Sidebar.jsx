import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiFileText,
  FiMap,
  FiBriefcase,
  FiBarChart2,
  FiCalendar,
} from "react-icons/fi";

function Sidebar() {
  const menuItems = [
    { name: "Home", icon: <FiHome />, path: "/" },
    { name: "Task Manager", icon: <FiCheckSquare />, path: "/task-manager" },
    { name: "New Page", icon: <FiFileText />, path: "/new-page" },
    { name: "Travel Planning", icon: <FiMap />, path: "/travel-planning" },
    {
      name: "Candidate Tracking",
      icon: <FiBriefcase />,
      path: "/candidate-tracking",
    },
    {
      name: "Project Planning",
      icon: <FiBarChart2 />,
      path: "/project-planning",
    },
    { name: "Weekly Tasks List", icon: <FiCalendar />, path: "/weekly-tasks" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Personal</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-3 py-2 hover:bg-gray-700 rounded"
          >
            <span className="text-2xl">{item.icon}</span>
            <Link to={item.path} className="flex-1">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
