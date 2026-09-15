/**
 * Asal Dedektif: Çarpanlar ve Katlar Macerası - Main Game Engine
 */

class DetectiveGame {
  constructor() {
    this.score = 0;
    this.streak = 0;
    this.currentLevel = 1;
    this.questionIndex = 0;
    this.levelScores = {
      1: { stars: 0, score: 0, completed: false },
      2: { stars: 0, score: 0, completed: false },
      3: { stars: 0, score: 0, completed: false },
      4: { stars: 0, score: 0, completed: false }
    };
    this.errors = [];
    this.timerInterval = null;
    this.timerSeconds = 0;

    // State containers for active levels
    this.l1 = {
      selectedFactors: [],
      neededFactors: [],
      mistakes: 0
    };

    this.l2 = {
      mistakes: 0
    };

    this.l3 = {
      mistakes: 0
    };

    this.l4 = {
      hintsUsed: 0,
      mistakes: 0
    };

    this.initDOM();
  }

  initDOM() {
    this.screens = {
      menu: document.getElementById('screen-menu'),
      level1: document.getElementById('screen-level1'),
      level2: document.getElementById('screen-level2'),
      level3: document.getElementById('screen-level3'),
      level4: document.getElementById('screen-level4'),
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
  }

  updateSoundIcon() {
    if (!this.soundIcon) return;
    const isMuted = window.soundEngine.isMuted;
    this.soundIcon.innerHTML = isMuted
      ? `<svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>`
      : `<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>`;
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
    const m = Math.floor(this.timerSeconds / 60).toString().padStart(2, '0');
    const s = (this.timerSeconds % 60).toString().padStart(2, '0');
    this.hudTimer.textContent = `${m}:${s}`;
  }

  addScore(pts) {
    const mult = 1 + Math.min(this.streak, 5) * 0.2;
    const total = Math.round(pts * mult);
    this.score += total;
    if (this.hudScore) this.hudScore.textContent = this.score;

    this.showFloatingBadge(`+${total} 🔍`);
  }

  showFloatingBadge(txt) {
    const el = document.createElement('div');
    el.className = 'fixed top-20 right-8 text-emerald-400 font-fredoka font-bold text-2xl animate-bounce pointer-events-none z-50 drop-shadow-lg';
    el.textContent = txt;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  incrementStreak() {
    this.streak++;
    if (this.hudStreak) {
      this.hudStreak.textContent = `x${this.streak}`;
      this.hudStreak.className = 'font-bold text-amber-400 text-base scale-110 transition-transform';
    }
  }

  resetStreak() {
    this.streak = 0;
    if (this.hudStreak) {
      this.hudStreak.textContent = `x0`;
      this.hudStreak.className = 'font-bold text-slate-400 text-sm';
    }
  }

  // =========================================================================
  // SEVİYE 1: ÇARPAN AVCISI (Gökkuşağı Modeli)
  // =========================================================================
  startLevel1() {
    this.currentLevel = 1;
    this.questionIndex = 0;
    this.hudLevelBadge.textContent = 'SEVİYE 1: ÇARPAN AVCISI (GÖKKUŞAĞI)';
    this.showScreen('level1');
    this.startTimer();
    this.loadLevel1Question(this.questionIndex);
  }

  loadLevel1Question(idx) {
    const q = GAME_DATA.level1[idx];
    if (!q) {
      this.finishLevel(1);
      return;
    }

    this.l1.selectedFactors = [];
    this.l1.neededFactors = [...q.missingFactors];
    this.l1.mistakes = 0;

    const counter = document.getElementById('l1-q-counter');
    const prog = document.getElementById('l1-progress-bar');
    if (counter) counter.textContent = `Soru ${idx + 1} / ${GAME_DATA.level1.length}: ${q.title}`;
    if (prog) prog.style.width = `${(idx / GAME_DATA.level1.length) * 100}%`;

    const targetEl = document.getElementById('l1-target-number');
    if (targetEl) targetEl.textContent = q.target;

    this.renderL1RainbowSlots(q);
    this.renderL1Options(q);
  }

  renderL1RainbowSlots(q) {
    const container = document.getElementById('l1-rainbow-slots');
    if (!container) return;

    container.innerHTML = '';
    q.allFactors.forEach((factor, idx) => {
      const isMissing = q.missingFactors.includes(factor) && !this.l1.selectedFactors.includes(factor);
      const slot = document.createElement('div');
      slot.className = `flex flex-col items-center justify-center w-12 h-14 sm:w-16 sm:h-18 rounded-2xl border-2 font-mono-math font-bold text-base sm:text-xl shadow-md transition-all ${
        isMissing
          ? 'bg-slate-800/80 border-dashed border-amber-400 text-amber-300'
          : 'bg-emerald-950/60 border-emerald-400 text-emerald-300 animate-success-pop'
      }`;
      slot.innerHTML = isMissing ? '?' : `<span>${factor}</span>`;
      container.appendChild(slot);
    });

    // Render Rainbow Pairs Explanation
    const pairsBox = document.getElementById('l1-pairs-box');
    if (pairsBox) {
      let pairsHtml = '';
      q.pairs.forEach(p => {
        pairsHtml += `
          <div class="px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono-math font-bold ${p.color}">
            ${p.a} &times; ${p.b} = ${q.target}
          </div>
        `;
      });
      pairsBox.innerHTML = pairsHtml;
    }
  }

  renderL1Options(q) {
    const container = document.getElementById('l1-options-container');
    if (!container) return;

    container.innerHTML = '';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      const isAlreadyPicked = this.l1.selectedFactors.includes(opt);
      btn.className = `smart-btn p-3.5 sm:p-4 rounded-2xl font-mono-math font-bold text-xl sm:text-2xl border-2 transition-all shadow-md ${
        isAlreadyPicked
          ? 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed opacity-50'
          : 'bg-slate-800/90 border-slate-700 hover:border-emerald-400 text-slate-200 hover:text-white'
      }`;
      btn.textContent = opt;
      btn.disabled = isAlreadyPicked;
      btn.onclick = () => this.handleL1Choice(opt, q, btn);
      container.appendChild(btn);
    });
  }

