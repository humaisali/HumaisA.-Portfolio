import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

var LINKS = [
  { label: "About",      href: "about" },
  { label: "Skills",     href: "skills" },
  { label: "Experience", href: "experience" },
  { label: "Projects",   href: "projects" },
  { label: "Contact",    href: "contact" },
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
    var observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.15, rootMargin: "-80px 0px -40% 0px" }
    );
    LINKS.forEach(function(l) {
      var el = document.getElementById(l.href);
      if (el) observer.observe(el);
    });
    return function() { observer.disconnect(); };
  }, []);

  // Smooth scroll handler — works reliably on mobile too
  function scrollTo(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: top, behavior: "smooth" });
    setOpen(false);
  }

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

        <motion.button
          onClick={function() { window.scrollTo({ top: 0, behavior: "smooth" }); }}
          whileHover={{ scale: 1.02 }}
          className="relative group flex-shrink-0 bg-transparent border-none cursor-pointer"
        >
          <span className="text-lg sm:text-2xl font-black tracking-tight text-white">
            Humais.Softneer<span className="text-[#0A84FF]">.</span>
          </span>
        </motion.button>

        {/* Desktop links */}
        <ul className="items-center hidden gap-8 xl:gap-10 md:flex">
          {LINKS.map(function(link, i) {
            var isActive = active === link.href;
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                <button
                  onClick={function() { scrollTo(link.href); }}
                  className={"relative text-sm font-medium transition-colors duration-200 hover-line bg-transparent border-none cursor-pointer " +
                    (isActive ? "text-[#0A84FF]" : "text-[#8B949E] hover:text-white")}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeLink"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[#0A84FF]"
                    />
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <motion.button
            onClick={function() { scrollTo("contact"); }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md bg-[#0A84FF] text-white text-sm font-semibold hover:bg-[#0066CC] transition-colors duration-200 border-none cursor-pointer"
          >
            Hire Me
          </motion.button>
          <button
            className="md:hidden text-[#8B949E] hover:text-white transition-colors p-1 bg-transparent border-none cursor-pointer"
            onClick={function() { setOpen(function(p) { return !p; }); }}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[#30363D]/50 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-5 gap-1">
              {LINKS.map(function(link) {
                var isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <button
                      onClick={function() { scrollTo(link.href); }}
                      className={"w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 bg-transparent border-none cursor-pointer " +
                        (isActive
                          ? "text-[#0A84FF] bg-[#0A84FF]/10"
                          : "text-[#8B949E] hover:text-white hover:bg-[#21262D]")}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
              <li className="pt-2 border-t border-[#30363D]/50 mt-2">
                <button
                  onClick={function() { scrollTo("contact"); }}
                  className="w-full px-5 py-2.5 bg-[#0A84FF] text-white rounded-md text-sm font-semibold hover:bg-[#0066CC] transition-colors border-none cursor-pointer"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
