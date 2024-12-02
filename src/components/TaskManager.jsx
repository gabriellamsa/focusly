import { useState } from "react";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskInput, completed: false },
      ]);
      setTaskInput("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const getFilteredTasks = () => {
    if (filter === "active") return tasks.filter((task) => !task.completed);
    if (filter === "completed") return tasks.filter((task) => task.completed);
    return tasks;
  };

  const filteredTasks = getFilteredTasks();
  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-all">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white text-center mb-6">
        Task Manager
      </h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a new task..."
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {["all", "active", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded text-sm font-medium transition ${
                filter === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-300"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        {completedTasksCount > 0 && (
          <button
            onClick={clearCompletedTasks}
            className="px-4 py-2 text-sm font-medium text-red-500 border border-red-500 rounded hover:bg-red-100 dark:hover:bg-red-700 transition"
          >
            Clear Completed ({completedTasksCount})
          </button>
        )}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center dark:text-gray-400">
          {filter === "all"
            ? "No tasks available. Start adding some!"
            : filter === "active"
            ? "No active tasks remaining."
            : "No completed tasks yet."}
        </p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-3 rounded border ${
                task.completed
                  ? "bg-green-50 border-green-200 dark:bg-green-700 dark:border-green-500"
                  : "bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
              }`}
            >
              <span
                onClick={() => toggleTaskCompletion(task.id)}
                className={`cursor-pointer transition ${
                  task.completed
                    ? "text-green-600 dark:text-green-400 line-through"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => removeTask(task.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
        <p>
          Total Tasks: {tasks.length} | Completed: {completedTasksCount}
        </p>
      </div>
    </div>
  );
}

export default TaskManager;
