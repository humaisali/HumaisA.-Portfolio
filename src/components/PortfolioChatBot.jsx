import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiUser, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { BsStars } from "react-icons/bs";

var SYSTEM_PROMPT = `You are Humais Ali's personal portfolio assistant. Your ONLY job is to answer questions about Humais Ali - his skills, projects, education, experience, and how to contact him. You are friendly, concise, and professional.

Here is everything you know about Humais:

PERSONAL INFO:
- Full name: Humais Ali
- Location: Mardan, Pakistan
- Email: humaisali.uetm282@gmail.com
- GitHub: https://github.com/humaisali
- LinkedIn: https://www.linkedin.com/in/humaisaliskytechdeveloper
- LeetCode: https://leetcode.com/u/Humais_Ali/
- Tagline: "Building AI-Powered Web Experiences"

EDUCATION:
- University: UET Mardan (University of Engineering and Technology, Mardan)
- Degree: B.Sc. Software Engineering
- Currently in 6th Semester (2022 – Present)
- Subjects: Data Structures & Algorithms (DSA), Machine Learning, Web Engineering, Software Project Management, Software Quality Engineering, Databases, OOP

WORK EXPERIENCE:
- Role: Full Stack Developer at SkyTech Developers (Freelance) - 2024 to Present
- Builds full-stack web apps and AI-powered tools for clients
- Handles everything from UI design to backend APIs and AI integrations

TECHNICAL SKILLS:
- Frontend: React.js (85%), Next.js (70%), Tailwind CSS (90%), JavaScript (85%)
- Backend: Node.js (80%), Express.js (80%), Python (70%)
- Databases: MongoDB (75%), MySQL (75%)
- AI/ML: Gemini AI (85%), TensorFlow (50%)
- Tools: Git & GitHub (85%)
- Stack short: MERN, Next.js, Python, Gemini AI

PROJECTS (always include the GitHub and Live links when mentioning any project):

1. AI Career Coach
   - Description: Analyzes GitHub profiles, portfolios, and resumes using Gemini 2.5 Flash for recruiter-level career insights.
   - Stack: React, Node.js, Gemini AI, Tailwind, pdf-parse
   - GitHub: https://github.com/humaisali/AI-Career-Coach
   - Live: Not deployed yet

2. AI Study Assistant
   - Description: Upload study documents (PDF, TXT, MD, PPTX) and get AI-generated explanations, summaries, and quizzes.
   - Stack: React, Node.js, Gemini AI, Multer, pdf-parse
   - GitHub: https://github.com/humaisali/AI-Study-Assitent
   - Live: https://ai-study-assistant-ashy.vercel.app/

3. PostCraft - AI LinkedIn Post Generator
   - Description: Generates professional LinkedIn posts, hook variations, and hashtags from a short project description using Gemini 2.5 Flash.
   - Stack: React, Vite, Tailwind, Node.js, Express, Gemini AI
   - GitHub: Not public
   - Live: Not deployed yet

4. CodeSage - AI Code Explainer
   - Description: Paste any code snippet and get step-by-step explanations, bug detection with severity ratings, and optimization analysis.
   - Stack: React, Tailwind, Node.js, Gemini AI, Express
   - GitHub: https://github.com/humaisali/CodeSage-AI-Code-Explainer
   - Live: Not deployed yet

5. GitHub DevFinder
   - Description: Search any GitHub username and view analytics dashboard with language charts, stars, contribution heatmap, and activity.
   - Stack: React, Vite, Tailwind, Recharts, GitHub API
   - GitHub: https://github.com/humaisali/GitHub-DevFinder
   - Live: https://github-devfinder-opal.vercel.app/

6. Fida Hussain Portfolio
   - Description: Clean, responsive personal portfolio built for a client under SkyTech Developers.
   - Stack: React, Vite, Tailwind, Framer Motion, EmailJS
   - GitHub: https://github.com/humaisali/Fida-Hussain-Portfolio
   - Live: https://fida-hussain-portoflio.vercel.app/

AVAILABILITY:
- Open to internships, freelance work, and collaborations
- Interested in AI + web development opportunities

RULES YOU MUST FOLLOW:
1. Only answer questions about Humais Ali and his portfolio. If someone asks anything unrelated, respond with: "I'm here to answer questions about Humais Ali and his work. Please ask me something related to Humais - his skills, projects, experience, or how to contact him! 😊"
2. Keep answers short and helpful - 2 to 5 sentences max unless listing items.
3. Be warm and conversational, not robotic.
4. CRITICAL - PROJECTS RULE: Whenever you mention ANY project by name, you MUST always include its GitHub link on the same line right after the project name, like this format: "Project Name - https://github.com/..." and if it has a live link, include that too. Never mention a project without its link. Even if the user only asks about one project, give both GitHub and Live links if available.
5. When mentioning contact info, emails, GitHub, LinkedIn or any live/GitHub links - always write the full URL so it renders as a clickable link.
6. Never make up information not listed above.
7. If a project has no public GitHub or no live link, say so honestly (e.g. "not deployed yet" or "private repo").`;

var GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
var GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
  GEMINI_API_KEY;

var SUGGESTIONS = [
  "What projects has he built?",
  "What's his tech stack?",
  "How can I hire him?",
  "Tell me about his AI projects",
];

// ─── Splits bot text into plain strings + clickable <a> elements ─────────────
function renderMessageContent(text) {
  var TOKEN_RE = /(https?:\/\/[^\s)\]]+)|([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g;
  var parts = [];
  var last = 0;
  var match;

  while ((match = TOKEN_RE.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }

    var raw = match[0];
    var isEmail = !raw.startsWith("http");
    var href = isEmail ? "mailto:" + raw : raw;

    parts.push(
      <a
        key={match.index}
        href={href}
        target={isEmail ? "_self" : "_blank"}
        rel="noreferrer"
        className="inline-flex items-center gap-0.5 font-semibold text-[#0A84FF] hover:text-[#00D4FF] underline underline-offset-2 decoration-[#0A84FF]/40 hover:decoration-[#00D4FF] transition-colors duration-150 break-all"
      >
        {raw}
        {!isEmail && <FiExternalLink size={10} className="flex-shrink-0 ml-0.5 mt-px" />}
      </a>
    );

    last = match.index + raw.length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts;
}

// ─── Single message bubble ────────────────────────────────────────────────────
function Message(props) {
  var msg = props.msg;
  var isBot = msg.role === "assistant";
  var isNew = props.isNew !== false; // Default to true if not specified

  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 15, scale: 0.95 } : { opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
      className={"flex gap-3 " + (isBot ? "flex-row" : "flex-row-reverse")}
    >
      <div className={"w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg " +
        (isBot ? "bg-gradient-to-br from-[#0A84FF]/30 to-[#00D4FF]/10 border border-[#0A84FF]/40 shadow-[0_0_15px_rgba(10,132,255,0.2)]" : "bg-[#21262D] border border-[#30363D]")}>
        {isBot
          ? <RiRobot2Line size={16} className="text-[#0A84FF]" />
          : <FiUser size={14} className="text-[#8B949E]" />
        }
      </div>

      {isBot ? (
        // AI Premium Bubble (Gradient Border effect)
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm p-[1px] bg-gradient-to-br from-[#30363D]/80 via-[#30363D]/20 to-[#0A84FF]/30">
          <div className="w-full h-full bg-[#161B22]/95 backdrop-blur-md rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed text-[#E6EDF3]">
            {renderMessageContent(msg.content)}
          </div>
        </div>
      ) : (
        // User Premium Bubble (Glowing Blue)
        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed bg-[#0A84FF] text-white shadow-[0_0_15px_rgba(10,132,255,0.35)] font-medium">
          {msg.content}
        </div>
      )}
    </motion.div>
  );
}

// ─── Dynamic Breathing Typing Indicator ───────────────────────────────────────
function TypingIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex gap-3 flex-row"
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-br from-[#0A84FF]/30 to-[#00D4FF]/10 border border-[#0A84FF]/40 shadow-[0_0_15px_rgba(10,132,255,0.2)]">
        <BsStars size={14} className="text-[#0A84FF] animate-pulse" />
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm p-[1px] bg-gradient-to-br from-[#30363D]/80 via-[#30363D]/20 to-[#0A84FF]/30">
        <div className="bg-[#161B22]/95 backdrop-blur-md rounded-2xl rounded-tl-sm px-4 py-4 flex items-center gap-1.5 h-full">
          {[0, 1, 2].map(function(i) {
            return (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#0A84FF]"
                animate={{ 
                  y: [0, -4, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PortfolioChatBot() {
  var [open, setOpen] = useState(false);
  var [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! 👋 I'm Humais's portfolio assistant. Ask me anything about his skills, projects, experience, or how to get in touch!",
    },
  ]);
  var [input, setInput] = useState("");
  var [loading, setLoading] = useState(false);
  var [showSuggestions, setShowSuggestions] = useState(true);
  var bottomRef = useRef(null);
  var inputRef = useRef(null);

  useEffect(function() {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  useEffect(function() {
    if (open && inputRef.current) {
      setTimeout(function() { inputRef.current.focus(); }, 300);
    }
  }, [open]);

  function clearChat() {
    setMessages([{
      role: "assistant",
      content: "Hey! 👋 I'm Humais's portfolio assistant. Ask me anything about his skills, projects, experience, or how to get in touch!",
    }]);
    setShowSuggestions(true);
    setInput("");
  }

  async function sendMessage(text) {
    var userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setShowSuggestions(false);
    setMessages(function(prev) {
      return prev.concat({ role: "user", content: userText });
    });
    setLoading(true);

    try {
      var history = messages.concat({ role: "user", content: userText });

      var contents = history.map(function(m) {
        return {
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        };
      });

      var response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: contents,
          generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
        }),
      });

      var data = await response.json();
      var reply =
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text
          ? data.candidates[0].content.parts[0].text
          : "Sorry, I couldn't get a response right now. Please try again!";

      setMessages(function(prev) {
        return prev.concat({ role: "assistant", content: reply });
      });
    } catch (err) {
      setMessages(function(prev) {
        return prev.concat({
          role: "assistant",
          content: "Something went wrong. Please try again in a moment!",
        });
      });
    }

    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <style>{`
        @keyframes gradientX {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bg-neural {
          background: linear-gradient(-45deg, rgba(10,132,255,0.25), rgba(0,212,255,0.1), rgba(10,132,255,0.25));
          background-size: 400% 400%;
          animation: gradientX 8s ease infinite;
        }

        /* VengeanceButton toggle styles */
        .chatbot-toggle {
          --highlight-hue: 210deg;
          position: fixed;
          bottom: 1.5rem;
          right: 1.25rem;
          z-index: 200;
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background-color: #101010;
          border: solid 1px rgba(10, 132, 255, 0.2);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e8e8e8;
          padding: 0;

          box-shadow:
            inset 0px 1px 1px rgba(10, 132, 255, 0.2),
            inset 0px 2px 2px rgba(10, 132, 255, 0.15),
            inset 0px 4px 4px rgba(10, 132, 255, 0.1),
            inset 0px 8px 8px rgba(10, 132, 255, 0.05),
            inset 0px 16px 16px rgba(10, 132, 255, 0.05),
            0px -1px 1px rgba(0, 0, 0, 0.02),
            0px -2px 2px rgba(0, 0, 0, 0.03),
            0px -4px 4px rgba(0, 0, 0, 0.05),
            0px -8px 8px rgba(0, 0, 0, 0.06),
            0px -16px 16px rgba(0, 0, 0, 0.08);

          transition: box-shadow 0.4s, border 0.4s, background-color 0.4s;
        }
        @media (min-width: 640px) {
          .chatbot-toggle {
            bottom: 2rem;
            right: 2rem;
          }
        }

        .chatbot-toggle::before {
          content: "";
          position: absolute;
          top: -4px;
          left: -4px;
          width: calc(100% + 8px);
          height: calc(100% + 8px);
          border-radius: 20px;
          pointer-events: none;
          background-image: linear-gradient(0deg, rgba(0,0,0,0.267), rgba(0,0,0,0.667));
          z-index: -1;
          transition: box-shadow 0.4s;
          box-shadow: 0 -8px 8px -6px rgba(0,0,0,0) inset,
            0 -16px 16px -8px rgba(0,0,0,0) inset,
            1px 1px 1px rgba(10, 132, 255, 0.133),
            2px 2px 2px rgba(10, 132, 255, 0.067),
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }

        .chatbot-toggle::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
          background-image: linear-gradient(
            0deg,
            #fff,
            hsl(var(--highlight-hue), 100%, 70%),
            hsla(var(--highlight-hue), 100%, 70%, 50%),
            8%,
            transparent
          );
          opacity: 0;
          transition: opacity 0.4s;
        }

        .chatbot-toggle:hover {
          border: solid 1px hsla(var(--highlight-hue), 100%, 80%, 40%);
        }
        .chatbot-toggle:hover::before {
          box-shadow: 0 -8px 8px -6px rgba(10, 132, 255, 0.667) inset,
            0 -16px 16px -8px hsla(var(--highlight-hue), 100%, 70%, 30%) inset,
            1px 1px 1px rgba(10, 132, 255, 0.133),
            2px 2px 2px rgba(10, 132, 255, 0.067),
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        .chatbot-toggle:hover::after {
          opacity: 1;
          mask-image: linear-gradient(0deg, #fff, transparent);
        }
        .chatbot-toggle:hover .chatbot-toggle-icon {
          color: #fff;
          filter: drop-shadow(0 0 3px hsl(var(--highlight-hue), 100%, 70%));
        }

        .chatbot-toggle:active {
          border: solid 1px hsla(var(--highlight-hue), 100%, 80%, 70%);
          background-color: hsla(var(--highlight-hue), 50%, 20%, 0.5);
        }
        .chatbot-toggle:active::before {
          box-shadow: 0 -8px 12px -6px rgba(10, 132, 255, 0.667) inset,
            0 -16px 16px -8px hsla(var(--highlight-hue), 100%, 70%, 80%) inset,
            1px 1px 1px rgba(10, 132, 255, 0.267),
            2px 2px 2px rgba(10, 132, 255, 0.133),
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        .chatbot-toggle:active::after {
          opacity: 1;
          mask-image: linear-gradient(0deg, #fff, transparent);
          filter: brightness(200%);
        }

        .chatbot-toggle-icon {
          color: rgba(255,255,255,0.7);
          filter: drop-shadow(0 0 2px rgba(10, 132, 255, 0.6));
          transition: color 0.4s, filter 0.4s;
        }

        .chatbot-toggle-pulse {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          border: 2px solid rgba(10, 132, 255, 0.5);
          pointer-events: none;
        }
      `}</style>

      {/* ── Floating toggle button ── */}
      <button
        onClick={function() { setOpen(function(p) { return !p; }); }}
        className="chatbot-toggle"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="chatbot-toggle-icon">
                <FiX size={22} />
              </motion.span>
            : <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="chatbot-toggle-icon">
                <FiMessageSquare size={20} />
              </motion.span>
          }
        </AnimatePresence>
        {!open && (
          <motion.span
            className="chatbot-toggle-pulse"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
      </button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:bottom-28 sm:right-8 z-[199] flex flex-col"
            style={{
              width: "min(400px, calc(100vw - 32px))",
              height: "min(560px, calc(100vh - 160px))",
            }}
          >
            <div
              className="flex flex-col h-full rounded-2xl overflow-hidden border border-[#30363D]/70 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
              style={{ background: "rgba(13, 17, 23, 0.95)", backdropFilter: "blur(24px)" }}
            >
              {/* Animated Neural Header */}
              <div className="relative flex items-center justify-between px-5 py-4 border-b border-[#30363D]/60 flex-shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-neural" />
                
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#161B22] border border-[#0A84FF]/50 shadow-[0_0_15px_rgba(10,132,255,0.3)] flex items-center justify-center flex-shrink-0">
                    <RiRobot2Line size={20} className="text-[#0A84FF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-[15px] tracking-wide leading-none mb-1">Humais's AI</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)] animate-pulse" />
                      <span className="text-[#8B949E] text-[11px] uppercase tracking-widest font-semibold font-mono">Online</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-1">
                  {messages.length > 1 && (
                    <button
                      onClick={clearChat}
                      className="text-[#8B949E] hover:text-[#ff4444] hover:bg-[#ff4444]/10 transition-colors bg-transparent border-none cursor-pointer p-2 rounded-lg"
                      title="Clear Chat"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={function() { setOpen(false); }}
                    className="text-[#8B949E] hover:text-white hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer p-2 rounded-lg"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>

              {/* Messages scroll area */}
              <div className="flex flex-col flex-1 gap-4 px-5 py-5 overflow-y-auto chatbot-messages">
                {messages.map(function(msg, i) {
                  return <Message key={i} msg={msg} isNew={i === messages.length - 1} />;
                })}
                
                <AnimatePresence>
                  {loading && <TypingIndicator />}
                </AnimatePresence>

                {/* Interactive Neon Suggestions */}
                {showSuggestions && messages.length === 1 && !loading && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                    }}
                    className="flex flex-wrap gap-2.5 mt-2"
                  >
                    <div className="w-full mb-1">
                      <p className="text-[#8B949E] text-xs font-mono flex items-center gap-1.5 px-1">
                        <BsStars className="text-[#0A84FF]" /> Suggested questions
                      </p>
                    </div>
                    {SUGGESTIONS.map(function(s) {
                      return (
                        <motion.button
                          key={s}
                          variants={{
                            hidden: { opacity: 0, scale: 0.8, y: 10 },
                            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
                          }}
                          onClick={function() { sendMessage(s); }}
                          className="px-4 py-2 rounded-full border border-[#0A84FF]/30 bg-[#0A84FF]/5 text-xs font-medium text-[#E6EDF3] hover:bg-[#0A84FF]/20 hover:border-[#0A84FF] hover:shadow-[0_0_15px_rgba(10,132,255,0.2)] transition-all duration-300 cursor-pointer"
                        >
                          {s}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input bar */}
              <div className="px-4 pb-4 pt-3 border-t border-[#30363D]/60 flex-shrink-0 bg-[#0d1117]/80">
                <div className="flex items-end gap-2 bg-[#161B22] border border-[#30363D] rounded-xl px-3 py-2.5 shadow-inner focus-within:border-[#0A84FF]/50 focus-within:shadow-[0_0_15px_rgba(10,132,255,0.15)] transition-all duration-300">
                  <textarea
                    ref={inputRef}
                    rows="1"
                    value={input}
                    onChange={function(e) { 
                      setInput(e.target.value); 
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Humais..."
                    className="flex-1 bg-transparent text-white text-sm placeholder-[#8B949E] outline-none font-mono min-w-0 resize-none overflow-y-auto py-1"
                    style={{ minHeight: "24px", maxHeight: "72px" }}
                    disabled={loading}
                  />
                  <button
                    onClick={function() { sendMessage(); }}
                    disabled={!input.trim() || loading}
                    className="w-8 h-8 rounded-lg bg-[#0A84FF] flex items-center justify-center flex-shrink-0 border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#00D4FF] hover:shadow-[0_0_10px_rgba(10,132,255,0.4)] transition-all duration-300"
                  >
                    <FiSend size={14} className="text-white ml-0.5" />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-2.5">
                  <BsStars size={10} className="text-[#0A84FF]" />
                  <p className="text-[#8B949E] text-[10px] font-mono tracking-wide uppercase">
                    Powered by Gemini 2.5 Flash
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
