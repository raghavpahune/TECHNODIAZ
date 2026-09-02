import React from 'react';
import { CloudRain, Trees, Sun, HeartPulse, Sparkles, Cpu } from 'lucide-react';

export const AIForGoodSection = () => {
  const pillars = [
    {
      icon: CloudRain,
      title: 'Climate & Monsoon Forecasting',
      desc: 'Physics-informed neural networks simulating hyper-localized atmospheric convection and drought patterns.',
      stat: '94% Prediction Precision',
      tag: 'Atmospheric AI',
    },
    {
      icon: Trees,
      title: 'Biodiversity & Forest Monitoring',
      desc: 'Edge acoustic vision nodes detecting illegal logging, poaching signals, and automated canopy health indexation.',
      stat: '50k+ Sq Km Tracked',
      tag: 'Bio-Telemetry',
    },
    {
      icon: Sun,
      title: 'Renewable Microgrid Dispatch',
      desc: 'Reinforcement learning algorithms dynamically balancing localized solar and wind inverter loads.',
      stat: '38% Grid Loss Reduction',
      tag: 'Clean Energy',
    },
    {
      icon: HeartPulse,
      title: 'Agri-Tech & Crop Pathology',
      desc: 'Computer vision diagnostics identifying leaf blight and nutrient deficiencies on offline farmer smartphones.',
      stat: 'Zero-Latency Edge Inference',
      tag: 'Smart Farming',
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B1A11] to-[#060D08] border border-emerald-800/40 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Background tech glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-3 mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Computing for Humanity
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              AI FOR <span className="text-emerald-400 text-neon-green">GOOD & PLANETARY IMPACT</span>
            </h2>
            <p className="text-gray-300 text-sm max-w-2xl mx-auto">
              How the Department of Computer Science & Engineering harnesses artificial intelligence, edge accelerators, and computational ecology to solve critical environmental challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0D1912]/80 border border-emerald-900/60 hover:border-emerald-400 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-neon-green group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-600/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-900/50 transition-all shadow-sm">
                    <item.icon className="w-6 h-6" />
                  </div>

                  <span className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {item.tag}
                  </span>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-950/80 text-[11px] font-mono text-emerald-400 font-semibold">
                  ✓ {item.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
