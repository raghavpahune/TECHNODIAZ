import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileCode2,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Award,
  X,
  ArrowLeft,
  Code,
  Calendar,
  Layers,
} from 'lucide-react';
import { apiRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const SubmissionsPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedSub, setSelectedSub] = useState(null);

  const statuses = ['All', 'Accepted', 'Pending', 'Partially Correct', 'Wrong Answer', 'Rejected'];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchSubmissions = async () => {
      try {
        const data = await apiRequest('/submissions/my');
        if (data.success && data.submissions) {
          setSubmissions(data.submissions);
        }
      } catch (err) {
        console.error('Failed to load submissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [isAuthenticated, navigate]);

  const filtered = submissions.filter((s) => {
    if (statusFilter === 'All') return true;
    return s.status === statusFilter;
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black font-display text-white tracking-tight">
              MY <span className="text-emerald-400 text-neon-green">SUBMISSIONS</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-mono">
              View your code submission history, test case metrics, and faculty evaluations.
            </p>
          </div>

          <Link
            to="/coding-challenge"
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green transition-all"
          >
            New Submission
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs text-gray-400 font-mono mr-1">Status:</span>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-emerald-500 text-black font-bold shadow-neon-green'
                  : 'bg-[#08120B] text-gray-300 border border-emerald-900/60 hover:border-emerald-500'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Submissions Table */}
        <div className="wood-board rounded-2xl border border-emerald-900/60 overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-emerald-400 animate-pulse">
              Loading submission logs...
            </div>
          ) : filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#08120B] text-gray-400 uppercase border-b border-emerald-950">
                  <tr>
                    <th className="px-4 py-3.5">Submission ID</th>
                    <th className="px-4 py-3.5">Challenge</th>
                    <th className="px-4 py-3.5">Language / Type</th>
                    <th className="px-4 py-3.5">Submitted At</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Score</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-950/60 text-gray-200">
                  {filtered.map((sub) => (
                    <tr
                      key={sub._id}
                      onClick={() => setSelectedSub(sub)}
                      className="hover:bg-emerald-950/40 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3.5 font-bold text-emerald-400">
                        {sub.submissionId}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-white max-w-[220px] truncate">
                        {sub.challenge?.title || 'Challenge'}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400 uppercase">
                        {sub.submissionType === 'CODE' ? sub.language : sub.submissionType}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400">
                        {new Date(sub.createdAt || sub.submittedAt).toLocaleString()}
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
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSub(sub);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 flex items-center gap-1 ml-auto text-[11px]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-gray-400 font-mono space-y-3">
              <FileCode2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p>No submissions found under this filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Submission Details Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="wood-board max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-6 border-2 border-emerald-500/50 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedSub(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-2 border-b border-emerald-950 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                  {selectedSub.submissionId}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                    selectedSub.status === 'Accepted'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {selectedSub.status}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white font-display">
                {selectedSub.challenge?.title}
              </h2>
            </div>

            {/* Score & Timing Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#08120B] rounded-xl border border-emerald-950">
                <span className="text-gray-400">Score Awarded:</span>
                <div className="text-base font-bold text-emerald-400 pt-1">
                  {selectedSub.score}/{selectedSub.maxScore || selectedSub.challenge?.points || 10} Pts
                </div>
              </div>

              <div className="p-3 bg-[#08120B] rounded-xl border border-emerald-950">
                <span className="text-gray-400">Type / Lang:</span>
                <div className="text-base font-bold text-white uppercase pt-1">
                  {selectedSub.submissionType === 'CODE' ? selectedSub.language : selectedSub.submissionType}
                </div>
              </div>

              <div className="p-3 bg-[#08120B] rounded-xl border border-emerald-950">
                <span className="text-gray-400">Execution Time:</span>
                <div className="text-base font-bold text-teal-300 pt-1">
                  {selectedSub.executionTime || 'N/A'}
                </div>
              </div>

              <div className="p-3 bg-[#08120B] rounded-xl border border-emerald-950">
                <span className="text-gray-400">Memory Used:</span>
                <div className="text-base font-bold text-teal-300 pt-1">
                  {selectedSub.memoryUsed || 'N/A'}
                </div>
              </div>
            </div>

            {/* Feedback / Evaluation Notes */}
            {selectedSub.feedback && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-1.5">
                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  Faculty Evaluation Feedback:
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-mono">
                  {selectedSub.feedback}
                </p>
              </div>
            )}

            {/* Submitted Code or Answer */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase">
                {selectedSub.submissionType === 'CODE' ? 'Submitted Code' : 'Submitted Solution'}
              </h4>
              <div className="bg-[#050C07] rounded-xl border border-emerald-950 p-4 max-h-64 overflow-y-auto font-mono text-xs text-gray-200">
                {selectedSub.submissionType === 'CODE' ? (
                  <pre className="whitespace-pre">{selectedSub.code}</pre>
                ) : selectedSub.submissionType === 'TEXT' ? (
                  <p className="whitespace-pre-line">{selectedSub.answer}</p>
                ) : (
                  <div>Selected Option: <span className="text-emerald-400 font-bold">{selectedSub.selectedOption}</span></div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSub(null)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
