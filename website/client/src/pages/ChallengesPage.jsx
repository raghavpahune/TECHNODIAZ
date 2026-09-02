import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Search,
  Filter,
  Trophy,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Flame,
  Layers,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { ChallengeCard } from '../components/challenge/ChallengeCard';
import { apiRequest } from '../services/api';

export const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Logic', 'Arrays', 'Algorithms', 'Green Tech', 'AI/ML'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory !== 'All') queryParams.append('category', selectedCategory);
        if (selectedDifficulty !== 'All') queryParams.append('difficulty', selectedDifficulty);
        if (searchTerm) queryParams.append('search', searchTerm);

        const data = await apiRequest(`/challenges?${queryParams.toString()}`);
        if (data.success && data.challenges) {
          setChallenges(data.challenges);
        }
      } catch (err) {
        console.error('Failed to fetch challenges:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [selectedCategory, selectedDifficulty, searchTerm]);

  const totalPoints = challenges.reduce((acc, c) => acc + (c.points || 0), 0);

  const workflowSteps = [
    { num: '01', title: 'Register', desc: 'Create your student account with college & roll details.' },
    { num: '02', title: 'Choose Challenge', desc: 'Pick from Logic, Arrays, DP, or Green Tech problems.' },
    { num: '03', title: 'Solve & Test', desc: 'Write code in Monaco IDE and run against test cases.' },
    { num: '04', title: 'Submit Solution', desc: 'Confirm submission to log your solution to the database.' },
    { num: '05', title: 'Get Evaluated', desc: 'Automated runner + CSE judging committee scores work.' },
    { num: '06', title: 'Climb Leaderboard', desc: 'Earn points and compete for the top podium rank.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. HERO BANNER */}
        <div className="wood-board rounded-3xl p-8 sm:p-12 border-2 border-emerald-500/40 relative overflow-hidden shadow-2xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" /> Official CSE Technical Challenge
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight">
            CODING <span className="text-emerald-400 text-neon-green">CHALLENGE</span>
          </h1>

          <p className="text-lg sm:text-xl font-mono text-emerald-300 font-semibold">
            "Think. Code. Innovate." — Can you solve it?
          </p>

          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Solve problems spanning algorithms, sustainable computing, and data structures. Write code in C, C++, Java, Python, or JavaScript.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-[#08120B] border border-emerald-900/60">
              <div className="text-2xl font-black text-white font-mono">{challenges.length}</div>
              <div className="text-xs text-gray-400">Total Challenges</div>
            </div>
            <div className="p-4 rounded-xl bg-[#08120B] border border-emerald-900/60">
              <div className="text-2xl font-black text-emerald-400 font-mono">150+</div>
              <div className="text-xs text-gray-400">Participants</div>
            </div>
            <div className="p-4 rounded-xl bg-[#08120B] border border-emerald-900/60">
              <div className="text-2xl font-black text-teal-400 font-mono">500+</div>
              <div className="text-xs text-gray-400">Problems Solved</div>
            </div>
            <div className="p-4 rounded-xl bg-[#08120B] border border-emerald-900/60">
              <div className="text-2xl font-black text-amber-400 font-mono">{totalPoints}</div>
              <div className="text-xs text-gray-400">Total Points</div>
            </div>
          </div>
        </div>

        {/* 2. FILTERS & SEARCH CONTROLS */}
        <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search challenges by title, ID, or keywords..."
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-xs text-gray-400 font-mono mr-1">Difficulty:</span>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-emerald-500 text-black font-bold shadow-neon-green'
                      : 'bg-[#08120B] text-gray-300 border border-emerald-900/60 hover:border-emerald-500'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-emerald-950">
            <span className="text-xs text-gray-400 font-mono mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-950 text-emerald-300 border-2 border-emerald-400 font-bold'
                    : 'bg-[#061009] text-gray-400 border border-emerald-900/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. CHALLENGES CARDS GRID */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              AVAILABLE CHALLENGES ({challenges.length})
            </h2>
            <Link
              to="/leaderboard"
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 font-bold"
            >
              <span>View Leaderboard</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="wood-board rounded-2xl p-6 h-64 animate-pulse bg-emerald-950/20" />
              ))}
            </div>
          ) : challenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <ChallengeCard key={challenge._id} challenge={challenge} />
              ))}
            </div>
          ) : (
            <div className="wood-board rounded-2xl p-12 text-center space-y-3">
              <HelpCircle className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Challenges Found</h3>
              <p className="text-xs text-gray-400">
                Try selecting different category or difficulty filters.
              </p>
            </div>
          )}
        </div>

        {/* 4. HOW IT WORKS 6-STEP ROADMAP */}
        <div className="py-8">
          <div className="text-center space-y-2 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Submission Workflow
            </div>
            <h2 className="text-3xl font-extrabold font-display text-white">
              HOW IT <span className="text-emerald-400 text-neon-green">WORKS</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {workflowSteps.map((step) => (
              <div
                key={step.num}
                className="wood-board rounded-2xl p-5 text-center space-y-2 border border-emerald-900/60 hover:border-emerald-500 transition-all"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold flex items-center justify-center text-sm shadow-sm">
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-white pt-1">{step.title}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
