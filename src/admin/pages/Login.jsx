import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiUser, FiEye, FiEyeOff, FiShield } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]       = useState({ username: "", password: "" });
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050709] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0A84FF] rounded-full opacity-[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#00D4FF] rounded-full opacity-[0.03] blur-[100px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(10,132,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(10,132,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0A84FF]/10 border border-[#0A84FF]/30 mb-4"
          >
            <FiShield size={28} className="text-[#0A84FF]" />
          </motion.div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Admin <span className="text-[#0A84FF]">Portal</span>
          </h1>
          <p className="text-[#8B949E] font-mono text-sm mt-2">humais.softneer dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-[#0D1117]/80 backdrop-blur-xl border border-[#30363D]/80 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username */}
            <div>
              <label className="text-[#8B949E] font-mono text-xs uppercase tracking-widest mb-2 block">Username</label>
              <div className="relative">
                <FiUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B949E]" />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm(p => ({ ...p, username: e.target.value }))}
                  required
                  placeholder="admin"
                  className="w-full bg-[#161B22] border border-[#30363D] text-white rounded-lg pl-10 pr-4 py-3 text-sm font-mono focus:outline-none focus:border-[#0A84FF] transition-colors placeholder-[#30363D]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[#8B949E] font-mono text-xs uppercase tracking-widest mb-2 block">Password</label>
              <div className="relative">
                <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B949E]" />
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#161B22] border border-[#30363D] text-white rounded-lg pl-10 pr-10 py-3 text-sm font-mono focus:outline-none focus:border-[#0A84FF] transition-colors placeholder-[#30363D]"
                />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8B949E] hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                  {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-red-400 text-sm font-mono text-center bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg bg-[#0A84FF] hover:bg-[#0066CC] text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><FiShield size={15} /> Sign In</>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-[#30363D] font-mono text-xs mt-6">
          humais.softneer © {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
}
