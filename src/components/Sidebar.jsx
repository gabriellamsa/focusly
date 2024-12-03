import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "New Page", icon: "📄", path: "/" },
    { name: "Travel Planning", icon: "✈️", path: "/travel-planning" },
    { name: "Candidate Tracking", icon: "💼", path: "/candidate-tracking" },
    { name: "Project Planning", icon: "📊", path: "/project-planning" },
    { name: "Weekly Tasks List", icon: "📅", path: "/weekly-tasks" },
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
            <span>{item.icon}</span>
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
