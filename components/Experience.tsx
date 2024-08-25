import React from "react";
import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="py-20 w-full bg-navy-dark">
      <h1 className="heading text-white text-center px-4">
        My <span className="text-fuchsia-500">professional journey</span>
      </h1>

      <div className="w-full mt-12 relative container mx-auto px-4">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white md:transform md:-translate-x-1/2"></div>

        {workExperience.map((card, index) => (
          <div
            key={card.id}
            className={`mb-16 flex flex-col items-center w-full ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="w-full md:w-5/12 mb-4 md:mb-0">
              <Button
                duration={Math.floor(Math.random() * 10000) + 10000}
                borderRadius="1.75rem"
                style={{
                  background: "rgb(63,94,251)",
                  backgroundColor:
                    "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(34,11,45,1) 47%, rgba(32,4,28,1) 51%, rgba(62,18,52,1) 54%, rgba(82,27,68,1) 56%, rgba(190,78,155,1) 67%, rgba(252,70,107,1) 100%)",
                  borderRadius: `calc(1.75rem* 0.96)`,
                }}
                className="w-full text-black border-neutral-200 dark:border-slate-800"
              >
                <div className="flex flex-col p-4 md:p-6 gap-4">
                  <Image
                    src={card.thumbnail}
                    alt={card.title}
                    width={96}
                    height={96}
                    sizes="(max-width: 768px) 64px, 96px"
                    className="w-16 md:w-24 mx-auto"
                  />
                  <div>
                    <h1 className="text-center text-lg md:text-2xl font-bold">
                      {card.title}
                    </h1>
                    <p className="text-center mt-2 md:mt-3 font-semibold text-sm md:text-lg">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </Button>
            </div>

            {/* Timeline dot and arrow */}
            <div className="absolute left-0 md:left-1/2 transform translate-x-4 md:-translate-x-1/2 flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded-full z-10"></div>
              <div
                className={`h-0.5 bg-white w-8 md:w-16 ${
                  index % 2 === 0 ? "md:order-last" : "md:order-first"
                }`}
              ></div>
            </div>

            {/* Empty div for spacing on desktop */}
            <div className="hidden md:block md:w-5/12"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
