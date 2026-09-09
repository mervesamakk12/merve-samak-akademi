/**
 * Merve SAMAK AKADEMİ - 4 Yeni Modül Veri Havuzu
 * 1. Konu Notları (Özet, Formüller & Tuzak Noktalar)
 * 2. Soru Dünyası (Kazanım & LGS Yeni Nesil Soruları)
 * 3. Matematik Oyunları Verileri
 * 4. Hedef & Net Koçu Reçete Matrisi
 */

const ACADEMY_MODULES_DATA = {
  // 1. LGS KONU NOTLARI (ÖZET & TUZAK NOKTALAR)
  notes: [
    {
      id: "carpanlar-ve-katlar",
      title: "Çarpanlar ve Katlar",
      icon: "ph-grid-four",
      badgeColor: "from-pink-500 to-rose-500",
      grade: "8",
      summary: "Pozitif tam sayıların çarpanları, asal çarpan algoritması, EBOB & EKOK problem taktikleri.",
      formulas: [
        {
          title: "İki Sayının Çarpımı Kuralı",
          math: "A \\cdot B = \\text{EBOB}(A, B) \\cdot \\text{EKOK}(A, B)",
          desc: "İki pozitif tam sayının çarpımı, bu sayıların EBOB'u ile EKOK'unun çarpımına daima eşittir."
        },
        {
          title: "Aralarında Asal Sayılar",
          math: "\\text{EBOB}(A, B) = 1 \\quad \\text{ve} \\quad \\text{EKOK}(A, B) = A \\cdot B",
          desc: "Aralarında asal sayıların 1'den başka ortak böleni yoktur. Ardışık iki sayı daima aralarında asaldır."
        },
        {
          title: "Asal Çarpanlarına Ayrılmış Sayılarda EBOB & EKOK",
          math: "A = 2^3 \\cdot 3^2 \\cdot 5, \\quad B = 2^2 \\cdot 3^4 \\cdot 7 \\implies \\text{EBOB} = 2^2 \\cdot 3^2, \\; \\text{EKOK} = 2^3 \\cdot 3^4 \\cdot 5 \\cdot 7",
          desc: "EBOB için ortak asallardan üssü küçük olanlar; EKOK için ortak asallardan üssü büyük olanlar ve ortak olmayanların tamamı çarpılır."
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
      ]
    },
    {
      id: "uslu-ifadeler",
      title: "Üslü İfadeler",
      icon: "ph-arrow-fat-lines-up",
      badgeColor: "from-purple-500 to-indigo-500",
      grade: "8",
      summary: "Negatif üs, üssün üssü, taban ve üs eşitliği ile bilimsel gösterim kuralları.",
      formulas: [
        {
          title: "Negatif Üs Kuralı",
          math: "a^{-n} = \\frac{1}{a^n} \\quad \\text{ve} \\quad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n \\quad (a, b \\neq 0)",
          desc: "Negatif üs sayının işaretini değiştirmez, sayıyı sadece çarpmaya göre ters çevirir (takla attırır)."
        },
        {
          title: "Çarpma ve Bölme Kuralları",
          math: "a^m \\cdot a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}, \\quad a^n \\cdot b^n = (a \\cdot b)^n",
          desc: "Tabanlar aynıysa çarparken üsler toplanır, bölerken çıkarılır. Üsler aynıysa tabanlar çarpılır/bölünür."
        },
        {
          title: "Bilimsel Gösterim",
          math: "a \\cdot 10^n \\quad \\text{şartı:} \\quad 1 \\le |a| < 10 \\; \\text{ve} \\; n \\in \\mathbb{Z}",
          desc: "Katsayı ($a$) mutlak değerce 1 ile 10 arasında olmalı, 10 olamaz! (1 dahil, 10 hariç)."
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
          title: "⚠️ Basamak Sayısı ve $10^n$ İlişkisi",
          text: "$A \\cdot 10^n$ sayısının basamak sayısı = ($A$'nın basamak sayısı) $+ n$'dir. $10^7$ sayısı $1$ ve ardından $7$ sıfırdan oluştuğu için $8$ basamaklıdır."
        }
      ],
      tips: [
        "Farklı tabanlı üslü sayılarda önce tabanları $2, 3, 5$ gibi en küçük asal tabanlara çevirin (örn: $8^4 = (2^3)^4 = 2^{12}$).",
        "Kaç katıdır sorularında büyük ifadeyi küçük ifadeye bölün!"
      ]
    },
    {
      id: "karekoklu-ifadeler",
      title: "Kareköklü İfadeler",
      icon: "ph-radical",
      badgeColor: "from-amber-500 to-orange-500",
      grade: "8",
      summary: "Tam kare sayılar, kök dışına çıkarma $a\\sqrt{b}$, yaklaşık değer tahmini ve ondalık karekökler.",
      formulas: [
        {
          title: "Kök Dışına Çıkarma ve İçine Alma",
          math: "\\sqrt{a^2 \\cdot b} = |a|\\sqrt{b} \\quad \\text{ve} \\quad a\\sqrt{b} = \\sqrt{a^2 \\cdot b} \\quad (a > 0)",
          desc: "Kök içindeki tam kare çarpanlar karekökten kurtularak dışarı çıkar. Dışarıdaki sayı içeri girerken karesi alınır."
        },
        {
          title: "Toplama ve Çıkarma Şartı",
          math: "a\\sqrt{x} + b\\sqrt{x} - c\\sqrt{x} = (a + b - c)\\sqrt{x}",
          desc: "Kareköklü ifadelerde toplama/çıkarma yapılabilmesi için kök içlerinin birebir AYNI olması şarttır!"
        },
        {
          title: "Çarpma ve Bölme",
          math: "a\\sqrt{x} \\cdot b\\sqrt{y} = (a \\cdot b)\\sqrt{x \\cdot y}, \\quad \\frac{a\\sqrt{x}}{b\\sqrt{y}} = \\frac{a}{b}\\sqrt{\\frac{x}{y}}",
          desc: "Dıştakiler kendi arasında, kök içindekiler kendi arasında çarpılır ve bölünür."
        }
      ],
      traps: [
        {
          title: "⚠️ Kök İçi Toplama / Çıkarma Tuzağı",
          text: "$\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ ! Örneğin: $\\sqrt{9 + 16} = \\sqrt{25} = 5$ iken $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$'dir."
        },
        {
          title: "⚠️ Yaklaşık Değerde Hangisine Yakın?",
          text: "$\\sqrt{70}$ sayısı $\\sqrt{64}=8$ ile $\\sqrt{81}=9$ arasındadır. $70-64 = 6$ ve $81-70 = 11$ olduğundan $\\sqrt{70}$ sayısı 8'e daha yakındır (yaklaşık $8.3$ - $8.4$)."
        },
        {
          title: "⚠️ Doğal Sayı Yapan Çarpan",
          text: "Bir köklü ifadeyi doğal sayı yapmak için kök içindeki irrasyonel kısmı kendisiyle veya kök içini tam kare yapan bir sayıyla çarpmak gerekir ($2\\sqrt{3} \\cdot \\sqrt{3} = 2 \\cdot 3 = 6$)."
        }
      ],
      tips: [
        "1'den 25'e kadar olan tam kare sayıları adınız gibi ezberleyin: $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 625$.",
        "Alanı verilen karenin bir kenar uzunluğu daima alanın kareköküdür ($A = 48 \\text{ cm}^2 \\implies a = \\sqrt{48} = 4\\sqrt{3} \\text{ cm}$)."
      ]
    },
    {
      id: "veri-analizi",
      title: "Veri Analizi",
      icon: "ph-chart-pie-slice",
      badgeColor: "from-cyan-500 to-blue-500",
      grade: "8",
      summary: "Daire grafiği ($360^\\circ$ oranlama), sütun grafiği ve çizgi grafiği arası dönüşümler.",
      formulas: [
        {
          title: "Daire Grafiği Orantı Formülü",
          math: "\\text{Merkez Açı} = \\frac{\\text{Kategori Miktarı}}{\\text{Toplam Miktar}} \\times 360^\\circ",
          desc: "Tüm verilerin toplamı dairenin tamamına yani $360^\\circ$'ye karşılık gelir."
        },
        {
          title: "Grafik Seçim Kriterleri",
          math: "\\text{Daire} \\rightarrow \\text{Oran/Bütün}, \\quad \\text{Çizgi} \\rightarrow \\text{Zamana Bağlı Değişim}, \\quad \\text{Sütun} \\rightarrow \\text{Karşılaştırma}",
          desc: "Soru metninde zamana bağlı artış/azalış varsa çizgi; kategorik karşılaştırma varsa sütun; bir bütünün parçaları soruluyorsa daire grafiği seçilir."
        }
      ],
      traps: [
        {
          title: "⚠️ Toplam Veriyi $360^\\circ$ Yerine $100$ Almak",
          text: "Daire grafiğinde toplam açı $100$ değil, daima $360^\\circ$'dir. Yüzde soruluyorsa $\%100 \\leftrightarrow 360^\\circ$ çapraz orantısı kurulmalıdır."
        },
        {
          title: "⚠️ Eksen Başlangıç Değerlerine Dikkat",
          text: "Çizgi veya sütun grafiklerinde dikey eksen sıfırdan başlamıyorsa görsel bir yanılsama oluşabilir; mutlaka sayısal değerleri okuyun."
        }
      ],
      tips: [
        "Açıları sadeleştirin! Örneğin $90^\\circ = \\frac{1}{4}$ (çeyrek), $120^\\circ = \\frac{1}{3}$, $180^\\circ = \\frac{1}{2}$ (yarım), $60^\\circ = \\frac{1}{6}$'dır."
      ]
    },
    {
      id: "olasilik",
      title: "Basit Olayların Olma Olasılığı",
      icon: "ph-dice-five",
      badgeColor: "from-emerald-500 to-teal-500",
      grade: "8",
      summary: "Olası durumlar, eş olasılık, kesin olay ($1$), imkansız olay ($0$) ve olay olasılığı.",
      formulas: [
        {
          title: "Bir Olayın Olma Olasılığı",
          math: "P(A) = \\frac{\\text{İstenen Olası Durumların Sayısı}}{\\text{Tüm Olası Durumların Sayısı}}",
          desc: "Bir olayın olma olasılığı 0 ile 1 arasındadır ($0 \\le P(A) \\le 1$)."
        },
        {
          title: "Olma ve Olmama Olasılığı Toplamı",
          math: "P(\\text{Olay}) + P(\\text{Olay Değil}) = 1 \\implies P(\\text{Olay Değil}) = 1 - P(\\text{Olay})",
          desc: "Bir olayın gerçekleşme olasılığı ile gerçekleşmeme olasılığının toplamı daima 1'dir."
        }
      ],
      traps: [
        {
          title: "⚠️ 1'den Büyük veya Negatif Olasılık Olamaz",
          text: "Bir olasılık değeri hiçbir zaman negatif veya $1$'den (yani $\%100$'den) büyük çıkamaz. Bulduğunuz kesir daima basit kesir olmalıdır."
        },
        {
          title: "⚠️ 'Geri Bırakılmaksızın' İfadesi",
          text: "Torbadan bir top çekilip geri atılmıyorsa toplam durum sayısı 1 azalır! Bu kelimeyi soruda mutlaka yuvarlak içine alın."
        }
      ],
      tips: [
        "Tüm olası durumların sayısını en başta doğru saymak sorunun %50'sini çözmektir."
      ]
    },
    {
      id: "cebirsel-ifadeler",
      title: "Cebirsel İfadeler ve Özdeşlikler",
      icon: "ph-brackets-curly",
      badgeColor: "from-fuchsia-500 to-pink-500",
      grade: "8",
      summary: "Terim, katsayı, sabit terim, ortak çarpan parantezi, tam kare ve iki kare farkı özdeşlikleri.",
      formulas: [
        {
          title: "İki Terimin Toplamının Karesi",
          math: "(a + b)^2 = a^2 + 2ab + b^2",
          desc: "Birincinin karesi + Birinci ile ikincinin çarpımının 2 katı + İkincinin karesi."
        },
        {
          title: "İki Terimin Farkının Karesi",
          math: "(a - b)^2 = a^2 - 2ab + b^2",
          desc: "Birincinin karesi - Birinci ile ikincinin çarpımının 2 katı + İkincinin karesi."
        },
        {
          title: "İki Kare Farkı Özdeşliği",
          math: "a^2 - b^2 = (a - b)(a + b)",
          desc: "Kareleri farkı, tabanların farkı ile toplamının çarpımına eşittir."
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
        },
        {
          title: "⚠️ Denklem ile Özdeşlik Farkı",
          text: "Özdeşlik, bilinmeyenin HER değeri için daima doğrudur ($2(x+3)=2x+6$). Denklem ise sadece belirli $x$ değerleri için sağlanır ($2x+3=7 \\implies x=2$)."
        }
      ],
      tips: [
        "Geometrik alan modellemelerinde büyük karenin alanından küçük parçaların alanını çıkararak iki kare farkını somutlaştırın."
      ]
    },
    {
      id: "dogrusal-denklemler",
      title: "Doğrusal Denklemler ve Eğim",
      icon: "ph-trend-up",
      badgeColor: "from-blue-600 to-indigo-600",
      grade: "8",
      summary: "Birinci dereceden bir bilinmeyenli denklemler, koordinat sistemi, doğru grafikleri ve eğim ($m$).",
      formulas: [
        {
          title: "Eğim Formülü",
          math: "m = \\frac{\\text{Dikey Uzunluk}}{\\text{Yatay Uzunluk}} = \\frac{\\Delta y}{\\Delta x}",
          desc: "Sağa yatık doğruların eğimi pozitif ($m > 0$), sola yatık doğruların eğimi negatiftir ($m < 0$)."
        },
        {
          title: "Doğru Denkleminden Eğim Bulma",
          math: "y = mx + n \\implies \\text{Eğim} = m, \\quad ax + by + c = 0 \\implies m = -\\frac{a}{b}",
          desc: "$y$ yalnız bırakıldığında $x$'in katsayısı doğrunun eğimini verir."
        },
        {
          title: "Eksenleri Kestiği Noktalar",
          math: "x = 0 \\implies y\\text{-eksenini kestiği nokta}, \\quad y = 0 \\implies x\\text{-eksenini kestiği nokta}",
          desc: "Grafik çizerken $x$'e 0 verip $y$'yi, $y$'ye 0 verip $x$'i bulun."
        }
      ],
      traps: [
        {
          title: "⚠️ Eğimde Uzunluk Negatif Olmaz Ama Doğrunun Eğimi Negatif Olabilir",
          text: "Üçgende dikey ve yatay uzunluklar daima pozitiftir. Ancak koordinat düzleminde doğru sola yatıksa önüne eksi işareti ($-$) konur!"
        },
        {
          title: "⚠️ Yatay ve Dikey Doğruların Eğimi",
          text: "Yatay doğru ($y = b$) eğimi $= 0$'dır. Dikey doğru ($x = a$) eğimi ise **tanımsızdır** (payda 0 olur)."
        }
      ],
      tips: [
        "Orijinden geçen doğruların denklemlerinde sabit terim yoktur ($y = mx$ formundadır ve $(0,0)$'dan geçer)."
      ]
    },
    {
      id: "esitsizlikler",
      title: "Eşitsizlikler",
      icon: "ph-arrows-left-right",
      badgeColor: "from-rose-500 to-red-600",
      grade: "8",
      summary: "Birinci dereceden bir bilinmeyenli eşitsizlikler, sayı doğrusunda gösterim ve yön değiştirme kuralı.",
      formulas: [
        {
          title: "Eşitsizlikte Yön Değiştirme Kuralı (Kritik!)",
          math: "-2x < 6 \\implies x > \\frac{6}{-2} \\implies x > -3",
          desc: "Eşitsizliğin her iki tarafı negatif bir sayı ile çarpılır veya bölünürse eşitsizlik sembolü YÖN DEĞİŞTİRİR ($< \\leftrightarrow >$)."
        },
        {
          title: "Sayı Doğrusunda Gösterim",
          math: "x \\ge a \\rightarrow \\text{İçi Dolu Nokta (\\textbullet)}, \\quad x > a \\rightarrow \\text{İçi Boş Nokta (\\textopenbullet)}",
          desc: "Eşitlik ($\le, \\ge$) varsa sınır noktası dahil edilir ve içi taranır."
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
      ]
    },
    {
      id: "ucgenler",
      title: "Üçgenler & Pisagor Teoremi",
      icon: "ph-triangle",
      badgeColor: "from-amber-600 to-yellow-500",
      grade: "8",
      summary: "Üçgen eşitsizliği, açı-kenar bağıntıları, kenarortay, açıortay, yükseklik ve Pisagor bağıntısı.",
      formulas: [
        {
          title: "Üçgen Eşitsizliği Kuralı",
          math: "|b - c| < a < b + c",
          desc: "Bir üçgende herhangi bir kenar uzunluğu, diğer iki kenarın farkının mutlak değerinden büyük, toplamından küçük olmalıdır."
        },
        {
          title: "Pisagor Bağıntısı",
          math: "a^2 + b^2 = c^2 \\quad (c: \\text{Hipotenüs})",
          desc: "Dik açının karşısındaki hipotenüsün karesi, dik kenarların kareleri toplamına eşittir."
        },
        {
          title: "Özel Dik Üçgenler (Soru Çözdüren Kalıplar)",
          math: "(3-4-5), \\quad (5-12-13), \\quad (8-15-17), \\quad (7-24-25) \\; \\text{ve katları}",
          desc: "Örn: $(6-8-10)$, $(9-12-15)$, $(10-24-26)$ üçgenlerini ezbere bilmek zaman kazandırır."
        }
      ],
      traps: [
        {
          title: "⚠️ Büyük Açının Karşısında Büyük Kenar Vardır",
          text: "Bir üçgende en büyük açının karşısındaki kenar daima en uzundur. Ancak farklı üçgenlerdeki kenarlar kıyaslanırken ortak kenarlar köprü olarak kullanılmalıdır."
        },
        {
          title: "⚠️ Pisagor Sadece Dik Üçgende Geçerlidir",
          text: "Açısı $90^\\circ$ olmayan üçgenlerde $a^2+b^2=c^2$ bağıntısı KULLANILAMAZ!"
        }
      ],
      tips: [
        "Açıortay açıyı ikiye böler ($n$), Kenarortay kenarı ikiye böler ($V$), Yükseklik dik iner ($h$)."
      ]
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
