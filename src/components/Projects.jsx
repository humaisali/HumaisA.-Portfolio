import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "../data/index";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const featured = projects.filter(project => project.featured);
  return (
    <section id="projects" className="section relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-mono uppercase tracking-[0.3em] text-[#70bdff]">Selected work</p>
            <h2 className="text-4xl font-black text-white sm:text-5xl">Featured <span className="gradient-text">Projects</span></h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#a0aab7]">A selection of my work in AI and web development. Explore the ideas, features, and technologies behind each project.</p>
          </div>
          <Link to="/projects" className="project-button shrink-0">View all projects <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map(project => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </div>
    </section>
  );
}
