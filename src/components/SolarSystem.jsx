import React, { useState } from "react";
import { Orbit as OrbitIcon, Bot } from "lucide-react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiJavascript, 
  SiNodedotjs, 
  SiExpress, 
  SiPython, 
  SiMongodb, 
  SiMysql, 
  SiGit 
} from "react-icons/si";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DEFAULT_ORBITS = [
  {
    id: "inner",
    name: "Frontend Ring",
    radiusClass: "var(--radius-inner)",
    radiusPx: 175,
    speed: 20,
    items: [
      { id: "react", label: "React", color: "#61DAFB", svg: <SiReact className="w-5 h-5" /> },
      { id: "javascript", label: "JavaScript", color: "#F7DF1E", svg: <SiJavascript className="w-5 h-5" /> },
      { id: "nextjs", label: "Next.js", color: "#ffffff", svg: <SiNextdotjs className="w-5 h-5" /> },
      { id: "tailwind", label: "Tailwind CSS", color: "#06B6D4", svg: <SiTailwindcss className="w-5 h-5" /> },
    ],
  },
  {
    id: "mid",
    name: "Backend Ring",
    radiusClass: "var(--radius-mid)",
    radiusPx: 285,
    speed: 32,
    items: [
      { id: "nodejs", label: "Node.js", color: "#339933", svg: <SiNodedotjs className="w-5 h-5" /> },
      { id: "express", label: "Express", color: "#ffffff", svg: <SiExpress className="w-5 h-5" /> },
      { id: "mongodb", label: "MongoDB", color: "#47A248", svg: <SiMongodb className="w-5 h-5" /> },
      { id: "mysql", label: "MySQL", color: "#4479A1", svg: <SiMysql className="w-5 h-5" /> },
    ],
  },
  {
    id: "outer",
    name: "AI & Tools Ring",
    radiusClass: "var(--radius-outer)",
    radiusPx: 395,
    speed: 48,
    items: [
      { id: "git", label: "Git", color: "#F05032", svg: <SiGit className="w-5 h-5" /> },
      { id: "python", label: "Python", color: "#3776AB", svg: <SiPython className="w-5 h-5" /> },
      { id: "gemini", label: "Gemini AI", color: "#0A84FF", svg: <Bot className="w-5 h-5" /> },
    ],
  },
];

