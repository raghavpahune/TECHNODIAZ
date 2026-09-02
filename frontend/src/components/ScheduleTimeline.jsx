import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Trophy, Sparkles, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import { sound } from '../utils/audio';

export const ScheduleTimeline = () => {
  const [activeDay, setActiveDay] = useState(1);

  const day1Schedule = [
    { time: '09:00 AM - 10:00 AM', title: 'Grand Inauguration & Traditional Lamp Lighting', venue: 'PBCOE Main Auditorium', desc: 'Welcome address by Principal, HOD CSE, and President Mr. Aditya Bandhanwar.', type: 'Ceremony' },
    { time: '10:00 AM - 01:30 PM', title: 'IdeaStorm: Startup & Prototype Pitching', venue: 'CSE Seminar Hall (A-302)', desc: '15 shortlisted teams present technical innovations before venture jury.', type: 'Technical' },
    { time: '11:00 AM - 04:00 PM', title: 'TechCanvas: Web & UI/UX Hackathon Sprint', venue: 'Advanced Software Lab 1 & 2', desc: 'Live 5-hour responsive UI/UX to code development challenge.', type: 'Technical' },
    { time: '11:30 AM - 12:45 PM', title: 'Keynote Seminar: "Nature Meets Deep Learning"', venue: 'Audio-Visual Hall 2', desc: 'Guest keynote by AI Research Director on Green AI & Edge Neural Computing.', type: 'Seminar' },
    { time: '01:00 PM - 01:45 PM', title: 'Eco-Friendly Lunch & Tech Exhibition Tour', venue: 'Central Courtyard & Food Arena', desc: 'Complimentary eco-friendly dining for all registered teams.', type: 'Break' },
    { time: '01:30 PM - 04:30 PM', title: 'CodeRelay Hackathon: Team Blind Coding Sprint', venue: 'CSE Linux Computing Center', desc: 'Relay speed-coding rounds with zero verbal communication baton pass.', type: 'Technical' },
    { time: '02:00 PM - 05:00 PM', title: 'Mega College Quiz Quest: Grand Live Finals', venue: 'PBCOE Main Auditorium Stage', desc: 'Written prelims followed by 6-team live buzzer stage showdown.', type: 'Technical' },
    { time: '05:00 PM - 06:00 PM', title: 'Technical Fest Prize Distribution Ceremony', venue: 'PBCOE Main Auditorium', desc: 'Trophies and ₹50,000+ cash prizes awarded to Day 1 champions.', type: 'Ceremony' }
  ];

  const day2Schedule = [
    { time: '08:30 AM - 09:00 AM', title: 'Sports Fest Opening Ceremony & Athletes Oath', venue: 'PBCOE Enclosed Turf Ground', desc: 'Flag hoisting and torch lighting by Event Head Aditya Giradkar & Discipline Head Aryan Thawale.', type: 'Ceremony' },
    { time: '09:00 AM - 01:00 PM', title: 'Box Cricket Championship: Knockout Rounds', venue: 'Enclosed Box Cricket Turf', desc: '16 college teams battle across 6-over fast knockout brackets.', type: 'Sports' },
    { time: '09:30 AM - 01:00 PM', title: 'Futsal 5v5 Arena: League Matches', venue: 'PBCOE Quadrangle Turf', desc: '15-minute quick halves with rolling substitutes.', type: 'Sports' },
    { time: '10:00 AM - 04:00 PM', title: 'Cyber Battle: LAN Esports Arena (BGMI & Valorant)', venue: 'CSE High-Performance Gaming Lab', desc: 'Competitive esports tournament lobbies on dedicated low-latency LAN.', type: 'Esports' },
    { time: '11:00 AM - 02:00 PM', title: 'Chess Masters & Badminton Clash', venue: 'Indoor Sports Complex', desc: 'Blitz chess brackets and singles/doubles badminton showdown.', type: 'Sports' },
    { time: '01:00 PM - 01:45 PM', title: 'Lunch & Hydration Refreshment Break', venue: 'Campus Cafeteria Arena', desc: 'Energy drinks, fruits, and hydration stations for sports participants.', type: 'Break' },
    { time: '02:00 PM - 03:30 PM', title: 'Box Cricket & Futsal Grand Finals', venue: 'PBCOE Central Sports Ground', desc: 'Championship finals with live commentary and cheer squads.', type: 'Sports' },
    { time: '03:30 PM - 05:00 PM', title: 'Tug of War: Strength & Synergy Finale', venue: 'Central Courtyard Arena', desc: 'Roaring tug of war battle across departments and guest colleges.', type: 'Sports' },
    { time: '05:30 PM - 08:00 PM', title: 'Grand Valedictory, Sports Awards & Cultural DJ Night', venue: 'PBCOE Open Air Amphitheatre', desc: 'Overall Fest Trophy presentation, faculty honors, and live DJ celebration.', type: 'Cultural' }
  ];

  const currentList = activeDay === 1 ? day1Schedule : day2Schedule;

  return (
    <section id="schedule" className="py-12 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122e1a] border border-[#00ff88]/40 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>Official Event Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Festival Daily Schedule
          </h2>
          <p className="text-sm text-emerald-200/80">
            Technical events scheduled on September 1st, 2026 and sports championships on September 2nd, 2026.
          </p>
        </div>

        {/* Day Selector Bar */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => { sound.playClick(); setActiveDay(1); }}
            className={`px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center gap-2.5 cursor-pointer ${
              activeDay === 1
                ? 'bg-gradient-to-r from-[#10b981] to-[#00ff88] text-[#031409] shadow-[0_0_20px_rgba(0,255,136,0.5)] scale-105'
                : 'wood-frame text-emerald-200 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Day 1: Technical Events (Sept 1)</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveDay(2); }}
            className={`px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center gap-2.5 cursor-pointer ${
              activeDay === 2
                ? 'bg-gradient-to-r from-[#00f0ff] to-[#0284c7] text-[#031409] shadow-[0_0_20px_rgba(0,240,255,0.5)] scale-105'
                : 'wood-frame text-emerald-200 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Day 2: Sports & Esports (Sept 2)</span>
          </button>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto wood-frame p-6 sm:p-8">
          <span className="brass-pin pin-tl" />
          <span className="brass-pin pin-tr" />
          <span className="brass-pin pin-bl" />
          <span className="brass-pin pin-br" />

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#633c21]">
            <div>
              <h3 className="text-xl font-bold text-white font-heading">
                {activeDay === 1 ? 'Technical Day Blueprint • September 1, 2026' : 'Sports Day Blueprint • September 2, 2026'}
              </h3>
              <p className="text-xs text-[#fcd34d] font-mono">
                {activeDay === 1 ? 'Hackathons, Quizzes, Idea Pitching & Seminars' : 'Box Cricket, Futsal, LAN Battle & Tug of War'}
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#071a0e] text-[#00ff88] border border-emerald-800">
              {currentList.length} Scheduled Sessions
            </span>
          </div>

          <div className="space-y-4">
            {currentList.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#081e11] border border-[#1b4a2b] hover:border-[#00ff88]/60 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 sm:max-w-[70%]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#031409] text-[#00ff88] border border-emerald-800 font-mono">
                      {item.type}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-emerald-900/60 text-xs text-emerald-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-mono text-[#fcd34d]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                    <MapPin className="w-3 h-3 text-[#00ff88]" />
                    <span>{item.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
