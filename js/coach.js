/**
 * Merve SAMAK AKADEMİ - Hedef & Net Koçu Modülü
 * Deneme Analizi, Pedagojik Reçete Motoru ve İnteraktif SVG Çizgi Grafik
 */

const STORAGE_KEY_EXAMS = 'ms_coach_exam_history';

// Varsayılan Başlangıç Denemeleri (Eğer geçmiş boşsa)
const DEFAULT_EXAMS = [
  { id: 'ex-1', title: '1. Tarama Denemesi', date: '10 Ekim', currentNet: 8.5, targetNet: 16, units: ['carpanlar-ve-katlar', 'uslu-ifadeler'] },
  { id: 'ex-2', title: 'Kurumsal Deneme #1', date: '25 Ekim', currentNet: 11.0, targetNet: 16, units: ['uslu-ifadeler', 'karekoklu-ifadeler'] },
  { id: 'ex-3', title: 'MEB Örnek Sorular Provası', date: '12 Kasım', currentNet: 13.5, targetNet: 17, units: ['karekoklu-ifadeler', 'cebirsel-ifadeler'] }
];

function getExamHistory() {
  const local = localStorage.getItem(STORAGE_KEY_EXAMS);
  if (!local) {
    localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(DEFAULT_EXAMS));
    return DEFAULT_EXAMS;
  }
  try {
    return JSON.parse(local);
  } catch (e) {
    return DEFAULT_EXAMS;
  }
}

function saveExamHistory(exams) {
  localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(exams));
}

function renderCoachPage() {
  const form = document.getElementById('coach-analysis-form');
  const unit1Select = document.getElementById('coach-unit-1');
  const unit2Select = document.getElementById('coach-unit-2');
  if (!form) return;

  // Ünite Seçim Listelerini Doldur
  const unitsList = [
    { id: 'carpanlar-ve-katlar', name: 'Çarpanlar ve Katlar' },
    { id: 'uslu-ifadeler', name: 'Üslü İfadeler' },
    { id: 'karekoklu-ifadeler', name: 'Kareköklü İfadeler' },
    { id: 'veri-analizi', name: 'Veri Analizi' },
    { id: 'olasilik', name: 'Basit Olayların Olasılığı' },
    { id: 'cebirsel-ifadeler', name: 'Cebirsel İfadeler ve Özdeşlikler' },
    { id: 'dogrusal-denklemler', name: 'Doğrusal Denklemler ve Eğim' },
    { id: 'esitsizlikler', name: 'Eşitsizlikler' },
    { id: 'ucgenler', name: 'Üçgenler & Pisagor' }
  ];

  if (unit1Select && unit1Select.options.length <= 1) {
    unit1Select.innerHTML = unitsList.map((u, i) => `
      <option value="${u.id}" ${i === 0 ? 'selected' : ''}>${u.name}</option>
    `).join('');
  }
  if (unit2Select && unit2Select.options.length <= 1) {
    unit2Select.innerHTML = unitsList.map((u, i) => `
      <option value="${u.id}" ${i === 1 ? 'selected' : ''}>${u.name}</option>
    `).join('');
  }

  // Geçmiş Denemeleri ve Grafiği Çiz
  renderCoachHistoryAndChart();
}

function syncNetInputs(type, val) {
  const numInput = document.getElementById(`coach-${type}-net`);
  const rangeInput = document.getElementById(`coach-${type}-range`);
  if (numInput && rangeInput) {
    numInput.value = val;
    rangeInput.value = val;
  }
}

