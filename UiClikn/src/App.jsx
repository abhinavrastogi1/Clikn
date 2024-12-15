import React from "react";
import "./App.css";

import Footer from "./Component/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import MainHeader from "./Component/Header/MainHeader.jsx";
function App() {
  return (
    <>
      <div className="  relative  bg-[#fffff4] dark:bg-DB  px-2 sm:px-10 md:px-20 lg:px-30 xl:px-48">
        <MainHeader />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
