import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function CursorCard({ children, image, description, href = "#", className }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    x.set(e.clientX - 120); // Center horizontally (width 240 / 2)
    y.set(e.clientY + 20);  // Offset vertically slightly below cursor
  };

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative inline-block font-bold text-white transition-colors",
          "hover:text-[#0A84FF] rounded px-1 -mx-1",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </a>

      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                x: springX,
                y: springY,
              }}
              className={cn(
                "fixed top-0 left-0 pointer-events-none z-[9999] w-[240px]",
                "bg-[#050505] p-3 shadow-2xl rounded-xl border border-[#30363D]"
              )}
            >
              <img src={image} alt="hover preview" className="w-full h-auto rounded-md mb-3 object-cover aspect-video" />
              <p className="text-sm text-[#8B949E] m-0 leading-relaxed text-center font-medium">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default CursorCard;
