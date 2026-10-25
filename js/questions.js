/**
 * Merve SAMAK AKADEMİ - Soru Dünyası & LGS Test Merkezi
 * - Basitten Zora 3 Seviyeli MEB & LGS Çıkmış Soru Sistemi
 * - Akıllı Tahta Dokunmatik Sunum Modu
 * - Merve Samak Akademi Antetli A4 PDF Yazdırma Motoru
 */

let activeQuestionUnit = 'all';
let activeQuestionType = 'all'; // 'all', 'isinma', 'ornek', 'cikmis'
let isSmartBoardMode = false;
let userAnswersState = {}; // { questionId: { selected: 'A', isCorrect: true, revealedExplanation: false } }
let questionStats = { correct: 0, wrong: 0, total: 0 };

const LGS_UNITS = [
  { id: 'all', name: 'Tüm Konular (8. Sınıf LGS)' },
  { id: 'carpanlar-ve-katlar', name: '1. Çarpanlar ve Katlar' },
  { id: 'uslu-ifadeler', name: '2. Üslü İfadeler' },
  { id: 'karekoklu-ifadeler', name: '3. Kareköklü İfadeler' },
  { id: 'veri-analizi', name: '4. Veri Analizi' },
  { id: 'olasilik', name: '5. Basit Olayların Olasılığı' },
  { id: 'cebirsel-ifadeler', name: '6. Cebirsel İfadeler ve Özdeşlikler' },
  { id: 'dogrusal-denklemler', name: '7. Doğrusal Denklemler & Eğim' },
  { id: 'esitsizlikler', name: '8. Eşitsizlikler' },
  { id: 'ucgenler', name: '9. Üçgenler, Pisagor & Benzerlik' }
];

