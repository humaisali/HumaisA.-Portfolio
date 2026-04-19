import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiArrowDown } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { personalInfo } from "../data/index";

var roles = personalInfo.roles;

export default function Hero() {
  var [roleIdx, setRoleIdx] = useState(0);
  var [text, setText] = useState("");
  var [typing, setTyping] = useState(true);

  useEffect(function() {
    var role = roles[roleIdx];
    var i = 0;
    var timer;

    if (typing) {
      timer = setInterval(function() {
        setText(role.slice(0, i + 1));
        i++;
        if (i === role.length) {
          clearInterval(timer);
          setTimeout(function() { setTyping(false); }, 2000);
        }
      }, 70);
    } else {
      timer = setInterval(function() {
        setText(function(prev) {
          if (prev.length <= 1) {
            clearInterval(timer);
            setRoleIdx(function(idx) { return (idx + 1) % roles.length; });
            setTyping(true);
            return "";
          }
          return prev.slice(0, prev.length - 1);
        });
      }, 35);
    }
    return function() { clearInterval(timer); };
  }, [roleIdx, typing]);

  var letters = "HUMAIS ALI".split("");

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Mesh gradient bg */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0A84FF] rounded-full opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00D4FF] rounded-full opacity-[0.03] blur-[100px]" />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(10,132,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,132,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center w-full">

        {/* Name — staggered letters */}
        <div className="flex items-center justify-center flex-wrap gap-0 mb-4 overflow-hidden">
          {letters.map(function(letter, i) {
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,10vw,7rem)] font-black leading-none tracking-tighter text-white"
                style={{ display: "inline-block" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            );
          })}
        </div>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-2xl md:text-3xl font-light text-[#8B949E] mb-3 h-10"
        >
          <span className="text-[#00D4FF] font-mono font-medium">{text}</span>
          <span className="blink text-[#0A84FF] ml-0.5">|</span>
        </motion.div>

        {/* Available badge — sits naturally below role */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md glass border border-[#0A84FF]/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-[#8B949E] font-mono">Available for opportunities</span>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-[#8B949E] text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-3.5 rounded-md text-white font-semibold bg-[#0A84FF] hover:bg-[#0066CC] transition-colors duration-200"
          >
            View Projects
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-3.5 rounded-md font-semibold text-white glass border border-[#30363D] hover:border-[#0A84FF]/50 transition-all duration-200"
          >
            Let's Talk
          </motion.a>

          <motion.a
            href="/cv.pdf"
            download
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-3.5 rounded-md font-semibold text-[#0A84FF] border border-[#0A84FF]/40 hover:bg-[#0A84FF]/5 transition-all duration-200"
          >
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: FiGithub,   href: personalInfo.github,   label: "GitHub" },
            { icon: FiLinkedin, href: personalInfo.linkedin,  label: "LinkedIn" },
            { icon: SiLeetcode, href: personalInfo.leetcode,  label: "LeetCode" },
          ].map(function(s) {
            var Icon = s.icon;
            return (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-[#8B949E] hover:text-[#0A84FF] transition-all duration-200"
                aria-label={s.label}
              >
                <Icon size={22} />
              </motion.a>
            );
          })}
          <div className="w-px h-6 bg-[#30363D]" />
          <span className="text-[#8B949E] text-sm font-mono">{personalInfo.location}</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiArrowDown className="text-[#8B949E]" size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
