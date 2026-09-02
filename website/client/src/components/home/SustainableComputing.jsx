import React from 'react';
import { Recycle, Zap, FileSpreadsheet, Server, ShieldCheck, Leaf, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SustainableComputing = () => {
  const principles = [
    {
      icon: Recycle,
      title: 'E-Waste Reduction & Upcycling',
      desc: 'Refactoring older silicon hardware with lightweight Linux kernels and micro-embedded nodes to eliminate electronic obsolescence.',
    },
    {
      icon: Zap,
      title: 'Energy-Efficient Algorithmics',
      desc: 'Optimizing algorithmic time and space complexities to minimize processor clock cycles and thermodynamic watt consumption.',
    },
    {
      icon: FileSpreadsheet,
      title: '100% Paperless Digital Workflows',
      desc: 'Complete student evaluation, digital cryptographic certifications, and web submissions conserving thousands of sheets each semester.',
    },
    {
      icon: Server,
      title: 'Green Micro-Data Centers',
      desc: 'Dynamic cloud workload shifting into geographic server zones energized by active photovoltaic solar and wind peaks.',
    },
    {
      icon: ShieldCheck,
      title: 'Ethical & Responsible Innovation',
      desc: 'Promoting open standards, decentralized resilience, and environmental transparency in every software lifecycle.',
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Feature Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" /> Sustainable Computing Paradigm
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
              LET'S CODE A <br />
              <span className="text-emerald-400 text-neon-green">BETTER PLANET.</span>
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">
              Every line of code executes on physical silicon and draws energy from the grid. At TECHNODIAZ 2K26, we challenge engineers to design lean, algorithmic, and carbon-aware architectures.
            </p>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
              <div className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider">
                🌱 Green Coding Pledge
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                "We commit to writing algorithmic software that maximizes computational efficiency, minimizes carbon dissipation, and respects planetary boundaries."
              </p>
            </div>

            <div>
              <Link
                to="/coding-challenge"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-neon-green transition-all"
              >
                <span>Take Green Tech Challenge</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Principles Cards Grid */}
          <div className="lg:col-span-7 space-y-3.5">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="wood-board rounded-xl p-4 sm:p-5 flex items-start gap-4 transition-all duration-200 hover:translate-x-1.5"
              >
                <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-700/50 text-emerald-400 flex-shrink-0">
                  <p.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white font-display">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
