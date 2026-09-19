import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthProvider } from "./admin/context/AuthContext";
import AdminRouter from "./admin/AdminRouter";

// Portfolio sections
import Particles from "./components/Particles";
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import About     from "./components/About";
import Skills    from "./components/Skills";
import Experience   from "./components/Experience";
import Certifications from "./components/Certifications";
import Projects  from "./components/Projects";
import Contact   from "./components/Contact";
import Footer    from "./components/Footer";
import PortfolioChatBot from "./components/PortfolioChatBot";
import KineticTextLoader from "./components/KineticTextLoader";

const PORTFOLIO_LOADING_MS = 3000;

function Portfolio() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), PORTFOLIO_LOADING_MS);
    return () => window.clearTimeout(timeout);
  }, []);

  if (loading) return <KineticTextLoader />;

  return (
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
          <Certifications />
          <Projects />
          <Contact />
          <Footer />
        </motion.main>
      </div>
      <PortfolioChatBot />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*"       element={<Portfolio />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
