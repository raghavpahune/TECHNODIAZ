import React, { useState } from 'react';
import { Leaf, Cpu, Globe, Lightbulb, Quote, Trophy, Smile, Sparkles, CheckCircle2, ChevronRight, ExternalLink, Zap, Terminal, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const ThematicNoticeBoards = ({ onSelectProject }) => {
  const [activeMemeTab, setActiveMemeTab] = useState(0);

  const memes = [
    {
      title: 'When code runs with 0 errors on first try',
      caption: 'I AM A PROGRAMMER 🚀',
      dialog: 'Suspicious... checking if main() is actually being called.',
      author: 'CSE Batch 2026'
    },
    {
      title: 'Debugging at 3:00 AM before TechFest',
      caption: 'It worked on localhost, why not on production?!',
      dialog: 'Console: undefined is not a function in line 404.',
      author: 'Frontend Team'
    },
    {
      title: 'Feature vs Bug philosophy',
      caption: 'No bugs in my code, they are just spontaneous features! 🐞',
      dialog: 'Client: "Is this intended?" Dev: "Yes, it is undocumented AI."',
      author: 'Hackathon Lead'
    }
  ];

  return (
    <section id="boards" className="py-12 relative">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122e1a] border border-[#00ff88]/40 text-[#00ff88] text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-[#39e75f]" />
            <span>Curated Thematic Wall Boards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Nature Meets Innovation Bulletin
          </h2>
          <p className="text-sm text-emerald-200/80">
            Faithfully recreated from the iconic PBCOE CSE festival display wall.
          </p>
        </div>

        {/* The 2-Column / Multi-Row Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Board 1: AI FOR GOOD */}
          <div className="wood-frame p-5 flex flex-col justify-between space-y-4">
            <span className="brass-pin pin-tl" />
            <span className="brass-pin pin-tr" />
            <span className="brass-pin pin-bl" />
            <span className="brass-pin pin-br" />

            <div className="space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#633c21]">
                <div className="p-2 rounded-lg bg-[#0e301b] text-[#00ff88]">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white font-heading">AI FOR GOOD</h3>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Artificial Intelligence is powering climate prediction, wildlife habitat conservation, smart precision farming, renewable microgrids, and disaster mitigation across the globe.
              </p>

              <div className="space-y-1.5 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                  <span>Climate modeling & forest cover telemetry</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                  <span>Crop disease computer vision diagnostics</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a6ff00]" />
                  <span>Smart energy grid balancing & demand prediction</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#081a0e] border border-emerald-800/60 flex items-center justify-between text-xs">
              <span className="text-emerald-300 font-mono">CSE Green AI Track</span>
              <span className="text-[#00ff88] font-bold">Sept 1, 2026</span>
            </div>
          </div>

          {/* Board 2: SUSTAINABLE COMPUTING */}
          <div className="wood-frame p-5 flex flex-col justify-between space-y-4">
            <span className="brass-pin pin-tl" />
            <span className="brass-pin pin-tr" />
            <span className="brass-pin pin-bl" />
            <span className="brass-pin pin-br" />

            <div className="space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#633c21]">
                <div className="p-2 rounded-lg bg-[#0e301b] text-[#39e75f]">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white font-heading">SUSTAINABLE COMPUTING</h3>
                  <span className="text-[10px] text-amber-300 font-mono">Let's Code a Better Planet</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 text-xs">
                {[
                  { label: 'Reduce E-Waste', desc: 'Hardware repurposing & modular design' },
                  { label: 'Energy Efficient Algorithms', desc: 'Lowering computational overhead' },
                  { label: 'Paperless Solutions', desc: '100% Digital QR festival passes' },
                  { label: 'Green Data Centers', desc: 'Renewable energy computing nodes' },
                  { label: 'Responsible Innovation', desc: 'Ethical engineering for community' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 rounded bg-[#091f12] border border-[#1b4329]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88] flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-white">{item.label}</span>
                      <span className="text-[10px] text-emerald-300/70 block">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-emerald-400 font-mono text-center">
              🌿 Carbon Neutral TechFest Target
            </div>
          </div>

          {/* Board 3: DID YOU KNOW & QUOTE */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Did You Know */}
            <div className="wood-frame p-4 relative">
              <span className="brass-pin pin-tl" />
              <span className="brass-pin pin-tr" />
              <span className="brass-pin pin-bl" />
              <span className="brass-pin pin-br" />

              <div className="flex items-center gap-2 pb-2 border-b border-[#633c21]">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-sm text-[#fcd34d] uppercase font-brand">DID YOU KNOW?</h4>
              </div>

              <p className="mt-2 text-xs text-amber-100/90 leading-relaxed">
                "A single Google search consumes approximately <strong>0.3 watt-hour</strong> of electricity. Optimizing web requests and deploying lightweight code saves megawatts at scale!"
              </p>

              <div className="mt-2 text-[10px] text-emerald-300 font-mono text-right">
                Small Actions ➔ Big Impact 💡
              </div>
            </div>

            {/* Quote of the Month */}
            <div className="wood-frame p-4 relative">
              <span className="brass-pin pin-tl" />
              <span className="brass-pin pin-tr" />
              <span className="brass-pin pin-bl" />
              <span className="brass-pin pin-br" />

              <div className="flex items-center gap-2 pb-2 border-b border-[#633c21]">
                <Quote className="w-4 h-4 text-[#00ff88]" />
                <h4 className="font-bold text-sm text-white font-brand">QUOTE OF THE MONTH</h4>
              </div>

              <blockquote className="mt-2 text-xs italic text-emerald-100/95 leading-relaxed">
                “The best way to predict the future is to invent it.”
              </blockquote>

              <p className="mt-1 text-[11px] font-bold text-[#fcd34d] font-mono text-right">
                — Alan Kay (Turing Award Laureate)
              </p>
            </div>
          </div>

          {/* Board 4: STUDENT PROJECT SPOTLIGHT */}
          <div className="wood-frame p-5 space-y-4">
            <span className="brass-pin pin-tl" />
            <span className="brass-pin pin-tr" />
            <span className="brass-pin pin-bl" />
            <span className="brass-pin pin-br" />

            <div className="flex items-center justify-between pb-2 border-b border-[#633c21]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00ff88]" />
                <h3 className="font-bold text-base text-white font-heading">STUDENT PROJECT SPOTLIGHT</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                PBCOE CSE
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: 'Smart Irrigation System',
                  tech: 'IoT • ESP32 • Soil Telemetry',
                  desc: 'Solar-powered automated moisture sensing and drip flow management reducing water usage by 42%.'
                },
                {
                  title: 'Plant Disease Detection using AI',
                  tech: 'PyTorch • MobileNet • Computer Vision',
                  desc: 'Real-time leaf pathology scanner with 96.4% classification accuracy on 38 crop disease classes.'
                },
                {
                  title: 'Eco-Friendly Smart Segregation Bin',
                  tech: 'Computer Vision • Ultrasonic • Arduino',
                  desc: 'Automated waste classification separating dry, wet, and e-waste components at source.'
                }
              ].map((proj, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#091f12] border border-[#1b4329] space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-white">{proj.title}</h4>
                    <span className="text-[9px] font-mono text-[#00ff88]">{proj.tech}</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/80 leading-tight">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Board 5: ACHIEVEMENTS & TROPHY */}
          <div className="wood-frame p-5 space-y-4">
            <span className="brass-pin pin-tl" />
            <span className="brass-pin pin-tr" />
            <span className="brass-pin pin-bl" />
            <span className="brass-pin pin-br" />

            <div className="flex items-center gap-2.5 pb-2 border-b border-[#633c21]">
              <div className="p-2 rounded-lg bg-[#2e1d0d] text-[#fcd34d]">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white font-heading">PBCOE CSE ACHIEVEMENTS</h3>
                <span className="text-[10px] text-amber-300 font-mono">Excellence in Code & Innovation</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { title: '1st Place', event: 'Smart India Hackathon (SIH)', badge: 'National Champions' },
                { title: 'Finalists', event: 'CodeChef Collegiate Challenge', badge: 'Top 10 Nationally' },
                { title: 'Published Papers', event: 'Research in IJCRT & Scopus Indexed', badge: '12+ Papers' },
                { title: '500+ LeetCode Solved', event: 'Competitive Programming Society', badge: 'Active Cohort' },
                { title: 'Deployed Projects', event: 'Enterprise & Open Source Apps', badge: '8 Live Apps' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#091f12] border border-[#1b4329]">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white text-xs block">{item.title}</span>
                    <span className="text-[10px] text-emerald-300/80">{item.event}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#fcd34d]/20 text-[#fcd34d] border border-[#fcd34d]/40">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Board 6: MEME CORNER & DEVELOPER HUMOR */}
          <div className="wood-frame p-5 space-y-4">
            <span className="brass-pin pin-tl" />
            <span className="brass-pin pin-tr" />
            <span className="brass-pin pin-bl" />
            <span className="brass-pin pin-br" />

            <div className="flex items-center justify-between pb-2 border-b border-[#633c21]">
              <div className="flex items-center gap-2">
                <Smile className="w-4 h-4 text-[#00f0ff]" />
                <h3 className="font-bold text-base text-white font-heading">MEME CORNER & DEV LIFE</h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-300">#DevHumor</span>
            </div>

            {/* Meme Selector Tabs */}
            <div className="flex gap-1.5">
              {memes.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => { sound.playClick(); setActiveMemeTab(idx); }}
                  className={`flex-1 py-1 text-[10px] font-bold rounded transition-all cursor-pointer ${
                    activeMemeTab === idx
                      ? 'bg-cyan-500 text-black'
                      : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900'
                  }`}
                >
                  Meme #{idx + 1}
                </button>
              ))}
            </div>

            {/* Active Meme Card */}
            <div className="p-4 rounded-xl bg-[#081a0e] border border-cyan-500/40 space-y-2 shadow-inner">
              <h4 className="text-xs font-bold text-[#00f0ff] uppercase tracking-wider">
                {memes[activeMemeTab].title}
              </h4>
              <div className="p-3 rounded-lg bg-[#040e08] border border-emerald-800 text-xs font-mono text-white text-center font-bold">
                "{memes[activeMemeTab].caption}"
              </div>
              <p className="text-[11px] text-emerald-200/90 italic">
                {memes[activeMemeTab].dialog}
              </p>
              <div className="text-[10px] text-cyan-400 text-right font-mono">
                — {memes[activeMemeTab].author}
              </div>
            </div>

            {/* Classic Mantra */}
            <div className="p-2.5 rounded-lg bg-gradient-to-r from-[#180e08] via-[#24140a] to-[#180e08] border border-[#633c21] text-center font-mono text-[11px] font-bold text-[#fcd34d] tracking-wider">
              EAT ➔ SLEEP ➔ CODE ➔ REPEAT ⚡
            </div>
          </div>
        </div>

        {/* Bottom Centerpiece Plaque: "Innovation Flourishes" */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#0d2816] via-[#1b4329] to-[#0d2816] border-2 border-[#00ff88]/50 shadow-[0_0_30px_rgba(0,255,136,0.3)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#041a0d] border-2 border-[#00ff88] flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(0,255,136,0.5)]">
              🧠🌿
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                "INNOVATION FLOURISHES WHERE CREATIVITY MEETS SUSTAINABILITY"
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/90 font-mono">
                Department of Computer Science & Engineering | Priyadarshini Bhagwati College of Engineering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="px-3.5 py-1.5 rounded-full bg-[#041a0d] text-xs font-bold text-[#00ff88] border border-[#00ff88]/40">
              Sept 1 & 2, 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
