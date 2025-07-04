import InfoBox from "../InfoBox";
import ProgrammingCourseImage from "../../assets/programming-course.png";
import IadePhoto from "../../assets/iade-photo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect } from "react";

function Education() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".info-box", {
      duration: 1,
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: ".info-box",
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
    <div className="flex flex-col min-h-142 bg-gray-900 gap-10 max-md:pb-10 lg:px-10 xl:px-30 2xl:px-50">
      <h1 className="mt-10 text-center text-4xl text-gray-200 font-semibold">
        Education
      </h1>

      <div className="flex flex-col justify-around items-start gap-10 text-gray-300 mb-10 max-md:justify-center lg:flex-row">
        <div className="info-box w-full h-full translate-y-[150px] opacity-0">
          <InfoBox
            title="Bachelor in Games Development"
            provider="IADE - European University"
            location="Lisbon, Portugal"
            description="Higher education course focused on the creation and programming of video games,
           covering design, artificial intelligence, 3D modeling, animation and interactive software 
           development. Includes practical projects and teamwork, preparing students to work in the 
           video game industry."
            image={IadePhoto}
          />
        </div>

        <div className="info-box w-full h-full translate-y-[150px] opacity-0">
          <InfoBox
            title="Professional Course - Computer Programmer"
            provider="AGMRA"
            location="Cascais, Portugal"
            description="Dual-certified course focused on software development, covering programming logic, database management, and practical training in Java, C#, and Python. Projects included desktop and web app development, as well as hands-on work with MySQL for modeling and SQL queries. Included a real-world internship (FCT) to consolidate technical skills."
            image={ProgrammingCourseImage}
          />
        </div>
      </div>
    </div>
  );
}

export default Education;
