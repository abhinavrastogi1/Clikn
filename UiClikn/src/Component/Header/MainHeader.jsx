import React, { useEffect, useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoIosLink } from "react-icons/io";
import { FaQrcode } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { GoSun } from "react-icons/go";
import { GoMoon } from "react-icons/go";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function MainHeader() {
  const [hideNav, setHideNav] = useState(false);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const { loading } = useSelector((state) => state.loadingBarSlice);
  const { user } = useSelector((state) => state.loginApiSlice);
  const navigate = useNavigate();
  console.log(user);
  const { email, firstName, profilePic, secondName } = user;
  const firstAlpha = firstName?.[0].toUpperCase();
  const secondAlpha = secondName?.[0].toUpperCase();
  const [showProfile, setShowProfile] = useState(true);

  function capitalizeWord(str){
 return str?.charAt(0).toUpperCase()+str?.slice(1)
  }

  return (
    <>
      <header
        className="  lg:pb-0 shadow-xl  dark:shadow-md border-slate-500  h-[10vh]
     px-2 sm:px-10 md:px-16 lg:px-20 xl:px-48  "
      >
        <div className="px-4 mx-auto  h-full sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-full lg:h-full">
            <div className="flex-shrink-0">
              <img
                className="w-auto h-8 sm:h-10   md:h-12 lg:h-16 "
                src="/cliknLogo.png"
                alt="cliknLogo"
              />
            </div>

            <div className="lg:hidden flex justify-center items-center gap-2">
              <button
                className="bg-slate-200 h-6 w-12 md:h-7 md:w-14 rounded-3xl flex  items-center p-[1px]"
                onClick={() => {
                  if (theme === "dark") {
                    setTheme("light");
                  } else {
                    setTheme("dark");
                  }
                }}
              >
                <div
                  className={`bg-blue h-6 w-6 md:h-7 md:w-7   rounded-full
                    transition transform ease-in-out duration-300 dark:translate-x-full
                    flex justify-center items-center text-white`}
                >
                  {theme === "dark" ? <GoMoon /> : <GoSun />}
                </div>
              </button>

              <button
                onClick={() => {
                  setHideNav(!hideNav);
                }}
                type="button"
                className="inline-flex p-2 text-gray-900 dark:text-white
             transition-all duration-200 rounded-md lg:hidden   hover:bg-gray-100"
              >
                <TfiMenuAlt className="font-semibold text-xl md:text-2xl" />
              </button>
            </div>
            <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10 ">
              <button
                className="text-base flex justify-center items-center gap-2 font-medium text-gray-900  dark:text-white transition-all duration-200
               hover:text-blue focus:text-blue dark:hover:text-blue"
                onClick={() => {
                  navigate("/home/links");
                }}
              >
                <IoIosLink />
                Links
              </button>
              <button
                className="text-base flex justify-center items-center gap-2 font-medium text-gray-900  dark:text-white transition-all duration-200
               hover:text-blue focus:text-blue dark:hover:text-blue"
                onClick={() => {
                  navigate("/home/qrcodes");
                }}
              >
                <FaQrcode />
                QR Code
              </button>
              <button
                className="text-base flex justify-center items-center gap-2 font-medium text-gray-900  dark:text-white transition-all duration-200
               hover:text-blue focus:text-blue dark:hover:text-blue"
                onClick={() => {
                  navigate("/home/analytics");
                }}
              >
                <IoStatsChartSharp />
                Analytics
              </button>

              <button
                className="bg-slate-200 h-7 w-14 rounded-3xl flex  items-center p-[1px]"
                onClick={() => {
                  if (theme === "dark") {
                    setTheme("light");
                  } else {
                    setTheme("dark");
                  }
                }}
              >
                <div
                  className={`bg-blue h-7 w-7 rounded-full
                    transition transform ease-in-out duration-300 dark:translate-x-full
                    flex justify-center items-center text-white`}
                >
                  {theme === "dark" ? <GoMoon /> : <GoSun />}
                </div>
              </button>
            </div>
            <div className="relative">
              {" "}
              <div
                className="items-center justify-center hidden dark:text-white px-5 py-[6px]
             ml-10  text-white bg-blue 
               rounded-md lg:inline-flex hover:bg-blue
               focus:bg-blue transition transform ease-in-out duration-700 hover:scale-110"
                role="button"
              >
                <h1 className="h-10 w-10 rounded-full p-1 font-bold text-lg border-[1px]    text-center content-center">
                  {firstAlpha}
                  {secondAlpha}
                </h1>
                <h2 className="ml-2 font-bold text-lg"> Profile</h2>
              </div>
              <div className="absolute z-50">
                <div className="bg-white">
                  <ul>
                    <li>{capitalizeWord(firstName)} {capitalizeWord(secondName)}</li>
                    <li>{email}</li>
                    <li>Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          {hideNav && (
            <nav
              className={` pt-4 pb-6 bg-white border border-gray-200    rounded-md shadow-md lg:hidden  !z-50
      }`}
            >
              <div className="flow-root">
                <div className="flex flex-col px-6 -my-2 space-y-1">
                  <a
                    href="#"
                    title=""
                    className="inline-flex py-2 text-base font-medium text-gray-900 transition-all duration-200 hover:text-blue focus:text-blue"
                  >
                    {" "}
                    Features{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="inline-flex py-2 text-base font-medium text-gray-900 transition-all duration-200 hover:text-blue focus:text-blue"
                  >
                    {" "}
                    Solutions{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="inline-flex py-2 text-base font-medium text-gray-900 transition-all duration-200 hover:text-blue focus:text-blue"
                  >
                    {" "}
                    Resources{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="inline-flex py-2 text-base font-medium text-gray-900 transition-all duration-200 hover:text-blue focus:text-blue"
                  >
                    {" "}
                    Pricing{" "}
                  </a>
                </div>
              </div>

              <div className="px-6 mt-6">
                <a
                  href="#"
                  title=""
                  className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue border border-transparent rounded-md tems-center hover:bg-blue focus:bg-blue"
                  role="button"
                >
                  {" "}
                  Get started now{" "}
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>
      <div className="flex  bg-lightblue h-1 overflow-hidden">
        <div
          className={`Loading bg-blue h-full w-[50%] ${
            loading && "left-loader"
          } `}
        ></div>
        <div
          className={`bg-blue h-full w-[50%] ${loading && "right-loader"}`}
        ></div>
      </div>
    </>
  );
}

export default MainHeader;
