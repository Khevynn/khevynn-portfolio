import { GraduationCap, MapPin, Server, Languages } from "lucide-react";

function About() {
  const highlights = [
    {
      Icon: GraduationCap,
      label: "Education",
      value: "BSc Games Development",
      sub: "IADE, European University, Lisbon",
    },
    {
      Icon: MapPin,
      label: "Location",
      value: "Lisbon, Portugal",
      sub: "Available for Remote & Hybrid",
    },
    {
      Icon: Server,
      label: "Primary Focus",
      value: "Backend & Game Systems",
      sub: "Java, Python, MCP, Unity, Unreal",
    },
    {
      Icon: Languages,
      label: "Languages",
      value: "Portuguese (Native)",
      sub: "English (Professional)",
    },
  ];

  return (
    <section
      id="about"
      className="relative flex flex-col py-16 sm:py-24 overflow-hidden border-t border-white/5"
    >
      {/* Section header */}
      <div className="mb-10 sm:mb-16">
        <h2 className="text-xs sm:text-sm font-inter text-emerald-400 tracking-[0.2em] uppercase mb-3 font-semibold">
          About Me
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-white leading-tight">
          Architecting Systems,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Powering Experiences.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start relative z-10">
        {/* Left: Bio */}
        <div className="flex flex-col gap-6">
          <div className="space-y-6 text-base lg:text-lg text-zinc-400 font-inter leading-relaxed">
            <p>
              I am a <strong className="text-zinc-200">Software Engineer</strong> specializing in Backend Architectures and Game Systems. With a degree in <strong className="text-emerald-400">Games Development</strong> from IADE, I bridge the gap between complex logic and seamless user experiences.
            </p>
            <p>
              My expertise lies in building robust data pipelines, orchestrating AI agents (using <strong className="text-zinc-200">Python & Google AI SDK</strong>), and designing efficient core systems in <strong className="text-zinc-200">Java</strong>. I also have deep experience developing intelligent game mechanics and physics using <strong className="text-zinc-200">Unity (C#)</strong> and <strong className="text-zinc-200">Unreal Engine (C++)</strong>.
            </p>
            <p>
              Whether I'm writing highly concurrent backend services or optimizing memory allocations for a game engine, I prioritize clean architectural patterns, maintainability, and absolute performance.
            </p>
          </div>

          {/* Key traits */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["System Design", "Microservices", "AI Agents", "Game Engine Architecture", "Concurrency", "Optimization"].map((trait) => (
              <span
                key={trait}
                className="px-3.5 py-1.5 text-xs font-inter font-medium text-emerald-300 bg-emerald-900/10 border border-emerald-800/30 rounded-md backdrop-blur-sm"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Quick Facts Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {highlights.map(({ Icon, label, value, sub }) => (
            <div
              key={label}
              className="group flex flex-col gap-3 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 transition-transform">
                <Icon size={20} className="text-emerald-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-inter uppercase tracking-widest font-semibold mb-1.5">
                  {label}
                </p>
                <p className="text-zinc-100 font-outfit font-semibold text-[1.1rem] leading-tight">
                  {value}
                </p>
                <p className="text-sm text-zinc-400 font-inter mt-1">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
