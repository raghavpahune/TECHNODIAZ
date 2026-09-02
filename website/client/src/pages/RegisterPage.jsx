import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Sparkles, Mail, Lock, User, Phone, School, Award, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    college: 'PBCOE',
    branch: 'Computer Science & Engineering',
    year: '3rd Year',
    rollNumber: '',
    password: '',
    confirmPassword: '',
    teamName: '',
    teamMembers: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match. Please re-enter.');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result && result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full wood-board rounded-3xl p-8 sm:p-10 border-2 border-emerald-500/40 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xl shadow-neon-green">
            🌱
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
            STUDENT <span className="text-emerald-400 text-neon-green">REGISTRATION</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Register for TECHNODIAZ 2K26 Coding Challenges, Events, and Competitions.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-gray-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aaditya Sharma"
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-gray-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. aaditya@pbcoe.edu"
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            {/* Mobile */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-gray-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mobile Number *</span>
              </label>
              <input
                type="tel"
                required
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="e.g. 9823112233"
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            {/* Roll Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-gray-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Roll / Student ID *</span>
              </label>
              <input
                type="text"
                required
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="e.g. CSE-2023-02"
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            {/* College */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-gray-300 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-emerald-400" />
                <span>College / Institution *</span>
              </label>
              <input
                type="text"
                required
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="e.g. PBCOE, VNIT, RCOEM..."
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            {/* Branch */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-gray-300">Branch / Dept *</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-emerald-300 font-mono focus:outline-none focus:border-emerald-400"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="AI & Data Science">AI & Data Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                <option value="Other">Other Engineering</option>
              </select>
            </div>

            {/* Year */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-gray-300">Academic Year *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-emerald-300 font-mono focus:outline-none focus:border-emerald-400"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Faculty">Faculty / Alumni</option>
              </select>
            </div>

            {/* Team Name (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-gray-400">Team Name (Optional)</label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="e.g. EcoCoders"
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-gray-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Password *</span>
              </label>
              <input
                type="password"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-gray-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confirm Password *</span>
              </label>
              <input
                type="password"
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{loading ? 'Creating Account...' : 'REGISTER FOR TECHNODIAZ 2K26'}</span>
          </button>
        </form>

        <div className="text-center text-xs text-gray-400 pt-2 border-t border-emerald-950">
          Already registered?{' '}
          <Link to="/login" className="text-emerald-400 font-bold hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};