function generatePrescription(e) {
  if (e) e.preventDefault();

  const currentNet = parseFloat(document.getElementById('coach-current-net').value) || 0;
  const targetNet = parseFloat(document.getElementById('coach-target-net').value) || 0;
  const unit1 = document.getElementById('coach-unit-1').value;
  const unit2 = document.getElementById('coach-unit-2').value;
  const examTitle = document.getElementById('coach-exam-title').value.trim() || `Deneme #${new Date().toLocaleDateString('tr-TR')}`;

  if (targetNet < currentNet) {
    alert('Hedef netiniz mevcut netinizden küçük olamaz! Lütfen hedefinizi güncelleyin.');
    return;
  }

  const gap = Math.max(0, targetNet - currentNet);
  const percent = targetNet > 0 ? Math.min(100, Math.round((currentNet / targetNet) * 100)) : 0;

  // Strateji Bul
  const strategies = ACADEMY_MODULES_DATA.coach.gapStrategies;
  const matchedStrategy = strategies.find(s => gap >= s.minGap && gap <= s.maxGap) || strategies[strategies.length - 1];

  // Ünite Tavsiyeleri
  const adviceData = ACADEMY_MODULES_DATA.coach.unitAdvice;
  const u1Advice = adviceData[unit1] || { name: '1. Ünite', prescription: 'Konu tekrarlarını yap ve temel soru çöz.', focus: 'Kazanım testleri.' };
  const u2Advice = adviceData[unit2] || { name: '2. Ünite', prescription: 'Püf noktaları incele ve çıkmış sorulara bak.', focus: 'Yeni nesil sorular.' };

  // Reçete Kartını Render Et
  const resultContainer = document.getElementById('coach-prescription-result');
  if (resultContainer) {
    resultContainer.innerHTML = `
      <div class="glass-panel p-6 md:p-10 rounded-3xl space-y-8 border-2 border-pink-500/50 shadow-2xl shadow-pink-500/20 animate-fadeIn">
        <!-- Reçete Başlığı & Rozetler -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-500/20">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold mb-2">
              <i class="ph ph-heartbeat"></i> Merve Öğretmen Akıllı Koçluk Raporu
            </div>
            <h3 class="text-2xl md:text-3xl font-black text-white">${matchedStrategy.title}</h3>
          </div>
          <span class="px-4 py-2 rounded-xl bg-gradient-brand text-white text-xs font-bold shadow-lg shadow-pink-500/30">
            ${matchedStrategy.badge}
          </span>
        </div>

        <!-- İlerleme Çubuğu ve Net Karşılaştırması -->
        <div class="space-y-3 p-6 rounded-2xl bg-purple-950/60 border border-purple-500/30">
          <div class="flex justify-between items-center text-sm font-bold">
            <span class="text-gray-300">Hedefe Ulaşma Seviyesi</span>
            <span class="text-pink-400 font-extrabold text-base">%${percent} Tamamlandı</span>
          </div>

          <div class="relative h-4 bg-[#12071a] rounded-full overflow-hidden border border-purple-500/30 p-0.5">
            <div class="h-full bg-gradient-brand rounded-full transition-all duration-1000" style="width: ${percent}%;"></div>
          </div>

          <div class="flex justify-between items-center text-xs text-gray-400 pt-1">
            <span>Mevcut Net: <strong class="text-white text-sm">${currentNet}</strong></span>
            <span>Kalan Net Farkı: <strong class="text-pink-300 text-sm">+${gap.toFixed(1)}</strong></span>
            <span>Hedef Net: <strong class="text-emerald-400 text-sm">${targetNet}</strong></span>
          </div>
        </div>

        <!-- Genel Pedagojik Değerlendirme -->
        <div class="p-6 rounded-2xl bg-[#170a25] border border-purple-500/20 space-y-2">
          <h4 class="text-sm font-bold text-pink-400 flex items-center gap-2">
            <i class="ph ph-sparkle text-lg"></i> Genel Stratejik Yol Haritası
          </h4>
          <p class="text-xs md:text-sm text-gray-200 leading-relaxed">${matchedStrategy.advice}</p>
        </div>

        <!-- 2 Üniteye Özel Eylem Planı -->
        <div class="space-y-4">
          <h4 class="text-base font-bold text-white flex items-center gap-2">
            <i class="ph ph-target text-pink-400 text-xl"></i> Zorlandığın 2 Ünite İçin Nokta Atışı Reçete
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- 1. Ünite Reçetesi -->
            <div class="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-3">
              <div class="flex items-center gap-2 text-sm font-bold text-pink-300">
                <span class="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs">1</span>
                <span>${u1Advice.name}</span>
              </div>
              <p class="text-xs text-gray-300 leading-relaxed">${u1Advice.prescription}</p>
              <div class="text-[11px] text-purple-300 pt-2 border-t border-purple-500/20">
                <strong>🎯 Odak Kazanım:</strong> ${u1Advice.focus}
              </div>
            </div>

            <!-- 2. Ünite Reçetesi -->
            <div class="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-3">
              <div class="flex items-center gap-2 text-sm font-bold text-pink-300">
                <span class="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs">2</span>
                <span>${u2Advice.name}</span>
              </div>
              <p class="text-xs text-gray-300 leading-relaxed">${u2Advice.prescription}</p>
              <div class="text-[11px] text-purple-300 pt-2 border-t border-purple-500/20">
                <strong>🎯 Odak Kazanım:</strong> ${u2Advice.focus}
              </div>
            </div>
          </div>
        </div>

        <!-- Aksiyon Butonları -->
        <div class="flex flex-wrap gap-4 pt-4 border-t border-purple-500/20">
          <a href="#notes" class="px-6 py-3 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-2 border border-purple-500/30 transition-all">
            <i class="ph ph-book-open"></i> Bu Ünitelerin Konu Notlarına Git
          </a>
          <a href="#questions" class="px-6 py-3 rounded-xl bg-gradient-brand text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-pink-500/25 transition-all">
            <i class="ph ph-check-circle"></i> Soru Dünyasında Pratik Yap
          </a>
        </div>
      </div>
    `;
    resultContainer.scrollIntoView({ behavior: 'smooth' });
  }

  // Yeni Denemeyi Geçmişe Ekle
  const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const now = new Date();
  const dateStr = `${now.getDate()} ${months[now.getMonth()]}`;

  const newEntry = {
    id: 'ex-' + Date.now(),
    title: examTitle,
    date: dateStr,
    currentNet: currentNet,
    targetNet: targetNet,
    units: [unit1, unit2]
  };

  const history = getExamHistory();
  history.push(newEntry);
  saveExamHistory(history);

  showToast('📈 Deneme analizi başarıyla kaydedildi ve grafiğe eklendi!');
  renderCoachHistoryAndChart();
}

