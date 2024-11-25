import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header/Header.jsx";
import CalendarContainer from "./../components/CalendarPage/CalendarContainer.jsx";

function CalendarPage() {

  return (
    <div className="bg-white">
      <Header />
      <CalendarContainer />
    </div>
  );
}

export default CalendarPage;