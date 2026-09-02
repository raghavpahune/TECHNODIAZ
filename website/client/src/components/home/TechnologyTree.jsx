import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Brain,
  Wifi,
  Shield,
  Code,
  Terminal,
  Database,
  Cloud,
  Globe,
  Sparkles,
  Leaf,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const TechnologyTree = () => {
  const [activeNode, setActiveNode] = useState(null);

  const techBranches = [
    {
      id: 'ai',
      name: 'AI',
      fullName: 'Artificial Intelligence',
      icon: Brain,
      description: 'Deep neural networks, computer vision, and cognitive computational architectures.',
      category: 'AI/ML',
      level: 'Advanced',
      leaves: 5,
      x: 200,
      y: 90,
      color: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.4)',
    },
    {
      id: 'ml',
      name: 'ML',
      fullName: 'Machine Learning',
      icon: Sparkles,
      description: 'Statistical models, predictive classification, and automated pattern learning algorithms.',
      category: 'AI/ML',
      level: 'Advanced',
      leaves: 4,
      x: 340,
      y: 70,
      color: '#34D399',
      bgGlow: 'rgba(52, 211, 153, 0.4)',
    },
    {
      id: 'iot',
      name: 'IoT',
      fullName: 'Internet of Things',
      icon: Wifi,
      description: 'Low-power sensor telemetry, embedded edge firmware, and smart agricultural mesh networks.',
      category: 'Green Tech',
      level: 'Intermediate',
      leaves: 4,
      x: 480,
      y: 90,
      color: '#4ADE80',
      bgGlow: 'rgba(74, 222, 128, 0.4)',
    },
    {
      id: 'cyber',
      name: 'Cyber Security',
      fullName: 'Cyber Security & Cryptography',
      icon: Shield,
      description: 'Defensive encryption, zero-trust infrastructure, and decentralized consensus integrity.',
      category: 'Security',
      level: 'Expert',
      leaves: 4,
      x: 120,
      y: 180,
      color: '#059669',
      bgGlow: 'rgba(5, 150, 105, 0.4)',
    },
    {
      id: 'cpp',
      name: 'C++',
      fullName: 'C++ Systems Architecture',
      icon: Terminal,
      description: 'High-throughput low-latency algorithms, pointer memory efficiency, and hardware abstraction.',
      category: 'Algorithms',
      level: 'Core',
      leaves: 3,
      x: 560,
      y: 180,
      color: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.4)',
    },
    {
      id: 'js',
      name: 'JavaScript',
      fullName: 'Modern JavaScript / TypeScript',
      icon: Code,
      description: 'Asynchronous event engines, reactive micro-frontends, and isomorphic server runtimes.',
      category: 'Web Dev',
      level: 'Core',
      leaves: 4,
      x: 140,
      y: 280,
      color: '#4ADE80',
      bgGlow: 'rgba(74, 222, 128, 0.4)',
    },
    {
      id: 'datasci',
      name: 'Data Science',
      fullName: 'Data Science & Big Data',
      icon: Database,
      description: 'Pipeline ingestion, exploratory data engineering, and green computation load balancing.',
      category: 'Algorithms',
      level: 'Intermediate',
      leaves: 4,
      x: 540,
      y: 280,
      color: '#34D399',
      bgGlow: 'rgba(52, 211, 153, 0.4)',
    },
    {
      id: 'cloud',
      name: 'Cloud',
      fullName: 'Distributed Cloud & Edge',
      icon: Cloud,
      description: 'Elastic serverless clusters, multi-region failover, and carbon-optimized microservices.',
      category: 'Green Tech',
      level: 'Intermediate',
      leaves: 3,
      x: 230,
      y: 350,
      color: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.4)',
    },
    {
      id: 'web',
      name: 'Web Dev',
      fullName: 'Full Stack Web Engineering',
      icon: Globe,
      description: 'Modern RESTful & GraphQL APIs, accessible UI/UX, and progressive high-speed web apps.',
      category: 'Web Dev',
      level: 'Core',
      leaves: 4,
      x: 450,
      y: 350,
      color: '#6EE7B7',
      bgGlow: 'rgba(110, 231, 183, 0.4)',
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto my-8">
      {/* Container with Nature Wood / Circuit Background Board */}
      <div className="relative rounded-3xl wood-board p-6 sm:p-10 border border-emerald-900/60 overflow-hidden shadow-2xl">
        {/* Glow ambient spots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-800/10 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center space-y-2 mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Interactive Digital Ecosystem
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            THE CENTRAL <span className="text-emerald-400 text-neon-green">TECHNOLOGY TREE</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto">
            From circuit roots to blooming innovation: Hover and interact with each technological branch powering the TECHNODIAZ 2K26 engineering paradigm.
          </p>
        </div>

        {/* Interactive SVG Tree Canvas */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[520px] mx-auto select-none">
          <svg
            viewBox="0 0 680 480"
            className="w-full h-full filter drop-shadow-lg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="circuitGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#0B1F14" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#4ADE80" />
              </linearGradient>

              <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* === ROOTS / CIRCUIT TRACES (Bottom to CPU) === */}
            <g className="opacity-80">
              <path d="M340 470 L340 430 L300 400 L300 370 L340 340 L340 310" stroke="#10B981" strokeWidth="2.5" strokeDasharray="6 3" />
              <path d="M220 470 L250 440 L250 400 L290 370 L340 340" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M460 470 L430 440 L430 400 L390 370 L340 340" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M140 470 L180 450 L220 450 L270 410 L320 370 L340 340" stroke="#1F6B3A" strokeWidth="1.5" />
              <path d="M540 470 L500 450 L460 450 L410 410 L360 370 L340 340" stroke="#1F6B3A" strokeWidth="1.5" />

              {/* Root Circuit Pads */}
              <circle cx="340" cy="470" r="4" fill="#10B981" />
              <circle cx="220" cy="470" r="3" fill="#059669" />
              <circle cx="460" cy="470" r="3" fill="#059669" />
              <circle cx="140" cy="470" r="3" fill="#1F6B3A" />
              <circle cx="540" cy="470" r="3" fill="#1F6B3A" />
            </g>

            {/* === BRANCH CIRCUIT LINES (CPU to Tech Nodes) === */}
            <g>
              {techBranches.map((branch) => (
                <g key={`path-${branch.id}`}>
                  {/* Branch trace line with neon glow */}
                  <path
                    d={`M340 250 Q ${(340 + branch.x) / 2} ${(250 + branch.y) / 2 + 30} ${branch.x} ${branch.y}`}
                    stroke={activeNode?.id === branch.id ? '#4ADE80' : '#10B981'}
                    strokeWidth={activeNode?.id === branch.id ? '3.5' : '2'}
                    strokeOpacity={activeNode?.id === branch.id ? '1' : '0.6'}
                    className="transition-all duration-300"
                    filter={activeNode?.id === branch.id ? 'url(#neonGlow)' : undefined}
                  />

                  {/* Leaf accents around branch tips */}
                  <path
                    d={`M${branch.x} ${branch.y} C${branch.x - 12} ${branch.y - 15} ${branch.x - 18} ${branch.y - 6} ${branch.x} ${branch.y}`}
                    fill="#10B981"
                    fillOpacity={activeNode?.id === branch.id ? '0.9' : '0.5'}
                  />
                  <path
                    d={`M${branch.x} ${branch.y} C${branch.x + 12} ${branch.y - 15} ${branch.x + 18} ${branch.y - 6} ${branch.x} ${branch.y}`}
                    fill="#34D399"
                    fillOpacity={activeNode?.id === branch.id ? '0.9' : '0.5'}
                  />
                </g>
              ))}
            </g>

            {/* === CENTRAL TRUNK & CPU / CHIP === */}
            <g transform="translate(340, 250)">
              {/* Pulsing Aura */}
              <circle r="42" fill="rgba(16, 185, 129, 0.12)" className="animate-pulse-slow" />
              <circle r="32" fill="#0B1A11" stroke="#10B981" strokeWidth="2.5" filter="url(#neonGlow)" />

              {/* Chip Pins */}
              {[-28, -14, 0, 14, 28].map((offset) => (
                <React.Fragment key={offset}>
                  <line x1="-36" y1={offset} x2="-30" y2={offset} stroke="#4ADE80" strokeWidth="2" />
                  <line x1="30" y1={offset} x2="36" y2={offset} stroke="#4ADE80" strokeWidth="2" />
                  <line x1={offset} y1="-36" x2={offset} y2="-30" stroke="#4ADE80" strokeWidth="2" />
                  <line x1={offset} y1="30" x2={offset} y2="36" stroke="#4ADE80" strokeWidth="2" />
                </React.Fragment>
              ))}

              {/* Central Core Icon & Label */}
              <circle r="18" fill="#123D25" stroke="#4ADE80" strokeWidth="1.5" />
              <text y="4" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">
                CORE
              </text>
            </g>
          </svg>

          {/* HTML Overlay Interactive Nodes for Hover/Click Tooltips */}
          {techBranches.map((branch) => {
            const isHovered = activeNode?.id === branch.id;
            const Icon = branch.icon;

            return (
              <div
                key={branch.id}
                style={{
                  left: `${(branch.x / 680) * 100}%`,
                  top: `${(branch.y / 480) * 100}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                onMouseEnter={() => setActiveNode(branch)}
                onClick={() => setActiveNode(branch)}
              >
                {/* Interactive Node Button */}
                <button
                  type="button"
                  className={`relative flex items-center justify-center rounded-2xl p-2.5 transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? 'scale-125 bg-emerald-900/90 border-2 border-emerald-400 shadow-neon-green-lg'
                      : 'bg-[#0A140E]/90 border border-emerald-700/60 hover:border-emerald-400 hover:scale-110 shadow-md'
                  }`}
                  aria-label={branch.fullName}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isHovered ? 'text-emerald-300' : 'text-emerald-400'
                    }`}
                  />

                  {/* Leaf Badge on top right of node */}
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500/80 border border-emerald-300 flex items-center justify-center text-[8px] text-black font-bold">
                    🌿
                  </span>
                </button>

                {/* Node Label Below */}
                <div
                  className={`mt-1.5 text-center text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                    isHovered ? 'text-emerald-300 font-bold scale-105' : 'text-gray-300'
                  }`}
                >
                  {branch.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Detail Card for currently selected/hovered node */}
        <div className="mt-4 p-4 sm:p-6 rounded-2xl bg-[#08120B]/90 border border-emerald-600/40 backdrop-blur-md transition-all duration-300">
          {activeNode ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <activeNode.icon className="w-4 h-4" />
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    {activeNode.fullName}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                    {activeNode.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                  {activeNode.description}
                </p>
              </div>

              <Link
                to="/coding-challenge"
                className="self-start sm:self-center flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green transition-all whitespace-nowrap"
              >
                <span>Explore Challenges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-emerald-400/80 font-mono">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                Hover or tap any technological branch on the tree above to explore engineering domains
              </span>
              <span className="hidden sm:inline-block bg-emerald-950/60 px-3 py-1 rounded-md border border-emerald-800/40">
                9 Ecosystem Nodes Active
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
