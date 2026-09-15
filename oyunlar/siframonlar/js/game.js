/**
 * Renkli Sıframonlar - EBOB & EKOK Dünyası
 * Main Game Engine & Interactive Visual Mechanics
 */

class SiframonGame {
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

    // Active state containers
    this.l1 = {
      currentNum: 36,
      targetNum: 36,
      steps: [],
      factorsCount: {},
      mistakes: 0
    };

    this.l2 = {
      stage: 'ebob', // 'ebob' -> 'boxes'
      selectedEbob: null,
      mistakes: 0
    };

    this.l3 = {
      hopped: false,
      mistakes: 0
    };

    this.initDOM();
    this.createAmbientBubbles();
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
  }

  updateSoundIcon() {
    if (!this.soundIcon) return;
    const isMuted = window.soundEngine.isMuted;
    this.soundIcon.innerHTML = isMuted
      ? `<svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>`
      : `<svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>`;
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
    const mult = 1 + Math.min(this.streak, 5) * 0.25;
    const total = Math.round(pts * mult);
    this.score += total;
    if (this.hudScore) this.hudScore.textContent = this.score;

    this.showFloatingBadge(`+${total} ⭐`);
  }

  showFloatingBadge(txt) {
    const badge = document.createElement('div');
    badge.className = 'fixed top-20 right-8 text-pink-600 font-fredoka font-bold text-2xl animate-bounce pointer-events-none z-50 drop-shadow-md';
    badge.textContent = txt;
    document.body.appendChild(badge);
    setTimeout(() => badge.remove(), 1200);
  }

  incrementStreak() {
    this.streak++;
    if (this.hudStreak) {
      this.hudStreak.textContent = `x${this.streak}`;
      this.hudStreak.className = 'font-bold text-pink-500 text-base scale-110 transition-transform';
    }
  }

  resetStreak() {
    this.streak = 0;
    if (this.hudStreak) {
      this.hudStreak.textContent = `x0`;
      this.hudStreak.className = 'font-bold text-slate-400 text-sm';
    }
  }

  // ==========================================
  // MONSTER SVG GENERATOR
  // ==========================================
  getMonsterSVG(color = 'pink', num = 36) {
    const colors = {
      pink: { body: '#f472b6', dark: '#db2777', belly: '#fdf2f8', cheek: '#f43f5e' },
      blue: { body: '#38bdf8', dark: '#0284c7', belly: '#f0f9ff', cheek: '#0ea5e9' },
      yellow: { body: '#fde047', dark: '#ca8a04', belly: '#fefce8', cheek: '#f59e0b' },
      green: { body: '#4ade80', dark: '#16a34a', belly: '#f0fdf4', cheek: '#22c55e' }
    };

    const c = colors[color] || colors.pink;

    return `
      <svg class="w-48 h-48 sm:w-56 sm:h-56 mx-auto drop-shadow-xl" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Cute Little Monster Horns / Ears -->
        <path d="M 45 60 C 30 25, 60 15, 70 45 Z" fill="${c.dark}" />
        <path d="M 155 60 C 170 25, 140 15, 130 45 Z" fill="${c.dark}" />
        
        <!-- Monster Main Body -->
        <ellipse cx="100" cy="115" rx="75" ry="70" fill="${c.body}" />
        
        <!-- Monster Feet -->
        <ellipse cx="65" cy="180" rx="20" ry="12" fill="${c.dark}" />
        <ellipse cx="135" cy="180" rx="20" ry="12" fill="${c.dark}" />

        <!-- White Belly Area -->
        <ellipse cx="100" cy="125" rx="52" ry="46" fill="${c.belly}" stroke="${c.dark}" stroke-width="3" />

        <!-- Sparkly Big Eyes -->
        <circle cx="70" cy="85" r="14" fill="#1e293b" />
        <circle cx="66" cy="80" r="5" fill="#ffffff" />
        <circle cx="74" cy="88" r="2.5" fill="#ffffff" />

        <circle cx="130" cy="85" r="14" fill="#1e293b" />
        <circle cx="126" cy="80" r="5" fill="#ffffff" />
        <circle cx="134" cy="88" r="2.5" fill="#ffffff" />

        <!-- Rosy Cheeks -->
        <ellipse cx="50" cy="100" rx="8" ry="5" fill="${c.cheek}" opacity="0.6" />
        <ellipse cx="150" cy="100" rx="8" ry="5" fill="${c.cheek}" opacity="0.6" />

        <!-- Cute Smile -->
        <path d="M 90 98 Q 100 108 110 98" stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round" />

        <!-- Belly Target Number Display -->
        <text id="l1-monster-number" x="100" y="137" fill="${c.dark}" font-family="'Fredoka', 'Nunito', sans-serif" font-size="34" font-weight="bold" text-anchor="middle">
          ${num}
        </text>
      </svg>
    `;
  }

  // ==========================================
  // LEVEL 1: PRIME FACTOR CANDY
  // ==========================================
  startLevel1() {
    this.currentLevel = 1;
    this.questionIndex = 0;
    this.hudLevelBadge.textContent = 'SEVİYE 1: ASAL ŞEKER CANAVARI';
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

    this.l1.targetNum = q.target;
    this.l1.currentNum = q.target;
    this.l1.steps = [];
    this.l1.factorsCount = {};
    this.l1.mistakes = 0;

    // Counter & Progress
    const counterEl = document.getElementById('l1-q-counter');
    const progEl = document.getElementById('l1-progress-bar');
    if (counterEl) counterEl.textContent = `Canavar ${idx + 1} / ${GAME_DATA.level1.length}: ${q.monsterName}`;
    if (progEl) progEl.style.width = `${(idx / GAME_DATA.level1.length) * 100}%`;

    // Render Monster SVG
    const monsterWrap = document.getElementById('l1-monster-container');
    if (monsterWrap) {
      monsterWrap.innerHTML = this.getMonsterSVG(q.monsterColor, q.target);
      monsterWrap.className = 'text-center animate-monster-idle cursor-pointer';
    }

    this.renderL1Ladder();
    this.renderL1ExponentForm();
    this.renderL1PrimeCandies();
  }

  renderL1PrimeCandies() {
    const container = document.getElementById('l1-prime-candies');
    if (!container) return;

    const candyClasses = {
      2: 'candy-bubble',
      3: 'candy-bubble-blue',
      5: 'candy-bubble-yellow',
      7: 'candy-bubble-green',
      11: 'candy-bubble-purple'
    };

    container.innerHTML = '';
    GAME_DATA.primes.forEach(prime => {
      const btn = document.createElement('button');
      const candyStyle = candyClasses[prime] || 'candy-bubble';
      btn.className = `smart-btn ${candyStyle} w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center text-white font-fredoka font-extrabold text-2xl sm:text-3xl shadow-lg`;
      btn.innerHTML = `
        <span class="text-[10px] text-white/90 uppercase tracking-widest font-comfortaa -mb-1">Asal</span>
        <span>${prime}</span>
      `;
      btn.onclick = () => this.handleL1CandyFeed(prime, btn);
      container.appendChild(btn);
    });
  }

  handleL1CandyFeed(prime, btnEl) {
    if (this.l1.currentNum <= 1) return;

    const monsterWrap = document.getElementById('l1-monster-container');

    if (this.l1.currentNum % prime === 0) {
      // Nom nom! Correct prime candy!
      window.soundEngine.playBubblePop(prime);
      window.soundEngine.playMunch();

      const next = this.l1.currentNum / prime;
      this.l1.steps.push({ from: this.l1.currentNum, prime: prime, to: next });
      this.l1.factorsCount[prime] = (this.l1.factorsCount[prime] || 0) + 1;
      this.l1.currentNum = next;

      // Animate monster eating
      if (monsterWrap) {
        monsterWrap.classList.remove('animate-monster-idle');
        monsterWrap.classList.add('animate-monster-munch');
        setTimeout(() => {
          monsterWrap.classList.remove('animate-monster-munch');
          monsterWrap.classList.add('animate-monster-idle');
        }, 450);
      }

      // Update belly text
      const bellyText = document.getElementById('l1-monster-number');
      if (bellyText) {
        bellyText.textContent = next;
      }

      this.renderL1Ladder();
      this.renderL1ExponentForm();
      this.addScore(45);
      this.incrementStreak();

      // Check if 1 reached
      if (next === 1) {
        window.soundEngine.playSuccessChime();
        setTimeout(() => {
          this.questionIndex++;
          this.loadLevel1Question(this.questionIndex);
        }, 1100);
      }
    } else {
      // Wrong Prime
      window.soundEngine.playWrongBoop();
      this.l1.mistakes++;
      this.resetStreak();

      if (monsterWrap) {
        monsterWrap.classList.add('shake-cute');
        setTimeout(() => monsterWrap.classList.remove('shake-cute'), 400);
      }

      if (btnEl) {
        btnEl.classList.add('shake-cute');
        setTimeout(() => btnEl.classList.remove('shake-cute'), 400);
      }

      this.errors.push({
        level: 1,
        title: `Asal Şeker Bölme: ${this.l1.currentNum}`,
        questionText: `${this.l1.currentNum} sayısı ${prime} asal şekerine tam bölünür mü?`,
        userAnswer: `${prime} ile bölündü (Kalan: ${this.l1.currentNum % prime})`,
        correctAnswer: `${this.l1.currentNum} sayısı ${prime}'e kalansız bölünmez.`,
        concept: "Bir sayıyı sadece kalansız bölen asal sayılarla bölebiliriz!",
        solutionSteps: [
          `${this.l1.currentNum} sayısı ${prime}'e bölünemez.`,
          `Bölünebilen asalları dene: ${GAME_DATA.primes.filter(p => this.l1.currentNum % p === 0).join(', ')}`
        ]
      });
    }
  }

  renderL1Ladder() {
    const ladder = document.getElementById('l1-ladder-list');
    if (!ladder) return;

    ladder.innerHTML = '';
    const initialRow = document.createElement('div');
    initialRow.className = 'flex items-center justify-between p-2 rounded-xl bg-pink-50 text-pink-700 font-comfortaa font-bold text-sm sm:text-base border border-pink-200';
    initialRow.innerHTML = `
      <span>${this.l1.targetNum}</span>
      <span class="text-pink-300 font-bold">|</span>
      <span class="text-xs text-pink-400 font-fredoka">Başla</span>
    `;
    ladder.appendChild(initialRow);

    this.l1.steps.forEach(st => {
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between p-2 rounded-xl bg-sky-50 text-sky-800 font-comfortaa font-bold text-sm sm:text-base border border-sky-200 animate-divide-success';
      row.innerHTML = `
        <span>${st.to}</span>
        <span class="text-sky-300 font-bold">|</span>
        <span class="text-pink-600 font-extrabold text-base bg-pink-100 px-2 py-0.5 rounded-lg">${st.prime}</span>
      `;
      ladder.appendChild(row);
    });
  }

  renderL1ExponentForm() {
    const disp = document.getElementById('l1-exponent-display');
    if (!disp) return;

    const parts = [];
    Object.keys(this.l1.factorsCount)
      .sort((a, b) => Number(a) - Number(b))
      .forEach(p => {
        const c = this.l1.factorsCount[p];
        if (c === 1) parts.push(`<span class="text-pink-600">${p}</span>`);
        else parts.push(`<span class="text-pink-600">${p}<sup class="text-sky-500 font-bold text-base ml-0.5">${c}</sup></span>`);
      });

    disp.innerHTML = parts.length > 0
      ? `${this.l1.targetNum} = ` + parts.join(' &times; ')
      : `${this.l1.targetNum} = ...`;
  }

  // ==========================================
  // LEVEL 2: COOKIE BOXES (EBOB)
  // ==========================================
  startLevel2() {
    this.currentLevel = 2;
    this.questionIndex = 0;
    this.hudLevelBadge.textContent = 'SEVİYE 2: KURABİYE KUTULAMA (EBOB)';
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

    this.l2.stage = 'ebob';
    this.l2.selectedEbob = null;
    this.l2.mistakes = 0;

    const counter = document.getElementById('l2-q-counter');
    const prog = document.getElementById('l2-progress-bar');
    if (counter) counter.textContent = `Görev ${idx + 1} / ${GAME_DATA.level2.length}: ${q.title}`;
    if (prog) prog.style.width = `${(idx / GAME_DATA.level2.length) * 100}%`;

    const storyEl = document.getElementById('l2-story-text');
    if (storyEl) {
      let formatted = q.story.replace(/\*\*(.*?)\*\*/g, '<span class="text-pink-600 font-bold">$1</span>');
      storyEl.innerHTML = formatted;
    }

    // Render Cookie Trays Visuals
    this.renderL2CookiesTray(q);

    // Reset stages
    const stageEbob = document.getElementById('l2-stage-ebob');
    const stageBoxes = document.getElementById('l2-stage-boxes');
    const feedback = document.getElementById('l2-feedback');

    if (stageEbob) stageEbob.classList.remove('hidden');
    if (stageBoxes) stageBoxes.classList.add('hidden');
    if (feedback) feedback.classList.add('hidden');

    // Render Stage 1 (EBOB) Options
    this.renderL2EbobOptions(q);
  }

  renderL2CookiesTray(q) {
    const trayContainer = document.getElementById('l2-cookies-display');
    if (!trayContainer) return;

    let pinkIcons = '';
    for (let i = 0; i < q.item1.count; i++) {
      pinkIcons += `<span class="inline-block transform hover:scale-125 transition-transform text-xl sm:text-2xl">${q.item1.emoji}</span>`;
    }

    let blueIcons = '';
    for (let i = 0; i < q.item2.count; i++) {
      blueIcons += `<span class="inline-block transform hover:scale-125 transition-transform text-xl sm:text-2xl">${q.item2.emoji}</span>`;
    }

    trayContainer.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <!-- Pink Tray -->
        <div class="p-4 bg-pink-50 border-2 border-pink-200 rounded-2xl flex flex-col items-center">
          <div class="flex items-center justify-between w-full mb-2">
            <span class="font-fredoka font-bold text-pink-600 text-sm sm:text-base">${q.item1.name}</span>
            <span class="px-2 py-0.5 bg-pink-200 text-pink-800 rounded-full font-bold text-xs">${q.item1.count} Adet</span>
          </div>
          <div class="flex flex-wrap gap-1.5 justify-center p-2 bg-white/80 rounded-xl w-full min-h-[60px]">
            ${pinkIcons}
          </div>
        </div>

        <!-- Blue Tray -->
        <div class="p-4 bg-sky-50 border-2 border-sky-200 rounded-2xl flex flex-col items-center">
          <div class="flex items-center justify-between w-full mb-2">
            <span class="font-fredoka font-bold text-sky-600 text-sm sm:text-base">${q.item2.name}</span>
            <span class="px-2 py-0.5 bg-sky-200 text-sky-800 rounded-full font-bold text-xs">${q.item2.count} Adet</span>
          </div>
          <div class="flex flex-wrap gap-1.5 justify-center p-2 bg-white/80 rounded-xl w-full min-h-[60px]">
            ${blueIcons}
          </div>
        </div>
      </div>
    `;
  }

  renderL2EbobOptions(q) {
    const container = document.getElementById('l2-ebob-options');
    const promptEl = document.getElementById('l2-ebob-prompt');
    if (promptEl) promptEl.textContent = q.questionPrompt;
    if (!container) return;

    container.innerHTML = '';
    q.optionsEbob.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'smart-btn p-4 bg-white border-3 border-pink-300 hover:border-pink-500 text-pink-600 rounded-2xl font-fredoka font-bold text-2xl shadow-md hover:bg-pink-50';
      btn.textContent = opt;
      btn.onclick = () => this.handleL2EbobChoice(opt, q, btn);
      container.appendChild(btn);
    });
  }

  handleL2EbobChoice(selected, q, btnEl) {
    const feedback = document.getElementById('l2-feedback');
    const stageBoxes = document.getElementById('l2-stage-boxes');

    if (selected === q.ebobAnswer) {
      window.soundEngine.playSuccessChime();
      this.addScore(55);
      this.incrementStreak();
      this.l2.selectedEbob = selected;

      btnEl.className = 'smart-btn p-4 bg-pink-500 text-white border-3 border-pink-600 rounded-2xl font-fredoka font-bold text-2xl shadow-lg scale-105';

      if (feedback) {
        feedback.className = 'p-3 bg-pink-100 border border-pink-300 text-pink-800 rounded-2xl text-sm font-fredoka mb-4 text-center';
        feedback.innerHTML = `🌟 Harika! En büyük eşit kutu boyutu <b>EBOB(${q.item1.count}, ${q.item2.count}) = ${q.ebobAnswer}</b> adettir!`;
        feedback.classList.remove('hidden');
      }

      // Show Stage 2: Boxes calculation
      setTimeout(() => {
        if (stageBoxes) {
          stageBoxes.classList.remove('hidden');
          this.renderL2BoxesOptions(q);
        }
      }, 700);
    } else {
      window.soundEngine.playWrongBoop();
      this.l2.mistakes++;
      this.resetStreak();

      btnEl.classList.add('shake-cute');
      setTimeout(() => btnEl.classList.remove('shake-cute'), 400);

      this.errors.push({
        level: 2,
        title: `Kurabiye EBOB Kutulama (${q.title})`,
        questionText: q.story,
        userAnswer: `Seçilen Kutu Boyutu: ${selected}`,
        correctAnswer: `Doğru EBOB: ${q.ebobAnswer}`,
        concept: q.concept,
        solutionSteps: [
          `${q.item1.count} ve ${q.item2.count} sayılarının en büyük ortak böleni EBOB = ${q.ebobAnswer} olur.`,
          `Her kutuya ${q.ebobAnswer} kurabiye konulmalıdır.`
        ]
      });
    }
  }

  renderL2BoxesOptions(q) {
    const container = document.getElementById('l2-boxes-options');
    const promptEl = document.getElementById('l2-boxes-prompt');
    if (promptEl) promptEl.textContent = q.questionBoxes;
    if (!container) return;

    container.innerHTML = '';
    q.optionsBoxes.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'smart-btn p-4 bg-white border-3 border-sky-300 hover:border-sky-500 text-sky-600 rounded-2xl font-fredoka font-bold text-2xl shadow-md hover:bg-sky-50';
      btn.textContent = opt;
      btn.onclick = () => this.handleL2BoxesChoice(opt, q, btn);
      container.appendChild(btn);
    });
  }

  handleL2BoxesChoice(selected, q, btnEl) {
    if (selected === q.totalBoxesAnswer) {
      window.soundEngine.playSuccessChime();
      this.addScore(60);
      this.incrementStreak();

      btnEl.className = 'smart-btn p-4 bg-sky-500 text-white border-3 border-sky-600 rounded-2xl font-fredoka font-bold text-2xl shadow-lg scale-105';

      setTimeout(() => {
        this.questionIndex++;
        this.loadLevel2Question(this.questionIndex);
      }, 1100);
    } else {
      window.soundEngine.playWrongBoop();
      this.l2.mistakes++;
      this.resetStreak();

      btnEl.classList.add('shake-cute');
      setTimeout(() => btnEl.classList.remove('shake-cute'), 400);

      this.errors.push({
        level: 2,
        title: `Toplam Kutu Sayısı (${q.title})`,
        questionText: `Toplam kutu sayısı hesabı:`,
        userAnswer: `Cevabınız: ${selected} kutu`,
        correctAnswer: `Doğru Kutu: ${q.totalBoxesAnswer} kutu`,
        concept: `Pembe için ${q.item1.count} ÷ ${q.ebobAnswer} = ${q.item1.count/q.ebobAnswer} kutu, Mavi için ${q.item2.count} ÷ ${q.ebobAnswer} = ${q.item2.count/q.ebobAnswer} kutu. Toplam = ${q.totalBoxesAnswer} kutu.`,
        solutionSteps: [
          `1. Kutu Başına Düşen = EBOB = ${q.ebobAnswer}`,
          `2. Pembe Kutu = ${q.item1.count} ÷ ${q.ebobAnswer} = ${q.item1.count/q.ebobAnswer}`,
          `3. Mavi Kutu = ${q.item2.count} ÷ ${q.ebobAnswer} = ${q.item2.count/q.ebobAnswer}`,
          `4. Toplam = ${q.totalBoxesAnswer} kutu`
        ]
      });
    }
  }

  // ==========================================
  // LEVEL 3: BUBBLE HOP (EKOK)
  // ==========================================
  startLevel3() {
    this.currentLevel = 3;
    this.questionIndex = 0;
    this.hudLevelBadge.textContent = 'SEVİYE 3: BALONCUK ZIPLAYIŞI (EKOK)';
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

    this.l3.hopped = false;
    this.l3.mistakes = 0;

    const counter = document.getElementById('l3-q-counter');
    const prog = document.getElementById('l3-progress-bar');
    if (counter) counter.textContent = `${q.title} (${idx + 1} / ${GAME_DATA.level3.length})`;
    if (prog) prog.style.width = `${(idx / GAME_DATA.level3.length) * 100}%`;

    const storyEl = document.getElementById('l3-story-text');
    if (storyEl) {
      let formatted = q.story.replace(/\*\*(.*?)\*\*/g, '<span class="text-sky-600 font-bold">$1</span>');
      storyEl.innerHTML = formatted;
    }

    // Render Track & Monsters
    this.renderL3Track(q);
    this.renderL3Options(q);

    // Bind "Zıplat!" Button
    const hopBtn = document.getElementById('l3-btn-hop');
    if (hopBtn) {
      hopBtn.disabled = false;
      hopBtn.onclick = () => this.animateL3Hop(q);
    }
  }

  renderL3Track(q) {
    const trackContainer = document.getElementById('l3-track-display');
    if (!trackContainer) return;

    let bubblesHtml = '';
    for (let i = 0; i <= q.trackMax; i++) {
      const isM1 = q.m1Steps.includes(i) && i > 0;
      const isM2 = q.m2Steps.includes(i) && i > 0;
      const isBoth = isM1 && isM2;

      let bubbleClass = 'bg-white border-2 border-slate-200 text-slate-400';
      if (isBoth) {
        bubbleClass = 'bg-yellow-100 border-3 border-yellow-400 text-yellow-800 font-bold ring-2 ring-yellow-300';
      } else if (isM1) {
        bubbleClass = 'bg-pink-100 border-2 border-pink-400 text-pink-700 font-bold';
      } else if (isM2) {
        bubbleClass = 'bg-sky-100 border-2 border-sky-400 text-sky-700 font-bold';
      }

      bubblesHtml += `
        <div id="track-node-${i}" class="flex-shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex flex-col items-center justify-center font-fredoka text-xs sm:text-sm ${bubbleClass} shadow-sm transition-all">
          <span>${i}</span>
        </div>
      `;
    }

    trackContainer.innerHTML = `
      <div class="flex items-center gap-2 overflow-x-auto p-4 bg-slate-50/80 rounded-2xl border-2 border-slate-200 scrollbar-thin">
        ${bubblesHtml}
      </div>
      <div class="flex items-center justify-between text-xs sm:text-sm font-fredoka mt-2 px-2 flex-wrap gap-2">
        <span class="text-pink-600 flex items-center gap-1 font-bold">🌸 ${q.monster1.name}: Her adımda +${q.monster1.step}</span>
        <span class="text-sky-600 flex items-center gap-1 font-bold">💧 ${q.monster2.name}: Her adımda +${q.monster2.step}</span>
        <span class="text-yellow-600 flex items-center gap-1 font-bold">⭐ Ortak Buluşma Noktaları</span>
      </div>
    `;
  }

  animateL3Hop(q) {
    window.soundEngine.playBoing();
    const hopBtn = document.getElementById('l3-btn-hop');
    if (hopBtn) hopBtn.disabled = true;

    // Highlight footsteps
    q.m1Steps.forEach((step, idx) => {
      setTimeout(() => {
        const el = document.getElementById(`track-node-${step}`);
        if (el) {
          el.classList.add('animate-hop', 'scale-110');
          window.soundEngine.playBubblePop(2);
        }
      }, idx * 150);
    });

    q.m2Steps.forEach((step, idx) => {
      setTimeout(() => {
        const el = document.getElementById(`track-node-${step}`);
        if (el) {
          el.classList.add('animate-hop', 'scale-110');
          window.soundEngine.playBubblePop(3);
        }
      }, idx * 200);
    });
  }

  renderL3Options(q) {
    const container = document.getElementById('l3-options-container');
    if (!container) return;

    container.innerHTML = '';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'smart-btn p-4 bg-white border-3 border-yellow-300 hover:border-yellow-500 text-yellow-700 rounded-2xl font-fredoka font-bold text-2xl shadow-md hover:bg-yellow-50';
      btn.textContent = opt;
      btn.onclick = () => this.handleL3Choice(opt, q, btn);
      container.appendChild(btn);
    });
  }

  handleL3Choice(selected, q, btnEl) {
    if (selected === q.correctEkok) {
      window.soundEngine.playSuccessChime();
      this.addScore(70);
      this.incrementStreak();

      btnEl.className = 'smart-btn p-4 bg-yellow-400 text-yellow-950 border-3 border-yellow-500 rounded-2xl font-fredoka font-bold text-2xl shadow-lg scale-105';

      // Pop the target node on track
      const targetNode = document.getElementById(`track-node-${q.correctEkok}`);
      if (targetNode) {
        targetNode.classList.add('animate-ping');
      }

      setTimeout(() => {
        this.questionIndex++;
        this.loadLevel3Question(this.questionIndex);
      }, 1200);
    } else {
      window.soundEngine.playWrongBoop();
      this.l3.mistakes++;
      this.resetStreak();

      btnEl.classList.add('shake-cute');
      setTimeout(() => btnEl.classList.remove('shake-cute'), 400);

      this.errors.push({
        level: 3,
        title: `Baloncuk Zıplayışı EKOK (${q.title})`,
        questionText: q.story,
        userAnswer: `Seçilen Ortak Baloncuk: ${selected}`,
        correctAnswer: `İlk Ortak Buluşma: ${q.correctEkok}`,
        concept: q.concept,
        solutionSteps: [
          `${q.monster1.name} adımları: ${q.m1Steps.filter(s => s > 0).join(', ')}...`,
          `${q.monster2.name} adımları: ${q.m2Steps.filter(s => s > 0).join(', ')}...`,
          `Her ikisinin ilk ortak kesiştiği en küçük sayı EKOK(${q.monster1.step}, ${q.monster2.step}) = ${q.correctEkok}'dir.`
        ]
      });
    }
  }

  // ==========================================
  // LEVEL FINISH & 3-STAR CALCULATION
  // ==========================================
  finishLevel(lvl) {
    this.stopTimer();
    window.soundEngine.playVictoryFanfare();
    this.triggerConfetti();

    let stars = 3;
    const lvlMistakes = this.errors.filter(e => e.level === lvl).length;
    if (lvlMistakes >= 3) stars = 1;
    else if (lvlMistakes >= 1) stars = 2;

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

    if (title) title.textContent = `SEVİYE ${lvl} BAŞARIYLA GEÇİLDİ! 🎉`;
    if (score) score.textContent = this.score;
    if (time) {
      const m = Math.floor(this.timerSeconds / 60);
      const s = this.timerSeconds % 60;
      time.textContent = `${m} dk ${s} sn`;
    }

    const lvlMistakes = this.errors.filter(e => e.level === lvl).length;
    if (errorsEl) errorsEl.textContent = `${lvlMistakes} Hata`;

    if (starsBox) {
      starsBox.innerHTML = '';
      for (let i = 1; i <= 3; i++) {
        const isEarned = i <= stars;
        const star = document.createElement('div');
        star.className = `text-5xl sm:text-6xl transition-transform ${isEarned ? 'text-yellow-400 drop-shadow-md scale-110' : 'text-slate-300'}`;
        star.textContent = isEarned ? '⭐' : '☆';
        starsBox.appendChild(star);

        if (isEarned) {
          setTimeout(() => window.soundEngine.playStarDing(i), i * 320);
        }
      }
    }

    const nextBtn = document.getElementById('summary-next-btn');
    if (nextBtn) {
      if (lvl === 1) {
        nextBtn.textContent = 'SEVİYE 2: KURABİYE KUTULAMA (EBOB) ➔';
        nextBtn.onclick = () => this.startLevel2();
      } else if (lvl === 2) {
        nextBtn.textContent = 'SEVİYE 3: BALONCUK ZIPLAYIŞI (EKOK) ➔';
        nextBtn.onclick = () => this.startLevel3();
      } else {
        nextBtn.textContent = 'TÜM SEVİYELER BİTTİ! KUTLAMA ZAMANI 🏆';
        nextBtn.onclick = () => this.showScreen('menu');
      }
    }
  }

  // ==========================================
  // ERROR REVIEW REPORT
  // ==========================================
  showErrorReview() {
    this.showScreen('review');
    const container = document.getElementById('review-cards-list');
    const emptyState = document.getElementById('review-empty-state');
    const badge = document.getElementById('review-summary-badge');

    if (badge) badge.textContent = `${this.errors.length} Öğrenme İpucu`;
    if (!container) return;
    container.innerHTML = '';

    if (this.errors.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    this.errors.forEach((err, idx) => {
      const card = document.createElement('div');
      card.className = 'pastel-card p-5 mb-4 border-2 border-pink-200 bg-white/95 rounded-3xl';

      let stepsHtml = '';
      if (err.solutionSteps && err.solutionSteps.length > 0) {
        stepsHtml = `
          <div class="mt-3 pt-3 border-t border-pink-100">
            <h5 class="text-xs font-bold text-pink-600 font-fredoka mb-1">ÇÖZÜM ADIMLARI:</h5>
            <ul class="list-disc list-inside space-y-1 text-slate-600 font-comfortaa text-xs sm:text-sm">
              ${err.solutionSteps.map(st => `<li>${st}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="flex items-center justify-between mb-2 flex-wrap gap-2">
          <span class="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-fredoka font-bold">
            İpucu #${idx + 1} • Seviye ${err.level}
          </span>
          <span class="text-sm font-bold text-slate-700 font-fredoka">${err.title}</span>
        </div>

        <p class="text-slate-700 text-sm font-medium mb-3">${err.questionText}</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-xs sm:text-sm">
          <div class="p-2.5 bg-rose-50 border border-rose-200 rounded-2xl">
            <span class="text-rose-600 font-bold block mb-0.5">Senin Seçimin:</span>
            <span class="text-rose-800 font-comfortaa font-semibold">${err.userAnswer}</span>
          </div>
          <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <span class="text-emerald-600 font-bold block mb-0.5">Doğru Yol:</span>
            <span class="text-emerald-800 font-comfortaa font-semibold">${err.correctAnswer}</span>
          </div>
        </div>

        <div class="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-xs sm:text-sm text-sky-900 font-comfortaa">
          💡 <b>Kural & Strateji:</b> ${err.concept}
        </div>

        ${stepsHtml}
      `;

      container.appendChild(card);
    });
  }

  // ==========================================
  // CONFETTI CANVAS EFFECT
  // ==========================================
  triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ec4899', '#38bdf8', '#facc15', '#34d399', '#a855f7', '#fb7185'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: Math.random() * 7 + 3,
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

  // Ambient floating bubbles generator
  createAmbientBubbles() {
    for (let i = 0; i < 8; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'ambient-bubble';
      const size = Math.random() * 45 + 25;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 95}vw`;
      bubble.style.animationDelay = `${Math.random() * 10}s`;
      bubble.style.animationDuration = `${Math.random() * 6 + 10}s`;
      document.body.appendChild(bubble);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.game = new SiframonGame();
});
