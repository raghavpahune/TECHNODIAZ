import React, { useState, useEffect } from 'react';
import { Newspaper, Clock, ExternalLink, Sparkles, Tag } from 'lucide-react';
import { apiRequest } from '../../services/api';

export const TechNewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await apiRequest('/content/news');
        if (data.success && data.news) {
          setNews(data.news);
        }
      } catch (err) {
        console.error('Failed to load tech news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section id="news" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5" /> Department Tech Bulletin
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              TECH <span className="text-emerald-400 text-neon-green">NEWS & DISPATCHES</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Latest breakthroughs at the intersection of computer engineering, green computing, edge intelligence, and distributed networks.
            </p>
          </div>
          <div className="text-xs text-emerald-400/80 font-mono bg-emerald-950/40 px-3.5 py-1.5 rounded-lg border border-emerald-800/40 self-start md:self-auto">
            Updated for TECHNODIAZ 2K26
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, idx) => (
            <div
              key={item._id || idx}
              className="wood-board rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Green glow top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono font-medium">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 font-mono">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {item.readTime || '3 min read'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {item.content}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-emerald-950 flex items-center justify-between text-xs text-gray-400">
                <span className="font-mono text-emerald-500/90">{item.source || 'CSE Tech Bulletin'}</span>
                <span className="text-emerald-400 font-semibold group-hover:underline flex items-center gap-1">
                  Read article <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
