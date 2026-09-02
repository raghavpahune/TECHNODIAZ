import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Terminal, CheckCircle, XCircle, Sparkles, Award, HelpCircle, ArrowRight, RefreshCw, Flame, Code } from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../utils/audio';

export const CodingChallenge = () => {
  const [challenges, setChallenges] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(100);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await api.getCodingChallenges();
        if (res.success && res.challenges?.length > 0) {
          setChallenges(res.challenges);
        }
      } catch (e) {
        console.warn('Using default challenges');
      }
    };
    fetchChallenges();
  }, []);

  const current = challenges[activeIdx] || {
    id: 'challenge_1',
    title: 'Board Puzzle: Find the Missing Number',
    difficulty: 'Easy',
    language: 'Python',
    questionText: 'Analyze the mathematical formula and determine the exact return value for nums = [1, 2, 4, 5, 6].',
    codeSnippet: `def missing_num(nums):
    n = len(nums) + 1
    total = n * (n + 1) // 2
    return total - sum(nums)

# Input Array:
nums = [1, 2, 4, 5, 6]
result = missing_num(nums)
print(result)`,
    options: [
      { label: '3', isCorrect: true },
      { label: '4', isCorrect: false },
      { label: '7', isCorrect: false },
      { label: '0', isCorrect: false }
    ],
    explanation: 'n = 5 + 1 = 6. Total sum from 1 to 6 is (6 * 7) // 2 = 21. Sum of given nums is 1+2+4+5+6 = 18. Missing number is 21 - 18 = 3.',
    rewardPoints: 100
  };

  const handleSelectOption = (optLabel) => {
    sound.playClick();
    setSelectedOption(optLabel);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!selectedOption) return;
    setLoading(true);
    try {
      sound.playClick();
      const res = await api.verifyChallenge(current.id || current._id, selectedOption);
      setResult(res);

      if (res.isCorrect) {
        sound.playSuccess();
        setScore((prev) => prev + (res.pointsEarned || 100));

        // Trigger celebratory confetti animation
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00ff88', '#00f0ff', '#a6ff00', '#ffffff', '#10b981']
        });
      } else {
        sound.playError();
      }
    } catch (err) {
      // Fallback evaluation
      const correctOpt = current.options.find(o => o.isCorrect)?.label;
      const isCorrect = correctOpt === selectedOption;
      if (isCorrect) {
        sound.playSuccess();
        setResult({
          isCorrect: true,
          message: '🎉 Outstanding! You cracked the Daily Coding Challenge!',
          pointsEarned: current.rewardPoints || 100,
          explanation: current.explanation,
          badge: '🌿 Eco-Coder 2k26 Certified'
        });
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00ff88', '#00f0ff', '#a6ff00']
        });
      } else {
        sound.playError();
        setResult({
          isCorrect: false,
          message: 'Not quite! Calculate the expected sum of 1 to 6 and subtract array sum.',
          hint: 'Sum formula: n*(n+1)//2 with n=6.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const nextChallenge = (idx) => {
    sound.playClick();
    setActiveIdx(idx);
    setSelectedOption(null);
    setResult(null);
    setShowHint(false);
  };

  return (
    <section id="coding-challenge" className="py-12 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122e1a] border border-[#00ff88]/40 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Fest Daily Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Daily Coding Arena
          </h2>
          <p className="text-sm text-emerald-200/80">
            Directly modeled after the Technodiaz Wall Board. Solve code puzzles, unlock badges, and claim instant leaderboard points!
          </p>
        </div>

        {/* Challenge Selection Tabs */}
        {challenges.length > 1 && (
          <div className="flex justify-center gap-2 mb-6 overflow-x-auto pb-2">
            {challenges.map((c, i) => (
              <button
                key={c.id || i}
                onClick={() => nextChallenge(i)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeIdx === i
                    ? 'bg-[#00ff88] text-[#041c0d] shadow-[0_0_15px_rgba(0,255,136,0.5)]'
                    : 'bg-[#0b2214] text-emerald-300 hover:bg-[#123820] border border-emerald-800/50'
                }`}
              >
                <span>Challenge #{i + 1}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30">
                  {c.difficulty || 'Easy'}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Main Board Container replicating the wooden board in the photo */}
        <div className="max-w-4xl mx-auto wood-frame p-6 sm:p-8">
          {/* Pins */}
          <span className="brass-pin pin-tl" />
          <span className="brass-pin pin-tr" />
          <span className="brass-pin pin-bl" />
          <span className="brass-pin pin-br" />

          {/* Board Header Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#633c21]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#091f12] border border-[#00ff88]/50 text-[#00ff88]">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest text-[#fcd34d] uppercase font-brand">
                  PBCOE CSE CODING CHALLENGE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  {current.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-[#07160c] border border-emerald-800 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Points: +{current.rewardPoints || 100}</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#07160c] border border-emerald-800 text-xs font-mono text-[#00ff88] font-bold">
                Total Score: {score}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            {/* Left: Code Snippet on Chalkboard / JetBrains Dark Theme */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs text-emerald-300/80 px-1 font-mono">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#00ff88]" />
                  <span>language: {current.language.toLowerCase()}</span>
                </span>
                <span className="text-[11px] text-amber-300">Can you solve it?</span>
              </div>

              {/* Code Box */}
              <div className="relative p-4 rounded-xl bg-[#07120a] border border-[#1b4329] shadow-inner font-mono text-xs sm:text-sm text-emerald-100 overflow-x-auto">
                <pre className="leading-relaxed whitespace-pre-wrap">{current.codeSnippet}</pre>
              </div>

              <p className="text-xs text-emerald-200/90 font-medium pt-1">
                {current.questionText}
              </p>
            </div>

            {/* Right: Options & Evaluation */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                  Select Output Option:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {current.options.map((opt, i) => {
                    const isSelected = selectedOption === opt.label;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(opt.label)}
                        className={`p-3 rounded-xl border text-sm font-mono font-bold transition-all text-center cursor-pointer ${
                          isSelected
                            ? 'bg-[#00ff88] text-[#031c0d] border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.6)] scale-[1.02]'
                            : 'bg-[#0a1e12] text-white border-[#1e4d2e] hover:border-[#00ff88]/60 hover:bg-[#0e2c1a]'
                        }`}
                      >
                        Option {i + 1}: <span className="text-base">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit & Hint Controls */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOption || loading}
                  className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    selectedOption && !loading
                      ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-[#031409] hover:from-[#00ff88] hover:to-[#10b981] shadow-[0_0_20px_rgba(0,255,136,0.4)]'
                      : 'bg-emerald-950/40 text-emerald-600 border border-emerald-900/40 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{loading ? 'Evaluating Algorithm...' : 'Submit Answer'}</span>
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                  </button>

                  <span className="text-[11px] text-emerald-400/70">
                    Instant automated grading
                  </span>
                </div>

                {showHint && (
                  <div className="p-3 rounded-lg bg-[#24170a] border border-[#854d0e] text-xs text-amber-200 animate-in fade-in">
                    💡 Sum of numbers from 1 to n is given by <code>n*(n+1)/2</code>. For n = 6, total sum is 21.
                  </div>
                )}
              </div>

              {/* Result & Celebration Box */}
              {result && (
                <div
                  className={`p-4 rounded-xl border animate-in slide-in-from-bottom-2 ${
                    result.isCorrect
                      ? 'bg-[#082a17] border-[#00ff88] text-emerald-100 shadow-[0_0_20px_rgba(0,255,136,0.3)]'
                      : 'bg-[#2a0e0e] border-red-500/60 text-red-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {result.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-[#00ff88] flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-white">{result.message}</h4>
                      {result.explanation && (
                        <p className="text-xs text-emerald-200/90 leading-relaxed font-mono">
                          {result.explanation}
                        </p>
                      )}
                      {result.badge && (
                        <div className="inline-block mt-2 px-2.5 py-1 rounded bg-[#00ff88]/20 border border-[#00ff88] text-[11px] font-bold text-[#00ff88]">
                          {result.badge}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
