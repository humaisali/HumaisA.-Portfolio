import express from "express";
import Skill from "../models/Skill.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET /api/skills — public
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/skills — admin only
router.post("/", authMiddleware, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/skills/:id — admin only
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json(skill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/skills/:id — admin only
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/skills/seed — seed initial skills
router.post("/seed", authMiddleware, async (req, res) => {
  try {
    const count = await Skill.countDocuments();
    if (count > 0) return res.status(400).json({ message: "Already seeded" });

    const initialSkills = [
      { name: "React.js",     level: 85, category: "Frontend", order: 0 },
      { name: "Next.js",      level: 70, category: "Frontend", order: 1 },
      { name: "Tailwind CSS", level: 90, category: "Frontend", order: 2 },
      { name: "JavaScript",   level: 85, category: "Frontend", order: 3 },
      { name: "Node.js",      level: 80, category: "Backend",  order: 0 },
      { name: "Express.js",   level: 80, category: "Backend",  order: 1 },
      { name: "Python",       level: 70, category: "Backend",  order: 2 },
      { name: "MongoDB",      level: 75, category: "Database", order: 0 },
      { name: "MySQL",        level: 75, category: "Database", order: 1 },
      { name: "Gemini AI",    level: 85, category: "AI/ML",    order: 0 },
      { name: "TensorFlow",   level: 50, category: "AI/ML",    order: 1 },
      { name: "Git & GitHub", level: 85, category: "Tools",    order: 0 },
    ];
    await Skill.insertMany(initialSkills);
    res.json({ message: "Skills seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
