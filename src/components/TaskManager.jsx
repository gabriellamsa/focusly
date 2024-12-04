import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = (e) => {
    if (e.key === "Enter" && taskInput.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskInput, completed: false },
      ]);
      setTaskInput(""); // clear input after adding task
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleRemoveTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mt-10 mb-6 text-blue-400">
        Task Manager
      </h1>

      {/* task input */}
      <div className="space-y-4">
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
      <div className="mt-6 space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks yet. Start typing!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 bg-gray-900 border border-gray-600 rounded-lg ${
                task.completed ? "line-through text-gray-500" : "text-white"
              }`}
            >
              <div
                onClick={() => toggleTaskCompletion(task.id)}
                className="cursor-pointer flex-grow"
              >
                {task.text}
              </div>
              <button
                onClick={() => handleRemoveTask(task.id)}
                className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
              >
                <FiTrash2 />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskManager;
