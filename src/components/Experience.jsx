import { motion } from "framer-motion";
import { experience } from "../data/index";

export default function Experience() {
  return (
    <section id="experience" className="section relative z-10 overflow-hidden">
      {/* Blob */}
      <div className="absolute left-0 top-1/2 w-[300px] h-[300px] bg-[#0A84FF] rounded-full opacity-[0.03] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16 sm:mb-24"
        >
          <span className="text-[#0A84FF] font-mono text-xs tracking-[0.3em] uppercase mb-3">My journey</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white"><span className="gradient-text">Experience</span></h2>
          <div className="w-20 h-1 rounded-full mt-4" style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-12">
          {experience.map(function(item, i) {
            var startYear = item.period.match(/\d{4}/)?.[0] || "";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-row items-stretch gap-3 sm:gap-6 h-full"
              >
                {/* Left side: Faded year and date range */}
                <div className="w-[70px] sm:w-1/3 flex flex-col justify-center items-end text-right flex-shrink-0">
                  <div className="text-3xl sm:text-6xl lg:text-7xl font-black text-[#8B949E]/30 sm:text-[#8B949E]/20 leading-none tracking-tighter">
                    {startYear}
                  </div>
                  <div className="text-[#8B949E] text-[9px] sm:text-xs font-mono mt-1.5 sm:mt-3 font-semibold leading-tight">
                    {item.period}
                  </div>
                </div>

                {/* Right side: Dark glass card */}
                <div className="flex-1 glass grad-border rounded-xl p-4 sm:p-6 flex flex-col h-full relative z-10">
                  <h3 className="text-white font-bold text-[13px] sm:text-lg mb-1">{item.role}</h3>
                  <p className="font-semibold text-[11px] sm:text-sm mb-2 sm:mb-3 text-[#0A84FF]">{item.company}</p>
                  <p className="text-[#8B949E] text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