function renderCoachHistoryAndChart() {
  const history = getExamHistory();
  const chartContainer = document.getElementById('coach-line-chart-container');
  const historyTable = document.getElementById('coach-history-list');

  // 1. İNTERAKTİF ÇİZGİ GRAFİĞİ (SVG LINE CHART)
  if (chartContainer) {
    if (history.length === 0) {
      chartContainer.innerHTML = `
        <div class="p-8 text-center text-xs text-gray-400">
          Henüz deneme verisi girilmedi. Yukarıdaki formdan denemenizi analiz ederek grafiği oluşturabilirsiniz.
        </div>
      `;
    } else {
      chartContainer.innerHTML = generateSvgChart(history);
    }
  }

  // 2. GEÇMİŞ DENEMELER TABLOSU
  if (historyTable) {
    if (history.length === 0) {
      historyTable.innerHTML = `<div class="p-6 text-center text-xs text-gray-400">Kayıtlı deneme bulunmuyor.</div>`;
    } else {
      historyTable.innerHTML = history.slice().reverse().map((item, idx) => `
        <div class="p-4 rounded-2xl bg-[#170a25] border border-purple-500/20 flex flex-wrap items-center justify-between gap-3 hover:border-pink-500/30 transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-purple-900/50 text-pink-400 flex items-center justify-center font-bold text-xs shrink-0">
              #${history.length - idx}
            </div>
            <div>
              <div class="text-sm font-bold text-white">${item.title}</div>
              <div class="text-[11px] text-gray-400">${item.date}</div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="text-right">
              <span class="text-xs text-gray-400">Net: </span>
              <span class="text-base font-black text-pink-400">${item.currentNet}</span>
              <span class="text-xs text-gray-400"> / ${item.targetNet}</span>
            </div>
            <button onclick="deleteCoachExam('${item.id}')" class="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-300 text-xs transition-colors" title="Kaydı Sil">
              <i class="ph ph-trash"></i>
            </button>
          </div>
        </div>
      `).join('');
    }
  }
}

