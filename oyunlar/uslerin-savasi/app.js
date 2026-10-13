/**
 * DİJİTAL MATEMATİK YARIŞMASI: ÜSLERİN SAVAŞI
 * Ana Oyun Motoru, Durum Yönetimi ve Akıllı Tahta Mantığı
 */

class MathArenaGame {
  constructor() {
    this.state = {
      activeTeam: 'pink', // 'pink' veya 'blue'
      currentLevelNum: 1,  // 1, 2, 3, 4
      questionAttempt: 0, // 0: ilk hak, 1: ikinci hak (ipucu sonrası)
      isPaused: false,
      isInfiniteTime: false,
      timerDuration: 30,
      timerRemaining: 30,
      timerInterval: null,
      isGoldenQuestion: false,
      goldenIndex: 0,

      // Takım Durumları
      teams: {
        pink: {
          name: "Pembe Takım (Kızlar)",
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

      // Aktif soru referansı ve eşleştirme geçici durumu
      currentQuestion: null,
      matchingState: {
        selectedLeft: null,
        selectedRight: null,
        matchedPairs: []
      }
    };

    this.confettiCanvas = null;
    this.confettiCtx = null;
    this.confettiParticles = [];

    this.init();
  }

  init() {
    this.initConfetti();
    this.bindEvents();
    this.updateScoreboardUI();
    this.loadQuestionForActiveTeam();
  }

  // ==========================================
  // KONFETİ EFEKTİ SİSTEMİ
  // ==========================================
  initConfetti() {
    this.confettiCanvas = document.getElementById('confetti-canvas');
    if (!this.confettiCanvas) return;
    this.confettiCtx = this.confettiCanvas.getContext('2d');
    this.resizeConfetti();
    window.addEventListener('resize', () => this.resizeConfetti());
  }

  resizeConfetti() {
    if (!this.confettiCanvas) return;
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;
  }

  triggerConfetti(count = 70) {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    const colors = ['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ffffff'];
    for (let i = 0; i < count; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.confettiCanvas.width,
        y: Math.random() * (this.confettiCanvas.height * 0.4),
        r: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngle: 0,
        tiltAngleIncremental: (Math.random() * 0.08) + 0.04,
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 4 + 3,
        opacity: 1
      });
    }

    if (!this.confettiRunning) {
      this.confettiRunning = true;
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.confettiCtx) return;
    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    for (let i = 0; i < this.confettiParticles.length; i++) {
      const p = this.confettiParticles[i];
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += p.speedY;
      p.x += p.speedX;
      p.tilt = Math.sin(p.tiltAngle) * 12;

      this.confettiCtx.beginPath();
      this.confettiCtx.lineWidth = p.r / 1.5;
      this.confettiCtx.strokeStyle = p.color;
      this.confettiCtx.moveTo(p.x + p.tilt + p.r, p.y);
      this.confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
      this.confettiCtx.stroke();
    }

    this.confettiParticles = this.confettiParticles.filter(p => p.y < this.confettiCanvas.height);

    if (this.confettiParticles.length > 0) {
      requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.confettiRunning = false;
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
  }

  // ==========================================
  // EVENT LISTENER BAĞLANTILARI
  // ==========================================
  bindEvents() {
    // Ses Aç/Kapat Butonu
    const muteBtn = document.getElementById('btn-mute');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = window.soundEngine.toggleMute();
        muteBtn.innerHTML = isMuted ? '🔇 Ses: Kapalı' : '🔊 Ses: Açık';
      });
    }

    // Tam Ekran Butonu (Akıllı Tahta için)
    const fsBtn = document.getElementById('btn-fullscreen');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
          fsBtn.innerHTML = '⛶ Tam Ekran Çık';
        } else {
          document.exitFullscreen().catch(() => {});
          fsBtn.innerHTML = '⛶ Tam Ekran';
        }
      });
    }

    // Öğretmen Masası Açma Butonu
    const teacherBtn = document.getElementById('btn-teacher-panel');
    const teacherModal = document.getElementById('teacher-modal');
    const closeTeacherBtn = document.getElementById('btn-close-teacher');
    if (teacherBtn && teacherModal) {
      teacherBtn.addEventListener('click', () => {
        window.soundEngine.playClick();
        teacherModal.classList.add('open');
      });
    }
    if (closeTeacherBtn && teacherModal) {
      closeTeacherBtn.addEventListener('click', () => {
        teacherModal.classList.remove('open');
      });
    }

    // Süre Duraklat / Başlat
    const pauseBtn = document.getElementById('btn-pause-timer');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        this.togglePause();
      });
    }

    // İpucu Butonu
    const hintBtn = document.getElementById('btn-use-hint');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        this.useLifelineHint();
      });
    }

    // Dönüt Butonları (Tekrar Dene & Sonraki Soru)
    const retryBtn = document.getElementById('btn-feedback-retry');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.retryCurrentQuestion();
      });
    }

    const nextBtn = document.getElementById('btn-feedback-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.advanceToNextTurn();
      });
    }

    // Öğretmen Masası Özel Kontrolleri
    this.bindTeacherControls();
  }

  bindTeacherControls() {
    // +15 Saniye Ekle
    document.getElementById('t-btn-add-time')?.addEventListener('click', () => {
      this.state.timerRemaining += 15;
      this.updateTimerDisplay();
    });

    // Doğru Kabul Et
    document.getElementById('t-btn-force-correct')?.addEventListener('click', () => {
      this.handleCorrectAnswer(true);
    });

    // Yanlış Kabul Et
    document.getElementById('t-btn-force-wrong')?.addEventListener('click', () => {
      this.handleFinalWrongAnswer(true);
    });

    // Cevabı Göster
    document.getElementById('t-btn-reveal')?.addEventListener('click', () => {
      this.revealAnswerByTeacher();
    });

    // Soruyu Atla
    document.getElementById('t-btn-skip')?.addEventListener('click', () => {
      this.advanceToNextTurn();
      document.getElementById('teacher-modal')?.classList.remove('open');
    });

    // Puan Ekleme / Çıkarma
    document.getElementById('t-pink-add10')?.addEventListener('click', () => this.adjustScore('pink', 10));
    document.getElementById('t-pink-sub10')?.addEventListener('click', () => this.adjustScore('pink', -10));
    document.getElementById('t-blue-add10')?.addEventListener('click', () => this.adjustScore('blue', 10));
    document.getElementById('t-blue-sub10')?.addEventListener('click', () => this.adjustScore('blue', -10));

    // Seviye Atlama Butonları
    document.querySelectorAll('.t-jump-level').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lvl = parseInt(e.target.dataset.level);
        this.jumpToLevel(lvl);
        document.getElementById('teacher-modal')?.classList.remove('open');
      });
    });

    // Altın Soru Başlat
    document.getElementById('t-btn-golden')?.addEventListener('click', () => {
      this.startGoldenQuestion();
      document.getElementById('teacher-modal')?.classList.remove('open');
    });

    // Süre Modu Seçici
    document.getElementById('t-select-timer')?.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'infinite') {
        this.state.isInfiniteTime = true;
      } else {
        this.state.isInfiniteTime = false;
        this.state.timerDuration = parseInt(val);
        this.state.timerRemaining = parseInt(val);
      }
      this.updateTimerDisplay();
    });

    // Oyunu Sıfırla
    document.getElementById('t-btn-reset-game')?.addEventListener('click', () => {
      if (confirm("Yarışmayı tamamen sıfırlamak istediğinize emin misiniz? Tüm puanlar ve seviyeler sıfırlanacaktır.")) {
        this.resetGame();
        document.getElementById('teacher-modal')?.classList.remove('open');
      }
    });

    // Kazanım Raporunu Görüntüle
    document.getElementById('t-btn-view-report')?.addEventListener('click', () => {
      this.showFinalResultsModal(true);
      document.getElementById('teacher-modal')?.classList.remove('open');
    });
  }

  // ==========================================
  // OYUN DURUMU & SORU YÜKLEME
  // ==========================================
  loadQuestionForActiveTeam() {
    this.hideFeedback();
    this.state.questionAttempt = 0;

    // Her iki takım da tamamladıysa oyunu sonlandır
    if (this.state.teams.pink.completedAllLevels && this.state.teams.blue.completedAllLevels) {
      this.checkGameCompletion();
      return;
    }

    // Eğer aktif takım tüm seviyeleri bitirdiyse, sırayı henüz bitirmeyen takıma devret
    if (!this.state.isGoldenQuestion && this.state.teams[this.state.activeTeam].completedAllLevels) {
      this.state.activeTeam = (this.state.activeTeam === 'pink') ? 'blue' : 'pink';
    }

    const team = this.state.teams[this.state.activeTeam];
    const lvlKey = `level${team.level}`;
    const levelData = QUESTION_BANK[lvlKey];

    if (!levelData && !this.state.isGoldenQuestion) {
      this.checkGameCompletion();
      return;
    }

    // Süreyi seviyeye göre ayarla (varsayılan: L1-L2 30sn, L3-L4 60sn)
    if (!this.state.isInfiniteTime) {
      const timeLimit = this.state.isGoldenQuestion ? 45 : (levelData ? levelData.timeLimit : 30);
      this.state.timerDuration = timeLimit;
      this.state.timerRemaining = timeLimit;
    }

    let q = null;
    if (this.state.isGoldenQuestion) {
      q = QUESTION_BANK.golden[this.state.goldenIndex % QUESTION_BANK.golden.length];
    } else if (team.isRetryMode) {
      q = levelData.retry[team.retryIndex % levelData.retry.length];
    } else {
      const pool = levelData[this.state.activeTeam];
      q = pool[team.questionIndex % pool.length];
    }

    this.state.currentQuestion = q;
    this.renderQuestion(q, levelData);
    this.startTimer();
    this.updateScoreboardUI();
  }

  renderQuestion(q, levelData) {
    const stageEl = document.getElementById('question-stage-content');
    if (!stageEl) return;

    const team = this.state.teams[this.state.activeTeam];
    const teamColorClass = this.state.activeTeam === 'pink' ? 'pink' : 'blue';
    const teamTitle = this.state.activeTeam === 'pink' ? '🌸 PEMBE TAKIM (Kızlar)' : '⚡ MAVİ TAKIM (Erkekler)';
    const points = this.state.isGoldenQuestion ? 50 : levelData.points;
    const levelName = this.state.isGoldenQuestion ? "ALTIN SORU / EŞİTLİK BOZMA" : levelData.name;

    // Soru üst meta barı
    let html = `
      <div class="question-meta-bar">
        <div class="meta-badges">
          <span class="pill-level">${levelName}</span>
          <span class="pill-type">${this.getQuestionTypeLabel(q.type)}</span>
          <span class="pill-points">+${points} PUAN</span>
        </div>
        <div class="active-team-banner ${teamColorClass}">
          ${teamTitle}
        </div>
      </div>

      <div class="question-content">
        <div class="question-title-text">${q.title}</div>
        <div class="question-text">${q.text}</div>
        <div id="interactive-answer-area">
    `;

    // Soru türüne göre etkileşim alanı
    if (q.type === 'multiple_choice') {
      html += `<div class="options-grid">`;
      q.options.forEach(opt => {
        html += `
          <button class="option-btn" data-key="${opt.key}">
            <span class="option-letter">${opt.key}</span>
            <span class="option-label">${opt.text}</span>
          </button>
        `;
      });
      html += `</div>`;
    } 
    else if (q.type === 'true_false') {
      html += `
        <div class="tf-grid">
          <button class="tf-btn true-btn" data-key="D">
            <span>✅</span> DOĞRU
          </button>
          <button class="tf-btn false-btn" data-key="Y">
            <span>❌</span> YANLIŞ
          </button>
        </div>
      `;
    }
    else if (q.type === 'fill_blank') {
      html += `
        <div class="fill-blank-container">
          <div class="fill-input-wrapper">
            <input type="text" id="fill-input-box" class="fill-input" placeholder="Cevabınızı giriniz..." readonly />
            <button id="btn-submit-fill" class="btn-submit-answer">GÖNDER</button>
          </div>
          <div class="virtual-keypad">
            <button class="keypad-btn" data-val="1">1</button>
            <button class="keypad-btn" data-val="2">2</button>
            <button class="keypad-btn" data-val="3">3</button>
            <button class="keypad-btn action-key" id="kp-backspace">⌫ Sil</button>
            <button class="keypad-btn" data-val="4">4</button>
            <button class="keypad-btn" data-val="5">5</button>
            <button class="keypad-btn" data-val="6">6</button>
            <button class="keypad-btn" data-val="-">- (Eksi)</button>
            <button class="keypad-btn" data-val="7">7</button>
            <button class="keypad-btn" data-val="8">8</button>
            <button class="keypad-btn" data-val="9">9</button>
            <button class="keypad-btn" data-val=",">, (Virgül)</button>
            <button class="keypad-btn" data-val="0">0</button>
            <button class="keypad-btn" data-val="/">/ (Bölü)</button>
            <button class="keypad-btn action-key" id="kp-clear" style="grid-column: span 2;">Temizle</button>
          </div>
        </div>
      `;
    }
    else if (q.type === 'find_error') {
      html += `<div class="steps-list">`;
      q.steps.forEach(step => {
        html += `
          <div class="step-card" data-step="${step.stepNum}">
            <span class="step-text">${step.text}</span>
            <span class="step-badge">Hata Bu Adımda ➜</span>
          </div>
        `;
      });
      html += `</div>`;
    }
    else if (q.type === 'matching') {
      html += `
        <div class="matching-board">
          <div class="matching-col" id="match-col-left"></div>
          <div class="matching-col" id="match-col-right"></div>
        </div>
      `;
    }

    html += `
        </div>
      </div>
    `;

    stageEl.innerHTML = html;

    // Etkileşim dinleyicilerini kur
    this.attachQuestionInteractions(q);
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

  attachQuestionInteractions(q) {
    if (q.type === 'multiple_choice') {
      document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const key = btn.dataset.key;
          this.submitAnswer(key, btn);
        });
      });
    }
    else if (q.type === 'true_false') {
      document.querySelectorAll('.tf-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.key;
          this.submitAnswer(key, btn);
        });
      });
    }
    else if (q.type === 'fill_blank') {
      const input = document.getElementById('fill-input-box');
      const submitBtn = document.getElementById('btn-submit-fill');

      // Sanal tuş takımı butonları
      document.querySelectorAll('.keypad-btn[data-val]').forEach(kBtn => {
        kBtn.addEventListener('click', () => {
          window.soundEngine.playClick();
          input.value += kBtn.dataset.val;
        });
      });

      document.getElementById('kp-backspace')?.addEventListener('click', () => {
        window.soundEngine.playClick();
        input.value = input.value.slice(0, -1);
      });

      document.getElementById('kp-clear')?.addEventListener('click', () => {
        window.soundEngine.playClick();
        input.value = '';
      });

      // Klavye ile yazabilme desteği
      input.removeAttribute('readonly');
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.submitAnswer(input.value.trim(), submitBtn);
        }
      });

      submitBtn?.addEventListener('click', () => {
        this.submitAnswer(input.value.trim(), submitBtn);
      });
    }
    else if (q.type === 'find_error') {
      document.querySelectorAll('.step-card').forEach(card => {
        card.addEventListener('click', () => {
          const stepNum = card.dataset.step;
          this.submitAnswer(stepNum, card);
        });
      });
    }
    else if (q.type === 'matching') {
      this.setupMatchingBoard(q);
    }
  }

  setupMatchingBoard(q) {
    const leftCol = document.getElementById('match-col-left');
    const rightCol = document.getElementById('match-col-right');
    if (!leftCol || !rightCol) return;

    this.state.matchingState = {
      selectedLeft: null,
      selectedRight: null,
      matchedPairs: []
    };

    // Sol ve sağ listeleri hazırla (sağ tarafı karıştır)
    const leftItems = q.pairs.map((p, i) => ({ id: i, text: p.left }));
    const rightItems = [...q.pairs.map((p, i) => ({ id: i, text: p.right }))].sort(() => Math.random() - 0.5);

    leftCol.innerHTML = leftItems.map(item => `
      <div class="match-item match-left" data-id="${item.id}">${item.text}</div>
    `).join('');

    rightCol.innerHTML = rightItems.map(item => `
      <div class="match-item match-right" data-id="${item.id}">${item.text}</div>
    `).join('');

    // Tıklama olayları
    leftCol.querySelectorAll('.match-left').forEach(el => {
      el.addEventListener('click', () => {
        if (el.classList.contains('paired')) return;
        window.soundEngine.playClick();
        leftCol.querySelectorAll('.match-left').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        this.state.matchingState.selectedLeft = parseInt(el.dataset.id);
        this.checkMatchingPair(q);
      });
    });

    rightCol.querySelectorAll('.match-right').forEach(el => {
      el.addEventListener('click', () => {
        if (el.classList.contains('paired')) return;
        window.soundEngine.playClick();
        rightCol.querySelectorAll('.match-right').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        this.state.matchingState.selectedRight = parseInt(el.dataset.id);
        this.checkMatchingPair(q);
      });
    });
  }

  checkMatchingPair(q) {
    const { selectedLeft, selectedRight } = this.state.matchingState;
    if (selectedLeft === null || selectedRight === null) return;

    if (selectedLeft === selectedRight) {
      // Doğru eşleşme
      window.soundEngine.playClick();
      const leftEl = document.querySelector(`.match-left[data-id="${selectedLeft}"]`);
      const rightEl = document.querySelector(`.match-right[data-id="${selectedRight}"]`);

      leftEl.classList.remove('selected');
      rightEl.classList.remove('selected');
      leftEl.classList.add('paired');
      rightEl.classList.add('paired');

      this.state.matchingState.matchedPairs.push(selectedLeft);
      this.state.matchingState.selectedLeft = null;
      this.state.matchingState.selectedRight = null;

      // Tüm eşleşmeler bitti mi?
      if (this.state.matchingState.matchedPairs.length === q.pairs.length) {
        this.handleCorrectAnswer();
      }
    } else {
      // Hatalı eşleşme
      window.soundEngine.playWrong();
      const leftEl = document.querySelector(`.match-left[data-id="${selectedLeft}"]`);
      const rightEl = document.querySelector(`.match-right[data-id="${selectedRight}"]`);

      leftEl.classList.add('wrong-choice');
      rightEl.classList.add('wrong-choice');

      setTimeout(() => {
        leftEl.classList.remove('selected', 'wrong-choice');
        rightEl.classList.remove('selected', 'wrong-choice');
        this.state.matchingState.selectedLeft = null;
        this.state.matchingState.selectedRight = null;
      }, 700);

      // Yanlış deneme olarak işlet
      this.handleWrongAnswerAttempt();
    }
  }

  // ==========================================
  // CEVAP KONTROLÜ VE ÖĞRETİCİ DÖNÜT SİSTEMİ
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
      if (targetElement) targetElement.classList.add('correct-choice');
      this.handleCorrectAnswer();
    } else {
      if (targetElement) targetElement.classList.add('wrong-choice');
      this.handleWrongAnswerAttempt();
    }
  }

  handleCorrectAnswer(isTeacherForce = false) {
    this.stopTimer();
    window.soundEngine.playCorrect();
    this.triggerConfetti(90);

    const team = this.state.teams[this.state.activeTeam];
    const lvlKey = `level${team.level}`;
    const levelData = QUESTION_BANK[lvlKey];
    const points = this.state.isGoldenQuestion ? 50 : (levelData ? levelData.points : 10);

    team.score += points;
    team.correctCount++;
    if (team.levelStats[team.level]) {
      team.levelStats[team.level].c++;
      team.levelStats[team.level].t++;
    }

    this.updateScoreboardUI();

    // Doğru Dönüt Kutusunu Göster
    const feedbackEl = document.getElementById('feedback-container');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const retryBtn = document.getElementById('btn-feedback-retry');
    const nextBtn = document.getElementById('btn-feedback-next');

    feedbackEl.className = 'feedback-box correct';
    feedbackTitle.innerHTML = `🌟 HARİKA! DOĞRU CEVAP (+${points} PUAN)`;
    feedbackText.innerHTML = isTeacherForce ? 
      "Öğretmen tarafından cevap DOĞRU olarak onaylandı. Puan takıma eklendi!" : 
      this.state.currentQuestion.feedbackCorrect;

    retryBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    nextBtn.innerText = "Sonraki Soruya Geç ➜";

    this.disableQuestionInputs();
  }

  handleWrongAnswerAttempt() {
    this.stopTimer();
    const q = this.state.currentQuestion;
    const team = this.state.teams[this.state.activeTeam];

    if (this.state.questionAttempt === 0) {
      // 1. Yanlış Hak: İpucu göster ve bir kez daha deneme fırsatı ver
      this.state.questionAttempt = 1;
      window.soundEngine.playWrong();

      const feedbackEl = document.getElementById('feedback-container');
      const feedbackTitle = document.getElementById('feedback-title');
      const feedbackText = document.getElementById('feedback-text');
      const retryBtn = document.getElementById('btn-feedback-retry');
      const nextBtn = document.getElementById('btn-feedback-next');

      feedbackEl.className = 'feedback-box wrong-retry';
      feedbackTitle.innerHTML = `⚠️ HENÜZ OLMADI! BİR ŞANSIN DAHA VAR!`;
      feedbackText.innerHTML = `
        <p><strong>Öğretici İpucu:</strong> ${q.feedbackWrong}</p>
        <p style="margin-top: 8px; font-size: 0.95rem; color: #fde68a;">
          Takım arkadaşlarınla kısaca tartış ve cevabını tekrar gözden geçir!
        </p>
      `;

      retryBtn.style.display = 'inline-block';
      retryBtn.innerText = "Tekrar Dene 🔄";
      nextBtn.style.display = 'none';

      this.disableQuestionInputs();
    } else {
      // 2. Yanlış Hak: Nihai yanlış, çözümü göster, puan verme
      this.handleFinalWrongAnswer();
    }
  }

  handleFinalWrongAnswer(isTeacherForce = false) {
    this.stopTimer();
    window.soundEngine.playWrong();

    const q = this.state.currentQuestion;
    const team = this.state.teams[this.state.activeTeam];
    team.wrongCount++;
    if (team.levelStats[team.level]) {
      team.levelStats[team.level].t++;
    }

    this.updateScoreboardUI();

    const feedbackEl = document.getElementById('feedback-container');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const retryBtn = document.getElementById('btn-feedback-retry');
    const nextBtn = document.getElementById('btn-feedback-next');

    feedbackEl.className = 'feedback-box wrong-final';
    feedbackTitle.innerHTML = `❌ BU SEFER OLMADI, AMA ÖĞRENMEK İÇİN HARİKA BİR FIRSAT!`;
    feedbackText.innerHTML = `
      <p><strong>Doğru Çözüm:</strong> ${q.feedbackCorrect}</p>
      <p style="margin-top: 8px; font-size: 0.95rem; color: #cbd5e1;">
        ${isTeacherForce ? "Öğretmen müdahalesi ile soru tamamlandı." : "Yanlış cevaplar için eksi puan verilmez. Önemli olan adımları anlamak ve bir sonraki turda kuralları doğru uygulamaktır!"}
      </p>
    `;

    retryBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    nextBtn.innerText = "Sıradaki Takıma Geç ➜";

    this.disableQuestionInputs();
  }

  retryCurrentQuestion() {
    this.hideFeedback();
    // Butonları tekrar aktif hale getir
    this.enableQuestionInputs();
    // Süreyi yarım süreyle tekrar başlat
    this.state.timerRemaining = Math.max(15, Math.floor(this.state.timerDuration / 2));
    this.startTimer();
  }

  revealAnswerByTeacher() {
    this.stopTimer();
    const q = this.state.currentQuestion;
    const feedbackEl = document.getElementById('feedback-container');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const retryBtn = document.getElementById('btn-feedback-retry');
    const nextBtn = document.getElementById('btn-feedback-next');

    feedbackEl.className = 'feedback-box wrong-retry';
    feedbackTitle.innerHTML = `💡 ÖĞRETMEN CEVABI AÇTI`;
    feedbackText.innerHTML = `<p><strong>Çözüm ve Açıklama:</strong> ${q.feedbackCorrect}</p>`;

    retryBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    nextBtn.innerText = "Sonraki Soruya Geç ➜";

    this.disableQuestionInputs();
    document.getElementById('teacher-modal')?.classList.remove('open');
  }

  disableQuestionInputs() {
    document.querySelectorAll('.option-btn, .tf-btn, .step-card, .btn-submit-answer, .keypad-btn, .match-item').forEach(btn => {
      btn.disabled = true;
      btn.style.pointerEvents = 'none';
    });
  }

  enableQuestionInputs() {
    document.querySelectorAll('.option-btn, .tf-btn, .step-card, .btn-submit-answer, .keypad-btn, .match-item').forEach(btn => {
      btn.disabled = false;
      btn.style.pointerEvents = 'auto';
      btn.classList.remove('wrong-choice', 'selected');
    });
  }

  hideFeedback() {
    const feedbackEl = document.getElementById('feedback-container');
    if (feedbackEl) feedbackEl.className = 'feedback-box';
  }

  // ==========================================
  // JOKER / İPUCU (LIFELINE) SİSTEMİ
  // ==========================================
  useLifelineHint() {
    const team = this.state.teams[this.state.activeTeam];
    if (team.hintUsedInLevel) {
      alert("Bu seviyedeki tek ipucu hakkınızı zaten kullandınız!");
      return;
    }

    team.hintUsedInLevel = true;
    window.soundEngine.playTone(600, 'sine', 0.2);

    const q = this.state.currentQuestion;
    alert(`💡 İPUCU HAKKI KULLANILDI (Puanınız eksilmez!):\n\n${q.hint}`);

    this.updateScoreboardUI();
  }

  // ==========================================
  // TUR DEĞİŞİMİ VE SEVİYE ATLAMA / TEKRAR KONTROLÜ
  // ==========================================
  advanceToNextTurn() {
    if (this.state.isGoldenQuestion) {
      this.showFinalResultsModal();
      return;
    }

    const currentTeamKey = this.state.activeTeam;
    const team = this.state.teams[currentTeamKey];
    const lvlKey = `level${team.level}`;
    const levelData = QUESTION_BANK[lvlKey];

    // Sorunun tamamlanması
    if (team.isRetryMode) {
      team.retryIndex++;
    } else {
      team.questionIndex++;
    }

    // Seviye bitiş kontrolü: Ana sorular için 5, telafi için telafi havuzu kadar
    const targetQuestions = team.isRetryMode ? (levelData?.retry?.length || 3) : 5;
    const questionsInCurrentLevel = team.isRetryMode ? team.retryIndex : team.questionIndex;

    if (questionsInCurrentLevel >= targetQuestions) {
      this.evaluateLevelProgression(currentTeamKey);
    }

    // Sırayı diğer takıma geçir (eğer diğer takım henüz bitirmediyse)
    const otherTeamKey = (this.state.activeTeam === 'pink') ? 'blue' : 'pink';
    if (!this.state.teams[otherTeamKey].completedAllLevels) {
      this.state.activeTeam = otherTeamKey;
    }

    // Yeni soruyu yükle
    this.loadQuestionForActiveTeam();
  }

  evaluateLevelProgression(teamKey) {
    const team = this.state.teams[teamKey];
    const lvlKey = `level${team.level}`;
    const levelData = QUESTION_BANK[lvlKey];

    const stats = team.levelStats[team.level] || { c: 0, t: 5 };
    const successRatio = stats.t > 0 ? (stats.c / stats.t) : 0;

    if (successRatio >= levelData.minPassRatio) {
      // %70 ve üzeri başarı: Seviye atla & Rozet kazan!
      window.soundEngine.playLevelUp();
      this.triggerConfetti(120);

      const badgeName = this.getBadgeNameForLevel(team.level);
      if (!team.badges.includes(badgeName)) {
        team.badges.push(badgeName);
      }

      alert(`🎉 TEBRİKLER ${team.name.toUpperCase()}!\n\n${levelData.name} seviyesini %${Math.round(successRatio * 100)} başarı oranıyla tamamladınız!\n🌟 Yeni Rozet Kazanıldı: "${badgeName}"\nBir üst seviyeye geçtiniz!`);

      if (team.level < 4) {
        team.level++;
        team.questionIndex = 0;
        team.isRetryMode = false;
        team.retryIndex = 0;
        team.hintUsedInLevel = false; // Yeni seviyede ipucu sıfırlanır
      } else {
        team.completedAllLevels = true;
        this.checkGameCompletion();
      }
    } else {
      // %70 altı başarı: Seviyeyi pekiştirmek için telafi modu!
      window.soundEngine.playWrong();
      alert(`📚 ${team.name.toUpperCase()}:\n\n${levelData.name} seviyesinde başarı oranınız %${Math.round(successRatio * 100)} oldu. Bu seviyedeki kazanımları tam kavramak için 3 adet telafi sorusuyla devam edeceksiniz!`);

      team.isRetryMode = true;
      team.retryIndex = 0;
      team.hintUsedInLevel = false;
      team.levelStats[team.level] = { c: 0, t: 0 }; // Telafi için sıfırdan hesapla
    }
  }

  getBadgeNameForLevel(lvl) {
    switch (lvl) {
      case 1: return "🌟 Isınma Şampiyonu";
      case 2: return "⚡ Üs Ustası";
      case 3: return "🧠 Zekâ Kapısı Fatihi";
      case 4: return "🏆 LGS Efsanesi";
      default: return "🎖️ Matematik Yıldızı";
    }
  }

  // ==========================================
  // ZAMAN SAYACI (TIMER) MOTORU
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
        window.soundEngine.playTick();
      }

      // Süre bittiğinde
      if (this.state.timerRemaining <= 0) {
        this.stopTimer();
        window.soundEngine.playTimeUp();
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
      btn.innerText = this.state.isPaused ? "▶️ Başlat" : "⏸️ Duraklat";
    }
  }

  updateTimerDisplay() {
    const secEl = document.getElementById('timer-seconds');
    const circleEl = document.getElementById('timer-progress-circle');
    if (!secEl || !circleEl) return;

    if (this.state.isInfiniteTime) {
      secEl.innerText = "∞";
      circleEl.style.strokeDashoffset = 0;
      circleEl.className = "timer-progress";
      return;
    }

    secEl.innerText = this.state.timerRemaining;

    // Dairesel SVG stroke ilerlemesi (Çevre: 2 * PI * 45 ≈ 283)
    const total = this.state.timerDuration || 30;
    const ratio = Math.max(0, this.state.timerRemaining / total);
    const offset = 283 - (ratio * 283);
    circleEl.style.strokeDashoffset = offset;

    if (this.state.timerRemaining <= 5) {
      circleEl.className = "timer-progress danger";
    } else if (this.state.timerRemaining <= 10) {
      circleEl.className = "timer-progress warning";
    } else {
      circleEl.className = "timer-progress";
    }
  }

  handleTimeUp() {
    alert("⏰ SÜRE DOLDU! Takımın cevaplama süresi sona erdi.");
    this.handleWrongAnswerAttempt();
  }

  // ==========================================
  // PUAN TABLOSU VE ARAYÜZ GÜNCELLEME
  // ==========================================
  updateScoreboardUI() {
    // Pembe Takım UI
    const pink = this.state.teams.pink;
    document.getElementById('pink-score-val').innerText = pink.score;
    document.getElementById('pink-correct-count').innerText = `${pink.correctCount} Doğru`;
    document.getElementById('pink-wrong-count').innerText = `${pink.wrongCount} Yanlış`;
    document.getElementById('pink-hint-status').innerText = pink.hintUsedInLevel ? 'İpucu: Yok' : 'İpucu: Var';

    const pinkBadgesEl = document.getElementById('pink-badges-list');
    if (pinkBadgesEl) {
      pinkBadgesEl.innerHTML = pink.badges.length > 0 ? 
        pink.badges.map(b => `<span class="badge-tag unlocked">${b}</span>`).join('') :
        `<span class="badge-tag">Henüz rozet yok</span>`;
    }

    // Mavi Takım UI
    const blue = this.state.teams.blue;
    document.getElementById('blue-score-val').innerText = blue.score;
    document.getElementById('blue-correct-count').innerText = `${blue.correctCount} Doğru`;
    document.getElementById('blue-wrong-count').innerText = `${blue.wrongCount} Yanlış`;
    document.getElementById('blue-hint-status').innerText = blue.hintUsedInLevel ? 'İpucu: Yok' : 'İpucu: Var';

    const blueBadgesEl = document.getElementById('blue-badges-list');
    if (blueBadgesEl) {
      blueBadgesEl.innerHTML = blue.badges.length > 0 ? 
        blue.badges.map(b => `<span class="badge-tag unlocked">${b}</span>`).join('') :
        `<span class="badge-tag">Henüz rozet yok</span>`;
    }

    // Aktif Takım Vurgusu
    const pinkCard = document.getElementById('team-card-pink');
    const blueCard = document.getElementById('team-card-blue');

    if (this.state.activeTeam === 'pink') {
      pinkCard.classList.add('active-team');
      blueCard.classList.remove('active-team');
    } else {
      blueCard.classList.add('active-team');
      pinkCard.classList.remove('active-team');
    }

    // İpucu butonu durumu
    const hintBtn = document.getElementById('btn-use-hint');
    if (hintBtn) {
      const activeTeamData = this.state.teams[this.state.activeTeam];
      hintBtn.disabled = activeTeamData.hintUsedInLevel;
      hintBtn.innerHTML = activeTeamData.hintUsedInLevel ? 
        "💡 İpucu Hakkı Tükendi" : "💡 İpucu Kullan (Seviyede 1 Hak)";
    }
  }

  adjustScore(teamKey, amount) {
    this.state.teams[teamKey].score = Math.max(0, this.state.teams[teamKey].score + amount);
    this.updateScoreboardUI();
  }

  jumpToLevel(lvl) {
    this.state.teams.pink.level = lvl;
    this.state.teams.blue.level = lvl;
    this.state.teams.pink.questionIndex = 0;
    this.state.teams.blue.questionIndex = 0;
    this.state.isGoldenQuestion = false;
    this.loadQuestionForActiveTeam();
  }

  startGoldenQuestion() {
    this.state.isGoldenQuestion = true;
    this.loadQuestionForActiveTeam();
  }

  resetGame() {
    this.state.activeTeam = 'pink';
    this.state.isGoldenQuestion = false;
    this.state.goldenIndex = 0;

    ['pink', 'blue'].forEach(t => {
      this.state.teams[t].score = 0;
      this.state.teams[t].level = 1;
      this.state.teams[t].questionIndex = 0;
      this.state.teams[t].correctCount = 0;
      this.state.teams[t].wrongCount = 0;
      this.state.teams[t].hintUsedInLevel = false;
      this.state.teams[t].badges = [];
      this.state.teams[t].levelStats = { 1: { c: 0, t: 0 }, 2: { c: 0, t: 0 }, 3: { c: 0, t: 0 }, 4: { c: 0, t: 0 } };
      this.state.teams[t].isRetryMode = false;
      this.state.teams[t].retryIndex = 0;
      this.state.teams[t].completedAllLevels = false;
    });

    this.updateScoreboardUI();
    this.loadQuestionForActiveTeam();
  }

  // ==========================================
  // OYUN SONU, ŞAMPİYONLUK VE KAZANIM RAPORU
  // ==========================================
  checkGameCompletion() {
    const pink = this.state.teams.pink;
    const blue = this.state.teams.blue;

    if (pink.completedAllLevels && blue.completedAllLevels) {
      if (pink.score === blue.score) {
        // Eşitlik durumu: Altın Soru başlat!
        alert("⚔️ İNANILMAZ MÜCADELE! İki takımın da puanları eşit! Kazananı belirlemek için ALTIN SORU başlıyor!");
        this.startGoldenQuestion();
      } else {
        this.showFinalResultsModal();
      }
    }
  }

  showFinalResultsModal(isManualOpen = false) {
    this.stopTimer();
    window.soundEngine.playVictory();
    this.triggerConfetti(150);

    const pink = this.state.teams.pink;
    const blue = this.state.teams.blue;

    const modal = document.getElementById('results-modal');
    const titleEl = document.getElementById('winner-team-title');
    const descEl = document.getElementById('winner-description');
    const tableBody = document.getElementById('results-table-body');
    const kazanimEl = document.getElementById('kazanim-evaluation-content');

    let winnerText = "";
    let winnerClass = "";
    if (pink.score > blue.score) {
      winnerText = "👑 ŞAMPİYON: PEMBE TAKIM (Kızlar)";
      winnerClass = "pink";
    } else if (blue.score > pink.score) {
      winnerText = "👑 ŞAMPİYON: MAVİ TAKIM (Erkekler)";
      winnerClass = "blue";
    } else {
      winnerText = "🤝 BÜYÜK DOSTLUK: BERABERLİK!";
      winnerClass = "tie";
    }

    titleEl.innerText = winnerText;
    titleEl.className = `winner-banner ${winnerClass}`;

    descEl.innerText = isManualOpen ? 
      "Öğretmen Masasından sınıf kazanım değerlendirme raporu görüntülendi." :
      "Her iki takım da 8. sınıf Üslü İfadeler ünitesindeki tüm seviyeleri başarıyla tamamladı. Harika matematiksel akıl yürütme gösterdiniz!";

    tableBody.innerHTML = `
      <tr>
        <td><strong>🌸 Pembe Takım</strong></td>
        <td>${pink.score} Puan</td>
        <td>${pink.correctCount} Doğru</td>
        <td>${pink.wrongCount} Yanlış</td>
        <td>${pink.badges.join(', ') || 'Katılım Rozeti'}</td>
      </tr>
      <tr>
        <td><strong>⚡ Mavi Takım</strong></td>
        <td>${blue.score} Puan</td>
        <td>${blue.correctCount} Doğru</td>
        <td>${blue.wrongCount} Yanlış</td>
        <td>${blue.badges.join(', ') || 'Katılım Rozeti'}</td>
      </tr>
    `;

    // Kazanım bazlı detaylı rapor
    kazanimEl.innerHTML = `
      <div class="kazanim-report">
        <h4>📊 Ünite Kazanımları ve Sınıf Başarı Analizi:</h4>
        <ul class="kazanim-list">
          <li class="kazanim-item">
            <span>✅</span>
            <strong>M.8.1.2.1 (Tam Sayı Kuvvetleri):</strong> Taban işareti, çift/tek kuvvetler ve sıfırıncı kuvvet kuralları kavrandı.
          </li>
          <li class="kazanim-item">
            <span>✅</span>
            <strong>M.8.1.2.2 (Üslü İşlemler):</strong> Aynı tabanlı çarpmada üsleri toplama, bölmede çıkarma ve üssün üssü başarıyla uygulandı.
          </li>
          <li class="kazanim-item">
            <span>✅</span>
            <strong>M.8.1.2.3 & M.8.1.2.4 (Basamak & Ondalık Çözümleme):</strong> 10'un kuvvetleri ile basamak analizi ve çözümleme kavrandı.
          </li>
          <li class="kazanim-item">
            <span>✅</span>
            <strong>M.8.1.2.5 (Bilimsel Gösterim):</strong> Çok büyük ve çok küçük sayılarda 1 ≤ |a| < 10 şartı ve problem çözme becerisi sergilendi.
          </li>
        </ul>
        <div style="margin-top: 14px; padding: 10px; background: rgba(245, 158, 11, 0.1); border-left: 3px solid var(--gold); border-radius: 4px;">
          <strong>💡 Öğretmen Notu & Tekrar Önerisi:</strong> Negatif tabanlı ifadelerde parantezin varlığı (-a)<sup>n</sup> ile parantezsiz durum -a<sup>n</sup> arasındaki işaret farkını tahtada pekiştirici 2-3 örnekle tekrarlayabilirsiniz.
        </div>
      </div>
    `;

    modal.classList.add('open');
  }
}

// Sayfa yüklendiğinde oyunu başlat
window.addEventListener('DOMContentLoaded', () => {
  window.arenaGame = new MathArenaGame();
});
