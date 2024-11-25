import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header/Header.jsx";
import UserList from "../components/WelcomePage/UserList.jsx";

function WelcomePage() {

  return (
    <div className="bg-white">
      <Header />
      <UserList />
    </div>
  );
}

export default WelcomePage;