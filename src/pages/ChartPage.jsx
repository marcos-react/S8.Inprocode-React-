import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header/Header.jsx";
import ChartContainer from "./../components/ChartPage/ChartContainer.jsx";

function ChartPage() {

  return (
    <div className="bg-white">
      <Header />
      <ChartContainer />
    </div>
  );
}

export default ChartPage;