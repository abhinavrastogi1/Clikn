import React from "react";
import cliknLogo from "/cliknLogo.png";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <div className=" fixed z-50   inset-0    h-[10vh] w-full px-48 ">
      <div className="flex h-full  justify-between items-center">
        <img src={cliknLogo} alt=" clikn logo" className="h-full " />
        <div className=" flex gap-10">
          <button className="h-10 w-28 bg-white">Log in</button>
          <button className="h-10 w-28 bg-white">Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
