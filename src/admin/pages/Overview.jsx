import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiBox, FiCode, FiBriefcase, FiMail, FiDatabase, FiActivity } from "react-icons/fi";
import { StatCard, Spinner } from "../components/UI";
import { api } from "../api";

export default function Overview() {
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { icon: FiBox,       label: "Projects",    value: stats?.projects,   color: "#0A84FF" },
    { icon: FiCode,      label: "Skills",      value: stats?.skills,     color: "#00D4FF" },
    { icon: FiBriefcase, label: "Experience",  value: stats?.experience, color: "#7B61FF" },
    { icon: FiMail,      label: "Messages",    value: stats?.messages,   color: "#10B981" },
  ];

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-[#0A84FF] font-mono text-xs tracking-widest uppercase mb-1">Welcome back</p>
        <h1 className="text-3xl font-black text-white">Dashboard <span className="text-[#0A84FF]">Overview</span></h1>
        <p className="text-[#8B949E] font-mono text-sm mt-1">Manage your portfolio content from one place</p>
      </motion.div>

      {/* Stats */}
      {loading ? (
        <div className="flex items-center justify-center py-16"><Spinner size={28} /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((c, i) => (
              <StatCard key={c.label} {...c} delay={i * 0.08} />
            ))}
          </div>

          {/* Unread messages alert */}
          {stats?.unread > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-[#0A84FF]/10 border border-[#0A84FF]/20 rounded-xl p-4 mb-8 flex items-center gap-3"
            >
              <FiMail size={18} className="text-[#0A84FF] flex-shrink-0" />
              <p className="text-white text-sm">
                You have <span className="text-[#0A84FF] font-bold">{stats.unread} unread</span> message{stats.unread !== 1 ? "s" : ""} in your inbox.
              </p>
            </motion.div>
          )}

          {/* Quick info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="bg-[#0D1117] border border-[#30363D]/60 rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <FiActivity size={15} className="text-[#0A84FF]" />
                <p className="text-white font-bold text-sm">API Status</p>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Server",   status: "Online" },
                  { label: "MongoDB",  status: "Connected" },
                  { label: "Auth",     status: "Active" },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-[#8B949E] font-mono text-xs">{s.label}</span>
                    <span className="flex items-center gap-1.5 text-green-400 font-mono text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="bg-[#0D1117] border border-[#30363D]/60 rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <FiDatabase size={15} className="text-[#0A84FF]" />
                <p className="text-white font-bold text-sm">Quick Actions</p>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Seed all data",     hint: "POST /api/*/seed" },
                  { label: "Check messages",    hint: "/admin/messages" },
                  { label: "Update personal",   hint: "/admin/personal" },
                ].map(a => (
                  <div key={a.label} className="flex items-center justify-between">
                    <span className="text-white text-xs">{a.label}</span>
                    <span className="text-[#30363D] font-mono text-xs">{a.hint}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
