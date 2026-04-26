import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  level:    { type: Number, required: true, min: 0, max: 100 },
  category: {
    type: String,
    required: true,
    enum: ["Frontend", "Backend", "Database", "AI/ML", "Tools"],
  },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);
