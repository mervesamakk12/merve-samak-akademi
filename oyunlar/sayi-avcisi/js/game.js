/**
 * Sayı Avcısı: Asal Kaçış - Main Game Engine
 */

class NumberHunterGame {
  constructor() {
    this.score = 0;
    this.streak = 0;
    this.currentLevel = 1;
    this.questionIndex = 0;
    this.levelScores = {
      1: { stars: 0, score: 0, completed: false },
      2: { stars: 0, score: 0, completed: false },
      3: { stars: 0, score: 0, completed: false }
    };
    this.errors = [];
    this.timerInterval = null;
    this.timerSeconds = 0;

    this.l1 = {
      currentNum: 72,
      targetNum: 72,
      steps: [],
      factorsCount: {},
      mistakes: 0
    };

    this.l2 = {
      stage: 'method',
      selectedMethod: null,
      mistakes: 0
    };

    this.l3 = {
      hintsRevealed: 0,
      mistakes: 0
    };

    this.initDOM();
    this.initBackgroundParticles();
  }

  initDOM() {
    this.screens = {
      menu: document.getElementById('screen-menu'),
      level1: document.getElementById('screen-level1'),
      level2: document.getElementById('screen-level2'),
      level3: document.getElementById('screen-level3'),
      summary: document.getElementById('screen-summary'),
      review: document.getElementById('screen-review')
    };

    this.hudScore = document.getElementById('hud-score');
    this.hudStreak = document.getElementById('hud-streak');
    this.hudTimer = document.getElementById('hud-timer');
    this.hudLevelBadge = document.getElementById('hud-level-badge');
    this.soundBtn = document.getElementById('sound-toggle-btn');
    this.soundIcon = document.getElementById('sound-icon');
    this.fullscreenBtn = document.getElementById('fullscreen-toggle-btn');

    this.updateSoundIcon();
    this.bindEvents();
  }

  bindEvents() {
    this.soundBtn?.addEventListener('click', () => {
      const isMuted = window.soundEngine.toggleMute();
      this.updateSoundIcon();
    });

    this.fullscreenBtn?.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }

  updateSoundIcon() {
    if (!this.soundIcon) return;
    const isMuted = window.soundEngine.isMuted;
    this.soundIcon.innerHTML = isMuted
      ? `<svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>`
      : `<svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>`;
  }

