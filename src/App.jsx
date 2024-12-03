import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import NewPage from "./pages/NewPage";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-800">
          <Routes>
            <Route path="/" element={<NewPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
