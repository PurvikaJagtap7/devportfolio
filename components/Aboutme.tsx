"use client";

import React from "react";
import Image from "next/image";

const AboutMe: React.FC = () => {
  return (
    <section id="about-me" className="py-10">
      <h1 className="heading">
        About
        <span className="text-purple"> Me</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden md:flex-row">
          <div className="flex items-center justify-center w-full md:w-1/2">
            <Image
              src="/Purvika.jpg"
              alt="name"
              width={192}
              height={192}
              className="rounded-full md:w-48 w-32"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-center md:text-left p-4">
            <p className="text-lg md:text-xl">
              Hello! I&apos;m <span className="text-purple">[Your Name]</span>,
              a passionate web developer with a knack for creating engaging and
              dynamic user experiences. I specialize in [Your Specializations]
              and have a deep love for [Your Interests/Hobbies].
            </p>
            <p className="text-md md:text-lg mt-4">
              With a background in [Your Background], I bring a unique blend of
              creativity and technical expertise to every project. Let&apos;s
              build something amazing together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
