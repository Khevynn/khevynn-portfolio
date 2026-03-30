import { useEffect, useState } from "react";
import photoFullCropped from "../assets/photo-khevynn-full-cropped.png";
import GithubOriginal from "react-devicons/github/original";
import LinkedinPlain from "react-devicons/linkedin/plain";
import { ChevronRight, Terminal } from "lucide-react";

function MainPanel() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const words = ["Scalable Systems", "AI Agents", "Game Engines"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const typeAnimation = () => {
      const current = words[wordIndex];

      if (isDeleting) {
        setTypedText(current.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(current.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 30 : 80;

      if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
      }

      timer = setTimeout(typeAnimation, typeSpeed);
    };

    timer = setTimeout(typeAnimation, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="mainPanel"
      className="relative flex flex-col min-h-svh justify-center pt-28 pb-12 md:flex-row md:items-center md:gap-8 lg:gap-12 overflow-hidden"
    >
      {/* Background ambient glow — contained with overflow-hidden on section */}
      <div className="absolute top-1/3 left-0 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Left Column */}
      <div className="flex-1 flex flex-col items-start gap-5 z-10 w-full min-w-0">

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-emerald-400 text-[10px] sm:text-xs tracking-wider uppercase font-semibold font-inter shadow-[0_0_15px_rgba(16,185,129,0.1)] max-w-full">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="truncate">Available for Remote &amp; Hybrid</span>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[5rem] font-extrabold font-outfit text-white leading-[1.1] tracking-tight">
            Software <span className="text-zinc-600 font-light">&</span><br />
            Systems <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Engineer.</span>
          </h1>
        </div>

        {/* Typing subtitle */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-md w-full sm:w-fit max-w-full">
          <Terminal size={16} className="text-zinc-500 shrink-0" />
          <p className="text-sm text-zinc-400 font-inter font-medium tracking-wide truncate">
            Architecting{" "}
            <span className="text-white font-semibold">
              {typedText || "..."}
            </span>
            <span className="animate-pulse text-emerald-400 ml-0.5">_</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base lg:text-lg text-zinc-400 font-inter max-w-xl leading-relaxed">
          Software Engineer based in Lisbon. Specialized in <strong className="text-zinc-200 font-semibold">Backend Architectures</strong> and <strong className="text-zinc-200 font-semibold">Game Systems</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 w-full sm:w-auto mt-2">
          <a
            href="#projects-preview"
            className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-inter font-semibold text-sm transition-all bg-white text-black hover:bg-zinc-200 hover:scale-[1.02] text-center"
          >
            Explore Projects
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-inter font-semibold text-sm transition-all bg-[#0a0a0a] text-zinc-300 border border-white/10 hover:bg-white/5 text-center"
          >
            Contact Me
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 sm:gap-6 mt-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/khevynn-sá-8774162a1"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all"
          >
            <LinkedinPlain color="currentColor" size="18px" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Khevynn"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
          >
            <GithubOriginal color="currentColor" size="18px" />
          </a>
        </div>
      </div>

      {/* Right Column: Photo — full-width below on mobile, side-by-side on md+ */}
      <div className="flex md:flex-1 w-full justify-center md:justify-end z-10 min-w-0 md:mt-0 mt-8">
        <div className="relative w-3/4 max-w-xs sm:max-w-sm md:w-full md:max-w-[280px] lg:max-w-[340px] xl:max-w-[380px] glow-border p-[1px] rounded-3xl">
          <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-[#0a0a0a] shadow-2xl z-10">
            <img
              className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity"
              src={photoFullCropped}
              alt="Khevynn Sá, Software Engineer"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainPanel;

