import React, { useState, useEffect } from 'react';
import { Leaf, Cpu, Calendar, Bell, QrCode, ShieldCheck, Menu, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const Navbar = ({ onOpenAdmin, onOpenRegister, onScrollTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown to Sept 1, 2026
  useEffect(() => {
    const targetDate = new Date('2026-09-01T09:00:00+05:30').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.isMuted = next;
    if (!next) sound.playClick();
  };

  const navLinks = [
    { label: 'Cyber Tree', target: 'cyber-tree' },
    { label: 'Events', target: 'events' },
    { label: 'Coding Challenge', target: 'coding-challenge' },
    { label: 'Schedule', target: 'schedule' },
    { label: 'Notice Boards', target: 'boards' },
    { label: 'Tech News', target: 'tech-news' },
    { label: 'Core Team', target: 'core-team' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050f08]/95 backdrop-blur-md py-2.5 border-b border-[#00ff88]/30 shadow-[0_8px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#040d07]/90 to-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Brand Logo & College */}
        <div
          onClick={() => { sound.playClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#10b981] to-[#042f1a] border border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.5)] group-hover:scale-105 transition-transform">
            <Leaf className="w-6 h-6 text-[#00ff88] group-hover:rotate-12 transition-transform" />
            <Cpu className="w-3.5 h-3.5 text-[#00f0ff] absolute bottom-1 right-1" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-xl tracking-wider bg-gradient-to-r from-[#00ff88] via-[#e5f5ea] to-[#00f0ff] bg-clip-text text-transparent">
                TECHNODIAZ 2k26
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/40">
                CSE • PBCOE
              </span>
            </div>
            <p className="text-[11px] text-emerald-300/80 font-medium flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
              Sept 1 (Tech) & Sept 2 (Sports)
            </p>
          </div>
        </div>

        {/* Live Countdown Clock */}
        <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081a0e]/90 border border-[#00ff88]/30 shadow-inner text-xs font-mono">
          <Calendar className="w-3.5 h-3.5 text-[#00ff88]" />
          {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
            <span className="text-[#00ff88] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
              FEST LIVE NOW
            </span>
          ) : (
            <>
              <span className="text-emerald-400 font-semibold">Fest In:</span>
              <span className="text-white font-bold">{timeLeft.days}d</span>
              <span className="text-emerald-500">:</span>
              <span className="text-white font-bold">{timeLeft.hours}h</span>
              <span className="text-emerald-500">:</span>
              <span className="text-white font-bold">{timeLeft.minutes}m</span>
              <span className="text-emerald-500">:</span>
              <span className="text-[#00ff88] font-bold">{timeLeft.seconds}s</span>
            </>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-5 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => { sound.playClick(); onScrollTo(link.target); }}
              className="text-emerald-100/90 hover:text-[#00ff88] transition-colors py-1 relative group cursor-pointer"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00ff88] transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Audio FX Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 rounded-lg bg-[#0d2816] text-emerald-300 hover:text-[#00ff88] border border-emerald-800/60 hover:border-[#00ff88]/50 transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00ff88]" />}
          </button>

          {/* Team Register CTA */}
          <button
            onClick={() => { sound.playClick(); onOpenRegister(); }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] text-[#031c0d] hover:from-[#00ff88] hover:to-[#10b981] shadow-[0_0_15px_rgba(0,255,136,0.4)] hover:scale-105 transition-all cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            Register Team
          </button>

          {/* Admin Portal CTA */}
          <button
            onClick={() => { sound.playClick(); onOpenAdmin(); }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#2a1810] text-[#fcd34d] border border-[#633c21] hover:border-[#fcd34d] hover:bg-[#3d2314] shadow-md transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="hidden md:inline">Admin Portal</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#0d2816] text-emerald-300 hover:text-[#00ff88] border border-emerald-800/60"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#06140a]/98 border-b border-[#00ff88]/30 px-6 py-5 mt-2 space-y-3 shadow-2xl animate-in slide-in-from-top">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/50">
            <span className="text-xs font-mono text-emerald-400">Fest Status:</span>
            <span className="text-xs font-bold font-mono text-[#00ff88] flex items-center gap-1">
              {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
                  FEST LIVE NOW
                </>
              ) : (
                `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
              )}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  onScrollTo(link.target);
                }}
                className="text-left px-3 py-2 rounded-md text-sm text-emerald-100 hover:bg-[#10381e] hover:text-[#00ff88]"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-emerald-900/50 flex gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="flex-1 py-2.5 text-xs font-bold text-center uppercase tracking-wider rounded-lg bg-[#00ff88] text-[#041c0d]"
            >
              Register Team
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#2a1810] text-[#fcd34d] border border-[#633c21]"
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
