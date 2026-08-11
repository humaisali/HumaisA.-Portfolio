import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiArrowDown } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import { personalInfo } from "../data/index";
import VengeanceButton from "./VengeanceButton";
import SocialFlipButton from "./SocialFlipButton";
import MorphText from "./MorphText";
import StaggerText from "./StaggerText";
import CursorCard from "./CursorCard";

var roles = personalInfo.roles;

export default function Hero() {
  var letters = "HUMAIS ALI".split("");

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

      {/* ======================= */}
      {/* DESKTOP LAYOUT (lg:+) */}
      {/* ======================= */}
      <div className="hidden lg:block relative w-full px-4 lg:px-8 mx-auto lg:min-h-[780px] xl:min-h-[860px] z-10">
        {/* 1. Giant name — spans full width behind photo */}
        <div className="absolute inset-x-0 top-[5%] z-10 flex justify-center whitespace-nowrap" style={{ gap: "2px" }}>
          {letters.map(function (letter, i) {
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="leading-none text-white"
                style={{
                  display: "inline-block",
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(8rem, 16vw, 18rem)",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            );
          })}
        </div>

        {/* 2. Photo — bottom aligned, centered (slightly left of center) */}
        <motion.img
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          src="/Humais Ali.png"
          alt="Humais Ali"
          className="absolute z-20 bottom-0 h-[88%] w-auto object-contain pointer-events-none select-none"
          style={{ left: "38.5%", transform: "translateX(-50%)" }}
        />

        {/* 3. Role text — right of center, vertically higher */}
        <div className="absolute z-30 right-[20%] top-[38%] xl:top-[36%]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <MorphText
              words={roles}
              textClassName="text-2xl xl:text-3xl font-bold text-[#0A84FF] text-right"
              fontFamily="inherit"
            />
          </motion.div>
        </div>

        {/* 4. Bottom-left column: bio + CTA buttons */}
        <div className="absolute z-30 left-[5%] bottom-[20%] xl:bottom-[22%] w-[33%] xl:w-[35%] text-left">
          <div className="text-[#8B949E] text-base lg:text-xl xl:text-2xl mb-8 leading-relaxed font-light">
            <StaggerText delay={1.0} divideBy="word">
              <CursorCard
                image="/UET_Mardan.jpg"
                description="University of Engineering and Technology, Mardan"
                href="https://www.uetmardan.edu.pk/uetm/Department/softwaredept"
              >
                Software Engineering student at UET Mardan
              </CursorCard>
              <br />
              with a passion for merging AI with modern web
              <br />
              applications. I build fast, intelligent, and
              <br />
              beautiful digital products at <br />
              <CursorCard
                image="/skytech.png"
                description="SkyTech Developers"
                href="https://skytech-developers.vercel.app/"
              >
                SkyTech Developers
              </CursorCard>
            </StaggerText>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-row justify-start gap-3"
          >
            <VengeanceButton
              href="#projects"
              variant="primary"
            >
              View Projects
            </VengeanceButton>
            <VengeanceButton
              href="/Humais-Resume.pdf"
              download
              variant="outline"
            >
              Download CV
            </VengeanceButton>
          </motion.div>
        </div>

        {/* 5. Bottom-right column: availability badge + CONTACT tiles */}
        <div className="absolute z-30 right-[5%] bottom-[18%] xl:bottom-[20%] flex flex-col items-end gap-6">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="group flex items-start gap-3 cursor-pointer no-underline"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("contact");
              if (el) {
                const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
          >
            <div className="text-right">
              <div className="text-xs uppercase tracking-[0.25em] text-[#8B949E] mb-1">
                Available for
              </div>
              <div className="text-3xl xl:text-4xl font-black uppercase tracking-wider text-[#8B949E] group-hover:text-white transition-colors leading-tight">
                Freelance
              </div>
              <div className="flex items-center justify-end gap-2 text-[#8B949E] group-hover:text-white transition-colors mt-0.5">
                <span className="text-sm uppercase tracking-[0.25em]">Projects</span>
                <ArrowUpRight className="w-4 h-4 text-[#8B949E] group-hover:text-[#0A84FF] transition-colors" />
              </div>
            </div>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <SocialFlipButton className="!p-0 !gap-2 justify-end" />
          </motion.div>
        </div>
      </div>

      {/* ======================= */}
      {/* MOBILE LAYOUT (<lg)       */}
      {/* ======================= */}
      <div className="lg:hidden relative z-10 w-full px-2 mx-auto text-center max-w-7xl">

        {/* Name — staggered letters */}
        <div className="flex flex-wrap items-center justify-center mb-4" style={{ gap: "2px" }}>
          {letters.map(function (letter, i) {
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="leading-none text-white"
                style={{
                  display: "inline-block",
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(2.2rem, 8.5vw, 7rem)",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            );
          })}
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
            textClassName="text-lg sm:text-2xl md:text-3xl font-mono text-[#0A84FF]"
            fontFamily="inherit"
          />
        </motion.div>

        {/* Bio */}
        <div className="text-[#8B949E] text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light">
          <StaggerText delay={1.0} divideBy="word">
            <CursorCard
              image="/UET_Mardan.jpg"
              description="University of Engineering and Technology, Mardan"
              href="https://www.uetmardan.edu.pk/uetm/Department/softwaredept"
            >
              Software Engineering student at UET Mardan
            </CursorCard>
            <br />
            with a passion for merging AI with modern web
            <br />
            applications. I build fast, intelligent, and
            <br />
            beautiful digital products at <br />
            <CursorCard
              image="/skytech.png"
              description="SkyTech Developers"
              href="https://skytech-developers.vercel.app/"
            >
              SkyTech Developers.
            </CursorCard>
          </StaggerText>
        </div>

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

    </section>
  );
}
