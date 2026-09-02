import React from 'react';
import { Leaf, Cpu, MapPin, Mail, Phone, Globe, Shield, Heart, ArrowUp } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer = ({ onScrollTo, onOpenAdmin }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030905] border-t-2 border-[#194528] pt-14 pb-8 overflow-hidden text-emerald-100">
      {/* Background ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-80" />

      <div className="container-custom relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0a2615] border border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                <Leaf className="w-6 h-6 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-2xl tracking-wider text-white">
                  TECHNODIAZ 2k26
                </h3>
                <p className="text-xs text-[#00ff88] font-mono font-bold tracking-widest uppercase">
                  WHERE NATURE MEETS INNOVATION
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-md">
              The Annual National Technical & Sports Fest organized by the Department of Computer Science & Engineering at Priyadarshini Bhagwati College of Engineering (PBCOE), Nagpur.
            </p>

            <div className="p-3.5 rounded-xl bg-[#06170c] border border-emerald-800/80 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#fcd34d] block font-mono">
                🌱 Eco-Tech Festival Initiative
              </span>
              <p className="text-[11px] text-emerald-300/80">
                100% paperless registration, smart QR gate verifications, and sustainable tech tracks promoting green computing solutions.
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-heading border-b border-emerald-800/60 pb-2">
              Navigation Tracks
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/90 font-medium">
              {[
                { label: 'Cyber-Tree of Knowledge', target: 'cyber-tree' },
                { label: 'Flagship Event Showcases', target: 'events' },
                { label: 'Daily Coding Challenge', target: 'coding-challenge' },
                { label: 'Fest Daily Routine & Agenda', target: 'schedule' },
                { label: 'Thematic Notice Boards', target: 'boards' },
                { label: 'Automated Live Tech News', target: 'tech-news' },
                { label: 'PBCOE CSE Core Team', target: 'core-team' },
              ].map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => { sound.playClick(); onScrollTo(link.target); }}
                    className="hover:text-[#00ff88] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="text-[#00ff88]">›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Campus & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-heading border-b border-emerald-800/60 pb-2">
              PBCOE Campus & Desk
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-200/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00ff88] flex-shrink-0 mt-0.5" />
                <span>
                  Priyadarshini Bhagwati College of Engineering, Harpur Nagar, Umred Road, Nagpur, Maharashtra - 440024
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00f0ff] flex-shrink-0" />
                <span>technodiaz2026@pbcoe.edu.in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#a6ff00] flex-shrink-0" />
                <span>+91 98900 11223 / +91 98231 44556</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => { sound.playClick(); onOpenAdmin(); }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#22130c] hover:bg-[#382014] text-[#fcd34d] border border-[#633c21] text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-[#00ff88]" />
                  <span>Admin Gate Verification Desk</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p>
            © 2026 TECHNODIAZ 2k26 • Department of Computer Science & Engineering, PBCOE Nagpur. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-[#092213] hover:bg-[#0e351d] text-[#00ff88] border border-emerald-700/80 flex items-center gap-1.5 font-semibold transition-all cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