function renderQuestionsPage() {
  const container = document.getElementById('questions-list-container');
  const unitFilterSelect = document.getElementById('question-unit-filter');
  if (!container) return;

  // Filtre Seçeneklerini Doldur (9 Ünite)
  if (unitFilterSelect && unitFilterSelect.options.length <= 1) {
    unitFilterSelect.innerHTML = LGS_UNITS.map(u => `
      <option value="${u.id}" ${activeQuestionUnit === u.id ? 'selected' : ''}>${u.name}</option>
    `).join('');
  }

  // Soruları Filtrele (Basitten Zora)
  let filtered = (ACADEMY_MODULES_DATA && ACADEMY_MODULES_DATA.questions) ? [...ACADEMY_MODULES_DATA.questions] : [];
  
  if (activeQuestionUnit !== 'all') {
    filtered = filtered.filter(q => q.unit === activeQuestionUnit);
  }
  
  if (activeQuestionType !== 'all') {
    if (activeQuestionType === 'isinma' || activeQuestionType === 'kazanim') {
      filtered = filtered.filter(q => q.type === 'isinma' || q.type === 'kazanim' || q.level === 1);
    } else if (activeQuestionType === 'ornek') {
      filtered = filtered.filter(q => q.type === 'ornek' || q.level === 2);
    } else if (activeQuestionType === 'cikmis' || activeQuestionType === 'yeninesil') {
      filtered = filtered.filter(q => q.type === 'cikmis' || q.type === 'yeninesil' || q.level === 3);
    }
  }

  // Basitten zora sıralama: Seviye 1 -> Seviye 2 -> Seviye 3
  filtered.sort((a, b) => (a.level || 1) - (b.level || 1));

  // Canlı İstatistikleri Güncelle
  updateQuestionStatsUI();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-lg mx-auto border border-purple-500/20">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 text-pink-400 flex items-center justify-center text-3xl">
          <i class="ph ph-magnifying-glass"></i>
        </div>
        <h3 class="text-xl font-bold text-white">Bu Kriterde Soru Bulunamadı</h3>
        <p class="text-xs text-gray-400">Filtreleri sıfırlayarak tüm seviyelerdeki soruları görebilirsiniz.</p>
        <button onclick="resetQuestionFilters()" class="px-5 py-2.5 rounded-xl bg-gradient-brand text-white text-xs font-bold shadow-lg shadow-pink-500/25 hover:brightness-110 transition-all">
          Tüm Soruları Göster
        </button>
      </div>
    `;
    return;
  }

  // Soru Listesi Render
  container.innerHTML = filtered.map((q, index) => {
    const ansState = userAnswersState[q.id];
    const isAnswered = !!ansState;
    const isCorrect = ansState ? ansState.isCorrect : false;
    const isExplanationOpen = ansState ? ansState.revealedExplanation : false;

    // Seviye Rozet Renkleri
    let levelBadge = '';
    if (q.level === 1 || q.type === 'isinma' || q.type === 'kazanim') {
      levelBadge = `<span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">🟢 1. Seviye: Temel Isınma</span>`;
    } else if (q.level === 2 || q.type === 'ornek') {
      levelBadge = `<span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-500/40">🟡 2. Seviye: MEB Örnek Soru</span>`;
    } else {
      levelBadge = `<span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-950 text-rose-300 border border-rose-500/40">🔴 3. Seviye: LGS Çıkmış Soru</span>`;
    }

    const cardFontSize = isSmartBoardMode ? 'text-lg md:text-xl' : 'text-base md:text-lg';

    return `
      <div id="question-card-${q.id}" class="glass-panel p-6 md:p-8 rounded-3xl space-y-6 border border-purple-500/20 transition-all hover:border-pink-500/40 relative ${isSmartBoardMode ? 'ring-2 ring-purple-500/30 shadow-2xl' : ''}">
        
        <!-- Üst Başlık & Rozetler -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-purple-500/15">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-xl bg-gradient-brand text-white text-xs font-black flex items-center justify-center shadow-md shadow-pink-500/20">
              #${index + 1}
            </span>
            <div>
              <span class="text-sm font-bold text-white block">${q.unitName}</span>
              ${q.source ? `<span class="text-[10px] text-purple-300 font-semibold block">${q.source}</span>` : ''}
            </div>
          </div>

          <div class="flex items-center gap-2">
            ${levelBadge}
            ${isAnswered ? `
              <span class="px-3 py-1 rounded-full text-xs font-black ${isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'} flex items-center gap-1">
                <i class="ph ${isCorrect ? 'ph-check-bold' : 'ph-x-bold'}"></i> ${isCorrect ? 'DOĞRU' : 'YANLIŞ'}
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Soru Metni -->
        <div class="text-white ${cardFontSize} leading-relaxed font-medium font-sans">
          ${q.questionText}
        </div>

        <!-- Şıklar (A, B, C, D) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          ${q.options.map(opt => {
            let btnClass = "p-4 rounded-2xl border text-left font-medium text-sm md:text-base transition-all flex items-center gap-3.5 ";
            let badgeClass = "w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ";

            if (!isAnswered) {
              btnClass += "bg-[#180c25]/80 hover:bg-purple-900/40 border-purple-500/20 hover:border-pink-500/50 text-gray-200 cursor-pointer hover:scale-[1.01]";
              badgeClass += "bg-purple-900/60 text-purple-300 border border-purple-500/30";
            } else {
              if (opt.key === q.correctAnswer) {
                btnClass += "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/30";
                badgeClass += "bg-emerald-500 text-white font-black";
              } else if (opt.key === ansState.selected && !isCorrect) {
                btnClass += "bg-red-950/70 border-red-500 text-red-200 font-bold ring-2 ring-red-500/30";
                badgeClass += "bg-red-500 text-white font-black";
              } else {
                btnClass += "bg-[#140a1d]/60 border-purple-500/10 text-gray-500 opacity-60 cursor-not-allowed";
                badgeClass += "bg-purple-950/40 text-gray-500";
              }
            }

            return `
              <button onclick="handleOptionSelect('${q.id}', '${opt.key}')" ${isAnswered ? 'disabled' : ''} class="${btnClass}">
                <span class="${badgeClass}">${opt.key}</span>
                <span class="flex-1">${opt.text}</span>
                ${isAnswered && opt.key === q.correctAnswer ? '<i class="ph ph-check-circle-fill text-emerald-400 text-xl ml-auto"></i>' : ''}
                ${isAnswered && opt.key === ansState.selected && !isCorrect ? '<i class="ph ph-x-circle-fill text-red-400 text-xl ml-auto"></i>' : ''}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Alt Eylemler & İpucu & Çözüm Butonları -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-purple-500/15">
          <div class="flex items-center gap-2">
            ${q.hint ? `
              <button onclick="toggleHint('${q.id}')" class="px-3.5 py-1.5 rounded-xl bg-purple-900/30 hover:bg-purple-900/60 text-purple-300 text-xs font-semibold border border-purple-500/25 flex items-center gap-1.5 transition-colors">
                <i class="ph ph-lightbulb"></i> İpucu Al
              </button>
            ` : ''}
            <button onclick="toggleExplanation('${q.id}')" class="px-3.5 py-1.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-300 text-xs font-semibold border border-pink-500/30 flex items-center gap-1.5 transition-colors">
              <i class="ph ph-book-open"></i> ${isExplanationOpen ? 'Çözümü Gizle' : 'MEB Çözümünü Göster'}
            </button>
          </div>

          ${isAnswered ? `
            <button onclick="resetSingleQuestion('${q.id}')" class="text-xs text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-1">
              <i class="ph ph-arrow-counter-clockwise"></i> Tekrar Çöz
            </button>
          ` : ''}
        </div>

        <!-- Gizli İpucu Kutusu -->
        <div id="hint-box-${q.id}" class="hidden p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200">
          <span class="font-bold text-pink-400 flex items-center gap-1 mb-1"><i class="ph ph-lightbulb-filament"></i> Merve Öğretmen İpucu:</span>
          ${q.hint}
        </div>

        <!-- Çözüm Açıklaması Kutusu -->
        <div id="explanation-box-${q.id}" class="${isExplanationOpen ? '' : 'hidden'} p-6 rounded-2xl bg-gradient-to-br from-purple-950/70 to-[#190a29] border border-purple-500/40 text-sm text-gray-200 space-y-3">
          ${q.explanation}
        </div>
      </div>
    `;
  }).join('');

  if (window.renderMathInElementSafely) {
    window.renderMathInElementSafely(container);
  }
}

