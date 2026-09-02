import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Clock, Award, CheckCircle2, ArrowRight, Layers, FileText, HelpCircle } from 'lucide-react';

export const ChallengeCard = ({ challenge }) => {
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/40';
      case 'Hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/40';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
    }
  };

  const getSubmissionTypeIcon = (type) => {
    switch (type) {
      case 'CODE': return Code;
      case 'TEXT': return FileText;
      case 'MCQ': return HelpCircle;
      default: return Code;
    }
  };

  const TypeIcon = getSubmissionTypeIcon(challenge.submissionType);
  const isSolved = challenge.userStatus === 'Accepted';

  return (
    <div className={`wood-board rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 relative overflow-hidden ${
      isSolved ? 'border-emerald-500/60 shadow-neon-green' : 'border-emerald-900/60'
    }`}>
      {/* Solved Status Indicator Bar */}
      {isSolved && (
        <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-mono font-bold px-3 py-0.5 rounded-bl-xl flex items-center gap-1 shadow-md">
          <CheckCircle2 className="w-3 h-3" /> SOLVED
        </div>
      )}

      <div className="space-y-4">
        {/* Card Header Info */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            {challenge.challengeId}
          </span>
          <span className={`font-mono px-2 py-0.5 rounded border font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
            {challenge.difficulty}
          </span>
          <span className="font-mono px-2 py-0.5 rounded bg-[#061009] text-gray-300 border border-emerald-950">
            {challenge.category}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors flex items-start gap-2">
            <TypeIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{challenge.title}</span>
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">
            {challenge.description}
          </p>
        </div>

        {/* Metadata Footer */}
        <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pt-2 border-t border-emerald-950">
          <span className="flex items-center gap-1 text-emerald-300 font-bold">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            {challenge.points} Points
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            {challenge.timeLimit || '30 mins'}
          </span>
          <span className="text-gray-500">
            {challenge.solveCount || 0} Solved
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6 pt-2">
        <Link
          to={`/coding-challenge/${challenge.challengeId || challenge._id}`}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            isSolved
              ? 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green'
          }`}
        >
          <span>{isSolved ? 'Review Solution' : 'Start Challenge'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
