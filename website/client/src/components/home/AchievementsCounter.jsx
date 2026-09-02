import React, { useState, useEffect } from 'react';
import { Code, Users, Cpu, Calendar, Award, Sparkles } from 'lucide-react';
import { apiRequest } from '../../services/api';

export const AchievementsCounter = () => {
  const [achievements, setAchievements] = useState([
    { key: 'problems_solved', label: 'Problems Solved', value: '500+', icon: 'Code' },
    { key: 'participants', label: 'Registered Participants', value: '150+', icon: 'Users' },
    { key: 'projects', label: 'Innovation Projects', value: '25+', icon: 'Cpu' },
    { key: 'events', label: 'Tech Fest Events', value: '12+', icon: 'Calendar' },
  ]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await apiRequest('/content/achievements');
        if (data.success && data.achievements && data.achievements.length > 0) {
          setAchievements(data.achievements);
        }
      } catch (err) {
        // use defaults
      }
    };
    fetchAchievements();
  }, []);

  const getIcon = (name) => {
    switch (name) {
      case 'Code': return Code;
      case 'Users': return Users;
      case 'Cpu': return Cpu;
      case 'Calendar': return Calendar;
      default: return Award;
    }
  };

  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {achievements.map((item, idx) => {
            const IconComponent = getIcon(item.icon);
            return (
              <div
                key={idx}
                className="wood-board rounded-2xl p-6 text-center space-y-2 border border-emerald-800/40 relative overflow-hidden group hover:border-emerald-500 transition-all hover:-translate-y-1 hover:shadow-neon-green"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight text-neon-green">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-300">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
