import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import MainPanel from "../sections/MainPanel";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Education from "../sections/Education";
import Contact from "../sections/Contact";
import ProjectsPreview from "../sections/ProjectsPreview";

function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-[0.15] z-0"></div>
      <div className="relative z-10 w-full flex flex-col">
        <NavBar />
        {/* All sections share this container for consistent alignment */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MainPanel />
          <About />
          <Skills />
          <Experience />
          <Education />
          <ProjectsPreview />
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
