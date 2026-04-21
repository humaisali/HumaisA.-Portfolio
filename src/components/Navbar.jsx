import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

var LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  var [scrolled, setScrolled] = useState(false);
  var [open, setOpen] = useState(false);
  var [active, setActive] = useState("");

  useEffect(function() {
    function onScroll() { setScrolled(window.scrollY > 60); }
    window.addEventListener("scroll", onScroll);
    return function() { window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(function() {
    // Use a lower threshold + rootMargin so projects section
    // gets detected even though it's a tall grid section
    var observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "-80px 0px -40% 0px",
      }
    );

    LINKS.forEach(function(l) {
      var el = document.getElementById(l.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return function() { observer.disconnect(); };
  }, []);

  var navBg = scrolled
    ? "glass border-b border-[#30363D]/50"
    : "bg-transparent border-b border-transparent";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={"fixed top-0 left-0 right-0 z-[100] transition-all duration-500 " + navBg}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 mx-auto max-w-7xl lg:px-12">

        <motion.a href="#" whileHover={{ scale: 1.02 }} className="relative group flex-shrink-0">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Humais.Softneer<span className="text-[#0A84FF]">.</span>
          </span>
        </motion.a>

        <ul className="items-center hidden gap-8 xl:gap-10 md:flex">
          {LINKS.map(function(link, i) {
            var isActive = active === link.href.replace("#", "");
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                <a
                  href={link.href}
                  className={"relative text-sm font-medium transition-colors duration-200 hover-line " +
                    (isActive ? "text-[#0A84FF]" : "text-[#8B949E] hover:text-white")}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeLink"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[#0A84FF]"
                    />
                  )}
                </a>
              </motion.li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md bg-[#0A84FF] text-white text-sm font-semibold hover:bg-[#0066CC] transition-colors duration-200"
          >
            Hire Me
          </motion.a>
          <button
            className="md:hidden text-[#8B949E] hover:text-white transition-colors p-1"
            onClick={function() { setOpen(function(p) { return !p; }); }}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[#30363D]/50 px-6 py-5 overflow-hidden"
          >
            <ul className="flex flex-col gap-4">
              {LINKS.map(function(link) {
                var isActive = active === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={function() { setOpen(false); }}
                      className={"text-base font-medium transition-colors " +
                        (isActive ? "text-[#0A84FF]" : "text-[#8B949E] hover:text-white")}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li className="pt-1">
                <a
                  href="#contact"
                  onClick={function() { setOpen(false); }}
                  className="inline-block px-5 py-2.5 bg-[#0A84FF] text-white rounded-md text-sm font-semibold hover:bg-[#0066CC] transition-colors"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
