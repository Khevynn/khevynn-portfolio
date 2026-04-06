import WhiteLogo from "../assets/White-Logo.png";
import { HashLink } from "react-router-hash-link";
import { useEffect, useRef, useState } from "react";

function NavBar() {
  const [showNav, setShowNav] = useState(true);
  const [showCvDropdown, setShowCvDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(window.scrollY);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY < 10) {
        setShowNav(true);
        lastScrollY.current = window.scrollY;
        return;
      }
      if (window.scrollY > lastScrollY.current) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 w-full z-[100] flex justify-center px-3 sm:px-4 pt-3 sm:pt-4 md:pt-6 transition-all duration-300 ${
          showNav ? "translate-y-0" : "-translate-y-[150%]"
        }`}
      >
        <nav
          className={`w-full max-w-5xl rounded-2xl px-4 sm:px-5 lg:px-6 transition-all duration-300 flex justify-between items-center relative z-[101] ${
            scrolled
              ? "bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-emerald-500/5 py-2.5 sm:py-3"
              : "bg-transparent border border-transparent py-3 sm:py-4"
          }`}
        >
          <HashLink smooth to="/#" className="flex items-center gap-3">
            <img
              className="h-10 w-10 rounded-full border border-white/10"
              src={WhiteLogo}
              alt="Khevynn"
            />
            <span className="font-outfit font-bold text-xl tracking-wide text-white hover:text-emerald-400 transition-colors">
              Khevynn
            </span>
          </HashLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
                <HashLink
                  key={item}
                  smooth
                  to={`/#${item === "Projects" ? "projects-preview" : item.toLowerCase()}`}
                  className="font-inter text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  {item}
                </HashLink>
              ))}
            </div>

            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600/10 border border-emerald-500/30 px-5 py-2 font-inter text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-600/20 hover:border-emerald-500/50 cursor-pointer"
                onClick={() => setShowCvDropdown((prev) => !prev)}
              >
                Download CV
                <svg className={`ml-2 h-4 w-4 transition-transform ${showCvDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showCvDropdown && (
                <div className="absolute right-0 mt-3 w-40 rounded-xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden z-[110]">
                  <a
                    href="/cv-pt.pdf"
                    download
                    className="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-emerald-500/10 transition-colors"
                    onClick={() => setShowCvDropdown(false)}
                  >
                    Português (Brasil)
                  </a>
                  <a
                    href="/cv-en.pdf"
                    download
                    className="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-emerald-500/10 transition-colors border-t border-white/5"
                    onClick={() => setShowCvDropdown(false)}
                  >
                    English (International)
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-zinc-400 hover:text-white transition-all p-2 rounded-lg hover:bg-white/5 cursor-pointer relative z-[110]"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Full-Screen Mobile Menu Overlay - Now Outside Wrapper to avoid translate issues */}
      <div 
        className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-3xl z-[90] lg:hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
        
        <div className="flex flex-col items-center gap-8 relative z-10 w-full px-10">
          <div className="flex flex-col items-center gap-6 w-full">
            {["About", "Skills", "Experience", "Projects", "Contact"].map((item, index) => (
              <HashLink
                key={item}
                smooth
                to={`/#${item === "Projects" ? "projects-preview" : item.toLowerCase()}`}
                className="text-4xl font-outfit font-extrabold text-white hover:text-emerald-400 transition-all tracking-tight text-center active:scale-95"
                style={{ 
                  transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </HashLink>
            ))}
          </div>

          <div 
            className="w-full h-px bg-white/10 my-4" 
            style={{ 
              transitionDelay: '300ms',
              opacity: mobileMenuOpen ? 1 : 0,
              width: mobileMenuOpen ? '100%' : '0%'
            }}
          />

          <div className="flex flex-col gap-4 w-full">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest text-center">Download Professional Resume</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/cv-pt.pdf"
                download
                className="flex-1 text-center rounded-xl bg-emerald-600/10 border border-emerald-500/20 px-6 py-4 text-sm font-bold text-emerald-400 hover:bg-emerald-600/20 transition-all border-dashed"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume (PT)
              </a>
              <a
                href="/cv-en.pdf"
                download
                className="flex-1 text-center rounded-xl bg-white/5 border border-white/10 px-6 py-4 text-sm font-bold text-zinc-300 hover:bg-white/10 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume (EN)
              </a>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Open to Opportunities</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