function handleOptionSelect(questionId, selectedOption) {
  const question = ACADEMY_MODULES_DATA.questions.find(q => q.id === questionId);
  if (!question || userAnswersState[questionId]) return;

  const isCorrect = selectedOption === question.correctAnswer;
  userAnswersState[questionId] = {
    selected: selectedOption,
    isCorrect: isCorrect,
    revealedExplanation: true
  };

  questionStats.total++;
  if (isCorrect) {
    questionStats.correct++;
    if (typeof showToast === 'function') showToast('🎉 Tebrikler! Doğru cevap.');
  } else {
    questionStats.wrong++;
    if (typeof showToast === 'function') showToast('❌ Yanlış cevap! MEB çözüm adımlarını inceleyin.');
  }

  renderQuestionsPage();
}

function toggleHint(questionId) {
  const box = document.getElementById(`hint-box-${questionId}`);
  if (box) box.classList.toggle('hidden');
}

function toggleExplanation(questionId) {
  const box = document.getElementById(`explanation-box-${questionId}`);
  if (box) {
    box.classList.toggle('hidden');
    if (userAnswersState[questionId]) {
      userAnswersState[questionId].revealedExplanation = !box.classList.contains('hidden');
    }
    if (!box.classList.contains('hidden') && window.renderMathInElementSafely) {
      window.renderMathInElementSafely(box);
    }
  }
}

function resetSingleQuestion(questionId) {
  if (userAnswersState[questionId]) {
    if (userAnswersState[questionId].isCorrect) {
      questionStats.correct = Math.max(0, questionStats.correct - 1);
    } else {
      questionStats.wrong = Math.max(0, questionStats.wrong - 1);
    }
    questionStats.total = Math.max(0, questionStats.total - 1);
    delete userAnswersState[questionId];
    renderQuestionsPage();
  }
}

function filterQuestionsByType(type) {
  activeQuestionType = type;
  document.querySelectorAll('.question-type-tab-btn').forEach(btn => {
    btn.className = 'question-type-tab-btn px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-purple-900/30 transition-all border border-purple-500/20';
  });
  const activeBtn = document.getElementById(`qtype-btn-${type}`);
  if (activeBtn) {
    activeBtn.className = 'question-type-tab-btn px-3.5 py-2 rounded-xl text-xs font-bold transition-all bg-gradient-brand text-white shadow-lg shadow-pink-500/20';
  }
  renderQuestionsPage();
}

function handleQuestionUnitChange(selectElem) {
  activeQuestionUnit = selectElem.value;
  renderQuestionsPage();
}

