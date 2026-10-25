/**
 * MERVE SAMAK AKADEMİ — DİJİTAL MATEMATİK YARIŞMASI: ÜSLERİN SAVAŞI
 * Ana Oyun Motoru, Durum Yönetimi, Akıllı Tahta Mantığı ve KaTeX Desteği
 */

class MathArenaGame {
  constructor() {
    this.state = {
      gameStarted: false,
      activeTeam: 'pink', // 'pink' veya 'blue'
      currentLevelNum: 1,  // 1, 2, 3, 4
      questionAttempt: 0, // 0: ilk hak, 1: ikinci hak
      isPaused: false,
      isInfiniteTime: false,
      timerDuration: 30,
      timerRemaining: 30,
      timerInterval: null,
      autoAdvanceInterval: null,
      autoAdvanceRemaining: 5,
      isGoldenQuestion: false,
      goldenIndex: 0,

      // Takım Durumları
      teams: {
        pink: {
          name: "Pembe Takım (Kızlar)",
          shortName: "Pembe Takım",
          score: 0,
          level: 1,
          questionIndex: 0,
          correctCount: 0,
          wrongCount: 0,
          hintUsedInLevel: false,
          badges: [],
          levelStats: { 1: { c: 0, t: 0 }, 2: { c: 0, t: 0 }, 3: { c: 0, t: 0 }, 4: { c: 0, t: 0 } },
          isRetryMode: false,
          retryIndex: 0,
          completedAllLevels: false
        },
        blue: {
          name: "Mavi Takım (Erkekler)",
          shortName: "Mavi Takım",
          score: 0,
          level: 1,
          questionIndex: 0,
          correctCount: 0,
          wrongCount: 0,
          hintUsedInLevel: false,
          badges: [],
          levelStats: { 1: { c: 0, t: 0 }, 2: { c: 0, t: 0 }, 3: { c: 0, t: 0 }, 4: { c: 0, t: 0 } },
          isRetryMode: false,
          retryIndex: 0,
          completedAllLevels: false
        }
      },

      // Aktif soru ve eşleştirme geçici durumu
      currentQuestion: null,
      matchingState: {
        selectedLeft: null,
        selectedRight: null,
        matchedPairs: []
      }
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateScoreboardUI();
  }

  // ==========================================
  // OLAY DİNLEYİCİLERİ VE ETKİLEŞİM KURULUMU
  // ==========================================
  bindEvents() {
    // 1. Lobi Başlat Butonu
    const startBtn = document.getElementById('btn-start-battle');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startGameFromLobby());
    }

