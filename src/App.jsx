import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage.jsx";
import MapsPage from "../pages/MapsPage.jsx";
import CalendarPage from "../pages/CalendarPage.jsx";
import ChartPage from "../pages/ChartPage.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>

          {/* Public Routes */}

          <Route path="/" element={<WelcomePage />} />

          {/* Route Maps */}

          <Route path="/maps" element={<MapsPage />} />

          {/* Route Calendar */}

          <Route path="/calendar" element={<CalendarPage />} />

          {/* Route Graphics */}

          <Route path="/chart" element={<ChartPage />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