function resetQuestionFilters() {
  activeQuestionUnit = 'all';
  activeQuestionType = 'all';
  const select = document.getElementById('question-unit-filter');
  if (select) select.value = 'all';
  filterQuestionsByType('all');
}

function toggleSmartBoardMode() {
  isSmartBoardMode = !isSmartBoardMode;
  const btn = document.getElementById('smart-board-toggle-btn');
  if (btn) {
    if (isSmartBoardMode) {
      btn.className = 'px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-bold shadow-lg shadow-pink-500/30 flex items-center gap-1.5 transition-all';
      btn.innerHTML = '<i class="ph ph-chalkboard-simple font-bold"></i> <span>Akıllı Tahta: AÇIK</span>';
      if (typeof showToast === 'function') showToast('🖥️ Akıllı Tahta Dokunmatik Modu Açıldı');
    } else {
      btn.className = 'px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900/60 text-purple-200 text-xs font-bold border border-purple-500/30 flex items-center gap-1.5 transition-all';
      btn.innerHTML = '<i class="ph ph-chalkboard-simple font-bold"></i> <span>Akıllı Tahta Modu</span>';
    }
  }
  renderQuestionsPage();
}

function updateQuestionStatsUI() {
  const correctElem = document.getElementById('q-stats-correct');
  const wrongElem = document.getElementById('q-stats-wrong');
  const netElem = document.getElementById('q-stats-net');
  const percentElem = document.getElementById('q-stats-percent');

  if (correctElem) correctElem.innerText = questionStats.correct;
  if (wrongElem) wrongElem.innerText = questionStats.wrong;
  if (netElem) {
    const net = Math.max(0, questionStats.correct - (questionStats.wrong / 3));
    netElem.innerText = net % 1 === 0 ? net : net.toFixed(2);
  }
  if (percentElem) {
    const pct = questionStats.total > 0 ? Math.round((questionStats.correct / questionStats.total) * 100) : 0;
    percentElem.innerText = `%${pct}`;
  }
}

/* ==========================================================================
   MERVE SAMAK AKADEMİ ANTETLİ PDF YAZDIRMA MOTORU
   ========================================================================== */
