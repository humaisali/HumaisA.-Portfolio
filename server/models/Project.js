import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  techs:       [String],
  github:      { type: String, default: "" },
  live:        { type: String, default: "" },
  category:    { type: String, required: true, enum: ["AI", "Frontend", "Backend", "Fullstack"] },
  featured:    { type: Boolean, default: false },
  image:       { type: String, default: "" },
  gradient:    { type: String, default: "from-[#0A84FF] to-[#00D4FF]" },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
