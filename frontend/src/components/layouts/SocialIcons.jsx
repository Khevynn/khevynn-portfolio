import GithubOriginal from "react-devicons/github/original";
import LinkedinPlain from "react-devicons/linkedin/plain";

function SocialIcons() {
  return (
    <div className="flex flex-wrap gap-4">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/khevynn-sá-8774162a1"
        className="flex items-center gap-2 rounded-xl bg-[#0077b5]/10 border border-[#0077b5]/30 hover:bg-[#0077b5]/20 px-6 py-3 text-white font-inter font-medium text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,119,181,0.2)]"
      >
        <LinkedinPlain color="#FFFFFF" size="20px" />
        <span>Connect on LinkedIn</span>
      </a>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Khevynn"
        className="flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 text-white font-inter font-medium text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
      >
        <GithubOriginal color="#FFFFFF" size="20px" />
        <span>Follow on GitHub</span>
      </a>
    </div>
  );
}

export default SocialIcons;
