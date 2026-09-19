import { Link, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { projects } from "../data/index";
import ProjectCard from "../components/ProjectCard";

const categories = ["All", ...new Set(projects.map(project => project.category))];

export default function AllProjects() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = categories.includes(params.get("category")) ? params.get("category") : "All";
  const filtered = projects.filter(project =>
    (category === "All" || project.category === category) &&
    `${project.title} ${project.description} ${project.techs.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  function updateFilter(key, value) {
    const next = new URLSearchParams(params);
    if (!value || value === "All") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }
  return (
    <main id="main-content" className="project-page mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-12">
      <Link to="/#projects" className="project-back"><FiArrowLeft aria-hidden="true" /> Back to portfolio</Link>
      <div className="mb-12 mt-10 grid items-end gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="project-eyebrow">The project collection</p>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">Ideas turned into<br /><span className="gradient-text">working products.</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#a0aab7]">Explore my AI applications, developer tools, and client work. Open a project to see what it does and how it was built.</p>
        </div>
        <div className="flex gap-8 border-l border-[#30363D] pl-6 font-mono">
          <div><p className="text-3xl text-white">{String(projects.length).padStart(2, "0")}</p><p className="mt-2 text-xs text-[#a0aab7]">Projects</p></div>
          <div><p className="text-3xl text-[#70bdff]">{String(projects.filter(p => p.featured).length).padStart(2, "0")}</p><p className="mt-2 text-xs text-[#a0aab7]">Featured</p></div>
        </div>
      </div>
      <section aria-labelledby="collection-heading">
        <h2 id="collection-heading" className="sr-only">All projects</h2>
        <div className="flex flex-col justify-between gap-5 border-y border-[#30363D] py-5 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2" aria-label="Filter by category">
            {categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => updateFilter("category", item)} className={`project-focus min-h-11 rounded-lg border px-5 text-sm transition-colors ${category === item ? "border-[#0A84FF]/50 bg-[#0A84FF]/10 text-[#70bdff]" : "border-transparent text-[#a0aab7] hover:border-[#30363D] hover:text-white"}`}>{item}</button>)}
          </div>
          <div className="relative w-full lg:max-w-xs">
            <label htmlFor="project-search" className="sr-only">Search projects</label>
            <FiSearch aria-hidden="true" className="pointer-events-none absolute left-4 top-4 text-[#a0aab7]" />
            <input id="project-search" type="search" value={query} onChange={event => updateFilter("q", event.target.value)} placeholder="Search projects or technologies" className="project-focus h-12 w-full rounded-lg border border-[#30363D] bg-[#0d1117] pl-11 pr-4 text-sm text-white placeholder:text-[#8b949e]" />
          </div>
        </div>
        <p role="status" className="my-6 text-xs font-mono text-[#a0aab7]">Showing {filtered.length} of {projects.length} projects</p>
        {filtered.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filtered.map(project => <ProjectCard key={project.slug} project={project} />)}</div> : (
          <div className="rounded-2xl border border-dashed border-[#30363D] px-6 py-16 text-center">
            <h3 className="text-xl font-semibold text-white">No projects found</h3>
            <p className="mb-6 mt-3 text-sm text-[#a0aab7]">Try a different project name, technology, or category.</p>
            <button type="button" onClick={() => setParams({})} className="project-button">Clear filters</button>
          </div>
        )}
      </section>
    </main>
  );
}
