import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header/Header.jsx";
import MapsContainer from "./../components/MapsPage/MapsContainer.jsx";

function MapsPage() {

  return (
    <div className="bg-white">
      <Header />
      <MapsContainer />
    </div>
  );
}

export default MapsPage;