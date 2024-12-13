import React from "react";
import { AuroraHero } from "./Component/Hero/AuroraHero.jsx";
import Header from "./Component/Header/Header.jsx";
import Login from "./Component/Login/Login.jsx";

function App() {
  return (
    <>
      <div className="  relative ">
        <Header />
        <AuroraHero />
        <Login />
      </div>
    </>
  );
}

export default App;
