/**
 * Asal Dedektif: Çarpanlar ve Katlar Macerası - Audio Engine
 * Pure Web Audio API Procedural Sound Engine
 */

class DetectiveSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('asal_dedektif_muted') === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('asal_dedektif_muted', this.isMuted.toString());
    return this.isMuted;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.2, drop = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (drop !== 0) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + drop), now + duration);
      }

      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playClue() {
    this.playTone(659.25, 'triangle', 0.2, 0.18, 0); // E5
    setTimeout(() => this.playTone(987.77, 'sine', 0.25, 0.15, 0), 70); // B5
  }

  playUnlock() {
    this.playTone(440, 'triangle', 0.08, 0.2, 200);
    setTimeout(() => this.playTone(880, 'sine', 0.3, 0.22, 0), 60);
  }

  playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.3, 0.18, 0);
      }, i * 75);
    });
  }

  playError() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.3);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  playStar(index = 1) {
    const starPitches = [880, 1174.66, 1760];
    const freq = starPitches[index - 1] || 1000;
    this.playTone(freq, 'sine', 0.4, 0.25, 0);
    setTimeout(() => this.playTone(freq * 1.25, 'triangle', 0.3, 0.15, 0), 60);
  }

  playVictory() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 659.25, d: 0.12, t: 120 },
      { f: 783.99, d: 0.12, t: 240 },
      { f: 1046.50, d: 0.35, t: 360 },
      { f: 880.00, d: 0.12, t: 650 },
      { f: 1046.50, d: 0.50, t: 780 }
    ];

    melody.forEach(item => {
      setTimeout(() => {
        this.playTone(item.f, 'triangle', item.d, 0.2, 0);
      }, item.t);
    });
  }
}

window.soundEngine = new DetectiveSoundEngine();
