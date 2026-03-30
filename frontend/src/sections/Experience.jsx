import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

function Experience() {
  const experiences = [
    {
      role: "Software Engineering Intern",
      company: "Reltio",
      period: "Oct 2025 – Jun 2026",
      location: "Lisbon, Portugal (Hybrid)",
      achievements: [
        "Developed custom AI agents utilizing Google AI SDK and Python for analyzing, generating cost reports, and answering complex inquiries related to operational costs.",
        "Built a Model Context Protocol (MCP) tool in Python to automate dashboard generation and streamline weekly cloud cost analysis.",
        "Optimized the company's internal metrics collection systems and data pipelines using Java, improving performance and accuracy.",
      ],
      tech: ["Java", "Python", "Google AI SDK", "MCP Architecture"],
    },
    {
      role: "Software Development Intern",
      company: "Happy Code",
      period: "Sep 2022 – Oct 2022",
      location: "Cascais, Portugal (On-site)",
      achievements: [
        "Mentored students on core programming and video game logic concepts using the company's corporate platforms.",
        "Collaborated actively with the team on developing and maintaining operational tools, securing effective backend implementations that strongly optimized ongoing project workflows.",
      ],
      tech: ["Backend Development", "Game Logic", "Mentoring"],
    },
  ];

  return (
    <section
      id="experience"
      className="relative flex flex-col py-16 sm:py-24 overflow-hidden border-t border-white/5"
    >
      <div className="mb-10 sm:mb-16">
        <h2 className="text-xs sm:text-sm font-inter text-emerald-400 tracking-[0.2em] uppercase mb-3 font-semibold">
          Career Path
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-white">
          Professional Experience
        </h1>
      </div>

      <div className="flex flex-col gap-8 w-full z-10 relative">
        {/* Vertical timeline rule */}
        <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-px bg-white/10" />

        {experiences.map((exp, index) => (
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
                  {exp.role}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
                  <span className="flex items-center gap-1.5 text-[0.95rem] font-inter font-semibold text-emerald-400">
                    <Briefcase size={16} />
                    {exp.company}
                  </span>
                  <span className="hidden sm:block text-zinc-700">|</span>
                  <span className="flex items-center gap-1.5 text-sm font-inter text-zinc-400">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                  <span className="hidden sm:block text-zinc-700">|</span>
                  <span className="flex items-center gap-1.5 text-sm font-inter text-zinc-400">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 xl:justify-end xl:mt-0 mt-2">
                {exp.tech.map((t) => (
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
              {exp.achievements.map((achievement, i) => (
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

export default Experience;
