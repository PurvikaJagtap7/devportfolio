"use client";
import React from "react";
import { educationalQualifications } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Education = () => {
  return (
    <section id="education" className="py-20">
      <h1 className="heading">
        <span className="text-purple">Educational</span> Qualifications
      </h1>
      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={educationalQualifications}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Education;
