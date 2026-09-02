import React from 'react';
import { Users, Mail, Phone, Award, ShieldCheck, Sparkles, Code2, Globe, Cpu } from 'lucide-react';
import { sound } from '../utils/audio';

export const CoreTeamSection = () => {
  const committeeMembers = [
    {
      designation: 'President',
      name: 'Mr. Aditya Bandhanwar',
      department: 'CSE Department',
      avatar: '👨‍💼',
      badgeColor: 'from-[#10b981] to-[#047857]',
      desc: 'Overall Fest Steering, Strategic Planning & Academic Coordination'
    },
    {
      designation: 'Event Head',
      name: 'Aditya Giradkar',
      department: 'CSE Department',
      avatar: '🎯',
      badgeColor: 'from-[#00f0ff] to-[#0284c7]',
      desc: 'Flagship Event Operations, Hackathons & Tournament Schedules'
    },
    {
      designation: 'Vice President',
      name: 'Aakanksha Nakhate',
      department: 'CSE Department',
      avatar: '👩‍💼',
      badgeColor: 'from-[#a6ff00] to-[#15803d]',
      desc: 'Inter-College Outreach, Delegate Relations & Stage Management'
    },
    {
      designation: 'Secretary',
      name: 'Sharayu Bhute',
      department: 'CSE Department',
      avatar: '📋',
      badgeColor: 'from-[#f59e0b] to-[#b45309]',
      desc: 'Official Communications, Protocols & Eco-Tech Compliance'
    },
    {
      designation: 'Joint Secretary',
      name: 'Priyanka Partane',
      department: 'CSE Department',
      avatar: '📝',
      badgeColor: 'from-[#ec4899] to-[#be185d]',
      desc: 'Team Registrations, Logistics & Hospitality Coordination'
    },
    {
      designation: 'Treasurer',
      name: 'Mahesh Wadibhasme',
      department: 'CSE Department',
      avatar: '💰',
      badgeColor: 'from-[#fbbf24] to-[#d97706]',
      desc: 'Budget Management, Prize Disbursements & Sponsor Accounts'
    },
    {
      designation: 'Media Head',
      name: 'Kartik Kanzode',
      department: 'CSE Department',
      avatar: '📸',
      badgeColor: 'from-[#8b5cf6] to-[#6d28d9]',
      desc: 'Digital Marketing, Live Streaming, PR & Coverage Desk'
    },
    {
      designation: 'Discipline Head',
      name: 'Aryan Thawale',
      department: 'CSE Department',
      avatar: '🛡️',
      badgeColor: 'from-[#ef4444] to-[#b91c1c]',
      desc: 'Campus Security, Gate Pass Verification & Sports Fair-Play'
    },
    {
      designation: 'Technical Head',
      name: 'Hansika Kakpure',
      department: 'CSE Department',
      avatar: '💻',
      badgeColor: 'from-[#00ff88] to-[#059669]',
      desc: 'Web Portal Engineering, QR Verification Network & Code Challenges'
    }
  ];

  return (
    <section id="core-team" className="py-12 relative">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122e1a] border border-[#00ff88]/40 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>PBCOE CSE Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Core Committee Directory
          </h2>
          <p className="text-sm text-emerald-200/80">
            Meet the designated student leaders and organizers behind TECHNODIAZ 2k26 at Priyadarshini Bhagwati College of Engineering.
          </p>
        </div>

        {/* 9 Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {committeeMembers.map((member, idx) => (
            <div
              key={idx}
              className="wood-frame p-5 flex flex-col justify-between space-y-3 hover:-translate-y-1 transition-all group"
            >
              <span className="brass-pin pin-tl" />
              <span className="brass-pin pin-tr" />
              <span className="brass-pin pin-bl" />
              <span className="brass-pin pin-br" />

              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-[#081a0e] border-2 border-[#00ff88]/50 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(0,255,136,0.3)] group-hover:scale-110 transition-transform flex-shrink-0">
                  {member.avatar}
                </div>

                <div className="space-y-1">
                  {/* Designation Badge */}
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r ${member.badgeColor} text-black`}>
                    {member.designation}
                  </span>

                  {/* Name */}
                  <h3 className="font-extrabold text-base text-white font-heading group-hover:text-[#00ff88] transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-[11px] text-[#fcd34d] font-mono">
                    {member.department} • PBCOE
                  </p>
                </div>
              </div>

              {/* Responsibilities */}
              <p className="text-xs text-emerald-200/85 pt-2 border-t border-[#633c21] leading-relaxed">
                {member.desc}
              </p>

              {/* Footer status */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
                  <span>Authorized Head</span>
                </span>
                <span className="text-[10px] text-emerald-500/70">TECHNODIAZ 2k26</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
