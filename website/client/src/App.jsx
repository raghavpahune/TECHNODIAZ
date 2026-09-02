import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CircuitBackground } from './components/common/CircuitBackground';

import { LandingPage } from './pages/LandingPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { ChallengeDetailPage } from './pages/ChallengeDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { SubmissionsPage } from './pages/SubmissionsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#060A07] text-[#D9E8D0] relative selection:bg-emerald-500 selection:text-black">
      {/* Ambient Canvas Background */}
      <CircuitBackground />

      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Routes */}
      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/coding-challenge" element={<ChallengesPage />} />
          <Route path="/coding-challenge/:challengeId" element={<ChallengeDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
