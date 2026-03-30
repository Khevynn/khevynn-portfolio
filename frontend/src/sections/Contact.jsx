import SocialIcons from "../components/layouts/SocialIcons";
import { useState } from "react";
import { Check, Mail, Smartphone, Code2 } from "lucide-react";

function Contact() {
  const email = "tgwinter@proton.me";
  const phone = "+351 935 784 446";
  const [copied, setCopied] = useState(false);

  function CopyToClipBoard(text) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section
      id="contact"
      className="relative flex flex-col py-16 sm:py-24 overflow-hidden border-t border-white/5"
    >
      <div className="mb-10 sm:mb-16">
        <h2 className="text-xs sm:text-sm font-inter text-emerald-400 tracking-[0.2em] uppercase mb-3 font-semibold">
          Get In Touch
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-white">
          Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Great</span>
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-zinc-400 mt-4 max-w-xl font-inter leading-relaxed">
          I am actively looking for new opportunities as a <strong className="text-zinc-200">Software Engineer | Backend & Game Systems</strong> in remote or hybrid environments. My inbox is always open.
        </p>
      </div>

      {/* Contact details */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16 z-10 w-full">
        <a
          href={`mailto:${email}`}
          className="group flex flex-1 items-center gap-5 bg-white/[0.02] border border-white/5 px-6 lg:px-8 py-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
            <Mail size={24} className="text-emerald-400" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-0.5 relative z-10 min-w-0">
            <span className="text-xs text-zinc-500 font-inter font-semibold uppercase tracking-widest">Email Address</span>
            <span className="font-outfit text-base sm:text-xl font-semibold text-zinc-200 truncate">{email}</span>
          </div>
        </a>

        <button
          onClick={() => CopyToClipBoard(phone)}
          className="group flex flex-1 items-center gap-5 cursor-pointer bg-white/[0.02] border border-white/5 px-6 lg:px-8 py-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden text-left"
        >
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-sky-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
            <Smartphone size={24} className="text-emerald-400" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1 relative z-10">
            <span className="text-xs text-zinc-500 font-inter font-semibold uppercase tracking-widest">Phone Number</span>
            <span className="font-outfit text-xl font-semibold text-zinc-200 flex items-center gap-2">
              {copied
                ? <><Check size={20} className="text-emerald-400" />Copied to clipboard!</>
                : phone}
            </span>
          </div>
        </button>
      </div>

      {/* Social links */}
      <div className="flex flex-col items-center justify-center p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-emerald-500/5 via-violet-500/5 to-sky-500/5 opacity-50 pointer-events-none" />
        <Code2 size={24} className="text-zinc-600 mb-4" strokeWidth={1.5} />
        <p className="text-sm text-zinc-400 font-inter font-medium uppercase tracking-widest mb-6 relative z-10">
          Also find me on
        </p>
        <div className="relative z-10">
          <SocialIcons />
        </div>
      </div>
    </section>
  );
}

export default Contact;
