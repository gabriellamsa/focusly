import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import TaskManager from "./components/TaskManager";
import NewPage from "./pages/NewPage";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-800">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/task-manager" element={<TaskManager />} />
            <Route path="/new-page" element={<NewPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
