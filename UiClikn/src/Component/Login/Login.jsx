import React, { useEffect, useState } from "react";
import Google from "../../assets/Google.svg";
function Login() {
  const [leftpannel, setLeftPannel] = useState(false);
  const [signUp, setSignUp] = useState(true);

  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center gap-10">
        <img src="/cliknLogo.png" alt="clikn logo" className="h-20 w-30"/>
      <div className=" grid grid-cols-2 h-[500px]  shadow-2xl">
        <div
          className={` transition transform ease-in-out duration-1000 ${
            leftpannel ? " translate-x-full " : " -translate-x-0 "
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
                  size="35"
                  placeholder="Email"
                  className="text-black bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                  autoComplete="on"
                  required
                />
                <input
                  type="Password"
                  name="email"
                  size="35"
                  placeholder="Password"
                  className="text-black bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
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
            <div className=" flex flex-col items-center gap-4 p-10">
              <h1 className="text-black font-bold  text-4xl leading-tight">
                Create Account
              </h1>
              <button
                className=" p-2 rounded-full border-gray-300 border-2 hover:scale-110
          h-10 w-10 shadow-2xl"
              >
                <img src={Google} alt="google logo" className="h-full w-full" />
              </button>
              <span className="text-black">
                or use your email for registration
              </span>

              <form className="flex flex-col gap-5 items-center">
                <div className=" gap-5 flex">
                  <input
                    type="text"
                    name="firstName"
                    size="15"
                    placeholder="First Name"
                    className="text-black bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                    autoComplete="on"
                    required
                  />
                  <input
                    type="text"
                    name="secondName"
                    size="15"
                    placeholder="Second Name"
                    className="text-black bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                    autoComplete="on"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  size="35"
                  placeholder="Email"
                  className="text-black bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                  autoComplete="on"
                  required
                />
                <input
                  type="Password"
                  name="email"
                  size="35"
                  placeholder="Password"
                  className="text-black bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
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
          className={` bg-pink  transition transform duration-1000 ease-in-out  ${
            leftpannel ? " -translate-x-full " : " translate-x-0"
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
              <h1 className=" text-white text-4xl font-bold">Welcome Back!</h1>
              <p className="text-white text  flex flex-col gap-1 justify-center items-center">
                To keep connected with us please login
                <span> with your personal info</span>
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
