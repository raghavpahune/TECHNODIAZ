import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  Code2,
  FileCheck2,
  Users,
  Bell,
  Calendar,
  Plus,
  Trash2,
  Edit,
  Copy,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Award,
  Search,
  Check,
  X,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { apiRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AdminDashboardPage = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [students, setStudents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Evaluation State
  const [evaluationModalSub, setEvaluationModalSub] = useState(null);
  const [evalScore, setEvalScore] = useState(0);
  const [evalStatus, setEvalStatus] = useState('Accepted');
  const [evalFeedback, setEvalFeedback] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Challenge Form Modal
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [challengeForm, setChallengeForm] = useState({
    title: '',
    challengeId: '',
    category: 'Logic',
    difficulty: 'Easy',
    points: 10,
    timeLimit: '30 mins',
    submissionType: 'CODE',
    description: '',
    problemStatement: '',
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    mcqQuestion: '',
    mcqOptions: [
      { key: 'A', text: '' },
      { key: 'B', text: '' },
      { key: 'C', text: '' },
      { key: 'D', text: '' },
    ],
    mcqCorrectAnswer: 'A',
  });

  // Announcement Form Modal
  const [showAnnModal, setShowAnnModal] = useState(false);
  const [annForm, setAnnForm] = useState({
    title: '',
    content: '',
    priority: 'normal',
    tag: 'ANNOUNCEMENT',
    deadline: '',
  });

  // Event Form Modal
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Technical',
    description: '',
    date: 'September 6, 2026',
    time: '10:00 AM',
    venue: 'CSE Lab 2',
    coordinator: 'Dept. of CSE',
    prizePool: '₹10,000 Cash Prize',
  });

  // Delete Confirmation State
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Ensure Admin Auth
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user && user.role !== 'admin') {
      toast.error('Access denied: Administrator privileges required.');
      navigate('/dashboard');
      return;
    }
    loadData();
  }, [isAuthenticated, user, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, chRes, subRes, stRes, annRes, evtRes] = await Promise.all([
        apiRequest('/admin/statistics'),
        apiRequest('/challenges'),
        apiRequest('/submissions/admin/all'),
        apiRequest('/admin/students'),
        apiRequest('/content/announcements'),
        apiRequest('/content/events'),
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (chRes.success) setChallenges(chRes.challenges);
      if (subRes.success) setSubmissions(subRes.submissions);
      if (stRes.success) setStudents(stRes.students);
      if (annRes.success) setAnnouncements(annRes.announcements);
      if (evtRes.success) setEvents(evtRes.events);
    } catch (err) {
      toast.error('Failed to load admin dataset.');
    } finally {
      setLoading(false);
    }
  };

  // Open Evaluation Modal for a submission
  const openEvaluationModal = (sub) => {
    setEvaluationModalSub(sub);
    setEvalScore(sub.score || sub.maxScore || 10);
    setEvalStatus(sub.status === 'Pending' ? 'Accepted' : sub.status);
    setEvalFeedback(sub.feedback || 'Good algorithmic implementation.');
  };

  // Save Evaluation
  const handleSaveEvaluation = async () => {
    if (!evaluationModalSub) return;
    setIsEvaluating(true);

    try {
      const data = await apiRequest(`/submissions/admin/${evaluationModalSub._id}/evaluate`, {
        method: 'PUT',
        body: {
          score: Number(evalScore),
          status: evalStatus,
          feedback: evalFeedback,
        },
      });

      if (data.success) {
        toast.success(`Submission ${evaluationModalSub.submissionId} graded & score updated!`);
        setEvaluationModalSub(null);
        loadData();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to evaluate submission.');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Challenge CRUD
  const handleOpenCreateChallenge = () => {
    setEditingChallenge(null);
    setChallengeForm({
      title: '',
      challengeId: `TDZ-CH-${String(challenges.length + 1).padStart(2, '0')}`,
      category: 'Logic',
      difficulty: 'Easy',
      points: 10,
      timeLimit: '30 mins',
      submissionType: 'CODE',
      description: '',
      problemStatement: '',
      inputFormat: '',
      outputFormat: '',
      constraints: '',
      mcqQuestion: '',
      mcqOptions: [
        { key: 'A', text: '' },
        { key: 'B', text: '' },
        { key: 'C', text: '' },
        { key: 'D', text: '' },
      ],
      mcqCorrectAnswer: 'A',
    });
    setShowChallengeModal(true);
  };

  const handleOpenEditChallenge = (ch) => {
    setEditingChallenge(ch);
    setChallengeForm({
      title: ch.title || '',
      challengeId: ch.challengeId || '',
      category: ch.category || 'Logic',
      difficulty: ch.difficulty || 'Easy',
      points: ch.points || 10,
      timeLimit: ch.timeLimit || '30 mins',
      submissionType: ch.submissionType || 'CODE',
      description: ch.description || '',
      problemStatement: ch.problemStatement || '',
      inputFormat: ch.inputFormat || '',
      outputFormat: ch.outputFormat || '',
      constraints: ch.constraints || '',
      mcqQuestion: ch.mcqQuestion || '',
      mcqOptions: ch.mcqOptions?.length ? ch.mcqOptions : [
        { key: 'A', text: '' },
        { key: 'B', text: '' },
        { key: 'C', text: '' },
        { key: 'D', text: '' },
      ],
      mcqCorrectAnswer: ch.mcqCorrectAnswer || 'A',
    });
    setShowChallengeModal(true);
  };

  const handleSaveChallenge = async (e) => {
    e.preventDefault();
    try {
      if (editingChallenge) {
        await apiRequest(`/challenges/${editingChallenge._id}`, {
          method: 'PUT',
          body: challengeForm,
        });
        toast.success('Challenge updated successfully.');
      } else {
        await apiRequest('/challenges', {
          method: 'POST',
          body: challengeForm,
        });
        toast.success('New challenge created.');
      }
      setShowChallengeModal(false);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to save challenge.');
    }
  };

  const handleDeleteChallenge = async (id) => {
    try {
      await apiRequest(`/challenges/${id}`, { method: 'DELETE' });
      toast.success('Challenge deleted successfully.');
      setDeleteConfirmation(null);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to delete challenge.');
    }
  };

  const handleDuplicateChallenge = async (id) => {
    try {
      await apiRequest(`/challenges/${id}/duplicate`, { method: 'POST' });
      toast.success('Challenge duplicated as draft.');
      loadData();
    } catch (err) {
      toast.error('Failed to duplicate challenge.');
    }
  };

  // Delete Student
  const handleDeleteStudent = async (id) => {
    try {
      await apiRequest(`/admin/students/${id}`, { method: 'DELETE' });
      toast.success('Student removed from system.');
      setDeleteConfirmation(null);
      loadData();
    } catch (err) {
      toast.error('Failed to delete student.');
    }
  };

  // Announcement Save
  const handleSaveAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/content/announcements', { method: 'POST', body: annForm });
      toast.success('Announcement broadcast posted.');
      setShowAnnModal(false);
      loadData();
    } catch (err) {
      toast.error('Failed to post announcement.');
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await apiRequest(`/content/announcements/${id}`, { method: 'DELETE' });
      toast.success('Announcement removed.');
      loadData();
    } catch (err) {
      toast.error('Failed to remove announcement.');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="wood-board rounded-3xl p-8 border-2 border-amber-500/40 relative overflow-hidden shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>TECHNODIAZ 2K26 CSE Administration Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              ADMIN <span className="text-amber-400">CONTROL CENTER</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 font-mono">
              Manage national challenges, evaluate student code submissions, and publish fest announcements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenCreateChallenge}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Challenge</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-emerald-950">
          {[
            { id: 'overview', name: 'Overview & Analytics', icon: LayoutDashboard },
            { id: 'submissions', name: `Submissions (${submissions.length})`, icon: FileCheck2 },
            { id: 'challenges', name: `Challenges (${challenges.length})`, icon: Code2 },
            { id: 'students', name: `Students (${students.length})`, icon: Users },
            { id: 'announcements', name: `Announcements (${announcements.length})`, icon: Bell },
            { id: 'events', name: `Events (${events.length})`, icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md'
                  : 'bg-[#08120B] text-gray-400 border border-emerald-900/60 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-1">
                <div className="text-xs font-mono text-gray-400">Total Registered Students</div>
                <div className="text-3xl font-black text-white font-mono">{stats.totalStudents}</div>
                <div className="text-[11px] text-emerald-400">From 7+ Colleges</div>
              </div>

              <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-1">
                <div className="text-xs font-mono text-gray-400">Active Challenges</div>
                <div className="text-3xl font-black text-emerald-400 font-mono">{stats.totalChallenges}</div>
                <div className="text-[11px] text-emerald-500">{stats.publishedChallenges} Published</div>
              </div>

              <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-1">
                <div className="text-xs font-mono text-gray-400">Total Submissions</div>
                <div className="text-3xl font-black text-teal-400 font-mono">{stats.totalSubmissions}</div>
                <div className="text-[11px] text-teal-500">{stats.acceptedSubmissions} Accepted</div>
              </div>

              <div className="wood-board rounded-2xl p-6 border border-amber-500/50 space-y-1">
                <div className="text-xs font-mono text-amber-300">Pending Evaluations</div>
                <div className="text-3xl font-black text-amber-400 font-mono">{stats.pendingEvaluations}</div>
                <div className="text-[11px] text-amber-500">Requires Committee Review</div>
              </div>
            </div>

            {/* Quick Pending Submissions Review Section */}
            <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>Submissions Requiring Manual Evaluation</span>
                </h3>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className="text-xs font-mono text-emerald-400 hover:underline"
                >
                  View All Submissions →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#08120B] text-gray-400 uppercase border-b border-emerald-950">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Challenge</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Score</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950/60 text-gray-200">
                    {submissions.slice(0, 6).map((sub) => (
                      <tr key={sub._id} className="hover:bg-emerald-950/30">
                        <td className="px-4 py-3 font-bold text-emerald-400">{sub.submissionId}</td>
                        <td className="px-4 py-3 font-semibold text-white">
                          {sub.user?.name} <span className="text-gray-500 text-[10px]">({sub.user?.rollNumber})</span>
                        </td>
                        <td className="px-4 py-3 text-gray-300">{sub.challenge?.title}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              sub.status === 'Accepted'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold text-emerald-300">{sub.score} Pts</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => openEvaluationModal(sub)}
                            className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold"
                          >
                            Grade / Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SUBMISSIONS & MANUAL EVALUATION ================= */}
        {activeTab === 'submissions' && (
          <div className="wood-board rounded-2xl border border-emerald-900/60 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-white">
                  Student Submissions Management
                </h2>
                <p className="text-xs text-gray-400 font-mono">
                  Inspect code, assign scores out of 100%, provide feedback, and recalculate leaderboard.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#08120B] text-gray-400 uppercase border-b border-emerald-950">
                  <tr>
                    <th className="px-4 py-3.5">Submission ID</th>
                    <th className="px-4 py-3.5">Student</th>
                    <th className="px-4 py-3.5">College</th>
                    <th className="px-4 py-3.5">Challenge</th>
                    <th className="px-4 py-3.5">Type / Lang</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Score</th>
                    <th className="px-4 py-3.5 text-right">Evaluate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-950/60 text-gray-200">
                  {submissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-emerald-950/40 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-emerald-400">{sub.submissionId}</td>
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-white">{sub.user?.name || 'Student'}</div>
                        <div className="text-[10px] text-gray-500">{sub.user?.rollNumber}</div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-400">{sub.user?.college}</td>
                      <td className="px-4 py-3.5 font-semibold text-gray-200 max-w-[180px] truncate">
                        {sub.challenge?.title}
                      </td>
                      <td className="px-4 py-3.5 uppercase text-gray-400">
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
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => openEvaluationModal(sub)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold"
                        >
                          Grade Solution
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: CHALLENGES CRUD ================= */}
        {activeTab === 'challenges' && (
          <div className="wood-board rounded-2xl border border-emerald-900/60 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-emerald-950 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-white">
                  Coding Challenge Manager
                </h2>
                <p className="text-xs text-gray-400 font-mono">
                  Create, edit, duplicate, and publish coding challenges.
                </p>
              </div>
              <button
                onClick={handleOpenCreateChallenge}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Challenge</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#08120B] text-gray-400 uppercase border-b border-emerald-950">
                  <tr>
                    <th className="px-4 py-3.5">ID</th>
                    <th className="px-4 py-3.5">Title</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Difficulty</th>
                    <th className="px-4 py-3.5">Points</th>
                    <th className="px-4 py-3.5">Type</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-950/60 text-gray-200">
                  {challenges.map((ch) => (
                    <tr key={ch._id} className="hover:bg-emerald-950/30">
                      <td className="px-4 py-3.5 font-bold text-emerald-400">{ch.challengeId}</td>
                      <td className="px-4 py-3.5 font-bold text-white">{ch.title}</td>
                      <td className="px-4 py-3.5 text-gray-300">{ch.category}</td>
                      <td className="px-4 py-3.5 font-semibold text-emerald-300">{ch.difficulty}</td>
                      <td className="px-4 py-3.5 font-bold text-amber-400">{ch.points} Pts</td>
                      <td className="px-4 py-3.5 uppercase text-gray-400">{ch.submissionType}</td>
                      <td className="px-4 py-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditChallenge(ch)}
                          className="p-1.5 rounded-lg bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDuplicateChallenge(ch._id)}
                          className="p-1.5 rounded-lg bg-teal-950 text-teal-300 hover:bg-teal-900 border border-teal-800"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmation({ type: 'challenge', id: ch._id, title: ch.title })}
                          className="p-1.5 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900 border border-rose-900"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: STUDENTS ================= */}
        {activeTab === 'students' && (
          <div className="wood-board rounded-2xl border border-emerald-900/60 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-emerald-950">
              <h2 className="text-xl font-bold font-display text-white">Registered Students</h2>
              <p className="text-xs text-gray-400 font-mono">
                Inspect registered participants, colleges, and verified scores.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#08120B] text-gray-400 uppercase border-b border-emerald-950">
                  <tr>
                    <th className="px-4 py-3.5">Name</th>
                    <th className="px-4 py-3.5">Email</th>
                    <th className="px-4 py-3.5">Roll No</th>
                    <th className="px-4 py-3.5">College</th>
                    <th className="px-4 py-3.5">Solved</th>
                    <th className="px-4 py-3.5">Points</th>
                    <th className="px-4 py-3.5 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-950/60 text-gray-200">
                  {students.map((st) => (
                    <tr key={st._id} className="hover:bg-emerald-950/30">
                      <td className="px-4 py-3.5 font-bold text-white">{st.name}</td>
                      <td className="px-4 py-3.5 text-gray-400">{st.email}</td>
                      <td className="px-4 py-3.5 text-emerald-400 font-bold">{st.rollNumber}</td>
                      <td className="px-4 py-3.5 text-gray-300">{st.college}</td>
                      <td className="px-4 py-3.5 font-bold text-white">{st.solvedCount}</td>
                      <td className="px-4 py-3.5 font-bold text-emerald-300">{st.score} PTS</td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => setDeleteConfirmation({ type: 'student', id: st._id, title: st.name })}
                          className="p-1.5 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900 border border-rose-900"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 5: ANNOUNCEMENTS ================= */}
        {activeTab === 'announcements' && (
          <div className="wood-board rounded-2xl border border-emerald-900/60 overflow-hidden shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-white">Announcements Broadcast</h2>
                <p className="text-xs text-gray-400 font-mono">Publish live tickers and alerts across the landing page and dashboard.</p>
              </div>
              <button
                onClick={() => setShowAnnModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>New Announcement</span>
              </button>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann._id}
                  className="p-4 rounded-xl bg-[#08120B] border border-emerald-950 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
                        {ann.priority}
                      </span>
                      <h4 className="text-sm font-bold text-white">{ann.title}</h4>
                    </div>
                    <p className="text-xs text-gray-300 font-mono">{ann.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAnnouncement(ann._id)}
                    className="text-gray-500 hover:text-rose-400 p-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: EVENTS ================= */}
        {activeTab === 'events' && (
          <div className="wood-board rounded-2xl border border-emerald-900/60 overflow-hidden shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-white">Festival Events Schedule</h2>
                <p className="text-xs text-gray-400 font-mono">Manage workshops, hackathons, and symposiums.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((evt) => (
                <div key={evt._id} className="p-5 rounded-xl bg-[#08120B] border border-emerald-950 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400">{evt.category}</span>
                    <span className="text-xs font-mono text-amber-300 font-bold">{evt.prizePool}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{evt.title}</h3>
                  <p className="text-xs text-gray-400">{evt.description}</p>
                  <div className="text-[11px] font-mono text-gray-500 pt-2 border-t border-emerald-950/60">
                    {evt.date} • {evt.time} • {evt.venue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= 1. MANUAL EVALUATION MODAL ================= */}
      {evaluationModalSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="wood-board max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-5 border-2 border-amber-500/60 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEvaluationModalSub(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/40">
                CSE Manual Evaluation Mode
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Evaluating: {evaluationModalSub.submissionId}
              </h3>
            </div>

            {/* Student & Challenge info */}
            <div className="p-4 rounded-xl bg-[#08120B] border border-emerald-950 text-xs font-mono grid grid-cols-2 gap-2">
              <div>Student: <span className="text-white font-bold">{evaluationModalSub.user?.name}</span></div>
              <div>Roll No: <span className="text-emerald-400 font-bold">{evaluationModalSub.user?.rollNumber}</span></div>
              <div>College: <span className="text-gray-300">{evaluationModalSub.user?.college}</span></div>
              <div>Challenge: <span className="text-amber-300">{evaluationModalSub.challenge?.title}</span></div>
            </div>

            {/* Submitted Solution Code/Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                Submitted Answer / Source Code
              </label>
              <div className="bg-[#050B07] rounded-xl border border-emerald-950 p-4 max-h-56 overflow-y-auto font-mono text-xs text-emerald-300 whitespace-pre">
                {evaluationModalSub.submissionType === 'CODE' ? evaluationModalSub.code : evaluationModalSub.answer}
              </div>
            </div>

            {/* Score and Status inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  Award Score [0 - {evaluationModalSub.maxScore || evaluationModalSub.challenge?.points || 10}]
                </label>
                <input
                  type="number"
                  min="0"
                  max={evaluationModalSub.maxScore || 100}
                  value={evalScore}
                  onChange={(e) => setEvalScore(e.target.value)}
                  className="w-full bg-[#08120B] border border-emerald-800 rounded-xl px-4 py-2.5 text-sm font-mono text-emerald-300 font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  Evaluation Status
                </label>
                <select
                  value={evalStatus}
                  onChange={(e) => setEvalStatus(e.target.value)}
                  className="w-full bg-[#08120B] border border-emerald-800 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                >
                  <option value="Accepted">Accepted (Full/Partial Credit)</option>
                  <option value="Partially Correct">Partially Correct</option>
                  <option value="Wrong Answer">Wrong Answer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Feedback input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                Review Feedback & Faculty Comments
              </label>
              <textarea
                rows={3}
                value={evalFeedback}
                onChange={(e) => setEvalFeedback(e.target.value)}
                placeholder="Enter scoring rationale, algorithmic suggestions, or testcase insights..."
                className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-3 text-xs font-mono text-gray-200 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Evaluation Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEvalStatus('Accepted');
                    setEvalScore(evaluationModalSub.maxScore || evaluationModalSub.challenge?.points || 10);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900"
                >
                  Quick Accept
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEvalStatus('Rejected');
                    setEvalScore(0);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900"
                >
                  Quick Reject
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEvaluationModalSub(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 text-gray-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEvaluation}
                  disabled={isEvaluating}
                  className="px-6 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-lg transition-all"
                >
                  {isEvaluating ? 'Saving...' : 'Save Evaluation'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. CHALLENGE CREATE/EDIT MODAL ================= */}
      {showChallengeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="wood-board max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-4 border-2 border-emerald-500/50 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowChallengeModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white font-display">
              {editingChallenge ? 'Edit Challenge' : 'Create New Coding Challenge'}
            </h3>

            <form onSubmit={handleSaveChallenge} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300">Challenge Title *</label>
                  <input
                    type="text"
                    required
                    value={challengeForm.title}
                    onChange={(e) => setChallengeForm({ ...challengeForm, title: e.target.value })}
                    placeholder="e.g. Graph Cycle Detector"
                    className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300">Challenge ID *</label>
                  <input
                    type="text"
                    required
                    value={challengeForm.challengeId}
                    onChange={(e) => setChallengeForm({ ...challengeForm, challengeId: e.target.value })}
                    placeholder="TDZ-CH-06"
                    className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-white uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300">Category</label>
                  <select
                    value={challengeForm.category}
                    onChange={(e) => setChallengeForm({ ...challengeForm, category: e.target.value })}
                    className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-emerald-300"
                  >
                    <option value="Logic">Logic</option>
                    <option value="Arrays">Arrays</option>
                    <option value="Algorithms">Algorithms</option>
                    <option value="Green Tech">Green Tech</option>
                    <option value="AI/ML">AI/ML</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300">Difficulty</label>
                  <select
                    value={challengeForm.difficulty}
                    onChange={(e) => setChallengeForm({ ...challengeForm, difficulty: e.target.value })}
                    className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-emerald-300"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300">Submission Type</label>
                  <select
                    value={challengeForm.submissionType}
                    onChange={(e) => setChallengeForm({ ...challengeForm, submissionType: e.target.value })}
                    className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-emerald-300"
                  >
                    <option value="CODE">CODE</option>
                    <option value="TEXT">TEXT</option>
                    <option value="MCQ">MCQ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300">Points Awarded</label>
                  <input
                    type="number"
                    value={challengeForm.points}
                    onChange={(e) => setChallengeForm({ ...challengeForm, points: Number(e.target.value) })}
                    className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300">Time Limit</label>
                  <input
                    type="text"
                    value={challengeForm.timeLimit}
                    onChange={(e) => setChallengeForm({ ...challengeForm, timeLimit: e.target.value })}
                    placeholder="30 mins"
                    className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300">Short Summary Description *</label>
                <input
                  type="text"
                  required
                  value={challengeForm.description}
                  onChange={(e) => setChallengeForm({ ...challengeForm, description: e.target.value })}
                  placeholder="Single line synopsis..."
                  className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300">Problem Statement *</label>
                <textarea
                  rows={4}
                  required
                  value={challengeForm.problemStatement}
                  onChange={(e) => setChallengeForm({ ...challengeForm, problemStatement: e.target.value })}
                  placeholder="Comprehensive description, constraints, and algorithmic instructions..."
                  className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300">Input Format</label>
                  <input
                    type="text"
                    value={challengeForm.inputFormat}
                    onChange={(e) => setChallengeForm({ ...challengeForm, inputFormat: e.target.value })}
                    className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300">Output Format</label>
                  <input
                    type="text"
                    value={challengeForm.outputFormat}
                    onChange={(e) => setChallengeForm({ ...challengeForm, outputFormat: e.target.value })}
                    className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChallengeModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green"
                >
                  Save Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 3. ANNOUNCEMENT MODAL ================= */}
      {showAnnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="wood-board max-w-md w-full rounded-3xl p-6 space-y-4 border border-emerald-500/50 shadow-2xl relative">
            <button
              onClick={() => setShowAnnModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white font-display">New Announcement Broadcast</h3>

            <form onSubmit={handleSaveAnnouncement} className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-gray-300">Headline *</label>
                <input
                  type="text"
                  required
                  value={annForm.title}
                  onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                  placeholder="e.g. 🚀 Final Round Starts in 1 Hour"
                  className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300">Content *</label>
                <textarea
                  rows={3}
                  required
                  value={annForm.content}
                  onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })}
                  className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-gray-300">Priority</label>
                  <select
                    value={annForm.priority}
                    onChange={(e) => setAnnForm({ ...annForm, priority: e.target.value })}
                    className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2 text-emerald-300"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300">Tag</label>
                  <input
                    type="text"
                    value={annForm.tag}
                    onChange={(e) => setAnnForm({ ...annForm, tag: e.target.value })}
                    placeholder="ALERT"
                    className="w-full bg-[#08120B] border border-emerald-800 rounded-xl p-2 text-white uppercase"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAnnModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green"
                >
                  Broadcast Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 4. DELETE CONFIRMATION MODAL ================= */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="wood-board max-w-sm w-full rounded-2xl p-6 space-y-4 border border-rose-500/50 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">Confirm Deletion</h3>
            </div>
            <p className="text-xs text-gray-300 font-mono leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <span className="text-white font-bold">"{deleteConfirmation.title}"</span>? This action cannot be undone.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="py-2 rounded-xl text-xs bg-white/5 text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirmation.type === 'challenge') {
                    handleDeleteChallenge(deleteConfirmation.id);
                  } else if (deleteConfirmation.type === 'student') {
                    handleDeleteStudent(deleteConfirmation.id);
                  }
                }}
                className="py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
