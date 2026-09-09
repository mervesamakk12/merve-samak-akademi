/**
 * Merve SAMAK AKADEMİ - 8. Sınıf LGS Konu Anlatımı & Ders Fasikülleri (PDF & Akıllı Tahta Modu)
 */

let activeNoteUnit = null;
let currentFontSizePercent = 100;

function renderNotesPage() {
  const container = document.getElementById('notes-grid-container');
  if (!container) return;

  const notesList = ACADEMY_MODULES_DATA.notes;

  container.innerHTML = notesList.map((note, index) => {
    return `
      <div class="glass-panel p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-6 hover:border-pink-500/50 transition-all duration-300 group hover:-translate-y-1.5 border border-purple-500/20 relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${note.badgeColor} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity"></div>
        
        <div class="space-y-4">
          <!-- Üst Bilgi Rozeti -->
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr ${note.badgeColor} flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
              <i class="ph ${note.icon}"></i>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/15 text-pink-300 border border-pink-500/30">
                Ünite #${note.unitNo}
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-purple-900/60 text-purple-200 border border-purple-500/30">
                8. Sınıf LGS
              </span>
            </div>
          </div>

          <!-- Başlık & Açıklama -->
          <div>
            <h3 class="text-xl font-black text-white group-hover:text-pink-400 transition-colors">${note.title}</h3>
            <p class="text-xs text-pink-300 font-mono mt-1 font-semibold">${note.kazanimCode}</p>
            <p class="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">${note.summary}</p>
          </div>

          <!-- Modül Özellik Rozetleri -->
          <div class="flex flex-wrap gap-2 pt-2 text-[11px]">
            <span class="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold flex items-center gap-1">
              <i class="ph ph-file-pdf"></i> Ders Fasikülü (PDF)
            </span>
            <span class="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20 font-semibold flex items-center gap-1">
              <i class="ph ph-chalkboard-teacher"></i> Akıllı Tahta Uyumlu
            </span>
            <span class="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold flex items-center gap-1">
              <i class="ph ph-warning-circle"></i> ${note.traps.length} Tuzak Nokta
            </span>
          </div>
        </div>

        <!-- Butonlar -->
        <div class="grid grid-cols-2 gap-2 pt-2">
          <button onclick="openNotePdfModal('${note.id}')" class="py-3 px-3 rounded-xl bg-gradient-brand hover:opacity-95 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-pink-500/20">
            <i class="ph ph-presentation font-bold text-base"></i>
            <span>Derste Aç / PDF</span>
          </button>
          <button onclick="quickPrintNotePdf('${note.id}')" class="py-3 px-3 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-purple-500/30">
            <i class="ph ph-printer font-bold text-base"></i>
            <span>Yazdır / İndir</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.renderMathInElementSafely) {
    window.renderMathInElementSafely(container);
  }
}

function openNotePdfModal(unitId) {
  const note = ACADEMY_MODULES_DATA.notes.find(n => n.id === unitId) || ACADEMY_MODULES_DATA.notes[0];
  if (!note) return;

  activeNoteUnit = note;
  currentFontSizePercent = 100;

  const modal = document.getElementById('note-detail-modal');
  const modalContainer = document.getElementById('note-modal-body-container');
  if (!modal || !modalContainer) return;

  // Tüm ünitelerin listesi (açılır menü için)
  const allNotes = ACADEMY_MODULES_DATA.notes;
  const currentIndex = allNotes.findIndex(n => n.id === note.id);
  const prevNote = currentIndex > 0 ? allNotes[currentIndex - 1] : null;
  const nextNote = currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null;

  modalContainer.innerHTML = `
    <!-- 1. ÜST SABİT KONTROL / ARAÇ ÇUBUĞU (TOOLBAR - Yazdırmada Gizlenir) -->
    <div id="note-pdf-toolbar" class="no-print sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#12071f]/95 border border-purple-500/30 backdrop-blur-md shadow-xl mb-6">
      
      <!-- Sol: Ünite Seçici & Navigasyon -->
      <div class="flex items-center gap-2 flex-wrap">
        <select onchange="openNotePdfModal(this.value)" class="px-3 py-2 rounded-xl bg-purple-950 border border-purple-500/40 text-white text-xs font-bold focus:outline-none focus:border-pink-500">
          ${allNotes.map(n => `
            <option value="${n.id}" ${n.id === note.id ? 'selected' : ''}>
              ${n.unitNo}. Ünite: ${n.title}
            </option>
          `).join('')}
        </select>

        <div class="flex items-center gap-1">
          <button onclick="${prevNote ? `openNotePdfModal('${prevNote.id}')` : ''}" ${!prevNote ? 'disabled' : ''} class="p-2 rounded-xl bg-purple-900/40 hover:bg-purple-800 disabled:opacity-30 text-white text-xs font-bold transition-all border border-purple-500/20" title="Önceki Ünite">
            <i class="ph ph-caret-left font-bold text-base"></i>
          </button>
          <button onclick="${nextNote ? `openNotePdfModal('${nextNote.id}')` : ''}" ${!nextNote ? 'disabled' : ''} class="p-2 rounded-xl bg-purple-900/40 hover:bg-purple-800 disabled:opacity-30 text-white text-xs font-bold transition-all border border-purple-500/20" title="Sonraki Ünite">
            <i class="ph ph-caret-right font-bold text-base"></i>
          </button>
        </div>
      </div>

      <!-- Orta: Akıllı Tahta & Yazı Büyüteci -->
      <div class="flex items-center gap-2">
        <div class="flex items-center bg-purple-950/80 rounded-xl border border-purple-500/30 p-1">
          <button onclick="changeNoteFontSize(-10)" class="px-2 py-1 text-xs font-bold text-gray-300 hover:text-white hover:bg-purple-800/60 rounded-lg transition-all" title="Yazıyı Küçült">
            A<span class="text-[10px]">-</span>
          </button>
          <span id="note-font-size-indicator" class="px-2 text-[11px] font-mono text-pink-400 font-bold">%100</span>
          <button onclick="changeNoteFontSize(10)" class="px-2 py-1 text-xs font-bold text-gray-300 hover:text-white hover:bg-purple-800/60 rounded-lg transition-all" title="Yazıyı Büyüt (Tahta Modu)">
            A<span class="text-[10px]">+</span>
          </button>
        </div>

        <button onclick="toggleNoteFullscreen()" class="px-3 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-purple-200 hover:text-white text-xs font-bold border border-purple-500/30 transition-all flex items-center gap-1.5" title="Akıllı Tahtada Tam Ekran Yap">
          <i class="ph ph-arrows-out font-bold text-base"></i>
          <span class="hidden sm:inline">Tam Ekran Ders</span>
        </button>
      </div>

      <!-- Sağ: PDF / Yazdır & Kapat -->
      <div class="flex items-center gap-2">
        <button onclick="printNotePdf()" class="px-4 py-2 rounded-xl bg-gradient-brand hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-pink-500/25 transition-all flex items-center gap-1.5">
          <i class="ph ph-printer font-bold text-base"></i>
          <span>PDF İndir / Yazdır</span>
        </button>
        <button onclick="closeNoteDetailModal()" class="p-2 rounded-xl bg-purple-950/80 hover:bg-red-900/60 text-gray-300 hover:text-white text-base transition-colors border border-purple-500/30" title="Kapat">
          <i class="ph ph-x font-bold"></i>
        </button>
      </div>

    </div>

    <!-- 2. DERSTE ANLATIM & YAZDIRILABİLİR PDF BELGESİ (#note-printable-document) -->
    <div id="note-printable-document" class="note-pdf-page bg-[#180b28] border border-purple-500/30 rounded-3xl p-6 sm:p-10 text-white space-y-8 shadow-2xl relative">
      
      <!-- ===================================================================
           RESMİ MERVE SAMAK AKADEMİ PDF BAŞLIĞI VE LOGOSU (HER SAYFADA EN ÜSTTE)
           =================================================================== -->
      <div class="print-header-brand pb-6 border-b-2 border-purple-500/40 relative">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <!-- Sol Bölüm: Logo & Kurum Başlığı -->
          <div class="flex items-center gap-3.5 text-center sm:text-left">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-950/80 p-1.5 border border-pink-500/50 flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/20">
              <img src="assets/logo.png?v=1" alt="Merve SAMAK AKADEMİ Logo" class="w-full h-full object-contain">
            </div>
            <div>
              <div class="flex items-center justify-center sm:justify-start gap-2">
                <h1 class="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">MERVE SAMAK AKADEMİ</h1>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">LGS</span>
              </div>
              <p class="text-xs sm:text-sm font-semibold text-pink-400">8. Sınıf LGS Matematik Konu Anlatımı & Ders Fasikülü</p>
              <p class="text-[11px] text-gray-400">Öğretmen: <strong>Merve SAMAK</strong> • www.mervesamakakademi.com</p>
            </div>
          </div>

          <!-- Sağ Bölüm: Ünite No & MEB Kazanım Künyesi -->
          <div class="text-center sm:text-right bg-purple-950/60 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-purple-500/20">
            <div class="inline-block px-3 py-1 rounded-full text-xs font-black bg-gradient-brand text-white shadow-md mb-1">
              ÜNİTE #${note.unitNo}
            </div>
            <h2 class="text-base sm:text-lg font-black text-purple-200">${note.title}</h2>
            <div class="text-[11px] font-mono text-pink-300 font-bold">${note.kazanimCode}</div>
          </div>

        </div>

        <!-- Alt Renkli Vurgu Çizgisi -->
        <div class="w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mt-4"></div>
      </div>

      <!-- 1. MEB KAZANIM & DERSE GİRİŞ MOTİVASYON KUTUSU -->
      <div class="p-5 sm:p-6 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-3">
        <div class="flex items-center gap-2 text-sm font-bold text-pink-400">
          <i class="ph ph-target font-bold text-lg"></i>
          <span>MEB LGS Hedef Kazanımı:</span>
        </div>
        <p class="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">${note.kazanimDesc}</p>
        
        <div class="pt-2 border-t border-purple-500/20 text-xs text-purple-200 leading-relaxed flex items-start gap-2">
          <i class="ph ph-lightbulb text-amber-400 text-base shrink-0 mt-0.5"></i>
          <div><strong>Merve Öğretmen'den Derse Giriş Notu:</strong> ${note.introMotivation}</div>
        </div>
      </div>

      <!-- 2. BÖLÜM BÖLÜM KONU ANLATIMI & KRİTİK FORMÜLLER -->
      <div class="space-y-8">
        ${note.sections.map((section, sIdx) => `
          <div class="space-y-4 print-page-break">
            <!-- Bölüm Başlığı -->
            <div class="flex items-center gap-2.5 pb-2 border-b border-pink-500/30">
              <span class="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center text-xs">
                ${sIdx + 1}
              </span>
              <h3 class="text-base sm:text-lg font-black text-white">${section.title}</h3>
            </div>

            <!-- Açıklama Metni -->
            <div class="text-xs sm:text-sm text-gray-200 leading-relaxed space-y-2">
              ${section.content}
            </div>

            <!-- Formüller Listesi (KaTeX) -->
            ${section.formulas && section.formulas.length > 0 ? `
              <div class="grid grid-cols-1 gap-3.5 pt-2">
                ${section.formulas.map(f => `
                  <div class="p-4 sm:p-5 rounded-2xl bg-[#130720] border border-purple-500/30 space-y-2">
                    <div class="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                      <i class="ph ph-function font-bold"></i> ${f.title}
                    </div>
                    <div class="p-3 sm:p-4 rounded-xl bg-purple-950/70 border border-purple-500/30 text-white font-mono text-center text-sm sm:text-base overflow-x-auto py-2.5">
                      $$${f.math}$$
                    </div>
                    <p class="text-xs text-gray-300 leading-relaxed">${f.desc}</p>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Çözümlü Örnekler (Merve Öğretmen ile Çözelim) -->
            ${section.examples && section.examples.length > 0 ? `
              <div class="space-y-3 pt-2">
                ${section.examples.map((ex, eIdx) => `
                  <div class="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                    <div class="flex items-center justify-between text-xs font-bold text-emerald-400">
                      <span class="flex items-center gap-1.5">
                        <i class="ph ph-chalkboard-simple font-bold text-base"></i>
                        Merve Öğretmen ile Derste Çözümlü Örnek #${eIdx + 1}
                      </span>
                    </div>
                    
                    <div class="text-xs sm:text-sm font-semibold text-white bg-black/30 p-3.5 rounded-xl border border-emerald-500/20 leading-relaxed">
                      ${ex.question}
                    </div>

                    <div class="text-xs sm:text-sm text-emerald-200 leading-relaxed pl-2 border-l-2 border-emerald-400/50">
                      ${ex.solution}
                    </div>

                    ${ex.tip ? `
                      <div class="text-[11px] text-amber-300 bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                        <i class="ph ph-star font-bold"></i>
                        <span><strong>Taktik:</strong> ${ex.tip}</span>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

          </div>
        `).join('')}
      </div>

      <!-- 3. LGS'DE SAKIN DÜŞME! (TUZAK NOKTALAR) -->
      ${note.traps && note.traps.length > 0 ? `
        <div class="space-y-4 pt-4 print-page-break">
          <div class="flex items-center gap-2 pb-2 border-b border-red-500/40">
            <i class="ph ph-warning-octagon text-xl text-red-400"></i>
            <h3 class="text-base sm:text-lg font-black text-red-400">LGS Sınavında Sakın Düşme! (Tuzak Noktalar)</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            ${note.traps.map(trap => `
              <div class="p-4 sm:p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-2">
                <h4 class="font-bold text-red-300 text-xs sm:text-sm flex items-center gap-1.5">
                  ${trap.title}
                </h4>
                <p class="text-xs text-gray-200 leading-relaxed">
                  ${trap.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-pink-300 font-bold">$1</strong>')}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- 4. MERVE ÖĞRETMEN'DEN ALTIN İPUÇLARI -->
      ${note.tips && note.tips.length > 0 ? `
        <div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-pink-950/30 to-purple-950/30 border border-pink-500/40 space-y-3 print-page-break">
          <div class="flex items-center gap-2 text-sm font-bold text-pink-300">
            <i class="ph ph-sparkle text-lg text-pink-400"></i>
            <span>Merve Öğretmen'den Sınav Taktikleri</span>
          </div>
          <ul class="space-y-2 text-xs sm:text-sm text-gray-200">
            ${note.tips.map(t => `
              <li class="flex items-start gap-2">
                <span class="text-pink-400 font-bold">•</span>
                <span>${t}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- 5. SIRA SENDE / SINIFTA BİRLİKTE ÇÖZELİM (İNTERAKTİF) -->
      ${note.classActivity ? `
        <div class="p-5 sm:p-6 rounded-2xl bg-purple-950/50 border border-purple-500/30 space-y-4 print-page-break">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm font-black text-pink-400">
              <i class="ph ph-pencil-line text-lg"></i>
              <span>${note.classActivity.title}</span>
            </div>
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300">
              Sınıf İçi Deneme
            </span>
          </div>

          <p class="text-xs sm:text-sm font-bold text-white bg-black/30 p-4 rounded-xl border border-purple-500/20 leading-relaxed">
            ${note.classActivity.question}
          </p>

          <div class="pt-1">
            <button onclick="toggleNotePracticeSolution('note-practice-sol-${note.id}')" class="no-print px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white text-xs font-bold transition-all border border-purple-500/30 flex items-center gap-1.5">
              <i class="ph ph-eye font-bold"></i>
              <span>Çözümü ve Doğru Cevabı Göster / Gizle</span>
            </button>
            <div id="note-practice-sol-${note.id}" class="hidden mt-3 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 leading-relaxed">
              <strong>✅ Adım Adım Çözüm:</strong><br>${note.classActivity.solution}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 6. RESMİ DERS FASİKÜLÜ ALT BİLGİSİ (FOOTER) -->
      <div class="pt-6 border-t border-purple-500/30 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-2">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>© 2026 <strong>Merve SAMAK AKADEMİ</strong> • 8. Sınıf LGS Başarı Portalı</span>
        </div>
        <div>
          <span>Ders Fasikülü • www.mervesamakakademi.com • Sayfa Sonu</span>
        </div>
      </div>

    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // KaTeX ile formülleri derle
  setTimeout(() => {
    if (window.renderMathInElementSafely) {
      window.renderMathInElementSafely(modalContainer);
    }
  }, 60);
}

function closeNoteDetailModal() {
  const modal = document.getElementById('note-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function changeNoteFontSize(delta) {
  currentFontSizePercent = Math.max(80, Math.min(160, currentFontSizePercent + delta));
  const doc = document.getElementById('note-printable-document');
  const indicator = document.getElementById('note-font-size-indicator');
  if (doc) {
    doc.style.fontSize = `${currentFontSizePercent}%`;
  }
  if (indicator) {
    indicator.innerText = `%${currentFontSizePercent}`;
  }
}

function toggleNoteFullscreen() {
  const modal = document.getElementById('note-detail-modal');
  if (!modal) return;

  if (!document.fullscreenElement) {
    if (modal.requestFullscreen) {
      modal.requestFullscreen();
    } else if (modal.webkitRequestFullscreen) {
      modal.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function printNotePdf() {
  window.print();
}

function quickPrintNotePdf(unitId) {
  openNotePdfModal(unitId);
  setTimeout(() => {
    window.print();
  }, 250);
}

function toggleNotePracticeSolution(solId) {
  const solElem = document.getElementById(solId);
  if (solElem) {
    solElem.classList.toggle('hidden');
  }
}

window.renderNotesPage = renderNotesPage;
window.openNotePdfModal = openNotePdfModal;
window.closeNoteDetailModal = closeNoteDetailModal;
window.changeNoteFontSize = changeNoteFontSize;
window.toggleNoteFullscreen = toggleNoteFullscreen;
window.printNotePdf = printNotePdf;
window.quickPrintNotePdf = quickPrintNotePdf;
window.toggleNotePracticeSolution = toggleNotePracticeSolution;
// Geriye dönük uyumluluk
window.openNoteDetailModal = openNotePdfModal;
