import React, { useState, useEffect } from 'react';
import { Bell, Flame, X, Calendar, User, Search, Tag, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../utils/audio';

export const AllNoticesModal = ({ isOpen, onClose }) => {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  useEffect(() => {
    if (isOpen) {
      const fetchAll = async () => {
        try {
          const res = await api.getNotices();
          if (res.success && res.notices) {
            setNotices(res.notices);
          }
        } catch (e) {}
      };
      fetchAll();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = notices.filter((n) => {
    const match = n.title?.toLowerCase().includes(search.toLowerCase()) || n.content?.toLowerCase().includes(search.toLowerCase());
    if (filterCat === 'All') return match;
    return match && n.category === filterCat;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-800/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-950/80 border border-red-500/50 text-red-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white font-heading">
                Dynamic Notice Board
              </h3>
              <p className="text-xs text-emerald-300 font-mono">Live Department Announcements</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search */}
        <div className="my-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#081a0e] border border-emerald-800 text-white text-xs"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {['All', 'General', 'Technical', 'Sports', 'Urgent'].map((c) => (
              <button
                key={c}
                onClick={() => { sound.playClick(); setFilterCat(c); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                  filterCat === c
                    ? 'bg-[#00ff88] text-black font-bold'
                    : 'bg-[#081a0e] text-emerald-300 border border-emerald-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Notices List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-emerald-400">No notices found.</div>
          ) : (
            filtered.map((n) => (
              <div
                key={n.id || n._id}
                className={`p-4 rounded-xl border space-y-2 ${
                  n.isUrgent
                    ? 'bg-[#1f100a] border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'bg-[#081b10] border-emerald-800/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {n.isUrgent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/50">
                        URGENT
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-900/60 text-emerald-300 border border-emerald-700/60">
                      {n.category || 'General'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400/80 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                  </span>
                </div>

                <h4 className="font-bold text-sm text-white">{n.title}</h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed">{n.content}</p>

                <div className="pt-1 flex items-center justify-between text-[10px] text-emerald-400/70 border-t border-emerald-900/50">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>Posted by: {n.author || 'CSE Committee'}</span>
                  </span>
                  <span>PBCOE Technodiaz</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 mt-3 border-t border-emerald-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-200 hover:bg-emerald-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
