import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const AuroraHero = () => {
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

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Build stronger digital connections
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          Use our URL shortener and QR Codes to engage your audience and connect
          them to the right information.
        </p>
        <div
          style={{
            border,
            boxShadow,
          }}
          className=" relative flex flex-col w-fit items-start gap-1.5 rounded-lg bg-gray-950/10 px-4 py-10 mx-8
           text-gray-50 transition-colors hover:bg-gray-950/50"
        >
          <div>
            <h2>Shorten a long link</h2>
            <h3>No credit card required.</h3>
          </div>
          <div>
            <h3>Paste your long link here</h3>
          </div>
          <form
            className="flex flex-col"
            onSubmit={() => {
              formSubmit();
            }}
            
          >
            <input
              type="Text"
              className="text-white border-2 rounded-md py-2 bg-transparent"
              size="50"
              placeholder="https://example.com"
            />
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="flex group"
            >
              Get your link
              <span>
                <FiArrowRight className="transition-transform  group-hover:-rotate-45 group-active:-rotate-12" />
              </span>
            </motion.button>
          </form>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};