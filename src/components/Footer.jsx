import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp, FiClock, FiFileText } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { personalInfo } from "../data/index";

const socials = [
  { icon: FiGithub,   href: personalInfo.github,   label: "GitHub" },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: SiLeetcode, href: personalInfo.leetcode, label: "LeetCode" },
  { icon: FaWhatsapp, href: personalInfo.whatsapp, label: "WhatsApp" },
];

const quickLinks = [
  { label: "Home",       href: "#home" },
  { label: "About Me",   href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
];

const resources = [
  { label: "Resume",       href: personalInfo.resume || "#", icon: FiFileText },
  { label: "Source Code",  href: personalInfo.github, icon: FiGithub },
  { label: "LeetCode",     href: personalInfo.leetcode, icon: SiLeetcode },
];

export default function Footer() {
  const year = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 pt-16 sm:pt-24 pb-8 overflow-hidden bg-[#050709]">
      {/* Top Fading Gradient Border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 md:w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#0A84FF]/40 to-transparent" />
      
      {/* Ambient Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-[#0A84FF] blur-[120px] sm:blur-[150px] opacity-10 pointer-events-none rounded-full translate-y-1/2" />

      {/* Massive Watermark Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none flex justify-center translate-y-1/3 opacity-40">
        <h1 className="text-[22vw] font-black text-white/[0.03] leading-none whitespace-nowrap">
          HUMAIS
        </h1>
      </div>

      <div className="px-4 sm:px-6 mx-auto max-w-7xl lg:px-12 relative z-10">
        
        {/* 4-Column Professional Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 mb-16 sm:mb-20">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-1">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Engineer.Humais<span className="text-[#0A84FF]">.</span>
            </span>
            <p className="text-[#8B949E] text-sm mt-4 leading-relaxed">
              Full Stack Developer & AI Engineer dedicated to building intelligent, high-performance web experiences.
            </p>
            
            {/* macOS Style Social Dock */}
            <div className="flex gap-2 mt-8 p-2 rounded-2xl glass w-max shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-[#30363D]/60">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group p-3 rounded-xl hover:bg-white/10 transition-colors text-[#8B949E] hover:text-[#0A84FF]"
                  >
                    <Icon size={18} />
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-3 py-1.5 bg-[#161b22] border border-[#30363D] rounded-lg text-xs font-mono text-white pointer-events-none shadow-xl whitespace-nowrap">
                      {s.label}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <p className="mb-6 font-mono text-xs font-semibold tracking-widest text-[#0A84FF] uppercase">Quick Links</p>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative group inline-block text-[#8B949E] hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#0A84FF] to-[#00D4FF] group-hover:w-full transition-all duration-300 ease-out" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <p className="mb-6 font-mono text-xs font-semibold tracking-widest text-[#0A84FF] uppercase">Resources</p>
            <ul className="flex flex-col gap-4">
              {resources.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href !== "#" ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="flex items-center gap-2 group text-[#8B949E] hover:text-white transition-colors duration-300 text-sm w-max"
                    >
                      <Icon size={14} className="group-hover:text-[#0A84FF] transition-colors" />
                      <span className="relative inline-block">
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#0A84FF] to-[#00D4FF] group-hover:w-full transition-all duration-300 ease-out" />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Contact & Availability */}
          <div>
            <p className="mb-6 font-mono text-xs font-semibold tracking-widest text-[#0A84FF] uppercase">Contact</p>
            <div className="flex flex-col gap-4 items-start">
              {/* Email Link */}
              <a
                href={"mailto:" + personalInfo.email}
                className="flex items-center gap-2 group text-[#8B949E] hover:text-white transition-colors duration-300 text-sm w-max"
              >
                <FiMail size={14} className="group-hover:text-[#0A84FF] transition-colors" />
                <span className="relative inline-block font-mono break-all">
                  {personalInfo.email}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#0A84FF] to-[#00D4FF] group-hover:w-full transition-all duration-300 ease-out" />
                </span>
              </a>

              {/* Timezone Indicator */}
              <div className="flex items-center gap-2 text-[#8B949E] text-sm font-mono mt-1">
                <FiClock size={14} className="text-[#0A84FF]" />
                <span>Mardan, Pakistan (UTC+5)</span>
              </div>
              
              {/* Premium Available Badge */}
              <div className="inline-flex items-center gap-2.5 mt-3 px-4 py-2 rounded-xl sm:rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-green-400 font-semibold leading-relaxed">
                  Available for Remote Roles
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#30363D]/40 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <p className="text-[#8B949E] text-xs font-mono text-center md:text-left order-2 md:order-1">
            © {year} <span className="text-white font-semibold">Humais Ali</span>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 order-1 md:order-2">
            <p className="text-[#8B949E] text-xs flex items-center gap-1.5 font-mono">
              Crafted with <FiHeart size={12} className="text-red-500 animate-pulse" /> using React + Tailwind
            </p>
            
            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#8B949E] hover:text-[#0A84FF] hover:border-[#0A84FF]/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              aria-label="Back to top"
            >
              <FiArrowUp size={18} />
            </motion.button>
          </div>

        </div>

      </div>
    </footer>
  );
}
