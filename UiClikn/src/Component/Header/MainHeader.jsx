import React, { useEffect, useRef, useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoIosLink } from "react-icons/io";
import { FaQrcode } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { GoSun } from "react-icons/go";
import { GoMoon } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { logoutApiCall } from "../../Store/Api/LogoutApiActions/logoutSlice";
import { setLinkDelete_CreateMsg } from "../../Store/UiActions/LinkDeleteCreateMsg";
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
  const { linkDelete_CreateMsg } = useSelector(
    (state) => state.linkDelete_CreateMsgSlice
  );

  const { user = {} } = useSelector((state) => state.loginApiSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, firstName, secondName } = user;
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorMsgTransition, setErrorMsgTransition] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  function capitalizeWord(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  const profileRef = useRef();
  const navigationRef = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
      if (navigationRef.current && !navigationRef.current.contains(e.target)) {
        setShowNavigation(false);
      }
    }
    function handleResize() {
      if (window.innerWidth < 1024) {
        setShowProfile(false);
      } else {
        setShowNavigation(false);
      }
    }
    handleResize();
    document.addEventListener("mousedown", handleClick);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (linkDelete_CreateMsg) {
      setErrorMsg(true);
    }
  }, [linkDelete_CreateMsg]);
  useEffect(() => {
    // Start the transition
    const addMsgTransition = setTimeout(() => {
      setErrorMsgTransition(true); // End the transition
    }, 100);
    const removeMsgTransition = setTimeout(() => {
      setErrorMsgTransition(false); // End the transition
    }, 3000);
    const removeMsg = setTimeout(() => {
      setErrorMsg(false); // Remove the message
      dispatch(setLinkDelete_CreateMsg(""));
    }, 4000);
    return () => {
      clearTimeout(removeMsg); // Clear the removal of the message
      clearTimeout(removeMsgTransition);
      clearTimeout(addMsgTransition);
    };
  }, [errorMsg]);
  return (
    <>
      <div className="z-0 absolute items-center w-full -top-16 flex justify-center  ">
        {" "}
        {errorMsg && (
          <div
            className={`border-2 border-red-500 rounded-md p-3 text-center   w-64
              transition    transform    ease-in-out font-bold duration-1000 delay-75 
              dark:bg-DB bg-offwhite dark:shadow-sm dark:shadow-white shadow:xl
              ${
                errorMsgTransition
                  ? " translate-y-32 opacity-100 sm:translate-y-20 md:translate-y-24 lg:translate-y-32 "
                  : "translate-y-0 opacity-0"
              }`}
          >
            <h2 className="text-red-500 text-sm md:text-base ">
              {linkDelete_CreateMsg}
            </h2>
          </div>
        )}
      </div>
      <header
        className="  lg:pb-0 shadow-xl  dark:shadow-md relative border-slate-500  h-[10vh]
     px-2 sm:px-10 md:px-16 lg:px-20 xl:px-36 !z-50  "
      >
        <div className="px-4 mx-auto  h-full sm:px-6 lg:px-8 ">
          <nav className="flex items-center justify-between h-full lg:h-full  w-full  ">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => {
                navigate("/home");
              }}
            >
              <img
                className="w-auto h-8 sm:h-10   md:h-12 lg:h-16 "
                src="/cliknLogo.png"
                alt="cliknLogo"
              />
            </div>

            <div className="lg:hidden flex justify-center items-center gap-2 ">
              <button
                className="bg-slate-200 h-6 w-12 md:h-7 md:w-14 rounded-3xl flex 
                 items-center p-[1px] dark:text-white shadow-sm dark:shadow-white"
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
              <div className="relative" ref={navigationRef}>
                <button
                  onClick={() => {
                    setHideNav(!hideNav);
                    setShowNavigation(!showNavigation);
                  }}
                  type="button"
                  className="inline-flex p-2 text-gray-900 dark:text-white shadow-sm dark:shadow-white
             transition-all duration-200 rounded-md lg:hidden   hover:bg-gray-100 dark:hover:text-black"
                >
                  <TfiMenuAlt className="font-semibold text-xl md:text-2xl" />
                </button>
                {showNavigation && (
                  <div className="absolute top-16 border-[1px] dark:shadow-white dark:shadow-md right-1 dark:bg-DB bg-offwhite shadow-xl z-50 border-rounded rounded-md p-2 ">
                    <div className=" border-rounded rounded-md p-2 flex ">
                      <ul className="border-rounded flex flex-col gap-2 dark:text-white content-stretch">
                        <li
                          className="border-[1px] content-stretch p-2 font-bold text-md  flex flex-col gap-2
                         justify-center rounded-lg  "
                        >
                          <div className="flex justify-start">
                            <span>
                              <IoPersonCircleSharp className="text-2xl gap-2" />
                            </span>{" "}
                            <span className="block truncate w-full">
                              {" "}
                              {capitalizeWord(firstName)}{" "}
                              {capitalizeWord(secondName)}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <span>
                              <IoIosMail className="text-2xl" />
                            </span>{" "}
                            <span>{email}</span>
                          </div>
                        </li>
                        <li
                          className="border-[1px] p-2 font-bold text-md rounded-lg hover:text-blue duration-300 flex items-center gap-2"
                          role="button"
                          onClick={() => {
                            navigate("/home");
                            setShowNavigation(false);
                          }}
                        >
                          <span>
                            <FiHome className="text-xl" />
                          </span>{" "}
                          <span>Home</span>
                        </li>
                        <li
                          className="border-[1px] p-2 font-bold text-md rounded-lg hover:text-blue duration-300 flex items-center gap-2"
                          role="button"
                          onClick={() => {
                            navigate("/home/links");
                            setShowNavigation(false);
                          }}
                        >
                          <span>
                            <IoIosLink className="text-xl" />
                          </span>{" "}
                          <span>Link</span>
                        </li>
                        <li
                          className="border-[1px] p-2 font-bold text-md flex gap-2 items-center rounded-lg hover:text-blue duration-300 "
                          role="button"
                          onClick={() => {
                            navigate("/home/qrcodes");
                            setShowNavigation(false);
                          }}
                        >
                          <span>
                            <FaQrcode className="text-xl" />
                          </span>{" "}
                          <span>QR Code</span>
                        </li>
                        <li
                          className="border-[1px] p-2 font-bold text-md flex gap-2 items-center rounded-lg hover:text-blue duration-300 "
                          role="button"
                          onClick={() => {
                            navigate("/home/analytics");
                            setShowNavigation(false);
                          }}
                        >
                          <span>
                            <IoStatsChartSharp className="text-xl" />
                          </span>{" "}
                          <span>Analytics</span>
                        </li>

                        <li
                          className="flex items-center gap-2 text-red-700 border-[1px] p-2 font-bold text-md rounded-lg 
                       transition transform ease-in-out duration-700 hover:scale-105"
                          role="button"
                          onClick={() => {
                            dispatch(logoutApiCall());
                          }}
                        >
                          <span>Sign out</span>
                          <span>
                            <IoIosLogOut className="text-xl" />
                          </span>{" "}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden   lg:flex lg:items-center lg:ml-auto lg:space-x-10 ">
              <button
                className="text-base flex   justify-center items-center gap-2 font-medium text-gray-900  dark:text-white transition-all duration-200
               hover:text-blue focus:text-blue dark:hover:text-blue"
                onClick={() => {
                  navigate("/home");
                }}
              >
                <FiHome />
                Home
              </button>
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
            <div className="relative hidden lg:block" ref={profileRef}>
              {" "}
              <div
                className="items-center justify-center hidden dark:text-white px-5 py-[6px]
             ml-5  text-white bg-blue 
               rounded-md lg:inline-flex hover:bg-blue
               focus:bg-blue transition transform ease-in-out duration-700 hover:scale-105"
                role="button"
                onClick={() => {
                  setShowProfile(!showProfile);
                }}
              >
                <h1 className="h-10 w-10 rounded-full p-1 font-bold text-lg border-[1px]    text-center content-center">
                  {capitalizeWord(firstName?.[0].toUpperCase())}
                  {capitalizeWord(secondName?.[0].toUpperCase())}
                </h1>
                <h2 className="ml-2 font-bold text-lg"> Profile</h2>
              </div>
              {showProfile && (
                <div className="absolute top-16 border-[1px] dark:shadow-white dark:shadow-md right-1 dark:bg-DB bg-offwhite shadow-xl z-50 border-rounded rounded-md p-2 ">
                  <div className=" border-rounded rounded-md p-2">
                    <ul className="border-rounded flex flex-col gap-2 dark:text-white  ">
                      <li className="border-[1px] p-2 font-bold text-lg rounded-lg hover:text-blue duration-300 flex items-center gap-2">
                        <span>
                          <IoPersonCircleSharp className="text-2xl" />
                        </span>{" "}
                        <span>
                          {" "}
                          {capitalizeWord(firstName)}{" "}
                          {capitalizeWord(secondName)}
                        </span>
                      </li>
                      <li className="border-[1px] p-2 font-bold text-lg flex gap-2 items-center rounded-lg hover:text-blue duration-300 ">
                        <span>
                          <IoIosMail className="text-2xl" />
                        </span>{" "}
                        <span>{email}</span>
                      </li>
                      <li
                        className="flex items-center gap-2 text-red-700 border-[1px] p-2 font-bold text-lg rounded-lg 
                       transition transform ease-in-out duration-700 hover:scale-105"
                        role="button"
                        onClick={() => {
                          dispatch(logoutApiCall());
                        }}
                      >
                        <span>Sign out</span>
                        <span>
                          <IoIosLogOut className="text-2xl" />
                        </span>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
      <div className="flex  bg-white h-1 overflow-hidden">
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
