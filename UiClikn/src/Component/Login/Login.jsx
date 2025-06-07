import React, { useEffect, useState } from "react";
import Google from "../../assets/Google.svg";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import axios from "axios";
const API_URL=import.meta.env.VITE_API_URL
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import {
  loggedInReducer,
  setLoginMsg,
} from "../../Store/UiActions/loginSlice.js";
import {
  loginViaForm,
  setLoadingLogin,
  signUpViaForm,
} from "../../Store/Api/LoginApiActions/loginApiSlice.js";
function Login() {
  const { loginPage } = useSelector((state) => state.loginSlice);
  const [leftpannel, setLeftPannel] = useState(false);
  const [signUp, setSignUp] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorMsgTransition, setErrorMsgTransition] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signUpFrom, setSignUpFrom] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (
      !loginPage ||
      location.pathname === "/signup" ||
      location.pathname === "/Signup"
    ) {
      setLeftPannel(true), setSignUp(false);
    }
  }, [loginPage]);
  const { loggedIn } = useSelector((state) => state.loginSlice);
  const { loadingLogin } = useSelector((state) => state.loginApiSlice);
  const { loginMsg } = useSelector((state) => state.loginSlice);
  const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  async function googleResponse(authresult) {
    try {
      setErrorMsg(false);
      dispatch(setLoadingLogin(true));
      if (authresult["code"]) {
        const response = await axios.post(
          `${API_URL}/user/registration`,
          {},
          {
            params: {
              code: authresult.code,
            },
            withCredentials:true
          }
        );
        if (response.status === 200) {
          dispatch(loggedInReducer(true));
        }
      }
    } catch (error) {
      if (error.status === 409) {
        dispatch(setLoginMsg("Email is already in use.login via form"));
      }
      console.error("something went wrong while logging in", error);
    }
    dispatch(setLoadingLogin(false));
  }
  const googlelogin = useGoogleLogin({
    onSuccess: googleResponse,
    onerror: googleResponse,
    flow: "auth-code",
  });
  useEffect(() => {
    if (loginMsg) {
      setErrorMsg(true);
    }
  }, [loginMsg]);
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
      dispatch(setLoginMsg(""));
    }, 4000);
    return () => {
      clearTimeout(removeMsg); // Clear the removal of the message
      clearTimeout(removeMsgTransition);
      clearTimeout(addMsgTransition);
    };
  }, [errorMsg]);
  useEffect(() => {
    if (loggedIn === true) navigate("/home");
  }, [loggedIn]);
  function loginform(e) {
    e.preventDefault();
    dispatch(loginViaForm(loginForm));
    setLoginForm({
      email: "",
      password: "",
    });
  }
  function signUpform(e) {
    e.preventDefault();
    dispatch(signUpViaForm(signUpFrom));
    setSignUpFrom({
      firstName: "",
      secondName: "",
      email: "",
      password: "",
    });
  }
  function onChangeLoginForm(e) {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  }
  function onChangesignUpForm(e) {
    const { name, value } = e.target;
    setSignUpFrom({
      ...signUpFrom,
      [name]: value,
    });
  }
  return (
    <div>
      <motion.section
        style={{
          backgroundImage,
        }}
        className="relative grid min-h-screen place-content-center
         overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
      >
        <div className=" mb-10 flex justify-center items-center w-full h-20 absolute  -top-10 md:-top-16">
          {errorMsg && (
            <div
              className={`border-2 border-red-500 rounded-md p-3 text-center   w-64
              transition    transform    ease-in-out font-bold duration-1000 delay-75 !z-50  
                        ${
                          errorMsgTransition
                            ? " translate-y-16 opacity-100 sm:translate-y-20 md:translate-y-24 lg:translate-y-32 "
                            : "translate-y-0 opacity-0"
                        }`}
            >
              <h2 className="text-red-500 text-sm md:text-base">{loginMsg}</h2>
            </div>
          )}
        </div>
        <div className="flex flex-col  w-full justify-center items-center gap-5  z-20  bg-DB">
          <img
            src="/cliknLogo.png"
            alt="clikn logo"
            className="h-10 w-20 sm:h-20 sm:w-40 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
          <motion.div
            style={{
              border,
              boxShadow,
            }}
          >
            <div className=" grid grid-rows-2 sm:grid-rows-none  sm:grid-cols-2 shadow-2xl  ">
              <div
                className={` transition transform ease-in-out duration-1000 
            flex justify-center items-center bg-slate-200 rounded-sm
            h-[390px] sm:h-[500px] below-sm ${
              leftpannel
                ? " translate-y-full sm:translate-y-0 sm:translate-x-full "
                : " -translate-y-0  sm:-translate-x-0  "
            }`}
              >
                {signUp ? (
                  <div className=" flex flex-col items-center gap-4 p-10 ">
                    <h1 className="text-black font-bold  text-4xl ">Log in</h1>
                    <button
                      className=" p-2 rounded-full border-gray-300 border-2 hover:scale-110
          h-10 w-10 shadow-2xl"
                      onClick={() => {
                        googlelogin();
                      }}
                    >
                      <img
                        src={Google}
                        alt="google logo"
                        className="h-full w-full"
                      />
                    </button>
                    <span className="text-black">or use your account</span>

                    <form
                      className="flex flex-col gap-5 items-center"
                      onSubmit={loginform}
                    >
                      <input
                        type="email"
                        name="email"
                        value={loginForm.email}
                        onChange={onChangeLoginForm}
                        placeholder="Email"
                        className="text-black sm:w-60  md:w-80 bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                        autoComplete="on"
                        required
                      />
                      <input
                        type="Password"
                        name="password"
                        value={loginForm.password}
                        onChange={onChangeLoginForm}
                        placeholder="Password"
                        className="text-black sm:w-60  md:w-80 bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                        autoComplete="on"
                        required
                      />
                      <button
                        className="bg-blue h-10 w-36  flex rounded-3xl justify-center items-center text-white font-semibold"
                        type="submit"
                      >
                        LOG IN
                        <div
                          className={`border-t-[2px] ml-2 border-white transition-all animate-spin  h-4 w-4 rounded-full 
                          ${!loadingLogin && "hidden"}`}
                        ></div>{" "}
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
                      onClick={() => {
                        googlelogin();
                      }}
                    >
                      <img
                        src={Google}
                        alt="google logo"
                        className="h-full w-full"
                      />
                    </button>
                    <span className="text-black leading-loose">
                      or use your email for sign up
                    </span>
                    <form
                      className="flex flex-col gap-2 sm:gap-5 items-center"
                      onSubmit={signUpform}
                    >
                      <div className=" gap-2 md:gap-1  flex flex-col sm:flex-row">
                        <input
                          type="text"
                          name="firstName"
                          value={signUpFrom.firstName}
                          placeholder="First Name"
                          onChange={onChangesignUpForm}
                          className="text-black sm:w-28 md:w-40 bg-slate-100 border-2 border-black/50 rounded-md
                     p-1 text-base font-medium"
                          autoComplete="on"
                          required
                        />
                        <input
                          type="text"
                          name="secondName"
                          value={signUpFrom.secondName}
                          onChange={onChangesignUpForm}
                          placeholder="Second Name"
                          className="text-black sm:w-28 md:w-40 bg-slate-100 border-2  border-black/50 rounded-md p-1 text-base font-medium"
                          autoComplete="on"
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={signUpFrom.email}
                        onChange={onChangesignUpForm}
                        placeholder="Email"
                        className="text-black sm:w-60 md:w-80 bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                        autoComplete="on"
                        required
                      />
                      <input
                        type="Password"
                        name="password"
                        value={signUpFrom.password}
                        onChange={onChangesignUpForm}
                        placeholder="Password"
                        className="text-black sm:w-60 md:w-80 bg-slate-100 border-2 border-black/50 rounded-md p-1 text-base font-medium"
                        autoComplete="on"
                        required
                      />
                      <button
                        className="bg-orange h-10 w-36 flex justify-center items-center rounded-3xl text-white font-semibold"
                        type="submit"
                      >
                        SIGN UP
                        <div
                          className={`border-t-[2px] ml-2 border-white transition-all animate-spin  h-4 w-4 rounded-full 
                          ${!loadingLogin && "hidden"}`}
                        ></div>
                      </button>
                    </form>
                  </div>
                )}
              </div>
              <div
                className={`  rounded-sm transition transform duration-1000 ease-in-out p-2  ${
                  leftpannel
                    ? "-translate-y-full sm:translate-y-0 sm:-translate-x-full bg-orange "
                    : "  -translate-y-0  translate-x-0    bg-blue"
                }`}
              >
                {signUp ? (
                  <div
                    className={`flex flex-col justify-center items-center h-full gap-5
             flex-wrap w-full `}
                  >
                    <h1 className=" text-white text-4xl font-bold">
                      Greetings!
                    </h1>
                    <p className="text-white text  flex flex-col gap-1 justify-center items-center">
                      Enter your personal details and start
                      <span> journey with us</span>
                    </p>
                    <button
                      className={`h-10 w-36  rounded-3xl  border-2 border-white content-center text-white font-semibold 
                 `}
                      onClick={() => {
                        setLeftPannel(!leftpannel);
                        const delay = setTimeout(() => {
                          setSignUp(!signUp);
                        }, 300);
                        return () => clearTimeout(delay);
                      }}
                    >
                      SIGN UP
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
          </motion.div>
        </div>

        <div className="absolute inset-0 z-0">
          <Canvas>
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>
      </motion.section>
    </div>
  );
}

export default Login;
