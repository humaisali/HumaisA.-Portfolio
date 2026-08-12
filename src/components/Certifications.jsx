import { useState } from "react";
import { motion } from "framer-motion";
import { certifications } from "../data/index";
import ExpandableBentoGrid from "./ExpandableBentoGrid";
import { FiAward } from "react-icons/fi";

const LogoImage = ({ src, alt }) => {
  const [error, setError] = useState(false);
  if (error || !src) return <FiAward size={24} />;
  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-contain bg-white p-2 rounded-xl" 
      onError={() => setError(true)} 
    />
  );
};

export default function Certifications() {
  const items = certifications.map((cert) => ({
    ...cert,
    icon: <LogoImage src={cert.logoUrl} alt={cert.subtitle} />,
  }));

  return (
    <section id="certifications" className="section relative z-10 overflow-hidden">
      <div className="absolute right-0 top-1/2 w-[300px] h-[300px] bg-[#0A84FF] rounded-full opacity-[0.03] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12 sm:mb-20"
        >
          <span className="text-[#0A84FF] font-mono text-xs tracking-[0.3em] uppercase mb-3">My achievements</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white"><span className="gradient-text">Certifications</span></h2>
          <div className="w-20 h-1 rounded-full mt-4" style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }} />
        </motion.div>

        <ExpandableBentoGrid items={items} />
      </div>
    </section>
  );
}