  showScreen(name) {
    Object.keys(this.screens).forEach(key => {
      if (this.screens[key]) {
        this.screens[key].classList.add('hidden');
      }
    });

    if (this.screens[name]) {
      this.screens[name].classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  startTimer() {
    this.stopTimer();
    this.timerSeconds = 0;
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      this.updateTimerDisplay();
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    if (!this.hudTimer) return;
    const mins = Math.floor(this.timerSeconds / 60).toString().padStart(2, '0');
    const secs = (this.timerSeconds % 60).toString().padStart(2, '0');
    this.hudTimer.textContent = `${mins}:${secs}`;
  }

  addScore(pts) {
    const multiplier = 1 + Math.min(this.streak, 5) * 0.2;
    const totalPts = Math.round(pts * multiplier);
    this.score += totalPts;
    if (this.hudScore) this.hudScore.textContent = this.score;
    this.showFloatingPoints(`+${totalPts}`);
  }

  showFloatingPoints(text) {
    const floatEl = document.createElement('div');
    floatEl.className = 'fixed top-20 right-10 text-emerald-400 font-orbitron font-extrabold text-xl animate-bounce pointer-events-none z-50';
    floatEl.textContent = text;
    document.body.appendChild(floatEl);
    setTimeout(() => floatEl.remove(), 1200);
  }

  incrementStreak() {
    this.streak++;
    if (this.hudStreak) {
      this.hudStreak.textContent = `x${this.streak}`;
      this.hudStreak.parentElement.classList.add('text-amber-400');
    }
  }

  resetStreak() {
    this.streak = 0;
    if (this.hudStreak) {
      this.hudStreak.textContent = `x0`;
      this.hudStreak.parentElement.classList.remove('text-amber-400');
    }
  }

  // ==========================================
  // LEVEL 1: ASAL ÇEKİRDEK
  // ==========================================
  startLevel1() {
    this.currentLevel = 1;
    this.questionIndex = 0;
    this.hudLevelBadge.textContent = 'SEVİYE 1: ASAL ÇEKİRDEK';
    this.showScreen('level1');
    this.startTimer();
    this.loadLevel1Question(this.questionIndex);
  }

  loadLevel1Question(index) {
    const q = GAME_DATA.level1[index];
    if (!q) {
      this.finishLevel(1);
      return;
    }

    this.l1.targetNum = q.target;
    this.l1.currentNum = q.target;
    this.l1.steps = [];
    this.l1.factorsCount = {};
    this.l1.mistakes = 0;

    const qCounter = document.getElementById('l1-q-counter');
    if (qCounter) qCounter.textContent = `Hedef ${index + 1} / ${GAME_DATA.level1.length}`;

    const coreDisplay = document.getElementById('l1-core-number');
    if (coreDisplay) {
      coreDisplay.textContent = q.target;
      coreDisplay.classList.remove('shake-error', 'text-emerald-400');
      coreDisplay.classList.add('text-cyan-400');
    }

    const progress = document.getElementById('l1-progress-bar');
    if (progress) {
      progress.style.width = `${((index) / GAME_DATA.level1.length) * 100}%`;
    }

    this.renderL1Ladder();
    this.renderL1ExponentForm();
    this.renderL1PrimeButtons();
  }

  renderL1PrimeButtons() {
    const container = document.getElementById('l1-prime-buttons');
    if (!container) return;

    container.innerHTML = '';
    GAME_DATA.primes.forEach(prime => {
      const btn = document.createElement('button');
      btn.className = 'smart-btn prime-reactor-btn flex flex-col items-center justify-center p-3 sm:p-4 bg-slate-800/90 border-2 border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white glow-cyan-sm text-xl sm:text-2xl font-orbitron transition-all';
      btn.innerHTML = `
        <span class="text-xs sm:text-sm text-slate-400 font-rajdhani font-semibold">ASAL</span>
        <span class="text-2xl sm:text-3xl font-extrabold text-cyan-300 drop-shadow">${prime}</span>
      `;
      btn.onclick = () => this.handleL1PrimeClick(prime, btn);
      container.appendChild(btn);
    });
  }

  handleL1PrimeClick(prime, btnElement) {
    if (this.l1.currentNum <= 1) return;

    if (this.l1.currentNum % prime === 0) {
      window.soundEngine.playPrimeHit(prime);
      const nextNum = this.l1.currentNum / prime;

      this.l1.steps.push({
        from: this.l1.currentNum,
        prime: prime,
        to: nextNum
      });

      this.l1.factorsCount[prime] = (this.l1.factorsCount[prime] || 0) + 1;
      this.l1.currentNum = nextNum;

      const coreDisplay = document.getElementById('l1-core-number');
      if (coreDisplay) {
        coreDisplay.textContent = nextNum;
        coreDisplay.classList.add('animate-divide-success');
        setTimeout(() => coreDisplay.classList.remove('animate-divide-success'), 400);
      }

      this.renderL1Ladder();
      this.renderL1ExponentForm();
      this.addScore(40);
      this.incrementStreak();

      if (nextNum === 1) {
        window.soundEngine.playSuccess();
        if (coreDisplay) {
          coreDisplay.classList.remove('text-cyan-400');
          coreDisplay.classList.add('text-emerald-400', 'text-glow-green');
        }

        setTimeout(() => {
          this.questionIndex++;
          this.loadLevel1Question(this.questionIndex);
        }, 1200);
      }
    } else {
      window.soundEngine.playError();
      this.l1.mistakes++;
      this.resetStreak();

      const coreContainer = document.getElementById('l1-core-container');
      if (coreContainer) {
        coreContainer.classList.add('shake-error');
        setTimeout(() => coreContainer.classList.remove('shake-error'), 450);
      }

      if (btnElement) {
        btnElement.classList.add('shake-error');
        setTimeout(() => btnElement.classList.remove('shake-error'), 450);
      }

      this.errors.push({
        level: 1,
        title: `Asal Çarpanlara Ayırma: ${this.l1.currentNum}`,
        questionText: `${this.l1.currentNum} sayısı ${prime} asal sayısına tam bölünür mü?`,
        userAnswer: `${prime} ile bölme denendi (Kalanlı: ${this.l1.currentNum % prime})`,
        correctAnswer: `${this.l1.currentNum} sayısı ${prime}'e tam bölünmez.`,
        concept: "Bir sayının asal çarpanı olabilmesi için o sayıya kalansız (tam) bölünmesi gerekir.",
        solutionSteps: [
          `${this.l1.currentNum} ÷ ${prime} = ${Math.floor(this.l1.currentNum / prime)} (Kalan: ${this.l1.currentNum % prime})`,
          `Bölünebilen asal çarpanları dene: ${GAME_DATA.primes.filter(p => this.l1.currentNum % p === 0).join(', ')}`
        ]
      });
    }
  }

  renderL1Ladder() {
    const container = document.getElementById('l1-ladder-list');
    if (!container) return;

    container.innerHTML = '';
    let current = this.l1.targetNum;

    const startRow = document.createElement('div');
    startRow.className = 'flex items-center justify-between py-1.5 px-3 border-b border-slate-700/50 font-mono-math text-base sm:text-lg';
    startRow.innerHTML = `
      <span class="text-cyan-300 font-bold">${current}</span>
      <span class="text-slate-500 font-bold">|</span>
      <span class="text-slate-500 italic text-xs">Başla</span>
    `;
    container.appendChild(startRow);

    this.l1.steps.forEach(step => {
      const row = document.createElement('div');
      row.className = 'ladder-step flex items-center justify-between py-1.5 px-3 border-b border-slate-700/50 font-mono-math text-base sm:text-lg bg-cyan-950/20';
      row.innerHTML = `
        <span class="text-cyan-300 font-bold">${step.to}</span>
        <span class="text-slate-500 font-bold">|</span>
        <span class="text-emerald-400 font-extrabold text-glow-green">${step.prime}</span>
      `;
      container.appendChild(row);
    });
  }

  renderL1ExponentForm() {
    const display = document.getElementById('l1-exponent-display');
    if (!display) return;

    const parts = [];
    Object.keys(this.l1.factorsCount)
      .sort((a, b) => Number(a) - Number(b))
      .forEach(prime => {
        const count = this.l1.factorsCount[prime];
        if (count === 1) {
          parts.push(`<span class="text-emerald-400 font-bold">${prime}</span>`);
        } else if (count > 1) {
          parts.push(`<span class="text-emerald-400 font-bold">${prime}<sup class="text-cyan-300 font-extrabold text-sm ml-0.5">${count}</sup></span>`);
        }
      });

    display.innerHTML = parts.length > 0
      ? `${this.l1.targetNum} = ` + parts.join(' &times; ')
      : `${this.l1.targetNum} = ...`;
  }

  // ==========================================
  // LEVEL 2: EBOB vs EKOK STRATEJİSİ
  // ==========================================
  startLevel2() {
    this.currentLevel = 2;
    this.questionIndex = 0;
    this.hudLevelBadge.textContent = 'SEVİYE 2: EBOB vs EKOK STRATEJİSİ';
    this.showScreen('level2');
    this.startTimer();
    this.loadLevel2Question(this.questionIndex);
  }

  loadLevel2Question(index) {
    const q = GAME_DATA.level2[index];
    if (!q) {
      this.finishLevel(2);
      return;
    }

    this.l2.stage = 'method';
    this.l2.selectedMethod = null;
    this.l2.mistakes = 0;

    const qCounter = document.getElementById('l2-q-counter');
    if (qCounter) qCounter.textContent = `Problem ${index + 1} / ${GAME_DATA.level2.length}`;

    const progress = document.getElementById('l2-progress-bar');
    if (progress) {
      progress.style.width = `${((index) / GAME_DATA.level2.length) * 100}%`;
    }

    const storyEl = document.getElementById('l2-story-text');
    if (storyEl) {
      let formatted = q.story.replace(/\*\*(.*?)\*\*/g, '<span class="text-cyan-300 font-bold">$1</span>');
      storyEl.innerHTML = formatted;
    }

    const stageMethod = document.getElementById('l2-stage-method');
    const stageSolve = document.getElementById('l2-stage-solve');
    const methodFeedback = document.getElementById('l2-method-feedback');

    if (stageMethod) stageMethod.classList.remove('hidden');
    if (stageSolve) stageSolve.classList.add('hidden');
    if (methodFeedback) methodFeedback.classList.add('hidden');

    const btnEbob = document.getElementById('l2-btn-ebob');
    const btnEkok = document.getElementById('l2-btn-ekok');

    if (btnEbob && btnEkok) {
      btnEbob.disabled = false;
      btnEkok.disabled = false;
      btnEbob.className = 'smart-btn flex-1 py-5 px-6 rounded-xl border-2 border-cyan-500/60 bg-slate-800/80 hover:bg-cyan-950/40 text-cyan-300 font-orbitron font-bold text-xl sm:text-2xl transition-all shadow-lg hover:border-cyan-400 glow-cyan-sm';
      btnEkok.className = 'smart-btn flex-1 py-5 px-6 rounded-xl border-2 border-purple-500/60 bg-slate-800/80 hover:bg-purple-950/40 text-purple-300 font-orbitron font-bold text-xl sm:text-2xl transition-all shadow-lg hover:border-purple-400 glow-purple';

      btnEbob.onclick = () => this.handleL2MethodChoice('EBOB', q);
      btnEkok.onclick = () => this.handleL2MethodChoice('EKOK', q);
    }
  }

  handleL2MethodChoice(chosenMethod, q) {
    const feedbackEl = document.getElementById('l2-method-feedback');
    const stageSolve = document.getElementById('l2-stage-solve');
    const btnEbob = document.getElementById('l2-btn-ebob');
    const btnEkok = document.getElementById('l2-btn-ekok');

    if (chosenMethod === q.correctMethod) {
      window.soundEngine.playSuccess();
      this.addScore(50);
      this.incrementStreak();

      if (feedbackEl) {
        feedbackEl.className = 'p-4 rounded-xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 text-sm sm:text-base mb-6 animate-divide-success';
        feedbackEl.innerHTML = `
          <div class="flex items-center gap-2 font-bold text-emerald-400 font-orbitron mb-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            HARİKA STRATEJİ! DOĞRU YÖNTEM: ${q.correctMethod}
          </div>
          <p class="text-slate-300 font-rajdhani text-base">${q.methodReason}</p>
        `;
        feedbackEl.classList.remove('hidden');
      }

      if (btnEbob && btnEkok) {
        btnEbob.disabled = true;
        btnEkok.disabled = true;
      }

      setTimeout(() => {
        if (stageSolve) {
          stageSolve.classList.remove('hidden');
          this.renderL2SolveOptions(q);
        }
      }, 700);
    } else {
      window.soundEngine.playError();
      this.l2.mistakes++;
      this.resetStreak();

      if (feedbackEl) {
        feedbackEl.className = 'p-4 rounded-xl border border-rose-500/50 bg-rose-950/40 text-rose-300 text-sm sm:text-base mb-6 shake-error';
        feedbackEl.innerHTML = `
          <div class="flex items-center gap-2 font-bold text-rose-400 font-orbitron mb-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            YENİDEN DÜŞÜN! ${chosenMethod} DEĞİL
          </div>
          <p class="text-slate-300 font-rajdhani text-base">
            ${chosenMethod === 'EBOB' 
              ? 'Burada parçalar bir araya gelerek ortak bir zamanda veya boyutta buluşuyor (Parçadan $\\rightarrow$ Bütüne). Bu yüzden EKOK olmalı!'
              : 'Burada büyük bir bütün, eşit büyüklükte küçük parçalara veya aralıklara bölünüyor (Bütünden $\\rightarrow$ Parçaya). Bu yüzden EBOB olmalı!'}
          </p>
        `;
        feedbackEl.classList.remove('hidden');
      }

      this.errors.push({
        level: 2,
        title: `EBOB-EKOK Karar Analizi (Problem ${this.questionIndex + 1})`,
        questionText: q.story,
        userAnswer: `Seçilen Yöntem: ${chosenMethod}`,
        correctAnswer: `Doğru Yöntem: ${q.correctMethod}`,
        concept: q.methodReason,
        solutionSteps: q.solutionSteps
      });
    }
  }

  renderL2SolveOptions(q) {
    const promptEl = document.getElementById('l2-solve-prompt');
    const optionsContainer = document.getElementById('l2-options-container');

    if (promptEl) promptEl.textContent = q.questionPrompt;
    if (!optionsContainer) return;

    optionsContainer.innerHTML = '';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'smart-btn p-4 bg-slate-800/90 border-2 border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white rounded-xl text-xl sm:text-2xl font-mono-math font-bold transition-all';
      btn.textContent = opt;
      btn.onclick = () => this.handleL2SolveChoice(opt, q, btn);
      optionsContainer.appendChild(btn);
    });
  }

