import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import React from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

 // ... existing code ...

useEffect(() => {
  setIsClient(true);
  
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  handleResize(); // Set initial size
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("resize", handleResize);
  };
}, []);

// ... existing code ...

  const getTransform = () => {
    if (!isClient) return {};
    return {
      transform: `rotateY(${
        (mousePosition.x - windowSize.width / 2) / 100
      }deg) rotateX(${-(mousePosition.y - windowSize.height / 2) / 100}deg)`,
    };
  };

  return (
    <div className="relative pb-20 pt-36 overflow-hidden">
      {/* Spotlights and background grid remain unchanged */}
      <div className="absolute inset-0">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <motion.div
        className="flex justify-center relative my-20 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center"
          style={{
            perspective: "1000px",
            ...(isClient ? getTransform() : {}),
          }}
        >
          {/* Rest of the content remains unchanged */}
          <motion.p
            className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Dynamic Developer Portfolio
          </motion.p>

          <motion.h1
            className="text-center text-[40px] md:text-2xl lg:text-6xl font-bold my-6"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              color: "#00d4ff",
              letterSpacing: "1px",
            }}
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            Transforming Complex Concepts into Seamless User Experiences💡
          </motion.h1>

          <motion.p
            className="text-center md:tracking-wider mb-0 text-sm md:text-lg lg:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Hey there! I&apos;m Purvika Jagtap, a Software Developer based in
            India📍
          </motion.p>
          <motion.p
            className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            I ensure to bring a unique blend of creativity and technical
            expertise to every project.
          </motion.p>

          <motion.p
            className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Let&apos;s build something amazing together!🎯🚀
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            <a href="#about">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
