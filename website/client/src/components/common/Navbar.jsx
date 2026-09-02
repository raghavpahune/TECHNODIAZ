import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Code2,
  Trophy,
  Calendar,
  FolderGit2,
  Info,
  User,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  FileCode2,
  Sparkles,
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Coding Challenge', path: '/coding-challenge', icon: Code2, highlight: true },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Events', path: '/#events', icon: Calendar },
    { name: 'Projects', path: '/#projects', icon: FolderGit2 },
    { name: 'About', path: '/#about', icon: Info },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060A07]/90 backdrop-blur-md border-b border-emerald-900/40 shadow-xl shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/40 border border-emerald-500/50 flex items-center justify-center overflow-hidden shadow-neon-green group-hover:scale-105 transition-transform">
            <span className="text-emerald-400 font-bold text-xl">🌱</span>
            <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline tracking-tight font-black font-display text-xl sm:text-2xl">
              <span className="text-gray-100">TECHNO</span>
              <span className="text-emerald-400 text-neon-green ml-0.5">DIAZ</span>
              <span className="ml-1 px-1.5 py-0.5 text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-md">
                2K26
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-emerald-500/80 font-mono -mt-1">
              Dept. of CSE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  link.highlight
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400 shadow-sm'
                    : isActive
                    ? 'text-emerald-400 bg-emerald-950/40'
                    : 'text-gray-300 hover:text-emerald-300 hover:bg-white/5'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4 text-emerald-400" />}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Panel
                </Link>
              )}

              <Link
                to="/submissions"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-emerald-300 hover:bg-white/5 border border-emerald-900/40 transition-all flex items-center gap-1"
                title="My Submissions"
              >
                <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
                Submissions
              </Link>

              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-900/30 border border-emerald-500/30 hover:border-emerald-400 text-emerald-200 text-sm font-medium transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-300">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span>{user?.name?.split(' ')[0]}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-950/30 border border-transparent hover:border-rose-900/40 transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-emerald-300 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-neon-green transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/40 border border-emerald-900/40"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070E0A]/95 backdrop-blur-xl border-b border-emerald-900/60 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-emerald-950/60 hover:text-emerald-400 flex items-center gap-2.5"
              >
                {link.icon && <link.icon className="w-4 h-4 text-emerald-400" />}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-emerald-900/40">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-emerald-950/40 rounded-lg text-sm text-emerald-300 font-medium">
                  Logged in as <span className="text-white font-bold">{user?.name}</span>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-200 hover:bg-white/5"
                >
                  Student Dashboard
                </Link>
                <Link
                  to="/submissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-200 hover:bg-white/5"
                >
                  My Submissions
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-rose-950/30 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-medium text-gray-200 bg-white/5 rounded-xl border border-emerald-900/50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold bg-emerald-600 text-white rounded-xl shadow-neon-green"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
