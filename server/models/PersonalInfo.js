import mongoose from "mongoose";

const personalInfoSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  roles:      [String],
  tagline:    { type: String },
  bio:        { type: String },
  aboutText:  [String], // paragraphs for About section
  location:   { type: String },
  email:      { type: String },
  university: { type: String },
  degree:     { type: String },
  semester:   { type: String },
  company:    { type: String },
  github:     { type: String },
  linkedin:   { type: String },
  leetcode:   { type: String },
  available:  { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("PersonalInfo", personalInfoSchema);
