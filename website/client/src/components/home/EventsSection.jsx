import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Award, ArrowRight, UserCheck, X } from 'lucide-react';
import { apiRequest } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiRequest('/content/events');
        if (data.success && data.events) {
          setEvents(data.events);
        }
      } catch (err) {
        console.error('Failed to load events:', err);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setIsRegistering(true);
  };

  const confirmRegistration = () => {
    toast.success(`Successfully registered for ${selectedEvent.title}! Confirmation sent to your email.`);
    setIsRegistering(false);
    setSelectedEvent(null);
  };

  return (
    <section id="events" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" /> Festival Calendar
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              UPCOMING <span className="text-emerald-400 text-neon-green">EVENTS & WORKSHOPS</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Competitive hackathons, hands-on masterclasses, and project symposiums at TECHNODIAZ 2K26.
            </p>
          </div>
          <div className="text-xs text-emerald-400/80 font-mono bg-emerald-950/60 px-3.5 py-1.5 rounded-lg border border-emerald-800/40">
            5 Sept - 6 Sept 2026
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt, idx) => (
            <div
              key={evt._id || idx}
              className="wood-board rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono">
                    {evt.category || 'Technical'}
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                    {evt.status?.toUpperCase() || 'UPCOMING'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {evt.title}
                </h3>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {evt.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-emerald-950 text-xs text-gray-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{evt.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{evt.prizePool}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-950">
                <button
                  onClick={() => handleRegister(evt)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-950 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-700/50 hover:border-emerald-500 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Register for Event</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {isRegistering && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="wood-board max-w-md w-full rounded-2xl p-6 space-y-5 border border-emerald-500/40 shadow-2xl relative">
            <button
              onClick={() => setIsRegistering(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Event Pass Registration
              </span>
              <h3 className="text-xl font-bold text-white">{selectedEvent.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Venue: {selectedEvent.venue} | Time: {selectedEvent.time}
              </p>
            </div>

            <div className="p-3 bg-[#061009] rounded-xl border border-emerald-900/60 text-xs text-gray-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-400">Coordinator:</span>
                <span className="text-white font-medium">{selectedEvent.coordinator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Prize Pool:</span>
                <span className="text-emerald-300 font-bold">{selectedEvent.prizePool}</span>
              </div>
            </div>

            <p className="text-xs text-gray-300">
              Confirm registration for your student profile? Your college badge will be linked automatically.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsRegistering(false)}
                className="py-2.5 rounded-xl text-xs font-semibold bg-white/5 text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={confirmRegistration}
                className="py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green"
              >
                Confirm Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
