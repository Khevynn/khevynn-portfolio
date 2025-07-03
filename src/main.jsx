import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NavBar from "./components/NavBar";
import MainPanel from "./components/sections/MainPanel";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills.jsx";
import Education from "./components/sections/Education.jsx";
import Contact from "./components/sections/Contact.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavBar />
    <MainPanel />
    <About />
    <Skills />
    <Education />
    <Contact />
  </StrictMode>
);
