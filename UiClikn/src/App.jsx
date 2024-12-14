import React from "react";
import "./App.css";
 import Login from "./Component/Login/Login.jsx";

import { AuroraHero } from "./Component/Hero/AuroraHero.jsx";
function App() {
  return (
    <>
      <div className="  relative ">
        {/* <AuroraHero /> */}
        <Login />
      </div>
    </>
  );
}

export default App;
