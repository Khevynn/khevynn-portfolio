import UnrealengineOriginal from "react-devicons/unrealengine/original";
import ReactOriginal from "react-devicons/react/original";
import NodejsOriginal from "react-devicons/nodejs/original";
import MysqlOriginal from "react-devicons/mysql/original";
import CsharpOriginal from "react-devicons/csharp/original";
import CplusplusOriginal from "react-devicons/cplusplus/original";
import JavascriptOriginal from "react-devicons/javascript/original";
import JavaOriginal from "react-devicons/java/original";
import TailwindcssOriginalWordmark from "react-devicons/tailwindcss/original-wordmark";
import GithubOriginal from "react-devicons/github/original";
import RatingStar from "../RatingStar";

function Skills() {
  return (
    <div className="flex flex-col min-h-142 bg-gray-950 gap-10 max-lg:pb-10">
      <h1 className="mt-10 text-center text-4xl text-gray-200 font-semibold">
        Skills
      </h1>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>

      <div className="grid grid-cols-3 px-5 gap-7 text-gray-300 md:px-20 xl:px-60 md:grid-cols-4 lg:grid-cols-6 md:gap-10">
        <div className="flex flex-col items-center gap-3">
          {/* Couldnt find a proper unity icon */}
          <img
            src="https://devicon-website.vercel.app/api/unity/original.svg?color=%23FFFFFF"
            style={{ width: "5em", height: "5em" }}
            width="64"
            height="64"
          />
          <span>Unity</span>
          <RatingStar rating={4.5} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <UnrealengineOriginal color="#FFFFFF" size="5em" />
          <span>Unreal Engine</span>
          <RatingStar rating={3} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <CsharpOriginal size="5em" />
          <span>C#</span>
          <RatingStar rating={4.5} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <CplusplusOriginal size="5em" />
          <span>C++</span>
          <RatingStar rating={3.5} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <JavaOriginal size="5em" />
          <span>Java</span>
          <RatingStar rating={3} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <MysqlOriginal size="5em" />
          <span>MySQL</span>
          <RatingStar rating={4.5} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <JavascriptOriginal size="5em" />
          <span>JavaScript</span>
          <RatingStar rating={3} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <NodejsOriginal size="5em" />
          <span>NodeJS</span>
          <RatingStar rating={4} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <ReactOriginal size="5em" />
          <span>React</span>
          <RatingStar rating={2} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <TailwindcssOriginalWordmark size="5em" />
          <span>Tailwind</span>
          <RatingStar rating={2} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <GithubOriginal size="5em" color="#FFFFFF" />
          <span>Git/Github</span>
          <RatingStar rating={5} />
        </div>
      </div>
    </div>
  );
}

export default Skills;
