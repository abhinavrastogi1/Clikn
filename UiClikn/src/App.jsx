import React from "react";
import "./App.css";

import Footer from "./Component/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import MainHeader from "./Component/Header/MainHeader.jsx";
function App() {
  return (
    <>
      <div className="  relative  bg-[#fffff4] dark:bg-DB  ">
        <MainHeader />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
