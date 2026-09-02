import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Printer, ShieldCheck, CheckCircle2, Sparkles, MapPin, Calendar } from 'lucide-react';
import { sound } from '../utils/audio';

export const DigitalPassModal = ({ team, onClose }) => {
  const ticketRef = useRef(null);

  if (!team) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-800/50">
          <div className="flex items-center gap-2 text-emerald-300">
            <Sparkles className="w-5 h-5 text-[#00ff88]" />
            <h3 className="font-bold text-lg text-white font-heading">Digital Entry Pass Issued</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Pass Container */}
        <div className="my-4" ref={ticketRef}>
          <div className="ticket-card p-6 border-2 border-[#00ff88] text-white">
            {/* Top Brand Bar */}
            <div className="flex items-start justify-between pb-4 border-b border-emerald-700/50">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00f0ff] block font-bold">
                  PBCOE NAGPUR • CSE DEPARTMENT
                </span>
                <h2 className="text-2xl font-extrabold font-heading text-white tracking-wide">
                  TECHNODIAZ 2K26
                </h2>
                <p className="text-[11px] text-emerald-300 font-brand">WHERE NATURE MEETS INNOVATION</p>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/50 uppercase block mb-1">
                  OFFICIAL PASS
                </span>
                <span className="text-xs font-mono font-extrabold text-[#fcd34d]">
                  {team.registrationId}
                </span>
              </div>
            </div>

            {/* Middle: Details & QR Code */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-4 items-center">
              {/* Team Info */}
              <div className="sm:col-span-7 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">Team Name</span>
                  <p className="font-extrabold text-base text-white">{team.teamName}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">Event Track</span>
                  <p className="font-bold text-emerald-200">{team.eventCategory}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[9px] uppercase text-emerald-400/80 block">Team Leader</span>
                    <p className="font-semibold text-white truncate">{team.leaderName}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-emerald-400/80 block">College</span>
                    <p className="font-semibold text-emerald-200 truncate">{team.collegeName || 'PBCOE'}</p>
                  </div>
                </div>

                <div className="pt-1 flex items-center gap-3 text-[10px] text-emerald-300/80 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#00ff88]" />
                    <span>{team.eventType === 'Sports' ? 'Sept 2, 2026' : 'Sept 1, 2026'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#00f0ff]" />
                    <span>PBCOE Campus</span>
                  </span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 rounded-xl bg-[#031107] border border-emerald-700/60 shadow-inner text-center">
                <div className="p-2 bg-white rounded-lg shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                  <QRCodeSVG
                    value={team.qrCodeData || team.registrationId}
                    size={120}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#00ff88] mt-2 font-bold uppercase tracking-wider">
                  GATE VERIFICATION QR
                </span>
              </div>
            </div>

            {/* Bottom Bar: Verification Status */}
            <div className="pt-3 border-t border-emerald-700/50 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88]" />
                <span className="text-emerald-200">
                  {team.verified ? `Verified by ${team.verifiedBy || 'Gate Admin'}` : 'Status: Confirmed / Pending Gate Scan'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400/60">
                100% Eco-Friendly Zero-Paper Pass
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-3 rounded-lg bg-[#07190e] border border-emerald-800/80 text-xs text-emerald-200/90 space-y-1 mb-4">
          <p className="font-bold text-[#fcd34d] flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
            <span>Campus Entry Instructions</span>
          </p>
          <p className="text-[11px]">
            Please take a screenshot of this pass or keep this QR code ready on your smartphone for instant gate scanning on event day.
          </p>
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-200 hover:bg-emerald-900 cursor-pointer"
          >
            Close
          </button>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-[#182a1d] text-emerald-200 border border-emerald-700 hover:bg-emerald-900 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Pass</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn-nature-primary text-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Save Digital Pass</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
