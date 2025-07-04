import WhiteLogo from "../assets/White-Logo.png";
import BlackLogo from "../assets/Black-Logo.png";
import { HashLink } from "react-router-hash-link";

function NavBar() {
  return (
    <nav className="flex fixed top-0 z-30 w-full border-b border-transparent bg-gray/50 backdrop-blur-xl md:border-gray-900">
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 align-bottom md:flex-row md:justify-between">
        <HashLink smooth to="#" className="flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={WhiteLogo}
            alt="Khevynn"
          />
        </HashLink>
      </div>
      <div className="max-w-7xl mx-auto px-4 justify-center sm:px-6  flex align-middle md:justify-end">
        <HashLink
          smooth
          to="#about"
          className="p-6 font-semibold text-[17px] text-gray-600 hover:text-gray-900 dark:text-gray-300 transition-all duration-300 dark:hover:text-gray-100"
        >
          About
        </HashLink>
        <HashLink
          smooth
          to="#"
          className="p-6 font-semibold text-[17px] text-gray-600 hover:text-gray-900 dark:text-gray-300 transition-all duration-300 dark:hover:text-gray-100"
        >
          Projects
        </HashLink>
        <HashLink
          smooth
          to="#contact"
          className="p-6 font-semibold text-[17px] text-gray-600 hover:text-gray-900 dark:text-gray-300 transition-all duration-300 dark:hover:text-gray-100"
        >
          Contact
        </HashLink>
      </div>
    </nav>
  );
}

export default NavBar;
