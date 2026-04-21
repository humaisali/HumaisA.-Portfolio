import { motion } from "framer-motion";
import { experience } from "../data/index";

export default function Experience() {
  return (
    <section id="experience" className="section relative z-10">
      <div className="absolute left-0 top-1/2 w-[300px] h-[300px] bg-[#0A84FF] rounded-full opacity-[0.03] blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-14 sm:mb-20"
        >
          <span className="text-[#0A84FF] font-mono text-xs tracking-[0.3em] uppercase mb-3">My journey</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white"><span className="gradient-text">Experience</span></h2>
          <div className="w-20 h-1 rounded-full mt-4" style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }} />
        </motion.div>

        <div className="max-w-4xl mx-auto relative">

          {/* ── DESKTOP timeline (md and above) ── */}
          <div className="hidden md:block">
            {/* Center vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#0A84FF] via-[#30363D] to-transparent" />

            <div className="flex flex-col gap-12">
              {experience.map(function(item, i) {
                var isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className={"relative flex items-center " + (isLeft ? "flex-row" : "flex-row-reverse")}
                  >
                    {/* Card side */}
                    <div className={"w-[calc(50%-2rem)] " + (isLeft ? "pr-8 text-right" : "pl-8 text-left")}>
                      <div className="glass grad-border rounded-xl p-6 glass-hover">
                        <div className={"flex items-start gap-3 mb-3 " + (isLeft ? "flex-row-reverse" : "flex-row")}>
                          <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded border text-[#0A84FF] border-[#0A84FF]/20 bg-[#0A84FF]/05 whitespace-nowrap">
                            {item.type}
                          </span>
                          <span className="text-[#8B949E] text-xs font-mono">{item.period}</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">{item.role}</h3>
                        <p className="font-semibold text-sm mb-3 text-[#0A84FF]">{item.company}</p>
                        <p className="text-[#8B949E] text-sm leading-relaxed mb-4">{item.description}</p>
                        <div className={"flex flex-wrap gap-2 " + (isLeft ? "justify-end" : "justify-start")}>
                          {item.techs.map(function(tech) {
                            return (
                              <span key={tech} className="text-xs px-2 py-1 rounded font-mono bg-[#0D1117] border border-[#30363D] text-[#8B949E]">
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                      <div
                        className="w-4 h-4 rounded-full bg-[#0A84FF] border-2 border-[#050709]"
                        style={{ boxShadow: "0 0 16px rgba(10,132,255,0.6)" }}
                      />
                    </div>

                    {/* Empty opposite side */}
                    <div className="w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── MOBILE timeline (below md) — left-aligned single column ── */}
          <div className="md:hidden relative pl-8">
            {/* Left vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-[#0A84FF] via-[#30363D] to-transparent" />

            <div className="flex flex-col gap-8">
              {experience.map(function(item, i) {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Left dot */}
                    <div className="absolute -left-[1.35rem] top-6 z-10">
                      <div
                        className="w-3.5 h-3.5 rounded-full bg-[#0A84FF] border-2 border-[#050709]"
                        style={{ boxShadow: "0 0 12px rgba(10,132,255,0.6)" }}
                      />
                    </div>

                    <div className="glass grad-border rounded-xl p-4 sm:p-5">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded border text-[#0A84FF] border-[#0A84FF]/20 bg-[#0A84FF]/05">
                          {item.type}
                        </span>
                        <span className="text-[#8B949E] text-xs font-mono">{item.period}</span>
                      </div>
                      <h3 className="text-white font-bold text-base mb-1">{item.role}</h3>
                      <p className="font-semibold text-sm mb-3 text-[#0A84FF]">{item.company}</p>
                      <p className="text-[#8B949E] text-sm leading-relaxed mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.techs.map(function(tech) {
                          return (
                            <span key={tech} className="text-xs px-2 py-1 rounded font-mono bg-[#0D1117] border border-[#30363D] text-[#8B949E]">
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
