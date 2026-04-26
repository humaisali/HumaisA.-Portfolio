import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus, FiTrash2, FiEdit2, FiBriefcase, FiX } from "react-icons/fi";
import { PageHeader, Btn, Input, Textarea, Select, Spinner, Toast, Empty, Modal, ConfirmDialog } from "../components/UI";
import { api } from "../api";

const TYPE_OPTIONS = [
  { value: "Freelance",   label: "Freelance" },
  { value: "University",  label: "University" },
  { value: "Internship",  label: "Internship" },
  { value: "Full-time",   label: "Full-time" },
  { value: "Part-time",   label: "Part-time" },
];

const EMPTY_EXP = { role: "", company: "", period: "", type: "Freelance", description: "", techs: [] };

export default function Experience() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]     = useState(null);
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState(EMPTY_EXP);
  const [editId, setEditId]   = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving]   = useState(false);
  const [newTech, setNewTech] = useState("");

  function showToast(msg, type = "success") {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    try { setItems(await api.getExperience()); }
    catch { showToast("Failed to load", "error"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(EMPTY_EXP); setEditId(null); setModal("add"); }
  function openEdit(item) {
    setForm({ role: item.role, company: item.company, period: item.period, type: item.type, description: item.description, techs: item.techs || [] });
    setEditId(item._id); setModal("edit");
  }

  function addTech() {
    if (!newTech.trim()) return;
    setForm(p => ({ ...p, techs: [...p.techs, newTech.trim()] }));
    setNewTech("");
  }
  function removeTech(i) { setForm(p => ({ ...p, techs: p.techs.filter((_, idx) => idx !== i) })); }

  async function handleSave() {
    setSaving(true);
    try {
      if (modal === "add") { await api.createExperience(form); showToast("Experience added!"); }
      else { await api.updateExperience(editId, form); showToast("Updated!"); }
      setModal(null); await load();
    } catch (err) { showToast(err.message, "error"); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    try { await api.deleteExperience(deleteTarget._id); showToast("Deleted!"); setDeleteTarget(null); await load(); }
    catch (err) { showToast(err.message, "error"); }
  }

  return (
    <div>
      <PageHeader
        title="Experience"
        subtitle={`${items.length} entries`}
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" size="sm" onClick={async () => { await api.seedExperience(); await load(); showToast("Seeded!"); }}>Seed</Btn>
            <Btn onClick={openAdd}><FiPlus size={14} /> Add Entry</Btn>
          </div>
        }
      />

      {loading ? (
        <div className="flex justify-center py-20"><Spinner size={28} /></div>
      ) : items.length === 0 ? (
        <Empty icon={FiBriefcase} message="No experience entries yet." />
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-[#0D1117] border border-[#30363D]/60 rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded border text-[#0A84FF] border-[#0A84FF]/20 bg-[#0A84FF]/05">
                      {item.type}
                    </span>
                    <span className="text-[#8B949E] font-mono text-xs">{item.period}</span>
                  </div>
                  <h3 className="text-white font-bold">{item.role}</h3>
                  <p className="text-[#0A84FF] text-sm">{item.company}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <Btn variant="ghost" size="sm" onClick={() => openEdit(item)}><FiEdit2 size={13} /></Btn>
                  <Btn variant="danger" size="sm" onClick={() => setDeleteTarget(item)}><FiTrash2 size={13} /></Btn>
                </div>
              </div>
              <p className="text-[#8B949E] text-sm leading-relaxed mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {(item.techs || []).map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 bg-[#161B22] border border-[#30363D] text-[#8B949E] rounded font-mono">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <Modal title={modal === "add" ? "Add Experience" : "Edit Experience"} onClose={() => setModal(null)}>
            <div className="flex flex-col gap-4">
              <Input label="Role" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} placeholder="Full Stack Developer" />
              <Input label="Company" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="SkyTech Developers" />
              <Input label="Period" value={form.period} onChange={e => setForm(p => ({ ...p, period: e.target.value }))} placeholder="2024 — Present" />
              <Select label="Type" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} options={TYPE_OPTIONS} />
              <Textarea label="Description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} />
              {/* Techs */}
              <div>
                <label className="text-[#8B949E] font-mono text-xs uppercase tracking-wider mb-2 block">Tech Stack</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.techs.map((t, i) => (
                    <span key={i} className="flex items-center gap-1 px-2 py-0.5 bg-[#0A84FF]/10 border border-[#0A84FF]/20 text-[#0A84FF] rounded font-mono text-xs">
                      {t}
                      <button onClick={() => removeTech(i)} className="bg-transparent border-none cursor-pointer text-[#0A84FF] hover:text-red-400"><FiX size={9} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={newTech} onChange={e => setNewTech(e.target.value)} onKeyDown={e => e.key === "Enter" && addTech()}
                    placeholder="Add tech…"
                    className="flex-1 bg-[#161B22] border border-[#30363D] text-white rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#0A84FF] transition-colors placeholder-[#30363D]" />
                  <Btn size="sm" onClick={addTech}><FiPlus size={13} /></Btn>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Btn variant="ghost" onClick={() => setModal(null)} className="flex-1 justify-center">Cancel</Btn>
                <Btn onClick={handleSave} disabled={saving} className="flex-1 justify-center">
                  {saving ? <Spinner size={14} /> : modal === "add" ? "Add" : "Save"}
                </Btn>
              </div>
            </div>
          </Modal>
        )}
        {deleteTarget && (
          <ConfirmDialog message={`Delete "${deleteTarget.role} at ${deleteTarget.company}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
        )}
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