  handleL2SolveChoice(selectedOption, q, btnElement) {
    if (selectedOption === q.correctAnswer) {
      window.soundEngine.playSuccess();
      this.addScore(60);
      this.incrementStreak();

      btnElement.className = 'smart-btn p-4 bg-emerald-900/60 border-2 border-emerald-400 text-white rounded-xl text-xl sm:text-2xl font-mono-math font-bold glow-green animate-divide-success';

      setTimeout(() => {
        this.questionIndex++;
        this.loadLevel2Question(this.questionIndex);
      }, 1100);
    } else {
      window.soundEngine.playError();
      this.l2.mistakes++;
      this.resetStreak();

      btnElement.classList.add('shake-error');
      setTimeout(() => btnElement.classList.remove('shake-error'), 450);

      this.errors.push({
        level: 2,
        title: `Sayısal Hesaplama Hatası (Problem ${this.questionIndex + 1})`,
        questionText: q.questionPrompt,
        userAnswer: `Cevabınız: ${selectedOption}`,
        correctAnswer: `Doğru Sonuç: ${q.correctAnswer}`,
        concept: `${q.correctMethod}(${q.numbers.join(', ')}) = ${q.correctAnswer}`,
        solutionSteps: q.solutionSteps
      });
    }
  }

  // ==========================================
  // LEVEL 3: LGS YENİ NESİL GÖREVLER
  // ==========================================
  startLevel3() {
    this.currentLevel = 3;
    this.questionIndex = 0;
    this.hudLevelBadge.textContent = 'SEVİYE 3: LGS YENİ NESİL GÖREVLER';
    this.showScreen('level3');
    this.startTimer();
    this.loadLevel3Question(this.questionIndex);
  }