    // 2. Ses Aç/Kapat Butonu
    const muteBtn = document.getElementById('btn-mute');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        if (!window.soundEngine) return;
        const isMuted = window.soundEngine.toggleMute();
        const icon = document.getElementById('mute-icon');
        if (icon) icon.innerText = isMuted ? '🔇' : '🔊';
        muteBtn.classList.toggle('opacity-50', isMuted);
      });
    }

    // 3. Tam Ekran Butonu
    const fsBtn = document.getElementById('btn-fullscreen');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    // 4. Öğretmen Masası Aç/Kapat
    const teacherBtn = document.getElementById('btn-teacher-panel');
    const teacherModal = document.getElementById('teacher-modal');
    const closeTeacherBtn = document.getElementById('btn-close-teacher');

    if (teacherBtn && teacherModal) {
      teacherBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
        teacherModal.classList.add('open');
      });
    }
    if (closeTeacherBtn && teacherModal) {
      closeTeacherBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
        teacherModal.classList.remove('open');
      });
    }

    // 5. Sayaç Kontrolleri
    const pauseBtn = document.getElementById('btn-pause-timer');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => this.togglePause());
    }

    const skipBtn = document.getElementById('btn-skip-timer');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => this.skipCurrentQuestion());
    }

    // 6. İpucu Butonu
    const hintBtn = document.getElementById('btn-use-hint');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => this.useHintLifeline());
    }

    // 7. Dönüt Aksiyon Butonları
    const nextBtn = document.getElementById('btn-feedback-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.advanceToNextTurn());
    }

    const retryBtn = document.getElementById('btn-feedback-retry');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.retryCurrentQuestion());
    }

    const showSolutionBtn = document.getElementById('btn-feedback-show-solution');
    if (showSolutionBtn) {
      showSolutionBtn.addEventListener('click', () => this.showFullSolutionDirectly());
    }

    // 8. Seviye Atlama & Telafi Modalları Butonları
    const levelupProceed = document.getElementById('btn-levelup-proceed');
    if (levelupProceed) {
      levelupProceed.addEventListener('click', () => {
        document.getElementById('level-up-modal').classList.remove('open');
        this.advanceToNextTurn();
      });
    }

    const retryProceed = document.getElementById('btn-retry-proceed');
    if (retryProceed) {
      retryProceed.addEventListener('click', () => {
        document.getElementById('retry-modal').classList.remove('open');
        this.loadQuestionForActiveTeam();
      });
    }

    const goldenProceed = document.getElementById('btn-golden-proceed');
    if (goldenProceed) {
      goldenProceed.addEventListener('click', () => {
        document.getElementById('golden-modal').classList.remove('open');
        this.state.isGoldenQuestion = true;
        this.loadQuestionForActiveTeam();
      });
    }

    // 9. Öğretmen Masası Aksiyonları
    this.bindTeacherControls();

    // 10. Yazdırma / PDF Butonu
    const printBtn = document.getElementById('btn-print-report');
    if (printBtn) {
      printBtn.addEventListener('click', () => this.printOfficialReport());
    }

    // Klavye Kısayolları (Öğretmen için T tuşu)
    document.addEventListener('keydown', (e) => {
      if (e.key === 't' || e.key === 'T') {
        if (teacherModal && !['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) {
          teacherModal.classList.toggle('open');
        }
      } else if (e.key === ' ') {
        // Space tuşu ile duraklat/devam ettir (eğer input aktif değilse)
        if (this.state.gameStarted && !['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) {
          e.preventDefault();
          this.togglePause();
        }
      }
    });
  }

  // ==========================================
  // ÖĞRETMEN MASASI MÜDAHALE AKSİYONLARI
  // ==========================================
  bindTeacherControls() {
    // Süre +15 Sn
    document.getElementById('t-btn-add-time')?.addEventListener('click', () => {
      this.state.timerRemaining += 15;
      this.updateTimerDisplay();
      if (window.soundEngine) window.soundEngine.playTone(700, 'triangle', 0.1);
    });

    // Soruyu Atla
    document.getElementById('t-btn-skip')?.addEventListener('click', () => {
      document.getElementById('teacher-modal')?.classList.remove('open');
      this.skipCurrentQuestion();
    });

    // Doğru Say
    document.getElementById('t-btn-force-correct')?.addEventListener('click', () => {
      document.getElementById('teacher-modal')?.classList.remove('open');
      this.handleCorrectAnswer(true);
    });

    // Yanlış Say
    document.getElementById('t-btn-force-wrong')?.addEventListener('click', () => {
      document.getElementById('teacher-modal')?.classList.remove('open');
      this.handleWrongAnswerAttempt(true);
    });

    // Cevabı Aç (Sınıfta Açıkla)
    document.getElementById('t-btn-reveal')?.addEventListener('click', () => {
      document.getElementById('teacher-modal')?.classList.remove('open');
      this.showFullSolutionDirectly();
    });

    // Puan Müdahaleleri
    document.getElementById('t-pink-add10')?.addEventListener('click', () => {
      this.state.teams.pink.score += 10;
      this.updateScoreboardUI();
      if (window.soundEngine) window.soundEngine.playTone(880, 'triangle', 0.1);
    });
    document.getElementById('t-pink-sub10')?.addEventListener('click', () => {
      this.state.teams.pink.score = Math.max(0, this.state.teams.pink.score - 10);
      this.updateScoreboardUI();
      if (window.soundEngine) window.soundEngine.playTone(300, 'sawtooth', 0.1);
    });
    document.getElementById('t-blue-add10')?.addEventListener('click', () => {
      this.state.teams.blue.score += 10;
      this.updateScoreboardUI();
      if (window.soundEngine) window.soundEngine.playTone(880, 'triangle', 0.1);
    });
    document.getElementById('t-blue-sub10')?.addEventListener('click', () => {
      this.state.teams.blue.score = Math.max(0, this.state.teams.blue.score - 10);
      this.updateScoreboardUI();
      if (window.soundEngine) window.soundEngine.playTone(300, 'sawtooth', 0.1);
    });

    // Seviye Atlama Butonları
    document.querySelectorAll('.t-jump-level').forEach(btn => {
      btn.addEventListener('click', () => {
        const lvl = parseInt(btn.dataset.level);
        document.getElementById('teacher-modal')?.classList.remove('open');
        this.jumpToLevel(lvl);
      });
    });

    // Altın Soru
    document.getElementById('t-btn-golden')?.addEventListener('click', () => {
      document.getElementById('teacher-modal')?.classList.remove('open');
      this.state.isGoldenQuestion = true;
      this.loadQuestionForActiveTeam();
    });

    // Raporu Aç
    document.getElementById('t-btn-view-report')?.addEventListener('click', () => {
      document.getElementById('teacher-modal')?.classList.remove('open');
      this.showFinalResults(true);
    });

    // Oyunu Sıfırla
    document.getElementById('t-btn-reset-game')?.addEventListener('click', () => {
      if (confirm("Yarışmayı sıfırlamak ve en başa dönmek istediğinize emin misiniz?")) {
        window.location.reload();
      }
    });
  }

  // ==========================================
  // OYUNU BAŞLATMA (LOBİDEN ARENAYA GEÇİŞ)
  // ==========================================
  startGameFromLobby() {
    const timerSel = document.getElementById('lobby-timer-select');
    const teamSel = document.getElementById('lobby-start-team');

    const durationVal = timerSel ? timerSel.value : "30";
    if (durationVal === 'infinite') {
      this.state.isInfiniteTime = true;
    } else {
      this.state.isInfiniteTime = false;
      this.state.timerDuration = parseInt(durationVal) || 30;
      this.state.timerRemaining = this.state.timerDuration;
    }

    if (teamSel) {
      this.state.activeTeam = teamSel.value || 'pink';
    }

    this.state.gameStarted = true;

    // Ses Efekti
    if (window.soundEngine) {
      window.soundEngine.playStart();
    }

    // Görünüm Geçişi
    const lobbyEl = document.getElementById('lobby-screen');
    const battleEl = document.getElementById('battle-stage');

    if (lobbyEl) lobbyEl.classList.add('hidden');
    if (battleEl) {
      battleEl.classList.remove('hidden');
      battleEl.classList.add('flex');
    }

    // İlk soruyu yükle
    this.loadQuestionForActiveTeam();
  }

  // ==========================================
  // AKTİF TAKIM İÇİN SORU YÜKLEME
  // ==========================================
  loadQuestionForActiveTeam() {
    this.clearAutoAdvance();
    this.hideFeedback();
    this.hideHintBox();
    this.state.questionAttempt = 0;

    // Her iki takım da tüm seviyeleri bitirdiyse oyunu sonlandır
    if (this.state.teams.pink.completedAllLevels && this.state.teams.blue.completedAllLevels) {
      this.checkGameCompletion();
      return;
    }

    // Aktif takım bitirmiş ama diğeri bitirmemişse sırayı diğerine devret
    if (!this.state.isGoldenQuestion && this.state.teams[this.state.activeTeam].completedAllLevels) {
      this.state.activeTeam = (this.state.activeTeam === 'pink') ? 'blue' : 'pink';
    }

    const team = this.state.teams[this.state.activeTeam];
    const lvlKey = `level${team.level}`;
    const bank = window.QUESTION_BANK || (typeof QUESTION_BANK !== 'undefined' ? QUESTION_BANK : {});
    const levelData = bank[lvlKey];

    if (!levelData && !this.state.isGoldenQuestion) {
      this.checkGameCompletion();
      return;
    }

    // Süre ayarını yap
    if (!this.state.isInfiniteTime) {
      const timeLimit = this.state.isGoldenQuestion ? 45 : (levelData ? levelData.timeLimit : 30);
      // Öğretmen lobi ayarı özel ayarlandıysa onu koru, değilse seviye standardını al
      this.state.timerRemaining = this.state.timerDuration || timeLimit;
    }

    // Soruyu belirle
    let q = null;
    if (this.state.isGoldenQuestion) {
      const goldenList = bank.golden || [];
      q = goldenList[this.state.goldenIndex % goldenList.length];
    } else if (team.isRetryMode) {
      q = levelData.retry[team.retryIndex % levelData.retry.length];
    } else {
      const pool = levelData[this.state.activeTeam];
      q = pool[team.questionIndex % pool.length];
    }

    this.state.currentQuestion = q;
    this.renderQuestion(q, levelData);
    this.updateScoreboardUI();
    this.startTimer();
  }

  // ==========================================
  // SORU VE ETKİLEŞİM ALANI RENDER MOTORU
  // ==========================================
  renderQuestion(q, levelData) {
    const team = this.state.teams[this.state.activeTeam];
    const points = this.state.isGoldenQuestion ? 50 : (levelData ? levelData.points : 10);
    const levelName = this.state.isGoldenQuestion ? "ALTIN SORU / EŞİTLİK BOZMA" : (levelData ? levelData.name : "");

    // 1. Meta Rozetlerini Güncelle
    const levelBadge = document.getElementById('q-level-badge');
    const typeBadge = document.getElementById('q-type-badge');
    const pointsBadge = document.getElementById('q-points-badge');

    if (levelBadge) levelBadge.innerText = levelName;
    if (typeBadge) typeBadge.innerText = this.getQuestionTypeLabel(q.type);
    if (pointsBadge) pointsBadge.innerText = `+${points} PUAN`;

    // 2. Başlık ve Metin
    const titleEl = document.getElementById('q-title');
    const textEl = document.getElementById('q-text');

    if (titleEl) titleEl.innerText = q.title || "";
    if (textEl) {
      textEl.innerHTML = this.formatMathText(q.text || "");
      this.triggerKaTeX(textEl);
    }

    // 3. Etkileşim Alanını Oluştur
    const answerArea = document.getElementById('interactive-answer-area');
    if (!answerArea) return;
    answerArea.innerHTML = "";

    if (q.type === 'multiple_choice') {
      let grid = document.createElement('div');
      grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-3";
      
      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "option-btn p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 flex items-center gap-3 text-left transition-all group hover:border-pink-500/50 active:scale-98 cursor-pointer";
        btn.dataset.key = opt.key;
        btn.innerHTML = `
          <span class="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-white group-hover:scale-105 transition-transform flex-shrink-0 font-display">
            ${opt.key}
          </span>
          <span class="text-base font-extrabold text-white option-label tracking-wide">
            ${this.formatMathText(opt.text)}
          </span>
        `;
        btn.addEventListener('click', () => {
          if (window.soundEngine) window.soundEngine.playClick();
          this.submitAnswer(opt.key, btn);
        });
        grid.appendChild(btn);
      });

      answerArea.appendChild(grid);
      this.triggerKaTeX(grid);
    }
    else if (q.type === 'true_false') {
      let grid = document.createElement('div');
      grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto";

      const trueBtn = document.createElement('button');
      trueBtn.className = "tf-btn p-5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border-2 border-emerald-500/40 text-emerald-300 font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-102 active:scale-95";
      trueBtn.dataset.key = "D";
      trueBtn.innerHTML = `<span>✅</span> <span>DOĞRU</span>`;
      trueBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
        this.submitAnswer('D', trueBtn);
      });

      const falseBtn = document.createElement('button');
      falseBtn.className = "tf-btn p-5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border-2 border-rose-500/40 text-rose-300 font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-102 active:scale-95";
      falseBtn.dataset.key = "Y";
      falseBtn.innerHTML = `<span>❌</span> <span>YANLIŞ</span>`;
      falseBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
        this.submitAnswer('Y', falseBtn);
      });

      grid.appendChild(trueBtn);
      grid.appendChild(falseBtn);
      answerArea.appendChild(grid);
    }
    else if (q.type === 'fill_blank') {
      const container = document.createElement('div');
      container.className = "max-w-md mx-auto space-y-4";

      container.innerHTML = `
        <div class="flex items-center gap-2">
          <input type="text" id="fill-input-box" class="flex-1 p-3.5 rounded-xl bg-black/40 border-2 border-white/20 text-white font-mono-numbers text-xl font-bold text-center focus:border-pink-500 focus:outline-none placeholder-slate-500" placeholder="Cevabınızı giriniz..." autofocus />
          <button id="btn-submit-fill" class="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-white font-black text-sm uppercase tracking-wider shadow-lg transition-all active:scale-95">
            GÖNDER ➜
          </button>
        </div>

        <div class="grid grid-cols-4 gap-2 pt-2">
          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-black text-base" data-val="1">1</button>
          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-black text-base" data-val="2">2</button>
          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-black text-base" data-val="3">3</button>
          <button class="keypad-btn p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-sm" id="kp-backspace">⌫ Sil</button>

          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-black text-base" data-val="4">4</button>
          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-black text-base" data-val="5">5</button>
          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-black text-base" data-val="6">6</button>
          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 font-black text-base" data-val="-">-</button>

          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-black text-base" data-val="7">7</button>
          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-black text-base" data-val="8">8</button>
          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-black text-base" data-val="9">9</button>
          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 font-black text-base" data-val="/">/</button>

          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-black text-base" data-val="0">0</button>
          <button class="keypad-btn p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 font-black text-base" data-val=",">,</button>
          <button class="keypad-btn p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-bold text-xs col-span-2" id="kp-clear">Temizle</button>
        </div>
      `;

      answerArea.appendChild(container);

      const input = document.getElementById('fill-input-box');
      const submitBtn = document.getElementById('btn-submit-fill');

      container.querySelectorAll('.keypad-btn[data-val]').forEach(kBtn => {
        kBtn.addEventListener('click', () => {
          if (window.soundEngine) window.soundEngine.playClick();
          input.value += kBtn.dataset.val;
          input.focus();
        });
      });

      document.getElementById('kp-backspace')?.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
        input.value = input.value.slice(0, -1);
        input.focus();
      });

      document.getElementById('kp-clear')?.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
        input.value = '';
        input.focus();
      });

      input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.submitAnswer(input.value.trim(), submitBtn);
        }
      });

      submitBtn?.addEventListener('click', () => {
        this.submitAnswer(input.value.trim(), submitBtn);
      });
    }
    else if (q.type === 'find_error') {
      const container = document.createElement('div');
      container.className = "space-y-2 max-w-xl mx-auto";

      q.steps.forEach(step => {
        const stepCard = document.createElement('div');
        stepCard.className = "step-card p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-between gap-3 cursor-pointer transition-all hover:border-amber-500/50";
        stepCard.dataset.step = step.stepNum;
        stepCard.innerHTML = `
          <div class="text-sm font-bold text-white">
            ${this.formatMathText(step.text)}
          </div>
          <span class="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-black flex-shrink-0">
            Hata Bu Adımda ➜
          </span>
        `;
        stepCard.addEventListener('click', () => {
          if (window.soundEngine) window.soundEngine.playClick();
          this.submitAnswer(step.stepNum, stepCard);
        });
        container.appendChild(stepCard);
      });

      answerArea.appendChild(container);
      this.triggerKaTeX(container);
    }
    else if (q.type === 'matching') {
      this.setupMatchingBoard(q, answerArea);
    }
  }

  setupMatchingBoard(q, container) {
    this.state.matchingState = {
      selectedLeft: null,
      selectedRight: null,
      matchedPairs: []
    };

    const board = document.createElement('div');
    board.className = "grid grid-cols-2 gap-4 max-w-xl mx-auto";

    const leftCol = document.createElement('div');
    leftCol.className = "space-y-2";
    leftCol.id = "match-col-left";

    const rightCol = document.createElement('div');
    rightCol.className = "space-y-2";
    rightCol.id = "match-col-right";

    const leftItems = q.pairs.map((p, i) => ({ id: i, text: p.left }));
    const rightItems = [...q.pairs.map((p, i) => ({ id: i, text: p.right }))].sort(() => Math.random() - 0.5);

    leftItems.forEach(item => {
      const el = document.createElement('div');
      el.className = "match-card match-left p-3 rounded-xl bg-white/5 border border-white/15 text-sm font-bold text-white text-center";
      el.dataset.id = item.id;
      el.innerHTML = this.formatMathText(item.text);
      el.addEventListener('click', () => {
        if (el.classList.contains('paired')) return;
        if (window.soundEngine) window.soundEngine.playClick();
        leftCol.querySelectorAll('.match-left').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        this.state.matchingState.selectedLeft = parseInt(el.dataset.id);
        this.checkMatchingPair(q);
      });
      leftCol.appendChild(el);
    });

    rightItems.forEach(item => {
      const el = document.createElement('div');
      el.className = "match-card match-right p-3 rounded-xl bg-white/5 border border-white/15 text-sm font-bold text-white text-center";
      el.dataset.id = item.id;
      el.innerHTML = this.formatMathText(item.text);
      el.addEventListener('click', () => {
        if (el.classList.contains('paired')) return;
        if (window.soundEngine) window.soundEngine.playClick();
        rightCol.querySelectorAll('.match-right').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        this.state.matchingState.selectedRight = parseInt(el.dataset.id);
        this.checkMatchingPair(q);
      });
      rightCol.appendChild(el);
    });

    board.appendChild(leftCol);
    board.appendChild(rightCol);
    container.appendChild(board);
    this.triggerKaTeX(board);
  }

  checkMatchingPair(q) {
    const { selectedLeft, selectedRight, matchedPairs } = this.state.matchingState;
    if (selectedLeft === null || selectedRight === null) return;

    const leftEl = document.querySelector(`.match-left[data-id="${selectedLeft}"]`);
    const rightEl = document.querySelector(`.match-right[data-id="${selectedRight}"]`);

    if (selectedLeft === selectedRight) {
      // Doğru eşleşme
      if (window.soundEngine) window.soundEngine.playTone(800, 'triangle', 0.15);
      leftEl.classList.remove('selected');
      rightEl.classList.remove('selected');
      leftEl.classList.add('paired');
      rightEl.classList.add('paired');

      matchedPairs.push(selectedLeft);
      this.state.matchingState.selectedLeft = null;
      this.state.matchingState.selectedRight = null;

      if (matchedPairs.length === q.pairs.length) {
        this.handleCorrectAnswer();
      }
    } else {
      // Hatalı eşleşme
      if (window.soundEngine) window.soundEngine.playWrong();
      leftEl.classList.add('border-rose-500');
      rightEl.classList.add('border-rose-500');

      setTimeout(() => {
        leftEl.classList.remove('selected', 'border-rose-500');
        rightEl.classList.remove('selected', 'border-rose-500');
        this.state.matchingState.selectedLeft = null;
        this.state.matchingState.selectedRight = null;
      }, 600);
    }
  }

  // ==========================================
  // CEVAP KONTROL VE DEĞERLENDİRME
  // ==========================================
  submitAnswer(userAnswer, targetElement) {
    this.stopTimer();
    const q = this.state.currentQuestion;
    let isCorrect = false;

    if (q.type === 'multiple_choice' || q.type === 'true_false' || q.type === 'find_error') {
      isCorrect = (String(userAnswer).trim().toUpperCase() === String(q.correct).trim().toUpperCase());
    }
    else if (q.type === 'fill_blank') {
      const cleanAnswer = String(userAnswer).trim().replace(/\s+/g, '');
      const validAnswers = q.acceptableAnswers || [q.correct];
      isCorrect = validAnswers.some(ans => ans.trim().replace(/\s+/g, '') === cleanAnswer);
    }

    if (isCorrect) {
      if (targetElement) {
        targetElement.classList.remove('bg-white/5', 'hover:bg-white/10');
        targetElement.classList.add('bg-emerald-500/25', 'border-emerald-500');
      }
      this.handleCorrectAnswer();
    } else {
      if (targetElement) {
        targetElement.classList.add('bg-rose-500/25', 'border-rose-500');
      }
      this.handleWrongAnswerAttempt();
    }
  }

  // DOĞRU CEVAP
  handleCorrectAnswer(isTeacherForce = false) {
    this.stopTimer();
    if (window.soundEngine) window.soundEngine.playCorrect();
    this.triggerConfetti();

    const team = this.state.teams[this.state.activeTeam];
    const lvlKey = `level${team.level}`;
    const bank = window.QUESTION_BANK || (typeof QUESTION_BANK !== 'undefined' ? QUESTION_BANK : {});
    const levelData = bank[lvlKey];
    const points = this.state.isGoldenQuestion ? 50 : (levelData ? levelData.points : 10);

    team.score += points;
    team.correctCount++;
    if (team.levelStats[team.level]) {
      team.levelStats[team.level].c++;
      team.levelStats[team.level].t++;
    }

    this.updateScoreboardUI();
    this.disableQuestionInputs();

    // Dönüt Kutusunu Göster
    const feedbackBox = document.getElementById('feedback-container');
    const titleEl = document.getElementById('feedback-title');
    const textEl = document.getElementById('feedback-text');
    const iconEl = document.getElementById('feedback-icon');
    const retryBtn = document.getElementById('btn-feedback-retry');
    const showSolBtn = document.getElementById('btn-feedback-show-solution');
    const nextBtn = document.getElementById('btn-feedback-next');

    feedbackBox.className = "my-4 p-5 rounded-2xl border transition-all bg-emerald-500/10 border-emerald-500/40";
    if (iconEl) iconEl.innerText = "🌟";
    if (titleEl) {
      titleEl.className = "text-lg font-black font-display tracking-wide text-emerald-400";
      titleEl.innerText = `HARİKA! DOĞRU CEVAP (+${points} PUAN)`;
    }

    const solText = isTeacherForce ? 
      "Öğretmen tarafından cevap DOĞRU olarak onaylandı ve takıma puan eklendi!" : 
      (this.state.currentQuestion.feedbackCorrect || "Tebrikler, soruyu doğru çözdünüz!");

    if (textEl) {
      textEl.innerHTML = this.formatMathText(solText);
      this.triggerKaTeX(textEl);
    }

    if (retryBtn) retryBtn.classList.add('hidden');
    if (showSolBtn) showSolBtn.classList.add('hidden');
    if (nextBtn) {
      nextBtn.classList.remove('hidden');
      const nextTeamName = (this.state.activeTeam === 'pink') ? "Mavi Takım" : "Pembe Takım";
      nextBtn.innerHTML = `<span>Sonraki Soru (Sıra: ${nextTeamName})</span> <span>➜</span>`;
    }

    feedbackBox.classList.remove('hidden');

    // 5 saniyelik otomatik ilerleme başlat
    this.startAutoAdvance();
  }

  // YANLIŞ CEVAP
  handleWrongAnswerAttempt(isTeacherForce = false) {
    this.stopTimer();
    const q = this.state.currentQuestion;
    const team = this.state.teams[this.state.activeTeam];

    if (this.state.questionAttempt === 0 && !isTeacherForce) {
      // 1. Yanlış Hak: İpucu göster ve 2. deneme hakkı sun
      this.state.questionAttempt = 1;
      if (window.soundEngine) window.soundEngine.playWrong();

      const feedbackBox = document.getElementById('feedback-container');
      const titleEl = document.getElementById('feedback-title');
      const textEl = document.getElementById('feedback-text');
      const iconEl = document.getElementById('feedback-icon');
      const retryBtn = document.getElementById('btn-feedback-retry');
      const showSolBtn = document.getElementById('btn-feedback-show-solution');
      const nextBtn = document.getElementById('btn-feedback-next');

      feedbackBox.className = "my-4 p-5 rounded-2xl border transition-all bg-amber-500/10 border-amber-500/40";
      if (iconEl) iconEl.innerText = "🤔";
      if (titleEl) {
        titleEl.className = "text-lg font-black font-display tracking-wide text-amber-400";
        titleEl.innerText = "HENÜZ OLMADI! (1 Telafi Hakkınız Var)";
      }

      if (textEl) {
        textEl.innerHTML = this.formatMathText(q.feedbackWrong || "Cevabınızı bir kez daha kontrol edip deneyebilirsiniz.");
        this.triggerKaTeX(textEl);
      }

      if (retryBtn) retryBtn.classList.remove('hidden');
      if (showSolBtn) showSolBtn.classList.remove('hidden');
      if (nextBtn) nextBtn.classList.add('hidden');

      feedbackBox.classList.remove('hidden');
    }
    else {
      // 2. Yanlış Hak veya Öğretmen Yanlış Say: Tam çözümü göster, ceza yok
      if (window.soundEngine) window.soundEngine.playWrong();
      team.wrongCount++;
      if (team.levelStats[team.level]) {
        team.levelStats[team.level].t++;
      }

      this.updateScoreboardUI();
      this.disableQuestionInputs();

      const feedbackBox = document.getElementById('feedback-container');
      const titleEl = document.getElementById('feedback-title');
      const textEl = document.getElementById('feedback-text');
      const iconEl = document.getElementById('feedback-icon');
      const retryBtn = document.getElementById('btn-feedback-retry');
      const showSolBtn = document.getElementById('btn-feedback-show-solution');
      const nextBtn = document.getElementById('btn-feedback-next');

      feedbackBox.className = "my-4 p-5 rounded-2xl border transition-all bg-rose-500/10 border-rose-500/40";
      if (iconEl) iconEl.innerText = "📘";
      if (titleEl) {
        titleEl.className = "text-lg font-black font-display tracking-wide text-rose-400";
        titleEl.innerText = "ÖĞRENME FIRSATI & ÇÖZÜM ADIMLARI";
      }

      const explanation = q.feedbackCorrect || `Doğru Cevap: ${q.correct}`;
      if (textEl) {
        textEl.innerHTML = `<div class="mb-1 font-bold text-white">Doğru Seçenek / Değer: <span class="text-emerald-400">${q.correct}</span></div>` + this.formatMathText(explanation);
        this.triggerKaTeX(textEl);
      }

      if (retryBtn) retryBtn.classList.add('hidden');
      if (showSolBtn) showSolBtn.classList.add('hidden');
      if (nextBtn) {
        nextBtn.classList.remove('hidden');
        const nextTeamName = (this.state.activeTeam === 'pink') ? "Mavi Takım" : "Pembe Takım";
        nextBtn.innerHTML = `<span>Sonraki Soru (Sıra: ${nextTeamName})</span> <span>➜</span>`;
      }

      feedbackBox.classList.remove('hidden');
    }
  }

  // 1. yanlışta tekrar deneme
  retryCurrentQuestion() {
    this.hideFeedback();
    const answerArea = document.getElementById('interactive-answer-area');
    if (answerArea) {
      answerArea.querySelectorAll('.option-btn, .tf-btn, .step-card').forEach(btn => {
        btn.classList.remove('bg-rose-500/25', 'border-rose-500');
        btn.disabled = false;
      });
    }
    // Süreyi yarım süreyle devam ettir
    this.state.timerRemaining = Math.max(15, Math.floor(this.state.timerDuration / 2));
    this.startTimer();
  }

  // Çözümü doğrudan açma
  showFullSolutionDirectly() {
    this.state.questionAttempt = 2;
    this.handleWrongAnswerAttempt();
  }

  // ==========================================
  // TUR DEĞİŞİMİ VE SIRADAKİ SORUYA GEÇİŞ
  // ==========================================
  advanceToNextTurn() {
    this.clearAutoAdvance();
    const currentTeamKey = this.state.activeTeam;
    const team = this.state.teams[currentTeamKey];

    // Sorunun tamamlanma sayacını artır
    if (team.isRetryMode) {
      team.retryIndex++;
      const lvlKey = `level${team.level}`;
      const bank = window.QUESTION_BANK || (typeof QUESTION_BANK !== 'undefined' ? QUESTION_BANK : {});
    const levelData = bank[lvlKey];
      if (team.retryIndex >= (levelData ? levelData.retry.length : 3)) {
        // Telafi bitti
        team.isRetryMode = false;
        team.level++;
        team.questionIndex = 0;
        if (team.level > 4) {
          team.completedAllLevels = true;
        }
      }
    } else {
      team.questionIndex++;
      const lvlKey = `level${team.level}`;
      const bank = window.QUESTION_BANK || (typeof QUESTION_BANK !== 'undefined' ? QUESTION_BANK : {});
    const levelData = bank[lvlKey];
      const maxQuestions = levelData ? levelData[currentTeamKey].length : 5;

      // Seviyedeki tüm sorular bittiyse başarı oranını kontrol et
      if (team.questionIndex >= maxQuestions) {
        this.evaluateTeamLevelCompletion(currentTeamKey);
        return;
      }
    }

    // Sırayı diğer takıma geçir
    this.state.activeTeam = (this.state.activeTeam === 'pink') ? 'blue' : 'pink';
    this.loadQuestionForActiveTeam();
  }

  // Seviye bitiş değerlendirmesi (%70 kuralı)
  evaluateTeamLevelCompletion(teamKey) {
    const team = this.state.teams[teamKey];
    const lvlKey = `level${team.level}`;
    const bank = window.QUESTION_BANK || (typeof QUESTION_BANK !== 'undefined' ? QUESTION_BANK : {});
    const levelData = bank[lvlKey];
    const stats = team.levelStats[team.level] || { c: 0, t: 5 };
    const successRatio = stats.t > 0 ? (stats.c / stats.t) : 0;
    const passRatio = levelData ? (levelData.minPassRatio || 0.7) : 0.7;

    if (successRatio >= passRatio) {
      // Başarıyla geçti -> Rozet ver
      const badges = {
        1: { name: "🥉 Isınma Şampiyonu", icon: "🥉" },
        2: { name: "🥈 Üs Ustası", icon: "🥈" },
        3: { name: "🥇 Zekâ Virtüözü", icon: "🥇" },
        4: { name: "👑 LGS Şampiyonu", icon: "👑" }
      };
      const badgeInfo = badges[team.level] || { name: "🌟 Başarı Rozeti", icon: "🌟" };
      if (!team.badges.includes(badgeInfo.name)) {
        team.badges.push(badgeInfo.name);
      }

      // Seviye Atlama Modalı Göster
      this.showLevelUpModal(teamKey, badgeInfo, successRatio);

      team.level++;
      team.questionIndex = 0;
      team.hintUsedInLevel = false;

      if (team.level > 4) {
        team.completedAllLevels = true;
      }
    } else {
      // %70 altında kaldı -> Telafi sorularına yönlendir
      this.showRetryModal(teamKey, successRatio);
      team.isRetryMode = true;
      team.retryIndex = 0;
      team.hintUsedInLevel = false;
    }

    this.updateScoreboardUI();
  }

  showLevelUpModal(teamKey, badgeInfo, ratio) {
    const modal = document.getElementById('level-up-modal');
    if (!modal) return;

    if (window.soundEngine) window.soundEngine.playLevelUp();
    this.triggerConfetti();

    const team = this.state.teams[teamKey];
    document.getElementById('levelup-team-name').innerText = team.name.toUpperCase();
    document.getElementById('levelup-title').innerText = `${team.level}. SEVİYE TAMAMLANDI!`;
    document.getElementById('levelup-desc').innerText = `Tebrikler! Bu seviyeyi %${Math.round(ratio * 100)} başarı oranıyla geçtiniz.`;
    document.getElementById('levelup-badge-icon').innerText = badgeInfo.icon;
    document.getElementById('levelup-badge-name').innerText = badgeInfo.name;

    modal.classList.add('open');
  }

  showRetryModal(teamKey, ratio) {
    const modal = document.getElementById('retry-modal');
    if (!modal) return;

    if (window.soundEngine) window.soundEngine.playWrong();
    const team = this.state.teams[teamKey];
    document.getElementById('retry-team-name').innerText = team.name.toUpperCase();
    document.getElementById('retry-desc').innerText = `Bu seviyedeki başarı oranınız %${Math.round(ratio * 100)} oldu. Konuyu tam pekiştirmek için 3 adet telafi sorusu hazırlandı.`;

    modal.classList.add('open');
  }

  // ==========================================
  // İPUCU KULLANIMI
  // ==========================================
  useHintLifeline() {
    const team = this.state.teams[this.state.activeTeam];
    const hintBox = document.getElementById('hint-box');
    const hintText = document.getElementById('hint-text');

    if (team.hintUsedInLevel) {
      if (hintBox) {
        hintBox.className = "my-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-sm";
        hintText.innerText = "Bu seviyedeki tek ipucu hakkınızı zaten kullandınız!";
        hintBox.classList.remove('hidden');
      }
      return;
    }

    team.hintUsedInLevel = true;
    this.updateScoreboardUI();

    if (window.soundEngine) window.soundEngine.playTone(600, 'triangle', 0.2);

    if (hintBox && hintText && this.state.currentQuestion) {
      hintBox.className = "my-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm";
      hintText.innerHTML = this.formatMathText(this.state.currentQuestion.hint || "Matematiksel kuralı hatırlayın.");
      this.triggerKaTeX(hintText);
      hintBox.classList.remove('hidden');
    }
  }

  hideHintBox() {
    const hintBox = document.getElementById('hint-box');
    if (hintBox) hintBox.classList.add('hidden');
  }

  hideFeedback() {
    const fb = document.getElementById('feedback-container');
    if (fb) fb.classList.add('hidden');
  }

  disableQuestionInputs() {
    const answerArea = document.getElementById('interactive-answer-area');
    if (answerArea) {
      answerArea.querySelectorAll('button, input').forEach(el => {
        el.disabled = true;
      });
    }
  }

  // ==========================================
  // SAYAÇ VE ZAMAN YÖNETİMİ
  // ==========================================
  startTimer() {
    this.stopTimer();
    this.state.isPaused = false;

    if (this.state.isInfiniteTime) {
      this.updateTimerDisplay();
      return;
    }

    this.updateTimerDisplay();
    this.state.timerInterval = setInterval(() => {
      if (this.state.isPaused) return;

      this.state.timerRemaining--;
      this.updateTimerDisplay();

      // Son 5 saniyede tık sesi
      if (this.state.timerRemaining <= 5 && this.state.timerRemaining > 0) {
        if (window.soundEngine) window.soundEngine.playTick();
      }

      // Süre bittiğinde
      if (this.state.timerRemaining <= 0) {
        this.stopTimer();
        if (window.soundEngine) window.soundEngine.playTimeUp();
        this.handleTimeUp();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.state.timerInterval) {
      clearInterval(this.state.timerInterval);
      this.state.timerInterval = null;
    }
  }

  togglePause() {
    this.state.isPaused = !this.state.isPaused;
    const btn = document.getElementById('btn-pause-timer');
    if (btn) {
      btn.innerHTML = this.state.isPaused ? "▶️ Devam" : "⏸️ Duraklat";
    }
  }

  updateTimerDisplay() {
    const secEl = document.getElementById('timer-seconds');
    const circleEl = document.getElementById('timer-progress-circle');
    if (!secEl) return;

    if (this.state.isInfiniteTime) {
      secEl.innerText = "♾️";
      if (circleEl) circleEl.style.strokeDashoffset = "0";
      return;
    }

    secEl.innerText = Math.max(0, this.state.timerRemaining);

    if (circleEl) {
      const total = this.state.timerDuration || 30;
      const progress = Math.max(0, this.state.timerRemaining) / total;
      const circumference = 264; // 2 * pi * 42
      const offset = circumference * (1 - progress);
      circleEl.style.strokeDashoffset = offset;

      if (this.state.timerRemaining <= 5) {
        circleEl.style.stroke = "#ef4444";
      } else if (this.state.timerRemaining <= 10) {
        circleEl.style.stroke = "#f59e0b";
      } else {
        circleEl.style.stroke = "#10b981";
      }
    }
  }

  handleTimeUp() {
    // Süre dolduğunda şık ve non-blocking bildirim göster
    this.state.questionAttempt = 2; // Doğrudan cevabı aç
    this.handleWrongAnswerAttempt();
  }

  skipCurrentQuestion() {
    this.stopTimer();
    this.advanceToNextTurn();
  }

  startAutoAdvance() {
    this.clearAutoAdvance();
    this.state.autoAdvanceRemaining = 5;
    const nextBtn = document.getElementById('btn-feedback-next');
    const nextTeamName = (this.state.activeTeam === 'pink') ? "Mavi Takım" : "Pembe Takım";

    this.state.autoAdvanceInterval = setInterval(() => {
      this.state.autoAdvanceRemaining--;
      if (nextBtn) {
        nextBtn.innerHTML = `<span>Sonraki Soru (${this.state.autoAdvanceRemaining}s) (Sıra: ${nextTeamName})</span> <span>➜</span>`;
      }

      if (this.state.autoAdvanceRemaining <= 0) {
        this.clearAutoAdvance();
        this.advanceToNextTurn();
      }
    }, 1000);
  }

  clearAutoAdvance() {
    if (this.state.autoAdvanceInterval) {
      clearInterval(this.state.autoAdvanceInterval);
      this.state.autoAdvanceInterval = null;
    }
  }

  // ==========================================
  // PUAN TABLOSU VE ARAYÜZ GÜNCELLEME
  // ==========================================
  updateScoreboardUI() {
    const pink = this.state.teams.pink;
    const blue = this.state.teams.blue;

    // Skorlar
    document.getElementById('pink-score-val').innerText = pink.score;
    document.getElementById('blue-score-val').innerText = blue.score;

    // Doğru/Yanlış
    document.getElementById('pink-correct-count').innerText = `✓ ${pink.correctCount} Doğru`;
    document.getElementById('pink-wrong-count').innerText = `✕ ${pink.wrongCount} Yanlış`;
    document.getElementById('pink-hint-status').innerText = pink.hintUsedInLevel ? '💡 İpucu: Yok' : '💡 İpucu: Var';

    document.getElementById('blue-correct-count').innerText = `✓ ${blue.correctCount} Doğru`;
    document.getElementById('blue-wrong-count').innerText = `✕ ${blue.wrongCount} Yanlış`;
    document.getElementById('blue-hint-status').innerText = blue.hintUsedInLevel ? '💡 İpucu: Yok' : '💡 İpucu: Var';

    // Rozetler
    const pinkBadges = document.getElementById('pink-badges-list');
    if (pinkBadges) {
      pinkBadges.innerHTML = pink.badges.length > 0 ?
        pink.badges.map(b => `<span class="px-2 py-0.5 rounded-lg bg-pink-500/20 text-pink-300 text-[10px] font-bold border border-pink-500/30">${b}</span>`).join('') :
        `<span class="text-[10px] text-slate-500">Rozet: Başlangıç</span>`;
    }

    const blueBadges = document.getElementById('blue-badges-list');
    if (blueBadges) {
      blueBadges.innerHTML = blue.badges.length > 0 ?
        blue.badges.map(b => `<span class="px-2 py-0.5 rounded-lg bg-sky-500/20 text-sky-300 text-[10px] font-bold border border-sky-500/30">${b}</span>`).join('') :
        `<span class="text-[10px] text-slate-500">Rozet: Başlangıç</span>`;
    }

    // Aktif Takım Vurgusu & Dinamik Banner
    const isPink = (this.state.activeTeam === 'pink');
    const pinkCard = document.getElementById('team-card-pink');
    const blueCard = document.getElementById('team-card-blue');
    const pinkBadge = document.getElementById('pink-turn-badge');
    const blueBadge = document.getElementById('blue-turn-badge');
    const turnBanner = document.getElementById('active-turn-banner');
    const turnText = document.getElementById('turn-banner-text');

    if (isPink) {
      pinkCard?.classList.add('pink-active-glow');
      pinkCard?.classList.remove('opacity-60');
      blueCard?.classList.remove('blue-active-glow');
      blueCard?.classList.add('opacity-60');

      pinkBadge?.classList.remove('hidden');
      blueBadge?.classList.add('hidden');

      if (turnBanner) {
        turnBanner.className = "w-full py-3.5 px-6 rounded-2xl font-black text-base sm:text-xl font-display text-center uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl transition-all pulse-pink bg-pink-500/20 border-2 border-pink-500 text-pink-300";
      }
      if (turnText) {
        const qNum = (pink.questionIndex % 5) + 1;
        turnText.innerText = `🌸 SIRA: PEMBE TAKIM (Kızlar) • Soru: ${qNum} / 5 • Seviye ${pink.level}`;
      }
    } else {
      blueCard?.classList.add('blue-active-glow');
      blueCard?.classList.remove('opacity-60');
      pinkCard?.classList.remove('pink-active-glow');
      pinkCard?.classList.add('opacity-60');

      blueBadge?.classList.remove('hidden');
      pinkBadge?.classList.add('hidden');

      if (turnBanner) {
        turnBanner.className = "w-full py-3.5 px-6 rounded-2xl font-black text-base sm:text-xl font-display text-center uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl transition-all pulse-blue bg-sky-500/20 border-2 border-sky-500 text-sky-300";
      }
      if (turnText) {
        const qNum = (blue.questionIndex % 5) + 1;
        turnText.innerText = `⚡ SIRA: MAVİ TAKIM (Erkekler) • Soru: ${qNum} / 5 • Seviye ${blue.level}`;
      }
    }

    // Üst Seviye Adım Haplarını Güncelle
    const currentActiveLevel = Math.max(pink.level, blue.level);
    for (let i = 1; i <= 4; i++) {
      const stepPill = document.getElementById(`step-pill-${i}`);
      if (!stepPill) continue;
      if (i < currentActiveLevel) {
        stepPill.className = "step-pill flex-1 min-w-[130px] p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-center transition-all text-emerald-300";
      } else if (i === currentActiveLevel) {
        stepPill.className = "step-pill flex-1 min-w-[130px] p-2 rounded-xl bg-purple-500/25 border-2 border-purple-500 text-center transition-all text-purple-200 shadow-lg shadow-purple-500/20";
      } else {
        stepPill.className = "step-pill flex-1 min-w-[130px] p-2 rounded-xl bg-white/5 border border-white/10 text-center transition-all text-slate-500";
      }
    }
  }

  // ==========================================
  // OYUN BİTİŞİ VE ŞAMPİYONLUK MODALI
  // ==========================================
  checkGameCompletion() {
    const pink = this.state.teams.pink;
    const blue = this.state.teams.blue;

    if (pink.score === blue.score && !this.state.isGoldenQuestion) {
      // Eşitlik durumu -> Altın Soru
      document.getElementById('golden-modal')?.classList.add('open');
      return;
    }

    this.showFinalResults(false);
  }

  showFinalResults(isManualOpen = false) {
    this.stopTimer();
    this.clearAutoAdvance();

    if (window.soundEngine) window.soundEngine.playVictory();
    this.triggerConfetti(150);

    const pink = this.state.teams.pink;
    const blue = this.state.teams.blue;
    const modal = document.getElementById('results-modal');
    const titleEl = document.getElementById('winner-team-title');
    const descEl = document.getElementById('winner-description');
    const tableBody = document.getElementById('results-table-body');
    const kazanimEl = document.getElementById('kazanim-evaluation-content');

    let winnerText = "TEBRİKLER! BERABERLİK!";
    if (pink.score > blue.score) {
      winnerText = "🏆 ŞAMPİYON: PEMBE TAKIM (Kızlar)";
    } else if (blue.score > pink.score) {
      winnerText = "🏆 ŞAMPİYON: MAVİ TAKIM (Erkekler)";
    }

    if (titleEl) titleEl.innerText = winnerText;
    if (descEl) {
      descEl.innerText = isManualOpen ?
        "Öğretmen Masasından canlı turnuva kazanım değerlendirme raporu görüntülendi." :
        "Her iki takım da 8. sınıf Üslü İfadeler ünitesindeki seviyeleri tamamladı. Üstün matematiksel akıl yürütme beceriniz için tebrikler!";
    }

    if (tableBody) {
      tableBody.innerHTML = `
        <tr class="hover:bg-white/5 transition-colors">
          <td class="p-3 font-bold text-pink-400">🌸 Pembe Takım (Kızlar)</td>
          <td class="p-3 font-black text-white">${pink.score} Puan</td>
          <td class="p-3 text-emerald-400 font-bold">${pink.correctCount}</td>
          <td class="p-3 text-rose-400 font-bold">${pink.wrongCount}</td>
          <td class="p-3 text-xs">${pink.badges.join(', ') || 'Katılım Rozeti'}</td>
        </tr>
        <tr class="hover:bg-white/5 transition-colors">
          <td class="p-3 font-bold text-sky-400">⚡ Mavi Takım (Erkekler)</td>
          <td class="p-3 font-black text-white">${blue.score} Puan</td>
          <td class="p-3 text-emerald-400 font-bold">${blue.correctCount}</td>
          <td class="p-3 text-rose-400 font-bold">${blue.wrongCount}</td>
          <td class="p-3 text-xs">${blue.badges.join(', ') || 'Katılım Rozeti'}</td>
        </tr>
      `;
    }

    if (kazanimEl) {
      kazanimEl.innerHTML = `
        <div class="font-bold text-white mb-1.5 flex items-center gap-1.5">
          <span>📋</span> MEB 8. Sınıf Üslü İfadeler Kazanım Başarı Karnesi:
        </div>
        <ul class="space-y-1.5 text-[11px] sm:text-xs">
          <li class="flex items-start gap-2">
            <span class="text-emerald-400 font-black">✓</span>
            <div><strong>M.8.1.2.1 (Tam Sayı Kuvvetleri):</strong> Taban işareti, çift/tek kuvvetler ve sıfırıncı kuvvet kuralları kavrandı.</div>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-emerald-400 font-black">✓</span>
            <div><strong>M.8.1.2.2 (Üslü İşlemler):</strong> Aynı tabanlı çarpmada üsleri toplama, bölmede çıkarma ve üssün üssü başarıyla uygulandı.</div>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-emerald-400 font-black">✓</span>
            <div><strong>M.8.1.2.3 & M.8.1.2.4 (Basamak & Ondalık Çözümleme):</strong> 10'un kuvvetleri ile basamak analizi kavrandı.</div>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-emerald-400 font-black">✓</span>
            <div><strong>M.8.1.2.5 (Bilimsel Gösterim):</strong> 1 ≤ |a| &lt; 10 şartı ve yeni nesil problem çözme adımları uygulandı.</div>
          </li>
        </ul>
        <div class="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px]">
          <strong>💡 Öğretmen Notu & Pekiştirme Önerisi:</strong> Negatif tabanlı ifadelerde parantezin varlığı (-a)<sup>n</sup> ile parantezsiz durum -a<sup>n</sup> arasındaki işaret farkını akıllı tahtada pekiştirici 2-3 örnekle tekrarlayabilirsiniz.
        </div>
      `;
    }

    if (modal) modal.classList.add('open');
  }

  // ==========================================
  // RESMİ RAPORU YAZDIRMA (PRINT / PDF)
  // ==========================================
  printOfficialReport() {
    const printContainer = document.getElementById('print-report-container');
    const printContent = document.getElementById('print-content');
    const printDate = document.getElementById('print-date');
    if (!printContainer || !printContent) return;

    const pink = this.state.teams.pink;
    const blue = this.state.teams.blue;

    if (printDate) {
      printDate.innerText = `Tarih: ${new Date().toLocaleDateString('tr-TR')} • Düzenleyen: Merve Samak Akademi`;
    }

    printContent.innerHTML = `
      <div style="margin-bottom: 15px;">
        <h3 style="font-size: 15px; margin: 0 0 5px 0;">Turnuva Genel Sonuçları</h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 12px;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid #000;">
              <th style="padding: 6px; border: 1px solid #ddd;">Takım</th>
              <th style="padding: 6px; border: 1px solid #ddd;">Toplam Puan</th>
              <th style="padding: 6px; border: 1px solid #ddd;">Doğru</th>
              <th style="padding: 6px; border: 1px solid #ddd;">Yanlış</th>
              <th style="padding: 6px; border: 1px solid #ddd;">Kazanılan Rozetler</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 6px; border: 1px solid #ddd;"><strong>🌸 Pembe Takım (Kızlar)</strong></td>
              <td style="padding: 6px; border: 1px solid #ddd;">${pink.score} Puan</td>
              <td style="padding: 6px; border: 1px solid #ddd;">${pink.correctCount}</td>
              <td style="padding: 6px; border: 1px solid #ddd;">${pink.wrongCount}</td>
              <td style="padding: 6px; border: 1px solid #ddd;">${pink.badges.join(', ') || 'Katılım'}</td>
            </tr>
            <tr>
              <td style="padding: 6px; border: 1px solid #ddd;"><strong>⚡ Mavi Takım (Erkekler)</strong></td>
              <td style="padding: 6px; border: 1px solid #ddd;">${blue.score} Puan</td>
              <td style="padding: 6px; border: 1px solid #ddd;">${blue.correctCount}</td>
              <td style="padding: 6px; border: 1px solid #ddd;">${blue.wrongCount}</td>
              <td style="padding: 6px; border: 1px solid #ddd;">${blue.badges.join(', ') || 'Katılım'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin-top: 15px;">
        <h3 style="font-size: 14px; margin: 0 0 5px 0;">Kazanım Başarı Özeti:</h3>
        <ul style="padding-left: 20px; font-size: 12px; line-height: 1.6;">
          <li><strong>M.8.1.2.1:</strong> Tam sayıların pozitif, negatif ve sıfırıncı kuvvetleri.</li>
          <li><strong>M.8.1.2.2:</strong> Üslü ifadelerle çarpma, bölme ve üssün üssü kuralları.</li>
          <li><strong>M.8.1.2.3:</strong> Sayıların ondalık gösterimlerini 10'un tam sayı kuvvetleri ile çözümleme.</li>
          <li><strong>M.8.1.2.5:</strong> Bilimsel gösterim ve yeni nesil problem çözme adımları.</li>
        </ul>
      </div>

      <div style="margin-top: 25px; display: flex; justify-content: space-between; font-size: 12px;">
        <div>Matematik Öğretmeni: Merve Samak</div>
        <div>İmza: .......................................</div>
      </div>
    `;

    window.print();
  }

  jumpToLevel(levelNum) {
    this.state.isGoldenQuestion = false;
    this.state.teams.pink.level = levelNum;
    this.state.teams.pink.questionIndex = 0;
    this.state.teams.blue.level = levelNum;
    this.state.teams.blue.questionIndex = 0;
    this.loadQuestionForActiveTeam();
  }

  // ==========================================
  // YARDIMCI VE KATEX MATEMATİK METOTLARI
  // ==========================================
  formatMathText(str) {
    if (!str) return "";
    return str;
  }

  triggerKaTeX(container) {
    if (!container) return;
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(container, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false
      });
    }
  }

  triggerConfetti(count = 80) {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: count,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }

  getQuestionTypeLabel(type) {
    switch (type) {
      case 'multiple_choice': return 'Dört Seçenekli Soru';
      case 'true_false': return 'Doğru - Yanlış';
      case 'fill_blank': return 'Boşluk Doldurma / Değer';
      case 'find_error': return 'Hatalı Adımı Bulma';
      case 'matching': return 'Denk İfade Eşleştirme';
      default: return 'Matematik Sorusu';
    }
  }
}

// Global referans ve DOM Yüklendiğinde Başlat
window.MathArenaGame = MathArenaGame;

window.addEventListener('DOMContentLoaded', () => {
  window.arenaGame = new MathArenaGame();
});
