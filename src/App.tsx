import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import DashboardPage from "./pages/DashboardPage";
import MaintenancePage from "./pages/MaintenancePage";
import DemoTestPage from "./pages/DemoTestPage";

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      <Dashboard>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/demo-test" element={<DemoTestPage />} />
        </Routes>
      </Dashboard>
    </Router>
  );
};

export default App;