  loadLevel3Question(index) {
    const q = GAME_DATA.level3[index];
    if (!q) {
      this.finishLevel(3);
      return;
    }

    this.l3.hintsRevealed = 0;
    this.l3.mistakes = 0;

    const qCounter = document.getElementById('l3-q-counter');
    if (qCounter) qCounter.textContent = `Yeni Nesil Görev ${index + 1} / ${GAME_DATA.level3.length}`;

    const progress = document.getElementById('l3-progress-bar');
    if (progress) {
      progress.style.width = `${((index) / GAME_DATA.level3.length) * 100}%`;
    }

    const titleEl = document.getElementById('l3-title');
    const storyEl = document.getElementById('l3-story-text');
    if (titleEl) titleEl.textContent = q.title;
    if (storyEl) {
      let formatted = q.story.replace(/\*\*(.*?)\*\*/g, '<span class="text-amber-400 font-bold">$1</span>');
      storyEl.innerHTML = formatted;
    }

    this.renderL3Diagram(q.diagramType);

    const hintsContainer = document.getElementById('l3-hints-container');
    const hintBtn = document.getElementById('l3-hint-btn');
    if (hintsContainer) {
      hintsContainer.innerHTML = '';
      hintsContainer.classList.add('hidden');
    }
    if (hintBtn) {
      hintBtn.disabled = false;
      hintBtn.innerHTML = `
        <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
        <span>İPUCU AL (${q.hints.length} Kaldı)</span>
      `;
      hintBtn.onclick = () => this.revealL3Hint(q);
    }

    this.renderL3Options(q);
  }

