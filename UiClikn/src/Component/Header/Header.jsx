import React from "react";
import cliknLogo from "/cliknLogo.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginPageReducer } from "../../Store/UiActions/loginSlice.js";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className=" fixed z-50   inset-0    h-[5vh] sm:h-[7vh] md:h-[8vh]
     lg:h-[9vh] xl:h-[10vh] w-full px-4 my-6 sm:px-10  md:px-20 lg:px-30 xl:px-36 
     "
    >
      <div className="flex h-full  justify-between items-center">
        <img
          src={cliknLogo}
          alt=" clikn logo"
          className="h-full w-[25%]  md:w-[20%]  lg:w-[15%] "
        />
        <div className=" flex gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10">
          <button
            onClick={() => {
              navigate("/Login");
            }}
            className="h-full p-[2px] sm:p-1 md:p-2 w-20 sm:w-24 md:w-28 rounded-lg  text-white bg-transparent 
          border-2 border-white "
          >
            Log in
          </button>

          <button
            onClick={() => {
              dispatch(loginPageReducer(false));
              navigate("/Signup");
            }}
            className=" h-full p-[2px] sm:p-1 md:p-2 w-20 sm:w-24 md:w-28   rounded-lg  text-white bg-transparent 
          border-2 border-white  "
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
