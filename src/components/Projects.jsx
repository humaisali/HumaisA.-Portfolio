import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/index";

var filters = ["All", "AI", "Frontend"];

function TiltCard(props) {
  var project = props.project;
  var cardRef = useRef(null);

  function handleMouseMove(e) {
    var rect = cardRef.current.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var cx = rect.width / 2;
    var cy = rect.height / 2;
    var rotX = ((y - cy) / cy) * -6;
    var rotY = ((x - cx) / cx) * 6;
    cardRef.current.style.transform = "perspective(1000px) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg) scale(1.02)";
  }

  function handleMouseLeave() {
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s ease", transformStyle: "preserve-3d" }}
      className="glass rounded-xl overflow-hidden border border-[#30363D]/50 hover:border-[#0A84FF]/30 flex flex-col h-full transition-colors duration-300"
    >
      {/* Project image — 16:9 */}
      <div className="w-full img-placeholder" style={{ aspectRatio: "16/9" }}>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Top accent line */}
      <div className="h-0.5 w-full gradient-animate" style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF, #0A84FF)" }} />

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl">{project.icon}</span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded border text-[#0A84FF] border-[#0A84FF]/20 bg-[#0A84FF]/05">
                {project.category}
              </span>
              {project.featured && (
                <span className="text-xs px-2 py-0.5 rounded border border-[#00D4FF]/20 bg-[#00D4FF]/05 text-[#00D4FF]">
                  Featured
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="text-[#8B949E] hover:text-white p-1.5 rounded hover:bg-[#21262D] transition-all duration-200">
                <FiGithub size={15} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer"
                className="text-[#8B949E] hover:text-[#0A84FF] p-1.5 rounded hover:bg-[#0A84FF]/10 transition-all duration-200">
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <h3 className="mb-2 text-sm sm:text-base font-bold text-white">{project.title}</h3>
        <p className="text-[#8B949E] text-xs sm:text-sm leading-relaxed flex-1 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.techs.map(function(tech) {
            return (
              <span key={tech} className="text-xs px-2 py-1 bg-[#0D1117] border border-[#30363D] text-[#8B949E] rounded font-mono">
                {tech}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  var [active, setActive] = useState("All");

  var filtered = projects.filter(function(p) {
    return active === "All" || p.category === active;
  });

  return (
    <section id="projects" className="relative z-10 section">
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-[#0A84FF] rounded-full opacity-[0.03] blur-[120px]" />

      <div className="relative px-4 sm:px-6 mx-auto max-w-7xl lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12 sm:mb-16"
        >
          <span className="text-[#0A84FF] font-mono text-xs tracking-[0.3em] uppercase mb-3">What I've built</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">Featured <span className="gradient-text">Projects</span></h2>
          <div className="w-20 h-1 mt-4 rounded-full" style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }} />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
        >
          {filters.map(function(f) {
            var isActive = active === f;
            return (
              <motion.button
                key={f}
                onClick={function() { setActive(f); }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={"px-4 sm:px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 " +
                  (isActive
                    ? "bg-[#0A84FF] text-white"
                    : "glass border border-[#30363D]/50 text-[#8B949E] hover:text-white hover:border-[#0A84FF]/30"
                  )}
              >
                {f}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map(function(project, i) {
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <TiltCard project={project} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
