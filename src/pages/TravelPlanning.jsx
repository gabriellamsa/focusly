import { useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiPlus,
  FiTrash2,
  FiList,
  FiAirplay,
  FiClipboard,
  FiHome,
} from "react-icons/fi";

const sectionIcons = {
  clothes: <FiList className="text-blue-400" />,
  personalCare: <FiAirplay className="text-green-400" />,
  electronics: <FiHome className="text-yellow-400" />,
  travelDocs: <FiClipboard className="text-red-400" />,
};

function TravelPlanning() {
  const [openSections, setOpenSections] = useState({
    clothes: false,
    personalCare: false,
    electronics: false,
    travelDocs: false,
  });

  // initial list data
  const initialLists = {
    clothes: [],
    personalCare: [],
    electronics: [],
    travelDocs: [],
  };

  const [lists, setLists] = useState(initialLists);
  const [newItem, setNewItem] = useState("");

  // itinerary table
  const [itinerary, setItinerary] = useState([]);

  const [newRow, setNewRow] = useState({ activity: "", date: "", notes: "" });

  // function to toggle the section's expanded/collapsed state
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const addItem = (section) => {
    if (newItem.trim()) {
      setLists((prev) => ({
        ...prev,
        [section]: [...prev[section], newItem],
      }));
      setNewItem("");
    }
  };

  const removeItem = (section, index) => {
    setLists((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const addItineraryRow = () => {
    if (newRow.activity.trim()) {
      setItinerary((prev) => [...prev, { id: Date.now(), ...newRow }]);
      setNewRow({ activity: "", date: "", notes: "" });
    }
  };

  const removeItineraryRow = (id) => {
    setItinerary((prev) => prev.filter((row) => row.id !== id));
  };

  // function to render a section of the list
  const renderSection = (sectionKey) => {
    return (
      <div key={sectionKey} className="mb-6">
        <div
          onClick={() => toggleSection(sectionKey)}
          className="flex justify-between items-center cursor-pointer bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-all duration-300"
        >
          <div className="flex items-center space-x-2">
            {sectionIcons[sectionKey]}
            <h2 className="text-lg font-semibold capitalize">
              {sectionKey
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </h2>
          </div>
          {openSections[sectionKey] ? (
            <FiChevronDown className="text-xl text-gray-300" />
          ) : (
            <FiChevronRight className="text-xl text-gray-300" />
          )}
        </div>

        {/* list content */}
        {openSections[sectionKey] && (
          <div className="p-4 bg-gray-900 rounded-lg space-y-2 mt-2">
            {lists[sectionKey].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all duration-300"
              >
                <span>{item}</span>
                <button
                  onClick={() => removeItem(sectionKey, index)}
                  className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                placeholder="Add new item"
              />
              <button
                onClick={() => addItem(sectionKey)}
                className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                <FiPlus className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // function to render the itinerary
  const renderItinerary = () => {
    return (
      <table className="w-full table-auto bg-gray-700 text-white rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-600">
            <th className="p-4 text-left">Activity</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Notes</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {itinerary.map((row) => (
            <tr key={row.id} className="border-t border-gray-600">
              <td className="p-4">{row.activity}</td>
              <td className="p-4">{row.date}</td>
              <td className="p-4">{row.notes}</td>
              <td className="p-4">
                <button
                  onClick={() => removeItineraryRow(row.id)}
                  className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Packing List</h1>
      {Object.keys(lists).map(renderSection)}{" "}
      <h1 className="text-3xl font-bold mt-10 mb-6 text-blue-400">Itinerary</h1>
      {renderItinerary()}
      <div className="flex items-center space-x-4 mt-6">
        <input
          type="text"
          value={newRow.activity}
          onChange={(e) =>
            setNewRow((prev) => ({ ...prev, activity: e.target.value }))
          }
          placeholder="Activity"
          className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
        />
        <input
          type="datetime-local"
          value={newRow.date}
          onChange={(e) =>
            setNewRow((prev) => ({ ...prev, date: e.target.value }))
          }
          className="p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
        />
        <input
          type="text"
          value={newRow.notes}
          onChange={(e) =>
            setNewRow((prev) => ({ ...prev, notes: e.target.value }))
          }
          placeholder="Notes"
          className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
        />
        <button
          onClick={addItineraryRow}
          className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          <FiPlus className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default TravelPlanning;
