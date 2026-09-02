import React from 'react';
import { Leaf, Cpu, Sparkles, ArrowRight, ShieldCheck, QrCode, Globe, Calendar, Award, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export const HeroBanner = ({ onOpenRegister, onScrollTo, onOpenAdmin }) => {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden circuit-grid-bg">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#00ff88]/15 via-[#00f0ff]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Main Board Header Frame matching the reference photo */}
        <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#0a1e12]/90 via-[#07170e]/95 to-[#040d07] border-2 border-[#1e4d2e] shadow-[0_20px_60px_rgba(0,0,0,0.85)] led-glowing-border">
          {/* Leaf Garland Border Simulation */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-6 py-1 rounded-full bg-[#05180c] border border-[#00ff88]/50 text-xs sm:text-sm font-bold text-[#00ff88] flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,136,0.3)] z-20">
            <span>🌿</span>
            <span className="tracking-widest uppercase font-brand">PBCOE Annual National Tech & Sports Fest</span>
            <span>🌿</span>
          </div>

          {/* Corner Brass Bolts */}
          <span className="brass-pin pin-tl" />
          <span className="brass-pin pin-tr" />
          <span className="brass-pin pin-bl" />
          <span className="brass-pin pin-br" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left/Center Header Title Block */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              {/* College & Department Subtitle Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#122e1a] border border-[#2b6a3e] text-emerald-300 text-xs uppercase tracking-widest font-semibold">
                <Cpu className="w-3.5 h-3.5 text-[#00ff88]" />
                <span>Priyadarshini Bhagwati College of Engineering, Nagpur</span>
              </div>

              {/* Main FEST TITLE */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-heading drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                <span className="text-[#e2f5e7] hover:text-[#00ff88] transition-colors">TECHNO</span>
                <span className="bg-gradient-to-r from-[#00ff88] via-[#a6ff00] to-[#00f0ff] bg-clip-text text-transparent">
                  DIAZ 2K26
                </span>
              </h1>

              {/* Wooden / Dark Metal Theme Plaque */}
              <div className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#1b100a] via-[#2c1a10] to-[#1b100a] border-2 border-[#6d4428] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.6)]">
                <p className="text-sm sm:text-lg md:text-xl font-bold tracking-[0.2em] uppercase text-[#fcd34d] font-brand flex items-center justify-center lg:justify-start gap-2">
                  <span className="text-[#00ff88]">•</span>
                  <span>WHERE NATURE MEETS INNOVATION</span>
                  <span className="text-[#00ff88]">•</span>
                </p>
              </div>

              {/* Department Name */}
              <p className="text-xs sm:text-sm md:text-base font-semibold text-emerald-300/90 tracking-widest uppercase">
                DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
              </p>

              {/* Dates & Highlights */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e2c19]/80 border border-[#00ff88]/40 text-xs text-emerald-200">
                  <Calendar className="w-4 h-4 text-[#00ff88]" />
                  <span className="font-bold text-white">Day 1 (Sept 1):</span> Technical Events & Hackathons
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14233c]/80 border border-[#00f0ff]/40 text-xs text-cyan-200">
                  <Award className="w-4 h-4 text-[#00f0ff]" />
                  <span className="font-bold text-white">Day 2 (Sept 2):</span> Sports & E-Sports Tournaments
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => { sound.playClick(); onOpenRegister(); }}
                  className="btn-nature-primary text-sm sm:text-base cursor-pointer"
                >
                  <QrCode className="w-5 h-5" />
                  <span>Register Team & Get QR Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => { sound.playClick(); onScrollTo('events'); }}
                  className="btn-nature-wood text-sm sm:text-base cursor-pointer"
                >
                  <span>Explore Flagship Events</span>
                </button>

                <button
                  onClick={() => { sound.playClick(); onScrollTo('coding-challenge'); }}
                  className="px-4 py-2.5 rounded-lg bg-[#081f12] text-[#00ff88] border border-[#00ff88]/50 hover:bg-[#0d2e1b] text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#a6ff00]" />
                  <span>Daily Code Challenge</span>
                </button>
              </div>
            </div>

            {/* Right: Circular Earth & Iconic Quote Emblem from Reference Image */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="relative group">
                {/* Glowing Aura Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00ff88] to-[#00f0ff] blur-xl opacity-40 group-hover:opacity-75 transition-opacity" />

                {/* Circular Earth Globe with Foliage */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-[#0a2e18] via-[#05180c] to-[#020b05] border-4 border-[#00ff88] flex flex-col items-center justify-center p-4 shadow-[0_0_30px_rgba(0,255,136,0.5)] overflow-hidden">
                  {/* Decorative Circuit Lines inside Globe */}
                  <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#00ff88" strokeWidth="1" strokeDasharray="3 3" />
                    <path d="M10 50 Q50 20 90 50 Q50 80 10 50" fill="none" stroke="#00f0ff" strokeWidth="1.5" />
                    <path d="M50 10 Q20 50 50 90 Q80 50 50 10" fill="none" stroke="#00ff88" strokeWidth="1.5" />
                  </svg>

                  <Globe className="w-16 h-16 sm:w-20 sm:h-20 text-[#00ff88] mb-1 animate-pulse-glow" />
                  <span className="text-[11px] font-mono font-bold text-emerald-200 tracking-wider">ECO-SYSTEM</span>
                  <span className="text-[10px] text-cyan-300">EST. PBCOE 2026</span>
                </div>
              </div>

              {/* Slogan from the reference board */}
              <div className="mt-4 p-3 rounded-xl bg-[#081a0e]/90 border border-[#00ff88]/30 max-w-[280px]">
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-100 font-brand">
                  "THE FUTURE IS DIGITAL BUT ITS ROOTS ARE GREEN."
                </p>
                <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#00ff88] font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>100% Paperless Digital Entry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
