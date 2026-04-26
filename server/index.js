import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes       from "./routes/auth.js";
import personalRoutes   from "./routes/personal.js";
import skillsRoutes     from "./routes/skills.js";
import experienceRoutes from "./routes/experience.js";
import projectsRoutes   from "./routes/projects.js";
import messagesRoutes   from "./routes/messages.js";

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:5173",   // Vite dev server
    "http://localhost:4173",   // Vite preview
    "https://humaissoftneer.vercel.app", // production portfolio
  ],
  credentials: true,
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth",       authRoutes);
app.use("/api/personal",   personalRoutes);
app.use("/api/skills",     skillsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/projects",   projectsRoutes);
app.use("/api/messages",   messagesRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Humais Portfolio API is running 🚀" });
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// ── Stats endpoint (dashboard overview) ──────────────────────────────────────
app.get("/api/stats", async (req, res) => {
  try {
    const [projects, skills, experience, messages, unread] = await Promise.all([
      mongoose.model("Project").countDocuments(),
      mongoose.model("Skill").countDocuments(),
      mongoose.model("Experience").countDocuments(),
      mongoose.model("Message").countDocuments(),
      mongoose.model("Message").countDocuments({ read: false }),
    ]);
    res.json({ projects, skills, experience, messages, unread });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── MongoDB connection ────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 API docs:`);
      console.log(`   POST   /api/auth/login`);
      console.log(`   GET    /api/personal`);
      console.log(`   GET    /api/projects`);
      console.log(`   GET    /api/skills`);
      console.log(`   GET    /api/experience`);
      console.log(`   GET    /api/messages  (auth)`);
      console.log(`   GET    /api/stats`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
