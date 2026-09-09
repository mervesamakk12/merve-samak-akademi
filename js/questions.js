/**
 * Merve SAMAK AKADEMİ - Soru Dünyası Modülü (Kazanım & LGS Yeni Nesil Testleri)
 */

let activeQuestionUnit = 'all';
let activeQuestionType = 'all'; // 'all', 'kazanim', 'yeninesil'
let userAnswersState = {}; // { questionId: { selected: 'A', isCorrect: true, revealedExplanation: false } }
let questionStats = { correct: 0, wrong: 0, total: 0 };

function renderQuestionsPage() {
  const container = document.getElementById('questions-list-container');
  const unitFilterSelect = document.getElementById('question-unit-filter');
  const statsContainer = document.getElementById('questions-live-stats');
  if (!container) return;

  // Filtre Seçeneklerini Doldur
  if (unitFilterSelect && unitFilterSelect.options.length <= 1) {
    const units = [
      { id: 'all', name: 'Tüm Konular (8. Sınıf LGS)' },
      { id: 'carpanlar-ve-katlar', name: 'Çarpanlar ve Katlar' },
      { id: 'uslu-ifadeler', name: 'Üslü İfadeler' },
      { id: 'karekoklu-ifadeler', name: 'Kareköklü İfadeler' },
      { id: 'cebirsel-ifadeler', name: 'Cebirsel İfadeler ve Özdeşlikler' }
    ];
    unitFilterSelect.innerHTML = units.map(u => `
      <option value="${u.id}" ${activeQuestionUnit === u.id ? 'selected' : ''}>${u.name}</option>
    `).join('');
  }

  // Soruları Filtrele
  let filtered = ACADEMY_MODULES_DATA.questions;
  if (activeQuestionUnit !== 'all') {
    filtered = filtered.filter(q => q.unit === activeQuestionUnit);
  }
  if (activeQuestionType !== 'all') {
    filtered = filtered.filter(q => q.type === activeQuestionType);
  }

  // İstatistik Çubuğu
  updateQuestionStatsUI();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 text-pink-400 flex items-center justify-center text-3xl">
          <i class="ph ph-magnifying-glass"></i>
        </div>
        <h3 class="text-xl font-bold text-white">Bu Kriterde Soru Bulunamadı</h3>
        <p class="text-xs text-gray-400">Filtreleri sıfırlayarak tüm kazanım ve yeni nesil soruları görebilirsiniz.</p>
        <button onclick="resetQuestionFilters()" class="px-5 py-2.5 rounded-xl bg-gradient-brand text-white text-xs font-bold shadow-lg shadow-pink-500/25">
          Tüm Soruları Göster
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((q, index) => {
    const ansState = userAnswersState[q.id];
    const isAnswered = !!ansState;
    const isCorrect = ansState ? ansState.isCorrect : false;
    const isExplanationOpen = ansState ? ansState.revealedExplanation : false;

    return `
      <div id="question-card-${q.id}" class="glass-panel p-6 md:p-8 rounded-3xl space-y-6 border border-purple-500/20 transition-all hover:border-pink-500/40 relative">
        <!-- Soru Üst Başlık & Rozetler -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-purple-500/10">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-xl bg-gradient-brand text-white text-xs font-black flex items-center justify-center shadow-md shadow-pink-500/20">
              #${index + 1}
            </span>
            <span class="text-sm font-bold text-white">${q.unitName}</span>
          </div>

          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold ${q.type === 'yeninesil' ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30' : 'bg-purple-900/50 text-purple-200 border border-purple-500/30'}">
              <i class="ph ${q.type === 'yeninesil' ? 'ph-sparkle' : 'ph-check-circle'}"></i> ${q.typeName}
            </span>
            ${isAnswered ? `
              <span class="px-3 py-1 rounded-full text-xs font-black ${isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'} flex items-center gap-1">
                <i class="ph ${isCorrect ? 'ph-check-bold' : 'ph-x-bold'}"></i> ${isCorrect ? 'DOĞRU' : 'YANLIŞ'}
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Soru Metni -->
        <div class="text-white text-base md:text-lg leading-relaxed font-medium font-sans">
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
                btnClass += "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/30";
                badgeClass += "bg-emerald-500 text-white font-black";
              } else if (opt.key === ansState.selected && !isCorrect) {
                btnClass += "bg-red-950/60 border-red-500 text-red-200 font-bold ring-2 ring-red-500/30";
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
    revealedExplanation: true // Cevap verilince çözümü otomatik göster
  };

  // İstatistik güncelle
  questionStats.total++;
  if (isCorrect) {
    questionStats.correct++;
    showToast('🎉 Tebrikler! Doğru cevap.');
  } else {
    questionStats.wrong++;
    showToast('❌ Yanlış cevap! Çözüm adımlarını inceleyin.');
  }

  renderQuestionsPage();
}

function toggleHint(questionId) {
  const box = document.getElementById(`hint-box-${questionId}`);
  if (box) {
    box.classList.toggle('hidden');
  }
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
    btn.className = 'question-type-tab-btn px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-purple-900/30 transition-all border border-purple-500/20';
  });
  const activeBtn = document.getElementById(`qtype-btn-${type}`);
  if (activeBtn) {
    activeBtn.className = 'question-type-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-gradient-brand text-white shadow-lg shadow-pink-500/20';
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

function updateQuestionStatsUI() {
  const correctElem = document.getElementById('q-stats-correct');
  const wrongElem = document.getElementById('q-stats-wrong');
  const netElem = document.getElementById('q-stats-net');
  const percentElem = document.getElementById('q-stats-percent');

  if (correctElem) correctElem.innerText = questionStats.correct;
  if (wrongElem) wrongElem.innerText = questionStats.wrong;
  if (netElem) {
    // LGS standardı: 3 yanlış 1 doğruyu götürür
    const net = Math.max(0, questionStats.correct - (questionStats.wrong / 3));
    netElem.innerText = net % 1 === 0 ? net : net.toFixed(2);
  }
  if (percentElem) {
    const pct = questionStats.total > 0 ? Math.round((questionStats.correct / questionStats.total) * 100) : 0;
    percentElem.innerText = `%${pct}`;
  }
}

window.renderQuestionsPage = renderQuestionsPage;
window.handleOptionSelect = handleOptionSelect;
window.toggleHint = toggleHint;
window.toggleExplanation = toggleExplanation;
window.resetSingleQuestion = resetSingleQuestion;
window.filterQuestionsByType = filterQuestionsByType;
window.handleQuestionUnitChange = handleQuestionUnitChange;
window.resetQuestionFilters = resetQuestionFilters;
