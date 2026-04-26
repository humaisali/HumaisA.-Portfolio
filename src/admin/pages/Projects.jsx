import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus, FiTrash2, FiEdit2, FiBox, FiGithub, FiExternalLink, FiX, FiStar } from "react-icons/fi";
import { PageHeader, Btn, Input, Textarea, Select, Spinner, Toast, Empty, Modal, ConfirmDialog } from "../components/UI";
import { api } from "../api";

const CAT_OPTIONS = [
  { value: "AI",        label: "AI" },
  { value: "Frontend",  label: "Frontend" },
  { value: "Backend",   label: "Backend" },
  { value: "Fullstack", label: "Fullstack" },
];

const EMPTY_PROJECT = {
  title: "", description: "", techs: [], github: "", live: "",
  category: "AI", featured: false, image: "", order: 0,
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [toast, setToast]       = useState(null);
  const [modal, setModal]       = useState(null);
  const [form, setForm]         = useState(EMPTY_PROJECT);
  const [editId, setEditId]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [newTech, setNewTech]   = useState("");
  const [filter, setFilter]     = useState("All");

  function showToast(msg, type = "success") {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    try { setProjects(await api.getProjects()); }
    catch { showToast("Failed to load", "error"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(EMPTY_PROJECT); setEditId(null); setModal("add"); }
  function openEdit(p) {
    setForm({ title: p.title, description: p.description, techs: p.techs || [], github: p.github || "", live: p.live || "", category: p.category, featured: p.featured || false, image: p.image || "", order: p.order || 0 });
    setEditId(p._id); setModal("edit");
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
      if (modal === "add") { await api.createProject(form); showToast("Project added!"); }
      else { await api.updateProject(editId, form); showToast("Updated!"); }
      setModal(null); await load();
    } catch (err) { showToast(err.message, "error"); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    try { await api.deleteProject(deleteTarget._id); showToast("Deleted!"); setDeleteTarget(null); await load(); }
    catch (err) { showToast(err.message, "error"); }
  }

  async function toggleFeatured(p) {
    try {
      await api.updateProject(p._id, { featured: !p.featured });
      await load();
      showToast(p.featured ? "Removed from featured" : "Marked as featured");
    } catch (err) { showToast(err.message, "error"); }
  }

  const filters = ["All", "AI", "Frontend", "Backend", "Fullstack"];
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle={`${projects.length} projects total`}
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" size="sm" onClick={async () => { try { await api.seedProjects(); await load(); showToast("Seeded!"); } catch (e) { showToast(e.message, "error"); } }}>Seed</Btn>
            <Btn onClick={openAdd}><FiPlus size={14} /> Add Project</Btn>
          </div>
        }
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium font-mono transition-all duration-200 border-none cursor-pointer ` +
              (filter === f ? "bg-[#0A84FF] text-white" : "bg-[#161B22] text-[#8B949E] hover:text-white")}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner size={28} /></div>
      ) : filtered.length === 0 ? (
        <Empty icon={FiBox} message="No projects yet." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#0D1117] border border-[#30363D]/60 rounded-xl overflow-hidden flex flex-col"
            >
              {/* Image placeholder */}
              <div className="h-32 bg-gradient-to-br from-[#0D1117] to-[#161B22] border-b border-[#30363D]/60 flex items-center justify-center relative overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <FiBox size={32} className="text-[#30363D]" />
                )}
                {project.featured && (
                  <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-[#0A84FF] text-white rounded-full text-xs font-bold">
                    <FiStar size={9} /> Featured
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-mono px-2 py-0.5 rounded border text-[#0A84FF] border-[#0A84FF]/20 bg-[#0A84FF]/05">{project.category}</span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{project.title}</h3>
                <p className="text-[#8B949E] text-xs leading-relaxed flex-1 mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {(project.techs || []).slice(0, 4).map(t => (
                    <span key={t} className="text-xs px-1.5 py-0.5 bg-[#161B22] border border-[#30363D] text-[#8B949E] rounded font-mono">{t}</span>
                  ))}
                  {project.techs?.length > 4 && <span className="text-xs text-[#30363D] font-mono">+{project.techs.length - 4}</span>}
                </div>
                <div className="flex gap-2 mt-auto">
                  {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="text-[#8B949E] hover:text-white transition-colors"><FiGithub size={14} /></a>}
                  {project.live  && <a href={project.live}   target="_blank" rel="noreferrer" className="text-[#8B949E] hover:text-[#0A84FF] transition-colors"><FiExternalLink size={14} /></a>}
                  <div className="ml-auto flex gap-1.5">
                    <button onClick={() => toggleFeatured(project)} title="Toggle featured" className={`p-1.5 rounded transition-colors bg-transparent border-none cursor-pointer ${project.featured ? "text-[#0A84FF]" : "text-[#30363D] hover:text-[#0A84FF]"}`}>
                      <FiStar size={13} />
                    </button>
                    <Btn variant="ghost" size="sm" onClick={() => openEdit(project)}><FiEdit2 size={12} /></Btn>
                    <Btn variant="danger" size="sm" onClick={() => setDeleteTarget(project)}><FiTrash2 size={12} /></Btn>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <Modal title={modal === "add" ? "Add Project" : "Edit Project"} onClose={() => setModal(null)}>
            <div className="flex flex-col gap-4">
              <Input label="Title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="AI Career Coach" />
              <Textarea label="Description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} />
              <Select label="Category" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} options={CAT_OPTIONS} />
              <Input label="GitHub URL" value={form.github} onChange={e => setForm(p => ({ ...p, github: e.target.value }))} placeholder="https://github.com/..." />
              <Input label="Live URL" value={form.live} onChange={e => setForm(p => ({ ...p, live: e.target.value }))} placeholder="https://..." />
              <Input label="Image path" value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="/project-image.png" />
              {/* Techs */}
              <div>
                <label className="text-[#8B949E] font-mono text-xs uppercase tracking-wider mb-2 block">Tech Stack</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.techs.map((t, i) => (
                    <span key={i} className="flex items-center gap-1 px-2 py-0.5 bg-[#0A84FF]/10 border border-[#0A84FF]/20 text-[#0A84FF] rounded font-mono text-xs">
                      {t} <button onClick={() => removeTech(i)} className="bg-transparent border-none cursor-pointer text-[#0A84FF] hover:text-red-400"><FiX size={9} /></button>
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
              {/* Featured toggle */}
              <div className="flex items-center gap-3">
                <label className="text-[#8B949E] font-mono text-xs uppercase tracking-wider">Featured</label>
                <button onClick={() => setForm(p => ({ ...p, featured: !p.featured }))}
                  className={`w-10 h-5 rounded-full transition-colors relative border-none cursor-pointer ${form.featured ? "bg-[#0A84FF]" : "bg-[#30363D]"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${form.featured ? "left-5" : "left-0.5"}`} />
                </button>
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
          <ConfirmDialog message={`Delete "${deleteTarget.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
        )}
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
