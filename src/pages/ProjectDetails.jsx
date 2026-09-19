import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiExternalLink, FiGithub } from "react-icons/fi";
import { projects } from "../data/index";
import { projectCaseStudies } from "../data/projectCaseStudies";
import ProjectCaseStudy, { CaseStudySummary, caseStudySections } from "../components/ProjectCaseStudy";
import ProjectNotFound from "./ProjectNotFound";

export default function ProjectDetails() {
  const { slug } = useParams();
  const index = projects.findIndex(project => project.slug === slug);
  const project = projects[index];
  if (!project) return <ProjectNotFound />;
  const nextProject = projects[(index + 1) % projects.length];
  const study = projectCaseStudies[project.slug];
  return (
    <main id="main-content" className="project-page mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-12">
      <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-3 text-sm text-[#a0aab7]">
        <Link to="/projects" className="project-back"><FiArrowLeft aria-hidden="true" /> All projects</Link>
        <span aria-hidden="true">/</span><span className="min-w-0" aria-current="page">{project.title}</span>
      </nav>
      <header className="mb-10 max-w-4xl">
        <div className="mb-5 flex items-center gap-3 text-xs font-mono uppercase tracking-widest">
          <span className="text-[#70bdff]">{project.category} / Project {String(index + 1).padStart(2, "0")}</span>
          {project.featured && <span className="rounded-full border border-[#0A84FF]/30 px-3 py-1 text-[#a0aab7]">Featured</span>}
        </div>
        <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">{project.title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[#a0aab7] sm:text-lg">{project.description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="project-button">Live demo <FiExternalLink aria-hidden="true" /></a>}
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="project-button project-button--secondary"><FiGithub aria-hidden="true" /> Source code</a>}
        </div>
      </header>
      {study && <CaseStudySummary study={study} />}
      <figure className="mb-12 overflow-hidden rounded-2xl border border-[#30363D] bg-[#0d1117] sm:mb-16">
        <div aria-hidden="true" className="flex gap-2 border-b border-[#30363D] px-5 py-4"><span className="h-2 w-2 rounded-full bg-[#0A84FF]" /><span className="h-2 w-2 rounded-full bg-[#00D4FF]/50" /><span className="h-2 w-2 rounded-full bg-[#30363D]" /></div>
        <img src={project.image} alt={`${project.title} application screenshot`} width="1600" height="900" className="max-h-[620px] w-full object-contain" />
        <figcaption className="border-t border-[#30363D] px-5 py-3 text-xs font-mono text-[#a0aab7]">{project.title} — project preview</figcaption>
      </figure>
      {study && <details className="mb-10 rounded-xl border border-[#30363D] bg-[#0d1117] p-5 lg:hidden">
        <summary className="project-focus cursor-pointer text-sm font-semibold text-[#70bdff]">Explore this case study</summary>
        <nav aria-label="Case study sections" className="mt-4 grid gap-1 sm:grid-cols-2">
          {caseStudySections.map(([id, label]) => <a key={id} href={`#${id}`} className="project-back">{label}</a>)}
        </nav>
      </details>}
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        {study ? <ProjectCaseStudy project={project} study={study} /> : <div>
          <section aria-labelledby="overview-heading">
            <p className="project-eyebrow">Behind the project</p>
            <h2 id="overview-heading" className="text-3xl font-bold text-white">Project overview</h2>
            <p className="mt-5 text-base leading-8 text-[#a0aab7]">{project.overview}</p>
          </section>
          <section aria-labelledby="features-heading" className="mt-12">
            <h2 id="features-heading" className="mb-6 text-2xl font-bold text-white">What it does</h2>
            <div className="divide-y divide-[#30363D] border-y border-[#30363D]">
              {project.features.map((feature, featureIndex) => <div key={feature.title} className="flex gap-5 py-6"><span aria-hidden="true" className="pt-1 text-xs font-mono text-[#70bdff]">{String(featureIndex + 1).padStart(2, "0")}</span><div><h3 className="text-lg font-semibold text-white">{feature.title}</h3><p className="mt-2 text-sm leading-7 text-[#a0aab7]">{feature.description}</p></div></div>)}
            </div>
          </section>
        </div>}
        <aside aria-label="Project information" className="space-y-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          {study && <nav aria-label="Case study sections" className="case-panel hidden lg:block">
            <h2 className="mb-4 text-xs font-mono uppercase tracking-widest text-[#70bdff]">In this case study</h2>
            <ol className="grid grid-cols-2 gap-x-3 lg:grid-cols-1">
              {caseStudySections.map(([id, label], sectionIndex) => <li key={id}><a href={`#${id}`} className="project-focus flex min-h-11 items-center gap-3 rounded-md text-sm text-[#a0aab7] hover:text-white"><span className="text-[10px] font-mono text-[#70bdff]">{String(sectionIndex + 1).padStart(2, "0")}</span>{label}</a></li>)}
            </ol>
          </nav>}
          <section className="rounded-2xl border border-[#30363D] bg-[#0d1117] p-6">
            <h2 className="mb-5 text-lg font-semibold text-white">Built with</h2>
            <ul className="flex flex-wrap gap-2">{project.techs.map(tech => <li key={tech} className="rounded-lg border border-[#30363D] bg-white/5 px-3 py-2 text-xs text-[#c4cdd8]">{tech}</li>)}</ul>
            {(!project.live || !project.github) && <div className="mt-6 space-y-3 border-t border-[#30363D] pt-5 text-sm leading-6 text-[#a0aab7]">
              {!project.live && <p>A public demo is not currently linked.</p>}
              {!project.github && <p>Source code is not currently shared publicly.</p>}
            </div>}
          </section>
          <section className="rounded-2xl border border-[#0A84FF]/25 bg-[#0A84FF]/5 p-6">
            <h2 className="text-lg font-semibold text-white">Have a project in mind?</h2>
            <p className="mb-5 mt-3 text-sm leading-7 text-[#a0aab7]">Let's talk about your idea and what we can build together.</p>
            <Link to="/#contact" className="project-back text-[#70bdff]">Get in touch <FiArrowUpRight aria-hidden="true" /></Link>
          </section>
        </aside>
      </div>
      <nav aria-label="More projects" className="mt-16 flex flex-col gap-6 border-t border-[#30363D] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/projects" className="project-back"><FiArrowLeft aria-hidden="true" /> All projects</Link>
        <Link to={`/projects/${nextProject.slug}`} className="project-focus group flex max-w-lg items-center gap-5 rounded-lg text-white"><div><span className="mb-2 block text-xs font-mono uppercase tracking-widest text-[#a0aab7]">Next project</span><span className="text-lg font-semibold group-hover:text-[#70bdff]">{nextProject.title}</span></div><FiArrowRight aria-hidden="true" className="shrink-0 text-[#70bdff]" size={24} /></Link>
      </nav>
    </main>
  );
}
