import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Cpu, Heart, Leaf, Award, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-[#040805] border-t border-emerald-900/40 pt-16 pb-12 overflow-hidden text-gray-400">
      {/* Background glowing gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-emerald-500/10 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-950">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-xl shadow-neon-green">
                🌱
              </div>
              <div className="font-display font-black text-2xl tracking-tight">
                <span className="text-white">TECHNO</span>
                <span className="text-emerald-400 text-neon-green">DIAZ</span>
                <span className="ml-1.5 px-2 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-md">
                  2K26
                </span>
              </div>
            </div>
            
            <p className="text-emerald-400/90 font-medium text-sm tracking-wide">
              "WHERE NATURE MEETS INNOVATION"
            </p>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Annual Technical Festival and National Coding Challenge organized by the Department of Computer Science & Engineering. Empowering the next generation of engineers to build sustainable, intelligent, and transformative computing solutions.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-emerald-300/80">
              <span className="flex items-center gap-1 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Eco-Computing
              </span>
              <span className="flex items-center gap-1 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" /> AI & IoT Innovation
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link to="/coding-challenge" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>Coding Challenge</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded">LIVE</span>
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-emerald-400 transition-colors">
                  Live Leaderboard
                </Link>
              </li>
              <li>
                <a href="#events" className="hover:text-emerald-400 transition-colors">
                  Upcoming Events
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-emerald-400 transition-colors">
                  Student Project Spotlight
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  About TECHNODIAZ
                </a>
              </li>
            </ul>
          </div>

          {/* Department Info */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono">
              Department
            </h4>
            <div className="text-sm space-y-2">
              <p className="font-medium text-gray-200">
                Department of Computer Science & Engineering
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Priydarshini Bhagwati College of Engineering (PBCOE), Nagpur
              </p>
              <p className="text-xs text-emerald-400/90 font-mono">
                Email: technodiaz@pbcoe.edu
              </p>
              <p className="text-xs text-gray-400">
                Venue: Main CSE Department & Labs
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © 2026 TECHNODIAZ 2K26. Department of Computer Science & Engineering. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400/80">
              <Leaf className="w-3.5 h-3.5" /> Built for Sustainable Future
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
