import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Search, Filter, Sparkles, Star, TrendingUp } from 'lucide-react';
import { apiRequest } from '../services/api';

export const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [podium, setPodium] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('All');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const query = collegeFilter !== 'All' ? `?college=${collegeFilter}` : '';
        const data = await apiRequest(`/leaderboard${query}`);
        if (data.success) {
          setLeaderboard(data.leaderboard || []);
          setPodium(data.podium || []);
        }
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [collegeFilter]);

  const colleges = ['All', 'PBCOE', 'VNIT Nagpur', 'RCOEM', 'YCCE Nagpur', 'GHRCE', 'IIIT Nagpur'];

  const filteredLeaderboard = leaderboard.filter((st) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      st.name?.toLowerCase().includes(s) ||
      st.rollNumber?.toLowerCase().includes(s) ||
      st.college?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" /> Live Ranking Standings
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            TECHNODIAZ <span className="text-emerald-400 text-neon-green">CODING LEADERBOARD</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto font-mono">
            Calculated in real-time from evaluated code submissions, algorithm efficiency, and test accuracy.
          </p>
        </div>

        {/* 1. TOP 3 PODIUM CARDS */}
        {podium.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-4">
            {/* Rank 2 (Silver) */}
            <div className="order-2 md:order-1 wood-board rounded-3xl p-6 text-center space-y-4 border border-slate-400/40 relative shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-300 text-black font-black flex items-center justify-center text-xl shadow-md border-2 border-white">
                🥈
              </div>
              <div>
                <span className="text-xs font-mono text-slate-300 font-bold">RANK #2</span>
                <h3 className="text-xl font-bold text-white font-display pt-1">{podium[1].name}</h3>
                <p className="text-xs text-gray-400 font-mono">{podium[1].college}</p>
              </div>
              <div className="p-3 bg-[#08120B] rounded-xl border border-emerald-950 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <div className="text-emerald-400 font-bold text-base">{podium[1].score}</div>
                  <div className="text-gray-500 text-[10px]">Points</div>
                </div>
                <div>
                  <div className="text-white font-bold text-base">{podium[1].solved}</div>
                  <div className="text-gray-500 text-[10px]">Solved</div>
                </div>
              </div>
            </div>

            {/* Rank 1 (Gold - Center & Elevated) */}
            <div className="order-1 md:order-2 wood-board rounded-3xl p-8 text-center space-y-4 border-2 border-amber-400/80 relative shadow-2xl hover:-translate-y-2 transition-all bg-gradient-to-b from-[#182319] to-[#0D1812] -mt-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black font-black text-[10px] font-mono px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                👑 Current Leader
              </div>
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-black font-black flex items-center justify-center text-3xl shadow-neon-green border-2 border-white">
                🥇
              </div>
              <div>
                <span className="text-xs font-mono text-amber-300 font-bold">CHAMPION #1</span>
                <h3 className="text-2xl font-black text-white font-display pt-1">{podium[0].name}</h3>
                <p className="text-xs text-emerald-300 font-mono">{podium[0].college}</p>
              </div>
              <div className="p-3.5 bg-[#061009] rounded-xl border border-amber-500/40 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <div className="text-amber-300 font-extrabold text-lg">{podium[0].score}</div>
                  <div className="text-gray-400 text-[10px]">Total Points</div>
                </div>
                <div>
                  <div className="text-white font-extrabold text-lg">{podium[0].solved}</div>
                  <div className="text-gray-400 text-[10px]">Problems Solved</div>
                </div>
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="order-3 md:order-3 wood-board rounded-3xl p-6 text-center space-y-4 border border-amber-800/60 relative shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-700 text-white font-black flex items-center justify-center text-xl shadow-md border-2 border-amber-500">
                🥉
              </div>
              <div>
                <span className="text-xs font-mono text-amber-500 font-bold">RANK #3</span>
                <h3 className="text-xl font-bold text-white font-display pt-1">{podium[2].name}</h3>
                <p className="text-xs text-gray-400 font-mono">{podium[2].college}</p>
              </div>
              <div className="p-3 bg-[#08120B] rounded-xl border border-emerald-950 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <div className="text-emerald-400 font-bold text-base">{podium[2].score}</div>
                  <div className="text-gray-500 text-[10px]">Points</div>
                </div>
                <div>
                  <div className="text-white font-bold text-base">{podium[2].solved}</div>
                  <div className="text-gray-500 text-[10px]">Solved</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SEARCH & COLLEGE FILTER */}
        <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leaderboard by student name, roll number, or college..."
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-xs text-gray-400 font-mono mr-1">College:</span>
              {colleges.map((col) => (
                <button
                  key={col}
                  onClick={() => setCollegeFilter(col)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                    collegeFilter === col
                      ? 'bg-emerald-500 text-black font-bold shadow-neon-green'
                      : 'bg-[#08120B] text-gray-300 border border-emerald-900/60 hover:border-emerald-500'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. RANKINGS TABLE */}
        <div className="wood-board rounded-2xl border border-emerald-900/60 overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-emerald-400 animate-pulse">
              Computing live ranks & accuracy percentages...
            </div>
          ) : filteredLeaderboard.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#08120B] text-gray-400 uppercase border-b border-emerald-950">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">College / Dept</th>
                    <th className="px-6 py-4">Solved</th>
                    <th className="px-6 py-4">Accuracy</th>
                    <th className="px-6 py-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-950/60 text-gray-200">
                  {filteredLeaderboard.map((st) => (
                    <tr
                      key={st.id || st.rank}
                      className={`hover:bg-emerald-950/40 transition-colors ${
                        st.rank === 1
                          ? 'bg-amber-950/20'
                          : st.rank === 2
                          ? 'bg-slate-900/20'
                          : st.rank === 3
                          ? 'bg-amber-900/10'
                          : ''
                      }`}
                    >
                      <td className="px-6 py-4 font-bold">
                        {st.rank === 1 ? '🥇 1' : st.rank === 2 ? '🥈 2' : st.rank === 3 ? '🥉 3' : `#${st.rank}`}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-sm">{st.name}</div>
                        <div className="text-[10px] text-gray-400">{st.rollNumber}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        <div>{st.college}</div>
                        <div className="text-[10px] text-gray-500">{st.branch} • {st.year}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        {st.solved}
                      </td>
                      <td className="px-6 py-4 text-emerald-400 font-bold">
                        {st.accuracy}
                      </td>
                      <td className="px-6 py-4 text-right font-black text-sm text-emerald-300">
                        {st.score} PTS
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-gray-400 font-mono">
              No ranked participants found for this query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
