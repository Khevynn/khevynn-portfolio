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
    <div className="relative min-h-screen bg-[#050505]">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-[0.15] z-0"></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <NavBar />
      <MainPanel />
      <About />
      <Skills />
      <Experience />
      <Education />
      <ProjectsPreview />
      <Contact />
      <Footer />
      </div>
    </div>
  );
}

export default HomePage;
