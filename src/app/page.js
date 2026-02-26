"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef(null);

  
  const [history, setHistory] = useState([
    { type: "system", text: "Initiating connection to ankit_server..." },
    { type: "system", text: "CONNECTION ESTABLISHED." },
    { type: "success", text: "ROOT ACCESS GRANTED." },
    { type: "system", text: "Executing automated startup script..." },
    { type: "output", text: "Available commands:\n  skills   - View technical arsenal\n  projects - View classified projects\n  whoami   - Display user identity\n  clear    - Clear terminal window\n  sudo hire- Execute recruitment protocol" }
  ]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, terminalOpen]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let newHistory = [...history, { type: "input", text: `$ ${input}` }];
      let response = [];

      if (cmd === "help") {
        response = [{ type: "output", text: "Available commands:\n  skills   - View technical arsenal\n  projects - View classified projects\n  whoami   - Display user identity\n  clear    - Clear terminal window\n  sudo hire- Execute recruitment protocol" }];
      } else if (cmd === "skills") {
        response = [{ type: "output", text: "=> C++ / DSA (5-Star HackerRank)\n=> MERN Stack (Full Stack)\n=> Metasploit & Wireshark (Security)\n=> Docker & Git (DevOps)" }];
      } else if (cmd === "projects") {
        response = [{ type: "output", text: "=> 1. Secure Web Login (Auth/Security)\n=> 2. Auto Fan Controller (IoT/Hardware)\n=> 3. YourMovie (React/API)\n=> 4. Library Management (C++/OOPs)\n=> 5. Live Weather Dashboard (JS/REST)" }];
      } else if (cmd === "whoami") {
        response = [{ type: "output", text: "ankit_kumar | Pre-Final Year @ VIT Vellore | InfoSec Specialist" }];
      } else if (cmd === "sudo hire") {
        response = [{ type: "success", text: "ACCESS GRANTED. Deploying recruitment package... \nContact: Ankitchaudhary9876543@gmail.com" }];
      } else if (cmd === "clear") {
        setHistory([]);
        setInput("");
        return;
      } else if (cmd !== "") {
        response = [{ type: "error", text: `bash: ${cmd}: command not found. Type 'help' for options.` }];
      }

      setHistory([...newHistory, ...response]);
      setInput("");
    }
  };

  const skills = [
    { name: "C++ / DSA", level: "5-Star HackerRank", category: "Core" },
    { name: "MERN Stack", level: "Full Stack", category: "Web" },
    { name: "Metasploit", level: "Pen-Testing", category: "Security" },
    { name: "Wireshark", level: "Network Sec", category: "Security" },
    { name: "Docker / Git", level: "DevOps", category: "Tools" },
    { name: "Embedded Sys", level: "Hardware", category: "Systems" },
  ];

  const projects = [
    {
      title: "Secure Web Login",
      desc: "RBAC (Role-Based Access Control) system with JWT and Bcrypt hashing for military-grade authentication.",
      tags: ["Node.js", "MongoDB", "Security"],
    },
    {
      title: "Auto Fan Controller",
      desc: "Hardware-level embedded systems project using temperature sensors to dynamically adjust fan speed.",
      tags: ["Arduino", "Embedded C++", "IoT"],
    },
    {
      title: "YourMovie",
      desc: "A high-performance movie listing and recommendation engine with a seamless frontend architecture.",
      tags: ["React", "API", "Tailwind"],
    },
    {
      title: "Library Management System",
      desc: "Console-based application to manage book inventory and student records using Object-Oriented Programming and File Handling for data persistence.",
      tags: ["C++", "OOP", "File Handling"],
    },
    {
      title: "Live Weather Dashboard",
      desc: "Real-time weather forecasting tool built by integrating the WeatherAPI using Asynchronous JavaScript and dynamic JSON parsing.",
      tags: ["JavaScript", "REST API", "Async JS"],
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white relative pb-10 font-sans overflow-hidden cursor-none">
      
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500/50 pointer-events-none z-[100] backdrop-blur-sm hidden md:flex items-center justify-center"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
      </motion.div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      <AnimatePresence>
        {terminalOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <div className="w-full max-w-2xl bg-[#0a0a0a] border border-gray-700 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.2)]">
              <div className="flex justify-between items-center bg-[#1a1a1a] px-4 py-2 border-b border-gray-800">
                <span className="text-xs font-mono text-gray-400">ankit@infosec-macbook:~</span>
                <button onClick={() => setTerminalOpen(false)} className="text-red-500 hover:text-red-400 text-xl leading-none cursor-none">&times;</button>
              </div>
              <div 
                className="p-6 font-mono text-sm h-72 overflow-y-auto cursor-text" 
                onClick={() => document.getElementById('terminal-input').focus()}
              >
                {history.map((line, i) => (
                  <div key={i} className={`mb-1 whitespace-pre-wrap ${
                    line.type === 'system' ? 'text-gray-500' :
                    line.type === 'error' ? 'text-red-400' :
                    line.type === 'success' ? 'text-blue-400' :
                    'text-green-400'
                  }`}>
                    {line.text}
                  </div>
                ))}
                <div className="flex items-center text-green-400 mt-2">
                  <span className="mr-2">$</span>
                  <input
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none text-green-400 flex-1 font-mono focus:ring-0 cursor-text"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
                <div ref={terminalEndRef} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-6xl mx-auto">
        
        <section className="min-h-screen flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-900/20 backdrop-blur-md flex items-center gap-3 shadow-[0_0_15px_rgba(37,99,235,0.1)] hover:border-blue-400 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs font-mono text-blue-400 uppercase tracking-[0.2em]">System Online // InfoSec</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-6 hover:scale-105 transition-transform duration-500"
          >
            ANKIT <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600">KUMAR</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="max-w-2xl text-gray-400 text-lg md:text-xl font-light mb-8 leading-relaxed"
          >
            Building secure, high-performance web architectures. <br className="hidden md:block" />
            Pre-Final Year @ <span className="text-gray-200 font-medium border-b border-blue-500/50 pb-0.5">VIT Vellore</span>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 mb-10"
          >
            <a href="https://github.com/ankitchaudhary44" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors border border-gray-800 p-2 rounded-full hover:bg-gray-800 cursor-none">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/ankitkumar82/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors border border-gray-800 p-2 rounded-full hover:bg-gray-800 cursor-none">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 cursor-none"
          >
            <a 
              href="https://drive.google.com/file/d/1NHJJZ5mLiwfEzI8M7vzJuro-y9bAxsNU/view?usp=drivesdk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-white text-black rounded-xl font-bold tracking-wide hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] text-center cursor-none"
            >
              Deploy Resume
            </a>
            <button 
              onClick={() => setTerminalOpen(true)}
              className="px-8 py-4 rounded-xl font-bold tracking-wide border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-md cursor-none"
            >
              Boot Terminal_
            </button>
          </motion.div>
        </section>

        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full mb-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-blue-500/30 transition-colors duration-500">
              <h2 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 01. Profile
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                I specialize in finding vulnerabilities and building systems that can withstand them. 
                My expertise bridges the gap between <span className="text-gray-200 font-medium">heavy-duty backend logic</span> and <span className="text-gray-200 font-medium">seamless frontend experiences</span>. 
                If it needs to be fast, scalable, and secure, I build it.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-4">
              <h2 className="col-span-full text-sm font-mono text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 02. Arsenal
              </h2>
              {skills.map((skill, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(59, 130, 246, 0.4)" }}
                  className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col justify-center transition-all cursor-none"
                >
                  <span className="text-[10px] text-gray-500 font-mono mb-2 uppercase tracking-wider">{skill.category}</span>
                  <h3 className="text-lg font-bold text-gray-200">{skill.name}</h3>
                  <span className="text-xs text-blue-400/80 mt-1">{skill.level}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full mb-32"
        >
          <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> 03. Live_Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.4)" }}
                className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all flex flex-col h-full cursor-none"
              >
                <h3 className="text-2xl font-bold text-gray-100 mb-4">{proj.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{proj.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono border border-white/10 px-3 py-1 rounded-full text-gray-300 bg-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full text-center border-t border-white/10 pt-20 pb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
            Let's Build Securely.
          </h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto">Open for collaborations, FULL STACK DEVELOPMENT, and high-impact roles.</p>
          <a href="mailto:Ankitchaudhary9876543@gmail.com" className="inline-block px-8 py-4 rounded-xl font-bold tracking-wide border border-blue-500/30 bg-blue-900/20 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] mb-20 cursor-none">
            Initiate Contact
          </a>
          
          <p className="text-gray-600 font-mono text-[10px] tracking-[0.3em] uppercase">
            © 2026 ANKIT KUMAR 
          </p>
        </motion.section>

      </div>
    </main>
  );
}