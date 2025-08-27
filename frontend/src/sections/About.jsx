import myPhoto from "../assets/photo-khevynn-full-cropped.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect } from "react";

function About() {
  return (
    <div
      id="about"
      className="flex flex-col min-h-142 gap-10 bg-gray-900 max-xl:justify-center lg:px-30 lg:gap-20"
    >
      <h1 className="mt-10 text-center text-3xl font-extrabold text-gray-200 ">
        About me
      </h1>

      <div className="flex flex-col h-full gap-10 max-xl:items-center xl:pl-25 xl:gap-40 xl:flex-row xl:justify-start">
        <img
          className="image-about h-[360px] w-[280px] border-8 border-gray-50 md:h-[420px] md:w-[340px] xl:h-[480px] xl:w-[400px]"
          src={myPhoto}
          lg
          alt="My Photo 2"
        />
        <div className="flex flex-col min-h-full gap-4 max-lg:px-10 md:justify-center">
          <h1 className="text-2xl text-gray-300 font-bold max-xl:text-center">
            Behind the Code
          </h1>
          <p className="text-lg text-gray-300 max-md:text-center md:text-justify lg:pr-10">
            I'm both a web and game developer{" "}
            <span className="underline underline-offset-4">
              recently graduated
            </span>{" "}
            with a degree in Games. I specialize in{" "}
            <span className="underline underline-offset-4">Unity</span>,
            exploring{" "}
            <span className="underline underline-offset-4">Unreal Engine</span>,
            and building{" "}
            <span className="underline underline-offset-4">
              modern web applications
            </span>{" "}
            with JavaScript, React, and Node.js. Throughout my journey, I’ve
            worked on{" "}
            <span className="underline underline-offset-4">
              gameplay programming, system design, and level creation
            </span>{" "}
            as well as{" "}
            <span className="underline underline-offset-4">
              interactive, user-focused web projects
            </span>
            .
            <br />
            <br />
            I’m particularly interested in crafting{" "}
            <span className="underline underline-offset-4">
              responsive, immersive experiences
            </span>{" "}
            across both games and the web, and solving the technical and
            creative challenges that come with them. I enjoy working with{" "}
            <span className="underline underline-offset-4">C#</span>,{" "}
            <span className="underline underline-offset-4">JavaScript</span>,
            and <span className="underline underline-offset-4">React</span>,
            always aiming to build{" "}
            <span className="underline underline-offset-4">
              clean, maintainable, and scalable systems
            </span>
            .
            <br />
            <br />
            I’m eager to grow as a developer, contribute to{" "}
            <span className="underline underline-offset-4">
              innovative projects
            </span>{" "}
            in both web and games, and keep learning as I step into the
            industry.
          </p>
        </div>
      </div>
      <div className="gap-10 md:gap-20"></div>
    </div>
  );
}

export default About;
