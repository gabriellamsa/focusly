import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = (e) => {
    if (e.key === "Enter" && taskInput.trim() !== "") {
      const newTask = { id: Date.now(), text: taskInput, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskInput("");
    }
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(sortTasks(updatedTasks));
  };

  const handleRemoveTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // completed tasks go to the end of the list
  const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => a.completed - b.completed);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mt-10 mb-6 text-blue-400">
        Task Manager
      </h1>

      {/* task input */}
      <div className="mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={addTask}
          className="w-full p-4 text-xl text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a new task and hit Enter..."
        />
      </div>

      {/* task list */}
      <ul className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks yet. Start typing!
          </p>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between py-2 ${
                task.completed ? "line-through text-gray-500" : "text-white"
              }`}
            >
              <span
                onClick={() => toggleTaskCompletion(task.id)}
                className="cursor-pointer flex-grow"
              >
                {task.text}
              </span>
              <button
                onClick={() => handleRemoveTask(task.id)}
                className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
              >
                <FiTrash2 />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TaskManager;
