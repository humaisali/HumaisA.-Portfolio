import { FiArrowDown, FiCheck, FiImage } from "react-icons/fi";
import { sampleDevelopmentProcess, sampleGallery } from "../data/projectCaseStudies";

export const caseStudySections = [
  ["overview", "Overview"], ["problem", "Problem & goals"], ["solution", "The solution"],
  ["features", "Key features"], ["architecture", "Architecture"], ["process", "Development process"],
  ["gallery", "Product gallery"], ["challenges", "Challenges"], ["results", "Results"], ["learnings", "Learnings & next steps"],
];

function Section({ id, number, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="case-section">
      <p className="project-eyebrow">{number} / The case study</p>
      <h2 id={`${id}-heading`} className="mb-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

export function CaseStudySummary({ study }) {
  return (
    <div className="mb-10">
      {study.isPlaceholder && (
        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-[#0A84FF]/25 bg-[#0A84FF]/5 px-5 py-4 text-sm leading-6 text-[#a0aab7]">
          <span className="case-sample-label">Sample case study</span>
          <p>The brief, process, and results below are illustrative placeholder content.</p>
        </div>
      )}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-7 border-y border-[#30363D] py-7 lg:grid-cols-4">
        {[["My role", study.role], ["Timeline", study.duration], ["Team", study.team], ["Built for", study.audience]].map(([label, value]) => (
          <div key={label} className="min-w-0"><dt className="mb-2 text-[11px] font-mono uppercase tracking-widest text-[#8b949e]">{label}</dt><dd className="text-sm font-medium leading-6 text-white">{value}</dd></div>
        ))}
      </dl>
    </div>
  );
}

export default function ProjectCaseStudy({ project, study }) {
  const process = study.process || sampleDevelopmentProcess;
  const gallery = study.gallery || sampleGallery;
  return (
    <div className="min-w-0">
      <Section id="overview" number="01" title="Project overview">
        <p className="case-copy">{project.overview}</p>
      </Section>
      <Section id="problem" number="02" title="The problem worth solving">
        <p className="case-copy">{study.problem}</p>
        <div className="mt-7 rounded-2xl border border-[#30363D] bg-[#0d1117] p-6">
          <h3 className="mb-5 text-lg font-semibold text-white">What success should look like</h3>
          <ul className="space-y-4">{study.goals.map(goal => <li key={goal} className="flex gap-3 text-sm leading-7 text-[#a0aab7]"><FiCheck aria-hidden="true" className="mt-1.5 shrink-0 text-[#70bdff]" />{goal}</li>)}</ul>
        </div>
      </Section>
      <Section id="solution" number="03" title="From idea to experience">
        <p className="case-copy">{study.solution}</p>
        <h3 className="mb-5 mt-8 text-lg font-semibold text-white">The user journey</h3>
        <ol className="case-journey">{study.journey.map((step, index) => <li key={step}><span aria-hidden="true" className="case-step-number">{index + 1}</span><p className="text-sm leading-7 text-[#a0aab7]">{step}</p></li>)}</ol>
      </Section>
      <Section id="features" number="04" title="Key features">
        <div className="grid gap-4 sm:grid-cols-2">
          {project.features.map((feature, index) => <div key={feature.title} className="case-panel"><span className="text-xs font-mono text-[#70bdff]">FEATURE {String(index + 1).padStart(2, "0")}</span><h3 className="mb-3 mt-4 text-lg font-semibold text-white">{feature.title}</h3><p className="text-sm leading-7 text-[#a0aab7]">{feature.description}</p></div>)}
        </div>
      </Section>
      <Section id="architecture" number="05" title="How the pieces fit together">
        <p className="case-copy mb-7">{study.isPlaceholder ? "An illustrative architecture showing how information could move through the application." : "The application's main components and how information moves between them."}</p>
        <ol className="space-y-3">{study.architecture.map((layer, index) => <li key={layer.title}>
          <div className="case-panel flex gap-4"><span className="mt-1 text-xs font-mono text-[#70bdff]">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-base font-semibold text-white">{layer.title}</h3><p className="mt-2 text-sm leading-7 text-[#a0aab7]">{layer.detail}</p></div></div>
          {index < study.architecture.length - 1 && <FiArrowDown aria-hidden="true" className="mx-auto mt-3 text-[#0A84FF]" />}
        </li>)}</ol>
        <h3 className="mb-5 mt-9 text-lg font-semibold text-white">Technical & design decisions</h3>
        <div className="space-y-5">{study.decisions.map(decision => <div key={decision.title} className="border-l-2 border-[#0A84FF]/50 pl-5"><h4 className="font-semibold text-white">{decision.title}</h4><p className="mt-2 text-sm leading-7 text-[#a0aab7]">{decision.detail}</p></div>)}</div>
      </Section>
      <Section id="process" number="06" title="The development process">
        <ol className="case-timeline">{process.map(step => <li key={step.phase}>
          <span className="case-step-number" aria-hidden="true">{step.phase}</span>
          <div className="pb-8"><h3 className="text-lg font-semibold text-white">{step.title}</h3><p className="mt-3 text-sm leading-7 text-[#a0aab7]">{step.description}</p><p className="mt-4 text-xs leading-6 text-[#70bdff]"><span className="font-semibold">Deliverable:</span> {step.deliverable}</p></div>
        </li>)}</ol>
      </Section>
      <Section id="gallery" number="07" title="A closer look at the product">
        <div className="grid gap-5 sm:grid-cols-2">{gallery.map(item => <figure key={item.caption} className="overflow-hidden rounded-xl border border-[#30363D] bg-[#0d1117]">
          {item.src ? <img src={item.src} alt={item.alt || item.caption} loading="lazy" className="aspect-[4/3] w-full object-contain" /> : <div className="case-gallery-placeholder"><FiImage size={28} aria-hidden="true" /><span className="case-sample-label">Screenshot placeholder</span></div>}
          <figcaption className="border-t border-[#30363D] p-5"><p className="font-semibold text-white">{item.caption}</p><p className="mt-2 text-xs leading-6 text-[#a0aab7]">{item.description}</p></figcaption>
        </figure>)}</div>
      </Section>
      <Section id="challenges" number="08" title="Challenges & how I approached them">
        <div className="space-y-5">{study.challenges.map(challenge => <article key={challenge.title} className="case-panel">
          <h3 className="mb-5 text-lg font-semibold text-white">{challenge.title}</h3>
          <div className="space-y-5"><div><p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-[#8b949e]">The challenge</p><p className="text-sm leading-7 text-[#a0aab7]">{challenge.problem}</p></div><div className="border-l-2 border-[#0A84FF] pl-4"><p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-[#70bdff]">The approach</p><p className="text-sm leading-7 text-[#c4cdd8]">{challenge.solution}</p></div></div>
        </article>)}</div>
      </Section>
      <Section id="results" number="09" title="Results & impact">
        {study.isPlaceholder && <p className="mb-6 text-sm leading-7 text-[#a0aab7]"><span className="case-sample-label mr-2">Sample metrics</span>These numbers demonstrate the layout. They are not measured project outcomes.</p>}
        <div className="grid gap-4 sm:grid-cols-3">{study.metrics.map(metric => <div key={metric.label} className="case-panel"><p className="text-3xl font-bold tracking-tight text-[#70bdff]">{metric.value}</p><h3 className="mb-3 mt-4 text-sm font-semibold text-white">{metric.label}</h3><p className="text-xs leading-6 text-[#a0aab7]">{metric.detail}</p></div>)}</div>
      </Section>
      <Section id="learnings" number="10" title="What I learned & what's next">
        <p className="case-copy">{study.lessons}</p>
        <div className="mt-8 border-t border-[#30363D] pt-7"><h3 className="mb-5 text-lg font-semibold text-white">Future improvements</h3><ul className="space-y-4">{study.roadmap.map(item => <li key={item} className="flex gap-3 text-sm leading-7 text-[#a0aab7]"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A84FF]" />{item}</li>)}</ul></div>
      </Section>
    </div>
  );
}
