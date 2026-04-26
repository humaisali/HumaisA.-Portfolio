import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMail, FiTrash2, FiCheck, FiMessageSquare, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { PageHeader, Btn, Spinner, Toast, Empty, ConfirmDialog } from "../components/UI";
import { api } from "../api";

function MessageCard({ msg, onDelete, onRead, onReplied }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#0D1117] border rounded-xl overflow-hidden transition-colors duration-200 ${
        !msg.read ? "border-[#0A84FF]/30" : "border-[#30363D]/60"
      }`}
    >
      {/* Header row */}
      <div
        className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none"
        onClick={() => { setExpanded(p => !p); if (!msg.read) onRead(msg._id); }}
      >
        {/* Unread dot */}
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${!msg.read ? "bg-[#0A84FF] animate-pulse" : "bg-[#30363D]"}`} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-semibold text-sm">{msg.name}</span>
            <span className="text-[#30363D] font-mono text-xs">·</span>
            <span className="text-[#8B949E] font-mono text-xs">{msg.email}</span>
            {msg.replied && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono">Replied</span>
            )}
          </div>
          <p className="text-[#8B949E] text-sm truncate mt-0.5">{msg.subject}</p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-[#30363D] font-mono text-xs hidden sm:block">
            {new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
          {expanded ? <FiChevronUp size={14} className="text-[#8B949E]" /> : <FiChevronDown size={14} className="text-[#8B949E]" />}
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-[#30363D]/60">
              <p className="text-[#8B949E] text-sm leading-relaxed mt-4 mb-5 whitespace-pre-wrap font-mono">
                {msg.message}
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                  onClick={() => onReplied(msg._id)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A84FF] hover:bg-[#0066CC] text-white text-xs font-semibold transition-colors"
                >
                  <FiMessageSquare size={12} /> Reply via Email
                </a>
                {!msg.replied && (
                  <Btn variant="success" size="sm" onClick={() => onReplied(msg._id)}>
                    <FiCheck size={12} /> Mark Replied
                  </Btn>
                )}
                <Btn variant="danger" size="sm" onClick={() => onDelete(msg)}>
                  <FiTrash2 size={12} /> Delete
                </Btn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Messages() {
  const [messages, setMessages]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [toast, setToast]         = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filter, setFilter]       = useState("all");

  function showToast(msg, type = "success") {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    try { setMessages(await api.getMessages()); }
    catch { showToast("Failed to load messages", "error"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleRead(id) {
    try {
      const updated = await api.markRead(id);
      setMessages(p => p.map(m => m._id === id ? updated : m));
    } catch { /* silent */ }
  }

  async function handleReplied(id) {
    try {
      const updated = await api.markReplied(id);
      setMessages(p => p.map(m => m._id === id ? updated : m));
      showToast("Marked as replied!");
    } catch (err) { showToast(err.message, "error"); }
  }

  async function handleDelete() {
    try {
      await api.deleteMessage(deleteTarget._id);
      setMessages(p => p.filter(m => m._id !== deleteTarget._id));
      showToast("Message deleted!");
      setDeleteTarget(null);
    } catch (err) { showToast(err.message, "error"); }
  }

  const unread   = messages.filter(m => !m.read).length;
  const replied  = messages.filter(m => m.replied).length;

  const filtered = messages.filter(m => {
    if (filter === "unread")  return !m.read;
    if (filter === "replied") return m.replied;
    return true;
  });

  const TABS = [
    { key: "all",     label: "All",     count: messages.length },
    { key: "unread",  label: "Unread",  count: unread },
    { key: "replied", label: "Replied", count: replied },
  ];

  return (
    <div>
      <PageHeader
        title="Messages"
        subtitle={`${messages.length} total · ${unread} unread`}
      />

      {/* Stat strip */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total",   value: messages.length, color: "#0A84FF" },
          { label: "Unread",  value: unread,           color: "#F59E0B" },
          { label: "Replied", value: replied,           color: "#10B981" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-[#0D1117] border border-[#30363D]/60 rounded-xl p-4 text-center"
          >
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[#8B949E] font-mono text-xs uppercase tracking-wider mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 border-none cursor-pointer ` +
              (filter === t.key ? "bg-[#0A84FF] text-white" : "bg-[#161B22] text-[#8B949E] hover:text-white")}
          >
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${filter === t.key ? "bg-white/20" : "bg-[#30363D]"}`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner size={28} /></div>
      ) : filtered.length === 0 ? (
        <Empty icon={FiMail} message={filter === "unread" ? "No unread messages." : "No messages yet."} />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(msg => (
            <MessageCard
              key={msg._id}
              msg={msg}
              onRead={handleRead}
              onReplied={handleReplied}
              onDelete={(m) => setDeleteTarget(m)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {deleteTarget && (
          <ConfirmDialog
            message={`Delete message from "${deleteTarget.name}"?`}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
