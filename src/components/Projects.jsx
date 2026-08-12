import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/index";

const filters = ["All", "AI", "Frontend"];

function ProjectCard({ project }) {
  return (
    <div className="group relative flex flex-col h-full glass rounded-2xl border border-[#30363D] overflow-hidden transition-all duration-500 hover:border-[#0A84FF]/30 hover:shadow-[0_0_30px_rgba(10,132,255,0.15)]">
      {/* Top Gradient Bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />
      
      {/* Image Container with MacOS Window aesthetic */}
      <div className="relative w-full overflow-hidden bg-[#050709] border-b border-[#30363D]">
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20 flex gap-1 sm:gap-1.5">
          <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F56]/80 border border-[#E0443E]/50" />
          <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E]/80 border border-[#DEA123]/50" />
          <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27C93F]/80 border border-[#1AAB29]/50" />
        </div>
        <div className="aspect-[16/9] overflow-hidden relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-6 bg-[#0d1117] relative z-10">
        <div className="flex justify-between items-start mb-2 sm:mb-4">
          <div className="flex gap-1 sm:gap-2 items-center flex-wrap">
            <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border text-[#0A84FF] border-[#0A84FF]/20 bg-[#0A84FF]/5 backdrop-blur-md">
              {project.category}
            </span>
          </div>
          <div className="flex gap-0.5 sm:gap-1 -mt-1 sm:mt-0">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="text-[#8B949E] hover:text-white p-1 sm:p-2 rounded-full hover:bg-white/5 transition-colors">
                <FiGithub className="w-[12px] h-[12px] sm:w-[18px] sm:h-[18px]" />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="text-[#8B949E] hover:text-[#0A84FF] p-1 sm:p-2 rounded-full hover:bg-[#0A84FF]/10 transition-colors">
                <FiExternalLink className="w-[12px] h-[12px] sm:w-[18px] sm:h-[18px]" />
              </a>
            )}
          </div>
        </div>
        
        <h3 className="text-[13px] sm:text-xl font-bold text-white mb-1.5 sm:mb-3 group-hover:text-[#0A84FF] transition-colors line-clamp-1">{project.title}</h3>
        <p className="text-[#8B949E] text-[10px] sm:text-sm leading-relaxed mb-3 sm:mb-6 flex-1 line-clamp-2 sm:line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto overflow-hidden h-[18px] sm:h-auto sm:overflow-visible">
          {project.techs.map((tech) => (
            <span key={tech} className="whitespace-nowrap text-[8px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-white/5 border border-white/10 text-[#8B949E] rounded-md font-mono group-hover:border-white/20 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = projects.filter(
    (p) => active === "All" || p.category === active
  );

  return (
    <section id="projects" className="relative z-10 overflow-hidden section">
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-[#0A84FF] rounded-full opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="relative px-4 mx-auto sm:px-6 max-w-7xl lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12 sm:mb-16"
        >
          <span className="text-[#0A84FF] font-mono text-xs tracking-[0.3em] uppercase mb-3">What I've built</span>
          <h2 className="text-4xl font-black text-white sm:text-5xl">Featured <span className="gradient-text">Projects</span></h2>
          <div className="w-20 h-1 mt-4 rounded-full" style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }} />
        </motion.div>

        {/* iOS-Style Segmented Control for Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10 sm:mb-14"
        >
          <div className="inline-flex p-1 bg-[#161B22] border border-[#30363D] rounded-xl shadow-inner">
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`relative px-4 py-1.5 sm:px-8 sm:py-2.5 text-[13px] sm:text-sm font-medium rounded-lg transition-colors z-10 ${
                    isActive ? "text-white" : "text-[#8B949E] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-filter"
                      className="absolute inset-0 bg-[#30363D] border border-white/10 rounded-lg -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {f}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Desktop Layout: Grid */}
        <motion.div layout className="hidden sm:grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Layout: Infinite Auto-Scrolling Marquee */}
        <div className="sm:hidden flex overflow-hidden relative w-full pb-2">
          {/* We duplicate the array multiple times to ensure enough width for seamless looping */}
          <motion.div
            className="flex gap-3 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: filtered.length * 12, // Slower speed (was 5)
            }}
          >
            {[...filtered, ...filtered, ...filtered, ...filtered].map((project, i) => (
              <div key={project.title + "-" + i} className="w-[160px] flex-shrink-0">
                <ProjectCard project={project} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}