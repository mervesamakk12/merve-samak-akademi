/**
 * MERVE SAMAK AKADEMİ — DİJİTAL MATEMATİK YARIŞMASI: TEMA MOTORU
 * Uzay (Space), Deniz Altı (Ocean) ve Büyülü Orman (Forest)
 */

class ThemeEngine {
  constructor() {
    this.currentTheme = localStorage.getItem('arena_theme') || 'space';
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrame = null;
    this.init();
  }

  init() {
    this.setupCanvas();
    this.bindEvents();
    this.applyTheme(this.currentTheme);
  }

  setupCanvas() {
    this.canvas = document.getElementById('theme-particles-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }

  bindEvents() {
    const toggleBtn = document.getElementById('btn-theme-toggle');
    const menu = document.getElementById('theme-menu');

    if (toggleBtn && menu) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.soundEngine) window.soundEngine.playClick();
        menu.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== toggleBtn) {
          menu.classList.add('hidden');
        }
      });

      document.querySelectorAll('.theme-option').forEach(opt => {
        opt.addEventListener('click', () => {
          const themeKey = opt.dataset.theme;
          this.applyTheme(themeKey);
          menu.classList.add('hidden');
          if (window.soundEngine) window.soundEngine.playTone(550, 'triangle', 0.15);
        });
      });
    }
  }

  applyTheme(themeKey) {
    this.currentTheme = themeKey;
    localStorage.setItem('arena_theme', themeKey);

    document.body.classList.remove('theme-space', 'theme-ocean', 'theme-forest');
    document.body.classList.add(`theme-${themeKey}`);

    const iconEl = document.getElementById('current-theme-icon');
    const nameEl = document.getElementById('current-theme-name');

    if (themeKey === 'space') {
      if (iconEl) iconEl.innerText = '🌌';
      if (nameEl) nameEl.innerText = 'Uzay Teması';
    } else if (themeKey === 'ocean') {
      if (iconEl) iconEl.innerText = '🌊';
      if (nameEl) nameEl.innerText = 'Deniz Altı';
    } else if (themeKey === 'forest') {
      if (iconEl) iconEl.innerText = '🌲';
      if (nameEl) nameEl.innerText = 'Büyülü Orman';
    }

    this.initParticles();
  }

  initParticles() {
    if (!this.canvas) return;
    this.particles = [];
    const count = Math.min(Math.floor(this.canvas.width / 24), 60);

    for (let i = 0; i < count; i++) {
      if (this.currentTheme === 'space') {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 1.8 + 0.5,
          color: Math.random() > 0.4 ? '#ffffff' : (Math.random() > 0.5 ? '#a78bfa' : '#38bdf8'),
          speedY: (Math.random() * 0.15) - 0.07,
          alpha: Math.random() * 0.8 + 0.2,
          pulse: Math.random() * 0.02 + 0.005
        });
      } else if (this.currentTheme === 'ocean') {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 3 + 1,
          color: 'rgba(56, 189, 248, 0.4)',
          speedY: -(Math.random() * 0.8 + 0.3),
          speedX: Math.sin(Math.random() * 10) * 0.3,
          alpha: Math.random() * 0.6 + 0.2
        });
      } else { // forest
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.4 ? '#facc15' : '#4ade80',
          speedY: (Math.random() * 0.4) - 0.2,
          speedX: (Math.random() * 0.4) - 0.2,
          alpha: Math.random() * 0.7 + 0.3,
          pulse: Math.random() * 0.03 + 0.01
        });
      }
    }

    if (!this.animationFrame) {
      this.animate();
    }
  }

  animate() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      if (this.currentTheme === 'space') {
        p.alpha += Math.sin(Date.now() * p.pulse * 0.05) * 0.01;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        this.ctx.fill();
      } else if (this.currentTheme === 'ocean') {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.02) * 0.3;
        if (p.y < -10) p.y = this.canvas.height + 10;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = p.color;
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = p.alpha;
        this.ctx.stroke();
      } else { // forest
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = this.canvas.width;
        if (p.x > this.canvas.width) p.x = 0;
        if (p.y < 0) p.y = this.canvas.height;
        if (p.y > this.canvas.height) p.y = 0;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.abs(Math.sin(Date.now() * 0.002 + i)) * 0.8 + 0.2;
        this.ctx.fill();
      }
    }

    this.ctx.globalAlpha = 1.0;
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}

// Global tema motoru örneği
window.themeEngine = new ThemeEngine();
