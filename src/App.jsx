import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthProvider } from "./admin/context/AuthContext";
import AdminRouter from "./admin/AdminRouter";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PortfolioChatBot from "./components/PortfolioChatBot";
import KineticTextLoader from "./components/KineticTextLoader";
import AllProjects from "./pages/AllProjects";
import ProjectDetails, { ProjectNotFound } from "./pages/ProjectDetails";
import { projects } from "./data/index";
import "./projects.css";

const PORTFOLIO_LOADING_MS = 3000;

function PublicRouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const section = hash ? document.getElementById(hash.slice(1)) : null;
      if (section) section.scrollIntoView({ behavior: "instant", block: "start" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  useEffect(() => {
    const pagePath = pathname.replace(/\/+$/, "") || "/";
    const project = projects.find(item => pagePath === `/projects/${item.slug}`);
    const title = project ? `${project.title} | Humais Ali` : pagePath === "/projects" ? "All Projects | Humais Ali" : pagePath === "/" ? "Humais Ali | Full Stack Dev | AI Engineer" : "Page not found | Humais Ali";
    const description = project?.description || (pagePath === "/projects" ? "Explore Humais Ali's AI applications, developer tools, and client projects, with detailed features and technology stacks." : "Software Engineering student at UET Mardan building AI-powered full-stack web applications at SkyTech Developers. React, Node.js, Gemini AI.");
    const originalTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const originalDescription = meta?.content;
    document.title = title;
    if (meta) meta.content = description;
    return () => {
      document.title = originalTitle;
      if (meta) meta.content = originalDescription;
    };
  }, [pathname]);
  return null;
}

function PublicLayout() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), PORTFOLIO_LOADING_MS);
    return () => window.clearTimeout(timeout);
  }, []);
  if (loading) return <KineticTextLoader />;
  return (
    <div className="noise bg-[#050709] min-h-screen relative overflow-x-hidden">
      <PublicRouteEffects />
      <Particles />
      <div className="relative z-10">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
      <PortfolioChatBot />
    </div>
  );
}

function Portfolio() {
  return (
    <motion.main id="main-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Certifications />
      <Projects />
      <Contact />
    </motion.main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Portfolio />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="*" element={<ProjectNotFound />} />
          </Route>
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
