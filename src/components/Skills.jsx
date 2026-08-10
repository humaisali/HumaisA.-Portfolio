import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { skills } from "../data/index";
import SolarSystem from "./SolarSystem";
import VengeanceButton from "./VengeanceButton";

var categories = ["Frontend", "Backend", "Database", "AI/ML", "Tools"];

export default function Skills() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="skills" className="section relative z-10 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#0A84FF] rounded-full opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12 sm:mb-20"
        >
          <span className="text-[#0A84FF] font-mono text-xs tracking-[0.3em] uppercase mb-3">What I use</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">Tech <span className="gradient-text">Stack</span></h2>
          <div className="w-20 h-1 rounded-full mt-4" style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }} />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
          {categories.map(function(cat, ci) {
            var catSkills = skills.filter(function(s) { return s.category === cat; });
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
                viewport={{ once: true }}
                className="glass-hover glass rounded-xl border border-[#30363D]/50 hover:border-[#0A84FF]/30"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2 h-8 rounded-full bg-gradient-to-b from-[#0A84FF] to-transparent flex-shrink-0" />
                    <h3 className="font-bold text-sm uppercase tracking-widest font-mono text-[#0A84FF]">{cat}</h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {catSkills.map(function(skill, si) {
                      return (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-white text-sm font-medium">{skill.name}</span>
                            <span className="text-xs font-mono text-[#0A84FF]">{skill.level}%</span>
                          </div>
                          <div className="h-1.5 bg-[#21262D] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: skill.level + "%" }}
                              transition={{ duration: 1, delay: si * 0.1, ease: "easeOut" }}
                              viewport={{ once: true }}
                              className="h-full rounded-full"
                              style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center w-full mt-4 sm:mt-8"
        >
          <VengeanceButton onClick={() => setIsModalOpen(true)}>
            My Tech Solar System
          </VengeanceButton>
        </motion.div>
      </div>

      {/* Solar System Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl mx-4 p-6 sm:p-10 rounded-2xl bg-[#050505] border border-[#30363D] shadow-2xl flex flex-col items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#8B949E] hover:text-white transition-colors p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-6">Tech <span className="gradient-text">Solar System</span></h3>
              <SolarSystem />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
