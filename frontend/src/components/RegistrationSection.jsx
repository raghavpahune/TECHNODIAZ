import React, { useState } from 'react';
import { QrCode, Plus, Trash2, CheckCircle, Sparkles, Shield, User, Mail, Phone, School, Award, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../utils/audio';

export const RegistrationSection = ({ initialEvent, onRegistrationSuccess }) => {
  const eventOptions = [
    'IdeaStorm (Innovation Pitching)',
    'TechCanvas (Web & UI/UX Hackathon)',
    'Mega College Quiz Quest',
    'CodeRelay Hackathon',
    'AI & ML Project Showcase',
    'Cyber Battle (LAN Gaming)',
    'Box Cricket Championship',
    'Futsal Arena',
    'Chess Masters',
    'Badminton Clash',
    'Tug of War'
  ];

  const [formData, setFormData] = useState({
    teamName: '',
    eventCategory: initialEvent ? initialEvent.title : 'IdeaStorm (Innovation Pitching)',
    eventType: initialEvent?.category || 'Technical',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    collegeName: 'PBCOE Nagpur',
    department: 'Computer Science & Engineering',
    yearOfStudy: '3rd Year',
    members: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddMember = () => {
    sound.playClick();
    if (formData.members.length >= 4) return;
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { name: '', role: 'Team Member', email: '', phone: '' }]
    }));
  };

  const handleRemoveMember = (idx) => {
    sound.playClick();
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== idx)
    }));
  };

  const handleMemberChange = (idx, field, value) => {
    setFormData((prev) => {
      const nextMembers = [...prev.members];
      nextMembers[idx][field] = value;
      return { ...prev, members: nextMembers };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.teamName.trim() || !formData.leaderName.trim() || !formData.leaderEmail.trim() || !formData.leaderPhone.trim()) {
      setError('Please fill in all mandatory fields.');
      sound.playError();
      return;
    }

    setLoading(true);
    try {
      sound.playClick();
      const res = await api.registerTeam(formData);
      if (res.success && res.team) {
        sound.playSuccess();
        onRegistrationSuccess(res.team);
        // Reset form
        setFormData({
          teamName: '',
          eventCategory: 'IdeaStorm (Innovation Pitching)',
          eventType: 'Technical',
          leaderName: '',
          leaderEmail: '',
          leaderPhone: '',
          collegeName: 'PBCOE Nagpur',
          department: 'Computer Science & Engineering',
          yearOfStudy: '3rd Year',
          members: []
        });
      } else {
        setError(res.message || 'Registration failed.');
        sound.playError();
      }
    } catch (err) {
      setError('Connection error with registration server. Please try again.');
      sound.playError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="py-12 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122e1a] border border-[#00ff88]/40 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
            <QrCode className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>Open Public Registration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Team Registration Desk
          </h2>
          <p className="text-sm text-emerald-200/80">
            No password or login required. Register your squad and receive an instant, downloadable Digital QR Pass for seamless entry at PBCOE.
          </p>
        </div>

        {/* Form Container with Wood & Circuit Theme */}
        <div className="max-w-3xl mx-auto wood-frame p-6 sm:p-10">
          <span className="brass-pin pin-tl" />
          <span className="brass-pin pin-tr" />
          <span className="brass-pin pin-bl" />
          <span className="brass-pin pin-br" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Event Selection & Team Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1.5">
                  Select Event Competition *
                </label>
                <select
                  value={formData.eventCategory}
                  onChange={(e) => {
                    const cat = e.target.value;
                    const isSports = cat.includes('Cricket') || cat.includes('Futsal') || cat.includes('Chess') || cat.includes('Badminton') || cat.includes('Tug') || cat.includes('Battle');
                    setFormData({
                      ...formData,
                      eventCategory: cat,
                      eventType: isSports ? 'Sports' : 'Technical'
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081a0e] border border-[#1b4329] text-white text-xs sm:text-sm focus:outline-none focus:border-[#00ff88]"
                >
                  {eventOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#051309] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
                  Category: {formData.eventType} ({formData.eventType === 'Sports' ? 'Sept 2nd' : 'Sept 1st'})
                </span>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1.5">
                  Team Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CyberVanguard, GreenByte"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081a0e] border border-[#1b4329] text-white text-xs sm:text-sm focus:outline-none focus:border-[#00ff88]"
                />
              </div>
            </div>

            {/* Leader Details */}
            <div className="p-4 rounded-2xl bg-[#081e11] border border-[#194025] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#00ff88] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Team Leader Information (Primary Contact)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-emerald-300 block mb-1">Leader Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Patil"
                    value={formData.leaderName}
                    onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#040e08] border border-emerald-800 text-white text-xs focus:outline-none focus:border-[#00ff88]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-emerald-300 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="leader@gmail.com"
                    value={formData.leaderEmail}
                    onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#040e08] border border-emerald-800 text-white text-xs focus:outline-none focus:border-[#00ff88]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-emerald-300 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.leaderPhone}
                    onChange={(e) => setFormData({ ...formData, leaderPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#040e08] border border-emerald-800 text-white text-xs focus:outline-none focus:border-[#00ff88]"
                  />
                </div>
              </div>
            </div>

            {/* Academic Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  College Name
                </label>
                <input
                  type="text"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  placeholder="PBCOE Nagpur"
                  className="w-full px-3 py-2 rounded-lg bg-[#081a0e] border border-[#1b4329] text-white text-xs focus:outline-none focus:border-[#00ff88]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Computer Science & Engineering"
                  className="w-full px-3 py-2 rounded-lg bg-[#081a0e] border border-[#1b4329] text-white text-xs focus:outline-none focus:border-[#00ff88]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Year of Study
                </label>
                <select
                  value={formData.yearOfStudy}
                  onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#081a0e] border border-[#1b4329] text-white text-xs focus:outline-none focus:border-[#00ff88]"
                >
                  <option value="1st Year">1st Year (FE)</option>
                  <option value="2nd Year">2nd Year (SE)</option>
                  <option value="3rd Year">3rd Year (TE)</option>
                  <option value="Final Year">Final Year (BE)</option>
                </select>
              </div>
            </div>

            {/* Additional Team Members */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Additional Team Members ({formData.members.length}/4)
                </span>
                {formData.members.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="text-xs font-semibold text-[#00ff88] hover:text-emerald-200 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Teammate</span>
                  </button>
                )}
              </div>

              {formData.members.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#06140b] border border-emerald-900/80 flex flex-col sm:flex-row items-center gap-2.5">
                  <span className="text-[10px] font-mono text-emerald-400 w-6">#{idx + 1}</span>
                  <input
                    type="text"
                    required
                    placeholder="Member Name"
                    value={m.name}
                    onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 rounded bg-[#030d07] border border-emerald-800 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g. Developer, Presenter)"
                    value={m.role}
                    onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                    className="w-full sm:w-36 px-2.5 py-1.5 rounded bg-[#030d07] border border-emerald-800 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(idx)}
                    className="p-1.5 rounded bg-red-950/60 text-red-400 hover:text-white"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#633c21] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                <span>Instant QR generation upon submission</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto btn-nature-primary text-sm px-8 py-3 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Generating QR Pass...' : 'Confirm Registration & Download Pass'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
