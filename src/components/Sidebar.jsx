function Sidebar() {
  const menuItems = [
    { name: "New Page", icon: "📄" },
    { name: "Travel Planning", icon: "✈️" },
    { name: "Candidate Tracking", icon: "💼" },
    { name: "Project Planning", icon: "📊" },
    { name: "Weekly Tasks List", icon: "📅" },
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
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
