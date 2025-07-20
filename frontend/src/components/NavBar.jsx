import WhiteLogo from "../assets/White-Logo.png";
import BlackLogo from "../assets/Black-Logo.png";
import { HashLink } from "react-router-hash-link";
import { useEffect, useRef, useState } from "react";

function NavBar() {
  const [showNav, setShowNav] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Ref to track the last scroll position
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 10) {
        setShowNav(true);
        lastScrollY.current = window.scrollY;
        return;
      }
      if (window.scrollY > lastScrollY.current) {
        setShowNav(false); // scrolling down
      } else {
        setShowNav(true); // scrolling up
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <nav
      className={`flex flex-col fixed py-2 z-30 w-screen border-b border-transparent bg-gray/50 backdrop-blur-xl lg:flex-row md:border-gray-900 transition-transform duration-300 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between max-md:w-full items-center max-w-7xl px-10 lg:mx-auto lg:justify-between">
        <HashLink smooth to="/#" className="flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={WhiteLogo}
            alt="Khevynn"
          />
        </HashLink>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-300 hover:text-gray-100 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="flex flex-col items-center bg-gray-800 text-white p-4">
          <HashLink
            smooth
            to="/#about"
            className="py-2 px-4 hover:bg-gray-700 rounded transition-all duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </HashLink>
          <HashLink
            smooth
            to="/#projects-preview"
            className="py-2 px-4 hover:bg-gray-700 rounded transition-all duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </HashLink>
          <HashLink
            smooth
            to="/#contact"
            className="py-2 px-4 hover:bg-gray-700 rounded transition-all duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </HashLink>
          <a
            href="/cv.pdf"
            download
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-gray-100 px-4 py-2 font-medium text-gray-950 transition-colors duration-200 hover:bg-gray-300 active:bg-gray-200"
          >
            Download CV
          </a>
        </div>
      )}

      <div className="hidden max-w-7xl mx-auto px-4 lg:flex lg:items-center lg:justify-between">
        <div className="flex sm:px-6 md:justify-end">
          <HashLink
            smooth
            to="/#about"
            className="p-6 font-semibold text-[17px] text-gray-600 hover:text-gray-900 dark:text-gray-300 transition-all duration-300 dark:hover:text-gray-100"
          >
            About
          </HashLink>
          <HashLink
            smooth
            to="/#projects-preview"
            className="p-6 font-semibold text-[17px] text-gray-600 hover:text-gray-900 dark:text-gray-300 transition-all duration-300 dark:hover:text-gray-100"
          >
            Projects
          </HashLink>
          <HashLink
            smooth
            to="/#contact"
            className="p-6 font-semibold text-[17px] text-gray-600 hover:text-gray-900 dark:text-gray-300 transition-all duration-300 dark:hover:text-gray-100"
          >
            Contact
          </HashLink>
        </div>
        <div className="flex px-4 justify-start sm:px-6 md:justify-end">
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center justify-center rounded-xl bg-gray-100 px-4 py-2 font-medium text-gray-950 transition-colors duration-200 hover:bg-gray-300 active:bg-gray-200"
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
