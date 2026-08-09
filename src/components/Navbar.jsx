import { useState, useEffect } from "react";
import { User, Zap, Briefcase, Layout, Mail, Menu, X, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VengeanceButton from "./VengeanceButton";

const NavLink = ({ href, icon: Icon, label, isActive, onClick }) => (
  <a 
    href={`#${href}`} 
    onClick={(e) => {
        e.preventDefault();
        onClick();
    }}
    className={`group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap ${isActive ? "text-[#0A84FF]" : "text-[#8B949E] hover:text-white"}`}
  >
    <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
    <span>{label}</span>
  </a>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  const items = [
    { label: "Home", href: "hero", icon: Home },
    { label: "About", href: "about", icon: User },
    { label: "Skills", href: "skills", icon: Zap },
    { label: "Experience", href: "experience", icon: Briefcase },
    { label: "Projects", href: "projects", icon: Layout },
    { label: "Contact", href: "contact", icon: Mail }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.15, rootMargin: "-80px 0px -40% 0px" }
    );
    items.forEach((l) => {
      const el = document.getElementById(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollToSection(id) {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }, 150);
  }

  return (
    <>
      <header 
        className="fixed top-0 inset-x-0 z-[100] h-16 flex px-0"
        style={{ filter: "drop-shadow(0px 4px 15px rgba(10, 132, 255, 0.4))" }}
      >
        
        {/* Left Side Bar - Flexible width */}
        <div className="flex-1 h-10 bg-[#050505] z-20 relative min-w-0">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} className="text-[#0A84FF]" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} className="text-[#0A84FF]" />
          </svg>
        </div>

        {/* Responsive Notch Container - 3 Slices */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px">
          
          {/* Left Slice (Corner) */}
          <div className="w-[50px] h-full relative shrink-0">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[#050505]" style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }} />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} className="text-[#0A84FF]" />
              <path d="M0 36.5 C25 36.5 25 60.5 50 60.5" fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} className="text-[#0A84FF]" />
            </svg>
          </div>

          {/* Center Slice (Flexible Content Area) */}
          <div className="flex-1 h-full relative min-w-0 -ml-px">
             {/* Background & Lines Layer */}
             <div className="absolute inset-0 bg-[#050505]">
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                   <line x1="0" y1="63.5" x2="100%" y2="63.5" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} className="text-[#0A84FF]" />
                   <line x1="0" y1="60.5" x2="100%" y2="60.5" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} className="text-[#0A84FF]" />
                 </svg>
             </div>

             {/* Content Layer */}
             <div className="relative w-full h-full flex items-end justify-between gap-4 lg:gap-12 pb-2 px-4 md:px-8">
               
               {/* Logo (Left) */}
              <div className="flex justify-start shrink-0 mb-1">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="bg-transparent border-none cursor-pointer flex-shrink-0 relative group"
                >
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-white group-hover:opacity-80 transition-opacity">
                    Humais.Softneer<span className="text-[#0A84FF]">.</span>
                  </span>
                </button>
              </div>

               {/* Desktop Center Nav Links */}
               <nav className="hidden md:flex gap-4 lg:gap-8 items-center justify-center shrink-0 mb-1">
                {items.map(item => (
                  <NavLink key={item.label} {...item} isActive={active === item.href || (active === "" && item.href === "hero")} onClick={() => scrollToSection(item.href)} />
                ))}
              </nav>

              {/* Desktop Right Actions & Mobile Menu */}
              <div className="flex items-center gap-4 shrink-0 mb-1">
                <div className="hidden md:block">
                  <VengeanceButton onClick={() => scrollToSection("contact")} size="sm">
                    Hire Me
                  </VengeanceButton>
                </div>
                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden p-1 text-[#8B949E] hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

             </div>
          </div>

          {/* Right Slice (Corner) */}
          <div className="w-[50px] h-full relative shrink-0 -ml-px">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[#050505]" style={{ clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')" }} />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} className="text-[#0A84FF]" />
              <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} className="text-[#0A84FF]" />
            </svg>
          </div>

        </div>

        {/* Right Side Bar - Flexible width */}
        <div className="flex-1 h-10 bg-[#050505] z-20 relative min-w-0 -ml-px">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} className="text-[#0A84FF]" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} className="text-[#0A84FF]" />
          </svg>
        </div>

      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-[90] bg-[#050505] border-b border-[#30363D] p-4 md:hidden shadow-2xl"
          >
             <nav className="flex flex-col gap-2">
               {/* Combine all items */}
               {items.map(item => {
                 const isActive = active === item.href || (active === "" && item.href === "hero");
                 return (
                 <a 
                   key={item.label} 
                   href={`#${item.href}`}
                   className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? "bg-[#0A84FF]/10 text-[#0A84FF]" : "text-[#8B949E] hover:text-white hover:bg-[#21262D]"}`}
                   onClick={(e) => {
                       e.preventDefault();
                       scrollToSection(item.href);
                   }}
                 >
                   <item.icon className="w-5 h-5 opacity-70" />
                   <span className="font-medium">{item.label}</span>
                 </a>
                 );
               })}
               <div className="h-px bg-[#30363D] my-2" />
               <div className="flex flex-col gap-2 mt-2">
                 <VengeanceButton onClick={() => scrollToSection("contact")} fullWidth>
                    Hire Me
                 </VengeanceButton>
               </div>
             </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
