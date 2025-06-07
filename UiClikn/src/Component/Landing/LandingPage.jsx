import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUrl } from "../../Store/Api/LoginApiActions/loginApiSlice";
import Footer from "../Footer/Footer.jsx";
const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const LandingPage = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [url, seturl] = useState("");
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const [isUrlWrong, setIsUrlWrong] = useState(false);
  function createShortLink(e) {
    e.preventDefault();
    try {
       new URL(url);
      dispatch(addUrl(url));
      navigate("/login");
    } catch (error) {
      setIsUrlWrong(true);
    }
  }
  return (
    <>
      <div>
        <Header />
        <motion.section
          style={{
            backgroundImage,
          }}
          className="relative grid min-h-screen place-content-center overflow-hidden
           bg-gray-950 px-4 py-24 text-gray-200"
        >
          <div className="relative z-10 flex flex-col items-center">
            <h1
              className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl
         font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
            >
              Build stronger digital connections
            </h1>
            <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
              Use our URL shortener and QR Codes to engage your audience and
              connect them to the right information.
            </p>
            <motion.div
              style={{
                border,
                boxShadow,
              }}
              className=" relative flex flex-col w-fit  rounded-lg bg-gray-950/10 px-5 py-10 mx-8
           text-gray-50 transition-colors hover:bg-gray-950/50 items-start gap-10"
            >
              <div>
                <h2 className="text-3xl md:text-4xl  font-bold">
                  Shorten a long link
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-base md:text-lg">
                  Paste your long link here
                </h3>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={createShortLink}
                >
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setIsUrlWrong(false);
                      seturl(e.target.value);
                    }}
                    className={`focus:outline-none  text-white border-2 rounded-md p-2 md:p-3 bg-transparent w-64 sm:w-80 md:w-96  
                      ${
                        isUrlWrong
                          ? "text-red-500 border-red-500"
                          : "text-white border-white"
                      }`}
                    placeholder="https://example.com"
                    required
                  />
                  <div>
                    {isUrlWrong && (
                      <h2
                        className={` text-sm ${
                          isUrlWrong ? "text-red-500" : "text-white"
                        }`}
                      >
                        Please enter a valid URL{" "}
                      </h2>
                    )}
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{
                      scale: 1.015,
                    }}
                    whileTap={{
                      scale: 0.985,
                    }}
                    className="flex group font-semibold border-2 border-white rounded-xl  
                   p-1 md:p-2 w-[50%] sm:w-[42%] md:w-[35%] justify-between items-center  "
                  >
                    Get your link
                    <span>
                      <FiArrowRight className="transition-transform  group-hover:-rotate-45 group-active:-rotate-12" />
                    </span>
                  </motion.button>
                </form>
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
     <Footer/>
    </>
  );
};
