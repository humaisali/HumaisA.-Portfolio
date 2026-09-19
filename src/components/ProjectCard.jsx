import { Link } from "react-router-dom";
import { FiArrowUpRight, FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectCard({ project }) {
  const detailUrl = `/projects/${project.slug}`;
  return (
    <article className="project-card group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#30363D] bg-[#0d1117] transition-colors hover:border-[#0A84FF]/60">
      <Link to={detailUrl} className="project-focus relative block overflow-hidden border-b border-[#30363D] bg-[#050709]" aria-label={`View ${project.title} details`}>
        <div className={`h-1 bg-gradient-to-r ${project.gradient}`} />
        <img src={project.image} alt={`${project.title} preview`} loading="lazy" width="1600" height="900" className="aspect-video w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" />
        {project.featured && <span className="absolute left-4 top-4 rounded-full border border-[#0A84FF]/40 bg-[#050709]/95 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#70bdff]">Featured</span>}
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="mb-3 text-xs font-mono uppercase tracking-widest text-[#70bdff]">{project.category}</span>
        <h3 className="mb-3 text-xl font-bold leading-snug text-white"><Link to={detailUrl} className="project-focus rounded-sm transition-colors hover:text-[#70bdff]">{project.title}</Link></h3>
        <p className="mb-5 text-sm leading-7 text-[#a0aab7]">{project.description}</p>
        <ul aria-label="Technologies" className="mb-6 flex flex-wrap gap-2">
          {project.techs.map(tech => <li key={tech} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[#a0aab7]">{tech}</li>)}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#30363D] pt-4">
          <Link to={detailUrl} aria-label={`View details for ${project.title}`} className="project-focus inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-[#70bdff] hover:text-[#00D4FF]">View details <FiArrowUpRight aria-hidden="true" size={18} /></Link>
          <div className="flex gap-1">
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} source code (opens in a new tab)`} className="project-focus flex h-11 w-11 items-center justify-center rounded-lg text-[#a0aab7] hover:bg-white/5 hover:text-white"><FiGithub size={18} /></a>}
            {project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo (opens in a new tab)`} className="project-focus flex h-11 w-11 items-center justify-center rounded-lg text-[#a0aab7] hover:bg-white/5 hover:text-white"><FiExternalLink size={18} /></a>}
          </div>
        </div>
      </div>
    </article>
  );
}