  handleL1Choice(opt, q, btnEl) {
    if (this.l1.neededFactors.includes(opt)) {
      // Correct missing factor!
      window.soundEngine.playUnlock();
      this.l1.selectedFactors.push(opt);
      this.l1.neededFactors = this.l1.neededFactors.filter(f => f !== opt);
      this.addScore(30);
      this.incrementStreak();

      btnEl.className = 'smart-btn p-3.5 sm:p-4 rounded-2xl font-mono-math font-bold text-xl sm:text-2xl bg-emerald-950/80 border-2 border-emerald-400 text-emerald-300';
      btnEl.disabled = true;

      this.renderL1RainbowSlots(q);

      // Check if all missing factors found
      if (this.l1.neededFactors.length === 0) {
        window.soundEngine.playSuccess();
        setTimeout(() => {
          this.questionIndex++;
          this.loadLevel1Question(this.questionIndex);
        }, 1100);
      }
    } else {
      // Wrong factor
      window.soundEngine.playError();
      this.l1.mistakes++;
      this.resetStreak();

      btnEl.classList.add('shake-error');
      setTimeout(() => btnEl.classList.remove('shake-error'), 450);

      this.errors.push({
        level: 1,
        title: `${q.target} Sayısının Çarpanları`,
        questionText: `${opt} sayısı ${q.target}'in bir tam sayı çarpanı mıdır?`,
        userAnswer: `${opt} seçildi (${q.target} ÷ ${opt} = ${(q.target/opt).toFixed(2)})`,
        correctAnswer: `${opt}, ${q.target}'i kalansız bölmez.`,
        concept: `${q.target}'in tüm çarpanları: ${q.allFactors.join(', ')}`,
        solutionSteps: [
          `${q.target} sayısı ${opt}'a tam bölünmez.`,
          `Gökkuşağı çarpan çiftleri: ${q.pairs.map(p => `${p.a}×${p.b}`).join(', ')}`
        ]
      });
    }
  }

  // =========================================================================
  // SEVİYE 2: ASAL KALKAN & TUZAK SAYILAR
  // =========================================================================
  startLevel2() {
    this.currentLevel = 2;
    this.questionIndex = 0;
    this.hudLevelBadge.textContent = 'SEVİYE 2: ASAL KALKAN & TUZAK SAYILAR';
    this.showScreen('level2');
    this.startTimer();
    this.loadLevel2Question(this.questionIndex);
  }

