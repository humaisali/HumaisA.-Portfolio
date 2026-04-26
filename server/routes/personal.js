import express from "express";
import PersonalInfo from "../models/PersonalInfo.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET /api/personal — public (portfolio reads this)
router.get("/", async (req, res) => {
  try {
    let info = await PersonalInfo.findOne();
    if (!info) return res.status(404).json({ message: "No personal info found" });
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/personal — admin only
router.put("/", authMiddleware, async (req, res) => {
  try {
    let info = await PersonalInfo.findOne();
    if (!info) {
      info = new PersonalInfo(req.body);
    } else {
      Object.assign(info, req.body);
    }
    await info.save();
    res.json(info);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/personal/seed — seed initial data (run once)
router.post("/seed", authMiddleware, async (req, res) => {
  try {
    const existing = await PersonalInfo.findOne();
    if (existing) return res.status(400).json({ message: "Already seeded" });

    const info = new PersonalInfo({
      name:       "Humais Ali",
      roles:      ["Full Stack Developer", "AI Engineer", "MERN Stack Dev", "Problem Solver"],
      tagline:    "Building AI-Powered Web Experiences",
      bio:        "Software Engineering student at UET Mardan with a passion for merging AI with modern web applications. I build fast, intelligent, and beautiful digital products at SkyTech Developers.",
      aboutText:  [
        "I'm a 6th Semester Software Engineering student at UET Mardan, working at the intersection of artificial intelligence and modern web development.",
        "At SkyTech Developers, I've built and shipped multiple AI-powered full-stack applications — from code explainers to career coaching tools — all using React, Node.js, and Google's Gemini API.",
        "When I'm not building, I'm grinding DSA on LeetCode, exploring ML research, or helping clients bring their digital ideas to life."
      ],
      location:   "Mardan, Pakistan",
      email:      "humaisali.uetm282@gmail.com",
      university: "UET Mardan",
      degree:     "B.Sc. Software Engineering",
      semester:   "6th Semester",
      company:    "SkyTech Developers",
      github:     "https://github.com/humaisali",
      linkedin:   "https://www.linkedin.com/in/humaisaliskytechdeveloper",
      leetcode:   "https://leetcode.com/u/Humais_Ali/",
      available:  true,
    });
    await info.save();
    res.json({ message: "Seeded successfully", info });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
