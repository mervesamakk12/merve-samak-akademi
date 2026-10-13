/**
 * DİJİTAL MATEMATİK YARIŞMASI: ÖĞRENCİ DOSTU TEMA MOTORU
 * Uzay (Space), Deniz Altı (Ocean) ve Büyülü Orman (Forest) Temaları
 */

class ThemeEngine {
  constructor() {
    this.currentTheme = localStorage.getItem('arena_theme') || 'space';
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrame = null;
    this.floatingCreatures = [];
    
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
    this.initParticlesForCurrentTheme();
  }

  bindEvents() {
    const toggleBtn = document.getElementById('btn-theme-toggle');
    const menu = document.getElementById('theme-menu');

    if (toggleBtn && menu) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundEngine.playClick();
        menu.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== toggleBtn) {
          menu.classList.remove('open');
        }
      });

      document.querySelectorAll('.theme-option').forEach(opt => {
        opt.addEventListener('click', () => {
          const themeKey = opt.dataset.theme;
          this.applyTheme(themeKey);
          menu.classList.remove('open');
          window.soundEngine.playTone(550, 'triangle', 0.15);
        });
      });
    }
  }

  applyTheme(themeKey) {
    this.currentTheme = themeKey;
    localStorage.setItem('arena_theme', themeKey);

    document.body.classList.remove('theme-space', 'theme-ocean', 'theme-forest');
    document.body.classList.add(`theme-${themeKey}`);

    // UI Rozetini Güncelle
    const iconEl = document.getElementById('current-theme-icon');
    const nameEl = document.getElementById('current-theme-name');
    const bannerLevel = document.getElementById('arena-level-indicator');

    if (themeKey === 'space') {
      if (iconEl) iconEl.innerText = '🌌';
      if (nameEl) nameEl.innerText = 'Uzay Teması';
      if (bannerLevel) bannerLevel.innerHTML = '🚀 KOZMİK ÜS ARENASI';
    } else if (themeKey === 'ocean') {
      if (iconEl) iconEl.innerText = '🌊';
      if (nameEl) nameEl.innerText = 'Deniz Altı';
      if (bannerLevel) bannerLevel.innerHTML = '🫧 DERİN OKYANUS ARENASI';
    } else if (themeKey === 'forest') {
      if (iconEl) iconEl.innerText = '🌲';
      if (nameEl) nameEl.innerText = 'Büyülü Orman';
      if (bannerLevel) bannerLevel.innerHTML = '🍃 BÜYÜLÜ DOĞA ARENASI';
    }

    // Parçacıkları ve yüzen dekoratif elemanları yeniden başlat
    this.initParticlesForCurrentTheme();
    this.updateAmbientFloatingElements(themeKey);

    if (!this.animationFrame) {
      this.animate();
    }
  }

  initParticlesForCurrentTheme() {
    if (!this.canvas) return;
    this.particles = [];
    const w = this.canvas.width;
    const h = this.canvas.height;

    if (this.currentTheme === 'space') {
      // 70 Twinkling Stars
      for (let i = 0; i < 70; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 2 + 0.6,
          alpha: Math.random(),
          speedAlpha: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          color: Math.random() > 0.3 ? '#ffffff' : (Math.random() > 0.5 ? '#93c5fd' : '#fbcfe8')
        });
      }
    } 
    else if (this.currentTheme === 'ocean') {
      // 45 Yükselen Su Kabarcığı (Rising Bubbles)
      for (let i = 0; i < 45; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 6 + 2,
          speedY: Math.random() * 1.5 + 0.8,
          wobbleAngle: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.04 + 0.02,
          alpha: Math.random() * 0.4 + 0.2
        });
      }
    } 
    else if (this.currentTheme === 'forest') {
      // 50 Yüzen Işıltılı Ateş Böceği (Fireflies)
      for (let i = 0; i < 50; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 3 + 1.2,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          alpha: Math.random() * 0.8 + 0.2,
          alphaSpeed: (Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
          glowColor: Math.random() > 0.3 ? '#fde047' : '#86efac'
        });
      }
    }
  }

  animate() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const w = this.canvas.width;
    const h = this.canvas.height;

    if (this.currentTheme === 'space') {
      // Çizim: Yıldızlar
      for (let p of this.particles) {
        p.alpha += p.speedAlpha;
        if (p.alpha <= 0.1 || p.alpha >= 1) p.speedAlpha *= -1;

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        this.ctx.shadowBlur = p.radius * 3;
        this.ctx.shadowColor = p.color;
        this.ctx.fill();
      }
    } 
    else if (this.currentTheme === 'ocean') {
      // Çizim: Yükselen Kabarcıklar
      for (let p of this.particles) {
        p.y -= p.speedY;
        p.wobbleAngle += p.wobbleSpeed;
        const currentX = p.x + Math.sin(p.wobbleAngle) * 3;

        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }

        this.ctx.beginPath();
        this.ctx.arc(currentX, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(147, 197, 253, ${p.alpha})`;
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();

        // Kabarcık ışıltısı
        this.ctx.beginPath();
        this.ctx.arc(currentX - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.25, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
        this.ctx.fill();
      }
    } 
    else if (this.currentTheme === 'forest') {
      // Çizim: Ateş Böcekleri
      for (let p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.15 || p.alpha >= 0.95) p.alphaSpeed *= -1;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.glowColor;
        this.ctx.globalAlpha = Math.max(0.15, Math.min(1, p.alpha));
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = p.glowColor;
        this.ctx.fill();
      }
    }

    this.ctx.globalAlpha = 1;
    this.ctx.shadowBlur = 0;
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  updateAmbientFloatingElements(themeKey) {
    const container = document.getElementById('theme-ambient-bg');
    if (!container) return;

    if (themeKey === 'space') {
      container.innerHTML = `
        <div class="floating-mascot space-planet-1" title="Satürn Gezegeni">🪐</div>
        <div class="floating-mascot space-rocket" title="Uzay Roketi">🚀</div>
        <div class="floating-mascot space-astro" title="Astronot Öğrenci">👨‍🚀</div>
        <div class="floating-mascot space-moon" title="Hilal Ay">🌙</div>
      `;
    } else if (themeKey === 'ocean') {
      container.innerHTML = `
        <div class="floating-mascot ocean-jellyfish" title="Işıldayan Denizanası">🪼</div>
        <div class="floating-mascot ocean-turtle" title="Bilge Deniz Kaplumbağası">🐢</div>
        <div class="floating-mascot ocean-fish" title="Küçük Palyaço Balığı">🐠</div>
        <div class="floating-mascot ocean-dolphin" title="Akıllı Yunus">🐬</div>
      `;
    } else if (themeKey === 'forest') {
      container.innerHTML = `
        <div class="floating-mascot forest-owl" title="Bilge Baykuş">🦉</div>
        <div class="floating-mascot forest-deer" title="Zarif Geyik">🦌</div>
        <div class="floating-mascot forest-mushroom" title="Işıltılı Mantar">🍄</div>
        <div class="floating-mascot forest-butterfly" title="Büyülü Kelebek">🦋</div>
      `;
    }
  }
}

// Global tema motoru örneği
window.addEventListener('DOMContentLoaded', () => {
  window.themeEngine = new ThemeEngine();
});