  loadLevel2Question(idx) {
    const q = GAME_DATA.level2[idx];
    if (!q) {
      this.finishLevel(2);
      return;
    }

    this.l2.mistakes = 0;

    const counter = document.getElementById('l2-q-counter');
    const prog = document.getElementById('l2-progress-bar');
    if (counter) counter.textContent = `Dedektif Soruşturması ${idx + 1} / ${GAME_DATA.level2.length}`;
    if (prog) prog.style.width = `${(idx / GAME_DATA.level2.length) * 100}%`;

    const numEl = document.getElementById('l2-mystery-number');
    if (numEl) numEl.textContent = q.number;

    const feedbackEl = document.getElementById('l2-feedback-box');
    if (feedbackEl) feedbackEl.classList.add('hidden');

    const btnPrime = document.getElementById('l2-btn-prime');
    const btnNotPrime = document.getElementById('l2-btn-not-prime');

    if (btnPrime && btnNotPrime) {
      btnPrime.disabled = false;
      btnNotPrime.disabled = false;
      btnPrime.onclick = () => this.handleL2Choice(true, q);
      btnNotPrime.onclick = () => this.handleL2Choice(false, q);
    }
  }

  handleL2Choice(userSaysPrime, q) {
    const feedbackEl = document.getElementById('l2-feedback-box');
    const btnPrime = document.getElementById('l2-btn-prime');
    const btnNotPrime = document.getElementById('l2-btn-not-prime');

    if (userSaysPrime === q.isPrime) {
      // Correct!
      window.soundEngine.playSuccess();
      this.addScore(45);
      this.incrementStreak();

      if (feedbackEl) {
        feedbackEl.className = 'p-4 rounded-2xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 text-sm sm:text-base mb-4 animate-success-pop';
        feedbackEl.innerHTML = `
          <div class="flex items-center gap-2 font-bold font-fredoka text-emerald-400 mb-1">
            <span>✅ TEBRİKLER! DOĞRU TESPİT</span>
          </div>
          <p class="font-medium text-slate-200">${q.trapReason}</p>
        `;
        feedbackEl.classList.remove('hidden');
      }

      if (btnPrime && btnNotPrime) {
        btnPrime.disabled = true;
        btnNotPrime.disabled = true;
      }

      setTimeout(() => {
        this.questionIndex++;
        this.loadLevel2Question(this.questionIndex);
      }, 1300);
    } else {
      // Wrong
      window.soundEngine.playError();
      this.l2.mistakes++;
      this.resetStreak();

      if (feedbackEl) {
        feedbackEl.className = 'p-4 rounded-2xl border border-rose-500/50 bg-rose-950/40 text-rose-300 text-sm sm:text-base mb-4 shake-error';
        feedbackEl.innerHTML = `
          <div class="flex items-center gap-2 font-bold font-fredoka text-rose-400 mb-1">
            <span>❌ TUZAĞA DÜŞTÜN!</span>
          </div>
          <p class="font-medium text-slate-200">${q.trapReason}</p>
        `;
        feedbackEl.classList.remove('hidden');
      }

      this.errors.push({
        level: 2,
        title: `Asal Sayı Teşhisi: ${q.number}`,
        questionText: `${q.number} sayısı asal mıdır?`,
        userAnswer: userSaysPrime ? "Asal dediniz" : "Asal Değil dediniz",
        correctAnswer: q.isPrime ? "ASALDIR" : "ASAL DEĞİLDİR",
        concept: q.trapReason,
        solutionSteps: [
          q.ruleTip,
          `Bölenleri: {${q.factors.join(', ')}}`
        ]
      });
    }
  }

  // =========================================================================
  // SEVİYE 3: ARALARINDA ASAL DEDEKTİFİ
  // =========================================================================
  startLevel3() {
    this.currentLevel = 3;
    this.questionIndex = 0;
    this.hudLevelBadge.textContent = 'SEVİYE 3: ARALARINDA ASAL DEDEKTİFİ';
    this.showScreen('level3');
    this.startTimer();
    this.loadLevel3Question(this.questionIndex);
  }

  loadLevel3Question(idx) {
    const q = GAME_DATA.level3[idx];
    if (!q) {
      this.finishLevel(3);
      return;
    }

    this.l3.mistakes = 0;

    const counter = document.getElementById('l3-q-counter');
    const prog = document.getElementById('l3-progress-bar');
    if (counter) counter.textContent = `İkili İnceleme ${idx + 1} / ${GAME_DATA.level3.length}`;
    if (prog) prog.style.width = `${(idx / GAME_DATA.level3.length) * 100}%`;

    const pairBadge = document.getElementById('l3-pair-badge');
    const num1 = document.getElementById('l3-num1');
    const num2 = document.getElementById('l3-num2');

    if (pairBadge) pairBadge.textContent = q.ruleBadge;
    if (num1) num1.textContent = q.pair[0];
    if (num2) num2.textContent = q.pair[1];

    const feedbackEl = document.getElementById('l3-feedback-box');
    if (feedbackEl) feedbackEl.classList.add('hidden');

    const btnYes = document.getElementById('l3-btn-yes');
    const btnNo = document.getElementById('l3-btn-no');

    if (btnYes && btnNo) {
      btnYes.disabled = false;
      btnNo.disabled = false;
      btnYes.onclick = () => this.handleL3Choice(true, q);
      btnNo.onclick = () => this.handleL3Choice(false, q);
    }
  }

