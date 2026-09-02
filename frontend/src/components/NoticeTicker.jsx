import React, { useState, useEffect } from 'react';
import { Bell, Flame, Sparkles, ChevronRight, Info, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';

export const NoticeTicker = ({ onOpenNotices }) => {
  const [notices, setNotices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.getNotices();
        if (res.success && res.notices?.length > 0) {
          setNotices(res.notices);
        }
      } catch (err) {
        console.warn('Using default notices ticker');
      }
    };
    fetchNotices();
  }, []);

  useEffect(() => {
    if (notices.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [notices.length, isPaused]);

  const currentNotice = notices[currentIndex] || {
    title: '🌿 TECHNODIAZ 2k26: Technical Fest on Sept 1st & Sports Fest on Sept 2nd!',
    isUrgent: true,
    category: 'General'
  };

  return (
    <div className="relative z-40 bg-gradient-to-r from-[#180e08] via-[#0d2816] to-[#180e08] border-y border-[#00ff88]/30 shadow-md">
      <div className="container-custom py-2 flex items-center justify-between gap-3 text-xs">
        {/* Left Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#ef4444]/20 border border-red-500/40 text-red-300 font-bold uppercase tracking-wider animate-pulse">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>LIVE TICKER</span>
          </div>
        </div>

        {/* Scrolling / Animated Notice Content */}
        <div
          className="flex-1 overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={onOpenNotices}
          title="Click to view all notices"
        >
          <div className="flex items-center gap-2 text-emerald-100/90 truncate transition-all duration-500">
            {currentNotice.isUrgent && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex-shrink-0">
                URGENT
              </span>
            )}
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 flex-shrink-0">
              {currentNotice.category || 'Announcement'}
            </span>
            <span className="font-medium hover:text-[#00ff88] transition-colors truncate">
              {currentNotice.title}
            </span>
            <span className="text-emerald-400/50 hidden md:inline">• Click to read notice board details</span>
          </div>
        </div>

        {/* Right CTA */}
        <button
          onClick={onOpenNotices}
          className="flex-shrink-0 flex items-center gap-1 text-emerald-400 hover:text-[#00ff88] font-semibold transition-colors px-2 py-0.5 rounded hover:bg-emerald-950/50"
        >
          <span>All Notices ({notices.length || 5})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
