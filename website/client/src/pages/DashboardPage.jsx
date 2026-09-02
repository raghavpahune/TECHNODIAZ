import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trophy,
  Award,
  Code2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  FileCode2,
  TrendingUp,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../services/api';

export const DashboardPage = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [totalChallengesCount, setTotalChallengesCount] = useState(5);
  const [rank, setRank] = useState('-');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const subRes = await apiRequest('/submissions/my');
        if (subRes.success) setSubmissions(subRes.submissions);

        const chRes = await apiRequest('/challenges');
        if (chRes.success) setTotalChallengesCount(chRes.count || 5);

        const lbRes = await apiRequest('/leaderboard');
        if (lbRes.success && lbRes.leaderboard && user) {
          const myEntry = lbRes.leaderboard.find((st) => st.id === user._id || st.name === user.name);
          if (myEntry) setRank(myEntry.rank);
        }
      } catch (err) {
        console.error('Failed to load student dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, user, navigate]);

  const solvedCount = user?.solvedCount || 0;
  const attemptedCount = user?.attemptedCount || 0;
  const totalScore = user?.score || 0;
  const progressPercent = totalChallengesCount > 0
    ? Math.min(Math.round((solvedCount / totalChallengesCount) * 100), 100)
    : 0;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 1. WELCOME HEADER */}
        <div className="wood-board rounded-3xl p-8 sm:p-10 border-2 border-emerald-500/40 relative overflow-hidden shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Student Ecosystem Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              WELCOME, <span className="text-emerald-400 text-neon-green">{user?.name?.toUpperCase()}</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 font-mono">
              {user?.college} • {user?.branch} • Roll: {user?.rollNumber}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Suite</span>
              </Link>
            )}

            <Link
              to="/coding-challenge"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green transition-all flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              <span>Solve Challenges</span>
            </Link>
          </div>
        </div>

        {/* 2. STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>Attempted</span>
              <Layers className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">{attemptedCount}</div>
            <div className="text-[11px] text-gray-500">Problems started</div>
          </div>

          <div className="wood-board rounded-2xl p-6 border border-emerald-500/50 space-y-2 shadow-neon-green">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-mono">
              <span>Problems Solved</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400 font-mono text-neon-green">{solvedCount}</div>
            <div className="text-[11px] text-emerald-500">Accepted solutions</div>
          </div>

          <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-300 font-mono">
              <span>Total Points</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400 font-mono">{totalScore}</div>
            <div className="text-[11px] text-gray-500">Earned score</div>
          </div>

          <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-2">
            <div className="flex items-center justify-between text-xs text-teal-300 font-mono">
              <span>Current Rank</span>
              <Trophy className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-black text-teal-300 font-mono">
              {rank !== '-' ? `#${rank}` : '-'}
            </div>
            <div className="text-[11px] text-gray-500">Live leaderboard</div>
          </div>
        </div>

        {/* 3. PROGRESS BAR */}
        <div className="wood-board rounded-2xl p-6 sm:p-8 border border-emerald-800/60 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="font-bold text-white font-mono flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>CODING CHALLENGE PROGRESS</span>
            </div>
            <div className="font-mono text-xs text-emerald-400 font-bold">
              Solved: {solvedCount} / {totalChallengesCount} ({progressPercent}%)
            </div>
          </div>

          <div className="w-full h-3.5 bg-[#061009] rounded-full overflow-hidden border border-emerald-950 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 rounded-full transition-all duration-700 shadow-neon-green"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 4. RECENT SUBMISSIONS TABLE */}
        <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-emerald-400" />
              <span>Recent Submissions</span>
            </h2>
            <Link
              to="/submissions"
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 font-bold"
            >
              <span>View All Submissions</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {submissions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="text-gray-400 uppercase bg-[#061009] border-b border-emerald-950">
                  <tr>
                    <th className="px-4 py-3">Challenge</th>
                    <th className="px-4 py-3">Type / Lang</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-950/60 text-gray-200">
                  {submissions.slice(0, 5).map((sub) => (
                    <tr key={sub._id} className="hover:bg-emerald-950/30 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-white">
                        {sub.challenge?.title || 'Challenge'}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400 uppercase">
                        {sub.submissionType === 'CODE' ? sub.language : sub.submissionType}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                            sub.status === 'Accepted'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : sub.status === 'Pending'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-bold text-emerald-300">
                        {sub.score}/{sub.maxScore || sub.challenge?.points || 10}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400">
                        {new Date(sub.createdAt || sub.submittedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-gray-400 font-mono space-y-3">
              <p>You have not submitted any solutions yet.</p>
              <Link
                to="/coding-challenge"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white"
              >
                <span>Browse Available Challenges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
