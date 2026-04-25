import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiUser } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

// ─── All knowledge about Humais that the bot can draw from ───────────────────
var SYSTEM_PROMPT = `You are Humais Ali's personal portfolio assistant. Your ONLY job is to answer questions about Humais Ali — his skills, projects, education, experience, and how to contact him. You are friendly, concise, and professional.

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
- Role: Full Stack Developer at SkyTech Developers (Freelance) — 2024 to Present
- Builds full-stack web apps and AI-powered tools for clients
- Handles everything from UI design to backend APIs and AI integrations

TECHNICAL SKILLS:
- Frontend: React.js (85%), Next.js (70%), Tailwind CSS (90%), JavaScript (85%)
- Backend: Node.js (80%), Express.js (80%), Python (70%)
- Databases: MongoDB (75%), MySQL (75%)
- AI/ML: Gemini AI (85%), TensorFlow (50%)
- Tools: Git & GitHub (85%)
- Stack short: MERN, Next.js, Python, Gemini AI

PROJECTS:
1. AI Career Coach — Analyzes GitHub profiles, portfolios, and resumes using Gemini 2.5 Flash for recruiter-level career insights. Stack: React, Node.js, Gemini AI, Tailwind, pdf-parse. GitHub: https://github.com/humaisali/AI-Career-Coach
2. AI Study Assistant — Upload study documents (PDF, TXT, MD, PPTX) and get AI-generated explanations, summaries, and quizzes. Deployed on Vercel. Stack: React, Node.js, Gemini AI, Multer, pdf-parse. GitHub: https://github.com/humaisali/AI-Study-Assitent | Live: https://ai-study-assistant-ashy.vercel.app/
3. PostCraft — AI LinkedIn post generator. Generates professional LinkedIn posts, hook variations, and hashtags from a short project description using Gemini 2.5 Flash. Stack: React, Vite, Tailwind, Node.js, Express, Gemini AI
4. CodeSage — Paste any code snippet and get step-by-step explanations, bug detection with severity ratings, and optimization analysis. Stack: React, Tailwind, Node.js, Gemini AI, Express. GitHub: https://github.com/humaisali/CodeSage-AI-Code-Explainer
5. GitHub DevFinder — Search any GitHub username and view analytics dashboard with language charts, stars, contribution heatmap, and activity. Stack: React, Vite, Tailwind, Recharts, GitHub API. GitHub: https://github.com/humaisali/GitHub-DevFinder | Live: https://github-devfinder-opal.vercel.app/
6. Fida Hussain Portfolio — Clean, responsive personal portfolio built for a client under SkyTech Developers. Stack: React, Vite, Tailwind, Framer Motion, EmailJS. Live: https://fida-hussain-portoflio.vercel.app/

AVAILABILITY:
- Open to internships, freelance work, and collaborations
- Interested in AI + web development opportunities

RULES YOU MUST FOLLOW:
1. Only answer questions about Humais Ali and his portfolio. If someone asks anything unrelated (general programming help, world news, math, etc.), respond with: "I'm here to answer questions about Humais Ali and his work. Please ask me something related to Humais — his skills, projects, experience, or how to contact him! 😊"
2. Keep answers short and helpful — 2 to 5 sentences max unless listing items.
3. Be warm and conversational, not robotic.
4. If asked for contact info, always provide the email and LinkedIn.
5. Never make up information not listed above.`;

// Gemini API config — key read from Vite env var
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

