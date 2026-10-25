/**
 * Merve SAMAK AKADEMİ - Kazanım Etkinlikleri Modülü (#activities)
 * 1. Matematiksel Piksel Boyama (Pixel Math Art)
 * 2. Dokunmatik Kart Eşleştirme (Math Memory Match)
 * 3. Hatalı Adımı Bul Dedektifliği (Step Error Detective)
 * 4. Merve Samak Akademi Antetli A4 Çalışma Kağıdı Yazdırma
 */

let activeActivityTab = 'coloring'; // 'coloring', 'matching', 'detective'

// Piksel Boyama Durumu
let activeColoringIndex = 0;
let selectedPaletteColor = null;
let userCellColors = {}; // { "r-c": "#ef4444" }

// Eşleştirme Durumu
let activeMatchingIndex = 0;
let matchingCards = [];
let firstFlippedCard = null;
let isMatchingLocked = false;
let matchingMoves = 0;
let matchingPairsFound = 0;
let matchingTimerInterval = null;
let matchingSeconds = 0;

// Hata Dedektifi Durumu
let activeDetectiveIndex = 0;
let detectiveAnswers = {}; // { id: selectedStep }

function renderActivitiesPage() {
  const container = document.getElementById('activities-main-container');
  if (!container) return;

  if (activeActivityTab === 'coloring') {
    renderColoringActivity(container);
  } else if (activeActivityTab === 'matching') {
    renderMatchingActivity(container);
  } else if (activeActivityTab === 'detective') {
    renderDetectiveActivity(container);
  }

  if (window.renderMathInElementSafely) {
    window.renderMathInElementSafely(container);
  }
}

function switchActivityTab(tab) {
  activeActivityTab = tab;
  
  // Tab buton stilleri
  document.querySelectorAll('.activity-tab-btn').forEach(b => {
    b.className = 'activity-tab-btn px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-gray-300 hover:text-white hover:bg-purple-900/40 transition-all border border-purple-500/20 flex items-center gap-2';
  });
  
  const activeBtn = document.getElementById(`act-tab-btn-${tab}`);
  if (activeBtn) {
    activeBtn.className = 'activity-tab-btn px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-brand text-white shadow-lg shadow-pink-500/25 flex items-center gap-2 transition-all';
  }

  renderActivitiesPage();
}

/* ==========================================================================
   1. PİKSEL & MOZAİK BOYAMA ETKİNLİĞİ
   ========================================================================== */
