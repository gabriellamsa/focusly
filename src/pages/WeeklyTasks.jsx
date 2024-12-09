import React, { useState } from "react";

const WeeklyTasks = () => {
  const [tasks, setTasks] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const [newTask, setNewTask] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });

  const addTask = (day, position) => {
    if (newTask[day].trim() === "") return;
    const taskToAdd = { id: Date.now(), text: newTask[day], completed: false };
    const updatedTasks = { ...tasks };

    if (position === "below") {
      updatedTasks[day] = [...updatedTasks[day], taskToAdd];
    } else if (position === "above") {
      updatedTasks[day] = [taskToAdd, ...updatedTasks[day]];
    }

    setTasks(updatedTasks);
    setNewTask((prevState) => ({
      ...prevState,
      [day]: "",
    }));
  };

  const handleTaskClick = (day, taskId) => {
    const updatedTasks = { ...tasks };
    const taskToEdit = updatedTasks[day].find((task) => task.id === taskId);

    taskToEdit.isEditing = !taskToEdit.isEditing;

    setTasks(updatedTasks);
  };

  const handleEditChange = (e, day, taskId) => {
    const updatedTasks = { ...tasks };
    const taskToEdit = updatedTasks[day].find((task) => task.id === taskId);
    taskToEdit.text = e.target.value;

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (day, taskId) => {
    const updatedTasks = { ...tasks };
    updatedTasks[day] = updatedTasks[day].filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditKeyDown = (e, day, taskId) => {
    const task = tasks[day].find((task) => task.id === taskId);

    if (e.key === "Enter") {
      if (task.text.trim() === "") {
        handleDeleteTask(day, taskId); // remove task if the editor is empty
      } else {
        handleTaskClick(day, taskId);
      }
    }
  };

  const daysOfWeek = Object.keys(tasks);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Weekly Task List</h1>
        <p className="text-gray-400 mt-2">Add your weekly tasks.</p>
      </header>

      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-center font-medium border-b border-gray-700 pb-2">
              {day}
            </h3>
            <ul className="mt-4 space-y-2">
              {tasks[day].map((task) => (
                <li key={task.id} className="flex items-center gap-2">
                  {task.isEditing ? (
                    <textarea
                      value={task.text}
                      onChange={(e) => handleEditChange(e, day, task.id)}
                      onKeyDown={(e) => handleEditKeyDown(e, day, task.id)}
                      onBlur={() => handleTaskClick(day, task.id)}
                      className="p-2 bg-gray-700 text-sm text-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span
                      className={`text-sm ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                      onClick={() => handleTaskClick(day, task.id)}
                    >
                      {task.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="relative mt-4">
              <div className="flex items-center gap-2">
                <textarea
                  value={newTask[day]}
                  onChange={(e) =>
                    setNewTask({ ...newTask, [day]: e.target.value })
                  }
                  onKeyDown={(e) => e.key === "Enter" && addTask(day, "below")}
                  placeholder="Add a new task..."
                  className="p-2 bg-gray-700 text-sm text-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTasks;
