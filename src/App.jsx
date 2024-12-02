import TaskManager from "./components/TaskManager";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-800">
        <TaskManager />
      </div>
    </div>
  );
}

export default App;
