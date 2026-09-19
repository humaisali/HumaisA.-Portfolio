import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function ProjectNotFound() {
  return (
    <main id="main-content" className="project-page mx-auto min-h-[70vh] max-w-7xl px-6 pb-20 pt-40">
      <p className="project-eyebrow">404 / Not found</p>
      <h1 className="text-4xl font-black text-white sm:text-6xl">This page isn't here.</h1>
      <p className="mb-8 mt-6 max-w-lg leading-7 text-[#a0aab7]">The link may be incorrect or the project may have moved. Explore the collection to find your next project.</p>
      <Link to="/projects" className="project-button"><FiArrowLeft aria-hidden="true" /> Explore all projects</Link>
    </main>
  );
}
