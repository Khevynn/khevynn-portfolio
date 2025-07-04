import myPhoto from "../../assets/photo-khevynn.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect } from "react";

function About() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".image", {
      duration: 1,
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: ".image",
        start: "top 700px",
        end: "bottom 900px",
        scrub: true,
      },
    });

    return () => {
      gsap.killTweensOf(".info-box");
    };
  }, []);
  return (
    <div
      id="about"
      className="flex flex-col min-h-142 gap-10 bg-gray-900 max-xl:justify-center lg:px-30 lg:gap-20"
    >
      <h1 className="mt-10 text-center text-4xl font-semibold text-gray-200">
        About me
      </h1>

      <div className="flex flex-col w-full gap-10 max-xl:items-center xl:pl-25 xl:gap-40 xl:flex-row xl:justify-start">
        <img
          className="image h-[360px] w-[280px] translate-x-[100px] opacity-0 border-8 border-gray-50 md:h-[420px] md:w-[340px] xl:h-[480px] xl:w-[400px]"
          src={myPhoto}
          lg
          alt="My Photo 2"
        />
        <div className="flex flex-col gap-4 max-lg:px-10 max-xl:justify-center">
          <h1 className="text-2xl text-gray-300 font-bold max-xl:text-center">
            Behind the Code
          </h1>
          <p className="text-lg text-gray-300 max-md:text-center md:text-justify lg:pr-10">
            I'm a game developer{" "}
            <span className="underline underline-offset-4">
              recently graduated
            </span>{" "}
            with a degree in Game Development, specializing in{" "}
            <span className="underline underline-offset-4">Unity</span> and
            exploring{" "}
            <span className="underline underline-offset-4">Unreal Engine</span>
            . During my academic journey, I worked on projects focused on
            gameplay programming, system design, and level creation, both
            individually and in small teams.
            <br />
            <br />
            I'm particularly interested in crafting{" "}
            <span className="underline underline-offset-4">
              responsive, immersive player experiences
            </span>{" "}
            and solving the technical and creative challenges that come with
            game development. I enjoy working with{" "}
            <span className="underline underline-offset-4">C#</span>, designing
            gameplay mechanics, and building well-structured, maintainable
            systems.
            <br />
            <br />
            I’m eager to grow as a developer, contribute to exciting projects,
            and keep learning as I step into the industry.
          </p>
        </div>
      </div>
      <div className="gap-10 md:gap-20"></div>
    </div>
  );
}

export default About;