function printMerveSamakTest() {
  // Aktif filtrelenmiş soruları al
  let filtered = (ACADEMY_MODULES_DATA && ACADEMY_MODULES_DATA.questions) ? [...ACADEMY_MODULES_DATA.questions] : [];
  if (activeQuestionUnit !== 'all') {
    filtered = filtered.filter(q => q.unit === activeQuestionUnit);
  }
  if (activeQuestionType !== 'all') {
    if (activeQuestionType === 'isinma' || activeQuestionType === 'kazanim') {
      filtered = filtered.filter(q => q.type === 'isinma' || q.type === 'kazanim' || q.level === 1);
    } else if (activeQuestionType === 'ornek') {
      filtered = filtered.filter(q => q.type === 'ornek' || q.level === 2);
    } else if (activeQuestionType === 'cikmis' || activeQuestionType === 'yeninesil') {
      filtered = filtered.filter(q => q.type === 'cikmis' || q.type === 'yeninesil' || q.level === 3);
    }
  }
  filtered.sort((a, b) => (a.level || 1) - (b.level || 1));

  if (filtered.length === 0) {
    alert('Yazdırılacak soru bulunamadı. Lütfen filtreyi değiştiriniz.');
    return;
  }

  const selectedUnitObj = LGS_UNITS.find(u => u.id === activeQuestionUnit);
  const testTitle = selectedUnitObj ? selectedUnitObj.name : "Tüm 8. Sınıf LGS Konuları";

  // Mevcut print container varsa temizle
  let printArea = document.getElementById('ms-print-container');
  if (!printArea) {
    printArea = document.createElement('div');
    printArea.id = 'ms-print-container';
    document.body.appendChild(printArea);
  }

  // Antetli Sınav Şablonunu Oluştur
  printArea.innerHTML = `
    <div class="ms-print-wrapper p-8 bg-white text-black font-sans text-xs leading-normal">
      
      <!-- Antet Başlığı (Merve Samak Akademi Resmi Sınav Kağıdı) -->
      <div class="border-2 border-black rounded-xl p-4 mb-5 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 border border-black rounded-lg flex items-center justify-center font-bold text-center text-[10px] leading-tight p-1 bg-gray-50">
            MERVE SAMAK<br>AKADEMİ
          </div>
          <div>
            <h1 class="text-base font-black tracking-tight uppercase">MERVE SAMAK AKADEMİ</h1>
            <p class="text-[11px] font-bold text-gray-700">8. SINIF LGS MATEMATİK KAZANIM & ÇIKMIŞ SORULAR TESTİ</p>
            <p class="text-[10px] font-medium text-gray-600 mt-0.5">Konu: <strong>${testTitle}</strong> • Soru Sayısı: <strong>${filtered.length} Soru</strong></p>
          </div>
        </div>

        <!-- Öğrenci Bilgi Tablosu -->
        <table class="border-collapse border border-black text-[10px]">
          <tr>
            <td class="border border-black px-2 py-1 font-bold bg-gray-100">Adı Soyadı:</td>
            <td class="border border-black px-3 py-1 w-44"></td>
            <td class="border border-black px-2 py-1 font-bold bg-gray-100">Tarih:</td>
            <td class="border border-black px-2 py-1 w-20">__/__/2025</td>
          </tr>
          <tr>
            <td class="border border-black px-2 py-1 font-bold bg-gray-100">Sınıfı / No:</td>
            <td class="border border-black px-3 py-1">8 / _____ &nbsp; No: _____</td>
            <td class="border border-black px-2 py-1 font-bold bg-gray-100">PUAN:</td>
            <td class="border border-black px-2 py-1 font-bold text-center text-sm">/ 100</td>
          </tr>
        </table>
      </div>

      <!-- Sınav Soruları 2 Sütunlu Grid -->
      <div class="grid grid-cols-2 gap-x-6 gap-y-6">
        ${filtered.map((q, idx) => `
          <div class="border border-gray-400 rounded-lg p-3.5 space-y-2 break-inside-avoid bg-white">
            <div class="flex items-center justify-between border-b border-gray-200 pb-1.5">
              <span class="font-black text-xs">Soru ${idx + 1}.</span>
              <span class="text-[9px] font-bold text-gray-600 uppercase">[${q.typeName}]</span>
            </div>
            
            <div class="text-[11px] leading-relaxed font-normal py-1">
              ${q.questionText}
            </div>

            <div class="grid grid-cols-2 gap-1.5 pt-1.5">
              ${q.options.map(opt => `
                <div class="flex items-start gap-1.5 text-[10px]">
                  <span class="w-4 h-4 border border-black rounded-full flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">${opt.key}</span>
                  <span class="flex-1">${opt.text}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Optik Form & Öğretmen Notu -->
      <div class="mt-6 pt-4 border-t-2 border-black flex items-center justify-between gap-4 break-inside-avoid">
        <div>
          <span class="font-bold text-[10px] block mb-1">OPTİK CEVAP KODLAMA ALANI:</span>
          <div class="flex flex-wrap gap-2 text-[9px] font-mono">
            ${filtered.map((_, i) => `
              <span class="border border-gray-400 px-1 py-0.5 rounded">
                ${i + 1}: (A) (B) (C) (D)
              </span>
            `).join('')}
          </div>
        </div>
        <div class="text-right text-[10px]">
          <span class="font-bold block">Merve SAMAK</span>
          <span class="text-gray-600 block">Matematik Öğretmeni</span>
          <span class="text-[9px] text-gray-500 italic">Başarılar Dilerim.</span>
        </div>
      </div>

    </div>
  `;

  // KaTeX ile yazdırılacak alandaki formülleri derle
  if (window.renderMathInElementSafely) {
    window.renderMathInElementSafely(printArea);
  }

  // Yazdır
  setTimeout(() => {
    window.print();
  }, 350);
}

// Global Fonksiyonlar
window.renderQuestionsPage = renderQuestionsPage;
window.handleOptionSelect = handleOptionSelect;
window.toggleHint = toggleHint;
window.toggleExplanation = toggleExplanation;
window.resetSingleQuestion = resetSingleQuestion;
window.filterQuestionsByType = filterQuestionsByType;
window.handleQuestionUnitChange = handleQuestionUnitChange;
window.resetQuestionFilters = resetQuestionFilters;
window.toggleSmartBoardMode = toggleSmartBoardMode;
window.printMerveSamakTest = printMerveSamakTest;
