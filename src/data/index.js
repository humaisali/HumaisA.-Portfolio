import { image } from "framer-motion/client";

export const personalInfo = {
  name: "Humais Ali",
  roles: ["Full Stack Developer", "AI Engineer", "MERN Stack Dev", "Problem Solver"],
  tagline: "Building AI-Powered Web Experiences",
  bio: "Software Engineering student at UET Mardan with a passion for merging AI with modern web applications. I build fast, intelligent, and beautiful digital products at SkyTech Developers.",
  location: "Mardan, Pakistan",
  email: "humaisali.uetm282@gmail.com",
  university: "UET Mardan",
  degree: "B.Sc. Software Engineering",
  semester: "6th Semester",
  company: "SkyTech Developers",
  github: "https://github.com/humaisali",
  linkedin: "https://www.linkedin.com/in/humaisaliskytechdeveloper",
  leetcode: "https://leetcode.com/u/Humais_Ali/",
};

export const stats = [
  { value: 6, label: "Projects Built", suffix: "+" },
  { value: 3, label: "AI Applications", suffix: "" },
  { value: 1, label: "Freelance Company", suffix: "" },
  { value: 6, label: "Semester", suffix: "th" },
];

export const skills = [
  { name: "React.js",     level: 85, category: "Frontend" },
  { name: "Next.js",      level: 70, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "JavaScript",   level: 85, category: "Frontend" },
  { name: "Node.js",      level: 80, category: "Backend" },
  { name: "Express.js",   level: 80, category: "Backend" },
  { name: "Python",       level: 70, category: "Backend" },
  { name: "MongoDB",      level: 75, category: "Database" },
  { name: "MySQL",        level: 75, category: "Database" },
  { name: "Gemini AI",    level: 85, category: "AI/ML" },
  { name: "TensorFlow",   level: 50, category: "AI/ML" },
  { name: "Git & GitHub", level: 85, category: "Tools" },
];

export const techIcons = [
  "React", "Node.js", "Next.js", "MongoDB", "Python", "Tailwind",
  "Express", "MySQL", "Git", "Gemini AI", "JavaScript", "Vite"
];

export const experience = [
  {
    role: "Full Stack Developer",
    company: "SkyTech Developers",
    period: "2024 - Present",
    type: "Freelance",
    color: "#0A84FF",
    description: "Building full-stack web apps and AI-powered tools for clients. Handling everything from UI design to backend APIs and AI integrations.",
    techs: ["React", "Node.js", "Tailwind", "MongoDB", "Gemini AI"],
  },
  {
    role: "B.Sc. Software Engineering",
    company: "UET Mardan",
    period: "2022 - Present",
    type: "University",
    color: "#00D4FF",
    description: "6th semester student studying DSA, Machine Learning, Web Engineering, Software Project Management, and Software Quality Engineering.",
    techs: ["DSA", "Machine Learning", "Web Engineering", "Databases", "OOP"],
  },
];

export const projects = [
  {
    title: "AI Career Coach",
    description: "Analyzes GitHub profiles, portfolios, and resumes - delivering honest recruiter-level career insights powered by Gemini 2.5 Flash.",
    techs: ["React", "Node.js", "Gemini AI", "Tailwind", "pdf-parse"],
    github: "https://github.com/humaisali/AI-Career-Coach",
    live: "",
    category: "AI",
    featured: true,
    gradient: "from-[#0A84FF] to-[#7B61FF]",
    image: "/ai-career-coach.png",
  },
  {
    title: "AI Study Assistant",
    description: "Upload study documents and get AI-generated explanations, summaries, and interactive quizzes. Supports PDF, TXT, MD & PPTX.",
    techs: ["React", "Node.js", "Gemini AI", "Multer", "pdf-parse"],
    github: "https://github.com/humaisali/AI-Study-Assitent",
    live: "https://ai-study-assistant-ashy.vercel.app/",
    category: "AI",
    featured: true,
    gradient: "from-[#00D4FF] to-[#0A84FF]",
    image: "/ai-study-assistant.png",
  },
  {
    title: "PostCraft - AI LinkedIn Post Generator",
    description: "Full-stack AI-powered app that generates professional LinkedIn posts, hook variations, and hashtags from a short project description. Built with Gemini 2.5 Flash.",
    techs: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "Gemini AI"],
    github: "",
    live: "",
    category: "AI",
    featured: true,
    gradient: "from-[#4f7cff] to-[#00c6ff]",
    image: "/postcraft.png",
  },
  {
    title: "CodeSage",
    description: "Paste any code snippet and instantly get step-by-step explanations, bug detection with severity ratings, and optimization analysis.",
    techs: ["React", "Tailwind","Node.js", "Gemini AI", "Express"],
    github: "https://github.com/humaisali/CodeSage-AI-Code-Explainer",
    live: "",
    category: "AI",
    featured: true,
    gradient: "from-[#7B61FF] to-[#00D4FF]",
    image: "/codesage.png",
  },
  {
    title: "GitHub DevFinder",
    description: "Search any GitHub username and view a full analytics dashboard with language charts, stars, contribution heatmap, and activity.",
    techs: ["React", "Vite", "Tailwind", "Recharts", "GitHub API"],
    github: "https://github.com/humaisali/GitHub-DevFinder",
    live: "https://github-devfinder-opal.vercel.app/",
    category: "Frontend",
    featured: false,
    gradient: "from-[#0A84FF] to-[#00D4FF]",
    image: "/github-devfinder.png",
  },
  {
    title: "Fida Hussain Portfolio",
    description: "Clean, responsive personal portfolio website built for a client under SkyTech Developers using React and Tailwind CSS.",
    techs: ["React", "Vite", "Tailwind","framer-motion","emailjs-com"],
    github: "https://github.com/humaisali/Fida-Hussain-Portfolio",
    live: "https://fida-hussain-portoflio.vercel.app/",
    category: "Frontend",
    featured: false,
    gradient: "from-[#00D4FF] to-[#7B61FF]",
    image: "/fida-hussain-portfolio.png",
  },
];
