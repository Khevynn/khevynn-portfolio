import UnrealengineOriginal from "react-devicons/unrealengine/original";
import ReactOriginal from "react-devicons/react/original";
import NodejsOriginal from "react-devicons/nodejs/original";
import MysqlOriginalWordmark from "react-devicons/mysql/original-wordmark";
import DockerOriginal from "react-devicons/docker/original";
import CsharpOriginal from "react-devicons/csharp/original";
import CplusplusOriginal from "react-devicons/cplusplus/original";
import JavascriptOriginal from "react-devicons/javascript/original";
import JavaOriginal from "react-devicons/java/original";
import TailwindcssOriginalWordmark from "react-devicons/tailwindcss/original-wordmark";
import GithubOriginal from "react-devicons/github/original";
import PythonOriginal from "react-devicons/python/original";
import { Database, Gamepad2, LayoutPanelLeft } from "lucide-react";

function Skills() {
  const SkillBox = ({ icon, name }) => (
    <div className="group flex flex-col items-center justify-center p-3 sm:p-6 gap-2 sm:gap-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:-translate-y-1 hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300 shadow-lg">
      <div className="h-10 sm:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 opacity-70 group-hover:opacity-100">
        {icon}
      </div>
      <span className="font-outfit font-medium text-xs sm:text-sm text-zinc-400 group-hover:text-emerald-400 transition-colors text-center tracking-wide">
        {name}
      </span>
    </div>
  );

  const categories = [
    {
      title: "Backend & Systems",
      icon: <Database className="text-emerald-500" size={20} />,
      skills: [
        { name: "Java", icon: <JavaOriginal size="3em" /> },
        { name: "Python", icon: <PythonOriginal size="3em" /> },
        { name: "Node.js", icon: <NodejsOriginal size="3em" /> },
        { name: "SQL", icon: <MysqlOriginalWordmark size="3em" /> },
      ],
    },
    {
      title: "Game Engines & Core",
      icon: <Gamepad2 className="text-violet-500" size={20} />,
      skills: [
        { name: "Unity", icon: <img src="https://devicon-website.vercel.app/api/unity/original.svg?color=%23FFFFFF" className="w-12 h-12" alt="Unity" /> },
        { name: "Unreal Engine", icon: <UnrealengineOriginal color="#FFFFFF" size="3em" /> },
        { name: "C#", icon: <CsharpOriginal size="3em" /> },
        { name: "C++", icon: <CplusplusOriginal size="3em" /> },
      ],
    },
    {
      title: "Web & Infrastructure",
      icon: <LayoutPanelLeft className="text-sky-500" size={20} />,
      skills: [
        { name: "React", icon: <ReactOriginal size="3em" /> },
        { name: "Docker", icon: <DockerOriginal size="3em" /> },
        { name: "Tailwind CSS", icon: <TailwindcssOriginalWordmark size="3em" /> },
        { name: "Git", icon: <GithubOriginal size="3em" color="#FFFFFF" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="relative flex flex-col py-16 sm:py-24 w-full max-w-7xl mx-auto px-5 sm:px-8 overflow-hidden border-t border-white/5">
      <div className="mb-10 sm:mb-16 md:mb-20">
        <h2 className="text-xs sm:text-sm font-inter text-emerald-400 tracking-[0.2em] uppercase mb-3 font-semibold">
          Technical Arsenal
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-white">
          Skills &amp; Technologies
        </h1>
      </div>

      <div className="flex flex-col gap-16 z-10 w-full">
        {categories.map((category) => (
          <div key={category.title} className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              {category.icon}
              <h3 className="text-2xl font-outfit font-bold text-zinc-200">
                {category.title}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-6">
              {category.skills.map((skill) => (
                <SkillBox key={skill.name} name={skill.name} icon={skill.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
