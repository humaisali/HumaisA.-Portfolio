import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid, FiUser, FiCode, FiBriefcase, FiBox,
  FiMail, FiLogOut, FiX, FiShield
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const LINKS = [
  { to: "/admin",             icon: FiGrid,      label: "Overview"    },
  { to: "/admin/personal",    icon: FiUser,      label: "Personal"    },
  { to: "/admin/skills",      icon: FiCode,      label: "Skills"      },
  { to: "/admin/experience",  icon: FiBriefcase, label: "Experience"  },
  { to: "/admin/projects",    icon: FiBox,       label: "Projects"    },
  { to: "/admin/messages",    icon: FiMail,      label: "Messages"    },
];

export default function Sidebar({ open, onClose, unread = 0 }) {
  const { admin, logout } = useAuth();

  const content = (
    <div className="flex flex-col h-full bg-[#0D1117] border-r border-[#30363D]/60">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-[#30363D]/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0A84FF]/10 border border-[#0A84FF]/30 flex items-center justify-center">
            <FiShield size={15} className="text-[#0A84FF]" />
          </div>
          <div>
            <p className="text-white font-black text-sm leading-none">Admin</p>
            <p className="text-[#0A84FF] font-mono text-xs">Dashboard</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-[#8B949E] hover:text-white bg-transparent border-none cursor-pointer">
            <FiX size={18} />
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {LINKS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative ` +
              (isActive
                ? "bg-[#0A84FF]/10 text-[#0A84FF] border border-[#0A84FF]/20"
                : "text-[#8B949E] hover:text-white hover:bg-[#161B22]")
            }
          >
            <Icon size={16} />
            <span>{label}</span>
            {label === "Messages" && unread > 0 && (
              <span className="ml-auto bg-[#0A84FF] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {unread}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 border-t border-[#30363D]/60">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
          <div className="w-7 h-7 rounded-full bg-[#0A84FF] flex items-center justify-center text-white font-bold text-xs">
            {admin?.username?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">{admin?.username || "Admin"}</p>
            <p className="text-[#8B949E] font-mono text-xs">Administrator</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8B949E] hover:text-red-400 hover:bg-red-400/5 transition-all duration-200 text-sm font-medium bg-transparent border-none cursor-pointer"
        >
          <FiLogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-56 flex-shrink-0 h-screen sticky top-0">
        {content}
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
              className="lg:hidden fixed left-0 top-0 h-full w-64 z-50"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