export const SolarSystem = React.forwardRef(
  (
    {
      centerLogo,
      centerLogoAlt = "Core Engine",
      orbits = DEFAULT_ORBITS,
      isPaused = false,
      speedMultiplier = 1,
      className,
      ...props
    },
    ref
  ) => {
    const [hoveredId, setHoveredId] = useState(null);

    const dustItems = [
      { delay: "-4s", radius: "165px", color: "#00f5d4" },
      { delay: "-11s", radius: "260px", color: "#0A84FF" },
      { delay: "-19s", radius: "340px", color: "#3b82f6" },
      { delay: "-28s", radius: "395px", color: "#00f5d4" },
      { delay: "-7s", radius: "200px", color: "#ec4899" },
      { delay: "-15s", radius: "365px", color: "#eab308" },
      { delay: "-23s", radius: "430px", color: "#0A84FF" },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center w-full max-w-[940px] h-[250px] md:h-[350px] lg:h-[400px] perspective-[1200px] select-none overflow-visible",
          className
        )}
        {...props}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --radius-inner: 175px;
            --radius-mid: 285px;
            --radius-outer: 395px;
          }
          @media (max-width: 1024px) {
            :root {
              --radius-inner: 130px;
              --radius-mid: 210px;
              --radius-outer: 290px;
            }
          }
          @media (max-width: 768px) {
            :root {
              --radius-inner: 100px;
              --radius-mid: 165px;
              --radius-outer: 230px;
            }
          }
          @media (max-width: 480px) {
            :root {
              --radius-inner: 70px;
              --radius-mid: 115px;
              --radius-outer: 160px;
            }
          }
          @keyframes custom-orbitMove {
            0% { transform: translate(-50%, -50%) rotateZ(0deg) translateX(var(--orbit-radius)); }
            100% { transform: translate(-50%, -50%) rotateZ(-360deg) translateX(var(--orbit-radius)); }
          }
          @keyframes custom-billboardCancel {
            0% { transform: translate(-50%, -50%) rotateZ(0deg) rotateY(10deg) rotateX(-65deg); }
            100% { transform: translate(-50%, -50%) rotateZ(360deg) rotateY(10deg) rotateX(-65deg); }
          }
          @keyframes custom-sun-pulse {
            0% { transform: scale(0.9); opacity: 0.7; }
            100% { transform: scale(1.1); opacity: 1; }
          }
          @keyframes custom-spin-clockwise {
            0% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(0deg); }
            100% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(360deg); }
          }
          @keyframes custom-spin-counter {
            0% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(0deg); }
            100% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(-360deg); }
          }
          .animate-custom-orbit {
            animation: custom-orbitMove var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .animate-custom-billboard {
            animation: custom-billboardCancel var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .animate-custom-sun-pulse {
            animation: custom-sun-pulse 4s ease-in-out infinite alternate;
          }
          .animate-custom-spin-cw {
            animation: custom-spin-clockwise 20s linear infinite;
          }
          .animate-custom-spin-ccw {
            animation: custom-spin-counter 30s linear infinite;
          }
          .orbit-logo-card {
            position: absolute;
            left: 50%;
            top: 50%;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0.45rem 0.95rem;
            background: rgba(10, 10, 12, 0.65);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 100px;
            font-weight: 600;
            color: #ffffff;
            white-space: nowrap;
            user-select: none;
            cursor: pointer;
            pointer-events: auto;
            transition: border-color 0.3s, color 0.3s, background 0.3s, box-shadow 0.3s, scale 0.3s;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          }
        `}} />

        <div 
          className="absolute w-[360px] h-[360px] md:w-[940px] md:h-[940px] flex items-center justify-center"
          style={{
            transform: "rotateX(65deg) rotateY(-10deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div 
            className="absolute w-[100px] h-[100px] md:w-[130px] md:h-[130px] flex items-center justify-center z-20 pointer-events-none"
            style={{
              transform: "rotateY(10deg) rotateX(-65deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-full filter blur-md animate-custom-sun-pulse z-10 bg-[#0A84FF]/30" />
            
            {centerLogo ? (
              typeof centerLogo === "string" ? (
                <img
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-[#0A84FF]/40 shadow-[0_0_30px_rgba(10,132,255,0.3)] z-20 bg-[#050505] p-2 md:p-3 relative"
                  src={centerLogo}
                  alt={centerLogoAlt}
                  width={80}
                  height={80}
                />
              ) : (
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-[#0A84FF]/40 shadow-[0_0_30px_rgba(10,132,255,0.3)] z-20 bg-[#050505] flex items-center justify-center p-2 relative">
                  {centerLogo}
                </div>
              )
            ) : (
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-[#0A84FF]/40 shadow-[0_0_30px_rgba(10,132,255,0.3)] z-20 bg-[#050505] flex items-center justify-center p-2 relative">
                <OrbitIcon className="w-8 h-8 text-[#0A84FF] animate-spin" style={{ animationDuration: '10s' }} />
              </div>
            )}

            <div className="absolute w-[110px] h-[110px] md:w-[140px] md:h-[140px] rounded-full border border-dashed border-[#0A84FF]/30 animate-custom-spin-cw pointer-events-none" />
            <div className="absolute w-[150px] h-[150px] md:w-[185px] md:h-[185px] rounded-full border border-dashed border-[#0A84FF]/20 animate-custom-spin-ccw pointer-events-none" />
          </div>

          {dustItems.map((dust, idx) => (
            <div
              key={idx}
              className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full opacity-40 pointer-events-none animate-custom-orbit"
              style={{
                background: dust.color,
                boxShadow: `0 0 6px ${dust.color}`,
                animationDelay: dust.delay,
                animationPlayState: isPaused ? "paused" : "running",
                animationDuration: `${24 / speedMultiplier}s`,
                "--orbit-radius": dust.radius,
                "--orbit-duration": `${24 / speedMultiplier}s`,
                "--orbit-play-state": isPaused ? "paused" : "running",
              }}
            />
          ))}

          {orbits.map((orbit) => (
            <React.Fragment key={orbit.id}>
              <div
                className="absolute rounded-full border border-dashed border-[#30363D]/60 pointer-events-none"
                style={{
                  width: `calc(2 * ${orbit.radiusClass})`,
                  height: `calc(2 * ${orbit.radiusClass})`,
                  boxShadow: "inset 0 0 25px rgba(10, 132, 255, 0.05), 0 0 25px rgba(10, 132, 255, 0.05)",
                  "--orbit-radius": orbit.radiusClass,
                }}
              />

              {orbit.items.map((item, idx, arr) => {
                const delayValue = -(orbit.speed / arr.length) * idx;
                const durationValue = orbit.speed / speedMultiplier;
                const isHovered = hoveredId === item.id;

                return (
                  <div
                    key={item.id}
                    className="absolute left-1/2 top-1/2 w-0 h-0 pointer-events-none animate-custom-orbit"
                    style={{
                      animationDelay: `${delayValue}s`,
                      animationDuration: `${durationValue}s`,
                      animationPlayState: isPaused ? "paused" : "running",
                      "--orbit-radius": orbit.radiusClass,
                      "--orbit-duration": `${durationValue}s`,
                      "--orbit-play-state": isPaused ? "paused" : "running",
                      "--hover-color": item.color,
                      zIndex: isHovered ? 30 : 10,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="absolute right-0 top-1/2 h-[1.5px] origin-right -translate-y-1/2 pointer-events-none transition-opacity duration-300 z-0"
                      style={{
                        width: orbit.radiusClass,
                        opacity: isHovered ? 1 : 0,
                        background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.15) 20%, ${item.color} 80%, ${item.color} 100%)`,
                        boxShadow: `0 0 8px ${item.color}, 0 0 16px ${item.color}40`,
                      }}
                    />

                    <div
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="orbit-logo-card animate-custom-billboard"
                      style={{
                        animationDelay: `${delayValue}s`,
                        animationDuration: `${durationValue}s`,
                        animationPlayState: isPaused ? "paused" : "running",
                        borderColor: isHovered ? item.color : undefined,
                        boxShadow: isHovered 
                          ? `0 0 20px rgba(0, 0, 0, 0.6), 0 0 15px ${item.color}35`
                          : undefined,
                        scale: isHovered ? 1.05 : 1,
                        "--orbit-duration": `${durationValue}s`,
                        "--orbit-play-state": isPaused ? "paused" : "running",
                      }}
                    >
                      <div 
                        className="transition-transform duration-300 flex items-center justify-center"
                        style={{
                          transform: isHovered ? "scale(1.1)" : "scale(1)",
                          color: item.color,
                        }}
                      >
                        {item.svg}
                      </div>
                      <span className="text-[11px] md:text-[13px] tracking-tight">{item.label}</span>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
);

SolarSystem.displayName = "SolarSystem";
export default SolarSystem;
