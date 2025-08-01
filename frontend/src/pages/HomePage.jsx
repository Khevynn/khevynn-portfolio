import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import MainPanel from "../sections/MainPanel";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Education from "../sections/Education";
import Contact from "../sections/Contact";
import ProjectsPreview from "../sections/ProjectsPreview";

function HomePage() {
  return (
    <>
      <NavBar />
      <MainPanel />
      <About />
      <Skills />
      <Education />
      <ProjectsPreview />
      <Contact />
      <Footer />
    </>
  );
}

export default HomePage;
