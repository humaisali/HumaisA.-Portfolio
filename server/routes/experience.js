import express from "express";
import Experience from "../models/Experience.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET /api/experience — public
router.get("/", async (req, res) => {
  try {
    const experience = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/experience — admin only
router.post("/", authMiddleware, async (req, res) => {
  try {
    const entry = new Experience(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/experience/:id — admin only
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const entry = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!entry) return res.status(404).json({ message: "Experience not found" });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/experience/:id — admin only
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const entry = await Experience.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: "Experience not found" });
    res.json({ message: "Experience entry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/experience/seed
router.post("/seed", authMiddleware, async (req, res) => {
  try {
    const count = await Experience.countDocuments();
    if (count > 0) return res.status(400).json({ message: "Already seeded" });

    await Experience.insertMany([
      {
        role:        "Full Stack Developer",
        company:     "SkyTech Developers",
        period:      "2024 — Present",
        type:        "Freelance",
        description: "Building full-stack web apps and AI-powered tools for clients. Handling everything from UI design to backend APIs and AI integrations.",
        techs:       ["React", "Node.js", "Tailwind", "MongoDB", "Gemini AI"],
        order:       0,
      },
      {
        role:        "B.Sc. Software Engineering",
        company:     "UET Mardan",
        period:      "2022 — Present",
        type:        "University",
        description: "6th semester student studying DSA, Machine Learning, Web Engineering, Software Project Management, and Software Quality Engineering.",
        techs:       ["DSA", "Machine Learning", "Web Engineering", "Databases", "OOP"],
        order:       1,
      },
    ]);
    res.json({ message: "Experience seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
