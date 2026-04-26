import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSave, FiPlus, FiTrash2 } from "react-icons/fi";
import { PageHeader, Input, Textarea, Btn, Spinner, Toast } from "../components/UI";
import { api } from "../api";

const EMPTY = {
  name: "", roles: [], tagline: "", bio: "",
  aboutText: [], location: "", email: "",
  university: "", degree: "", semester: "",
  company: "", github: "", linkedin: "", leetcode: "", available: true,
};

export default function Personal() {
  const [data, setData]       = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState(null);
  const [newRole, setNewRole] = useState("");
  const [newAbout, setNewAbout] = useState("");

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  useEffect(() => {
    api.getPersonal()
      .then(setData)
      .catch(() => showToast("Could not load data. Seed first?", "error"))
      .finally(() => setLoading(false));
  }, []);

  function set(field, value) {
    setData(p => ({ ...p, [field]: value }));
  }

  function addRole() {
    if (!newRole.trim()) return;
    set("roles", [...(data.roles || []), newRole.trim()]);
    setNewRole("");
  }

  function removeRole(i) {
    set("roles", data.roles.filter((_, idx) => idx !== i));
  }

  function addAbout() {
    if (!newAbout.trim()) return;
    set("aboutText", [...(data.aboutText || []), newAbout.trim()]);
    setNewAbout("");
  }

  function removeAbout(i) {
    set("aboutText", data.aboutText.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await api.updatePersonal(data);
      showToast("Personal info saved!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleSeed() {
    try {
      await api.seedPersonal();
      const fresh = await api.getPersonal();
      setData(fresh);
      showToast("Data seeded!");
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size={28} /></div>;

  return (
    <div>
      <PageHeader
        title="Personal Info"
        subtitle="Update your bio, links, and about section"
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" size="sm" onClick={handleSeed}>Seed Data</Btn>
            <Btn onClick={handleSave} disabled={saving}>
              {saving ? <Spinner size={14} /> : <FiSave size={14} />}
              {saving ? "Saving…" : "Save Changes"}
            </Btn>
          </div>
        }
      />

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Basic Info */}
        <div className="bg-[#0D1117] border border-[#30363D]/60 rounded-xl p-6 flex flex-col gap-4">
          <p className="text-white font-bold text-sm border-b border-[#30363D]/60 pb-3">Basic Info</p>
          <Input label="Full Name" value={data.name} onChange={e => set("name", e.target.value)} placeholder="Humais Ali" />
          <Input label="Tagline" value={data.tagline} onChange={e => set("tagline", e.target.value)} placeholder="Building AI-Powered Web Experiences" />
          <Textarea label="Hero Bio" value={data.bio} onChange={e => set("bio", e.target.value)} rows={3} placeholder="Short bio shown in the hero section" />
          <Input label="Location" value={data.location} onChange={e => set("location", e.target.value)} placeholder="Mardan, Pakistan" />
          <Input label="Email" type="email" value={data.email} onChange={e => set("email", e.target.value)} />
          <div className="flex items-center gap-3">
            <label className="text-[#8B949E] font-mono text-xs uppercase tracking-wider">Available for work</label>
            <button
              onClick={() => set("available", !data.available)}
              className={`w-10 h-5 rounded-full transition-colors duration-200 relative border-none cursor-pointer flex-shrink-0 ${data.available ? "bg-[#0A84FF]" : "bg-[#30363D]"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${data.available ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        </div>

        {/* Education & Work */}
        <div className="bg-[#0D1117] border border-[#30363D]/60 rounded-xl p-6 flex flex-col gap-4">
          <p className="text-white font-bold text-sm border-b border-[#30363D]/60 pb-3">Education & Work</p>
          <Input label="University" value={data.university} onChange={e => set("university", e.target.value)} />
          <Input label="Degree" value={data.degree} onChange={e => set("degree", e.target.value)} />
          <Input label="Semester" value={data.semester} onChange={e => set("semester", e.target.value)} placeholder="6th Semester" />
          <Input label="Company" value={data.company} onChange={e => set("company", e.target.value)} />
          <Input label="GitHub URL" value={data.github} onChange={e => set("github", e.target.value)} />
          <Input label="LinkedIn URL" value={data.linkedin} onChange={e => set("linkedin", e.target.value)} />
          <Input label="LeetCode URL" value={data.leetcode} onChange={e => set("leetcode", e.target.value)} />
        </div>

        {/* Roles */}
        <div className="bg-[#0D1117] border border-[#30363D]/60 rounded-xl p-6">
          <p className="text-white font-bold text-sm border-b border-[#30363D]/60 pb-3 mb-4">Typing Roles</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {(data.roles || []).map((r, i) => (
              <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-[#0A84FF]/10 border border-[#0A84FF]/20 text-[#0A84FF] rounded-full font-mono text-xs">
                {r}
                <button onClick={() => removeRole(i)} className="bg-transparent border-none cursor-pointer text-[#0A84FF] hover:text-red-400 transition-colors">
                  <FiTrash2 size={10} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newRole} onChange={e => setNewRole(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addRole()}
              placeholder="Add a role…"
              className="flex-1 bg-[#161B22] border border-[#30363D] text-white rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#0A84FF] transition-colors placeholder-[#30363D]" />
            <Btn size="sm" onClick={addRole}><FiPlus size={14} /></Btn>
          </div>
        </div>

        {/* About paragraphs */}
        <div className="bg-[#0D1117] border border-[#30363D]/60 rounded-xl p-6">
          <p className="text-white font-bold text-sm border-b border-[#30363D]/60 pb-3 mb-4">About Paragraphs</p>
          <div className="flex flex-col gap-2 mb-4">
            {(data.aboutText || []).map((p, i) => (
              <div key={i} className="flex gap-2 p-3 bg-[#161B22] border border-[#30363D]/50 rounded-lg">
                <p className="text-[#8B949E] text-xs font-mono flex-1 leading-relaxed">{p}</p>
                <button onClick={() => removeAbout(i)} className="text-[#30363D] hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer flex-shrink-0">
                  <FiTrash2 size={13} />
                </button>
              </div>
            ))}
          </div>
          <Textarea value={newAbout} onChange={e => setNewAbout(e.target.value)} rows={3} placeholder="Add a paragraph for the About section…" />
          <Btn size="sm" onClick={addAbout} className="mt-2"><FiPlus size={14} /> Add Paragraph</Btn>
        </div>
      </div>

      <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>
    </div>
  );
}