function renderColoringActivity(container) {
  const activities = ACADEMY_MODULES_DATA.activities.coloring;
  const current = activities[activeColoringIndex] || activities[0];

  if (!selectedPaletteColor && current.palette.length > 0) {
    selectedPaletteColor = current.palette[0];
  }

  container.innerHTML = `
    <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-pink-500/30 max-w-4xl mx-auto">
      
      <!-- Üst Seçim & Tanıtım -->
      <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
        <div>
          <span class="text-xs text-pink-400 font-bold uppercase tracking-wider block">1. ETKİNLİK • PİKSEL SANATI</span>
          <h2 class="text-xl sm:text-2xl font-black text-white">${current.title}</h2>
          <p class="text-xs text-gray-300 mt-1">${current.desc}</p>
        </div>

        <div class="flex items-center gap-2">
          ${current.worksheetUrl ? `
            <a href="${current.worksheetUrl}" target="_blank" class="px-3.5 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-purple-200 text-xs font-bold border border-purple-500/30 flex items-center gap-1.5 transition-all">
              <i class="ph ph-arrow-square-out text-sm"></i> Tam Ekran Aç
            </a>
          ` : ''}
          <button onclick="printColoringWorksheet()" class="px-4 py-2 rounded-xl bg-gradient-brand text-white text-xs font-bold shadow-lg shadow-pink-500/20 hover:brightness-110 flex items-center gap-1.5 transition-all">
            <i class="ph ph-printer font-bold"></i> Antetli A4 Yazdır
          </button>
        </div>
      </div>

      <!-- Diğer Boyama Etkinlikleri Arasında Geçiş -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2">
        ${activities.map((a, idx) => `
          <button onclick="selectColoringActivity(${idx})" class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeColoringIndex === idx ? 'bg-pink-500/25 border-pink-400 text-pink-200 border' : 'bg-purple-950/40 text-gray-400 border border-purple-500/20'}">
            ${a.title.split(':')[0]}
          </button>
        `).join('')}
      </div>

      <!-- Renk Paleti (Öğrenci Tıklar ve Rengi Seçer) -->
      <div class="space-y-2">
        <label class="block text-xs font-bold text-gray-300 uppercase tracking-wider">
          🎨 Renk Fırçanı Seç (Bir renge tıkla ve kutuları boya):
        </label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${current.palette.map(p => `
            <button onclick="selectPaletteColor('${p.code}')" class="p-3 rounded-2xl border flex items-center gap-2.5 transition-all ${selectedPaletteColor && selectedPaletteColor.code === p.code ? 'ring-2 ring-white scale-105 border-transparent shadow-lg' : 'border-purple-500/30 hover:border-pink-500/50'}" style="background-color: ${p.color}25;">
              <span class="w-6 h-6 rounded-xl shrink-0 border border-white/40 shadow-sm" style="background-color: ${p.color};"></span>
              <span class="text-xs font-bold text-white text-left leading-tight">${p.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Piksel Mozaik Tablosu -->
      <div class="p-4 sm:p-6 rounded-2xl bg-slate-950/70 border border-purple-500/30 flex flex-col items-center justify-center space-y-4">
        <div class="grid gap-2 sm:gap-3" style="grid-template-columns: repeat(${current.grid[0].length}, minmax(0, 1fr));">
          ${current.grid.map((row, rIdx) => 
            row.map((cell, cIdx) => {
              const cellKey = `${rIdx}-${cIdx}`;
              const paintedColor = userCellColors[cellKey] || null;
              return `
                <button onclick="paintCell(${rIdx}, ${cIdx})" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border flex items-center justify-center text-xs sm:text-sm font-bold font-mono transition-transform hover:scale-105 cursor-pointer shadow-inner" style="background-color: ${paintedColor ? paintedColor : '#1f132e'}; border-color: ${paintedColor ? paintedColor : '#4c1d95'}; color: ${paintedColor ? '#ffffff' : '#f3e8ff'};">
                  $${cell.expr}$
                </button>
              `;
            }).join('')
          ).join('')}
        </div>

        <div class="flex items-center gap-3 pt-2">
          <button onclick="clearColoring()" class="px-4 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-purple-200 text-xs font-bold border border-purple-500/30 transition-all">
            <i class="ph ph-arrow-counter-clockwise"></i> Boyamayı Sıfırla
          </button>
          <span class="text-xs text-gray-400">Tüm kutuları boyayarak deseni tamamlayın!</span>
        </div>
      </div>

    </div>
  `;
}

function selectColoringActivity(index) {
  activeColoringIndex = index;
  userCellColors = {};
  selectedPaletteColor = null;
  renderActivitiesPage();
}

function selectPaletteColor(code) {
  const current = ACADEMY_MODULES_DATA.activities.coloring[activeColoringIndex];
  selectedPaletteColor = current.palette.find(p => p.code === code);
  renderActivitiesPage();
}

function paintCell(row, col) {
  if (!selectedPaletteColor) return;
  const current = ACADEMY_MODULES_DATA.activities.coloring[activeColoringIndex];
  const targetCell = current.grid[row][col];
  const cellKey = `${row}-${col}`;

  userCellColors[cellKey] = selectedPaletteColor.color;
  renderActivitiesPage();

  // Doğruluk kontrolü & ses
  if (targetCell.code === selectedPaletteColor.code) {
    if (typeof playSoundSuccess === 'function') playSoundSuccess();
  }
}

function clearColoring() {
  userCellColors = {};
  renderActivitiesPage();
}

/* ==========================================================================
   2. DOKUNMATİK KART EŞLEŞTİRME ETKİNLİĞİ
   ========================================================================== */
function renderMatchingActivity(container) {
  const matchSets = ACADEMY_MODULES_DATA.activities.matching;
  const currentSet = matchSets[activeMatchingIndex] || matchSets[0];

  if (matchingCards.length === 0) {
    initMatchingGame(currentSet);
  }

  container.innerHTML = `
    <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-purple-500/30 max-w-4xl mx-auto">
      
      <!-- Üst Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
        <div>
          <span class="text-xs text-purple-400 font-bold uppercase tracking-wider block">2. ETKİNLİK • KART EŞLEŞTİRME</span>
          <h2 class="text-xl sm:text-2xl font-black text-white">${currentSet.title}</h2>
          <p class="text-xs text-gray-300 mt-1">Eşdeğer ifadeleri çift olarak bulun ve kartları eşleştirin.</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="px-3 py-1.5 rounded-xl bg-purple-950 border border-purple-500/30 text-xs font-bold text-gray-300">
            Süre: <strong id="match-timer" class="text-white">${formatSeconds(matchingSeconds)}</strong>
          </div>
          <div class="px-3 py-1.5 rounded-xl bg-purple-950 border border-purple-500/30 text-xs font-bold text-gray-300">
            Hamle: <strong id="match-moves" class="text-pink-400">${matchingMoves}</strong>
          </div>
          <button onclick="restartMatchingGame()" class="px-3.5 py-1.5 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-purple-200 text-xs font-bold border border-purple-500/30 transition-all">
            <i class="ph ph-arrow-counter-clockwise"></i> Sıfırla
          </button>
        </div>
      </div>

      <!-- Set Seçicisi -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1">
        ${matchSets.map((s, idx) => `
          <button onclick="switchMatchingSet(${idx})" class="px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeMatchingIndex === idx ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30' : 'bg-purple-950/40 text-gray-400 border border-purple-500/20'}">
            ${s.title}
          </button>
        `).join('')}
      </div>

      <!-- Kartlar Grid -->
      <div class="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 my-4">
        ${matchingCards.map((c, idx) => `
          <button onclick="flipMatchingCard(${idx})" ${c.isMatched ? 'disabled' : ''} class="h-24 sm:h-28 rounded-2xl border flex items-center justify-center p-2 text-center text-sm sm:text-base font-bold transition-all duration-300 ${c.isMatched ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 opacity-80 cursor-default' : c.isFlipped ? 'bg-gradient-brand text-white border-pink-400 scale-105 shadow-lg shadow-pink-500/30' : 'bg-purple-950/70 hover:bg-purple-900/50 border-purple-500/30 text-purple-300 hover:scale-102 cursor-pointer'}">
            ${c.isFlipped || c.isMatched ? c.content : '<i class="ph ph-cards text-2xl text-purple-400/70"></i>'}
          </button>
        `).join('')}
      </div>

    </div>
  `;
}

function initMatchingGame(set) {
  clearInterval(matchingTimerInterval);
  matchingSeconds = 0;
  matchingMoves = 0;
  matchingPairsFound = 0;
  firstFlippedCard = null;
  isMatchingLocked = false;

  const deck = [];
  set.pairs.forEach((p, idx) => {
    deck.push({ id: idx, content: p.a, isFlipped: false, isMatched: false });
    deck.push({ id: idx, content: p.b, isFlipped: false, isMatched: false });
  });

  // Karıştır
  matchingCards = deck.sort(() => Math.random() - 0.5);

  matchingTimerInterval = setInterval(() => {
    matchingSeconds++;
    const timerEl = document.getElementById('match-timer');
    if (timerEl) timerEl.innerText = formatSeconds(matchingSeconds);
  }, 1000);
}

function switchMatchingSet(index) {
  activeMatchingIndex = index;
  matchingCards = [];
  renderActivitiesPage();
}

function restartMatchingGame() {
  const currentSet = ACADEMY_MODULES_DATA.activities.matching[activeMatchingIndex];
  initMatchingGame(currentSet);
  renderActivitiesPage();
}

function flipMatchingCard(index) {
  if (isMatchingLocked) return;
  const card = matchingCards[index];
  if (card.isFlipped || card.isMatched) return;

  card.isFlipped = true;

  if (!firstFlippedCard) {
    firstFlippedCard = { index, ...card };
    renderActivitiesPage();
    return;
  }

  // 2. Kart açıldı
  matchingMoves++;
  const secondFlipped = { index, ...card };
  renderActivitiesPage();

  if (firstFlippedCard.id === secondFlipped.id) {
    // Eşleşti!
    setTimeout(() => {
      matchingCards[firstFlippedCard.index].isMatched = true;
      matchingCards[secondFlipped.index].isMatched = true;
      matchingPairsFound++;
      firstFlippedCard = null;
      renderActivitiesPage();

      if (matchingPairsFound === matchingCards.length / 2) {
        clearInterval(matchingTimerInterval);
        if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        if (typeof showToast === 'function') showToast(`🎉 Tebrikler! ${matchingMoves} hamlede tamamladınız.`);
      }
    }, 400);
  } else {
    // Yanlış eşleşme
    isMatchingLocked = true;
    setTimeout(() => {
      matchingCards[firstFlippedCard.index].isFlipped = false;
      matchingCards[secondFlipped.index].isFlipped = false;
      firstFlippedCard = null;
      isMatchingLocked = false;
      renderActivitiesPage();
    }, 900);
  }
}

function formatSeconds(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/* ==========================================================================
   3. HATALI ADIMI BUL DEDEKTİFLİĞİ
   ========================================================================= */
function renderDetectiveActivity(container) {
  const detectives = ACADEMY_MODULES_DATA.activities.errorDetective;
  const current = detectives[activeDetectiveIndex] || detectives[0];
  const userAns = detectiveAnswers[current.id];

  container.innerHTML = `
    <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-purple-500/30 max-w-3xl mx-auto">
      
      <!-- Üst Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
        <div>
          <span class="text-xs text-amber-400 font-bold uppercase tracking-wider block">3. ETKİNLİK • HATA DEDEKTİFİ</span>
          <h2 class="text-xl sm:text-2xl font-black text-white">${current.title}</h2>
          <p class="text-xs text-gray-300 mt-1">İşlem adımlarını inceleyin ve ilk matematiksel hatanın yapıldığı adımı bulun.</p>
        </div>

        <button onclick="printDetectiveWorksheet()" class="px-4 py-2 rounded-xl bg-gradient-brand text-white text-xs font-bold shadow-lg shadow-pink-500/20 hover:brightness-110 flex items-center gap-1.5 transition-all">
          <i class="ph ph-printer font-bold"></i> Antetli A4 Yazdır
        </button>
      </div>

      <!-- Problem Metni -->
      <div class="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-white text-sm sm:text-base font-semibold">
        ${current.problem}
      </div>

      <!-- Çözüm Adımları (Tıklanabilir) -->
      <div class="space-y-3">
        ${current.steps.map((step, idx) => {
          const stepNo = idx + 1;
          const isSelected = userAns === stepNo;
          const isCorrectStep = stepNo === current.errorStep;
          let btnClass = "w-full p-4 rounded-2xl border text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between ";

          if (!userAns) {
            btnClass += "bg-slate-950/70 hover:bg-purple-900/40 border-purple-500/25 text-gray-200 hover:border-pink-500/50 cursor-pointer";
          } else {
            if (stepNo === current.errorStep) {
              btnClass += "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/30";
            } else if (isSelected && !isCorrectStep) {
              btnClass += "bg-red-950/80 border-red-500 text-red-200 font-bold ring-2 ring-red-500/30";
            } else {
              btnClass += "bg-slate-950/40 border-purple-500/10 text-gray-500 opacity-60";
            }
          }

          return `
            <button onclick="handleDetectiveSelect('${current.id}', ${stepNo})" ${userAns ? 'disabled' : ''} class="${btnClass}">
              <span>${step}</span>
              ${userAns && stepNo === current.errorStep ? '<span class="text-emerald-400 font-black flex items-center gap-1">✓ İLK HATA BURADA</span>' : ''}
              ${userAns && isSelected && !isCorrectStep ? '<span class="text-red-400 font-black flex items-center gap-1">✗ BU ADIM DOĞRU</span>' : ''}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Açıklama Kutusu (Cevaplandıktan Sonra) -->
      ${userAns ? `
        <div class="p-5 rounded-2xl bg-purple-950/70 border border-purple-500/40 text-xs sm:text-sm text-gray-200 space-y-2 animate-fadeIn">
          <span class="font-bold text-pink-400 block"><i class="ph ph-check-circle"></i> Matematiksel Çözüm Açıklaması:</span>
          <p>${current.explanation}</p>
        </div>
      ` : ''}

      <!-- Sonraki Hata Görevi -->
      <div class="flex items-center justify-between pt-2">
        <span class="text-xs text-gray-400">Görev: ${activeDetectiveIndex + 1} / ${detectives.length}</span>
        <button onclick="nextDetectiveQuestion()" class="px-5 py-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-purple-200 text-xs font-bold border border-purple-500/30 transition-all">
          Sonraki Dedektif Görevi ➔
        </button>
      </div>

    </div>
  `;
}

function handleDetectiveSelect(questId, stepNo) {
  detectiveAnswers[questId] = stepNo;
  renderActivitiesPage();
}

function nextDetectiveQuestion() {
  const detectives = ACADEMY_MODULES_DATA.activities.errorDetective;
  activeDetectiveIndex = (activeDetectiveIndex + 1) % detectives.length;
  renderActivitiesPage();
}

/* ==========================================================================
   4. MERVE SAMAK AKADEMİ ANTETLİ ETKİNLİK KAĞIDI YAZDIRMA
   ========================================================================== */
function printColoringWorksheet() {
  const current = ACADEMY_MODULES_DATA.activities.coloring[activeColoringIndex];
  
  let printArea = document.getElementById('ms-print-container');
  if (!printArea) {
    printArea = document.createElement('div');
    printArea.id = 'ms-print-container';
    document.body.appendChild(printArea);
  }

  printArea.innerHTML = `
    <div class="ms-print-wrapper p-8 bg-white text-black font-sans text-xs leading-normal">
      
      <!-- Antet -->
      <div class="border-2 border-black rounded-xl p-4 mb-5 flex items-center justify-between gap-4">
        <div>
          <h1 class="text-base font-black tracking-tight uppercase">MERVE SAMAK AKADEMİ</h1>
          <p class="text-[11px] font-bold text-gray-700">8. SINIF LGS MATEMATİK KAZANIM ETKİNLİK FÖYÜ</p>
          <p class="text-[10px] font-medium text-gray-600 mt-0.5">Etkinlik: <strong>${current.title}</strong></p>
        </div>

        <table class="border-collapse border border-black text-[10px]">
          <tr>
            <td class="border border-black px-2 py-1 font-bold bg-gray-100">Öğrencinin Adı:</td>
            <td class="border border-black px-3 py-1 w-44"></td>
            <td class="border border-black px-2 py-1 font-bold bg-gray-100">Tarih:</td>
            <td class="border border-black px-2 py-1 w-20">__/__/2025</td>
          </tr>
          <tr>
            <td class="border border-black px-2 py-1 font-bold bg-gray-100">Sınıfı / No:</td>
            <td class="border border-black px-3 py-1">8 / _____ &nbsp; No: _____</td>
            <td class="border border-black px-2 py-1 font-bold bg-gray-100">Not:</td>
            <td class="border border-black px-2 py-1 font-bold text-center">_____</td>
          </tr>
        </table>
      </div>

      <!-- Yönerge -->
      <div class="border border-gray-400 p-3 rounded-lg mb-4 text-[11px]">
        <strong>Etkinlik Yönergesi:</strong> Aşağıdaki tabloda yer alan üslü / köklü ifadelerin değerini hesaplayınız. Elde ettiğiniz sonuca göre kutuyu altındaki renk tablosuna uygun renkle boyayınız.
      </div>

      <!-- Renk Tablosu -->
      <div class="grid grid-cols-4 gap-2 mb-6">
        ${current.palette.map(p => `
          <div class="border border-black p-2 rounded text-center">
            <div class="w-full h-4 border border-gray-300 mb-1" style="background-color: ${p.color};"></div>
            <strong class="text-[10px] block">${p.label}</strong>
          </div>
        `).join('')}
      </div>

      <!-- Çizim / Boyama Grid -->
      <div class="flex justify-center mb-6">
        <table class="border-2 border-black border-collapse text-center">
          ${current.grid.map(row => `
            <tr>
              ${row.map(cell => `
                <td class="border-2 border-black w-24 h-24 text-sm font-bold p-1">
                  $${cell.expr}$
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </table>
      </div>

      <div class="pt-4 border-t border-gray-400 flex justify-between text-[10px] text-gray-600">
        <span>Merve Samak Akademi • www.mervesamakakademi.com</span>
        <span>Merve SAMAK - Matematik Öğretmeni</span>
      </div>

    </div>
  `;

  if (window.renderMathInElementSafely) {
    window.renderMathInElementSafely(printArea);
  }

  setTimeout(() => window.print(), 350);
}

function printDetectiveWorksheet() {
  const current = ACADEMY_MODULES_DATA.activities.errorDetective[activeDetectiveIndex];
  let printArea = document.getElementById('ms-print-container');
  if (!printArea) {
    printArea = document.createElement('div');
    printArea.id = 'ms-print-container';
    document.body.appendChild(printArea);
  }

  printArea.innerHTML = `
    <div class="ms-print-wrapper p-8 bg-white text-black font-sans text-xs leading-normal">
      <div class="border-2 border-black rounded-xl p-4 mb-5 flex items-center justify-between gap-4">
        <div>
          <h1 class="text-base font-black tracking-tight uppercase">MERVE SAMAK AKADEMİ</h1>
          <p class="text-[11px] font-bold text-gray-700">8. SINIF MATEMATİK HATA DEDEKTİFLİĞİ ETKİNLİĞİ</p>
          <p class="text-[10px] font-medium text-gray-600 mt-0.5">Konu: <strong>${current.title}</strong></p>
        </div>
        <table class="border-collapse border border-black text-[10px]">
          <tr>
            <td class="border border-black px-2 py-1 font-bold bg-gray-100">Adı Soyadı:</td>
            <td class="border border-black px-3 py-1 w-44"></td>
          </tr>
          <tr>
            <td class="border border-black px-2 py-1 font-bold bg-gray-100">Sınıf / No:</td>
            <td class="border border-black px-3 py-1">8 / ___ &nbsp; No: ___</td>
          </tr>
        </table>
      </div>

      <div class="p-4 border border-black rounded-lg mb-4 text-sm font-semibold">
        ${current.problem}
      </div>

      <div class="space-y-3 mb-6">
        ${current.steps.map(step => `
          <div class="p-3 border border-gray-400 rounded-lg text-xs">
            ${step}
          </div>
        `).join('')}
      </div>

      <div class="border border-black p-4 rounded-lg space-y-2 mb-6">
        <strong class="text-xs">DEDEKTİF NOTU:</strong>
        <p class="text-[11px]">İlk hata kaçıncı adımda yapılmıştır? Nedenini matematiksel kurallarla açıklayınız:</p>
        <div class="h-20 border-b border-dotted border-gray-400"></div>
      </div>

      <div class="pt-4 border-t border-gray-400 flex justify-between text-[10px] text-gray-600">
        <span>Merve Samak Akademi • 8. Sınıf LGS Etkinlikleri</span>
        <span>Merve SAMAK - Matematik Öğretmeni</span>
      </div>
    </div>
  `;

  if (window.renderMathInElementSafely) {
    window.renderMathInElementSafely(printArea);
  }

  setTimeout(() => window.print(), 350);
}

// Global Atamalar
window.renderActivitiesPage = renderActivitiesPage;
window.switchActivityTab = switchActivityTab;
window.selectColoringActivity = selectColoringActivity;
window.selectPaletteColor = selectPaletteColor;
window.paintCell = paintCell;
window.clearColoring = clearColoring;
window.switchMatchingSet = switchMatchingSet;
window.restartMatchingGame = restartMatchingGame;
window.flipMatchingCard = flipMatchingCard;
window.handleDetectiveSelect = handleDetectiveSelect;
window.nextDetectiveQuestion = nextDetectiveQuestion;
window.printColoringWorksheet = printColoringWorksheet;
window.printDetectiveWorksheet = printDetectiveWorksheet;
