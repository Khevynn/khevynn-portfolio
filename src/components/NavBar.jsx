function NavBar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 justify-center sm:px-6  flex align-middle md:justify-end">
        <a
          href="#about"
          className="p-6 font-semibold text-[17px] text-gray-600 hover:text-gray-900 dark:text-gray-300 transition-all duration-300 dark:hover:text-gray-100"
        >
          About
        </a>
        <a
          href="#"
          className="p-6 font-semibold text-[17px] text-gray-600 hover:text-gray-900 dark:text-gray-300 transition-all duration-300 dark:hover:text-gray-100"
        >
          Projects
        </a>
        <a
          href="#"
          className="p-6 font-semibold text-[17px] text-gray-600 hover:text-gray-900 dark:text-gray-300 transition-all duration-300 dark:hover:text-gray-100"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
