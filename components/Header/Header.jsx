import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleWelcome = () => {
    navigate("/");
  };

  const handleMaps = () => {
    navigate("/maps");
  };

  const handleCalendar = () => {
    navigate("/calendar");
  };

  const handleChart = () => {
    navigate("/chart");
  };

  return (
    <header>
      <nav className="flex justify-center">
        <ul className="menu menu-horizontal text-white gap-4 bg-base-200 rounded-box shadow-md">
          <li>
            <button onClick={handleWelcome} className="hover:underline">
              Home
            </button>
          </li>
          <li>
            <button onClick={handleMaps} className="hover:underline">
              Maps
            </button>
          </li>
          <li>
            <button onClick={handleCalendar} className="hover:underline">
              Calendar
            </button>
          </li>
          <li>
            <button onClick={handleChart} className="hover:underline">
              Graphics
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
