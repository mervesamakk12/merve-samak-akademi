/**
 * Merve SAMAK AKADEMİ - Konu Notları Modülü (Özet, Formüller & Tuzak Noktalar)
 */

let activeNoteUnit = null;

function renderNotesPage() {
  const container = document.getElementById('notes-grid-container');
  if (!container) return;

  const notesList = ACADEMY_MODULES_DATA.notes;

  container.innerHTML = notesList.map((note, index) => {
    return `
      <div class="glass-panel p-6 rounded-3xl flex flex-col justify-between space-y-6 hover:border-pink-500/50 transition-all duration-300 group hover:-translate-y-1.5 border border-purple-500/20 relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${note.badgeColor} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity"></div>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr ${note.badgeColor} flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
              <i class="ph ${note.icon}"></i>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-purple-900/60 text-purple-200 border border-purple-500/30">
              8. Sınıf LGS
            </span>
          </div>

          <div>
            <h3 class="text-xl font-black text-white group-hover:text-pink-400 transition-colors">${note.title}</h3>
            <p class="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">${note.summary}</p>
          </div>

          <!-- Rozetler -->
          <div class="flex flex-wrap gap-2 pt-2 text-[11px]">
            <span class="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20 font-semibold flex items-center gap-1">
              <i class="ph ph-function"></i> ${note.formulas.length} Formül & Kural
            </span>
            <span class="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold flex items-center gap-1">
              <i class="ph ph-warning-circle"></i> ${note.traps.length} Tuzak Nokta
            </span>
          </div>
        </div>

        <button onclick="openNoteDetailModal('${note.id}')" class="w-full py-3 rounded-xl bg-purple-900/40 hover:bg-gradient-brand text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-pink-500/25 border border-purple-500/30">
          <span>Özet & Püf Noktaları Aç</span>
          <i class="ph ph-arrow-right font-bold"></i>
        </button>
      </div>
    `;
  }).join('');

  if (window.renderMathInElementSafely) {
    window.renderMathInElementSafely(container);
  }
}

function openNoteDetailModal(unitId) {
  const note = ACADEMY_MODULES_DATA.notes.find(n => n.id === unitId);
  if (!note) return;

  activeNoteUnit = note;
  const modal = document.getElementById('note-detail-modal');
  const titleElem = document.getElementById('note-modal-title');
  const badgeElem = document.getElementById('note-modal-badge');
  const iconElem = document.getElementById('note-modal-icon');
  const contentElem = document.getElementById('note-modal-content');

  if (!modal || !contentElem) return;

  titleElem.innerText = note.title;
  badgeElem.innerText = `8. Sınıf LGS • ${note.formulas.length} Formül • ${note.traps.length} Tuzak`;
  iconElem.className = `w-12 h-12 rounded-2xl bg-gradient-to-tr ${note.badgeColor} flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/20`;
  iconElem.innerHTML = `<i class="ph ${note.icon}"></i>`;

  // Modal İçeriği Oluşturma
  contentElem.innerHTML = `
    <!-- Sekme Navigasyonu -->
    <div class="flex items-center gap-2 border-b border-purple-500/20 pb-3 mb-6 overflow-x-auto">
      <button onclick="switchNoteModalTab('formulas')" id="note-tab-btn-formulas" class="note-modal-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-gradient-brand text-white shadow-lg shadow-pink-500/20">
        📐 Kritik Formüller (${note.formulas.length})
      </button>
      <button onclick="switchNoteModalTab('traps')" id="note-tab-btn-traps" class="note-modal-tab-btn px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-purple-900/30 transition-all border border-purple-500/20">
        ⚠️ Tuzak Noktalar (${note.traps.length})
      </button>
      <button onclick="switchNoteModalTab('tips')" id="note-tab-btn-tips" class="note-modal-tab-btn px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-purple-900/30 transition-all border border-purple-500/20">
        💡 Merve Öğretmen'den Taktikler (${note.tips.length})
      </button>
    </div>

    <!-- 1. Formüller Paneli -->
    <div id="note-panel-formulas" class="note-modal-panel space-y-4">
      ${note.formulas.map((f, i) => `
        <div class="p-5 rounded-2xl bg-[#180b26] border border-purple-500/20 space-y-3">
          <div class="flex items-center gap-2 text-sm font-bold text-pink-400">
            <span class="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs">${i + 1}</span>
            <span>${f.title}</span>
          </div>
          <div class="p-4 rounded-xl bg-purple-950/60 border border-purple-500/30 text-white font-mono text-center text-base md:text-lg overflow-x-auto py-3">
            $$${f.math}$$
          </div>
          <p class="text-xs md:text-sm text-gray-300 leading-relaxed">${f.desc}</p>
        </div>
      `).join('')}
    </div>

    <!-- 2. Tuzak Noktalar Paneli -->
    <div id="note-panel-traps" class="note-modal-panel hidden space-y-4">
      ${note.traps.map(t => `
        <div class="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-2">
          <h4 class="font-bold text-red-400 text-sm md:text-base flex items-center gap-2">
            ${t.title}
          </h4>
          <div class="text-xs md:text-sm text-gray-200 leading-relaxed">
            ${t.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-pink-300 font-bold">$1</strong>')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- 3. Taktikler Paneli -->
    <div id="note-panel-tips" class="note-modal-panel hidden space-y-4">
      ${note.tips.map((tip, i) => `
        <div class="p-5 rounded-2xl bg-gradient-to-r from-pink-950/30 to-purple-950/30 border border-pink-500/30 flex items-start gap-3">
          <div class="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-lg shrink-0 mt-0.5">
            <i class="ph ph-lightbulb font-bold"></i>
          </div>
          <div class="space-y-1">
            <h5 class="text-xs font-bold text-pink-300 uppercase tracking-wider">Altın İpucu #${i + 1}</h5>
            <p class="text-xs md:text-sm text-gray-200 leading-relaxed">${tip}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // KaTeX ile matematiksel formülleri derle
  setTimeout(() => {
    if (window.renderMathInElementSafely) {
      window.renderMathInElementSafely(contentElem);
    }
  }, 50);
}

function closeNoteDetailModal() {
  const modal = document.getElementById('note-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function switchNoteModalTab(tabId) {
  document.querySelectorAll('.note-modal-tab-btn').forEach(btn => {
    btn.className = 'note-modal-tab-btn px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-purple-900/30 transition-all border border-purple-500/20';
  });
  document.querySelectorAll('.note-modal-panel').forEach(p => p.classList.add('hidden'));

  const activeBtn = document.getElementById(`note-tab-btn-${tabId}`);
  const activePanel = document.getElementById(`note-panel-${tabId}`);

  if (activeBtn) {
    activeBtn.className = 'note-modal-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-gradient-brand text-white shadow-lg shadow-pink-500/20';
  }
  if (activePanel) {
    activePanel.classList.remove('hidden');
    if (window.renderMathInElementSafely) {
      window.renderMathInElementSafely(activePanel);
    }
  }
}

window.renderNotesPage = renderNotesPage;
window.openNoteDetailModal = openNoteDetailModal;
window.closeNoteDetailModal = closeNoteDetailModal;
window.switchNoteModalTab = switchNoteModalTab;
