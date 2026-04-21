import { motion } from "framer-motion";
import { FiCode, FiCpu, FiMapPin, FiBookOpen, FiZap } from "react-icons/fi";
import { personalInfo } from "../data/index";

export default function About() {
  return (
    <section id="about" className="section relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-14 sm:mb-20"
        >
          <span className="text-[#0A84FF] font-mono text-xs tracking-[0.3em] uppercase mb-3">Who I am</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">About <span className="gradient-text">Me</span></h2>
          <div className="w-20 h-1 rounded-full mt-4" style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Watermark — clipped so it never bleeds outside the container */}
            <div className="relative overflow-hidden">
              <div className="absolute -top-6 -left-2 text-[clamp(60px,15vw,120px)] font-black text-[#0A84FF]/5 select-none leading-none pointer-events-none">
                DEV
              </div>
              <h3 className="relative text-2xl sm:text-3xl font-bold text-white mb-5 leading-tight">
                Building the future with<br />
                <span className="gradient-text">AI + Web Technology</span>
              </h3>
              <p className="text-[#8B949E] leading-relaxed mb-4 text-sm sm:text-base">
                I'm a {personalInfo.semester} Software Engineering student at {personalInfo.university},
                working at the intersection of artificial intelligence and modern web development.
              </p>
              <p className="text-[#8B949E] leading-relaxed mb-4 text-sm sm:text-base">
                At SkyTech Developers, I've built and shipped multiple AI-powered full-stack applications —
                from code explainers to career coaching tools — all using React, Node.js, and Google's Gemini API.
              </p>
              <p className="text-[#8B949E] leading-relaxed mb-8 text-sm sm:text-base">
                When I'm not building, I'm grinding DSA on LeetCode, exploring ML research, or
                helping clients bring their digital ideas to life.
              </p>

              <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-3 rounded-md glass border border-[#0A84FF]/20">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <span className="text-white text-xs sm:text-sm font-medium">Open to internships & freelance work</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3 sm:gap-4"
          >
            {[
              { icon: FiMapPin,    label: "Location",   value: personalInfo.location },
              { icon: FiBookOpen,  label: "University", value: personalInfo.university + " · " + personalInfo.degree },
              { icon: FiCode,      label: "Company",    value: personalInfo.company },
              { icon: FiCpu,       label: "Focus",      value: "AI-Powered Full Stack Applications" },
              { icon: FiZap,       label: "Stack",      value: "MERN · Next.js · Python · Gemini AI" },
            ].map(function(item, i) {
              var Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg glass border border-[#30363D]/50 hover:border-[#0A84FF]/30 transition-all duration-300"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#0A84FF]/10 border border-[#0A84FF]/20">
                    <Icon size={16} className="text-[#0A84FF]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#8B949E] text-xs font-mono uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-medium text-xs sm:text-sm truncate">{item.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
