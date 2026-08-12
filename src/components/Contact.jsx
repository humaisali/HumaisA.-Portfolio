import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMapPin, FiLinkedin, FiSend, FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { personalInfo } from "../data/index";
import StaggerText from "./StaggerText";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(""), 4000);
    }, 1500);
  }

  function handleCopyEmail() {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="section relative z-10 overflow-hidden">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] bg-[#0A84FF] rounded-full opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12 sm:mb-20"
        >
          <span className="text-[#0A84FF] font-mono text-xs tracking-[0.3em] uppercase mb-3">Let's build together</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">Get In <span className="gradient-text">Touch</span></h2>
          <div className="w-20 h-1 rounded-full mt-4" style={{ background: "linear-gradient(90deg, #0A84FF, #00D4FF)" }} />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Bento Grid Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Let's create something <span className="gradient-text">amazing</span>
              </h3>
              <p className="text-[#8B949E] leading-relaxed text-sm mb-6">
                <StaggerText delay={0.2} divideBy="word">
                  I'm open to internships, freelance projects, collaborations, and interesting conversations about AI and web development.
                </StaggerText>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Email - Full Width */}
              <div 
                onClick={handleCopyEmail}
                className="col-span-2 group relative overflow-hidden p-6 rounded-2xl glass glass-hover cursor-pointer flex flex-col justify-center"
              >
                <FiMail className="absolute -right-4 -bottom-4 text-[100px] text-[#0A84FF]/5 group-hover:text-[#0A84FF]/10 transition-colors duration-500 transform group-hover:scale-110" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-[#8B949E] text-xs font-mono uppercase tracking-wider mb-1">Email Me</p>
                    <p className="text-white sm:text-lg font-medium group-hover:text-[#0A84FF] transition-colors">{personalInfo.email}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0A84FF]/20 transition-colors">
                    {copied ? <FiCheck size={18} className="text-green-400" /> : <FiCopy size={18} className="text-[#0A84FF]" />}
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="col-span-1 group relative overflow-hidden p-5 rounded-2xl glass glass-hover block"
              >
                <FiLinkedin className="absolute -right-2 -bottom-2 text-[80px] text-[#0A84FF]/5 group-hover:text-[#0A84FF]/10 transition-colors duration-500 transform group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0A84FF]/20 transition-colors mb-3">
                    <FiArrowUpRight size={14} className="text-[#0A84FF]" />
                  </div>
                  <p className="text-[#8B949E] text-[10px] font-mono uppercase tracking-wider mb-0.5">Connect</p>
                  <p className="text-white text-sm font-medium group-hover:text-[#0A84FF] transition-colors truncate">LinkedIn</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a 
                href={personalInfo.whatsapp} 
                target="_blank" 
                rel="noreferrer"
                className="col-span-1 group relative overflow-hidden p-5 rounded-2xl glass glass-hover block"
              >
                <FaWhatsapp className="absolute -right-2 -bottom-2 text-[80px] text-[#0A84FF]/5 group-hover:text-[#25D366]/10 transition-colors duration-500 transform group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors mb-3">
                    <FiArrowUpRight size={14} className="text-[#0A84FF] group-hover:text-[#25D366]" />
                  </div>
                  <p className="text-[#8B949E] text-[10px] font-mono uppercase tracking-wider mb-0.5">Chat</p>
                  <p className="text-white text-sm font-medium group-hover:text-[#25D366] transition-colors truncate">WhatsApp</p>
                </div>
              </a>

              {/* Location - Full Width */}
              <div className="col-span-2 group relative overflow-hidden p-6 rounded-2xl glass flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0A84FF]/10 flex items-center justify-center flex-shrink-0 relative">
                  <div className="absolute inset-0 rounded-full border border-[#0A84FF]/30 animate-[ping_3s_ease-in-out_infinite]" />
                  <div className="absolute inset-2 rounded-full border border-[#0A84FF]/50 animate-[ping_3s_ease-in-out_infinite_1s]" />
                  <FiMapPin size={20} className="text-[#0A84FF]" />
                </div>
                <div>
                  <p className="text-[#8B949E] text-xs font-mono uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white text-sm font-medium">{personalInfo.location}</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Futuristic Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="relative group h-full">
              {/* Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0A84FF]/20 to-[#00D4FF]/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative h-full glass rounded-2xl p-6 sm:p-10">
                <form onSubmit={handleSubmit} className="flex flex-col h-full gap-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    {/* Name Input */}
                    <div className="relative">
                      <input 
                        type="text" 
                        name="name" 
                        id="name"
                        value={form.name} 
                        onChange={handleChange} 
                        required 
                        className="peer w-full bg-transparent border-b border-[#30363D] text-white py-2 focus:outline-none focus:border-transparent transition-colors duration-200 placeholder-transparent"
                        placeholder="Name"
                      />
                      <label 
                        htmlFor="name" 
                        className="absolute left-0 top-2 text-[#8B949E] text-sm cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-[#0A84FF] peer-valid:text-xs peer-valid:-top-4 transition-all duration-200"
                      >
                        Your Name
                      </label>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#0A84FF] peer-focus:w-full transition-all duration-500" />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email" 
                        id="email"
                        value={form.email} 
                        onChange={handleChange} 
                        required 
                        className="peer w-full bg-transparent border-b border-[#30363D] text-white py-2 focus:outline-none focus:border-transparent transition-colors duration-200 placeholder-transparent"
                        placeholder="Email"
                      />
                      <label 
                        htmlFor="email" 
                        className="absolute left-0 top-2 text-[#8B949E] text-sm cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-[#0A84FF] peer-valid:text-xs peer-valid:-top-4 transition-all duration-200"
                      >
                        Your Email
                      </label>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#0A84FF] peer-focus:w-full transition-all duration-500" />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="relative">
                    <input 
                      type="text" 
                      name="subject" 
                      id="subject"
                      value={form.subject} 
                      onChange={handleChange} 
                      required 
                      className="peer w-full bg-transparent border-b border-[#30363D] text-white py-2 focus:outline-none focus:border-transparent transition-colors duration-200 placeholder-transparent"
                      placeholder="Subject"
                    />
                    <label 
                      htmlFor="subject" 
                      className="absolute left-0 top-2 text-[#8B949E] text-sm cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-[#0A84FF] peer-valid:text-xs peer-valid:-top-4 transition-all duration-200"
                    >
                      Subject
                    </label>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#0A84FF] peer-focus:w-full transition-all duration-500" />
                  </div>

                  {/* Message Input */}
                  <div className="relative mt-2 flex-1 flex flex-col">
                    <textarea 
                      name="message" 
                      id="message"
                      value={form.message} 
                      onChange={handleChange} 
                      required 
                      className="peer flex-1 min-h-[120px] w-full bg-transparent border-b border-[#30363D] text-white py-2 focus:outline-none focus:border-transparent transition-colors duration-200 placeholder-transparent resize-none"
                      placeholder="Message"
                    />
                    <label 
                      htmlFor="message" 
                      className="absolute left-0 top-2 text-[#8B949E] text-sm cursor-text peer-focus:text-xs peer-focus:-top-6 peer-focus:text-[#0A84FF] peer-valid:text-xs peer-valid:-top-6 transition-all duration-200"
                    >
                      Tell me about your project...
                    </label>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#0A84FF] peer-focus:w-full transition-all duration-500" />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending" || status === "success"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden w-full sm:w-auto self-end flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#0A84FF] to-[#00D4FF] hover:opacity-90 disabled:opacity-80 transition-all duration-300 shadow-[0_0_20px_rgba(10,132,255,0.4)] mt-auto"
                  >
                    <AnimatePresence mode="wait">
                      {status === "sending" ? (
                        <motion.div
                          key="sending"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </motion.div>
                      ) : status === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="flex items-center gap-2 text-green-300"
                        >
                          <FiCheck size={20} />
                          <span>Message Sent</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="flex items-center gap-2"
                        >
                          <span>Send Message</span>
                          <FiSend size={18} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
