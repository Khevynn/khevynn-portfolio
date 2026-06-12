import { GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";

function Education() {
  const educations = [
    {
      degree: "BSc in Games Development",
      school: "IADE - European University",
      period: "2022 – 2025",
      location: "Lisbon, Portugal",
      achievements: [
        <><strong className="text-zinc-200 tracking-wide">Backend & Distributed Systems:</strong> Architected distributed Matchmaking logic and scalable real-time networking flows using <strong className="text-zinc-200">Node.js</strong>. Integrated client applications with secure <strong className="text-zinc-200">RESTful APIs</strong> and Webhooks.</>,
        <><strong className="text-zinc-200 tracking-wide">OOP & Software Architecture:</strong> Applied advanced Object-Oriented Programming in <strong className="text-zinc-200">Java, C++, and C#</strong>. Implemented robust Design Patterns (Singletons, State Machines, Factory) to solve complex architectural challenges.</>,
        <><strong className="text-zinc-200 tracking-wide">Performance Optimization:</strong> Engineered memory-efficient algorithms and high-performance data structures to maintain optimal system performance under heavy load conditions.</>,
      ],
      tech: ["Java", "C++", "C#", "Node.js", "REST APIs"],
    },
    {
      degree: "Professional Course in Software Development",
      school: "AGMRA",
      period: "2019 – 2022",
      location: "Cascais, Portugal",
      achievements: [
        <><strong className="text-zinc-200 tracking-wide">Core Fundamentals:</strong> Acquired strong foundational knowledge in the Software Development Life Cycle (SDLC), relational databases, and enterprise programming paradigms.</>,
        <><strong className="text-zinc-200 tracking-wide">Capstone Project (PAP):</strong> Independently delivered a complex C# software project, achieving a near-perfect capstone grade of <strong className="text-zinc-200">19/20</strong>.</>,
        <><strong className="text-zinc-200 tracking-wide">Final Results:</strong> Graduated with honors with an overall course average of <strong className="text-zinc-200">17/20</strong>.</>,
      ],
      tech: ["Java", "C#", "SQL", "OOP"],
    },
  ];


  return (
    <section
      className="relative flex flex-col py-16 sm:py-24 overflow-hidden border-t border-white/5"
    >
      <div className="mb-10 sm:mb-16">
        <h2 className="text-xs sm:text-sm font-inter text-emerald-400 tracking-[0.2em] uppercase mb-3 font-semibold">
          Academic Background
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-white">
          Education
        </h1>
      </div>

      <div className="flex flex-col gap-8 w-full z-10 relative">
        {/* Vertical timeline rule */}
        <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-px bg-white/10" />

        {educations.map((edu, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 p-5 sm:p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300 relative ml-0 lg:ml-12 group"
          >
            {/* Timeline node */}
            <div className="hidden lg:flex absolute -left-12 top-10 w-8 h-8 rounded-full bg-[#050505] border-2 border-emerald-500/50 items-center justify-center -translate-x-1/2 group-hover:scale-110 group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>

            {/* Header info */}
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl text-zinc-100 font-outfit font-bold tracking-tight">
                  {edu.degree}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
                  <span className="flex items-center gap-1.5 text-[0.95rem] font-inter font-semibold text-emerald-400">
                    <GraduationCap size={16} />
                    {edu.school}
                  </span>
                  <span className="hidden sm:block text-zinc-700">|</span>
                  <span className="flex items-center gap-1.5 text-sm font-inter text-zinc-400">
                    <Calendar size={14} />
                    {edu.period}
                  </span>
                  <span className="hidden sm:block text-zinc-700">|</span>
                  <span className="flex items-center gap-1.5 text-sm font-inter text-zinc-400">
                    <MapPin size={14} />
                    {edu.location}
                  </span>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 xl:justify-end xl:mt-0 mt-2">
                {edu.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[0.7rem] font-inter font-medium tracking-wide text-zinc-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-white/5" />

            {/* Achievements */}
            <ul className="flex flex-col gap-4">
              {edu.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-[3px]" />
                  <p className="font-inter text-zinc-400 text-sm leading-relaxed">
                    {achievement}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