  handleL3Choice(userSaysCoprime, q) {
    const feedbackEl = document.getElementById('l3-feedback-box');
    const btnYes = document.getElementById('l3-btn-yes');
    const btnNo = document.getElementById('l3-btn-no');

    if (userSaysCoprime === q.isCoprime) {
      window.soundEngine.playSuccess();
      this.addScore(55);
      this.incrementStreak();

      if (feedbackEl) {
        feedbackEl.className = 'p-4 rounded-2xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 text-sm sm:text-base mb-4 animate-success-pop';
        feedbackEl.innerHTML = `
          <div class="flex items-center gap-2 font-bold font-fredoka text-emerald-400 mb-1">
            <span>🎯 HARİKA ANALİZ!</span>
          </div>
          <p class="font-medium text-slate-200">${q.reason}</p>
        `;
        feedbackEl.classList.remove('hidden');
      }

      if (btnYes && btnNo) {
        btnYes.disabled = true;
        btnNo.disabled = true;
      }

      setTimeout(() => {
        this.questionIndex++;
        this.loadLevel3Question(this.questionIndex);
      }, 1400);
    } else {
      window.soundEngine.playError();
      this.l3.mistakes++;
      this.resetStreak();

      if (feedbackEl) {
        feedbackEl.className = 'p-4 rounded-2xl border border-rose-500/50 bg-rose-950/40 text-rose-300 text-sm sm:text-base mb-4 shake-error';
        feedbackEl.innerHTML = `
          <div class="flex items-center gap-2 font-bold font-fredoka text-rose-400 mb-1">
            <span>❌ YANILGI!</span>
          </div>
          <p class="font-medium text-slate-200">${q.reason}</p>
        `;
        feedbackEl.classList.remove('hidden');
      }

      this.errors.push({
        level: 3,
        title: `Aralarında Asallık: (${q.pair[0]} ve ${q.pair[1]})`,
        questionText: `${q.pair[0]} ve ${q.pair[1]} sayıları aralarında asal mıdır?`,
        userAnswer: userSaysCoprime ? "Aralarında Asal dediniz" : "Aralarında Asal Değil dediniz",
        correctAnswer: q.isCoprime ? "ARALARINDA ASALDIR" : "ARALARINDA ASAL DEĞİLDİR",
        concept: q.reason,
        solutionSteps: [
          `Ortak bölenleri: {${q.commonDivisors.join(', ')}}`,
          `1'den başka ortak bölen ${q.isCoprime ? 'yoktur (Aralarında Asal).' : 'vardır (Aralarında Asal Değil).'}`
        ]
      });
    }
  }

  // =========================================================================
  // SEVİYE 4: LGS ŞAMPİYONLUK MEYDAN OKUMASI
  // =========================================================================
  startLevel4() {
    this.currentLevel = 4;
    this.questionIndex = 0;
    this.hudLevelBadge.textContent = 'SEVİYE 4: LGS ŞAMPİYONLUK MEYDAN OKUMASI';
    this.showScreen('level4');
    this.startTimer();
    this.loadLevel4Question(this.questionIndex);
  }

  loadLevel4Question(idx) {
    const q = GAME_DATA.level4[idx];
    if (!q) {
      this.finishLevel(4);
      return;
    }

    this.l4.hintsUsed = 0;
    this.l4.mistakes = 0;

    const counter = document.getElementById('l4-q-counter');
    const prog = document.getElementById('l4-progress-bar');
    if (counter) counter.textContent = `LGS Görev ${idx + 1} / ${GAME_DATA.level4.length}: ${q.title}`;
    if (prog) prog.style.width = `${(idx / GAME_DATA.level4.length) * 100}%`;

    const storyEl = document.getElementById('l4-story-text');
    if (storyEl) {
      let formatted = q.story.replace(/\*\*(.*?)\*\*/g, '<span class="text-amber-400 font-bold">$1</span>');
      storyEl.innerHTML = formatted;
    }

    const hintsBox = document.getElementById('l4-hints-box');
    const hintBtn = document.getElementById('l4-hint-btn');
    if (hintsBox) {
      hintsBox.innerHTML = '';
      hintsBox.classList.add('hidden');
    }
    if (hintBtn) {
      hintBtn.disabled = false;
      hintBtn.innerHTML = `<span>💡 İPUCU AL (${q.hints.length} Kaldı)</span>`;
      hintBtn.onclick = () => this.revealL4Hint(q);
    }

    this.renderL4Options(q);
  }

