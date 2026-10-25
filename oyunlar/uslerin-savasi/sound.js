/**
 * MERVE SAMAK AKADEMİ — DİJİTAL MATEMATİK YARIŞMASI: SES MOTORU
 * Web Audio API ile sıfır harici dosya bağımlılığı, %100 çevrimdışı ve kesintisiz ses sentezi
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
    if (!this.ctx) {
      this.initAudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Temel osilatör çalma
  playTone(freq, type = 'sine', duration = 0.2, startTime = 0, gainVal = 0.15) {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    try {
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
    } catch (e) {
      // sessizce geç
    }
  }

  // Buton Tıklama Sesi
  playClick() {
    this.playTone(850, 'triangle', 0.06, 0, 0.1);
  }

  // Yarışma Başlangıç Düdüğü / Fanfarı
  playStart() {
    if (this.muted) return;
    const tones = [
      { f: 440, d: 0.1, t: 0 },
      { f: 554.37, d: 0.1, t: 0.1 },
      { f: 659.25, d: 0.15, t: 0.2 },
      { f: 880, d: 0.4, t: 0.32 }
    ];
    tones.forEach(n => {
      this.playTone(n.f, 'triangle', n.d, n.t, 0.22);
    });
  }

  // Doğru Cevap (Melodik arpej: C5 -> E5 -> G5 -> C6)
  playCorrect() {
    if (this.muted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.3, idx * 0.07, 0.22);
    });
  }

  // Yanlış Cevap / Uyarı Sesi
  playWrong() {
    if (this.muted) return;
    this.playTone(280, 'sawtooth', 0.2, 0, 0.12);
    this.playTone(200, 'sawtooth', 0.3, 0.12, 0.14);
  }

  // Süre Sayacı Tık Sesi
  playTick() {
    this.playTone(950, 'sine', 0.04, 0, 0.08);
  }

  // Süre Bitiş Uyarısı
  playTimeUp() {
    if (this.muted) return;
    this.playTone(440, 'square', 0.25, 0, 0.15);
    this.playTone(330, 'square', 0.35, 0.2, 0.18);
  }

  // Seviye Atlama Fanfarı
  playLevelUp() {
    if (this.muted) return;
    const chords = [
      { f: 523.25, time: 0 },
      { f: 659.25, time: 0.09 },
      { f: 783.99, time: 0.18 },
      { f: 1046.50, time: 0.27 },
      { f: 1318.51, time: 0.45 }
    ];
    chords.forEach(c => {
      this.playTone(c.f, 'triangle', 0.4, c.time, 0.25);
    });
  }

  // Şampiyonluk Zafer Melodisi
  playVictory() {
    if (this.muted) return;
    const notes = [
      { f: 523.25, d: 0.18, t: 0 },
      { f: 523.25, d: 0.18, t: 0.16 },
      { f: 523.25, d: 0.18, t: 0.32 },
      { f: 659.25, d: 0.35, t: 0.48 },
      { f: 783.99, d: 0.28, t: 0.72 },
      { f: 1046.50, d: 0.65, t: 0.95 }
    ];
    notes.forEach(n => {
      this.playTone(n.f, 'triangle', n.d, n.t, 0.28);
    });
  }
}

// Global ses motoru
window.soundEngine = new SoundEngine();