function generateSvgChart(data) {
  const width = 600;
  const height = 240;
  const padding = { top: 30, right: 30, bottom: 40, left: 40 };

  const maxNet = 20;
  const minNet = 0;

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Nokta Koordinatları
  const points = data.map((d, i) => {
    const x = padding.left + (data.length === 1 ? chartW / 2 : (i / (data.length - 1)) * chartW);
    const y = padding.top + chartH - ((d.currentNet - minNet) / (maxNet - minNet)) * chartH;
    return { x, y, ...d };
  });

  // SVG Çizgi Yolu (Path)
  let pathD = '';
  points.forEach((pt, i) => {
    if (i === 0) pathD += `M ${pt.x} ${pt.y}`;
    else pathD += ` L ${pt.x} ${pt.y}`;
  });

  // Alan Doldurma Yolu (Gradient Area)
  let areaD = pathD;
  if (points.length > 1) {
    areaD += ` L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;
  }

  // Hedef Referans Çizgisi (Son denemedeki hedef)
  const lastTarget = data[data.length - 1].targetNet;
  const targetY = padding.top + chartH - ((lastTarget - minNet) / (maxNet - minNet)) * chartH;

  return `
    <div class="w-full overflow-x-auto">
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto min-w-[500px] select-none font-sans">
        <defs>
          <!-- Degrade Dolgusu -->
          <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ec4899" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#a855f7" stop-opacity="0.0"/>
          </linearGradient>
          <!-- Çizgi Degradeli Rengi -->
          <linearGradient id="chartLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#a855f7"/>
            <stop offset="100%" stop-color="#ec4899"/>
          </linearGradient>
        </defs>

        <!-- Arka Plan Yatay Kılavuz Çizgileri -->
        ${[0, 5, 10, 15, 20].map(val => {
          const y = padding.top + chartH - ((val - minNet) / (maxNet - minNet)) * chartH;
          return `
            <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(168, 85, 247, 0.15)" stroke-dasharray="4,4" />
            <text x="${padding.left - 8}" y="${y + 4}" fill="#9ca3af" font-size="10" text-anchor="end" font-weight="bold">${val}</text>
          `;
        }).join('')}

        <!-- Hedef Net Kesikli Çizgisi -->
        <line x1="${padding.left}" y1="${targetY}" x2="${width - padding.right}" y2="${targetY}" stroke="#10b981" stroke-dasharray="6,4" stroke-width="1.5" opacity="0.8" />
        <text x="${width - padding.right}" y="${targetY - 6}" fill="#10b981" font-size="10" font-weight="bold" text-anchor="end">🎯 Hedef: ${lastTarget} Net</text>

        <!-- Degrade Alan -->
        ${points.length > 1 ? `<path d="${areaD}" fill="url(#chartAreaGrad)" />` : ''}

        <!-- Net Çizgisi -->
        <path d="${pathD}" fill="none" stroke="url(#chartLineGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Veri Noktaları & Tooltipler -->
        ${points.map(pt => `
          <g class="cursor-pointer group">
            <circle cx="${pt.x}" cy="${pt.y}" r="6" fill="#ec4899" stroke="#ffffff" stroke-width="2.5" class="transition-transform group-hover:scale-125" />
            <!-- Değer Balonu -->
            <rect x="${pt.x - 22}" y="${pt.y - 28}" width="44" height="20" rx="6" fill="#1b0a2c" stroke="#ec4899" stroke-width="1" opacity="0.95" />
            <text x="${pt.x}" y="${pt.y - 14}" fill="#ffffff" font-size="10" font-weight="black" text-anchor="middle">${pt.currentNet}</text>
            <!-- X Eksen Etiketi -->
            <text x="${pt.x}" y="${padding.top + chartH + 20}" fill="#d1d5db" font-size="10" font-weight="600" text-anchor="middle">${pt.date}</text>
          </g>
        `).join('')}
      </svg>
    </div>
  `;
}

function deleteCoachExam(id) {
  if (confirm('Bu deneme kaydını silmek istediğinize emin misiniz?')) {
    const history = getExamHistory().filter(e => e.id !== id);
    saveExamHistory(history);
    showToast('🗑️ Deneme kaydı silindi.');
    renderCoachHistoryAndChart();
  }
}

function clearAllCoachHistory() {
  if (confirm('Tüm deneme geçmişini sıfırlamak istediğinize emin misiniz?')) {
    localStorage.removeItem(STORAGE_KEY_EXAMS);
    showToast('🔄 Deneme geçmişi temizlendi.');
    renderCoachHistoryAndChart();
  }
}

window.renderCoachPage = renderCoachPage;
window.syncNetInputs = syncNetInputs;
window.generatePrescription = generatePrescription;
window.deleteCoachExam = deleteCoachExam;
window.clearAllCoachHistory = clearAllCoachHistory;
