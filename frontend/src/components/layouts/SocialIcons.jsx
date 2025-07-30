import { gsap } from "gsap";
import GithubOriginal from "react-devicons/github/original";
import LinkedinPlain from "react-devicons/linkedin/plain";
import { useLayoutEffect } from "react";

function SocialIcons() {
  useLayoutEffect(() => {
    gsap.to(".social-icons", {
      duration: 1,
      opacity: 1,
      x: 0,
    });

    return () => {
      gsap.killTweensOf(".social-icons");
    };
  }, []);

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <a
        target="_blank"
        href="https://www.linkedin.com/in/khevynn-sá-8774162a1"
        className="social-icons flex items-center translate-x-[-100px] gap-2 rounded-full bg-blue-600 px-5 py-3 text-gray-200 transition-all duration-300 hover:bg-blue-700"
      >
        <LinkedinPlain color="#FFFFFF" size="25px" />
        <span>LinkedIn</span>
      </a>

      <a
        target="_blank"
        href="https://github.com/Khevynn"
        className="social-icons flex items-center translate-x-[100px] gap-2 rounded-full bg-blue-600 px-5 py-3 text-gray-200 transition-all duration-300 hover:bg-blue-700"
      >
        <GithubOriginal color="#FFFFFF" size="25px" />
        <span>GitHub</span>
      </a>
    </div>
  );
}

export default SocialIcons;
