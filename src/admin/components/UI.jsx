import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

// ── Stat Card ────────────────────────────────────────────────────────────────
export function StatCard({ icon: Icon, label, value, color = "#0A84FF", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-[#0D1117] border border-[#30363D]/60 rounded-xl p-5 flex items-center gap-4"
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-[#8B949E] font-mono text-xs uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-white">{value ?? "—"}</p>
      </div>
    </motion.div>
  );
}

// ── Section Header ───────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-black text-white">{title}</h1>
        {subtitle && <p className="text-[#8B949E] font-mono text-sm mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

// ── Primary Button ───────────────────────────────────────────────────────────
export function Btn({ children, onClick, variant = "primary", size = "md", disabled, type = "button", className = "" }) {
  const base = "inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2.5 text-sm", lg: "px-6 py-3 text-sm" };
  const variants = {
    primary:  "bg-[#0A84FF] hover:bg-[#0066CC] text-white",
    danger:   "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
    ghost:    "bg-[#161B22] hover:bg-[#21262D] text-[#8B949E] hover:text-white border border-[#30363D]",
    success:  "bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20",
  };
  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
      type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </motion.button>
  );
}

// ── Input ────────────────────────────────────────────────────────────────────
export function Input({ label, value, onChange, placeholder, type = "text", required, className = "" }) {
  return (
    <div className={className}>
      {label && <label className="text-[#8B949E] font-mono text-xs uppercase tracking-wider mb-2 block">{label}</label>}
      <input
        type={type} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="w-full bg-[#0D1117] border border-[#30363D] text-white rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#0A84FF] transition-colors placeholder-[#30363D]"
      />
    </div>
  );
}

// ── Textarea ─────────────────────────────────────────────────────────────────
export function Textarea({ label, value, onChange, placeholder, rows = 4, className = "" }) {
  return (
    <div className={className}>
      {label && <label className="text-[#8B949E] font-mono text-xs uppercase tracking-wider mb-2 block">{label}</label>}
      <textarea
        value={value} onChange={onChange}
        placeholder={placeholder} rows={rows}
        className="w-full bg-[#0D1117] border border-[#30363D] text-white rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#0A84FF] transition-colors placeholder-[#30363D] resize-none"
      />
    </div>
  );
}

// ── Select ───────────────────────────────────────────────────────────────────
export function Select({ label, value, onChange, options, className = "" }) {
  return (
    <div className={className}>
      {label && <label className="text-[#8B949E] font-mono text-xs uppercase tracking-wider mb-2 block">{label}</label>}
      <select
        value={value} onChange={onChange}
        className="w-full bg-[#0D1117] border border-[#30363D] text-white rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#0A84FF] transition-colors"
      >
        {options.map(o => (
          <option key={o.value} value={o.value} className="bg-[#0D1117]">{o.label}</option>
        ))}
      </select>
    </div>
  );
}

// ── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner({ size = 20 }) {
  return (
    <span className="inline-block rounded-full border-2 border-[#30363D] border-t-[#0A84FF] animate-spin"
      style={{ width: size, height: size }} />
  );
}

// ── Empty State ──────────────────────────────────────────────────────────────
export function Empty({ icon: Icon, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon size={40} className="text-[#30363D] mb-3" />
      <p className="text-[#8B949E] font-mono text-sm">{message}</p>
    </div>
  );
}

// ── Toast notification ───────────────────────────────────────────────────────
export function Toast({ message, type = "success", onClose }) {
  const colors = {
    success: "bg-green-500/10 border-green-500/30 text-green-400",
    error:   "bg-red-500/10 border-red-500/30 text-red-400",
    info:    "bg-[#0A84FF]/10 border-[#0A84FF]/30 text-[#0A84FF]",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10 }}
      className={`fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-4 py-3 rounded-xl border font-mono text-sm shadow-xl ${colors[type]}`}
    >
      {message}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 bg-transparent border-none cursor-pointer text-inherit">✕</button>
    </motion.div>
  );
}

// ── Confirm Delete Dialog ─────────────────────────────────────────────────────
export function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0D1117] border border-[#30363D] rounded-2xl p-6 w-full max-w-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <FiAlertTriangle size={18} className="text-red-400" />
          </div>
          <div>
            <p className="text-white font-bold">Confirm Delete</p>
            <p className="text-[#8B949E] text-xs font-mono">This action cannot be undone</p>
          </div>
        </div>
        <p className="text-[#8B949E] text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <Btn variant="ghost" onClick={onCancel} className="flex-1 justify-center">Cancel</Btn>
          <Btn variant="danger" onClick={onConfirm} className="flex-1 justify-center">Delete</Btn>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Modal wrapper ─────────────────────────────────────────────────────────────
export function Modal({ title, onClose, children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8"
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#0D1117] border border-[#30363D] rounded-2xl w-full max-w-lg max-h-full overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363D]/60">
          <h2 className="text-white font-bold">{title}</h2>
          <button onClick={onClose} className="text-[#8B949E] hover:text-white bg-transparent border-none cursor-pointer transition-colors">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}
