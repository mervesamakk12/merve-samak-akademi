/**
 * DİJİTAL MATEMATİK YARIŞMASI: SES MOTORU (Web Audio API Synthesizer)
 * Harici dosya bağımlılığı olmadan %100 çevrimdışı ve kesintisiz çalışan ses sentezleyici
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio API desteklenmiyor:", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Temel osilatör çalma yardımcı metodu
  playTone(freq, type = 'sine', duration = 0.2, startTime = 0, gainVal = 0.15) {
    if (this.muted || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime + startTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(gainVal, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + duration);
  }

  // Buton Tıklama
  playClick() {
    if (this.muted || !this.ctx) return;
    this.playTone(800, 'triangle', 0.05, 0, 0.08);
  }

  // Doğru Cevap (Melodik arpej: C5 -> E5 -> G5 -> C6)
  playCorrect() {
    if (this.muted || !this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.35, idx * 0.08, 0.2);
    });
  }

  // Yanlış Cevap / Uyarı (Yumuşak düşüş tonu)
  playWrong() {
    if (this.muted || !this.ctx) return;
    this.playTone(280, 'sawtooth', 0.25, 0, 0.12);
    this.playTone(210, 'sawtooth', 0.35, 0.15, 0.12);
  }

  // Süre Sayacı Tık Sesi
  playTick() {
    if (this.muted || !this.ctx) return;
    this.playTone(900, 'sine', 0.04, 0, 0.06);
  }

  // Süre Bitiş Düdüğü / Alarmı
  playTimeUp() {
    if (this.muted || !this.ctx) return;
    this.playTone(400, 'square', 0.3, 0, 0.12);
    this.playTone(350, 'square', 0.4, 0.25, 0.15);
  }

  // Seviye Atlama Fanfarı
  playLevelUp() {
    if (this.muted || !this.ctx) return;
    const chords = [
      { f: 523.25, time: 0 },
      { f: 659.25, time: 0.1 },
      { f: 783.99, time: 0.2 },
      { f: 1046.50, time: 0.3 },
      { f: 1318.51, time: 0.5 }
    ];
    chords.forEach(c => {
      this.playTone(c.f, 'triangle', 0.45, c.time, 0.22);
    });
  }

  // Şampiyonluk / Final Zafer Fanfarı
  playVictory() {
    if (this.muted || !this.ctx) return;
    const notes = [
      { f: 523.25, d: 0.2, t: 0 },
      { f: 523.25, d: 0.2, t: 0.18 },
      { f: 523.25, d: 0.2, t: 0.36 },
      { f: 659.25, d: 0.4, t: 0.54 },
      { f: 783.99, d: 0.3, t: 0.8 },
      { f: 1046.50, d: 0.7, t: 1.05 }
    ];
    notes.forEach(n => {
      this.playTone(n.f, 'triangle', n.d, n.t, 0.25);
    });
  }
}

// Global ses motoru örneği
window.soundEngine = new SoundEngine();
