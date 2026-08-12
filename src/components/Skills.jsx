import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { skills } from "../data/index";
import VengeanceButton from "./VengeanceButton";

var categories = ["Frontend", "Backend", "Database", "AI/ML", "Tools"];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(categories[0]);

  const renderCategoryCard = (cat, ci, isMobile) => {
    var catSkills = skills.filter(function(s) { return s.category === cat; });
    return (
      <motion.div
        key={cat + (isMobile ? "-mobile" : "-desktop")}
        initial={isMobile ? { opacity: 0, x: 20 } : { opacity: 0, y: 30 }}
        animate={isMobile ? { opacity: 1, x: 0 } : undefined}
        exit={isMobile ? { opacity: 0, x: -20 } : undefined}
        whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, delay: isMobile ? 0 : ci * 0.1 }}
        viewport={!isMobile ? { once: true } : undefined}
        className="glass-hover glass rounded-xl border border-[#30363D]/50 hover:border-[#0A84FF]/30 w-full"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            <div className="w-1.5 h-6 sm:w-2 sm:h-8 rounded-full bg-gradient-to-b from-[#0A84FF] to-transparent flex-shrink-0" />
            <h3 className="font-bold text-[13px] sm:text-sm uppercase tracking-widest font-mono text-[#0A84FF]">{cat}</h3>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {catSkills.map(function(skill, si) {
              return (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1 sm:mb-1.5">
                    <span className="text-white text-[13px] sm:text-sm font-medium">{skill.name}</span>
                    <span className="text-[11px] sm:text-xs font-mono text-[#0A84FF]">{skill.level}%</span>
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
  };

  return (
    <section id="skills" className="section relative z-10 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#0A84FF] rounded-full opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-10 sm:mb-20"
        >
          <span className="text-[#0A84FF] font-mono text-xs tracking-[0.3em] uppercase mb-3">What I use</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">Tech <span className="gradient-text">Stack</span></h2>
          <div className="w-20 h-1 rounded-full mt-4" style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }} />
        </motion.div>

        {/* Mobile Layout (Interactive Tabs) */}
        <div className="sm:hidden flex flex-col mb-2">
          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          <div className="flex overflow-x-auto gap-2.5 pb-4 mb-2 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full whitespace-nowrap text-[13px] font-semibold transition-all duration-300 border ${
                  activeTab === cat 
                    ? 'bg-[#0A84FF]/10 text-[#0A84FF] border-[#0A84FF]/50 shadow-[0_0_15px_rgba(10,132,255,0.2)]' 
                    : 'bg-[#161B22]/50 text-[#8B949E] border-[#30363D]/50 hover:text-white hover:bg-[#21262D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="w-full relative min-h-[300px]">
            <AnimatePresence mode="wait">
              {renderCategoryCard(activeTab, 0, true)}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Layout (Grid) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {categories.map(function(cat, ci) {
            return renderCategoryCard(cat, ci, false);
          })}
        </div>

      </div>
    </section>
  );
}
