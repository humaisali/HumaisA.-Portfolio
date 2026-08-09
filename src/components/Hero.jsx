import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiArrowDown } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { personalInfo } from "../data/index";
import VengeanceButton from "./VengeanceButton";
import SocialFlipButton from "./SocialFlipButton";
import MorphText from "./MorphText";
import FlipText from "./FlipText";

var roles = personalInfo.roles;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen pt-24 pb-16 overflow-hidden"
    >
      {/* Contained background blobs — pointer-events none, won't cause scroll */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0A84FF] rounded-full opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-[#00D4FF] rounded-full opacity-[0.03] blur-[100px]" />
      </div>

      {/* Grid lines — contained */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(10,132,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,132,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 w-full px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-12">

        {/* Name — staggered letters */}
        <div className="flex flex-wrap items-center justify-center mb-4" style={{ fontSize: "clamp(2.2rem, 8.5vw, 7rem)" }}>
          <FlipText className="font-black leading-none tracking-tighter text-white">
            HUMAIS ALI
          </FlipText>
        </div>

        {/* Morphing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-3 h-9 sm:h-10"
        >
          <MorphText 
            words={roles}
            textClassName="text-lg sm:text-2xl md:text-3xl font-mono text-[#00D4FF]"
            fontFamily="inherit"
          />
        </motion.div>

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md glass border border-[#0A84FF]/20">
            <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-[#8B949E] font-mono">Available for opportunities</span>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-[#8B949E] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col flex-wrap items-center justify-center gap-3 mb-10 sm:flex-row"
        >
          <VengeanceButton
            href="#projects"
            variant="primary"
            fullWidth
          >
            View Projects
          </VengeanceButton>
          <VengeanceButton
            href="/Humais-Resume.pdf"
            download
            variant="outline"
            fullWidth
          >
            Download CV
          </VengeanceButton>
        </motion.div>

        {/* Social Links Mega Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-center"
        >
          <SocialFlipButton />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute z-10 flex flex-col items-center gap-2 -translate-x-1/2 bottom-6 left-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <FiArrowDown className="text-[#8B949E]" size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
