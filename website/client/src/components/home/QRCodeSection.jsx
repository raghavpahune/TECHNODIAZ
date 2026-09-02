import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Smartphone, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QRCodeSection = () => {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';

  const qrItems = [
    {
      title: 'Coding Challenge Hub',
      desc: 'Scan with mobile to solve challenges on the move.',
      url: `${origin}/coding-challenge`,
      tag: 'CHALLENGE',
    },
    {
      title: 'Student Registration',
      desc: 'Instant registration for national participants.',
      url: `${origin}/register`,
      tag: 'REGISTER',
    },
    {
      title: 'Live Leaderboard',
      desc: 'Track real-time rankings and podium scores.',
      url: `${origin}/leaderboard`,
      tag: 'LEADERBOARD',
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl wood-board p-8 sm:p-12 border border-emerald-800/40 relative overflow-hidden shadow-2xl">
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" /> Mobile Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              SCAN TO <span className="text-emerald-400 text-neon-green">PARTICIPATE</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              Use your smartphone camera to access instant coding challenges, event registrations, and live rank updates directly from the festival wall.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qrItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#08120B] rounded-2xl p-6 border border-emerald-900/60 flex flex-col items-center text-center space-y-4 hover:border-emerald-500 transition-all hover:shadow-neon-green"
              >
                <div className="p-3.5 bg-emerald-950 rounded-2xl border-2 border-emerald-500/40 shadow-inner flex items-center justify-center">
                  <QRCodeSVG
                    value={item.url}
                    size={140}
                    bgColor="#0B1A11"
                    fgColor="#10B981"
                    level="Q"
                    includeMargin={false}
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {item.tag}
                  </span>
                  <h3 className="text-base font-bold text-white pt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 max-w-[220px]">
                    {item.desc}
                  </p>
                </div>

                <a
                  href={item.url}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline"
                >
                  <span>Open direct link</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
