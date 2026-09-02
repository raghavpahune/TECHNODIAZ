import React, { useState } from 'react';
import { Cpu, Leaf, Sparkles, X, Terminal, ArrowUpRight, Zap, Code2, Globe, Shield, Database, Cpu as ChipIcon, Network } from 'lucide-react';
import { sound } from '../utils/audio';

export const CyberTreeBoard = ({ onSelectTrack }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const treeNodes = [
    {
      id: 'code',
      name: '</>',
      title: 'Core Coding & Algorithms',
      color: '#00ff88',
      desc: 'Algorithmic problem solving, data structures, competitive programming, and high-performance system design.',
      festEvent: 'CodeRelay Hackathon & Daily Coding Challenge',
      skills: ['C++', 'Python', 'Dynamic Programming', 'Graph Theory', 'Time Complexity Optimization'],
      pbcoeProject: 'Automated Code Reviewer & Performance Benchmark Suite',
      x: 50, y: 15, size: 'large'
    },
    {
      id: 'ai',
      name: 'AI',
      title: 'Artificial Intelligence & Neural Nets',
      color: '#00f0ff',
      desc: 'Deep learning, computer vision, natural language models, and autonomous intelligence systems.',
      festEvent: 'AI/ML Project Expo & IdeaStorm',
      skills: ['PyTorch', 'TensorFlow', 'LLMs', 'OpenCV', 'Computer Vision'],
      pbcoeProject: 'Plant Disease Detection using Convolutional Neural Networks',
      x: 38, y: 22, size: 'medium'
    },
    {
      id: 'ml',
      name: 'ML',
      title: 'Machine Learning & Predictive Models',
      color: '#a6ff00',
      desc: 'Statistical learning algorithms, predictive telemetry, automated classification, and regression engines.',
      festEvent: 'AI/ML Seminar & Research Paper Showcase',
      skills: ['Scikit-learn', 'Feature Engineering', 'XGBoost', 'Clustering', 'Model Pruning'],
      pbcoeProject: 'Smart Energy Grid Demand Forecasting for College Campus',
      x: 62, y: 22, size: 'medium'
    },
    {
      id: 'cpp',
      name: 'C++',
      title: 'High-Performance Systems & C++',
      color: '#38bdf8',
      desc: 'Low-latency architecture, memory optimization, game engine loops, and embedded robotics.',
      festEvent: 'BugHunt & Speed Debugging Arena',
      skills: ['Modern C++20', 'STL', 'Pointers & Memory Arena', 'Multithreading'],
      pbcoeProject: 'Sub-millisecond Packet Filter for Campus Network',
      x: 43, y: 32, size: 'medium'
    },
    {
      id: 'cloud',
      name: 'CLOUD SECURITY',
      title: 'Cloud Infrastructure & Defense',
      color: '#ec4899',
      desc: 'Zero-trust architecture, microservices scaling, container orchestration, and serverless reliability.',
      festEvent: 'Cloud & DevOps Workshop',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Zero-Trust', 'CI/CD Pipelines'],
      pbcoeProject: 'Serverless Event Pass Validator with Edge Caching',
      x: 57, y: 32, size: 'medium'
    },
    {
      id: 'iot',
      name: 'IoT',
      title: 'Internet of Things & Edge Sensors',
      color: '#fbbf24',
      desc: 'Microcontrollers, sensor networks, edge AI compute, and physical world automation.',
      festEvent: 'Hardware Expo & Smart Campus Pitch',
      skills: ['ESP32', 'Arduino', 'MQTT', 'Sensor Fusion', 'LoRaWAN'],
      pbcoeProject: 'Smart Solar-Powered Campus Irrigation Monitoring System',
      x: 35, y: 44, size: 'medium'
    },
    {
      id: 'data',
      name: 'DATA SCIENCE',
      title: 'Big Data Analytics & BI',
      color: '#818cf8',
      desc: 'ETL pipelines, data warehousing, statistical exploratory analysis, and visual intelligence.',
      festEvent: 'Mega College Quiz Quest & Analytics Challenge',
      skills: ['Pandas', 'Apache Spark', 'SQL', 'Tableau', 'Statistical Modeling'],
      pbcoeProject: 'PBCOE Student Placement Analytics & Trend Predictor',
      x: 65, y: 44, size: 'medium'
    },
    {
      id: 'cyber_comp',
      name: 'CYBER COMPUTING',
      title: 'Cybersecurity & Ethical Hacking',
      color: '#f87171',
      desc: 'Penetration testing, cryptography, threat hunting, vulnerability auditing, and network defense.',
      festEvent: 'Capture The Flag (CTF) Cyber Arena',
      skills: ['Kali Linux', 'Wireshark', 'Burp Suite', 'Cryptography', 'OWASP Top 10'],
      pbcoeProject: 'Decentralized Audit Log for Academic Credentials',
      x: 40, y: 55, size: 'medium'
    },
    {
      id: 'web',
      name: 'WEB DEVELOPMENT',
      title: 'Full-Stack Modern Web & UI/UX',
      color: '#34d399',
      desc: 'Next-gen responsive reactive web apps, sleek UI/UX design systems, microservices, and Web APIs.',
      festEvent: 'TechCanvas (Web & UI/UX Hackathon)',
      skills: ['React', 'Node.js', 'Tailwind/CSS', 'GraphQL', 'REST APIs', 'Vite'],
      pbcoeProject: 'TECHNODIAZ 2k26 Production Web Portal & QR Verifier',
      x: 60, y: 55, size: 'medium'
    },
    {
      id: 'cyber_iot',
      name: 'CYBER IoT',
      title: 'Smart Embedded Devices & Connected Tech',
      color: '#2dd4bf',
      desc: 'Secure firmware, edge encryption, and interconnected smart device fleets.',
      festEvent: 'IoT Hackathon & Maker Showcase',
      skills: ['Firmware Security', 'Zigbee', 'Bluetooth LE', 'ARM Cortex'],
      pbcoeProject: 'Eco-Friendly Smart Segregation Waste Bin',
      x: 35, y: 65, size: 'medium'
    },
    {
      id: 'js',
      name: 'JS',
      title: 'JavaScript & Modern Web Ecosystem',
      color: '#facc15',
      desc: 'Asynchronous event loops, V8 optimization, TypeScript, backend Node runtime, and frontend reactive architectures.',
      festEvent: 'TechCanvas Hackathon',
      skills: ['JavaScript ES2024', 'TypeScript', 'Node.js', 'Express', 'Async/Await'],
      pbcoeProject: 'Real-time WebSocket Live Notice Broadcaster',
      x: 65, y: 65, size: 'medium'
    },
    {
      id: 'wireless',
      name: '📶 WIRELESS',
      title: 'Wireless Networks & Next-Gen Comms',
      color: '#60a5fa',
      desc: 'Mesh networks, 5G latency reduction, wireless protocols, and antenna telemetry.',
      festEvent: 'LAN Battle & Network Simulation',
      skills: ['Wi-Fi 6', 'Software Defined Radio', 'Protocol Analysis', 'Routing'],
      pbcoeProject: 'Campus-wide Low Power Emergency Alert Mesh',
      x: 58, y: 73, size: 'small'
    }
  ];

  const handleNodeClick = (node) => {
    sound.playClick();
    setSelectedNode(node);
  };

  return (
    <section id="cyber-tree" className="py-12 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d2e18] border border-[#00ff88]/40 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#a6ff00]" />
            <span>Interactive Cyber-Botanical Centerpiece</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            The Cyber Tree of Knowledge
          </h2>
          <p className="text-sm sm:text-base text-emerald-200/80">
            Click on any illuminated branch node to discover tech tracks, PBCOE CSE student innovations, and related TECHNODIAZ 2k26 challenges.
          </p>
        </div>

        {/* Tree Container styled like the wooden wall centerpiece */}
        <div className="relative p-4 sm:p-8 rounded-3xl bg-gradient-to-b from-[#081a0e] via-[#05130b] to-[#030905] border-2 border-[#194528] shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Circuit lines background overlay */}
          <div className="absolute inset-0 circuit-grid-bg opacity-30 pointer-events-none" />

          {/* SVG Tree Art with Glowing Branches & Root System */}
          <div className="relative w-full aspect-[4/3] max-h-[640px] flex items-center justify-center">
            <svg
              viewBox="0 0 1000 750"
              className="w-full h-full filter drop-shadow-[0_0_12px_rgba(0,255,136,0.3)]"
            >
              <defs>
                <linearGradient id="trunkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#1e1008" />
                  <stop offset="50%" stopColor="#2e1a0d" />
                  <stop offset="100%" stopColor="#0d331a" />
                </linearGradient>

                <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff88" />
                  <stop offset="50%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#a6ff00" />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Glowing Roots in Ground */}
              <g stroke="url(#circuitGrad)" strokeWidth="2.5" fill="none" opacity="0.8">
                <path d="M 500 580 Q 450 630 350 660 T 200 680" className="circuit-path" />
                <path d="M 500 580 Q 480 640 430 690 T 360 720" />
                <path d="M 500 580 Q 520 640 570 690 T 640 720" />
                <path d="M 500 580 Q 550 630 650 660 T 800 680" className="circuit-path" />
                <path d="M 500 580 L 500 720" strokeDasharray="5 5" />
                {/* Circuit solder points */}
                <circle cx="200" cy="680" r="4" fill="#00ff88" />
                <circle cx="360" cy="720" r="4" fill="#00f0ff" />
                <circle cx="640" cy="720" r="4" fill="#00ff88" />
                <circle cx="800" cy="680" r="4" fill="#a6ff00" />
              </g>

              {/* Tree Trunk & Organic Cyber Silhouette */}
              <path
                d="M 470 580 
                   Q 460 450 430 360 
                   Q 400 280 380 200 
                   Q 450 160 500 130 
                   Q 550 160 620 200 
                   Q 600 280 570 360 
                   Q 540 450 530 580 
                   Z"
                fill="url(#trunkGrad)"
                stroke="#3f2314"
                strokeWidth="4"
              />

              {/* Branch Network Lines with Glowing Circuits */}
              <g stroke="#00ff88" strokeWidth="3" fill="none" opacity="0.85">
                {/* Center to top node </> */}
                <path d="M 500 300 L 500 130" stroke="#00ff88" strokeWidth="4" />
                
                {/* Left Primary Branches */}
                <path d="M 480 320 Q 420 280 380 185" />
                <path d="M 470 360 Q 430 300 430 255" />
                <path d="M 470 420 Q 380 380 350 350" />
                <path d="M 470 470 Q 420 460 400 430" />
                <path d="M 480 510 Q 380 520 350 510" />

                {/* Right Primary Branches */}
                <path d="M 520 320 Q 580 280 620 185" />
                <path d="M 530 360 Q 570 300 570 255" />
                <path d="M 530 420 Q 620 380 650 350" />
                <path d="M 530 470 Q 580 460 600 430" />
                <path d="M 520 510 Q 620 520 650 510" />
                <path d="M 520 530 Q 560 550 580 570" />
              </g>

              {/* CPU Motherboard Centerpiece at Trunk Base */}
              <g transform="translate(460, 480)">
                <rect x="0" y="0" width="80" height="80" rx="8" fill="#041209" stroke="#00ff88" strokeWidth="3" filter="url(#glow)" />
                <rect x="15" y="15" width="50" height="50" rx="4" fill="#0d2816" stroke="#00f0ff" strokeWidth="1.5" />
                <text x="40" y="44" fill="#00ff88" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  PBCOE
                </text>
                <text x="40" y="56" fill="#a6ff00" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  CSE 2K26
                </text>
                {/* Circuit pins around CPU */}
                <line x1="20" y1="0" x2="20" y2="-12" stroke="#00ff88" strokeWidth="2" />
                <line x1="40" y1="0" x2="40" y2="-12" stroke="#00ff88" strokeWidth="2" />
                <line x1="60" y1="0" x2="60" y2="-12" stroke="#00ff88" strokeWidth="2" />
                <line x1="0" y1="25" x2="-12" y2="25" stroke="#00ff88" strokeWidth="2" />
                <line x1="0" y1="55" x2="-12" y2="55" stroke="#00ff88" strokeWidth="2" />
                <line x1="80" y1="25" x2="92" y2="25" stroke="#00ff88" strokeWidth="2" />
                <line x1="80" y1="55" x2="92" y2="55" stroke="#00ff88" strokeWidth="2" />
              </g>
            </svg>

            {/* Interactive HTML Node Overlays positioned over SVG coordinates */}
            <div className="absolute inset-0 pointer-events-auto">
              {treeNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const isTopNode = node.id === 'code';

                return (
                  <button
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute flex flex-col items-center justify-center rounded-full transition-all duration-300 group cursor-pointer ${
                      isTopNode
                        ? 'w-16 h-16 sm:w-20 sm:h-20 bg-[#041d0e] border-3 border-[#00ff88] shadow-[0_0_25px_rgba(0,255,136,0.8)] z-30 animate-pulse-glow'
                        : 'w-11 h-11 sm:w-14 sm:h-14 bg-[#081a0e]/95 border-2 border-emerald-400/80 shadow-[0_0_15px_rgba(0,255,136,0.4)] hover:scale-125 hover:z-30'
                    } ${isSelected ? 'ring-4 ring-[#00f0ff] scale-125 z-40' : ''}`}
                  >
                    <span
                      style={{ color: node.color }}
                      className={`font-mono font-extrabold ${
                        isTopNode
                          ? 'text-lg sm:text-2xl tracking-tighter'
                          : node.name.length > 5
                          ? 'text-[8px] sm:text-[9px] leading-none text-center px-1'
                          : 'text-xs sm:text-sm'
                      }`}
                    >
                      {node.name}
                    </span>
                    {/* Tooltip on hover */}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-7 whitespace-nowrap px-2 py-0.5 rounded bg-black/90 text-[10px] text-white border border-emerald-500/50 pointer-events-none z-50">
                      {node.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Callout banner */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#180e08] via-[#0d2816] to-[#180e08] border border-[#633c21] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">💡</span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#fcd34d] uppercase font-brand">
                  Interactive Botanical Matrix
                </h4>
                <p className="text-[11px] text-emerald-200/80">
                  Click any node above to inspect project domains, tech stack blueprints, and CSE event tracks.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400">12 Active Tracks</span>
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
            </div>
          </div>
        </div>

        {/* Modal for Selected Domain Node */}
        {selectedNode && (
          <div className="modal-overlay" onClick={() => setSelectedNode(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between pb-4 border-b border-emerald-800/50">
                <div className="flex items-center gap-3">
                  <div
                    style={{ borderColor: selectedNode.color, color: selectedNode.color }}
                    className="w-12 h-12 rounded-xl bg-[#081a0e] border-2 flex items-center justify-center font-mono font-extrabold text-lg shadow-[0_0_15px_rgba(0,255,136,0.3)]"
                  >
                    {selectedNode.name}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading">
                      {selectedNode.title}
                    </h3>
                    <p className="text-xs text-emerald-400 font-mono">TECHNODIAZ 2k26 Innovation Domain</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-4 text-sm text-emerald-100">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    Domain Overview
                  </h4>
                  <p className="text-emerald-100/90 leading-relaxed">{selectedNode.desc}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#092213] border border-emerald-700/50">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00f0ff] mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Associated TECHNODIAZ 2k26 Event</span>
                  </h4>
                  <p className="font-semibold text-white">{selectedNode.festEvent}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                    Core Technologies & Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-[#05160b] border border-emerald-800 text-emerald-300 text-xs font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#181108] border border-[#633c21]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#fcd34d] block mb-1">
                    PBCOE Student Innovation Spotlight
                  </span>
                  <p className="text-xs text-amber-100 font-medium">"{selectedNode.pbcoeProject}"</p>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-800/50 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-200 hover:bg-emerald-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