  renderL3Diagram(type) {
    const container = document.getElementById('l3-diagram-container');
    if (!container) return;

    if (type === 'solar_poles') {
      container.innerHTML = `
        <svg class="w-full h-48 sm:h-56 max-w-lg mx-auto" viewBox="0 0 450 180" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#0f172a"/>
              <stop offset="100%" stop-color="#1e293b"/>
            </linearGradient>
            <filter id="neonGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect x="20" y="20" width="220" height="50" rx="8" fill="url(#roadGrad)" stroke="#00f0ff" stroke-width="1.5"/>
          <line x1="20" y1="45" x2="240" y2="45" stroke="#00f0ff" stroke-dasharray="6,6" stroke-width="2" opacity="0.6"/>
          <text x="130" y="49" fill="#00f0ff" font-family="'Orbitron', sans-serif" font-size="12" font-weight="bold" text-anchor="middle">120 Metre Bulvar</text>
          <circle cx="20" cy="15" r="5" fill="#00ff88" filter="url(#neonGlow)"/>
          <circle cx="130" cy="15" r="5" fill="#00ff88" filter="url(#neonGlow)"/>
          <circle cx="240" cy="15" r="5" fill="#00ff88" filter="url(#neonGlow)"/>
          <circle cx="20" cy="75" r="5" fill="#00ff88" filter="url(#neonGlow)"/>
          <circle cx="130" cy="75" r="5" fill="#00ff88" filter="url(#neonGlow)"/>
          <circle cx="240" cy="75" r="5" fill="#00ff88" filter="url(#neonGlow)"/>
          <rect x="20" y="105" width="340" height="50" rx="8" fill="url(#roadGrad)" stroke="#b026ff" stroke-width="1.5"/>
          <line x1="20" y1="130" x2="360" y2="130" stroke="#b026ff" stroke-dasharray="6,6" stroke-width="2" opacity="0.6"/>
          <text x="180" y="134" fill="#b026ff" font-family="'Orbitron', sans-serif" font-size="12" font-weight="bold" text-anchor="middle">180 Metre Bulvar</text>
          <circle cx="20" cy="100" r="5" fill="#ffb700" filter="url(#neonGlow)"/>
          <circle cx="133" cy="100" r="5" fill="#ffb700" filter="url(#neonGlow)"/>
          <circle cx="246" cy="100" r="5" fill="#ffb700" filter="url(#neonGlow)"/>
          <circle cx="360" cy="100" r="5" fill="#ffb700" filter="url(#neonGlow)"/>
          <circle cx="20" cy="160" r="5" fill="#ffb700" filter="url(#neonGlow)"/>
          <circle cx="133" cy="160" r="5" fill="#ffb700" filter="url(#neonGlow)"/>
          <circle cx="246" cy="160" r="5" fill="#ffb700" filter="url(#neonGlow)"/>
          <circle cx="360" cy="160" r="5" fill="#ffb700" filter="url(#neonGlow)"/>
        </svg>
      `;
    } else if (type === 'gears') {
      container.innerHTML = `
        <svg class="w-full h-48 sm:h-56 max-w-lg mx-auto" viewBox="0 0 450 180" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(140, 90)">
            <circle r="60" fill="#0f172a" stroke="#00f0ff" stroke-width="3" stroke-dasharray="8 4"/>
            <circle r="40" fill="#1e293b" stroke="#00f0ff" stroke-width="1.5"/>
            <circle r="12" fill="#00f0ff"/>
            <line x1="0" y1="0" x2="60" y2="0" stroke="#ff2a5f" stroke-width="3" stroke-linecap="round"/>
            <polygon points="60,0 52,-5 52,5" fill="#ff2a5f"/>
            <text x="0" y="-18" fill="#00f0ff" font-family="'Orbitron', sans-serif" font-size="14" font-weight="bold" text-anchor="middle">A (18 Diş)</text>
          </g>
          <circle cx="200" cy="90" r="6" fill="#ff2a5f" opacity="0.8"/>
          <g transform="translate(280, 90)">
            <circle r="80" fill="#0f172a" stroke="#b026ff" stroke-width="3" stroke-dasharray="10 5"/>
            <circle r="55" fill="#1e293b" stroke="#b026ff" stroke-width="1.5"/>
            <circle r="15" fill="#b026ff"/>
            <line x1="0" y1="0" x2="-80" y2="0" stroke="#ff2a5f" stroke-width="3" stroke-linecap="round"/>
            <polygon points="-80,0 -72,-5 -72,5" fill="#ff2a5f"/>
            <text x="0" y="-20" fill="#b026ff" font-family="'Orbitron', sans-serif" font-size="14" font-weight="bold" text-anchor="middle">B (24 Diş)</text>
          </g>
        </svg>
      `;
    } else if (type === 'grid_tiling') {
      container.innerHTML = `
        <svg class="w-full h-48 sm:h-56 max-w-lg mx-auto" viewBox="0 0 450 180" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(20, 45)">
            <rect width="75" height="100" rx="4" fill="#0f172a" stroke="#ffb700" stroke-width="2"/>
            <text x="37" y="55" fill="#ffb700" font-family="'Orbitron', sans-serif" font-size="11" font-weight="bold" text-anchor="middle">45x60</text>
            <text x="37" y="-8" fill="#e2e8f0" font-family="'Rajdhani', sans-serif" font-size="12" text-anchor="middle">Batarya Modülü</text>
          </g>
          <path d="M 115 95 L 145 95" stroke="#00f0ff" stroke-width="3" marker-end="url(#arrow)"/>
          <g transform="translate(170, 15)">
            <rect width="200" height="150" fill="#0b1120" stroke="#00ff88" stroke-width="3" stroke-dasharray="4"/>
            <line x1="220" y1="15" x2="220" y2="165" stroke="#334155" stroke-width="1.5"/>
            <line x1="270" y1="15" x2="270" y2="165" stroke="#334155" stroke-width="1.5"/>
            <line x1="320" y1="15" x2="320" y2="165" stroke="#334155" stroke-width="1.5"/>
            <line x1="170" y1="65" x2="370" y2="65" stroke="#334155" stroke-width="1.5"/>
            <line x1="170" y1="115" x2="370" y2="115" stroke="#334155" stroke-width="1.5"/>
            <text x="270" y="95" fill="#00ff88" font-family="'Orbitron', sans-serif" font-size="14" font-weight="bold" text-anchor="middle">KARE PLATFORM</text>
          </g>
        </svg>
      `;
    }
  }

