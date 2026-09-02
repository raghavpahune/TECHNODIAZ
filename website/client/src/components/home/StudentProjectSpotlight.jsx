import React, { useState, useEffect } from 'react';
import { Sparkles, Users, Award, ExternalLink, Github, Layers } from 'lucide-react';
import { apiRequest } from '../../services/api';

export const StudentProjectSpotlight = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiRequest('/content/projects');
        if (data.success && data.projects) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error('Failed to load spotlight projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Innovation Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              STUDENT <span className="text-emerald-400 text-neon-green">PROJECT SPOTLIGHT</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Cutting-edge software and embedded IoT innovations engineered by Department of Computer Science & Engineering students.
            </p>
          </div>
          <div className="text-xs text-emerald-400/80 font-mono bg-emerald-950/50 px-3.5 py-1.5 rounded-lg border border-emerald-800/40">
            {projects.length} Featured Engineering Prototypes
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div
              key={proj._id || idx}
              className="wood-board rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono">
                    {proj.category || 'Green Computing'}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Guide: {proj.guide || 'CSE Dept'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {proj.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies?.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#061009] text-emerald-400/90 border border-emerald-900/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-950 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-gray-400 font-mono">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate max-w-[170px]">{proj.students}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-gray-300 hover:text-white transition-colors"
                    title="Source Code"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
