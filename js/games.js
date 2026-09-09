/**
 * Merve SAMAK AKADEMİ - Matematik Oyunları Modülü
 * Oyun 1: "Kök Avcısı" (Kareköklü Sayı Tahmin Oyunu)
 * Oyun 2: "EBOB-EKOK Eşleştirme" (Hafıza Kartı Oyunu)
 */

/* ==========================================================================
   OYUN 1: KÖK AVCISI MOTORU
   ========================================================================== */
let rootHunterState = {
  currentIndex: 0,
  score: 0,
  lives: 3,
  combo: 0,
  highScore: parseInt(localStorage.getItem('ms_game_root_high') || '0', 10),
  isGameOver: false,
  step: 1, // 1: Aralığı seç, 2: Yakın olduğu sayıyı seç
  selectedInterval: null
};

function initRootHunter() {
  const container = document.getElementById('game-root-hunter-container');
  if (!container) return;

  const dataset = ACADEMY_MODULES_DATA.games.rootHunter;
  if (rootHunterState.currentIndex >= dataset.length) {
    rootHunterState.currentIndex = 0; // Başa sar
  }

  const currentItem = dataset[rootHunterState.currentIndex];

  if (rootHunterState.isGameOver) {
    container.innerHTML = `
      <div class="glass-panel p-8 md:p-12 rounded-3xl text-center space-y-6 max-w-md mx-auto border border-pink-500/30">
        <div class="w-20 h-20 mx-auto rounded-3xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-4xl shadow-lg shadow-pink-500/30">
          <i class="ph ph-trophy"></i>
        </div>
        <div>
          <h3 class="text-2xl font-black text-white">Oyun Bitti!</h3>
          <p class="text-sm text-gray-400 mt-1">Harika bir performans sergiledin.</p>
        </div>

        <div class="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-purple-950/60 border border-purple-500/20">
          <div>
            <div class="text-xs text-gray-400">Toplam Puan</div>
            <div class="text-2xl font-black text-pink-400 font-heading">${rootHunterState.score}</div>
          </div>
          <div>
            <div class="text-xs text-gray-400">En Yüksek Skor</div>
            <div class="text-2xl font-black text-white font-heading">${rootHunterState.highScore}</div>
          </div>
        </div>

        <button onclick="restartRootHunter()" class="w-full py-3.5 rounded-xl bg-gradient-brand text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:scale-105 transition-all">
          <i class="ph ph-arrow-counter-clockwise font-bold inline mr-1"></i> Tekrar Oyna
        </button>
      </div>
    `;
    return;
  }

  // Aralık Seçenekleri Üret (1 doğru, 3 yanlış)
  const low = currentItem.low;
  const high = currentItem.high;
  const intervalOptions = [
    { label: `${low} ile ${high} arasında`, isCorrect: true, low, high },
    { label: `${low - 1} ile ${low} arasında`, isCorrect: false, low: low - 1, high: low },
    { label: `${high} ile ${high + 1} arasında`, isCorrect: false, low: high, high: high + 1 },
    { label: `${low + 2} ile ${high + 2} arasında`, isCorrect: false, low: low + 2, high: high + 2 }
  ].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="glass-panel p-6 md:p-10 rounded-3xl space-y-8 border border-purple-500/30 max-w-2xl mx-auto relative overflow-hidden">
      <!-- Üst Gösterge: Canlar, Puan, Combo & Rekor -->
      <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-500/20 text-xs">
        <div class="flex items-center gap-1.5">
          <span class="text-gray-400 font-semibold mr-1">Canlar:</span>
          ${[1, 2, 3].map(i => `
            <i class="ph ${i <= rootHunterState.lives ? 'ph-heart-fill text-pink-500 text-lg animate-pulse' : 'ph-heart text-gray-600 text-lg'}"></i>
          `).join('')}
        </div>

        <div class="flex items-center gap-4 font-bold">
          ${rootHunterState.combo > 1 ? `
            <span class="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-bounce">
              🔥 ${rootHunterState.combo}x Combo!
            </span>
          ` : ''}
          <span class="text-pink-400">Puan: <strong class="text-white text-base">${rootHunterState.score}</strong></span>
          <span class="text-gray-400">Rekor: <strong class="text-purple-300">${rootHunterState.highScore}</strong></span>
        </div>
      </div>

      <!-- Hedef Köklü Sayı Kutusu -->
      <div class="text-center space-y-3">
        <span class="text-xs uppercase tracking-widest text-pink-400 font-bold">Hedef Karekök</span>
        <div class="inline-block p-6 px-10 rounded-3xl bg-gradient-to-br from-purple-950 via-[#1e0a30] to-pink-950/60 border-2 border-pink-500/50 shadow-2xl shadow-pink-500/20">
          <span class="text-4xl md:text-5xl font-black text-white font-mono tracking-wider">
            $$\\sqrt{${currentItem.target}}$$
          </span>
        </div>
        <p class="text-xs md:text-sm text-gray-300">
          ${rootHunterState.step === 1 ? '1. Adım: Bu sayı hangi iki ardışık tam sayı arasındadır?' : '2. Adım: Bu sayı hangi tam sayıya DAHA YAKINDIR?'}
        </p>
      </div>

      <!-- Sayı Doğrusu Görsel Rehberi -->
      <div class="p-4 rounded-2xl bg-[#14081e] border border-purple-500/20 space-y-2">
        <div class="flex justify-between text-xs font-bold text-gray-400 font-mono">
          <span>$$\\sqrt{${currentItem.lowSq}} = ${currentItem.low}$$</span>
          <span class="text-pink-400 font-bold">$$\\sqrt{${currentItem.target}}$$</span>
          <span>$$\\sqrt{${currentItem.highSq}} = ${currentItem.high}$$</span>
        </div>
        <div class="relative h-3 bg-purple-950 rounded-full overflow-hidden border border-purple-500/30">
          <div class="absolute top-0 bottom-0 bg-gradient-brand rounded-full transition-all duration-500" style="left: 0; width: ${Math.round(((currentItem.target - currentItem.lowSq) / (currentItem.highSq - currentItem.lowSq)) * 100)}%;"></div>
        </div>
      </div>

      <!-- Soru Seçenek Butonları -->
      ${rootHunterState.step === 1 ? `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${intervalOptions.map(opt => `
            <button onclick="handleIntervalChoice(${opt.isCorrect})" class="p-4 rounded-2xl bg-[#190b29] hover:bg-gradient-brand border border-purple-500/30 hover:border-transparent text-white font-bold text-sm transition-all hover:scale-[1.02] shadow-md">
              ${opt.label}
            </button>
          `).join('')}
        </div>
      ` : `
        <div class="grid grid-cols-2 gap-4">
          <button onclick="handleClosenessChoice(${currentItem.low}, ${currentItem.closerTo})" class="p-5 rounded-2xl bg-[#190b29] hover:bg-gradient-brand border border-purple-500/30 hover:border-transparent text-white font-black text-lg transition-all hover:scale-[1.02] shadow-md flex flex-col items-center gap-1">
            <span>${currentItem.low}'e daha yakın</span>
            <span class="text-xs text-gray-400 font-normal">($${currentItem.target} - ${currentItem.lowSq} = ${currentItem.diffLow}$)</span>
          </button>
          <button onclick="handleClosenessChoice(${currentItem.high}, ${currentItem.closerTo})" class="p-5 rounded-2xl bg-[#190b29] hover:bg-gradient-brand border border-purple-500/30 hover:border-transparent text-white font-black text-lg transition-all hover:scale-[1.02] shadow-md flex flex-col items-center gap-1">
            <span>${currentItem.high}'e daha yakın</span>
            <span class="text-xs text-gray-400 font-normal">($${currentItem.highSq} - ${currentItem.target} = ${currentItem.diffHigh}$)</span>
          </button>
        </div>
      `}
    </div>
  `;

  if (window.renderMathInElementSafely) {
    window.renderMathInElementSafely(container);
  }
}

function handleIntervalChoice(isCorrect) {
  if (isCorrect) {
    rootHunterState.score += 50;
    rootHunterState.step = 2; // Yakınlık aşamasına geç
    showToast('🎯 Harika! Aralığı doğru bildin. Şimdi hangisine daha yakın?');
  } else {
    handleWrongAnswer('Yanlış aralık seçimi!');
  }
  initRootHunter();
}

function handleClosenessChoice(chosenNumber, correctNumber) {
  if (chosenNumber === correctNumber) {
    rootHunterState.combo++;
    const bonus = 50 + (rootHunterState.combo * 20);
    rootHunterState.score += bonus;
    
    if (rootHunterState.score > rootHunterState.highScore) {
      rootHunterState.highScore = rootHunterState.score;
      localStorage.setItem('ms_game_root_high', rootHunterState.highScore.toString());
    }

    showToast(`🎉 Tebrikler! +${bonus} Puan kazandın!`);
    rootHunterState.step = 1;
    rootHunterState.currentIndex++;
  } else {
    handleWrongAnswer('Yakın olduğu sayıyı yanlış tahmin ettin!');
  }
  initRootHunter();
}

function handleWrongAnswer(msg) {
  rootHunterState.lives--;
  rootHunterState.combo = 0;
  showToast(`❌ ${msg} Kalan Can: ${rootHunterState.lives}`);

  if (rootHunterState.lives <= 0) {
    rootHunterState.isGameOver = true;
  } else {
    rootHunterState.step = 1;
    rootHunterState.currentIndex++;
  }
}

function restartRootHunter() {
  rootHunterState = {
    currentIndex: 0,
    score: 0,
    lives: 3,
    combo: 0,
    highScore: parseInt(localStorage.getItem('ms_game_root_high') || '0', 10),
    isGameOver: false,
    step: 1,
    selectedInterval: null
  };
  initRootHunter();
}


/* ==========================================================================
   OYUN 2: EBOB-EKOK KART EŞLEŞTİRME OYUNU
   ========================================================================== */
let cardGameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  moves: 0,
  timerSeconds: 0,
  timerInterval: null,
  isGameActive: false,
  isVictory: false
};

function initEbobEkokGame() {
  const container = document.getElementById('game-ebob-cards-container');
  if (!container) return;

  // 8 Eşleştirme Çifti -> 16 Kart
  const pairsData = ACADEMY_MODULES_DATA.games.ebobEkokCards;
  
  let cards = [];
  pairsData.forEach(item => {
    // 1. Soru Kartı
    cards.push({
      id: `q-${item.matchId}`,
      matchId: item.matchId,
      displayText: `${item.type}${item.pair}`,
      isQuestion: true,
      isFlipped: false,
      isMatched: false
    });
    // 2. Cevap Kartı
    cards.push({
      id: `a-${item.matchId}`,
      matchId: item.matchId,
      displayText: `${item.val}`,
      isQuestion: false,
      isFlipped: false,
      isMatched: false
    });
  });

  // Kartları Karıştır
  cards.sort(() => Math.random() - 0.5);

  cardGameState.cards = cards;
  cardGameState.flippedCards = [];
  cardGameState.matchedPairs = 0;
  cardGameState.moves = 0;
  cardGameState.timerSeconds = 0;
  cardGameState.isVictory = false;

  if (cardGameState.timerInterval) {
    clearInterval(cardGameState.timerInterval);
  }

  cardGameState.timerInterval = setInterval(() => {
    cardGameState.timerSeconds++;
    const timerElem = document.getElementById('ebob-game-timer');
    if (timerElem) {
      const mins = Math.floor(cardGameState.timerSeconds / 60).toString().padStart(2, '0');
      const secs = (cardGameState.timerSeconds % 60).toString().padStart(2, '0');
      timerElem.innerText = `${mins}:${secs}`;
    }
  }, 1000);

  renderEbobEkokGrid();
}

function renderEbobEkokGrid() {
  const container = document.getElementById('game-ebob-cards-container');
  const movesElem = document.getElementById('ebob-game-moves');
  const matchedElem = document.getElementById('ebob-game-matched');
  if (!container) return;

  if (movesElem) movesElem.innerText = cardGameState.moves;
  if (matchedElem) matchedElem.innerText = `${cardGameState.matchedPairs} / 8`;

  if (cardGameState.isVictory) {
    if (cardGameState.timerInterval) clearInterval(cardGameState.timerInterval);
    const mins = Math.floor(cardGameState.timerSeconds / 60).toString().padStart(2, '0');
    const secs = (cardGameState.timerSeconds % 60).toString().padStart(2, '0');

    container.innerHTML = `
      <div class="col-span-full glass-panel p-8 md:p-12 rounded-3xl text-center space-y-6 max-w-lg mx-auto border border-pink-500/40 animate-pulse-glow">
        <div class="w-20 h-20 mx-auto rounded-3xl bg-gradient-brand flex items-center justify-center text-white text-4xl shadow-xl shadow-pink-500/30">
          <i class="ph ph-confetti font-bold"></i>
        </div>
        <div>
          <h3 class="text-3xl font-black text-white">Tebrikler Şampiyon!</h3>
          <p class="text-xs md:text-sm text-pink-300 mt-2">Tüm EBOB-EKOK eşleştirmelerini başarıyla tamamladın.</p>
        </div>

        <div class="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-purple-950/60 border border-purple-500/20">
          <div>
            <div class="text-xs text-gray-400">Toplam Süre</div>
            <div class="text-2xl font-black text-white font-mono">${mins}:${secs}</div>
          </div>
          <div>
            <div class="text-xs text-gray-400">Toplam Hamle</div>
            <div class="text-2xl font-black text-pink-400 font-heading">${cardGameState.moves}</div>
          </div>
        </div>

        <button onclick="initEbobEkokGame()" class="w-full py-4 rounded-xl bg-gradient-brand text-white font-black text-sm shadow-xl shadow-pink-500/30 hover:scale-105 transition-all">
          <i class="ph ph-arrow-counter-clockwise font-bold inline mr-1"></i> Yeni Oyunu Başlat
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = cardGameState.cards.map((c, index) => {
    const isRevealed = c.isFlipped || c.isMatched;

    return `
      <div onclick="flipCard(${index})" class="aspect-square cursor-pointer select-none perspective-1000 group">
        <div class="w-full h-full rounded-2xl transition-all duration-500 transform-style-3d flex items-center justify-center p-3 text-center ${
          c.isMatched 
            ? 'bg-emerald-950/80 border-2 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/20 scale-[0.98]' 
            : isRevealed 
              ? 'bg-gradient-to-tr from-pink-900/80 to-purple-900/80 border-2 border-pink-400 text-white shadow-lg shadow-pink-500/30' 
              : 'bg-[#180a25] hover:bg-purple-900/50 border border-purple-500/30 text-purple-400 group-hover:scale-105 group-hover:border-pink-500/40'
        }">
          ${isRevealed ? `
            <span class="font-extrabold ${c.isQuestion ? 'text-xs md:text-sm font-sans' : 'text-xl md:text-2xl font-mono text-pink-300'}">
              ${c.displayText}
            </span>
          ` : `
            <div class="w-10 h-10 rounded-xl bg-purple-900/30 flex items-center justify-center text-purple-400 group-hover:text-pink-400 transition-colors">
              <i class="ph ph-question text-xl"></i>
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');
}

function flipCard(cardIndex) {
  const card = cardGameState.cards[cardIndex];
  if (!card || card.isFlipped || card.isMatched || cardGameState.flippedCards.length >= 2) {
    return;
  }

  card.isFlipped = true;
  cardGameState.flippedCards.push({ card, index: cardIndex });
  renderEbobEkokGrid();

  if (cardGameState.flippedCards.length === 2) {
    cardGameState.moves++;
    const [first, second] = cardGameState.flippedCards;

    if (first.card.matchId === second.card.matchId && first.card.id !== second.card.id) {
      // Eşleşme Başarılı!
      setTimeout(() => {
        first.card.isMatched = true;
        second.card.isMatched = true;
        cardGameState.flippedCards = [];
        cardGameState.matchedPairs++;

        if (cardGameState.matchedPairs === 8) {
          cardGameState.isVictory = true;
          showToast('🎉 Harika! Tüm kartları eşleştirdin!');
        } else {
          showToast('✨ Doğru Eşleştirme!');
        }
        renderEbobEkokGrid();
      }, 400);
    } else {
      // Eşleşmedi, geri kapat
      setTimeout(() => {
        first.card.isFlipped = false;
        second.card.isFlipped = false;
        cardGameState.flippedCards = [];
        renderEbobEkokGrid();
      }, 900);
    }
  }
}

function switchGameTab(gameType) {
  document.querySelectorAll('.game-tab-btn').forEach(btn => {
    btn.className = 'game-tab-btn px-5 py-2.5 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-purple-900/30 transition-all border border-purple-500/20';
  });
  document.querySelectorAll('.game-panel-section').forEach(p => p.classList.add('hidden'));

  const activeBtn = document.getElementById(`game-tab-btn-${gameType}`);
  const activePanel = document.getElementById(`game-panel-${gameType}`);

  if (activeBtn) {
    activeBtn.className = 'game-tab-btn px-5 py-2.5 rounded-xl text-xs font-bold transition-all bg-gradient-brand text-white shadow-lg shadow-pink-500/25';
  }
  if (activePanel) {
    activePanel.classList.remove('hidden');
    if (gameType === 'root') {
      initRootHunter();
    } else if (gameType === 'ebob') {
      initEbobEkokGame();
    }
  }
}

function renderGamesPage() {
  switchGameTab('root');
}

window.renderGamesPage = renderGamesPage;
window.switchGameTab = switchGameTab;
window.initRootHunter = initRootHunter;
window.handleIntervalChoice = handleIntervalChoice;
window.handleClosenessChoice = handleClosenessChoice;
window.restartRootHunter = restartRootHunter;
window.initEbobEkokGame = initEbobEkokGame;
window.flipCard = flipCard;