  revealL3Hint(q) {
    if (this.l3.hintsRevealed >= q.hints.length) return;

    window.soundEngine.playHint();
    const hintsContainer = document.getElementById('l3-hints-container');
    const hintBtn = document.getElementById('l3-hint-btn');

    if (hintsContainer) {
      hintsContainer.classList.remove('hidden');
      const hintText = q.hints[this.l3.hintsRevealed];
      const hintCard = document.createElement('div');
      hintCard.className = 'p-3 bg-amber-950/40 border border-amber-500/50 rounded-xl text-amber-200 text-sm font-rajdhani animate-divide-success mb-2';
      hintCard.textContent = hintText;
      hintsContainer.appendChild(hintCard);
    }

    this.l3.hintsRevealed++;
    const remaining = q.hints.length - this.l3.hintsRevealed;

    if (hintBtn) {
      if (remaining > 0) {
        hintBtn.innerHTML = `
          <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          <span>İPUCU AL (${remaining} Kaldı)</span>
        `;
      } else {
        hintBtn.disabled = true;
        hintBtn.innerHTML = `<span>TÜM İPUÇLARI AÇILDI</span>`;
      }
    }
  }

  renderL3Options(q) {
    const container = document.getElementById('l3-options-container');
    if (!container) return;

    container.innerHTML = '';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'smart-btn p-4 bg-slate-800/90 border-2 border-slate-700 hover:border-amber-400 text-slate-200 hover:text-white rounded-xl text-xl sm:text-2xl font-mono-math font-bold transition-all glow-amber-sm';
      btn.textContent = opt;
      btn.onclick = () => this.handleL3Choice(opt, q, btn);
      container.appendChild(btn);
    });
  }

  handleL3Choice(selectedOption, q, btnElement) {
    if (selectedOption === q.correctAnswer) {
      window.soundEngine.playSuccess();
      const hintPenalty = this.l3.hintsRevealed * 20;
      const points = Math.max(40, 100 - hintPenalty);
      this.addScore(points);
      this.incrementStreak();

      btnElement.className = 'smart-btn p-4 bg-emerald-900/60 border-2 border-emerald-400 text-white rounded-xl text-xl sm:text-2xl font-mono-math font-bold glow-green animate-divide-success';

      setTimeout(() => {
        this.questionIndex++;
        this.loadLevel3Question(this.questionIndex);
      }, 1200);
    } else {
      window.soundEngine.playError();
      this.l3.mistakes++;
      this.resetStreak();

      btnElement.classList.add('shake-error');
      setTimeout(() => btnElement.classList.remove('shake-error'), 450);

      this.errors.push({
        level: 3,
        title: q.title,
        questionText: q.story,
        userAnswer: `Cevabınız: ${selectedOption}`,
        correctAnswer: `Doğru Sonuç: ${q.correctAnswer}`,
        concept: `${q.solution.method} yöntemi kullanılarak çözülür.`,
        solutionSteps: q.solution.steps
      });
    }
  }

  // ==========================================
  // LEVEL FINISH & 3-STAR
  // ==========================================
  finishLevel(lvl) {
    this.stopTimer();
    window.soundEngine.playFanfare();
    this.triggerConfetti();

    let stars = 3;
    const levelMistakes = this.errors.filter(e => e.level === lvl).length;
    if (levelMistakes >= 3 || this.timerSeconds > 180) {
      stars = 1;
    } else if (levelMistakes >= 1 || this.timerSeconds > 90) {
      stars = 2;
    }

    this.levelScores[lvl] = {
      stars: stars,
      score: this.score,
      completed: true,
      time: this.timerSeconds
    };

    this.showLevelSummary(lvl, stars);
  }

  showLevelSummary(lvl, stars) {
    this.showScreen('summary');

    const titleEl = document.getElementById('summary-level-title');
    const scoreEl = document.getElementById('summary-score');
    const timeEl = document.getElementById('summary-time');
    const errorsCountEl = document.getElementById('summary-errors-count');
    const starsContainer = document.getElementById('summary-stars-container');

    if (titleEl) titleEl.textContent = `SEVİYE ${lvl} TAMAMLANDI!`;
    if (scoreEl) scoreEl.textContent = this.score;
    if (timeEl) {
      const m = Math.floor(this.timerSeconds / 60);
      const s = this.timerSeconds % 60;
      timeEl.textContent = `${m} dk ${s} sn`;
    }

    const levelMistakes = this.errors.filter(e => e.level === lvl).length;
    if (errorsCountEl) errorsCountEl.textContent = `${levelMistakes} Hata`;

    if (starsContainer) {
      starsContainer.innerHTML = '';
      for (let i = 1; i <= 3; i++) {
        const isEarned = i <= stars;
        const starEl = document.createElement('div');
        starEl.className = `text-5xl sm:text-6xl ${isEarned ? 'text-amber-400 text-glow-amber star-animate-' + i : 'text-slate-700'}`;
        starEl.innerHTML = isEarned ? '★' : '☆';
        starsContainer.appendChild(starEl);

        if (isEarned) {
          setTimeout(() => window.soundEngine.playStar(i), i * 300);
        }
      }
    }

    const nextBtn = document.getElementById('summary-next-btn');
    const reviewBtn = document.getElementById('summary-review-btn');

    if (nextBtn) {
      if (lvl === 1) {
        nextBtn.textContent = 'SEVİYE 2\'YE GEÇ (EBOB-EKOK)';
        nextBtn.onclick = () => this.startLevel2();
      } else if (lvl === 2) {
        nextBtn.textContent = 'SEVİYE 3\'E GEÇ (LGS YENİ NESİL)';
        nextBtn.onclick = () => this.startLevel3();
      } else {
        nextBtn.textContent = 'TÜM SEVİYELER TAMAMLANDI!';
        nextBtn.onclick = () => this.showScreen('menu');
      }
    }

    if (reviewBtn) {
      reviewBtn.onclick = () => this.showErrorReview();
    }
  }

  showErrorReview() {
    this.showScreen('review');
    const container = document.getElementById('review-cards-list');
    const emptyState = document.getElementById('review-empty-state');
    const summaryBadge = document.getElementById('review-summary-badge');

    if (summaryBadge) {
      summaryBadge.textContent = `${this.errors.length} Tespit Edilen Eksik Konu`;
    }

    if (!container) return;
    container.innerHTML = '';

    if (this.errors.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    this.errors.forEach((err, idx) => {
      const card = document.createElement('div');
      card.className = 'cyber-card p-5 sm:p-6 mb-4 border border-rose-500/30 bg-slate-900/90 rounded-2xl';

      let stepsHtml = '';
      if (err.solutionSteps && err.solutionSteps.length > 0) {
        stepsHtml = `
          <div class="mt-3 pt-3 border-t border-slate-700/60">
            <h5 class="text-xs font-bold text-cyan-400 font-orbitron mb-2">ÇÖZÜM ADIMLARI:</h5>
            <ul class="list-disc list-inside space-y-1 text-slate-300 font-rajdhani text-sm sm:text-base">
              ${err.solutionSteps.map(st => `<li>${st}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="flex items-center justify-between gap-3 mb-2 flex-wrap">
          <span class="px-3 py-1 bg-rose-950/60 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-orbitron font-bold">
            Hata #${idx + 1} - Seviye ${err.level}
          </span>
          <span class="text-sm font-semibold text-slate-300 font-orbitron">${err.title}</span>
        </div>
        <p class="text-slate-200 font-medium mb-3 text-sm sm:text-base">${err.questionText}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-sm">
          <div class="p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl">
            <span class="text-xs text-rose-400 font-bold block mb-1">SENİN CEVABIN:</span>
            <span class="text-rose-200 font-mono-math">${err.userAnswer}</span>
          </div>
          <div class="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
            <span class="text-xs text-emerald-400 font-bold block mb-1">DOĞRU CEVAP:</span>
            <span class="text-emerald-200 font-mono-math">${err.correctAnswer}</span>
          </div>
        </div>
        <div class="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl mb-3">
          <span class="text-xs text-cyan-400 font-bold block mb-1">💡 KURAL & STRATEJİ:</span>
          <p class="text-cyan-200 text-sm font-rajdhani font-medium">${err.concept}</p>
        </div>
        ${stepsHtml}
      `;

      container.appendChild(card);
    });
  }

  triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#00f0ff', '#00ff88', '#b026ff', '#ffb700', '#ff2a5f'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18 - 4,
        gravity: 0.35,
        alpha: 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    requestAnimationFrame(animate);
  }

  initBackgroundParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    this.bgCanvas = canvas;
    this.bgCtx = canvas.getContext('2d');
    this.resizeCanvas();

    this.bgStars = [];
    for (let i = 0; i < 60; i++) {
      this.bgStars.push({
        x: Math.random() * this.bgCanvas.width,
        y: Math.random() * this.bgCanvas.height,
        r: Math.random() * 1.8 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    this.renderBgStars();
  }

  resizeCanvas() {
    if (!this.bgCanvas) return;
    this.bgCanvas.width = window.innerWidth;
    this.bgCanvas.height = window.innerHeight;
  }

  renderBgStars() {
    if (!this.bgCtx || !this.bgCanvas) return;
    this.bgCtx.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);

    this.bgCtx.fillStyle = '#00f0ff';
    this.bgStars.forEach(star => {
      star.y += star.speed;
      if (star.y > this.bgCanvas.height) {
        star.y = 0;
        star.x = Math.random() * this.bgCanvas.width;
      }

      this.bgCtx.save();
      this.bgCtx.globalAlpha = star.alpha;
      this.bgCtx.beginPath();
      this.bgCtx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      this.bgCtx.fill();
      this.bgCtx.restore();
    });

    requestAnimationFrame(() => this.renderBgStars());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.game = new NumberHunterGame();
});
