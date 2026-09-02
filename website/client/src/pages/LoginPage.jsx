import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, Mail, Lock, ShieldCheck, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result && result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  // Demo Login Helper for rapid testing
  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    const result = await login(demoEmail, demoPassword);
    setLoading(false);
    if (result && result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full wood-board rounded-3xl p-8 border-2 border-emerald-500/40 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow circle */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xl shadow-neon-green">
            🌱
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
            SIGN IN TO <span className="text-emerald-400 text-neon-green">TECHNODIAZ</span>
          </h1>
          <p className="text-xs text-gray-400">
            Enter your credentials to access the coding challenge platform & student dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-gray-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@pbcoe.edu"
              className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono font-medium text-gray-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Password</span>
              </label>
              <button
                type="button"
                onClick={() => toast.info('For demo accounts, use password: Password@123 (Students) or Admin@2026 (Admin).')}
                className="text-[11px] font-mono text-emerald-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'LOGIN TO ACCOUNT'}</span>
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="pt-2 border-t border-emerald-950 space-y-2.5">
          <span className="text-[11px] font-mono text-emerald-400/80 uppercase font-semibold block text-center">
            ⚡ Quick Demo Accounts
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('rahul@pbcoe.edu', 'Password@123')}
              className="p-2 rounded-lg bg-[#08120B] hover:bg-emerald-950/60 border border-emerald-900/60 text-[11px] font-mono text-gray-300 text-left transition-colors"
            >
              <div className="text-emerald-400 font-bold">Student #1</div>
              <div className="text-gray-500 text-[10px]">Rahul (Rank 1)</div>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin@technodiaz.com', 'Admin@2026')}
              className="p-2 rounded-lg bg-amber-950/20 hover:bg-amber-950/40 border border-amber-500/40 text-[11px] font-mono text-amber-300 text-left transition-colors"
            >
              <div className="text-amber-400 font-bold">Admin Portal</div>
              <div className="text-amber-500/70 text-[10px]">CSE Committee</div>
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-gray-400 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-400 font-bold hover:underline">
            Register for Free
          </Link>
        </div>
      </div>
    </div>
  );
};
