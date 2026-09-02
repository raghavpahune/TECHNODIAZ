import React, { useState } from 'react';
import { Trophy, Calendar, Users, Zap, Award, Sparkles, ArrowRight, X, Clock, MapPin, CheckCircle, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

export const EventShowcase = ({ onRegisterEvent }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 'ideastorm',
      title: 'IdeaStorm',
      subtitle: 'Innovation Pitching & Startup Challenge',
      category: 'Technical',
      date: 'September 1st, 2026',
      time: '10:00 AM - 01:30 PM',
      venue: 'CSE Seminar Hall (A-Block 302)',
      prize: '₹15,000',
      teamSize: '2 - 4 Members',
      flagship: true,
      icon: '💡',
      bannerColor: 'from-[#10b981] to-[#047857]',
      desc: 'Shark-tank style pitching arena where student founders present technical prototypes solving real-world climate, healthcare, education, and fintech problems.',
      rounds: [
        { name: 'Round 1: Abstract & Deck Screening', desc: 'Top 15 teams shortlisted based on feasibility and impact.' },
        { name: 'Round 2: Live Prototype Pitch (7 mins)', desc: 'Direct presentation before industry venture judges followed by 3 mins Q&A.' }
      ],
      rules: [
        'Working demo or interactive Figma prototype is highly recommended.',
        'Presentation pitch must adhere strictly to 7 minutes + 3 minutes Q&A.',
        'Zero tolerance for plagiarized slide decks or cloned projects.'
      ],
      coordinator: 'Aditya Giradkar (Event Head) • +91 98231 44556'
    },
    {
      id: 'techcanvas',
      title: 'TechCanvas',
      subtitle: 'Modern Web & UI/UX Hackathon',
      category: 'Technical',
      date: 'September 1st, 2026',
      time: '11:00 AM - 04:00 PM',
      venue: 'Advanced CSE Software Lab 1 & 2',
      prize: '₹15,000',
      teamSize: '2 - 4 Members',
      flagship: true,
      icon: '🎨',
      bannerColor: 'from-[#00f0ff] to-[#0284c7]',
      desc: 'High-intensity 5-hour design-to-code sprint. Teams craft production-grade, responsive, theme-driven web applications from scratch.',
      rounds: [
        { name: 'Phase 1: Wireframing & Design Tokens', desc: 'Translate problem statement into high-fidelity UI design.' },
        { name: 'Phase 2: Code Implementation & API Integration', desc: 'Build reactive components, integrate backend services, and deploy live.' }
      ],
      rules: [
        'Any modern framework (React, Next.js, Vue, or Vanilla CSS) is allowed.',
        'All repositories must be initialized at the venue with a clean first commit.',
        'Deployment on Vercel/Netlify/Render is mandatory for final evaluation.'
      ],
      coordinator: 'Hansika Kakpure (Technical Head) • +91 94041 88990'
    },
    {
      id: 'quizquest',
      title: 'Mega College Quiz Quest',
      subtitle: 'The Grand Tech & Brain Battle',
      category: 'Technical',
      date: 'September 1st, 2026',
      time: '02:00 PM - 05:00 PM',
      venue: 'PBCOE Main Auditorium',
      prize: '₹10,000',
      teamSize: '2 Members',
      flagship: true,
      icon: '🧠',
      bannerColor: 'from-[#a6ff00] to-[#16a34a]',
      desc: 'The ultimate showdown testing deep knowledge in computer architecture, algorithmic history, AI developments, pop-culture tech trivia, and speed buzzer rounds.',
      rounds: [
        { name: 'Round 1: Rapid Written Prelims (40 MCQs)', desc: 'Top 6 teams advance to the live stage finals.' },
        { name: 'Round 2: Visual Clue & Code Trace', desc: 'Audio-visual round identifying obscure tech breakthroughs.' },
        { name: 'Round 3: Live Buzzer Rapid-Fire', desc: 'Negative marking for incorrect buzzers.' }
      ],
      rules: [
        'Mobile phones strictly barred during prelims and stage rounds.',
        'Quizmaster decision is final and binding in all cases.'
      ],
      coordinator: 'Aakanksha Nakhate (Vice President) • +91 99750 12345'
    },
    {
      id: 'coderelay',
      title: 'CodeRelay Hackathon',
      subtitle: 'Team Speed-Coding & Baton Pass',
      category: 'Technical',
      date: 'September 1st, 2026',
      time: '01:30 PM - 04:30 PM',
      venue: 'CSE Linux Computing Center',
      prize: '₹12,000',
      teamSize: '3 Members',
      flagship: false,
      icon: '⚡',
      bannerColor: 'from-[#818cf8] to-[#4f46e5]',
      desc: 'Relay-style competitive programming. Each teammate gets 15 minutes of uninterrupted screen time before the baton passes to the next teammate without verbal communication!',
      rounds: [
        { name: 'Round 1: DSA Problem Sprint', desc: '3 algorithmic problems on LeetCode/HackerRank platform.' },
        { name: 'Round 2: The Blind Relay', desc: 'Teammates inherit legacy code and must debug & optimize blindly.' }
      ],
      rules: [
        'C++, Java, and Python are supported languages.',
        'Zero verbal or gestural hints during the baton transition interval.'
      ],
      coordinator: 'Mr. Aditya Bandhanwar (President) • +91 98900 11223'
    },
    {
      id: 'cricket',
      title: 'Box Cricket Championship',
      subtitle: 'High-Octane Tennis Ball Clash',
      category: 'Sports',
      date: 'September 2nd, 2026',
      time: '08:30 AM - 05:00 PM',
      venue: 'PBCOE Enclosed Turf Ground',
      prize: '₹15,000',
      teamSize: '6 + 2 Players',
      flagship: true,
      icon: '🏏',
      bannerColor: 'from-[#f59e0b] to-[#d97706]',
      desc: 'Fast-paced 6-over box cricket tournament with direct boundary rules, super overs, and high-voltage college rivalry.',
      rounds: [
        { name: 'League Stage (Knockout format)', desc: '16 college teams battling in single elimination brackets.' },
        { name: 'Quarter, Semis & Grand Final', desc: 'Championship trophy and cash prize ceremony.' }
      ],
      rules: [
        'Over-arm bowling only. Chucking leads to immediate disqualification.',
        'Direct roof / net catch rules apply as declared by umpires.'
      ],
      coordinator: 'Aryan Thawale (Discipline Head) • +91 91234 56789'
    },
    {
      id: 'lanbattle',
      title: 'Cyber Battle: LAN Arena',
      subtitle: 'Valorant & BGMI Esports Showdown',
      category: 'Sports',
      date: 'September 2nd, 2026',
      time: '10:00 AM - 04:30 PM',
      venue: 'CSE High-Performance Gaming Lab',
      prize: '₹12,000',
      teamSize: '4 Players (Squad)',
      flagship: true,
      icon: '🎮',
      bannerColor: 'from-[#ec4899] to-[#be185d]',
      desc: 'High refresh-rate esports tournament featuring custom tournament lobbies in Valorant (PC) and BGMI (Mobile).',
      rounds: [
        { name: 'BGMI: 3 Map Decider', desc: 'Erangel, Miramar, and Sanhok point table aggregation.' },
        { name: 'Valorant: Single Elimination BO1', desc: 'Custom 5v5 standard competitive bracket.' }
      ],
      rules: [
        'Players must bring their own peripherals (headsets/mice).',
        'Strict anti-cheat monitoring in place.'
      ],
      coordinator: 'Kartik Kanzode (Media Head) • +91 97654 32109'
    },
    {
      id: 'futsal',
      title: 'Futsal 5v5 Arena',
      subtitle: 'Fast-Paced Mini Football',
      category: 'Sports',
      date: 'September 2nd, 2026',
      time: '09:00 AM - 03:00 PM',
      venue: 'PBCOE Quadrangle Ground',
      prize: '₹10,000',
      teamSize: '5 + 2 Substitutes',
      flagship: false,
      icon: '⚽',
      bannerColor: 'from-[#06b6d4] to-[#0e7490]',
      desc: '15-minute quick halves with rolling substitutes and electric turf atmosphere.',
      rounds: [
        { name: 'Knockout Stages', desc: 'Winner advances to championship ladder.' }
      ],
      rules: [
        'Flat sole turf shoes compulsory.',
        'Yellow/Red card disciplinary rules enforced.'
      ],
      coordinator: 'Mahesh Wadibhasme (Treasurer) • +91 93250 88776'
    },
    {
      id: 'tugofwar',
      title: 'Tug of War Clash',
      subtitle: 'Pure Strength & Synergy',
      category: 'Sports',
      date: 'September 2nd, 2026',
      time: '03:30 PM - 05:30 PM',
      venue: 'PBCOE Central Courtyard',
      prize: '₹8,000',
      teamSize: '8 Members (600kg weight cap)',
      flagship: false,
      icon: '💪',
      bannerColor: 'from-[#84cc16] to-[#4d7c0f]',
      desc: 'The traditional strength showdown pulling the festival to a roaring climax before the valedictory.',
      rounds: [
        { name: 'Best of 3 Pulls', desc: 'Standard 4-meter tape clearance mark.' }
      ],
      rules: [
        'No spikes or cleats allowed.',
        'Cumulative team weight check at entry desk.'
      ],
      coordinator: 'Priyanka Partane (Joint Secretary) • +91 94231 66554'
    }
  ];

  const filteredEvents = activeTab === 'All'
    ? events
    : events.filter(e => e.category === activeTab);

  const handleOpenDetails = (ev) => {
    sound.playClick();
    setSelectedEvent(ev);
  };

  return (
    <section id="events" className="py-12 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122e1a] border border-[#00ff88]/40 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Flagship Competitions & Tournaments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Fest Events Showcase
          </h2>
          <p className="text-sm text-emerald-200/80">
            Compete across Technical Hackathons on Sept 1st and Sports Championships on Sept 2nd with ₹1,00,000+ total prize pool!
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-3 mb-8">
          {['All', 'Technical', 'Sports'].map((tab) => (
            <button
              key={tab}
              onClick={() => { sound.playClick(); setActiveTab(tab); }}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#10b981] to-[#00ff88] text-[#031409] shadow-[0_0_15px_rgba(0,255,136,0.5)] scale-105'
                  : 'bg-[#091f12] text-emerald-300 hover:bg-[#0e2c1a] border border-emerald-800/60'
              }`}
            >
              {tab} Events {tab === 'All' ? `(${events.length})` : `(${events.filter(e => e.category === tab).length})`}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="wood-frame p-5 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all group cursor-pointer"
              onClick={() => handleOpenDetails(ev)}
            >
              <span className="brass-pin pin-tl" />
              <span className="brass-pin pin-tr" />
              <span className="brass-pin pin-bl" />
              <span className="brass-pin pin-br" />

              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    ev.category === 'Technical' ? 'badge-technical' : 'badge-sports'
                  }`}>
                    {ev.category}
                  </span>
                  {ev.flagship && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                      <Sparkles className="w-3 h-3" />
                      FLAGSHIP
                    </span>
                  )}
                </div>

                {/* Title & Icon */}
                <div className="flex items-start gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-[#081a0e] border border-emerald-800 flex-shrink-0">
                    {ev.icon}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg text-white font-heading group-hover:text-[#00ff88] transition-colors">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-[#fcd34d] font-mono">{ev.subtitle}</p>
                  </div>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-emerald-100/85 line-clamp-2 leading-relaxed">
                  {ev.desc}
                </p>

                {/* Quick Info Tags */}
                <div className="space-y-1.5 pt-2 border-t border-[#633c21] text-xs text-emerald-300">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{ev.date}</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-300 font-bold font-mono">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Prize: {ev.prize}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-emerald-300/80">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{ev.teamSize}</span>
                    </span>
                    <span className="flex items-center gap-1 truncate max-w-[150px]">
                      <MapPin className="w-3 h-3" />
                      <span>{ev.venue.split('(')[0]}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card CTA */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#00ff88] flex items-center gap-1 group-hover:underline">
                  <span>View Details & Rules</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClick();
                    onRegisterEvent(ev);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-[#00ff88] text-white hover:text-black text-xs font-bold transition-colors cursor-pointer"
                >
                  Register Team
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Event Details */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-emerald-800/50">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-[#081a0e] border border-emerald-700">
                    {selectedEvent.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-white font-heading">
                        {selectedEvent.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40">
                        {selectedEvent.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#fcd34d] font-mono">{selectedEvent.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="py-4 space-y-4 text-sm text-emerald-100">
                {/* Event Schedule & Prize Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#071b0e] border border-emerald-800 text-xs">
                  <div>
                    <span className="text-emerald-400/80 block text-[10px] uppercase font-bold">Event Date</span>
                    <span className="font-semibold text-white">{selectedEvent.date}</span>
                  </div>
                  <div>
                    <span className="text-emerald-400/80 block text-[10px] uppercase font-bold">Timing</span>
                    <span className="font-semibold text-white">{selectedEvent.time}</span>
                  </div>
                  <div>
                    <span className="text-emerald-400/80 block text-[10px] uppercase font-bold">Venue</span>
                    <span className="font-semibold text-white">{selectedEvent.venue}</span>
                  </div>
                  <div>
                    <span className="text-amber-400 block text-[10px] uppercase font-bold">Prize Pool</span>
                    <span className="font-bold text-amber-300 font-mono text-sm">{selectedEvent.prize}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    Event Overview
                  </h4>
                  <p className="text-emerald-100/90 leading-relaxed text-xs sm:text-sm">
                    {selectedEvent.desc}
                  </p>
                </div>

                {/* Rounds */}
                {selectedEvent.rounds && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#00f0ff] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Format & Round Breakdown</span>
                    </h4>
                    <div className="space-y-1.5">
                      {selectedEvent.rounds.map((r, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-[#092213] border border-[#1b4a2b] text-xs">
                          <span className="font-bold text-white block mb-0.5">{r.name}</span>
                          <span className="text-emerald-200/80">{r.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rules */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#00ff88]" />
                    <span>Key Regulations</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-emerald-200/90 list-disc list-inside">
                    {selectedEvent.rules.map((rule, i) => (
                      <li key={i}>{rule}</li>
                    ))}
                  </ul>
                </div>

                {/* Coordinator */}
                <div className="p-2.5 rounded-lg bg-[#181008] border border-[#633c21] text-xs">
                  <span className="text-[#fcd34d] font-bold block mb-0.5">Faculty & Student Coordinator:</span>
                  <span className="text-amber-100 font-mono">{selectedEvent.coordinator}</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-emerald-800/50 flex items-center justify-between">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-200 hover:bg-emerald-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const ev = selectedEvent;
                    setSelectedEvent(null);
                    sound.playClick();
                    onRegisterEvent(ev);
                  }}
                  className="btn-nature-primary text-xs cursor-pointer"
                >
                  <span>Register for {selectedEvent.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
