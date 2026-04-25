import { motion } from "framer-motion";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PortfolioChatBot from "./components/PortfolioChatBot";

export default function App() {
  return (
    /* overflow-x-hidden here as a safety net on the root wrapper */
    <div className="noise bg-[#050709] min-h-screen relative overflow-x-hidden">
      <Particles />
      <div className="relative z-10">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </motion.main>
      </div>
      {/* ChatBot — outside main flow so it floats freely */}
      <PortfolioChatBot />
    </div>
  );
}
