import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, RefreshCw, Search, Sparkles, QrCode, Tag, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { api } from '../services/api';
import { sound } from '../utils/audio';

export const TechNewsSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await api.getTechNews();
      if (res.success && res.articles) {
        setArticles(res.articles);
      }
    } catch (err) {
      console.warn('News fetch error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRefresh = () => {
    sound.playClick();
    fetchNews();
  };

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeCategory === 'All') return matchesSearch;
    return matchesSearch && art.tags?.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()));
  });

  return (
    <section id="tech-news" className="py-12 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122e1a] border border-[#00ff88]/40 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>Automated Technology Feed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Live Global Tech News
          </h2>
          <p className="text-sm text-emerald-200/80">
            Real-time breakthroughs in Artificial Intelligence, Sustainable Computing, Web Systems, and Robotics.
          </p>
        </div>

        {/* Top Controls: Search, Category Filters, and Refresh */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech headlines or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#081f12] border border-[#1b4329] text-white text-xs placeholder:text-emerald-500/70 focus:outline-none focus:border-[#00ff88]"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'AI', 'GreenTech', 'Web', 'Robotics', 'Cyber'].map((cat) => (
              <button
                key={cat}
                onClick={() => { sound.playClick(); setActiveCategory(cat); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#00ff88] text-[#031409] font-bold shadow-[0_0_12px_rgba(0,255,136,0.4)]'
                    : 'bg-[#081a0e] text-emerald-300 border border-emerald-800/60 hover:bg-[#0e2c1a]'
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={handleRefresh}
              disabled={loading}
              title="Refresh News Feed"
              className="p-2 rounded-lg bg-[#081a0e] text-[#00ff88] border border-emerald-800 hover:bg-[#0e2c1a] transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Main Grid: Articles + QR Code Notice Board from Reference Image */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left / Top Wooden Notice Board: "SCAN FOR LIVE TECH NEWS" matching the reference photo! */}
          <div className="lg:col-span-4 wood-frame p-5 flex flex-col justify-between items-center text-center space-y-4">
            <span className="brass-pin pin-tl" />
            <span className="brass-pin pin-tr" />
            <span className="brass-pin pin-bl" />
            <span className="brass-pin pin-br" />

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#fcd34d] font-brand block">
                PBCOE CSE DIGITAL DESK
              </span>
              <h3 className="text-xl font-bold text-white font-heading">TECH NEWS</h3>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                Stay updated with the latest in technology, innovation, and breakthroughs from around the world.
              </p>
            </div>

            {/* QR Code */}
            <div className="p-3 bg-white rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.3)]">
              <QRCodeSVG
                value="https://technodiaz.pbcoe.ac.in/news"
                size={140}
                level="M"
                includeMargin={false}
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-[#00ff88] uppercase tracking-wider font-mono">
                SCAN FOR LIVE TECH NEWS
              </p>
              <p className="text-[11px] text-emerald-300/80">
                Open the future with one scan!
              </p>
            </div>
          </div>

          {/* Right: Articles List */}
          <div className="lg:col-span-8 space-y-4">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-4 rounded-xl bg-[#091f12] border border-emerald-900 animate-pulse h-28" />
                ))}
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#081a0e] border border-emerald-900 text-center text-emerald-300">
                No articles matching your criteria. Try searching for "AI", "GreenTech", or "Web".
              </div>
            ) : (
              filteredArticles.map((art) => (
                <div
                  key={art.id}
                  className="p-4 rounded-xl bg-[#081c10] border border-[#1b482b] hover:border-[#00ff88]/60 transition-all flex flex-col sm:flex-row gap-4 items-start group"
                >
                  {art.image && (
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full sm:w-28 h-24 object-cover rounded-lg border border-emerald-800 flex-shrink-0"
                    />
                  )}

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider font-bold">
                        {art.source}
                      </span>
                      <span className="text-[10px] text-emerald-400/70 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(art.publishedAt).toLocaleDateString()}</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-white group-hover:text-[#00ff88] transition-colors line-clamp-2">
                      {art.title}
                    </h4>

                    <p className="text-xs text-emerald-200/80 line-clamp-2 leading-relaxed">
                      {art.description}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex flex-wrap gap-1">
                        {art.tags?.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-[#031309] text-[10px] font-mono text-emerald-300 border border-emerald-800/80"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={art.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#00ff88] hover:underline flex items-center gap-1 font-medium"
                      >
                        <span>Read Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
