import React, { useEffect, useState } from "react";
import Google from "../../assets/Google.svg";
function Login() {
  const [leftpannel, setLeftPannel] = useState(false);
  const [signUp, setSignUp] = useState(true);

  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center gap-5 p-4 ">
      <img src="/cliknLogo.png" alt="clikn logo" className="h-10 w-20" />
      <div className=" grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2 shadow-2xl ">
        <div
          className={` transition transform ease-in-out duration-1000 h-[390px] sm:h-[500px] ${
            leftpannel
              ? " translate-y-full sm:translate-y-0 sm:translate-x-full "
              : " -translate-y-0  sm:-translate-x-0  "
          }`}
        >
          {signUp ? (
            <div className=" flex flex-col items-center gap-4 p-10">
              <h1 className="text-black font-bold  text-4xl ">Log in</h1>
              <button
                className=" p-2 rounded-full border-gray-300 border-2 hover:scale-110
          h-10 w-10 shadow-2xl"
              >
                <img src={Google} alt="google logo" className="h-full w-full" />
              </button>
              <span className="text-black">or use your account</span>

              <form className="flex flex-col gap-5 items-center">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="text-black sm:w-80 bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                  autoComplete="on"
                  required
                />
                <input
                  type="Password"
                  name="email"
                  placeholder="Password"
                  className="text-black sm:w-80 bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                  autoComplete="on"
                  required
                />
                <button
                  className="bg-orange h-10 w-36  rounded-3xl content-center text-white font-semibold"
                  type="submit"
                >
                  LOG IN
                </button>
              </form>
            </div>
          ) : (
            <div className=" flex flex-col items-center gap-2 sm:py-10 py-3  px-10">
              <h1 className="text-black font-bold  text-4xl leading-tight">
                Sign Up
              </h1>
              <button
                className=" p-2 rounded-full border-gray-300 border-2 hover:scale-110
          h-10 w-10 shadow-2xl"
              >
                <img src={Google} alt="google logo" className="h-full w-full" />
              </button>
              <span className="text-black leading-loose">
                or use your email for sign up
              </span>

              <form className="flex flex-col gap-2 sm:gap-5 items-center">
                <div className=" gap-1 flex flex-col sm:flex-row">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="text-black sm:w-40 bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                    autoComplete="on"
                    required
                  />
                  <input
                    type="text"
                    name="secondName"
                    placeholder="Second Name"
                    className="text-black sm:w-40 bg-slate-100 border-2  border-black/50 rounded-md p-1 text-base font-medium"
                    autoComplete="on"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="text-black sm:w-80 bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                  autoComplete="on"
                  required
                />
                <input
                  type="Password"
                  name="email"
                  placeholder="Password"
                  className="text-black sm:w-80 bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                  autoComplete="on"
                  required
                />
                <button
                  className="bg-orange h-10 w-36 content-center rounded-3xl text-white font-semibold"
                  type="submit"
                >
                  SIGN UP
                </button>
              </form>
            </div>
          )}
        </div>
        <div
          className={` bg-pink  transition transform duration-1000 ease-in-out p-2  ${
            leftpannel
              ? "-translate-y-full sm:translate-y-0 sm:-translate-x-full "
              : "  -translate-y-0  translate-x-0  "
          }`}
        >
          {signUp ? (
            <div
              className={`flex flex-col justify-center items-center h-full gap-5
             flex-wrap w-full `}
            >
              <h1 className=" text-white text-4xl font-bold">Greetings!</h1>
              <p className="text-white text  flex flex-col gap-1 justify-center items-center">
                Enter your personal details and start
                <span> journey with us</span>
              </p>
              <button
                className="h-10 w-36  rounded-3xl  border-2 border-white content-center text-white font-semibold"
                onClick={() => {
                  setLeftPannel(!leftpannel);
                  const delay = setTimeout(() => {
                    setSignUp(!signUp);
                  }, 300);
                  return () => clearTimeout(delay);
                }}
              >
                Sign UP
              </button>
            </div>
          ) : (
            <div
              className={`flex flex-col justify-center items-center h-full gap-5
                flex-wrap w-full `}
            >
              <h1 className=" text-white text-4xl font-bold">Welcome!</h1>
              <p className="text-white text  flex flex-col gap-1 justify-center items-center">
                To keep connected with us please login
                <span> with your personal info</span>
              </p>

              <button
                className="h-10 w-36   rounded-3xl  border-2 border-white content-center text-white font-semibold"
                onClick={() => {
                  setLeftPannel(!leftpannel);
                  const delay = setTimeout(() => {
                    setSignUp(!signUp);
                  }, 300);
                  return () => clearTimeout(delay);
                }}
              >
                LOG IN
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
