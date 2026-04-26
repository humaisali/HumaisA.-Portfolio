import express from "express";
import Project from "../models/Project.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET /api/projects — public
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/projects/:id — public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/projects — admin only
router.post("/", authMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/projects/:id — admin only
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/projects/:id — admin only
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/projects/seed — seed initial projects
router.post("/seed", authMiddleware, async (req, res) => {
  try {
    const count = await Project.countDocuments();
    if (count > 0) return res.status(400).json({ message: "Already seeded" });

    await Project.insertMany([
      {
        title: "AI Career Coach",
        description: "Analyzes GitHub profiles, portfolios, and resumes — delivering honest recruiter-level career insights powered by Gemini 2.5 Flash.",
        techs: ["React", "Node.js", "Gemini AI", "Tailwind", "pdf-parse"],
        github: "https://github.com/humaisali/AI-Career-Coach",
        live: "",
        category: "AI",
        featured: true,
        image: "/ai-career-coach.png",
        order: 0,
      },
      {
        title: "AI Study Assistant",
        description: "Upload study documents and get AI-generated explanations, summaries, and interactive quizzes. Supports PDF, TXT, MD & PPTX.",
        techs: ["React", "Node.js", "Gemini AI", "Multer", "pdf-parse"],
        github: "https://github.com/humaisali/AI-Study-Assitent",
        live: "https://ai-study-assistant-ashy.vercel.app/",
        category: "AI",
        featured: true,
        image: "/ai-study-assistant.png",
        order: 1,
      },
      {
        title: "PostCraft - AI LinkedIn Post Generator",
        description: "Full-stack AI-powered app that generates professional LinkedIn posts, hook variations, and hashtags from a short project description.",
        techs: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "Gemini AI"],
        github: "",
        live: "",
        category: "AI",
        featured: true,
        image: "/postcraft.png",
        order: 2,
      },
      {
        title: "CodeSage",
        description: "Paste any code snippet and instantly get step-by-step explanations, bug detection with severity ratings, and optimization analysis.",
        techs: ["React", "Tailwind", "Node.js", "Gemini AI", "Express"],
        github: "https://github.com/humaisali/CodeSage-AI-Code-Explainer",
        live: "",
        category: "AI",
        featured: true,
        image: "/codesage.png",
        order: 3,
      },
      {
        title: "GitHub DevFinder",
        description: "Search any GitHub username and view a full analytics dashboard with language charts, stars, contribution heatmap, and activity.",
        techs: ["React", "Vite", "Tailwind", "Recharts", "GitHub API"],
        github: "https://github.com/humaisali/GitHub-DevFinder",
        live: "https://github-devfinder-opal.vercel.app/",
        category: "Frontend",
        featured: false,
        image: "/github-devfinder.png",
        order: 4,
      },
      {
        title: "Fida Hussain Portfolio",
        description: "Clean, responsive personal portfolio website built for a client under SkyTech Developers using React and Tailwind CSS.",
        techs: ["React", "Vite", "Tailwind", "framer-motion", "emailjs-com"],
        github: "https://github.com/humaisali/Fida-Hussain-Portfolio",
        live: "https://fida-hussain-portoflio.vercel.app/",
        category: "Frontend",
        featured: false,
        image: "/fida-hussain-portfolio.png",
        order: 5,
      },
    ]);
    res.json({ message: "Projects seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
