import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header/Header.jsx";
import WelcomeContainer from "./../components/WelcomePage/WelcomeContainer.jsx";

function WelcomePage() {

  return (
    <div className="bg-white">
      <Header />
      <WelcomeContainer />
    </div>
  );
}

export default WelcomePage;