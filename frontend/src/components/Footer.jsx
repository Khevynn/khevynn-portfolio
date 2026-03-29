function Footer({ className }) {
  return (
    <footer className={`relative w-full border-t border-white/5 bg-[#050505] overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-outfit font-bold text-xl text-white tracking-wide">
            Khevynn<span className="text-emerald-500">.</span>
          </span>
          <p className="text-zinc-500 font-inter text-sm">
            © {new Date().getFullYear()} Khevynn Sá. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm font-inter">
          <p className="text-zinc-500">
            Powered by React
          </p>
          <div className="h-4 w-px bg-white/10" />
          <a 
            href="/admin/dashboard" 
            className="text-zinc-400 hover:text-emerald-400 transition-colors uppercase tracking-wider text-xs font-semibold"
          >
            Admin Panel
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
