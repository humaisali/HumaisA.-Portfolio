import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiLinkedin, FiGithub, FiSend, FiArrowUpRight } from "react-icons/fi";
import { personalInfo } from "../data/index";

export default function Contact() {
  var [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  var [status, setStatus] = useState("");

  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    setForm(function(prev) {
      var next = { name: prev.name, email: prev.email, subject: prev.subject, message: prev.message };
      next[name] = value;
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(function() {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(function() { setStatus(""); }, 4000);
    }, 1500);
  }

  var inputClass = "w-full bg-[#0D1117] border border-[#30363D] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A84FF] transition-colors duration-200 placeholder-[#8B949E] font-mono";

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
              <p className="text-[#8B949E] leading-relaxed text-sm">
                I'm open to internships, freelance projects, collaborations, and interesting conversations about AI and web development.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { icon: FiMail,     label: "Email",    value: personalInfo.email, href: "mailto:" + personalInfo.email },
                { icon: FiMapPin,   label: "Location", value: personalInfo.location, href: "#" },
                { icon: FiLinkedin, label: "LinkedIn", value: "humaisaliskytechdeveloper", href: personalInfo.linkedin },
                { icon: FiGithub,   label: "GitHub",   value: "humaisali", href: personalInfo.github },
              ].map(function(item) {
                var Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 sm:p-4 rounded-lg glass border border-[#30363D]/50 hover:border-[#0A84FF]/30 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 bg-[#0A84FF]/10 border border-[#0A84FF]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A84FF]/20 transition-colors duration-200">
                      <Icon size={15} className="text-[#0A84FF]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#8B949E] text-xs font-mono uppercase tracking-wider">{item.label}</p>
                      <p className="text-white text-xs sm:text-sm font-medium truncate group-hover:text-[#0A84FF] transition-colors duration-200">{item.value}</p>
                    </div>
                    <FiArrowUpRight size={13} className="text-[#30363D] group-hover:text-[#0A84FF] ml-auto flex-shrink-0 transition-colors duration-200" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass grad-border rounded-xl p-5 sm:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8B949E] text-xs font-mono uppercase tracking-wider mb-2 block">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-[#8B949E] text-xs font-mono uppercase tracking-wider mb-2 block">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-[#8B949E] text-xs font-mono uppercase tracking-wider mb-2 block">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="Project / Opportunity / Collab" className={inputClass} />
                </div>
                <div>
                  <label className="text-[#8B949E] text-xs font-mono uppercase tracking-wider mb-2 block">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell me about your idea..." className={inputClass + " resize-none"} />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-md font-semibold text-white bg-[#0A84FF] hover:bg-[#0066CC] disabled:opacity-60 transition-all duration-200"
                >
                  <FiSend size={15} />
                  {status === "sending" ? "Sending..." : "Send Message"}
                </motion.button>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm text-center font-mono"
                  >
                    Message sent! I'll get back to you soon.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
