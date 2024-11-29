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
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a task"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        {/* filter buttons */}
        <div className="flex gap-2">
          {["all", "active", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded ${
                filter === type ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        {/* clear completed button */}
        {completedTasksCount > 0 && (
          <button
            onClick={clearCompletedTasks}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Completed ({completedTasksCount})
          </button>
        )}
      </div>

      {/* tasks list */}
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">
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
              className={`p-3 flex justify-between items-center border rounded ${
                task.completed ? "bg-green-100 line-through" : "bg-gray-100"
              }`}
            >
              <span
                onClick={() => toggleTaskCompletion(task.id)}
                className="cursor-pointer"
              >
                {task.text}
              </span>
              <button
                onClick={() => removeTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* task count */}
      <div className="mt-4 text-center text-gray-600">
        <p>
          Total Tasks: {tasks.length} | Completed: {completedTasksCount}
        </p>
      </div>
    </div>
  );
}

export default TaskManager;
