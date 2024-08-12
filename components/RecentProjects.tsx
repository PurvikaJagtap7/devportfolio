"use client";

import { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    document
      .querySelectorAll(".project-card")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="heading"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Step into <span className="text-fuchsia-500">my code gallery</span>
      </motion.h1>
      <div className="flex flex-wrap items-center justify-center p-0 gap-10 mt-10">
        {projects.map((item, index) => (
          <motion.div
            className="project-card lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <PinContainer title="/Link" href={item.link}>
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <motion.div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src="/bg.png"
                    alt="bgimg"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.img
                  src={item.img}
                  alt="cover"
                  className="z-10 absolute bottom-0"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              </div>
              <motion.h1
                className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1"
                animate={{
                  color: hoveredIndex === index ? "#CBACF9" : "#FFFFFF",
                }}
              >
                {item.title}
              </motion.h1>
              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>
              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, iconIndex) => (
                    <motion.div
                      key={iconIndex}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * iconIndex + 2}px)`,
                      }}
                      whileHover={{ scale: 1.2, zIndex: 1 }}
                    >
                      <img
                        src={icon}
                        alt={`icon${iconIndex}`}
                        className="p-2"
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    Check Live Site
                  </p>
                  <motion.div
                    animate={{ x: hoveredIndex === index ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </motion.div>
                </motion.a>
              </div>
            </PinContainer>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentProjects;