function Message(props) {
  var msg = props.msg;
  var isBot = msg.role === "assistant";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={"flex gap-2.5 " + (isBot ? "flex-row" : "flex-row-reverse")}
    >
      {/* Avatar */}
      <div
        className={
          "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 " +
          (isBot
            ? "bg-[#0A84FF]/20 border border-[#0A84FF]/30"
            : "bg-[#21262D] border border-[#30363D]")
        }
      >
        {isBot ? (
          <RiRobot2Line size={14} className="text-[#0A84FF]" />
        ) : (
          <FiUser size={12} className="text-[#8B949E]" />
        )}
      </div>
      {/* Bubble */}
      <div
        className={
          "max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed " +
          (isBot
            ? "bg-[#161B22] border border-[#30363D]/60 text-[#E6EDF3] rounded-tl-sm"
            : "bg-[#0A84FF] text-white rounded-tr-sm")
        }
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-[#0A84FF]/20 border border-[#0A84FF]/30">
        <RiRobot2Line size={14} className="text-[#0A84FF]" />
      </div>
      <div className="bg-[#161B22] border border-[#30363D]/60 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map(function (i) {
          return (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#0A84FF]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function PortfolioChatBot() {
  var [open, setOpen] = useState(false);
  var [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! 👋 I'm Humais's portfolio assistant. Ask me anything about his skills, projects, experience, or how to get in touch!",
    },
  ]);
  var [input, setInput] = useState("");
  var [loading, setLoading] = useState(false);
  var [showSuggestions, setShowSuggestions] = useState(true);
  var bottomRef = useRef(null);
  var inputRef = useRef(null);

  useEffect(
    function () {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [messages, loading]
  );

  useEffect(
    function () {
      if (open && inputRef.current) {
        setTimeout(function () {
          inputRef.current.focus();
        }, 300);
      }
    },
    [open]
  );

  async function sendMessage(text) {
    var userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    setShowSuggestions(false);
    setMessages(function (prev) {
      return prev.concat({ role: "user", content: userText });
    });
    setLoading(true);

    try {
      // Build Gemini-formatted conversation history.
      // Gemini uses "user" / "model" roles (not "assistant").
      // The system prompt goes into systemInstruction, not the contents array.
      var history = messages.concat({ role: "user", content: userText });

      var contents = history.map(function (m) {
        return {
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        };
      });

      var response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: contents,
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7,
          },
        }),
      });

      var data = await response.json();

      // Gemini response shape:
      // data.candidates[0].content.parts[0].text
      var reply =
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text
          ? data.candidates[0].content.parts[0].text
          : "Sorry, I couldn't get a response right now. Please try again!";

      setMessages(function (prev) {
        return prev.concat({ role: "assistant", content: reply });
      });
    } catch (err) {
      setMessages(function (prev) {
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
      {/* Floating toggle button */}
      <motion.button
        onClick={function () {
          setOpen(function (p) {
            return !p;
          });
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-[200] rounded-full bg-[#0A84FF] text-white shadow-lg shadow-[#0A84FF]/30 flex items-center justify-center border-none cursor-pointer"
        style={{ width: "52px", height: "52px" }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMessageSquare size={20} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[#0A84FF]"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:bottom-28 sm:right-8 z-[199] flex flex-col"
            style={{
              width: "min(380px, calc(100vw - 32px))",
              height: "min(520px, calc(100vh - 160px))",
            }}
          >
            <div
              className="flex flex-col h-full rounded-2xl overflow-hidden border border-[#30363D]/70 shadow-2xl shadow-black/50"
              style={{
                background: "rgba(13, 17, 23, 0.97)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-4 py-3.5 border-b border-[#30363D]/60"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(10,132,255,0.12), rgba(0,212,255,0.06))",
                }}
              >
                <div className="w-8 h-8 rounded-full bg-[#0A84FF]/20 border border-[#0A84FF]/40 flex items-center justify-center flex-shrink-0">
                  <RiRobot2Line size={16} className="text-[#0A84FF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-none mb-0.5">
                    Humais's Assistant
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[#8B949E] text-xs font-mono">
                      Online · Ask me anything
                    </span>
                  </div>
                </div>
                <button
                  onClick={function () {
                    setOpen(false);
                  }}
                  className="text-[#8B949E] hover:text-white transition-colors bg-transparent border-none cursor-pointer p-1"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex flex-col flex-1 gap-3 px-4 py-4 overflow-y-auto chatbot-messages">
                {messages.map(function (msg, i) {
                  return <Message key={i} msg={msg} />;
                })}
                {loading && <TypingIndicator />}

                {/* Quick suggestions — shown only before first message */}
                {showSuggestions && messages.length === 1 && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-2 mt-1"
                  >
                    <p className="text-[#8B949E] text-xs font-mono px-1">
                      Suggested questions:
                    </p>
                    {SUGGESTIONS.map(function (s) {
                      return (
                        <button
                          key={s}
                          onClick={function () {
                            sendMessage(s);
                          }}
                          className="text-left px-3 py-2 rounded-lg border border-[#30363D]/60 text-[#8B949E] hover:text-white hover:border-[#0A84FF]/40 hover:bg-[#0A84FF]/05 text-xs transition-all duration-200 bg-transparent cursor-pointer"
                        >
                          {s}
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-3 pb-3 pt-2 border-t border-[#30363D]/60">
                <div className="flex items-center gap-2 bg-[#161B22] border border-[#30363D] rounded-xl px-3 py-2.5 focus-within:border-[#0A84FF]/50 transition-colors duration-200">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={function (e) {
                      setInput(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Humais..."
                    className="flex-1 bg-transparent text-white text-sm placeholder-[#8B949E] outline-none font-mono min-w-0"
                    disabled={loading}
                  />
                  <button
                    onClick={function () {
                      sendMessage();
                    }}
                    disabled={!input.trim() || loading}
                    className="w-7 h-7 rounded-lg bg-[#0A84FF] flex items-center justify-center flex-shrink-0 border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0066CC] transition-colors duration-200"
                  >
                    <FiSend size={13} className="text-white" />
                  </button>
                </div>
                <p className="text-[#8B949E] text-[10px] font-mono text-center mt-2">
                  Powered by Gemini AI · Portfolio context only
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}