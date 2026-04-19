import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { personalInfo } from "../data/index";

var links = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

var socials = [
  { icon: FiGithub,   href: personalInfo.github,   label: "GitHub" },
  { icon: FiLinkedin, href: personalInfo.linkedin,  label: "LinkedIn" },
  { icon: SiLeetcode, href: personalInfo.leetcode,  label: "LeetCode" },
  { icon: FiMail,     href: "mailto:" + personalInfo.email, label: "Email" },
];

export default function Footer() {
  var year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-[#30363D]/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <a href="#" className="text-3xl font-black text-white">HA<span className="text-[#0A84FF]">.</span></a>
            <p className="text-[#8B949E] text-sm mt-3 leading-relaxed max-w-xs">
              Full Stack Developer & AI Engineer based in Mardan, Pakistan.
            </p>
            <div className="flex gap-4 mt-5">
              {socials.map(function(s) {
                var Icon = s.icon;
                return (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-[#8B949E] hover:text-[#0A84FF] transition-colors duration-200">
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest font-mono mb-4">Navigation</p>
            <ul className="flex flex-col gap-3">
              {links.map(function(link) {
                return (
                  <li key={link.href}>
                    <a href={link.href} className="text-[#8B949E] hover:text-[#0A84FF] text-sm transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest font-mono mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <a href={"mailto:" + personalInfo.email} className="text-[#8B949E] hover:text-[#0A84FF] text-sm transition-colors duration-200 font-mono">
                {personalInfo.email}
              </a>
              <p className="text-[#8B949E] text-sm">{personalInfo.location}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-mono">Available for work</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#30363D]/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8B949E] text-sm font-mono">
            © {year} <span className="text-[#0A84FF]">Humais Ali</span>. All rights reserved.
          </p>
          <p className="text-[#8B949E] text-sm flex items-center gap-1.5">
            Built with <FiHeart size={13} className="text-red-400" /> using React + Vite + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
