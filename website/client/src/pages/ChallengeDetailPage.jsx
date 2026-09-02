import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  Clock,
  Code2,
  CheckCircle2,
  Tag,
  Layers,
  HelpCircle,
  FileText,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { MonacoCodeEditor } from '../components/challenge/MonacoCodeEditor';
import { apiRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const ChallengeDetailPage = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      try {
        const data = await apiRequest(`/challenges/${challengeId}`);
        if (data.success && data.challenge) {
          setChallenge(data.challenge);
        } else {
          setError('Challenge not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load challenge details.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 max-w-7xl mx-auto px-4">
        <div className="wood-board rounded-3xl p-12 text-center animate-pulse text-emerald-400 font-mono">
          Loading challenge environment & test suites...
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen pt-28 pb-20 max-w-3xl mx-auto px-4 text-center space-y-4">
        <div className="wood-board rounded-3xl p-12 space-y-4 border border-rose-900/60">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Challenge Not Available</h2>
          <p className="text-sm text-gray-400">{error || 'The requested challenge ID could not be located.'}</p>
          <Link
            to="/coding-challenge"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Challenges</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb & Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/coding-challenge"
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Challenges</span>
          </Link>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
              {challenge.challengeId}
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              {challenge.points} Points
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-950 text-gray-300 border border-emerald-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {challenge.timeLimit || '30 mins'}
            </span>
          </div>
        </div>

        {/* 2-Column Split IDE Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Problem Details & Constraints */}
          <div className="lg:col-span-5 space-y-6">
            <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-6 shadow-xl">
              {/* Problem Title & Badges */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                    {challenge.difficulty}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#0A160F] text-gray-300 border border-emerald-900">
                    {challenge.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#0A160F] text-emerald-400 border border-emerald-900">
                    Type: {challenge.submissionType}
                  </span>
                </div>

                <h1 className="text-2xl font-black font-display text-white">
                  {challenge.title}
                </h1>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {challenge.description}
                </p>
              </div>

              {/* Problem Statement */}
              <div className="space-y-2 pt-2 border-t border-emerald-950">
                <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Problem Statement
                </h3>
                <div className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line font-sans">
                  {challenge.problemStatement}
                </div>
              </div>

              {/* Input & Output Format */}
              {challenge.inputFormat && (
                <div className="space-y-2 pt-2 border-t border-emerald-950 text-xs">
                  <h4 className="font-mono font-bold text-emerald-400 uppercase">Input Format</h4>
                  <p className="text-gray-300 font-mono bg-[#070F0A] p-3 rounded-lg border border-emerald-950">
                    {challenge.inputFormat}
                  </p>
                </div>
              )}

              {challenge.outputFormat && (
                <div className="space-y-2 pt-2 border-t border-emerald-950 text-xs">
                  <h4 className="font-mono font-bold text-emerald-400 uppercase">Output Format</h4>
                  <p className="text-gray-300 font-mono bg-[#070F0A] p-3 rounded-lg border border-emerald-950">
                    {challenge.outputFormat}
                  </p>
                </div>
              )}

              {/* Constraints */}
              {challenge.constraints && (
                <div className="space-y-2 pt-2 border-t border-emerald-950 text-xs">
                  <h4 className="font-mono font-bold text-emerald-400 uppercase">Constraints</h4>
                  <pre className="text-emerald-300/90 font-mono bg-[#070F0A] p-3 rounded-lg border border-emerald-950 whitespace-pre-wrap">
                    {challenge.constraints}
                  </pre>
                </div>
              )}

              {/* Examples */}
              {challenge.examples && challenge.examples.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-emerald-950">
                  <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase">
                    Examples
                  </h4>
                  {challenge.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#061009] border border-emerald-950 text-xs font-mono space-y-1.5"
                    >
                      <div className="text-emerald-400 font-bold">Example {idx + 1}:</div>
                      <div className="text-gray-300">
                        <span className="text-gray-500">Input: </span>
                        <code className="text-white">{ex.input}</code>
                      </div>
                      <div className="text-gray-300">
                        <span className="text-gray-500">Output: </span>
                        <code className="text-emerald-400">{ex.output}</code>
                      </div>
                      {ex.explanation && (
                        <div className="text-gray-400 text-[11px] pt-1 border-t border-emerald-950/60 font-sans">
                          <span className="font-bold text-gray-300">Explanation: </span>
                          {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Submission Panel & Monaco IDE */}
          <div className="lg:col-span-7">
            {isAuthenticated ? (
              <MonacoCodeEditor
                challenge={challenge}
                onSubmissionSuccess={(sub) => {
                  // reload challenge to reflect user submission
                  setChallenge((prev) => ({
                    ...prev,
                    userLatestSubmission: sub,
                    userStatus: sub.status,
                  }));
                }}
              />
            ) : (
              <div className="wood-board rounded-2xl p-10 border border-emerald-800/60 text-center space-y-4 shadow-2xl">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  Authentication Required
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Please log in or register your student account to access the Monaco Code Editor, test against live test cases, and submit your solution.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <Link
                    to="/login"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-white/5 text-gray-200 hover:bg-white/10 border border-emerald-900"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green"
                  >
                    Register Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
