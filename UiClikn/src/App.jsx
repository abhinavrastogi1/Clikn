import React, { useEffect } from "react";
import "./App.css";

import Footer from "./Component/Footer/Footer.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import MainHeader from "./Component/Header/MainHeader.jsx";
import { useSelector } from "react-redux";
function App() {
  const { loggedIn } = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);
  return (
    <>
      {loggedIn && (
        <div className="  relative  bg-[#fffff4] dark:bg-DB  ">
          <MainHeader />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
