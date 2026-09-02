import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { NoticeTicker } from './components/NoticeTicker';
import { HeroBanner } from './components/HeroBanner';
import { CyberTreeBoard } from './components/CyberTreeBoard';
import { EventShowcase } from './components/EventShowcase';
import { CodingChallenge } from './components/CodingChallenge';
import { ScheduleTimeline } from './components/ScheduleTimeline';
import { ThematicNoticeBoards } from './components/ThematicNoticeBoards';
import { TechNewsSection } from './components/TechNewsSection';
import { RegistrationSection } from './components/RegistrationSection';
import { CoreTeamSection } from './components/CoreTeamSection';
import { Footer } from './components/Footer';
import { DigitalPassModal } from './components/DigitalPassModal';
import { AdminPortal } from './components/AdminPortal';
import { AllNoticesModal } from './components/AllNoticesModal';

export function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isNoticesOpen, setIsNoticesOpen] = useState(false);
  const [activePassTeam, setActivePassTeam] = useState(null);
  const [selectedEventForReg, setSelectedEventForReg] = useState(null);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleRegisterForEvent = (eventObj) => {
    setSelectedEventForReg(eventObj);
    scrollToSection('register');
  };

  const handleRegistrationSuccess = (team) => {
    setActivePassTeam(team);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040d07] text-[#e5f5ea] relative selection:bg-[#00ff88] selection:text-black">
      {/* Top Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRegister={() => scrollToSection('register')}
        onScrollTo={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner
          onOpenRegister={() => scrollToSection('register')}
          onScrollTo={scrollToSection}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Live Announcement Ticker */}
        <NoticeTicker onOpenNotices={() => setIsNoticesOpen(true)} />

        {/* Cyber Tree Centerpiece */}
        <CyberTreeBoard onSelectTrack={(track) => scrollToSection('events')} />

        {/* Flagship Events Showcase */}
        <EventShowcase onRegisterEvent={handleRegisterForEvent} />

        {/* Daily Coding Challenge Arena */}
        <CodingChallenge />

        {/* Schedule Timeline */}
        <ScheduleTimeline />

        {/* Pinned Thematic Notice Boards */}
        <ThematicNoticeBoards onSelectProject={(p) => scrollToSection('events')} />

        {/* Automated Tech News */}
        <TechNewsSection />

        {/* Public Team Registration Desk */}
        <RegistrationSection
          initialEvent={selectedEventForReg}
          onRegistrationSuccess={handleRegistrationSuccess}
        />

        {/* PBCOE CSE Core Team Directory */}
        <CoreTeamSection />
      </main>

      {/* Footer */}
      <Footer
        onScrollTo={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Digital Pass Modal */}
      {activePassTeam && (
        <DigitalPassModal
          team={activePassTeam}
          onClose={() => setActivePassTeam(null)}
        />
      )}

      {/* Admin Portal Modal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* All Notices Modal */}
      <AllNoticesModal
        isOpen={isNoticesOpen}
        onClose={() => setIsNoticesOpen(false)}
      />
    </div>
  );
}

export default App;
