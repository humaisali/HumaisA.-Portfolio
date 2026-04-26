import express from "express";
import Message from "../models/Message.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// POST /api/messages — public (contact form submission)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/messages — admin only (inbox)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/messages/stats — admin only
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const total   = await Message.countDocuments();
    const unread  = await Message.countDocuments({ read: false });
    const replied = await Message.countDocuments({ replied: true });
    res.json({ total, unread, replied });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/messages/:id/read — mark as read
router.patch("/:id/read", authMiddleware, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/messages/:id/replied — mark as replied
router.patch("/:id/replied", authMiddleware, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { replied: true, read: true }, { new: true });
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/messages/:id — admin only
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