  revealL4Hint(q) {
    if (this.l4.hintsUsed >= q.hints.length) return;

    window.soundEngine.playClue();
    const hintsBox = document.getElementById('l4-hints-box');
    const hintBtn = document.getElementById('l4-hint-btn');

    if (hintsBox) {
      hintsBox.classList.remove('hidden');
      const card = document.createElement('div');
      card.className = 'p-3 bg-amber-950/40 border border-amber-500/50 rounded-xl text-amber-200 text-sm font-medium mb-2 animate-success-pop';
      card.textContent = q.hints[this.l4.hintsUsed];
      hintsBox.appendChild(card);
    }

    this.l4.hintsUsed++;
    const remaining = q.hints.length - this.l4.hintsUsed;

    if (hintBtn) {
      if (remaining > 0) {
        hintBtn.innerHTML = `<span>💡 İPUCU AL (${remaining} Kaldı)</span>`;
      } else {
        hintBtn.disabled = true;
        hintBtn.innerHTML = `<span>TÜM İPUÇLARI AÇILDI</span>`;
      }
    }
  }

  renderL4Options(q) {
    const container = document.getElementById('l4-options-container');
    if (!container) return;

    container.innerHTML = '';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'smart-btn p-4 bg-slate-800/90 border-2 border-slate-700 hover:border-amber-400 text-slate-200 hover:text-white rounded-2xl text-xl sm:text-2xl font-mono-math font-bold transition-all';
      btn.textContent = opt;
      btn.onclick = () => this.handleL4Choice(opt, q, btn);
      container.appendChild(btn);
    });
  }

  handleL4Choice(opt, q, btnEl) {
    if (opt === q.correctAnswer) {
      window.soundEngine.playSuccess();
      const penalty = this.l4.hintsUsed * 15;
      const pts = Math.max(50, 100 - penalty);
      this.addScore(pts);
      this.incrementStreak();

      btnEl.className = 'smart-btn p-4 bg-emerald-950/90 border-2 border-emerald-400 text-white rounded-2xl text-xl sm:text-2xl font-mono-math font-bold animate-success-pop';

      setTimeout(() => {
        this.questionIndex++;
        this.loadLevel4Question(this.questionIndex);
      }, 1200);
    } else {
      window.soundEngine.playError();
      this.l4.mistakes++;
      this.resetStreak();

      btnEl.classList.add('shake-error');
      setTimeout(() => btnEl.classList.remove('shake-error'), 450);

      this.errors.push({
        level: 4,
        title: q.title,
        questionText: q.story,
        userAnswer: `Cevabınız: ${opt}`,
        correctAnswer: `Doğru Cevap: ${q.correctAnswer}`,
        concept: q.hints[0] || "LGS Stratejisi",
        solutionSteps: q.solution.steps
      });
    }
  }

  // =========================================================================
  // SEVİYE BİTİŞİ & 3 YILDIZ DEĞERLENDİRMESİ
  // =========================================================================
  finishLevel(lvl) {
    this.stopTimer();
    window.soundEngine.playVictory();
    this.triggerConfetti();

    let stars = 3;
    const lvlErrors = this.errors.filter(e => e.level === lvl).length;
    if (lvlErrors >= 3) stars = 1;
    else if (lvlErrors >= 1) stars = 2;

    this.levelScores[lvl] = {
      stars: stars,
      score: this.score,
      completed: true,
      time: this.timerSeconds
    };

    this.showSummaryModal(lvl, stars);
  }

  showSummaryModal(lvl, stars) {
    this.showScreen('summary');

    const title = document.getElementById('summary-level-title');
    const score = document.getElementById('summary-score');
    const time = document.getElementById('summary-time');
    const errorsEl = document.getElementById('summary-errors-count');
    const starsBox = document.getElementById('summary-stars-container');

    if (title) title.textContent = `SEVİYE ${lvl} TAMAMLANDI! 🏆`;
    if (score) score.textContent = this.score;
    if (time) {
      const m = Math.floor(this.timerSeconds / 60);
      const s = this.timerSeconds % 60;
      time.textContent = `${m} dk ${s} sn`;
    }

    const lvlErrors = this.errors.filter(e => e.level === lvl).length;
    if (errorsEl) errorsEl.textContent = `${lvlErrors} Hata`;

    if (starsBox) {
      starsBox.innerHTML = '';
      for (let i = 1; i <= 3; i++) {
        const isEarned = i <= stars;
        const star = document.createElement('div');
        star.className = `text-5xl sm:text-6xl transition-transform ${isEarned ? 'text-amber-400 star-pop-' + i : 'text-slate-700'}`;
        star.textContent = isEarned ? '★' : '☆';
        starsBox.appendChild(star);

        if (isEarned) {
          setTimeout(() => window.soundEngine.playStar(i), i * 300);
        }
      }
    }

    const nextBtn = document.getElementById('summary-next-btn');
    if (nextBtn) {
      if (lvl === 1) {
        nextBtn.textContent = 'SEVİYE 2: ASAL KALKAN & TUZAKLAR ➔';
        nextBtn.onclick = () => this.startLevel2();
      } else if (lvl === 2) {
        nextBtn.textContent = 'SEVİYE 3: ARALARINDA ASAL DEDEKTİFİ ➔';
        nextBtn.onclick = () => this.startLevel3();
      } else if (lvl === 3) {
        nextBtn.textContent = 'SEVİYE 4: LGS ŞAMPİYONLUK MEYDAN OKUMASI ➔';
        nextBtn.onclick = () => this.startLevel4();
      } else {
        nextBtn.textContent = 'TÜM SEVİYELER TAMAMLANDI! TEBRİKLER 🌟';
        nextBtn.onclick = () => this.showScreen('menu');
      }
    }
  }

  // =========================================================================
  // HATA ANALİZİ VE ÖĞRENME RAPORU
  // =========================================================================
  showErrorReview() {
    this.showScreen('review');
    const container = document.getElementById('review-cards-list');
    const emptyState = document.getElementById('review-empty-state');
    const badge = document.getElementById('review-summary-badge');

    if (badge) badge.textContent = `${this.errors.length} Tespit Edilen Konu`;
    if (!container) return;
    container.innerHTML = '';

    if (this.errors.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    this.errors.forEach((err, idx) => {
      const card = document.createElement('div');
      card.className = 'mystery-card p-5 mb-4 border border-rose-500/30 bg-slate-900/90 rounded-2xl';

      let stepsHtml = '';
      if (err.solutionSteps && err.solutionSteps.length > 0) {
        stepsHtml = `
          <div class="mt-3 pt-3 border-t border-slate-700/60">
            <h5 class="text-xs font-bold text-emerald-400 font-mono-math mb-1">DEDEKTİF ÇÖZÜM ADIMLARI:</h5>
            <ul class="list-disc list-inside space-y-1 text-slate-300 font-medium text-xs sm:text-sm">
              ${err.solutionSteps.map(st => `<li>${st}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="flex items-center justify-between mb-2 flex-wrap gap-2">
          <span class="px-3 py-1 bg-rose-950/60 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold">
            İpucu #${idx + 1} • Seviye ${err.level}
          </span>
          <span class="text-sm font-bold text-slate-300 font-fredoka">${err.title}</span>
        </div>

        <p class="text-slate-200 text-sm font-medium mb-3">${err.questionText}</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-xs sm:text-sm">
          <div class="p-2.5 bg-rose-950/30 border border-rose-500/30 rounded-xl">
            <span class="text-rose-400 font-bold block mb-0.5">Senin Tercihin:</span>
            <span class="text-rose-200 font-mono-math">${err.userAnswer}</span>
          </div>
          <div class="p-2.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
            <span class="text-emerald-400 font-bold block mb-0.5">Doğru Yol:</span>
            <span class="text-emerald-200 font-mono-math">${err.correctAnswer}</span>
          </div>
        </div>

        <div class="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl text-xs sm:text-sm text-cyan-200">
          💡 <b>Kural & Püf Noktası:</b> ${err.concept}
        </div>

        ${stepsHtml}
      `;

      container.appendChild(card);
    });
  }

  // =========================================================================
  // CONFETTI CANVAS EFFECT
  // =========================================================================
  triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#10b981', '#06b6d4', '#f59e0b', '#f43f5e', '#8b5cf6'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16 - 4,
        gravity: 0.3,
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
}

window.addEventListener('DOMContentLoaded', () => {
  window.game = new DetectiveGame();
});
