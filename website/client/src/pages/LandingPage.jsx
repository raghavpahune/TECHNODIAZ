import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Sparkles,
  ArrowRight,
  Terminal,
  Trophy,
  Leaf,
  Cpu,
  Layers,
  Bell,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { TechnologyTree } from '../components/home/TechnologyTree';
import { TechNewsSection } from '../components/home/TechNewsSection';
import { AIForGoodSection } from '../components/home/AIForGoodSection';
import { SustainableComputing } from '../components/home/SustainableComputing';
import { StudentProjectSpotlight } from '../components/home/StudentProjectSpotlight';
import { EventsSection } from '../components/home/EventsSection';
import { AchievementsCounter } from '../components/home/AchievementsCounter';
import { MemeCorner } from '../components/home/MemeCorner';
import { QRCodeSection } from '../components/home/QRCodeSection';
import { ChallengeCard } from '../components/challenge/ChallengeCard';
import { apiRequest } from '../services/api';

export const LandingPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [featuredChallenges, setFeaturedChallenges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const annRes = await apiRequest('/content/announcements');
        if (annRes.success) setAnnouncements(annRes.announcements);

        const chRes = await apiRequest('/challenges');
        if (chRes.success) setFeaturedChallenges(chRes.challenges.slice(0, 3));
      } catch (err) {
        console.error('Landing page data fetch failed:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen pt-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono tracking-wide shadow-neon-green">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING</span>
          </div>

          {/* Large Futuristic Heading */}
          <div className="space-y-3 max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight leading-none">
              <span className="text-white drop-shadow-md">TECHNO</span>
              <span className="text-emerald-400 text-neon-green ml-1">DIAZ</span>
              <span className="ml-2 text-3xl sm:text-5xl lg:text-6xl text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-2xl border border-emerald-500/30 font-mono align-middle">
                2K26
              </span>
            </h1>

            <p className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-green-400 tracking-wider font-display uppercase pt-2">
              "WHERE NATURE MEETS INNOVATION"
            </p>
          </div>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Welcome to the digital edition of the TECHNODIAZ technology exhibition wall. Compete in our National Coding Challenge, explore AI for Good, and build sustainable computing paradigms.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/coding-challenge"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-neon-green-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5"
            >
              <Code2 className="w-5 h-5" />
              <span>ENTER THE CODING CHALLENGE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#tech-tree"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm sm:text-base text-gray-200 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 hover:border-emerald-500 transition-all flex items-center justify-center gap-2"
            >
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>EXPLORE TECHNODIAZ</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8">
            <AchievementsCounter />
          </div>
        </div>
      </section>

      {/* 2. ANNOUNCEMENTS TICKER BAR */}
      {announcements.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12">
          <div className="wood-board rounded-2xl p-4 border border-emerald-800/60 flex items-center gap-4 shadow-xl">
            <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 text-black font-bold text-xs font-mono">
              <Bell className="w-3.5 h-3.5" />
              <span>LIVE ANNOUNCEMENTS</span>
            </div>
            <div className="flex-1 overflow-x-auto text-xs text-gray-300 font-mono whitespace-nowrap flex items-center gap-6 py-1">
              {announcements.map((ann, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span className="text-white font-semibold">{ann.title}</span>
                  <span className="text-gray-400">{ann.content}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. CENTRAL INTERACTIVE TECHNOLOGY TREE */}
      <section id="tech-tree" className="py-12 relative">
        <TechnologyTree />
      </section>

      {/* 4. CODING CHALLENGE HIGHLIGHT SECTION */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                <Code2 className="w-3.5 h-3.5" /> Featured Problems
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                FEATURED <span className="text-emerald-400 text-neon-green">CODING CHALLENGES</span>
              </h2>
              <p className="text-gray-400 text-sm max-w-xl">
                Test your algorithmic, array frequency, dynamic programming, and carbon balancing solutions against real test cases.
              </p>
            </div>

            <Link
              to="/coding-challenge"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-4 py-2 rounded-xl border border-emerald-800 hover:border-emerald-500 hover:bg-emerald-900 transition-all self-start md:self-auto"
            >
              <span>View All Challenges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredChallenges.map((ch) => (
              <ChallengeCard key={ch._id} challenge={ch} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. TECH NEWS SECTION */}
      <TechNewsSection />

      {/* 6. AI FOR GOOD SECTION */}
      <AIForGoodSection />

      {/* 7. SUSTAINABLE COMPUTING SECTION */}
      <SustainableComputing />

      {/* 8. STUDENT PROJECT SPOTLIGHT */}
      <StudentProjectSpotlight />

      {/* 9. UPCOMING EVENTS */}
      <EventsSection />

      {/* 10. MEME CORNER */}
      <MemeCorner />

      {/* 11. SCAN TO PARTICIPATE / QR CODE SECTION */}
      <QRCodeSection />

      {/* 12. READY TO CODE FINAL CTA */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="wood-board rounded-3xl p-10 sm:p-16 border-2 border-emerald-500/60 shadow-neon-green-lg relative overflow-hidden space-y-6">
            {/* Animated circuit ring */}
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-3xl shadow-neon-green">
              ⚡
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight">
                READY TO <span className="text-emerald-400 text-neon-green">CODE?</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
                "Turn your ideas into innovation." Join hundreds of engineers competing in the TECHNODIAZ 2K26 National Coding Challenge.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/coding-challenge"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-base bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green transition-all transform hover:scale-105 active:scale-95"
              >
                <Code2 className="w-5 h-5" />
                <span>START CODING CHALLENGE</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
