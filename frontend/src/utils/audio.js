// Web Audio API Synthesizer for Nature-Tech Sound Effects & Ambient Feedback

class SoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playBeep(freq = 440, type = 'sine', duration = 0.1, gainVal = 0.1) {
    if (this.isMuted) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  }

  playSuccess() {
    if (this.isMuted) return;
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playBeep(freq, 'triangle', 0.25, 0.15);
        }, idx * 80);
      });
    } catch (e) {}
  }

  playVerifySuccess() {
    if (this.isMuted) return;
    try {
      this.init();
      this.playBeep(880, 'sine', 0.15, 0.2);
      setTimeout(() => this.playBeep(1320, 'triangle', 0.3, 0.2), 120);
    } catch (e) {}
  }

  playError() {
    if (this.isMuted) return;
    try {
      this.init();
      this.playBeep(220, 'sawtooth', 0.2, 0.15);
      setTimeout(() => this.playBeep(180, 'sawtooth', 0.3, 0.2), 150);
    } catch (e) {}
  }

  playClick() {
    this.playBeep(800, 'sine', 0.04, 0.05);
  }
}

export const sound = new SoundFX();
