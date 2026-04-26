import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiEdit2, FiCode } from "react-icons/fi";
import { PageHeader, Btn, Input, Select, Spinner, Toast, Empty, Modal, ConfirmDialog } from "../components/UI";
import { api } from "../api";

const CATEGORIES = ["Frontend", "Backend", "Database", "AI/ML", "Tools"];
const CAT_OPTIONS = CATEGORIES.map(c => ({ value: c, label: c }));

const EMPTY_SKILL = { name: "", level: 80, category: "Frontend" };

export default function Skills() {
  const [skills, setSkills]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]     = useState(null);
  const [modal, setModal]     = useState(null); // null | "add" | "edit"
  const [form, setForm]       = useState(EMPTY_SKILL);
  const [editId, setEditId]   = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving]   = useState(false);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    try {
      const data = await api.getSkills();
      setSkills(data);
    } catch { showToast("Failed to load skills", "error"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(EMPTY_SKILL); setModal("add"); setEditId(null); }
  function openEdit(skill) { setForm({ name: skill.name, level: skill.level, category: skill.category }); setEditId(skill._id); setModal("edit"); }

  async function handleSave() {
    setSaving(true);
    try {
      if (modal === "add") {
        await api.createSkill(form);
        showToast("Skill added!");
      } else {
        await api.updateSkill(editId, form);
        showToast("Skill updated!");
      }
      setModal(null);
      await load();
    } catch (err) {
      showToast(err.message, "error");
    } finally { setSaving(false); }
  }

  async function handleDelete() {
    try {
      await api.deleteSkill(deleteTarget._id);
      showToast("Skill deleted!");
      setDeleteTarget(null);
      await load();
    } catch (err) { showToast(err.message, "error"); }
  }

  async function handleSeed() {
    try {
      await api.seedSkills();
      showToast("Skills seeded!");
      await load();
    } catch (err) { showToast(err.message, "error"); }
  }

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        title="Skills"
        subtitle={`${skills.length} skills across ${CATEGORIES.length} categories`}
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" size="sm" onClick={handleSeed}>Seed</Btn>
            <Btn onClick={openAdd}><FiPlus size={14} /> Add Skill</Btn>
          </div>
        }
      />

      {loading ? (
        <div className="flex justify-center py-20"><Spinner size={28} /></div>
      ) : skills.length === 0 ? (
        <Empty icon={FiCode} message="No skills yet. Add one or seed the data." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map(cat => (
            grouped[cat].length > 0 && (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-[#0D1117] border border-[#30363D]/60 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 rounded-full bg-[#0A84FF]" />
                  <p className="text-[#0A84FF] font-mono text-xs uppercase tracking-widest font-bold">{cat}</p>
                </div>
                <div className="flex flex-col gap-3">
                  {grouped[cat].map(skill => (
                    <div key={skill._id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium">{skill.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[#0A84FF] font-mono text-xs">{skill.level}%</span>
                          <button onClick={() => openEdit(skill)} className="text-[#30363D] hover:text-[#0A84FF] transition-colors bg-transparent border-none cursor-pointer p-1">
                            <FiEdit2 size={11} />
                          </button>
                          <button onClick={() => setDeleteTarget(skill)} className="text-[#30363D] hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer p-1">
                            <FiTrash2 size={11} />
                          </button>
                        </div>
                      </div>
                      <div className="h-1.5 bg-[#21262D] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {modal && (
          <Modal title={modal === "add" ? "Add Skill" : "Edit Skill"} onClose={() => setModal(null)}>
            <div className="flex flex-col gap-4">
              <Input label="Skill Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="React.js" />
              <Select label="Category" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} options={CAT_OPTIONS} />
              <div>
                <label className="text-[#8B949E] font-mono text-xs uppercase tracking-wider mb-2 block">
                  Level: <span className="text-[#0A84FF]">{form.level}%</span>
                </label>
                <input
                  type="range" min={0} max={100} value={form.level}
                  onChange={e => setForm(p => ({ ...p, level: Number(e.target.value) }))}
                  className="w-full accent-[#0A84FF]"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Btn variant="ghost" onClick={() => setModal(null)} className="flex-1 justify-center">Cancel</Btn>
                <Btn onClick={handleSave} disabled={saving} className="flex-1 justify-center">
                  {saving ? <Spinner size={14} /> : modal === "add" ? "Add Skill" : "Save"}
                </Btn>
              </div>
            </div>
          </Modal>
        )}
        {deleteTarget && (
          <ConfirmDialog
            message={`Delete "${deleteTarget.name}"?`}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
