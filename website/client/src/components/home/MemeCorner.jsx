import React from 'react';
import { Smile, Flame, Sparkles, Terminal } from 'lucide-react';

export const MemeCorner = () => {
  const memes = [
    {
      title: "When your C++ code compiles on the 1st try",
      caption: "Wait... what did I do wrong? Where are the 148 template errors?",
      tag: "C++ Devs",
      emoji: "🤖",
    },
    {
      title: "Nature: Photosynthesis converts sunlight to sugar",
      caption: "CSE Student: Converts caffeine and stack-traces into algorithmic glory at 3 AM.",
      tag: "Student Life",
      emoji: "☕",
    },
    {
      title: "Deploying to production on a Friday afternoon",
      caption: "Server: 'It works on my local machine!'\nCloud Provider: 'That's not how cloud works.'",
      tag: "DevOps",
      emoji: "🔥",
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Smile className="w-3.5 h-3.5" /> Department Humor
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              MEME <span className="text-emerald-400 text-neon-green">CORNER</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Because coding algorithms, fixing pointer leaks, and saving the planet requires a good laugh!
            </p>
          </div>
          <div className="text-xs text-emerald-400/80 font-mono bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40">
            Certified Bug-Free Jokes
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memes.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#0c140e] rounded-2xl p-6 border border-emerald-900/60 hover:border-emerald-400/80 transition-all hover:-translate-y-1 shadow-lg space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {m.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  "{m.title}"
                </h3>
                <div className="p-3.5 rounded-xl bg-[#060B08] border border-emerald-950 text-xs text-gray-300 font-mono whitespace-pre-line leading-relaxed">
                  {m.caption}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                <span>#TechnodiazHumor</span>
                <span className="text-emerald-400 font-semibold">100% CSE Approved</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
