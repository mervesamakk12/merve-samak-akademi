/**
 * Merve SAMAK AKADEMİ - 4 Yeni Modül Veri Havuzu
 * 1. Konu Notları (Derste Açıp Anlatmaya Uygun Konu Anlatımı & PDF Fasikülleri)
 * 2. Soru Dünyası (Kazanım & LGS Yeni Nesil Soruları)
 * 3. Matematik Oyunları Verileri
 * 4. Hedef & Net Koçu Reçete Matrisi
 */

const ACADEMY_MODULES_DATA = {
  // 1. 8. SINIF LGS KONU ANLATIMI & DERS FASİKÜLLERİ (PDF)
  notes: [
    {
      id: "carpanlar-ve-katlar",
      unitNo: 1,
      title: "Çarpanlar ve Katlar",
      icon: "ph-grid-four",
      badgeColor: "from-pink-500 to-rose-500",
      grade: "8",
      kazanimCode: "M.8.1.1.1 - M.8.1.1.3",
      kazanimDesc: "Verilen pozitif tam sayıların pozitif tam sayı çarpanlarını bulur, asal sayıları tanır; iki doğal sayının EBOB ve EKOK'unu hesaplar, ilgili problemleri çözer.",
      summary: "Pozitif tam sayı çarpanları, asal çarpan algoritması, aralarında asal sayılar ve LGS EBOB-EKOK problem ayırt etme taktikleri.",
      introMotivation: "Günlük hayatta paketleme, periyodik nöbetler, tarlanın etrafına eşit aralıklarla direk dikme veya fayans döşeme gibi tüm mühendislik ve bölüştürme problemlerinin temelinde Çarpanlar ve Katlar yatar. LGS'de bu üniteden her yıl kesinlikle 1-2 yeni nesil soru gelmektedir.",
      sections: [
        {
          title: "1. Pozitif Tam Sayıların Çarpanları & Asal Çarpan Algoritması",
          content: `
            <p class="leading-relaxed mb-3">Her pozitif tam sayı, en az iki pozitif tam sayının çarpımı olarak yazılabilir. Bu sayılara o sayının <strong>çarpanları (aynı zamanda bölenleri)</strong> denir.</p>
            <div class="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 mb-4">
              <strong class="text-pink-300 block mb-1">📌 Örnek İnceleme (48 Sayısının Çarpanları):</strong>
              <p class="font-mono text-sm text-gray-200">48 = 1 × 48 = 2 × 24 = 3 × 16 = 4 × 12 = 6 × 8</p>
              <p class="text-xs text-purple-200 mt-1">48'in çarpanları: {1, 2, 3, 4, 6, 8, 12, 16, 24, 48} → Toplam 10 adet çarpanı vardır.</p>
            </div>
            <p class="leading-relaxed mb-2"><strong>Asal Sayı:</strong> 1 ve kendisinden başka hiçbir pozitif böleni olmayan 1'den büyük doğal sayılardır. <em>(En küçük asal sayı 2'dir ve 2 yegane çift asal sayıdır: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47...)</em></p>
          `,
          formulas: [
            {
              title: "Asal Çarpanlara Ayırma (Üslü Gösterim)",
              math: "A = a^x \\cdot b^y \\cdot c^z \\quad (a, b, c: \\text{Farklı Asal Sayılar})",
              desc: "Bölme listesi algoritması ile sayı en küçük asal sayıdan başlanarak bölünür ve üslü biçimde ifade edilir."
            },
            {
              title: "Pozitif Bölen Sayısı (PBS) Formülü (Püf Nokta)",
              math: "\\text{Pozitif Bölen Sayısı} = (x + 1) \\cdot (y + 1) \\cdot (z + 1)",
              desc: "Asal çarpanların üsleri 1'er artırılarak birbiriyle çarpıldığında sayının toplam pozitif bölen sayısı hızlıca bulunur."
            }
          ],
          examples: [
            {
              question: "72 sayısını asal çarpanlarının çarpımı şeklinde yazınız ve toplam kaç adet pozitif tam sayı böleni olduğunu bulunuz.",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>Adım 1:</strong> 72'yi asal çarpanlarına ayıralım:</p>
                  <p class="font-mono bg-black/20 p-2 rounded text-pink-300">72 / 2 = 36 → 36 / 2 = 18 → 18 / 2 = 9 → 9 / 3 = 3 → 3 / 3 = 1 &nbsp;⟹&nbsp; 72 = 2³ × 3²</p>
                  <p><strong>Adım 2:</strong> Asal çarpanları: 2 ve 3'tür (2 farklı asal çarpan).</p>
                  <p><strong>Adım 3:</strong> PBS = (3 + 1) × (2 + 1) = 4 × 3 = 12 adet pozitif böleni vardır.</p>
                </div>
              `,
              tip: "Testlerde 'kaç farklı asal çarpanı vardır' ile 'kaç tane böleni vardır' sorularını birbirine karıştırmayın!"
            }
          ]
        },
        {
          title: "2. EBOB & EKOK Hesaplama ve Problem Taktikleri",
          content: `
            <p class="leading-relaxed mb-3"><strong>EBOB (En Büyük Ortak Bölen):</strong> İki veya daha fazla sayının ortak bölenlerinin en büyüğüdür.</p>
            <p class="leading-relaxed mb-3"><strong>EKOK (En Küçük Ortak Kat):</strong> İki veya daha fazla sayının pozitif ortak katlarının en küçüğüdür.</p>
          `,
          formulas: [
            {
              title: "İki Sayının Çarpımı ile EBOB-EKOK İlişkisi",
              math: "A \\cdot B = \\text{EBOB}(A, B) \\cdot \\text{EKOK}(A, B)",
              desc: "İki pozitif tam sayının çarpımı, bu sayıların EBOB'u ile EKOK'unun çarpımına daima eşittir."
            },
            {
              title: "Aralarında Asal Sayılarda EBOB & EKOK",
              math: "\\text{EBOB}(A, B) = 1 \\quad \\text{ve} \\quad \\text{EKOK}(A, B) = A \\cdot B",
              desc: "1'den başka ortak pozitif böleni olmayan sayılar aralarında asaldır. Ardışık sayılar (örn: 14 ve 15) daima aralarında asaldır."
            }
          ],
          examples: [
            {
              question: "Boyutları 36 m ve 48 m olan dikdörtgen şeklindeki bir bahçenin etrafına, köşelere de gelmek şartıyla eşit aralıklarla fidan dikilecektir. En az kaç fidana ihtiyaç vardır?",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>Adım 1 (Model Tespiti):</strong> Büyük bütünden eşit küçük aralıklara gidildiği için bu bir <strong>EBOB</strong> problemidir.</p>
                  <p><strong>Adım 2:</strong> İki fidan arası mesafe = EBOB(36, 48) = 12 metre olmalıdır.</p>
                  <p><strong>Adım 3:</strong> Bahçenin Çevresi = 2 × (36 + 48) = 2 × 84 = 168 metre.</p>
                  <p><strong>Adım 4:</strong> Fidan Sayısı = Çevre / EBOB = 168 / 12 = <strong>14 adet</strong> fidan gerekir.</p>
                </div>
              `,
              tip: "Kapalı geometrik şekillerin etrafına direk/ağaç dikilirken köşe sayısı kenar sayısına eşit olduğundan Fidan Sayısı = Çevre / EBOB formülü doğrudan çalışır."
            }
          ]
        }
      ],
      traps: [
        {
          title: "⚠️ Parçalama vs Birleştirme Yanılgısı",
          text: "Büyük parçalar küçük parçalara bölünüyorsa (bidonlardan şişelere, tarlanın etrafına direk dikme vb.) **EBOB** kullanılır. Küçük parçalar bir araya gelip periyodik tekrarlanıyorsa (otobüs seferleri, nöbet saatleri, zil çalması) **EKOK** kullanılır."
        },
        {
          title: "⚠️ 1 ve Sayının Kendisini Unutma",
          text: "Bir sayının çarpanları sorulduğunda 1 ve sayının kendisini atlamayın! Örneğin 24'ün çarpan sayısı: 1, 2, 3, 4, 6, 8, 12, 24 olmak üzere 8 tanedir."
        },
        {
          title: "⚠️ Çift Asal Sayı Tuzağı",
          text: "2 sayısı yegane çift asal sayıdır! İki asal sayının toplamı tek sayı ise bu sayılardan biri mutlaka 2'dir."
        }
      ],
      tips: [
        "Direk dikme sorularında köşelere de direk dikileceğini unutmayın (Köşe sayısı = Kenar sayısı).",
        "EKOK sorularında 'en az kaç adet' deniyorsa ortak katın en küçük katını (1. kat), sınır verilmişse sınırın hemen altındaki veya üstündeki katı alın."
      ],
      classActivity: {
        title: "Sıra Sende / Sınıfta Birlikte Çözelim",
        question: "İki zilden biri 15 dakikada bir, diğeri 18 dakikada bir çalmaktadır. Bu iki zil ilk kez saat 08.30'da birlikte çaldığına göre, ikinci kez saat kaçta birlikte çalarlar?",
        solution: "15 ve 18 sayılarının EKOK'u alınır: EKOK(15, 18) = 90 dakikadır. 90 dakika = 1 saat 30 dakika eder. İlk çalış: 08.30 ⟹ 08.30 + 01.30 = Saat 10.00'da birlikte çalarlar."
      }
    },
    {
      id: "uslu-ifadeler",
      unitNo: 2,
      title: "Üslü İfadeler",
      icon: "ph-arrow-fat-lines-up",
      badgeColor: "from-purple-500 to-indigo-500",
      grade: "8",
      kazanimCode: "M.8.1.2.1 - M.8.1.2.5",
      kazanimDesc: "Tam sayıların tam sayı kuvvetlerini hesaplar, üslü ifadelerle çarpma ve bölme işlemlerini yapar, çok büyük ve çok küçük sayıları bilimsel gösterimle ifade eder.",
      summary: "Negatif üs, üssün üssü, taban ve üs eşitliği, çözümleme ve LGS bilimsel gösterim kuralları.",
      introMotivation: "Uzaydaki gezegenler arası mesafeleri (milyonlarca kilometre) veya bir hücrenin mikroskobik boyutunu (milimetrenin milyonda biri) pratik olarak yazabilmek için üslü sayılar ve bilimsel gösterim kullanılır. LGS'de bilimsel gösterim sorusu %100 her sene sorulmaktadır.",
      sections: [
        {
          title: "1. Tam Sayıların Kuvvetleri & Negatif Üs Kuralı",
          content: `
            <p class="leading-relaxed mb-3">Üslü ifadede taban çarpılan sayıyı, üs (kuvvet) ise tabanın kaç defa yan yana çarpılacağını gösterir ($a^n = \\underbrace{a \\cdot a \\dots a}_{n \\text{ tane}}$).</p>
            <div class="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 mb-4">
              <strong class="text-pink-300 block mb-1">📌 Parantez ve İşaret Kuralı (Çok Önemli!):</strong>
              <p class="text-sm text-gray-200">• Negatif sayının ÇİFT kuvveti parantez içindeyse POZİTİF: $(-3)^2 = +9$</p>
              <p class="text-sm text-gray-200">• Parantez yoksa çift üs işareti etkilemez: $-3^2 = -9$</p>
              <p class="text-sm text-gray-200">• Negatif sayının TEK kuvveti daima NEGATİF: $(-2)^3 = -8$</p>
            </div>
          `,
          formulas: [
            {
              title: "Negatif Üs Kuralı (Takla Attırma)",
              math: "a^{-n} = \\frac{1}{a^n} \\quad \\text{ve} \\quad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n \\quad (a, b \\neq 0)",
              desc: "Negatif üs sayının işaretini asla eksi yapmaz; sayıyı sadece çarpmaya göre ters çevirir (pay ile paydayı yer değiştirir)."
            },
            {
              title: "Üssün Üssü Kuralı",
              math: "(a^m)^n = a^{m \\cdot n} = (a^n)^m",
              desc: "Üssün üssü alınırken üsler birbiriyle çarpılır."
            }
          ],
          examples: [
            {
              question: "$(-2)^{-4} + (-3)^{-1}$ işleminin sonucunu bulunuz.",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>1. Terim:</strong> $(-2)^{-4} = \\frac{1}{(-2)^4} = \\frac{1}{16}$ (Çift üs parantezde olduğu için +16 olur).</p>
                  <p><strong>2. Terim:</strong> $(-3)^{-1} = \\frac{1}{(-3)^1} = -\\frac{1}{3}$.</p>
                  <p><strong>İşlem:</strong> $\\frac{1}{16} - \\frac{1}{3} = \\frac{3 - 16}{48} = -\\frac{13}{48}$ bulunur.</p>
                </div>
              `,
              tip: "Negatif üssü görünce önce sayıyı kesirli forma çevirin, ardından işaret kontrolü yapın."
            }
          ]
        },
        {
          title: "2. Çarpma, Bölme & Bilimsel Gösterim",
          content: `
            <p class="leading-relaxed mb-3">Farklı tabanlı üslü sayılarda işlem yaparken öncelikle tabanlar en küçük asal tabanlara (özellikle 2, 3, 5) dönüştürülür.</p>
          `,
          formulas: [
            {
              title: "Çarpma ve Bölme Kuralları",
              math: "a^m \\cdot a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}, \\quad a^n \\cdot b^n = (a \\cdot b)^n, \\quad \\frac{a^n}{b^n} = \\left(\\frac{a}{b}\\right)^n",
              desc: "Tabanlar aynıysa üsler toplanır/çıkarılır; üsler aynıysa tabanlar çarpılır/bölünür."
            },
            {
              title: "Bilimsel Gösterim Şartı",
              math: "a \\cdot 10^n \\quad \\text{şartı:} \\quad 1 \\le |a| < 10 \\; \\text{ve} \\; n \\in \\mathbb{Z}",
              desc: "Katsayı mutlak değerce 1'e eşit veya büyük, 10'dan küçük olmalıdır (1 dahil, 10 hariçtir)."
            }
          ],
          examples: [
            {
              question: "Bir kenar uzunluğu $8^4$ mm olan kare şeklindeki bir levhanın alanı kaç $\\text{mm}^2$'dir?",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>Adım 1:</strong> Karenin alanı $= \\text{kenar}^2 = (8^4)^2 = 8^8$</p>
                  <p><strong>Adım 2:</strong> 8 tabanını 2'nin kuvveti olarak yazalım: $8 = 2^3$</p>
                  <p><strong>Adım 3:</strong> $(2^3)^8 = 2^{3 \\times 8} = 2^{24} \\text{ mm}^2$ bulunur.</p>
                </div>
              `,
              tip: "Şıklarda $8^8$ yoksa tabanı 2 tabanına çevrilmiş halini arayın ($2^{24}$ veya $4^{12}$)."
            }
          ]
        }
      ],
      traps: [
        {
          title: "⚠️ Parantezsiz Negatif Sayı Tuzağı",
          text: "$-3^2 = -9$ iken $(-3)^2 = +9$'dur! Parantez yoksa çift üs sadece tabandaki sayıya aittir, öndeki eksi işaretini artıya çevirmez."
        },
        {
          title: "⚠️ Sıfırıncı Üs ve $0^0$ Belirsizliği",
          text: "$(-5)^0 = 1$ ve $-5^0 = -1$'dir. $0^0$ ise matematikte tanımsız/belirsizdir."
        },
        {
          title: "⚠️ Bilimsel Gösterimde 10 Katsayısı",
          text: "$10 \\times 10^5$ bilimsel gösterim DEĞİLDİR! Doğrusu $1 \\times 10^6$ olmalıdır ($|a| < 10$ şartı)."
        }
      ],
      tips: [
        "Farklı tabanlı üslü sayılarda önce tabanları $2, 3, 5$ gibi en küçük asal tabanlara çevirin.",
        "Kaç basamaklıdır sorularında ifadeyi $A \\cdot 10^n$ formatına getirip ($A$'nın basamağı $+ n$) kuralını kullanın."
      ],
      classActivity: {
        title: "Sıra Sende / Sınıfta Birlikte Çözelim",
        question: "0,000045 sayısının bilimsel gösterimi $a \\cdot 10^x$ olduğuna göre $a + x$ toplamı kaçtır?",
        solution: "0,000045 sayısında virgül 5 basamak sağa kaydırılır: 4,5 × 10⁻⁵ olur. Burada a = 4,5 ve x = -5'tir. Toplam: 4,5 + (-5) = -0,5 bulunur."
      }
    },
    {
      id: "karekoklu-ifadeler",
      unitNo: 3,
      title: "Kareköklü İfadeler",
      icon: "ph-radical",
      badgeColor: "from-amber-500 to-orange-500",
      grade: "8",
      kazanimCode: "M.8.1.3.1 - M.8.1.3.6",
      kazanimDesc: "Tam kare pozitif tam sayıların kareköklerini belirler, kareköklü ifadeleri a√b biçiminde yazar, yaklaşık değerini tahmin eder, dört işlem yapar ve irrasyonel sayıları tanır.",
      summary: "Tam kare sayılar, kök dışına çıkarma $a\\sqrt{b}$, sayı doğrusunda yaklaşık değer, ondalık karekökler ve alan-kenar ilişkisi.",
      introMotivation: "Alanı verilen bir karenin bir kenarını bulmak matematikte karekök alma işlemidir ($a = \\sqrt{\\text{Alan}}$). LGS'de harita ve sayı doğrusu üzerinde konumlandırma, mesafe tahminleri ve geometri tabanlı karekök soruları en çok puan getiren kısımdır.",
      sections: [
        {
          title: "1. Tam Kare Sayılar & Kök Dışına Çıkarma ($a\\sqrt{b}$)",
          content: `
            <p class="leading-relaxed mb-3">Bir tam sayının karesi olan pozitif tam sayılara <strong>tam kare sayılar</strong> denir (1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400...).</p>
          `,
          formulas: [
            {
              title: "Kök Dışına Çıkarma & İçine Alma",
              math: "\\sqrt{a^2 \\cdot b} = a\\sqrt{b} \\quad \\text{ve} \\quad a\\sqrt{b} = \\sqrt{a^2 \\cdot b} \\quad (a \\ge 0)",
              desc: "Kök içindeki tam kare çarpan kök dışına karesiz çıkar. Dışarıdaki sayı içeri girerken karesi alınarak içerideki sayıyla çarpılır."
            },
            {
              title: "Yaklaşık Değer Tahmini",
              math: "\\sqrt{a} < \\sqrt{x} < \\sqrt{b} \\implies \\sqrt{x} \\approx \\text{Hangi tam kareye daha yakın?}",
              desc: "Kök içindeki sayıya en yakın iki tam kare sayı belirlenir ve aradaki fark kıyaslanır."
            }
          ],
          examples: [
            {
              question: "$\\sqrt{75}$ sayısını $a\\sqrt{b}$ biçiminde yazınız ve hangi iki ardışık tam sayı arasında olduğunu bulunuz.",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>1. Kök Dışına Çıkarma:</strong> $75 = 25 \\times 3 = 5^2 \\times 3 \\implies \\sqrt{75} = 5\\sqrt{3}$</p>
                  <p><strong>2. Tam Sayı Aralığı:</strong> $\\sqrt{64} < \\sqrt{75} < \\sqrt{81} \\implies 8 < \\sqrt{75} < 9$</p>
                  <p><strong>3. Yakınlık:</strong> $75-64 = 11$ iken $81-75 = 6$'dır. Yani $\\sqrt{75}$ sayısı 9'a daha yakındır (yaklaşık $8{,}6$).</p>
                </div>
              `,
              tip: "Sayı doğrusu sorularında kök içine alarak kıyaslama yapmak en güvenli yoldur."
            }
          ]
        },
        {
          title: "2. Kareköklü İfadelerde Dört İşlem & İrrasyonel Sayılar",
          content: `
            <p class="leading-relaxed mb-3">Toplama ve çıkarma yapabilmek için kök içlerinin birebir aynı olması zorunludur. Çarpma ve bölmede ise dıştakiler kendi arasında, içtekiler kendi arasında işleme girer.</p>
          `,
          formulas: [
            {
              title: "Dört İşlem Kuralları",
              math: "a\\sqrt{x} \\pm b\\sqrt{x} = (a \\pm b)\\sqrt{x}, \\quad a\\sqrt{x} \\cdot b\\sqrt{y} = (ab)\\sqrt{xy}, \\quad \\frac{a\\sqrt{x}}{b\\sqrt{y}} = \\frac{a}{b}\\sqrt{\\frac{x}{y}}",
              desc: "Kök içleri farklıysa toplama yapılamaz ($\\sqrt{2} + \\sqrt{3} \\neq \\sqrt{5}$)."
            },
            {
              title: "Doğal Sayı Yapan Çarpan",
              math: "\\sqrt{a} \\cdot \\sqrt{a} = a \\quad \\text{ve} \\quad a\\sqrt{b} \\cdot c\\sqrt{b} = a \\cdot c \\cdot b",
              desc: "Kareköklü bir ifadeyi kendisinin irrasyonel kök kısmıyla çarpmak sonucu doğal sayı yapar."
            }
          ],
          examples: [
            {
              question: "$\\sqrt{12} + \\sqrt{27} - \\sqrt{48}$ işleminin sonucunu bulunuz.",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p>• $\\sqrt{12} = \\sqrt{4 \\times 3} = 2\\sqrt{3}$</p>
                  <p>• $\\sqrt{27} = \\sqrt{9 \\times 3} = 3\\sqrt{3}$</p>
                  <p>• $\\sqrt{48} = \\sqrt{16 \\times 3} = 4\\sqrt{3}$</p>
                  <p>İşlem: $(2 + 3 - 4)\\sqrt{3} = 1\\sqrt{3} = \\sqrt{3}$ bulunur.</p>
                </div>
              `,
              tip: "Kök içlerini daima en küçük kök kalacak şekilde parçalayın."
            }
          ]
        }
      ],
      traps: [
        {
          title: "⚠️ Kök İçi Toplama / Çıkarma Tuzağı",
          text: "$\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ ! Örneğin: $\\sqrt{9 + 16} = \\sqrt{25} = 5$ iken $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$'dir."
        },
        {
          title: "⚠️ Karekökün İçi Asla Negatif Olamaz",
          text: "Reel sayılarda kök derecesi 2 olan ifadenin içi negatif olamaz ($\\sqrt{-16}$ tanımsızdır). Ancak $-\\sqrt{16} = -4$'tür."
        }
      ],
      tips: [
        "1'den 25'e kadar olan tam kareleri ezberleyin ($1, 4, 9, \\dots, 625$).",
        "Alanı verilen karenin bir kenarı daima $\\sqrt{\\text{Alan}}$'dır."
      ],
      classActivity: {
        title: "Sıra Sende / Sınıfta Birlikte Çözelim",
        question: "Alanı $108 \\text{ cm}^2$ olan karenin çevresi kaç santimetredir?",
        solution: "Karenin bir kenarı a = √108 = √(36 × 3) = 6√3 cm'dir. Çevre = 4 × a = 4 × 6√3 = 24√3 cm bulunur."
      }
    },
    {
      id: "veri-analizi",
      unitNo: 4,
      title: "Veri Analizi",
      icon: "ph-chart-pie-slice",
      badgeColor: "from-cyan-500 to-blue-500",
      grade: "8",
      kazanimCode: "M.8.4.1.1 - M.8.4.1.2",
      kazanimDesc: "En fazla üç veri grubuna ait çizgi, sütun ve daire grafiklerini yorumlar ve birbirine dönüştürür.",
      summary: "Daire grafiği ($360^\\circ$ orantısı), sütun ve çizgi grafiği dönüşümleri ile LGS grafik okuma teknikleri.",
      introMotivation: "Anket sonuçları, bütçe dağılımları ve hava sıcaklığı değişimleri grafiklerle özetlenir. LGS'de grafik soruları genellikle iki farklı grafiğin (örn: Daire grafiği ile Sütun grafiği) birbiriyle ilişkilendirilmesi şeklinde gelir.",
      sections: [
        {
          title: "1. Grafik Türleri & Daire Grafiği Orantı Mantığı",
          content: `
            <p class="leading-relaxed mb-3"><strong>Daire Grafiği:</strong> Bir bütünün parçalarını (oranını) göstermek için en uygun grafiktir. Bütün daima $360^\\circ$'ye eşittir.</p>
            <p class="leading-relaxed mb-3"><strong>Sütun Grafiği:</strong> Farklı kategorilerin miktarlarını karşılaştırmak için kullanılır.</p>
            <p class="leading-relaxed mb-3"><strong>Çizgi Grafiği:</strong> Zamana bağlı artış, azalış ve süreklilik gösteren verilerde (sıcaklık, döviz, borsa vb.) kullanılır.</p>
          `,
          formulas: [
            {
              title: "Daire Grafiği Merkez Açı Formülü",
              math: "\\text{Merkez Açı} = \\frac{\\text{Kategori Miktarı}}{\\text{Toplam Veri Miktarı}} \\times 360^\\circ",
              desc: "Toplam veri miktarı $360^\\circ$'ye oranlanarak her kategoriye düşen merkez açı bulunur."
            },
            {
              title: "Pratik Açı - Kesir Karşılıkları (Hızlı Çözüm)",
              math: "180^\\circ = \\frac{1}{2}, \\quad 120^\\circ = \\frac{1}{3}, \\quad 90^\\circ = \\frac{1}{4}, \\quad 60^\\circ = \\frac{1}{6}, \\quad 45^\\circ = \\frac{1}{8}",
              desc: "Bu pratik oranları bilmek denemelerde orantı kurmadan saniyeler içinde sonuca götürür."
            }
          ],
          examples: [
            {
              question: "Bir sınıftaki 36 öğrencinin 9'u voleybol, 12'si basketbol ve geri kalanı futbol oynamaktadır. Bu dağılım daire grafiğinde gösterildiğinde futbola ait merkez açı kaç derece olur?",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>Adım 1:</strong> Futbol oynayan öğrenci sayısı: $36 - (9 + 12) = 36 - 21 = 15$ öğrenci.</p>
                  <p><strong>Adım 2:</strong> Toplam 36 öğrenci $360^\\circ$'ye karşılık geliyorsa:</p>
                  <p>$$1 \\text{ öğrenci} = \\frac{360^\\circ}{36} = 10^\\circ$$</p>
                  <p><strong>Adım 3:</strong> 15 futbolcu $= 15 \\times 10^\\circ = 150^\\circ$ bulunur.</p>
                </div>
              `,
              tip: "Toplam veriyi 360'a bölerek '1 birime kaç derece düşüyor' kuralını bulmak en hızlı yöntemdir."
            }
          ]
        }
      ],
      traps: [
        {
          title: "⚠️ Toplam Veriyi $360^\\circ$ Yerine $100$ Almak",
          text: "Daire grafiğinde toplam açı $100$ değil, daima $360^\\circ$'dir. Yüzde soruluyorsa $\%100 \\leftrightarrow 360^\\circ$ çapraz orantısı kurulmalıdır."
        }
      ],
      tips: [
        "Açıları sadeleştirin! Örneğin $90^\\circ = \\frac{1}{4}$ (çeyrek), $180^\\circ = \\frac{1}{2}$ (yarım)."
      ],
      classActivity: {
        title: "Sıra Sende / Sınıfta Birlikte Çözelim",
        question: "Bir çiftlikteki hayvanların %25'i inek, %35'i koyun ve kalanı tavuktur. Tavukların daire grafiğindeki merkez açısı kaç derecedir?",
        solution: "Tavuk yüzdesi = %100 - (%25 + %35) = %40. %100 ⟹ 360° ise %40 ⟹ (40 × 360) / 100 = 144° bulunur."
      }
    },
    {
      id: "olasilik",
      unitNo: 5,
      title: "Basit Olayların Olma Olasılığı",
      icon: "ph-dice-five",
      badgeColor: "from-emerald-500 to-teal-500",
      grade: "8",
      kazanimCode: "M.8.5.1.1 - M.8.5.1.5",
      kazanimDesc: "Basit olayların olası durumlarını belirler, 'daha fazla', 'daha az', 'eşit' olasılıklı olayları ayırt eder ve bir olayın olma olasılığını hesaplar.",
      summary: "Olası durumlar kümesi, eş olasılık, kesin olay (1), imkansız olay (0) ve olmama olasılığı.",
      introMotivation: "Şans oyunları, hava durumu tahminleri ve risk analizlerinde olasılık kullanılır. LGS'de soru kökündeki 'en az', 'en çok', 'veya', 'birlikte' ve 'geri bırakılmaksızın' kelimelerine dikkat edildiğinde olasılık en kolay net getiren konudur.",
      sections: [
        {
          title: "1. Temel Kavramlar & Olasılık Formülü",
          content: `
            <p class="leading-relaxed mb-3"><strong>Deney:</strong> Bir sonucun elde edilmesi için yapılan işlem (Örn: Zar atılması).</p>
            <p class="leading-relaxed mb-3"><strong>Çıktı (Olası Durum):</strong> Deney sonucunda elde edilebilecek her bir sonuç (Zarın 1, 2, 3, 4, 5, 6 gelmesi).</p>
            <p class="leading-relaxed mb-3"><strong>İmkansız Olay:</strong> Gerçekleşmesi mümkün olmayan olay ($P = 0$). Örneğin standart zarda 7 gelmesi.</p>
            <p class="leading-relaxed mb-3"><strong>Kesin Olay:</strong> Gerçekleşmesi garanti olan olay ($P = 1$). Örneğin atılan zarın 7'den küçük gelmesi.</p>
          `,
          formulas: [
            {
              title: "Bir Olayın Olma Olasılığı Formülü",
              math: "P(A) = \\frac{\\text{İstenen Olası Durumların Sayısı}}{\\text{Tüm Olası Durumların Sayısı}} \\quad (0 \\le P(A) \\le 1)",
              desc: "Bir olayın olasılığı daima 0 ile 1 arasındadır (basit kesirdir)."
            },
            {
              title: "Olma ve Olmama Olasılığı",
              math: "P(\\text{Olay}) + P(\\text{Olay Değil}) = 1 \\implies P(\\text{Olmama}) = 1 - P(\\text{Olma})",
              desc: "Bir olayın olma olasılığı ile olmama olasılığının toplamı daima 1'e eşittir."
            }
          ],
          examples: [
            {
              question: "İçinde 4 kırmızı, 6 mavi ve 5 sarı bilye bulunan bir torbadan rastgele çekilen bir bilyenin **mavi olmama** olasılığı kaçtır?",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>Adım 1:</strong> Tüm bilyeler $= 4 + 6 + 5 = 15$ adet (Tüm Olası Durumlar).</p>
                  <p><strong>Adım 2:</strong> Mavi olmayan bilyeler $= 4 \\text{ (kırmızı)} + 5 \\text{ (sarı)} = 9$ adet (İstenen Durumlar).</p>
                  <p><strong>Adım 3:</strong> Olasılık $= \\frac{9}{15} = \\frac{3}{5}$ bulunur.</p>
                </div>
              `,
              tip: "Kesirleri mutlaka en sade haline getirerek şıklarda arayın."
            }
          ]
        }
      ],
      traps: [
        {
          title: "⚠️ 1'den Büyük veya Negatif Olasılık Olamaz",
          text: "Bir olasılık değeri hiçbir zaman negatif veya $1$'den büyük çıkamaz."
        }
      ],
      tips: [
        "Tüm olası durumların sayısını en başta doğru saymak sorunun %50'sini çözmektir."
      ],
      classActivity: {
        title: "Sıra Sende / Sınıfta Birlikte Çözelim",
        question: "1'den 20'ye kadar (1 ve 20 dahil) numaralandırılmış kartlardan rastgele seçilen bir kartın üzerindeki sayının asal sayı olma olasılığı kaçtır?",
        solution: "Tüm durumlar = 20. 1-20 arasındaki asallar: {2, 3, 5, 7, 11, 13, 17, 19} → 8 adettir. Olasılık = 8/20 = 2/5 bulunur."
      }
    },
    {
      id: "cebirsel-ifadeler",
      unitNo: 6,
      title: "Cebirsel İfadeler ve Özdeşlikler",
      icon: "ph-brackets-curly",
      badgeColor: "from-fuchsia-500 to-pink-500",
      grade: "8",
      kazanimCode: "M.8.2.1.1 - M.8.2.1.4",
      kazanimDesc: "Basit cebirsel ifadeleri anlar ve farklı biçimlerde yazar; cebirsel ifadelerin çarpımını yapar, özdeşlikleri modeller ve çarpanlarına ayırır.",
      summary: "Terim, katsayı, sabit terim, ortak çarpan parantezi, tam kare ve iki kare farkı özdeşlikleri ile geometrik alan modellemeleri.",
      introMotivation: "Bilinmeyen sayıları harflerle ($x, y, a, b$) ifade etmek matematiğin evrensel dilidir. LGS'de kağıt katlama ve kesip çıkarma gibi geometrik alan sorularının tamamı Cebirsel İfadeler ve Özdeşlikler ile çözülür.",
      sections: [
        {
          title: "1. Cebirsel Kavramlar & 3 Temel Özdeşlik",
          content: `
            <p class="leading-relaxed mb-3">İçinde en az bir bilinmeyen ve işlem bulunan ifadelere <strong>cebirsel ifade</strong> denir ($3x^2 - 5x + 7$).</p>
            <p class="leading-relaxed mb-3"><strong>Özdeşlik:</strong> Bilinmeyenin HER değeri için doğru olan eşitliklerdir. Denklem ise sadece belirli kökler için doğrudur.</p>
          `,
          formulas: [
            {
              title: "1. İki Terimin Toplamının Karesi (Tam Kare)",
              math: "(a + b)^2 = a^2 + 2ab + b^2",
              desc: "Birincinin karesi + Birinci ile ikincinin çarpımının 2 katı + İkincinin karesi."
            },
            {
              title: "2. İki Terimin Farkının Karesi (Tam Kare)",
              math: "(a - b)^2 = a^2 - 2ab + b^2",
              desc: "Birincinin karesi - Birinci ile ikincinin çarpımının 2 katı + İkincinin karesi."
            },
            {
              title: "3. İki Kare Farkı Özdeşliği",
              math: "a^2 - b^2 = (a - b)(a + b)",
              desc: "Kareleri farkı, tabanların farkı ile toplamının çarpımına eşittir."
            }
          ],
          examples: [
            {
              question: "$102^2 - 98^2$ işleminin sonucunu iki kare farkı özdeşliği kullanarak kolayca hesaplayınız.",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>Kural:</strong> $a^2 - b^2 = (a - b)(a + b)$</p>
                  <p>• $a = 102$ ve $b = 98$</p>
                  <p>• $(102 - 98) \\times (102 + 98) = 4 \\times 200 = 800$ bulunur.</p>
                </div>
              `,
              tip: "Büyük sayıların kare farklarında doğrudan kare almak yerine iki kare farkını uygulayın."
            }
          ]
        }
      ],
      traps: [
        {
          title: "⚠️ Ortadaki $2ab$ Terimini Unutmak!",
          text: "$(a + b)^2 \\neq a^2 + b^2$ ! Ortadaki $2ab$ (çarpımlarının iki katı) terimini asla unutmayın."
        },
        {
          title: "⚠️ Sabit Terim de Bir Katsayıdır",
          text: "$3x^2 - 5x + 7$ ifadesinin katsayılar toplamı: $3 + (-5) + 7 = 5$'tir. Sabit terim ($+7$) aynı zamanda bir katsayıdır ve işaretiyle birlikte alınır."
        }
      ],
      tips: [
        "Geometrik alan modellemelerinde büyük karenin alanından küçük parçaların alanını çıkararak iki kare farkını somutlaştırın."
      ],
      classActivity: {
        title: "Sıra Sende / Sınıfta Birlikte Çözelim",
        question: "$x + y = 7$ ve $x \\cdot y = 10$ olduğuna göre $x^2 + y^2$ ifadesinin değeri kaçtır?",
        solution: "(x + y)² = x² + 2xy + y² formülünde değerleri yerine yazalım: 7² = (x² + y²) + 2(10) ⟹ 49 = (x² + y²) + 20 ⟹ x² + y² = 29 bulunur."
      }
    },
    {
      id: "dogrusal-denklemler",
      unitNo: 7,
      title: "Doğrusal Denklemler ve Eğim",
      icon: "ph-trend-up",
      badgeColor: "from-blue-600 to-indigo-600",
      grade: "8",
      kazanimCode: "M.8.2.2.1 - M.8.2.2.6",
      kazanimDesc: "Birinci dereceden bir bilinmeyenli denklemleri çözer; koordinat sistemini tanır, doğrusal ilişkilerin tablosunu ve grafiğini oluşturur; doğrunun eğimini modeller ve hesaplar.",
      summary: "Denklem çözme, koordinat sistemi, doğru grafikleri ($y=mx+n$), eksenleri kestiği noktalar ve eğim ($m = \\Delta y / \\Delta x$).",
      introMotivation: "Bir taksimetrenin açılış ücreti ve kilometre başına yazdığı tarife ya da bir fidanın zamana bağlı boy uzaması doğrusal denklemlerle modellenir. Eğim ise dağ yollarının dikliğini veya rampaların standartlara uygunluğunu belirler.",
      sections: [
        {
          title: "1. Koordinat Düzlemi, Doğru Grafiği & Eğim ($m$)",
          content: `
            <p class="leading-relaxed mb-3"><strong>Koordinat Sistemi:</strong> İki sayı doğrusunun $0$ noktasında dik kesişmesiyle oluşur ($x$: Apsis ekseni, $y$: Ordinat ekseni, Orijin $(0,0)$).</p>
            <p class="leading-relaxed mb-3"><strong>Eksenleri Kesen Doğrular ($ax+by+c=0$):</strong> $x=0$ verilip $y$ kesim noktası, $y=0$ verilip $x$ kesim noktası bulunur.</p>
            <p class="leading-relaxed mb-3"><strong>Orijinden Geçen Doğrular ($y=mx$):</strong> Sabit terimi ($c$) sıfırdır, daima $(0,0)$'dan geçer.</p>
          `,
          formulas: [
            {
              title: "Eğim Formülü",
              math: "m = \\frac{\\text{Dikey Uzunluk}}{\\text{Yatay Uzunluk}} = \\frac{\\Delta y}{\\Delta x}",
              desc: "Sağa yatık doğruların eğimi pozitif ($m > 0$), sola yatık doğruların eğimi negatiftir ($m < 0$)."
            },
            {
              title: "Denklemden Eğim Çekme",
              math: "y = mx + n \\implies \\text{Eğim} = m, \\quad ax + by + c = 0 \\implies m = -\\frac{a}{b}",
              desc: "$y$ yalnız bırakıldığında $x$'in katsayısı doğrudan eğimi verir."
            }
          ],
          examples: [
            {
              question: "$2x - 3y + 12 = 0$ doğrusunun eğimini ve eksenleri kestiği noktaları bulunuz.",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>1. Eksenleri Kestiği Noktalar:</strong></p>
                  <p>• $x = 0 \\implies -3y + 12 = 0 \\implies y = 4 \\implies (0, 4)$</p>
                  <p>• $y = 0 \\implies 2x + 12 = 0 \\implies x = -6 \\implies (-6, 0)$</p>
                  <p><strong>2. Eğim ($m$):</strong> $y$'yi yalnız bırakalım: $3y = 2x + 12 \\implies y = \\frac{2}{3}x + 4 \\implies m = \\frac{2}{3}$</p>
                </div>
              `,
              tip: "Eğim bulurken y'nin katsayısını 1 yapmayı unutmayın."
            }
          ]
        }
      ],
      traps: [
        {
          title: "⚠️ Yatay ve Dikey Doğruların Eğimi",
          text: "Yatay doğru ($y = b$) eğimi $= 0$'dır. Dikey doğru ($x = a$) eğimi ise **tanımsızdır** (payda 0 olur)."
        }
      ],
      tips: [
        "Orijinden geçen doğruların denklemlerinde sabit terim yoktur ($y = mx$ formundadır ve $(0,0)$'dan geçer)."
      ],
      classActivity: {
        title: "Sıra Sende / Sınıfta Birlikte Çözelim",
        question: "Dikey yüksekliği 6 metre, yatay uzunluğu 15 metre olan bir engelli rampasının eğimi yüzde kaçtır?",
        solution: "Eğim m = Dikey / Yatay = 6 / 15. Kesri sadeleştirip paydayı 100 yapalım: 6/15 = 2/5 = 40/100 = %40 bulunur."
      }
    },
    {
      id: "esitsizlikler",
      unitNo: 8,
      title: "Eşitsizlikler",
      icon: "ph-arrows-left-right",
      badgeColor: "from-rose-500 to-red-600",
      grade: "8",
      kazanimCode: "M.8.2.3.1 - M.8.2.3.3",
      kazanimDesc: "Birinci dereceden bir bilinmeyenli eşitsizlik içeren günlük hayat durumlarını modeller, eşitsizlikleri sayı doğrusunda gösterir ve çözer.",
      summary: "Eşitsizlik sembolleri ($<, \\le, >, \\ge$), negatif sayıya bölmede yön değiştirme ve sayı doğrusu aralık gösterimi.",
      introMotivation: "Hız limitleri (örn: $v \\le 120 \\text{ km/s}$), asansör taşıma kapasiteleri ($k \\le 450 \\text{ kg}$) ve bütçe sınırları eşitsizliklerle ifade edilir.",
      sections: [
        {
          title: "1. Eşitsizlik Çözüm Kuralları & Yön Değiştirme",
          content: `
            <p class="leading-relaxed mb-3">İçinde $<, \\le, >, \\ge$ sembolleri bulunan ifadelere <strong>eşitsizlik</strong> denir. Denklem çözer gibi bilinmeyen yalnız bırakılır.</p>
          `,
          formulas: [
            {
              title: "Eşitsizlikte Yön Değiştirme Kuralı (Kritik!)",
              math: "-ax < b \\implies x > -\\frac{b}{a} \\quad (a > 0)",
              desc: "Eşitsizliğin her iki tarafı negatif bir sayı ile çarpılır veya bölünürse eşitsizlik sembolü YÖN DEĞİŞTİRİR ($< \\leftrightarrow >$)."
            },
            {
              title: "Sayı Doğrusu Gösterimi",
              math: "x \\ge a \\rightarrow \\text{İçi Dolu (\\textbullet)}, \\quad x > a \\rightarrow \\text{İçi Boş (\\textopenbullet)}",
              desc: "Eşitlik varsa sınır noktası taranır, eşitlik yoksa içi boş bırakılır."
            }
          ],
          examples: [
            {
              question: "$-3x + 5 \\ge 20$ eşitsizliğini çözünüz ve çözüm kümesini bulunuz.",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>Adım 1:</strong> $+5$'i sağ tarafa atalım: $-3x \\ge 20 - 5 \\implies -3x \\ge 15$</p>
                  <p><strong>Adım 2 (YÖN DEĞİŞTİRME):</strong> Her iki tarafı $-3$'e bölelim (sembol $\\ge$ iken $\\le$ olur):</p>
                  <p>$$x \\le \\frac{15}{-3} \\implies x \\le -5$$</p>
                </div>
              `,
              tip: "Negatif sayıya böldüğünüz anda sembolün yönünü değiştirmeyi refleksi haline getirin."
            }
          ]
        }
      ],
      traps: [
        {
          title: "⚠️ Negatif Sayıya Bölerken Yönü Değiştirmeyi Unutmak",
          text: "LGS'de öğrencilerin %40'ı negatif sayıya böldüğünde eşitsizliğin yönünü değiştirmeyi unuttuğu için soru kaçırmaktadır!"
        }
      ],
      tips: [
        "'En az 15' deniyorsa $x \\ge 15$, 'en çok 20' deniyorsa $x \\le 20$, '10'dan fazla' deniyorsa $x > 10$ yazılır."
      ],
      classActivity: {
        title: "Sıra Sende / Sınıfta Birlikte Çözelim",
        question: "Hangi sayının 4 katının 6 eksiği, aynı sayının 18 fazlasından küçüktür?",
        solution: "Cebirsel model: 4x - 6 < x + 18 ⟹ 4x - x < 18 + 6 ⟹ 3x < 24 ⟹ x < 8 bulunur."
      }
    },
    {
      id: "ucgenler",
      unitNo: 9,
      title: "Üçgenler & Pisagor Teoremi",
      icon: "ph-triangle",
      badgeColor: "from-amber-600 to-yellow-500",
      grade: "8",
      kazanimCode: "M.8.3.1.1 - M.8.3.1.5",
      kazanimDesc: "Üçgende kenarortay, açıortay ve yüksekliği inşa eder; üçgen eşitsizliğini, açı-kenar bağıntılarını ve Pisagor bağıntısını uygular.",
      summary: "Üçgen eşitsizliği, açı-kenar bağıntıları, yardımcı elemanlar ($V, n, h$), Pisagor bağıntısı ($a^2+b^2=c^2$) ve özel dik üçgenler.",
      introMotivation: "Mimarlıkta çatı makasları, köprü kabloları ve GPS konumlandırmalarının tümü üçgenlerin geometrik sağlamlığı ve Pisagor bağıntısıyla tasarlanır.",
      sections: [
        {
          title: "1. Üçgen Eşitsizliği & Açı-Kenar İlişkisi",
          content: `
            <p class="leading-relaxed mb-3">Bir üçgenin çizilebilmesi için kenarları arasında üçgen eşitsizliği kuralı sağlanmalıdır.</p>
          `,
          formulas: [
            {
              title: "Üçgen Eşitsizliği Formülü",
              math: "|b - c| < a < b + c",
              desc: "Bir kenar uzunluğu, diğer iki kenarın farkının mutlak değerinden büyük, toplamından küçük olmalıdır."
            },
            {
              title: "Açı - Kenar Bağıntısı",
              math: "m(\\hat{A}) > m(\\hat{B}) > m(\\hat{C}) \\iff a > b > c",
              desc: "Büyük açının karşısında daima büyük kenar bulunur."
            }
          ],
          examples: [
            {
              question: "Kenar uzunlukları $6 \\text{ cm}$ ve $10 \\text{ cm}$ olan bir üçgenin üçüncü kenarının alabileceği en büyük ve en küçük tam sayı değerleri toplamı kaçtır?",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>Üçgen Eşitsizliği:</strong> $|10 - 6| < x < 10 + 6 \\implies 4 < x < 16$</p>
                  <p>• En küçük tam sayı: $x = 5$</p>
                  <p>• En büyük tam sayı: $x = 15$</p>
                  <p>• Toplam: $5 + 15 = 20 \\text{ cm}$ bulunur.</p>
                </div>
              `,
              tip: "Soruda 'üçgen çeşitkenardır' gibi ekstra şartlar olup olmadığını kontrol edin."
            }
          ]
        },
        {
          title: "2. Pisagor Bağıntısı & Özel Dik Üçgenler",
          content: `
            <p class="leading-relaxed mb-3">Bir dik üçgende $90^\\circ$'lik açının karşısındaki kenara <strong>hipotenüs</strong> denir ve hipotenüs üçgenin en uzun kenarıdır.</p>
          `,
          formulas: [
            {
              title: "Pisagor Bağıntısı",
              math: "a^2 + b^2 = c^2 \\quad (c: \\text{Hipotenüs})",
              desc: "Dik kenarların kareleri toplamı, hipotenüsün karesine eşittir."
            },
            {
              title: "Özel Dik Üçgen Kalıpları (Ezbere Bilinmeli)",
              math: "(3 - 4 - 5), \\quad (5 - 12 - 13), \\quad (8 - 15 - 17), \\quad (7 - 24 - 25) \\; \\text{ve katları}",
              desc: "Örneğin (6-8-10), (9-12-15), (10-24-26) gibi katları ezbere bilmek LGS'de 1 dakika kazandırır."
            }
          ],
          examples: [
            {
              question: "Dik kenar uzunlukları $9 \\text{ cm}$ ve $12 \\text{ cm}$ olan bir dik üçgenin hipotenüs uzunluğu kaç santimetredir?",
              solution: `
                <div class="space-y-1.5 font-sans">
                  <p><strong>Özel Üçgen Kuralı:</strong> 3-4-5 üçgeninin 3 katıdır:</p>
                  <p>• $3 \\times 3 = 9$</p>
                  <p>• $4 \\times 3 = 12$</p>
                  <p>• Hipotenüs $= 5 \\times 3 = 15 \\text{ cm}$ bulunur.</p>
                </div>
              `,
              tip: "Sayılar büyükse önce ortak bir bölen ile sadeleştirip özel üçgen kalıbı arayın."
            }
          ]
        }
      ],
      traps: [
        {
          title: "⚠️ Pisagor Sadece Dik Üçgende Geçerlidir",
          text: "Açısı $90^\\circ$ olmayan üçgenlerde $a^2+b^2=c^2$ bağıntısı KULLANILAMAZ!"
        }
      ],
      tips: [
        "Açıortay açıyı ikiye böler ($n$), Kenarortay kenarı ikiye böler ($V$), Yükseklik dik iner ($h$)."
      ],
      classActivity: {
        title: "Sıra Sende / Sınıfta Birlikte Çözelim",
        question: "Duvardan 5 metre uzaklıkta duran 13 metre uzunluğundaki bir merdivenin duvara değdiği noktanın yerden yüksekliği kaç metredir?",
        solution: "Merdiven hipotenüstür (c=13), yer mesafesi a=5'tir. 5-12-13 özel dik üçgeninden duvar yüksekliği b = 12 metre bulunur."
      }
    }
  ],

  // 2. SORU DÜNYASI (KAZANIM & LGS YENİ NESİL SORULARI)
  questions: [
    // Çarpanlar ve Katlar
    {
      id: "q-ck-01",
      unit: "carpanlar-ve-katlar",
      unitName: "Çarpanlar ve Katlar",
      type: "kazanim",
      typeName: "Kazanım Testi",
      questionText: "Alanı $72 \\text{ cm}^2$ ve kenar uzunlukları santimetre cinsinden birer tam sayı olan bir dikdörtgenin çevre uzunluğu **en az** kaç santimetredir?",
      options: [
        { key: "A", text: "18 cm" },
        { key: "B", text: "34 cm" },
        { key: "C", text: "36 cm" },
        { key: "D", text: "74 cm" }
      ],
      correctAnswer: "B",
      hint: "Alanı sabit dikdörtgende çevrenin en az olması için kenar uzunlukları birbirine en yakın seçilmelidir.",
      explanation: `
        <div class="space-y-3">
          <p class="font-semibold text-white">Adım Adım MEB Çözüm Açıklaması:</p>
          <p>1. Dikdörtgenin alanı $a \\cdot b = 72 \\text{ cm}^2$'dir.</p>
          <p>2. Çevre formülü: $\\text{Çevre} = 2(a + b)$</p>
          <p>3. Çevrenin <strong>en az</strong> olması için $a$ ve $b$ çarpanları birbirine en yakın seçilmelidir: $72 = 8 \\times 9$</p>
          <p>4. $\\text{Çevre} = 2(8 + 9) = 2 \\times 17 = 34 \\text{ cm}$ bulunur.</p>
          <p class="text-pink-400 font-bold">Doğru Cevap: B (34 cm)</p>
        </div>
      `
    },
    {
      id: "q-ck-02",
      unit: "carpanlar-ve-katlar",
      unitName: "Çarpanlar ve Katlar",
      type: "yeninesil",
      typeName: "LGS Yeni Nesil",
      questionText: "Bir marangoz uzunlukları $120 \\text{ cm}$ ve $150 \\text{ cm}$ olan iki tahta çıtayı hiç parça artmayacak şekilde eşit uzunlukta en büyük parçalara bölecektir. Marangoz her bir kesim işlemi için $4$ saniye harcadığına göre, bu kesim işi **toplam kaç saniye** sürer?",
      options: [
        { key: "A", text: "28 saniye" },
        { key: "B", text: "32 saniye" },
        { key: "C", text: "36 saniye" },
        { key: "D", text: "40 saniye" }
      ],
      correctAnswer: "A",
      hint: "Parça sayısı ile kesim sayısı arasındaki farka dikkat! Kesim Sayısı = Parça Sayısı - 1.",
      explanation: `
        <div class="space-y-3">
          <p class="font-semibold text-white">Adım Adım MEB Çözüm Açıklaması:</p>
          <p>1. Eşit ve en büyük parça uzunluğu $\\text{EBOB}(120, 150)$ ile bulunur:</p>
          <p>$$\\text{EBOB}(120, 150) = 30 \\text{ cm}$$</p>
          <p>2. Parça Sayıları:</p>
          <p>• 1. çıta: $120 / 30 = 4$ parça $\\implies 4 - 1 = 3$ kesim</p>
          <p>• 2. çıta: $150 / 30 = 5$ parça $\\implies 5 - 1 = 4$ kesim</p>
          <p>3. Toplam Kesim Sayısı: $3 + 4 = 7$ kesim</p>
          <p>4. Toplam Süre: $7 \\times 4 = 28$ saniye sürer.</p>
          <p class="text-pink-400 font-bold">Doğru Cevap: A (28 saniye)</p>
        </div>
      `
    },
    // Üslü İfadeler
    {
      id: "q-us-01",
      unit: "uslu-ifadeler",
      unitName: "Üslü İfadeler",
      type: "kazanim",
      typeName: "Kazanım Testi",
      questionText: "$\\frac{2^8 \\cdot 4^3}{8^4}$ işleminin sonucu aşağıdakilerden hangisine eşittir?",
      options: [
        { key: "A", text: "$2^2$" },
        { key: "B", text: "$2^4$" },
        { key: "C", text: "$2^6$" },
        { key: "D", text: "$2^8$" }
      ],
      correctAnswer: "A",
      hint: "Tüm tabanları 2 tabanına çevirerek üssün üssü kuralını uygulayın.",
      explanation: `
        <div class="space-y-3">
          <p class="font-semibold text-white">Adım Adım MEB Çözüm Açıklaması:</p>
          <p>1. Tabanları 2'nin kuvveti olarak yazalım:</p>
          <p>• $4^3 = (2^2)^3 = 2^6$</p>
          <p>• $8^4 = (2^3)^4 = 2^{12}$</p>
          <p>2. İfadeyi düzenleyelim:</p>
          <p>$$\\frac{2^8 \\cdot 2^6}{2^{12}} = \\frac{2^{8+6}}{2^{12}} = \\frac{2^{14}}{2^{12}} = 2^{14-12} = 2^2$$</p>
          <p class="text-pink-400 font-bold">Doğru Cevap: A ($2^2$ = 4)</p>
        </div>
      `
    },
    {
      id: "q-us-02",
      unit: "uslu-ifadeler",
      unitName: "Üslü İfadeler",
      type: "yeninesil",
      typeName: "LGS Yeni Nesil",
      questionText: "Bir laboratuvarda bulunan bakteri türünün sayısı her $30$ dakikada bir $2$ katına çıkmaktadır. Başlangıçta tüpte $16^3$ adet bakteri olduğuna göre, **$4$ saat sonunda** tüpteki bakteri sayısının bilimsel gösterimi hangisidir?",
      options: [
        { key: "A", text: "$1{,}048576 \\times 10^6$" },
        { key: "B", text: "$1{,}024 \\times 10^5$" },
        { key: "C", text: "$5{,}24288 \\times 10^5$" },
        { key: "D", text: "$2{,}048 \\times 10^6$" }
      ],
      correctAnswer: "A",
      hint: "4 saat = 240 dakika. 240 / 30 = 8 defa ikiye katlanacaktır. Toplam = Başlangıç x 2^8.",
      explanation: `
        <div class="space-y-3">
          <p class="font-semibold text-white">Adım Adım MEB Çözüm Açıklaması:</p>
          <p>1. Başlangıçtaki bakteri sayısı: $16^3 = (2^4)^3 = 2^{12}$</p>
          <p>2. $4$ saat $= 240$ dakika. Bölünme sayısı $= 240 / 30 = 8$ defadır.</p>
          <p>3. Son durumdaki bakteri sayısı:</p>
          <p>$$2^{12} \\cdot 2^8 = 2^{20} = 1\\,048\\,576$$</p>
          <p>4. Bilimsel gösterim kuralı ($1 \\le |a| < 10$):</p>
          <p>$$1\\,048\\,576 = 1{,}048576 \\times 10^6$$</p>
          <p class="text-pink-400 font-bold">Doğru Cevap: A ($1{,}048576 \\times 10^6$)</p>
        </div>
      `
    },
    // Kareköklü İfadeler
    {
      id: "q-kk-01",
      unit: "karekoklu-ifadeler",
      unitName: "Kareköklü İfadeler",
      type: "kazanim",
      typeName: "Kazanım Testi",
      questionText: "$\\sqrt{108} - \\sqrt{48} + \\sqrt{27}$ işleminin sonucu aşağıdakilerden hangisidir?",
      options: [
        { key: "A", text: "$3\\sqrt{3}$" },
        { key: "B", text: "$5\\sqrt{3}$" },
        { key: "C", text: "$6\\sqrt{3}$" },
        { key: "D", text: "$7\\sqrt{3}$" }
      ],
      correctAnswer: "B",
      hint: "Tüm köklü sayıları a√3 biçiminde kök dışına çıkarın.",
      explanation: `
        <div class="space-y-3">
          <p class="font-semibold text-white">Adım Adım MEB Çözüm Açıklaması:</p>
          <p>1. Sayıları $a\\sqrt{b}$ biçiminde yazalım:</p>
          <p>• $\\sqrt{108} = \\sqrt{36 \\cdot 3} = 6\\sqrt{3}$</p>
          <p>• $\\sqrt{48} = \\sqrt{16 \\cdot 3} = 4\\sqrt{3}$</p>
          <p>• $\\sqrt{27} = \\sqrt{9 \\cdot 3} = 3\\sqrt{3}$</p>
          <p>2. İşlemi yapalım:</p>
          <p>$$6\\sqrt{3} - 4\\sqrt{3} + 3\\sqrt{3} = (6 - 4 + 3)\\sqrt{3} = 5\\sqrt{3}$$</p>
          <p class="text-pink-400 font-bold">Doğru Cevap: B ($5\\sqrt{3}$)</p>
        </div>
      `
    },
    {
      id: "q-kk-02",
      unit: "karekoklu-ifadeler",
      unitName: "Kareköklü İfadeler",
      type: "yeninesil",
      typeName: "LGS Yeni Nesil",
      questionText: "Alanı $180 \\text{ m}^2$ olan kare şeklindeki bir bahçenin etrafına $3$ sıra tel çekilecektir. Telin metresi $10$ TL olduğuna göre, bu iş için **tahmini kaç TL** tel masrafı yapılır? ($\\sqrt{5} \\approx 2{,}2$ alınız)",
      options: [
        { key: "A", text: "1200 TL" },
        { key: "B", text: "1440 TL" },
        { key: "C", text: "1584 TL" },
        { key: "D", text: "1800 TL" }
      ],
      correctAnswer: "C",
      hint: "Bahçenin bir kenarı a = √180 = 6√5 metredir. Çevre = 4a. 3 sıra tel = 3 x Çevre.",
      explanation: `
        <div class="space-y-3">
          <p class="font-semibold text-white">Adım Adım MEB Çözüm Açıklaması:</p>
          <p>1. Karenin bir kenarı: $a = \\sqrt{180} = \\sqrt{36 \\times 5} = 6\\sqrt{5} \\text{ metre}$</p>
          <p>2. 1 sıra çevre: $4 \\times 6\\sqrt{5} = 24\\sqrt{5} \\text{ metre}$</p>
          <p>3. 3 sıra tel uzunluğu: $3 \\times 24\\sqrt{5} = 72\\sqrt{5} \\text{ metre}$</p>
          <p>4. Metre fiyatı 10 TL olduğundan maliyet:</p>
          <p>$$72\\sqrt{5} \\times 10 = 720\\sqrt{5} \\approx 720 \\times 2{,}2 = 1584 \\text{ TL}$$</p>
          <p class="text-pink-400 font-bold">Doğru Cevap: C (1584 TL)</p>
        </div>
      `
    },
    // Cebirsel İfadeler
    {
      id: "q-cb-01",
      unit: "cebirsel-ifadeler",
      unitName: "Cebirsel İfadeler ve Özdeşlikler",
      type: "kazanim",
      typeName: "Kazanım Testi",
      questionText: "$(3x - 4)^2$ ifadesinin özdeşi aşağıdakilerden hangisidir?",
      options: [
        { key: "A", text: "$9x^2 - 16$" },
        { key: "B", text: "$9x^2 - 12x + 16$" },
        { key: "C", text: "$9x^2 - 24x + 16$" },
        { key: "D", text: "$9x^2 + 24x + 16$" }
      ],
      correctAnswer: "C",
      hint: "(a - b)² = a² - 2ab + b² özdeşliğini uygulayın.",
      explanation: `
        <div class="space-y-3">
          <p class="font-semibold text-white">Adım Adım MEB Çözüm Açıklaması:</p>
          <p>1. Tam kare farkı kuralı: $(a - b)^2 = a^2 - 2ab + b^2$</p>
          <p>2. Burada $a = 3x$ ve $b = 4$ olduğundan:</p>
          <p>• $a^2 = (3x)^2 = 9x^2$</p>
          <p>• $-2ab = -2 \\cdot (3x) \\cdot 4 = -24x$</p>
          <p>• $b^2 = 4^2 = 16$</p>
          <p>3. Sonuç: $9x^2 - 24x + 16$</p>
          <p class="text-pink-400 font-bold">Doğru Cevap: C ($9x^2 - 24x + 16$)</p>
        </div>
      `
    },
    {
      id: "q-cb-02",
      unit: "cebirsel-ifadeler",
      unitName: "Cebirsel İfadeler ve Özdeşlikler",
      type: "yeninesil",
      typeName: "LGS Yeni Nesil",
      questionText: "Bir kenar uzunluğu $2a$ cm olan kare şeklindeki bir kağıt, köşelerinden bir kenar uzunluğu $b$ cm olan 4 adet eş kare parça kesilip atılıyor. Kalan kağıdın santimetrekare cinsinden alanını veren cebirsel ifadenin çarpanlarına ayrılmış hali hangisidir?",
      options: [
        { key: "A", text: "$(2a - b)(2a + b)$" },
        { key: "B", text: "2$(a - b)(a + b)$" },
        { key: "C", text: "4$(a - b)(a + b)$" },
        { key: "D", text: "$(2a - 2b)^2$" }
      ],
      correctAnswer: "C",
      hint: "Büyük Karenin Alanı = (2a)² = 4a². Kesilen 4 karenin alanı = 4 x b² = 4b².",
      explanation: `
        <div class="space-y-3">
          <p class="font-semibold text-white">Adım Adım MEB Çözüm Açıklaması:</p>
          <p>1. Büyük karenin başlangıçtaki alanı: $(2a)^2 = 4a^2$</p>
          <p>2. Kesilip atılan 4 köşedeki karelerin toplam alanı: $4 \\cdot b^2 = 4b^2$</p>
          <p>3. Kalan alan: $4a^2 - 4b^2$</p>
          <p>4. Ortak çarpan (4) parantezine alıp iki kare farkı uygulayalım:</p>
          <p>$$4a^2 - 4b^2 = 4(a^2 - b^2) = 4(a - b)(a + b)$$</p>
          <p class="text-pink-400 font-bold">Doğru Cevap: C ($4(a - b)(a + b)$)</p>
        </div>
      `
    }
  ],

  // 3. MATEMATİK OYUNLARI VERİLERİ
  games: {
    rootHunter: [
      { target: 68, low: 8, high: 9, closerTo: 8, lowSq: 64, highSq: 81, diffLow: 4, diffHigh: 13 },
      { target: 45, low: 6, high: 7, closerTo: 7, lowSq: 36, highSq: 49, diffLow: 9, diffHigh: 4 },
      { target: 115, low: 10, high: 11, closerTo: 11, lowSq: 100, highSq: 121, diffLow: 15, diffHigh: 6 },
      { target: 19, low: 4, high: 5, closerTo: 4, lowSq: 16, highSq: 25, diffLow: 3, diffHigh: 6 },
      { target: 150, low: 12, high: 13, closerTo: 12, lowSq: 144, highSq: 169, diffLow: 6, diffHigh: 19 },
      { target: 30, low: 5, high: 6, closerTo: 5, lowSq: 25, highSq: 36, diffLow: 5, diffHigh: 6 },
      { target: 95, low: 9, high: 10, closerTo: 10, lowSq: 81, highSq: 100, diffLow: 14, diffHigh: 5 },
      { target: 135, low: 11, high: 12, closerTo: 12, lowSq: 121, highSq: 144, diffLow: 14, diffHigh: 9 },
      { target: 84, low: 9, high: 10, closerTo: 9, lowSq: 81, highSq: 100, diffLow: 3, diffHigh: 16 },
      { target: 54, low: 7, high: 8, closerTo: 7, lowSq: 49, highSq: 64, diffLow: 5, diffHigh: 10 }
    ],
    ebobEkokCards: [
      { pair: "(12, 18)", type: "EBOB", val: 6, matchId: 1 },
      { pair: "(12, 18)", type: "EKOK", val: 36, matchId: 2 },
      { pair: "(15, 20)", type: "EBOB", val: 5, matchId: 3 },
      { pair: "(15, 20)", type: "EKOK", val: 60, matchId: 4 },
      { pair: "(8, 12)", type: "EBOB", val: 4, matchId: 5 },
      { pair: "(8, 12)", type: "EKOK", val: 24, matchId: 6 },
      { pair: "(9, 15)", type: "EBOB", val: 3, matchId: 7 },
      { pair: "(9, 15)", type: "EKOK", val: 45, matchId: 8 }
    ]
  },

  // 4. HEDEF & NET KOÇU PEDAGOJİK REÇETE MATRİSİ
  coach: {
    unitAdvice: {
      "carpanlar-ve-katlar": {
        name: "Çarpanlar ve Katlar",
        prescription: "EBOB ve EKOK problemlerinde parçadan bütüne mi yoksa bütünden parçaya mı gidildiğini belirleme pratiği yap. Günlük en az 10 adet yeni nesil EBOB-EKOK problemi çöz.",
        focus: "Asal çarpan algoritması ve periyodik tekrar soruları."
      },
      "uslu-ifadeler": {
        name: "Üslü İfadeler",
        prescription: "Negatif üs ve parantezli/parantezsiz işaret kurallarına çok dikkat et. Tabanları 2, 3 ve 5 tabanında eşitleme egzersizlerini hızlandır.",
        focus: "Çok büyük ve çok küçük sayılar ile bilimsel gösterim."
      },
      "karekoklu-ifadeler": {
        name: "Kareköklü İfadeler",
        prescription: "Tam kare sayıları zihinden hızlı hatırla. Sayı doğrusunda yaklaşık değer tahminlerine ve kök içine alma-çıkarma adımlarına odaklan.",
        focus: "Kareköklü sayılarda toplama/çıkarma ve alanı verilen karenin kenarını bulma."
      },
      "veri-analizi": {
        name: "Veri Analizi",
        prescription: "360 derecelik daire grafiği orantılarını hızlandırmak için 30, 45, 60, 90, 120 derecelik hazır kesirleri zihninde otomatikleştir.",
        focus: "Daire grafiğinden sütun grafiğine ve çizgi grafiğine veri aktarımı."
      },
      "olasilik": {
        name: "Olasılık",
        prescription: "Tüm olası durumları eksiksiz listeleme alışkanlığı edin. 'Geri bırakılmaksızın' veya 'en az' ifadelerinin altını renkli kalemle çiz.",
        focus: "İstenen durum sayısı / Tüm durum sayısı kurgusu."
      },
      "cebirsel-ifadeler": {
        name: "Cebirsel İfadeler ve Özdeşlikler",
        prescription: "Tam kare ((a±b)²) ve iki kare farkı (a²-b²) özdeşliklerini geometrik alan modellemeleriyle somutlaştırarak tekrar et.",
        focus: "Ortak çarpan parantezine alma ve katsayılar toplamı."
      },
      "dogrusal-denklemler": {
        name: "Doğrusal Denklemler & Eğim",
        prescription: "Eğim m = dikey/yatay formülünü ve doğrunun sağa/sola yatıklığına göre işaretini belirleme egzersizleri yap.",
        focus: "Koordinat sisteminde doğru grafiği çizimi ve eksenleri kestiği noktalar."
      },
      "esitsizlikler": {
        name: "Eşitsizlikler",
        prescription: "Negatif bir sayı ile çarpar veya bölerken eşitsizliğin yön değiştirmesi kuralını masana as. Sayı doğrusunda açık/kapalı aralıkları tekrar et.",
        focus: "Problem metnini eşitsizlik sembollerine (> , < , >= , <=) dökebilme."
      },
      "ucgenler": {
        name: "Üçgenler & Pisagor",
        prescription: "3-4-5, 5-12-13, 8-15-17 özel dik üçgenlerini ve üçgen eşitsizliği (|b-c| < a < b+c) kuralını her gün 5 dakika tekrar et.",
        focus: "Pisagor bağıntısı ve kenarortay-açıortay-yükseklik çizimleri."
      }
    },
    gapStrategies: [
      {
        minGap: 0,
        maxGap: 2,
        title: "Şampiyonlar Ligi: İnce Ayar ve Süre Yönetimi",
        badge: "Zirveye Ulaşmak Üzere",
        advice: "Harikasın! Hedefine çok yakınsın. Bu aşamada konu eksiğin hemen hemen yok. Deneme sınavlarında soru başına 2 dakika süre sınırını aşmamaya, optik kodlama dikkatine ve dikkatsizlikten giden 1-2 soruyu analiz etmeye odaklan."
      },
      {
        minGap: 3,
        maxGap: 5,
        title: "Gelişim Atağı: Yeni Nesil Analiz & Soru Bankası Taraması",
        badge: "İstikrarlı Yükseliş",
        advice: "Mevcut temelin oldukça sağlam. Netlerini sıçratacak nokta; uzun paragraflı yeni nesil MEB sorularında verilen görseli ve sayısal verileri doğru eşleştirip soru kökünü ilk okumada anlamaktır. Her gün 1 adet branş denemesi çöz."
      },
      {
        minGap: 6,
        maxGap: 10,
        title: "Stratejik Dönüşüm: Kazanım Pekiştirme & Günlük Rutin",
        badge: "Yüksek Potansiyel",
        advice: "Hedefine ulaşmak için öncelikle zorlandığın 2 ünitenin konu özetlerini ve püf noktalarını tekrar etmelisin. Önce kolay kazanım testleriyle kavramları oturt, ardından günde en az 20 adet orta ve yeni nesil soru çözerek temponu artır."
      },
      {
        minGap: 11,
        maxGap: 20,
        title: "Temel Güçlendirme & Adım Adım İlerleme Planı",
        badge: "Yeni Bir Başlangıç",
        advice: "Önünde harika bir gelişim fırsatı var! Hedefini küçük haftalık parçalara böl (Örn: Her hafta +2 net artışı). Önce temel işlem becerilerini, tam kare sayıları ve formülleri pekiştir. Merve Öğretmen'in Konu Notları modülünü mutlaka her gün incele."
      }
    ]
  }
};

window.ACADEMY_MODULES_DATA = ACADEMY_MODULES_DATA;
