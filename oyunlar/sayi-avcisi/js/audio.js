/**
 * Sayı Avcısı: Asal Kaçış - Web Audio API Procedural Sound Engine
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('sayi_avcisi_muted') === 'true';
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
    localStorage.setItem('sayi_avcisi_muted', this.isMuted.toString());
    return this.isMuted;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.15, pitchDrop = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (pitchDrop !== 0) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + pitchDrop), now + duration);
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

  playClick() {
    this.playTone(800, 'sine', 0.05, 0.08, -300);
  }

  playPrimeHit(prime) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const baseFreqs = {
      2: 440,
      3: 554.37,
      5: 659.25,
      7: 880,
      11: 1046.50,
      13: 1318.51,
      17: 1567.98,
      19: 1760
    };
    const freq = baseFreqs[prime] || (400 + prime * 35);

    this.playTone(freq, 'triangle', 0.18, 0.2, 80);
    setTimeout(() => {
      this.playTone(freq * 1.5, 'sine', 0.22, 0.15, -40);
    }, 40);
  }

  playError() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(130, now);
      osc2.frequency.setValueAtTime(138, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.25, 0.18, 0);
      }, i * 75);
    });
  }

  playStar(index = 1) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const starFreqs = [880, 1174.66, 1760];
    const freq = starFreqs[index - 1] || 1000;
    this.playTone(freq, 'sine', 0.4, 0.25, 0);
    setTimeout(() => {
      this.playTone(freq * 1.25, 'triangle', 0.3, 0.15, 0);
    }, 60);
  }

  playFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 659.25, d: 0.12, t: 120 },
      { f: 783.99, d: 0.12, t: 240 },
      { f: 1046.50, d: 0.35, t: 360 },
      { f: 880.00, d: 0.12, t: 720 },
      { f: 1046.50, d: 0.55, t: 840 }
    ];

    melody.forEach(item => {
      setTimeout(() => {
        this.playTone(item.f, 'triangle', item.d, 0.2, 0);
      }, item.t);
    });
  }

  playHint() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    this.playTone(987.77, 'sine', 0.2, 0.12, -150);
    setTimeout(() => {
      this.playTone(1318.51, 'sine', 0.3, 0.15, 0);
    }, 80);
  }
}

window.soundEngine = new SoundEngine();
