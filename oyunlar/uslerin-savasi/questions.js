/**
 * DİJİTAL MATEMATİK YARIŞMASI: ÜSLERİN SAVAŞI
 * MEB 8. Sınıf Matematik - Üslü İfadeler Kapsamlı Soru Bankası
 * Tüm sorular ve çözümler matematiksel açıdan doğrulanmıştır.
 */

var QUESTION_BANK = {
  // ==========================================
  // SEVİYE 1: MATEMATİK ISINMASI (10 Puan)
  // Konular: Pozitif/negatif tam sayı kuvvetleri, taban işareti, sıfırıncı kuvvet, değer hesaplama
  // ==========================================
  level1: {
    name: "Seviye 1: Matematik Isınması",
    points: 10,
    timeLimit: 30,
    minPassRatio: 0.7,
    kazanim: "Tam sayıların pozitif, negatif ve sıfırıncı kuvvetlerini hesaplar; taban ve üs işaret ilişkisini kavrar.",
    
    // PEMBE TAKIM (Kızlar) - Ana Sorular
    pink: [
      {
        id: "l1_p_q1",
        type: "multiple_choice",
        title: "Soru 1: Negatif Taban ve Çift Kuvvet",
        text: "(-4)<sup>2</sup> ifadesinin değeri kaçtır?",
        options: [
          { key: "A", text: "-16" },
          { key: "B", text: "16" },
          { key: "C", text: "-8" },
          { key: "D", text: "8" }
        ],
        correct: "B",
        hint: "Parantez içindeki negatif bir sayının çift kuvveti her zaman POZİTİF bir sonuç verir: (-4) · (-4) = ?",
        feedbackCorrect: "Harika! Parantezli negatif tabanın çift kuvveti pozitiftir: (-4)<sup>2</sup> = (-4) · (-4) = +16.",
        feedbackWrong: "Henüz olmadı! Paranteze dikkat et: Çift kuvvet (2), parantezin dışındadır. Dolayısıyla eksi işaretini de kapsar: (-4) · (-4) kaç eder? Tekrar dene!"
      },
      {
        id: "l1_p_q2",
        type: "true_false",
        title: "Soru 2: Parantez ve İşaret Karşılaştırması",
        text: "-3<sup>4</sup> ifadesinin değeri ile (-3)<sup>4</sup> ifadesinin değeri birbirine eşittir.",
        options: [
          { key: "D", text: "DOĞRU" },
          { key: "Y", text: "YANLIŞ" }
        ],
        correct: "Y",
        hint: "Parantez yoksa üs sadece önündeki sayıya aittir, eksiye etki etmez: -3<sup>4</sup> = -(3<sup>4</sup>)'tür.",
        feedbackCorrect: "Tebrikler! -3<sup>4</sup> = -81 iken (-3)<sup>4</sup> = +81'dir. -81 ≠ 81 olduğundan ifadeler birbirine eşit değildir!",
        feedbackWrong: "Dikkat! -3<sup>4</sup> ifadesinde 4 kuvveti eksi işaretini kapsamaz, -81 olur. (-3)<sup>4</sup> ifadesinde ise 4 parantezin dışındadır ve sonuç +81 olur. İfadeler eşit midir?"
      },
      {
        id: "l1_p_q3",
        type: "fill_blank",
        title: "Soru 3: Sıfırıncı Kuvvet ve Toplama",
        text: "(-8)<sup>0</sup> + (-1)<sup>15</sup> + 4<sup>3</sup> işleminin sonucu kaçtır?",
        correct: "64",
        acceptableAnswers: ["64", "+64"],
        hint: "Sıfırdan farklı her sayının sıfırıncı kuvveti 1'dir. (-1)'in tek kuvvetleri ise -1'e eşittir.",
        feedbackCorrect: "Süper çözüm! (-8)<sup>0</sup> = 1, (-1)<sup>15</sup> = -1 ve 4<sup>3</sup> = 64'tür. 1 + (-1) + 64 = 64.",
        feedbackWrong: "İşlem adımlarını hatırla: a<sup>0</sup> = 1 (a ≠ 0). (-8)<sup>0</sup> = 1 ve (-1)'in 15. kuvveti -1 eder. 1 + (-1) = 0 olduğuna göre geriye 4<sup>3</sup> kalır!"
      },
      {
        id: "l1_p_q4",
        type: "find_error",
        title: "Soru 4: Hatalı Adımı Bul",
        text: "Zeynep'in (-2)<sup>3</sup> + (-3)<sup>2</sup> - (-1)<sup>100</sup> işlemini çözerken yaptığı adımlar verilmiştir:",
        steps: [
          { stepNum: 1, text: "1. Adım: (-2)<sup>3</sup> = -8" },
          { stepNum: 2, text: "2. Adım: (-3)<sup>2</sup> = -9" },
          { stepNum: 3, text: "3. Adım: (-1)<sup>100</sup> = +1" },
          { stepNum: 4, text: "4. Adım: -8 + (-9) - 1 = -18" }
        ],
        options: [
          { key: "1", text: "1. Adım" },
          { key: "2", text: "2. Adım" },
          { key: "3", text: "3. Adım" },
          { key: "4", text: "4. Adım" }
        ],
        correct: "2",
        hint: "2. Adımdaki (-3)<sup>2</sup> işlemine bak: Negatif bir sayının karesi (çift kuvveti) negatif olabilir mi?",
        feedbackCorrect: "Mükemmel tespit! 2. Adımda hata yapılmıştır: (-3)<sup>2</sup> = (-3) · (-3) = +9 olmalıdır, -9 değil!",
        feedbackWrong: "Tekrar incele! 2. Adımda (-3)<sup>2</sup> ifadesi hesaplanırken parantezli negatif tabanın çift kuvveti kuralı unutulmuş olabilir mi?"
      },
      {
        id: "l1_p_q5",
        type: "matching",
        title: "Soru 5: İfadeleri Değerleriyle Eşleştir",
        text: "Sol sütundaki üslü ifadeleri sağ sütundaki doğru değerleriyle eşleştiriniz:",
        pairs: [
          { left: "3<sup>3</sup>", right: "27" },
          { left: "(-2)<sup>5</sup>", right: "-32" },
          { left: "-7<sup>2</sup>", right: "-49" },
          { left: "(-10)<sup>0</sup>", right: "1" }
        ],
        hint: "3<sup>3</sup> = 27, (-2)<sup>5</sup> tek kuvvet olduğu için negatiftir, -7<sup>2</sup> parantezsizdir!",
        feedbackCorrect: "Kusursuz eşleştirme! 3<sup>3</sup> = 27, (-2)<sup>5</sup> = -32, -7<sup>2</sup> = -49 ve (-10)<sup>0</sup> = 1.",
        feedbackWrong: "Eşleştirmeleri gözden geçir: Parantezsiz -7<sup>2</sup> = -(49) = -49 olur. Negatif sayının tek kuvveti ise negatiftir."
      }
    ],

    // MAVİ TAKIM (Erkekler) - Ana Sorular (Eşit Zorlukta)
    blue: [
      {
        id: "l1_b_q1",
        type: "multiple_choice",
        title: "Soru 1: Negatif Taban ve Çift Kuvvet",
        text: "(-5)<sup>2</sup> ifadesinin değeri kaçtır?",
        options: [
          { key: "A", text: "-25" },
          { key: "B", text: "25" },
          { key: "C", text: "-10" },
          { key: "D", text: "10" }
        ],
        correct: "B",
        hint: "Parantez içindeki negatif bir sayının çift kuvveti daima POZİTİF olur: (-5) · (-5) = ?",
        feedbackCorrect: "Harika! Parantezli negatif tabanın çift kuvveti pozitiftir: (-5)<sup>2</sup> = (-5) · (-5) = +25.",
        feedbackWrong: "Henüz olmadı! Çift kuvvet (2) parantezin dışındadır. Eksi ile eksinin çarpımı artıdır: (-5) · (-5) kaçtır? Tekrar düşün!"
      },
      {
        id: "l1_b_q2",
        type: "true_false",
        title: "Soru 2: Parantez ve İşaret Karşılaştırması",
        text: "-2<sup>6</sup> ifadesinin değeri ile (-2)<sup>6</sup> ifadesinin değeri birbirine eşittir.",
        options: [
          { key: "D", text: "DOĞRU" },
          { key: "Y", text: "YANLIŞ" }
        ],
        correct: "Y",
        hint: "Parantez yoksa üs sadece 2 tabanına aittir: -2<sup>6</sup> = -(2<sup>6</sup>) = -64'tür. (-2)<sup>6</sup> ise +64'tür.",
        feedbackCorrect: "Tebrikler! -2<sup>6</sup> = -64 iken (-2)<sup>6</sup> = +64'tür. Biri negatif, diğeri pozitiftir; eşit değillerdir!",
        feedbackWrong: "Dikkat! -2<sup>6</sup> ifadesinde eksi işaretinin üzerinde üs yoktur, sonuç -64'tür. (-2)<sup>6</sup> ifadesinde ise taban komple (-2)'dir ve sonuç +64 olur."
      },
      {
        id: "l1_b_q3",
        type: "fill_blank",
        title: "Soru 3: Sıfırıncı Kuvvet ve Toplama",
        text: "(-6)<sup>0</sup> + (-1)<sup>23</sup> + 5<sup>3</sup> işleminin sonucu kaçtır?",
        correct: "125",
        acceptableAnswers: ["125", "+125"],
        hint: "(-6)<sup>0</sup> = 1 ve (-1)'in tek kuvvetleri -1'dir. Geriye hangi üslü ifade kalır?",
        feedbackCorrect: "Tebrikler! (-6)<sup>0</sup> = 1, (-1)<sup>23</sup> = -1 ve 5<sup>3</sup> = 125'tir. 1 + (-1) + 125 = 125.",
        feedbackWrong: "İşlem önceliğine dikkat et: (-6)<sup>0</sup> = 1'dir. (-1)<sup>23</sup> = -1'dir. 1 + (-1) = 0 eder. 5<sup>3</sup> kaç yapar?"
      },
      {
        id: "l1_b_q4",
        type: "find_error",
        title: "Soru 4: Hatalı Adımı Bul",
        text: "Mert'in (-4)<sup>2</sup> - (-2)<sup>3</sup> + (-5)<sup>0</sup> işlemini çözerken yaptığı adımlar verilmiştir:",
        steps: [
          { stepNum: 1, text: "1. Adım: (-4)<sup>2</sup> = +16" },
          { stepNum: 2, text: "2. Adım: (-2)<sup>3</sup> = +8" },
          { stepNum: 3, text: "3. Adım: (-5)<sup>0</sup> = +1" },
          { stepNum: 4, text: "4. Adım: 16 - 8 + 1 = 9" }
        ],
        options: [
          { key: "1", text: "1. Adım" },
          { key: "2", text: "2. Adım" },
          { key: "3", text: "3. Adım" },
          { key: "4", text: "4. Adım" }
        ],
        correct: "2",
        hint: "2. Adımdaki (-2)<sup>3</sup> işlemine dikkat et: Negatif sayının TEK kuvveti pozitif mi yoksa negatif midir?",
        feedbackCorrect: "Bravo! 2. Adımda hata yapılmıştır: (-2)<sup>3</sup> = (-2) · (-2) · (-2) = -8 olmalıdır, +8 değil!",
        feedbackWrong: "Tekrar bak! Negatif bir tabanın TEK kuvveti daima negatiftir. 2. Adımda işaret doğru yazılmış mı?"
      },
      {
        id: "l1_b_q5",
        type: "matching",
        title: "Soru 5: İfadeleri Değerleriyle Eşleştir",
        text: "Sol sütundaki üslü ifadeleri sağ sütundaki doğru değerleriyle eşleştiriniz:",
        pairs: [
          { left: "2<sup>5</sup>", right: "32" },
          { left: "(-3)<sup>3</sup>", right: "-27" },
          { left: "-6<sup>2</sup>", right: "-36" },
          { left: "(-9)<sup>0</sup>", right: "1" }
        ],
        hint: "2<sup>5</sup> = 32, (-3)<sup>3</sup> tek kuvvet olduğu için negatif, -6<sup>2</sup> parantezsizdir!",
        feedbackCorrect: "Tebrikler! 2<sup>5</sup> = 32, (-3)<sup>3</sup> = -27, -6<sup>2</sup> = -36 ve (-9)<sup>0</sup> = 1.",
        feedbackWrong: "İşaretlere dikkat et: -6<sup>2</sup> = -(6<sup>2</sup>) = -36 olur. (-3)<sup>3</sup> = -27'dir."
      }
    ],

    // Telafi / Yeniden Deneme Havuzu (Level 1)
    retry: [
      {
        id: "l1_retry_1",
        type: "multiple_choice",
        title: "Telafi Sorusu 1: Kuvvet ve İşaret",
        text: "-2<sup>4</sup> + (-2)<sup>4</sup> işleminin sonucu kaçtır?",
        options: [
          { key: "A", text: "0" },
          { key: "B", text: "32" },
          { key: "C", text: "-32" },
          { key: "D", text: "16" }
        ],
        correct: "A",
        hint: "-2<sup>4</sup> = -16 ve (-2)<sup>4</sup> = +16'dır.",
        feedbackCorrect: "Doğru! -16 + 16 = 0.",
        feedbackWrong: "Biri parantezsiz (-16), diğeri parantezli (+16)'dır. -16 + (+16) kaçtır?"
      },
      {
        id: "l1_retry_2",
        type: "fill_blank",
        title: "Telafi Sorusu 2: Değer Hesaplama",
        text: "(-1)<sup>50</sup> + (-1)<sup>51</sup> + 2<sup>4</sup> işleminin sonucu kaçtır?",
        correct: "16",
        acceptableAnswers: ["16", "+16"],
        hint: "1 + (-1) = 0 eder. 2<sup>4</sup> değerini hesapla.",
        feedbackCorrect: "Tebrikler! 1 - 1 + 16 = 16.",
        feedbackWrong: "Çift kuvvet 1, tek kuvvet -1 yapar: 1 + (-1) = 0 olur. 2<sup>4</sup> = 16'dır."
      },
      {
        id: "l1_retry_3",
        type: "multiple_choice",
        title: "Telafi Sorusu 3: -1'in Kuvvetleri",
        text: "(-1)<sup>8</sup> + (-1)<sup>9</sup> işleminin sonucu kaçtır?",
        options: [
          { key: "A", text: "0" },
          { key: "B", text: "2" },
          { key: "C", text: "-2" },
          { key: "D", text: "1" }
        ],
        correct: "A",
        hint: "(-1)'in çift kuvveti +1, tek kuvveti -1'dir: (+1) + (-1) = ?",
        feedbackCorrect: "Harika! (+1) + (-1) = 0.",
        feedbackWrong: "8 çift olduğundan (-1)<sup>8</sup> = 1, 9 tek olduğundan (-1)<sup>9</sup> = -1'dir. 1 + (-1) = 0 eder."
      }
    ]
  },

  // ==========================================
  // SEVİYE 2: ÜS USTALARI (20 Puan)
  // Konular: Aynı tabanlı çarpmada üslerin toplanması, bölmede çıkarılması, üssün üssü, çarpımın üssü, negatif üs
  // ==========================================
  level2: {
    name: "Seviye 2: Üs Ustaları",
    points: 20,
    timeLimit: 30,
    minPassRatio: 0.7,
    kazanim: "Üslü ifadelerde çarpma ve bölme kurallarını uygular; üssün üssünü alır ve negatif kuvveti kavrar.",

    // PEMBE TAKIM (Kızlar)
    pink: [
      {
        id: "l2_p_q1",
        type: "multiple_choice",
        title: "Soru 1: Çarpma İşlemi ve Negatif Üs",
        text: "3<sup>7</sup> · 3<sup>-2</sup> · 3<sup>4</sup> işleminin sonucu üslü ifade olarak aşağıdakilerden hangisidir?",
        options: [
          { key: "A", text: "3<sup>9</sup>" },
          { key: "B", text: "3<sup>13</sup>" },
          { key: "C", text: "9<sup>9</sup>" },
          { key: "D", text: "3<sup>-56</sup>" }
        ],
        correct: "A",
        hint: "Tabanlar aynı olduğunda çarpma işleminde üsler toplanır: 7 + (-2) + 4 = ?",
        feedbackCorrect: "Harika! Tabanlar aynı olduğunda üsler toplanır: 3<sup>7 + (-2) + 4</sup> = 3<sup>9</sup>.",
        feedbackWrong: "Henüz olmadı! Taban aynı kalır, üsler cebirsel olarak toplanır: 7 + (-2) = 5 ve 5 + 4 = 9'dur. Taban asla çarpılmaz!"
      },
      {
        id: "l2_p_q2",
        type: "multiple_choice",
        title: "Soru 2: Bölme İşlemi ve Eksi İşareti",
        text: "2<sup>5</sup> / 2<sup>-4</sup> işleminin sonucu aşağıdakilerden hangisidir?",
        options: [
          { key: "A", text: "2<sup>1</sup>" },
          { key: "B", text: "2<sup>9</sup>" },
          { key: "C", text: "2<sup>-1</sup>" },
          { key: "D", text: "2<sup>-20</sup>" }
        ],
        correct: "B",
        hint: "Bölme işleminde payın üssünden paydanın üssü çıkarılır: 5 - (-4) = ?",
        feedbackCorrect: "Muhteşem! Bölmede üsler çıkarılır: 2<sup>5 - (-4)</sup> = 2<sup>5 + 4</sup> = 2<sup>9</sup>.",
        feedbackWrong: "İşaret kuralına dikkat! 5 - (-4) işleminde iki eksi yan yana gelince artıya dönüşür: 5 + 4 = 9 olur!"
      },
      {
        id: "l2_p_q3",
        type: "fill_blank",
        title: "Soru 3: Negatif Kuvvet ve Ondalık Değer",
        text: "2<sup>-3</sup> + 4<sup>-1</sup> işleminin ondalık gösterim karşılığı kaçtır? (Virgül kullanarak yazınız)",
        correct: "0,375",
        acceptableAnswers: ["0,375", "0.375", "3/8"],
        hint: "2<sup>-3</sup> = 1/8 = 0,125 ve 4<sup>-1</sup> = 1/4 = 0,250'dir.",
        feedbackCorrect: "Mükemmel matematiksel düşünme! 2<sup>-3</sup> = 1/8 ve 4<sup>-1</sup> = 1/4 = 2/8'dir. Toplam = 3/8 = 0,375.",
        feedbackWrong: "Negatif üs çarpmaya göre tersi aldırır: 2<sup>-3</sup> = 1/8 ve 4<sup>-1</sup> = 1/4 = 2/8'dir. 1/8 + 2/8 = 3/8. 3'ü 8'e bölersen kaç çıkar?"
      },
      {
        id: "l2_p_q4",
        type: "multiple_choice",
        title: "Soru 4: Üssün Üssü ve Taban Dönüşümü",
        text: "(16<sup>3</sup>)<sup>2</sup> ifadesi 2 tabanında yazıldığında 2<sup>x</sup> olduğuna göre x kaçtır?",
        options: [
          { key: "A", text: "12" },
          { key: "B", text: "24" },
          { key: "C", text: "18" },
          { key: "D", text: "36" }
        ],
        correct: "B",
        hint: "16 = 2<sup>4</sup>'tür. İfade: ((2<sup>4</sup>)<sup>3</sup>)<sup>2</sup> olur. Üsler çarpılır: 4 · 3 · 2 = ?",
        feedbackCorrect: "Tebrikler! 16 = 2<sup>4</sup> olduğundan ((2<sup>4</sup>)<sup>3</sup>)<sup>2</sup> = 2<sup>4 · 3 · 2</sup> = 2<sup>24</sup> olur. x = 24'tür.",
        feedbackWrong: "Önce 16'yı 2 tabanında yaz: 16 = 2<sup>4</sup>. Sonra üssün üssü kuralı gereğince tüm üsleri çarp: 4 · 3 · 2 kaçtır?"
      },
      {
        id: "l2_p_q5",
        type: "matching",
        title: "Soru 5: Üs Kurallarını Eşleştir",
        text: "Soldaki işlemleri sağdaki denk üslü sonuçlarıyla eşleştiriniz:",
        pairs: [
          { left: "(2<sup>3</sup>)<sup>4</sup>", right: "2<sup>12</sup>" },
          { left: "2<sup>3</sup> · 2<sup>4</sup>", right: "2<sup>7</sup>" },
          { left: "2<sup>8</sup> / 2<sup>2</sup>", right: "2<sup>6</sup>" },
          { left: "2<sup>4</sup> · 5<sup>4</sup>", right: "10<sup>4</sup>" }
        ],
        hint: "Çarpmada üsler toplanır, bölmede çıkarılır, üssün üssünde çarpılır, üsler aynıysa tabanlar çarpılır!",
        feedbackCorrect: "Harika! Tüm kuralları kusursuz uyguladınız: Çarpma, bölme, üssün üssü ve ortak üs kuralı!",
        feedbackWrong: "Kuralları tekrar hatırla: Üsler aynıysa tabanlar çarpılır (2<sup>4</sup> · 5<sup>4</sup> = 10<sup>4</sup>). Tabanlar aynıysa üsler toplanır."
      }
    ],

    // MAVİ TAKIM (Erkekler)
    blue: [
      {
        id: "l2_b_q1",
        type: "multiple_choice",
        title: "Soru 1: Çarpma İşlemi ve Negatif Üs",
        text: "5<sup>6</sup> · 5<sup>-3</sup> · 5<sup>5</sup> işleminin sonucu üslü ifade olarak aşağıdakilerden hangisidir?",
        options: [
          { key: "A", text: "5<sup>8</sup>" },
          { key: "B", text: "5<sup>14</sup>" },
          { key: "C", text: "25<sup>8</sup>" },
          { key: "D", text: "5<sup>-90</sup>" }
        ],
        correct: "A",
        hint: "Tabanlar aynı olduğunda çarpma işleminde üsler toplanır: 6 + (-3) + 5 = ?",
        feedbackCorrect: "Harika! Tabanlar aynı olduğunda üsler toplanır: 5<sup>6 + (-3) + 5</sup> = 5<sup>8</sup>.",
        feedbackWrong: "Henüz olmadı! Taban aynı kalır, üsler toplanır: 6 + (-3) = 3 ve 3 + 5 = 8'dir. 5<sup>8</sup> olmalıdır."
      },
      {
        id: "l2_b_q2",
        type: "multiple_choice",
        title: "Soru 2: Bölme İşlemi ve Eksi İşareti",
        text: "3<sup>4</sup> / 3<sup>-5</sup> işleminin sonucu aşağıdakilerden hangisidir?",
        options: [
          { key: "A", text: "3<sup>-1</sup>" },
          { key: "B", text: "3<sup>9</sup>" },
          { key: "C", text: "3<sup>1</sup>" },
          { key: "D", text: "3<sup>-20</sup>" }
        ],
        correct: "B",
        hint: "Bölme kuralı: Payın üssünden paydanın üssü çıkarılır: 4 - (-5) = ?",
        feedbackCorrect: "Doğru cevap! 3<sup>4 - (-5)</sup> = 3<sup>4 + 5</sup> = 3<sup>9</sup>.",
        feedbackWrong: "İşaret kuralına dikkat: Pay üssü (4) eksi payda üssü (-5) = 4 - (-5) = 4 + 5 = 9!"
      },
      {
        id: "l2_b_q3",
        type: "fill_blank",
        title: "Soru 3: Negatif Kuvvet ve Ondalık Değer",
        text: "5<sup>-2</sup> + 2<sup>-2</sup> işleminin ondalık gösterim karşılığı kaçtır? (Virgül kullanarak yazınız)",
        correct: "0,29",
        acceptableAnswers: ["0,29", "0.29", "29/100"],
        hint: "5<sup>-2</sup> = 1/25 = 0,04 ve 2<sup>-2</sup> = 1/4 = 0,25'tir.",
        feedbackCorrect: "Tebrikler! 5<sup>-2</sup> = 1/25 = 0,04 ve 2<sup>-2</sup> = 1/4 = 0,25'tir. Toplam = 0,04 + 0,25 = 0,29.",
        feedbackWrong: "Negatif kuvvet pay ve paydayı yer değiştirir: 5<sup>-2</sup> = 1/25 (yüzde 4 = 0,04) ve 2<sup>-2</sup> = 1/4 (yüzde 25 = 0,25). Bu iki ondalığı topla!"
      },
      {
        id: "l2_b_q4",
        type: "multiple_choice",
        title: "Soru 4: Üssün Üssü ve Taban Dönüşümü",
        text: "(27<sup>2</sup>)<sup>3</sup> ifadesi 3 tabanında yazıldığında 3<sup>y</sup> olduğuna göre y kaçtır?",
        options: [
          { key: "A", text: "12" },
          { key: "B", text: "18" },
          { key: "C", text: "24" },
          { key: "D", text: "36" }
        ],
        correct: "B",
        hint: "27 = 3<sup>3</sup>'tür. İfade: ((3<sup>3</sup>)<sup>2</sup>)<sup>3</sup> olur. Üsler çarpılır: 3 · 2 · 3 = ?",
        feedbackCorrect: "Süper! 27 = 3<sup>3</sup> olduğundan ((3<sup>3</sup>)<sup>2</sup>)<sup>3</sup> = 3<sup>3 · 2 · 3</sup> = 3<sup>18</sup> olur. y = 18'dir.",
        feedbackWrong: "27 sayısını 3'ün kuvveti olarak yaz: 27 = 3<sup>3</sup>. Sonra üssün üssü kuralını uygula: 3 · 2 · 3 kaç eder?"
      },
      {
        id: "l2_b_q5",
        type: "matching",
        title: "Soru 5: Üs Kurallarını Eşleştir",
        text: "Soldaki işlemleri sağdaki denk üslü sonuçlarıyla eşleştiriniz:",
        pairs: [
          { left: "(3<sup>2</sup>)<sup>5</sup>", right: "3<sup>10</sup>" },
          { left: "3<sup>5</sup> · 3<sup>2</sup>", right: "3<sup>7</sup>" },
          { left: "3<sup>9</sup> / 3<sup>3</sup>", right: "3<sup>6</sup>" },
          { left: "3<sup>4</sup> · 2<sup>4</sup>", right: "6<sup>4</sup>" }
        ],
        hint: "Üssün üssünde çarp, çarpmada topla, bölmede çıkar, üsler eşitse tabanları çarp!",
        feedbackCorrect: "Bravo! Tüm kuralları başarıyla uyguladınız: 3<sup>10</sup>, 3<sup>7</sup>, 3<sup>6</sup> ve 6<sup>4</sup>.",
        feedbackWrong: "Kuralları hatırla: Tabanlar eşit olduğunda çarpma işleminde üsler toplanır, üssün üssünde ise üsler birbiriyle çarpılır."
      }
    ],

    // Telafi Havuzu
    retry: [
      {
        id: "l2_retry_1",
        type: "multiple_choice",
        title: "Telafi Sorusu 1: Bölme Kuralı",
        text: "4<sup>6</sup> / 4<sup>-2</sup> işleminin sonucu kaçtır?",
        options: [
          { key: "A", text: "4<sup>8</sup>" },
          { key: "B", text: "4<sup>4</sup>" },
          { key: "C", text: "4<sup>-3</sup>" },
          { key: "D", text: "1" }
        ],
        correct: "A",
        hint: "6 - (-2) = 6 + 2 = 8.",
        feedbackCorrect: "Tebrikler! 4<sup>6 - (-2)</sup> = 4<sup>8</sup>.",
        feedbackWrong: "Payın üssünden paydanın üssünü çıkar: 6 - (-2) = 8."
      },
      {
        id: "l2_retry_2",
        type: "fill_blank",
        title: "Telafi Sorusu 2: Çarpma ve Üs Toplama",
        text: "2<sup>4</sup> · 2<sup>-1</sup> · 2<sup>2</sup> = 2<sup>x</sup> olduğuna göre x kaçtır?",
        correct: "5",
        acceptableAnswers: ["5"],
        hint: "Tabanlar aynı: 4 + (-1) + 2 = ?",
        feedbackCorrect: "Harika! 4 + (-1) + 2 = 5.",
        feedbackWrong: "Üsleri topla: 4 - 1 + 2 = 5."
      },
      {
        id: "l2_retry_3",
        type: "multiple_choice",
        title: "Telafi Sorusu 3: Üssün Üssü",
        text: "(5<sup>3</sup>)<sup>2</sup> ifadesi aşağıdakilerden hangisine eşittir?",
        options: [
          { key: "A", text: "5<sup>5</sup>" },
          { key: "B", text: "5<sup>6</sup>" },
          { key: "C", text: "5<sup>9</sup>" },
          { key: "D", text: "25<sup>3</sup>" }
        ],
        correct: "B",
        hint: "Üssün üssünde üsler birbiriyle çarpılır: 3 · 2 = ?",
        feedbackCorrect: "Doğru! (5<sup>3</sup>)<sup>2</sup> = 5<sup>3 · 2</sup> = 5<sup>6</sup>.",
        feedbackWrong: "Üsler toplanmaz, çarpılır: 3 · 2 = 6."
      }
    ]
  },

  // ==========================================
  // SEVİYE 3: ZEKÂ KAPILARI (30 Puan)
  // Konular: Birden fazla kural, denk ifadeler, hatalı çözümü bulma, basamak sayısı ve akıl yürütme
  // ==========================================
  level3: {
    name: "Seviye 3: Zekâ Kapıları",
    points: 30,
    timeLimit: 60,
    minPassRatio: 0.7,
    kazanim: "Farklı tabanlı ifadeleri ortak tabana dönüştürerek çok adımlı işlemleri çözer; basamak sayısını hesaplar.",

    // PEMBE TAKIM
    pink: [
      {
        id: "l3_p_q1",
        type: "multiple_choice",
        title: "Soru 1: Çok Adımlı Taban Dönüşümü",
        text: "(8<sup>4</sup> · 4<sup>-2</sup>) / 2<sup>5</sup> işleminin sonucu üslü olarak aşağıdakilerden hangisidir?",
        options: [
          { key: "A", text: "2<sup>3</sup>" },
          { key: "B", text: "2<sup>5</sup>" },
          { key: "C", text: "2<sup>7</sup>" },
          { key: "D", text: "2<sup>9</sup>" }
        ],
        correct: "A",
        hint: "Bütün sayıları 2 tabanına çevir: 8 = 2<sup>3</sup>, 4 = 2<sup>2</sup>. Pay: 2<sup>12</sup> · 2<sup>-4</sup> = 2<sup>8</sup> olur.",
        feedbackCorrect: "Muhteşem analiz! 8<sup>4</sup> = 2<sup>12</sup>, 4<sup>-2</sup> = 2<sup>-4</sup>. Pay = 2<sup>8</sup>. 2<sup>8</sup> / 2<sup>5</sup> = 2<sup>3</sup>.",
        feedbackWrong: "Adım adım gidelim: 8<sup>4</sup> = (2<sup>3</sup>)<sup>4</sup> = 2<sup>12</sup>. 4<sup>-2</sup> = (2<sup>2</sup>)<sup>-2</sup> = 2<sup>-4</sup>. Paydaki çarpım: 2<sup>12+(-4)</sup> = 2<sup>8</sup>. Şimdi 2<sup>8</sup>'i 2<sup>5</sup>'e böl!"
      },
      {
        id: "l3_p_q2",
        type: "fill_blank",
        title: "Soru 2: Basamak Sayısı Bulma",
        text: "A = 2<sup>12</sup> · 5<sup>9</sup> sayısı kaç basamaklı bir doğal sayıdır?",
        correct: "10",
        acceptableAnswers: ["10"],
        hint: "10 tabanı oluşturmak için üsleri eşitle: 2<sup>12</sup>'yi 2<sup>3</sup> · 2<sup>9</sup> şeklinde ayır. 2<sup>3</sup> · (2 · 5)<sup>9</sup> = 8 · 10<sup>9</sup> olur.",
        feedbackCorrect: "Harika akıl yürütme! A = 2<sup>3</sup> · (2<sup>9</sup> · 5<sup>9</sup>) = 8 · 10<sup>9</sup>. 8 sayısının yanına 9 sıfır gelir, toplam 1 + 9 = 10 basamaklıdır.",
        feedbackWrong: "İpucu: 2<sup>12</sup> sayısını 2<sup>3</sup> · 2<sup>9</sup> olarak parçala. 2<sup>9</sup> · 5<sup>9</sup> = 10<sup>9</sup> eder. 2<sup>3</sup> = 8 olduğuna göre 8 · 10<sup>9</sup> sayısı kaç basamaklıdır?"
      },
      {
        id: "l3_p_q3",
        type: "find_error",
        title: "Soru 3: İşlem Adımlarındaki Hatayı Bul",
        text: "Zeynep (6<sup>5</sup> · 6<sup>-2</sup>) / (6<sup>2</sup>)<sup>3</sup> işlemini çözerken şu adımları uygulamıştır:",
        steps: [
          { stepNum: 1, text: "1. Adım: Paydaki işlem 6<sup>5 + (-2)</sup> = 6<sup>3</sup> olur." },
          { stepNum: 2, text: "2. Adım: Paydadaki işlem (6<sup>2</sup>)<sup>3</sup> = 6<sup>2 · 3</sup> = 6<sup>6</sup> olur." },
          { stepNum: 3, text: "3. Adım: Bölme işlemi için pay ve payda üsleri toplanır: 6<sup>3 + 6</sup> = 6<sup>9</sup>." },
          { stepNum: 4, text: "4. Adım: Sonuç 6<sup>9</sup> bulunur." }
        ],
        options: [
          { key: "1", text: "1. Adım" },
          { key: "2", text: "2. Adım" },
          { key: "3", text: "3. Adım" },
          { key: "4", text: "4. Adım" }
        ],
        correct: "3",
        hint: "3. Adıma dikkat et: Bölme işleminde üsler toplanır mı yoksa çıkarılır mı?",
        feedbackCorrect: "Tebrikler! 3. Adımda hata yapılmıştır: Tabanlar aynı iken bölme işleminde üsler çıkarılmalıdır: 6<sup>3 - 6</sup> = 6<sup>-3</sup> olmalıydı!",
        feedbackWrong: "İncele: Payda 6<sup>3</sup>, paydada 6<sup>6</sup> var. Bölme yaparken üsler toplanır mı, çıkarılır mı?"
      },
      {
        id: "l3_p_q4",
        type: "true_false",
        title: "Soru 4: Geometrik Alan ve Kat İlişkisi",
        text: "Bir kenar uzunluğu 2<sup>6</sup> cm olan bir karenin alanı, kenar uzunluğu 2<sup>3</sup> cm olan bir karenin alanının 8 katıdır.",
        options: [
          { key: "D", text: "DOĞRU" },
          { key: "Y", text: "YANLIŞ" }
        ],
        correct: "Y",
        hint: "Karenin alanı kenarın karesidir: 1. Alan = (2<sup>6</sup>)<sup>2</sup> = 2<sup>12</sup>. 2. Alan = (2<sup>3</sup>)<sup>2</sup> = 2<sup>6</sup>. Oran = 2<sup>12</sup> / 2<sup>6</sup> = ?",
        feedbackCorrect: "Harika mantık! 1. alan = 2<sup>12</sup>, 2. alan = 2<sup>6</sup>. 2<sup>12</sup> / 2<sup>6</sup> = 2<sup>6</sup> = 64 kattır! 8 kat değildir, dolayısıyla ifade YANLIŞTIR.",
        feedbackWrong: "Kenarları değil, alanları karşılaştırıyoruz: (2<sup>6</sup>)<sup>2</sup> = 2<sup>12</sup> ve (2<sup>3</sup>)<sup>2</sup> = 2<sup>6</sup>. 2<sup>12</sup>'yi 2<sup>6</sup>'ya bölersen 2<sup>6</sup> = 64 kat çıkar!"
      },
      {
        id: "l3_p_q5",
        type: "matching",
        title: "Soru 5: 2<sup>24</sup> İfadesine Denk Olanları Eşleştir",
        text: "Soldaki ifadeleri sağdaki 2 tabanındaki doğru karşılıklarıyla eşleştiriniz:",
        pairs: [
          { left: "(4<sup>6</sup>)<sup>2</sup>", right: "2<sup>24</sup>" },
          { left: "(8<sup>2</sup>)<sup>4</sup>", right: "2<sup>24</sup>" },
          { left: "16<sup>6</sup>", right: "2<sup>24</sup>" },
          { left: "2<sup>12</sup> · 2<sup>2</sup>", right: "2<sup>14</sup>" }
        ],
        hint: "4 = 2<sup>2</sup>, 8 = 2<sup>3</sup>, 16 = 2<sup>4</sup> yazarak üsleri çarp!",
        feedbackCorrect: "Bravo! (4<sup>6</sup>)<sup>2</sup> = 2<sup>24</sup>, (8<sup>2</sup>)<sup>4</sup> = 2<sup>24</sup>, 16<sup>6</sup> = 2<sup>24</sup> ve 2<sup>12</sup> · 2<sup>2</sup> = 2<sup>14</sup>.",
        feedbackWrong: "Tabanları 2'nin kuvveti olarak yaz: 16<sup>6</sup> = (2<sup>4</sup>)<sup>6</sup> = 2<sup>24</sup>. 8 = 2<sup>3</sup> olduğuna göre (2<sup>6</sup>)<sup>4</sup> = 2<sup>24</sup>."
      }
    ],

    // MAVİ TAKIM
    blue: [
      {
        id: "l3_b_q1",
        type: "multiple_choice",
        title: "Soru 1: Çok Adımlı Taban Dönüşümü",
        text: "(27<sup>3</sup> · 9<sup>-2</sup>) / 3<sup>3</sup> işleminin sonucu üslü olarak aşağıdakilerden hangisidir?",
        options: [
          { key: "A", text: "3<sup>1</sup>" },
          { key: "B", text: "3<sup>2</sup>" },
          { key: "C", text: "3<sup>4</sup>" },
          { key: "D", text: "3<sup>5</sup>" }
        ],
        correct: "B",
        hint: "Bütün sayıları 3 tabanına çevir: 27 = 3<sup>3</sup>, 9 = 3<sup>2</sup>. Pay: 3<sup>9</sup> · 3<sup>-4</sup> = 3<sup>5</sup> olur.",
        feedbackCorrect: "Muhteşem çözüm! 27<sup>3</sup> = 3<sup>9</sup>, 9<sup>-2</sup> = 3<sup>-4</sup>. Pay = 3<sup>5</sup>. 3<sup>5</sup> / 3<sup>3</sup> = 3<sup>2</sup>.",
        feedbackWrong: "Tabanları 3 yapalım: 27<sup>3</sup> = (3<sup>3</sup>)<sup>3</sup> = 3<sup>9</sup>. 9<sup>-2</sup> = (3<sup>2</sup>)<sup>-2</sup> = 3<sup>-4</sup>. Pay = 3<sup>9+(-4)</sup> = 3<sup>5</sup>. 3<sup>5</sup> / 3<sup>3</sup> = 3<sup>5-3</sup> = 3<sup>2</sup>!"
      },
      {
        id: "l3_b_q2",
        type: "fill_blank",
        title: "Soru 2: Basamak Sayısı Bulma",
        text: "B = 4<sup>5</sup> · 5<sup>8</sup> sayısı kaç basamaklı bir doğal sayıdır?",
        correct: "9",
        acceptableAnswers: ["9"],
        hint: "4<sup>5</sup> = (2<sup>2</sup>)<sup>5</sup> = 2<sup>10</sup>. 2<sup>10</sup> · 5<sup>8</sup> = 2<sup>2</sup> · (2 · 5)<sup>8</sup> = 4 · 10<sup>8</sup> olur.",
        feedbackCorrect: "Süper akıl yürütme! 4<sup>5</sup> = 2<sup>10</sup>. B = 2<sup>2</sup> · (2<sup>8</sup> · 5<sup>8</sup>) = 4 · 10<sup>8</sup>. 4'ün yanına 8 sıfır gelir, toplam 1 + 8 = 9 basamaklıdır.",
        feedbackWrong: "4<sup>5</sup>'i 2 tabanına çevir: 2<sup>10</sup>. Sonra 2<sup>10</sup>'u 2<sup>2</sup> · 2<sup>8</sup> olarak ayır. 2<sup>8</sup> · 5<sup>8</sup> = 10<sup>8</sup>. 4 · 10<sup>8</sup> kaç basamaklıdır?"
      },
      {
        id: "l3_b_q3",
        type: "find_error",
        title: "Soru 3: İşlem Adımlarındaki Hatayı Bul",
        text: "Can (10<sup>8</sup> · 10<sup>-3</sup>) / (10<sup>3</sup>)<sup>2</sup> işlemini çözerken şu adımları uygulamıştır:",
        steps: [
          { stepNum: 1, text: "1. Adım: Paydaki işlem 10<sup>8 + (-3)</sup> = 10<sup>5</sup> olur." },
          { stepNum: 2, text: "2. Adım: Paydadaki işlemde üsler toplanır: (10<sup>3</sup>)<sup>2</sup> = 10<sup>3 + 2</sup> = 10<sup>5</sup>." },
          { stepNum: 3, text: "3. Adım: 10<sup>5</sup> / 10<sup>5</sup> = 10<sup>5 - 5</sup> = 10<sup>0</sup> olur." },
          { stepNum: 4, text: "4. Adım: Sonuç 10<sup>0</sup> = 1 bulunur." }
        ],
        options: [
          { key: "1", text: "1. Adım" },
          { key: "2", text: "2. Adım" },
          { key: "3", text: "3. Adım" },
          { key: "4", text: "4. Adım" }
        ],
        correct: "2",
        hint: "2. Adıma dikkat et: Üssün üssü alınırken üsler toplanır mı, yoksa çarpılır mı?",
        feedbackCorrect: "Harika! 2. Adımda hata yapılmıştır: Üssün üssü kuralında üsler çarpılmalıdır: (10<sup>3</sup>)<sup>2</sup> = 10<sup>3 · 2</sup> = 10<sup>6</sup> olmalıdır!",
        feedbackWrong: "2. Adımı tekrar incele: (a<sup>m</sup>)<sup>n</sup> = a<sup>m · n</sup> kuralı uygulanmış mı? Can üsleri çarpmak yerine toplamış!"
      },
      {
        id: "l3_b_q4",
        type: "true_false",
        title: "Soru 4: Geometrik Alan ve Kat İlişkisi",
        text: "Bir kenar uzunluğu 3<sup>5</sup> cm olan bir karenin alanı, kenar uzunluğu 3<sup>3</sup> cm olan bir karenin alanının 9 katıdır.",
        options: [
          { key: "D", text: "DOĞRU" },
          { key: "Y", text: "YANLIŞ" }
        ],
        correct: "Y",
        hint: "1. Alan = (3<sup>5</sup>)<sup>2</sup> = 3<sup>10</sup>. 2. Alan = (3<sup>3</sup>)<sup>2</sup> = 3<sup>6</sup>. Oran = 3<sup>10</sup> / 3<sup>6</sup> = 3<sup>4</sup> = 81 kattır!",
        feedbackCorrect: "Doğru karar! Alanlar oranı 3<sup>10</sup> / 3<sup>6</sup> = 3<sup>4</sup> = 81 kattır. 9 kat değil 81 kat olduğu için ifade YANLIŞTIR!",
        feedbackWrong: "Kenarlar oranı 3<sup>5</sup> / 3<sup>3</sup> = 3<sup>2</sup> = 9'dur. Ancak alanlar kenarların karesiyle orantılıdır: 9<sup>2</sup> = 81 kat olmalıdır!"
      },
      {
        id: "l3_b_q5",
        type: "matching",
        title: "Soru 5: 3<sup>16</sup> İfadesine Denk Olanları Eşleştir",
        text: "Soldaki ifadeleri sağdaki 3 tabanındaki doğru karşılıklarıyla eşleştiriniz:",
        pairs: [
          { left: "(9<sup>4</sup>)<sup>2</sup>", right: "3<sup>16</sup>" },
          { left: "27<sup>4</sup> · 3<sup>4</sup>", right: "3<sup>16</sup>" },
          { left: "81<sup>4</sup>", right: "3<sup>16</sup>" },
          { left: "3<sup>10</sup> · 3<sup>2</sup>", right: "3<sup>12</sup>" }
        ],
        hint: "9 = 3<sup>2</sup>, 27 = 3<sup>3</sup>, 81 = 3<sup>4</sup> olarak üsleri çarp ve topla!",
        feedbackCorrect: "Bravo! (9<sup>4</sup>)<sup>2</sup> = 3<sup>16</sup>, 27<sup>4</sup> · 3<sup>4</sup> = 3<sup>12</sup> · 3<sup>4</sup> = 3<sup>16</sup>, 81<sup>4</sup> = 3<sup>16</sup>.",
        feedbackWrong: "Tabanları 3'e dönüştür: 81<sup>4</sup> = (3<sup>4</sup>)<sup>4</sup> = 3<sup>16</sup>. 27<sup>4</sup> · 3<sup>4</sup> = 3<sup>12</sup> · 3<sup>4</sup> = 3<sup>16</sup>."
      }
    ],

    // Telafi Havuzu
    retry: [
      {
        id: "l3_retry_1",
        type: "multiple_choice",
        title: "Telafi Sorusu 1: Üs Sadeleştirme",
        text: "(16<sup>2</sup> · 2<sup>4</sup>) / 8<sup>2</sup> işleminin sonucu kaçtır?",
        options: [
          { key: "A", text: "2<sup>6</sup>" },
          { key: "B", text: "2<sup>4</sup>" },
          { key: "C", text: "2<sup>8</sup>" },
          { key: "D", text: "2<sup>2</sup>" }
        ],
        correct: "A",
        hint: "16<sup>2</sup> = 2<sup>8</sup>, 8<sup>2</sup> = 2<sup>6</sup>. (2<sup>8</sup> · 2<sup>4</sup>) / 2<sup>6</sup> = 2<sup>12</sup> / 2<sup>6</sup> = 2<sup>6</sup>.",
        feedbackCorrect: "Tebrikler! 2<sup>12</sup> / 2<sup>6</sup> = 2<sup>6</sup>.",
        feedbackWrong: "Hepsini 2 tabanında yaz: Pay 2<sup>8+4</sup> = 2<sup>12</sup>. Payda 2<sup>6</sup>. 2<sup>12-6</sup> = 2<sup>6</sup>."
      },
      {
        id: "l3_retry_2",
        type: "fill_blank",
        title: "Telafi Sorusu 2: Basamak Sayısı",
        text: "8<sup>2</sup> · 5<sup>6</sup> sayısı kaç basamaklı bir doğal sayıdır?",
        correct: "7",
        acceptableAnswers: ["7"],
        hint: "8<sup>2</sup> = (2<sup>3</sup>)<sup>2</sup> = 2<sup>6</sup>. 2<sup>6</sup> · 5<sup>6</sup> = 10<sup>6</sup>. 1'in yanına 6 sıfır gelir.",
        feedbackCorrect: "Bravo! 2<sup>6</sup> · 5<sup>6</sup> = 10<sup>6</sup> = 1 000 000 (7 basamaklıdır).",
        feedbackWrong: "8<sup>2</sup> = 2<sup>6</sup>'dır. 2<sup>6</sup> · 5<sup>6</sup> = 10<sup>6</sup> olur. 1 sayısının arkasında 6 tane sıfır olduğuna göre toplam kaç basamaklıdır?"
      },
      {
        id: "l3_retry_3",
        type: "true_false",
        title: "Telafi Sorusu 3: Negatif Üs ve İşaret",
        text: "(-2)<sup>-2</sup> ifadesinin değeri -1/4'e eşittir.",
        options: [
          { key: "D", text: "DOĞRU" },
          { key: "Y", text: "YANLIŞ" }
        ],
        correct: "Y",
        hint: "Negatif sayının çift kuvveti her zaman POZİTİFTİR! (-2)<sup>-2</sup> = 1 / (-2)<sup>2</sup> = +1/4.",
        feedbackCorrect: "Tebrikler! Çift kuvvet negatif tabanı pozitif yapar: 1 / (-2)<sup>2</sup> = +1/4'tür. İfade YANLIŞTIR!",
        feedbackWrong: "Üsteki -2 çift sayıdır. Dolayısıyla (-2)<sup>-2</sup> = 1 / [(-2)<sup>2</sup>] = 1 / 4 (+0,25) olur, negatif olamaz!"
      }
    ]
  },

  // ==========================================
  // SEVİYE 4: LGS ŞAMPİYONLAR LİGİ (40 Puan)
  // Konular: Günlük hayat problemleri, bilimsel gösterim, çok büyük/küçük sayılar, alan/ölçme, örüntü
  // ==========================================
  level4: {
    name: "Seviye 4: LGS Şampiyonlar Ligi",
    points: 40,
    timeLimit: 60,
    minPassRatio: 0.7,
    kazanim: "Yeni nesil LGS problemlerini analiz eder, bilimsel gösterimi ve çok küçük/büyük sayıları günlük yaşamda kullanır.",

    // PEMBE TAKIM
    pink: [
      {
        id: "l4_p_q1",
        type: "multiple_choice",
        title: "Soru 1: Bilimsel Gösterim (Çok Küçük Sayı)",
        text: "Bir mikroskop altında incelenen bir virüsün uzunluğu 0,000000045 metre olarak ölçülmüştür. Bu virüsün uzunluğunun metre cinsinden <b>bilimsel gösterimi</b> hangisidir?",
        options: [
          { key: "A", text: "4,5 · 10<sup>-8</sup>" },
          { key: "B", text: "4,5 · 10<sup>-7</sup>" },
          { key: "C", text: "45 · 10<sup>-9</sup>" },
          { key: "D", text: "0,45 · 10<sup>-7</sup>" }
        ],
        correct: "A",
        hint: "Bilimsel gösterim a · 10<sup>n</sup> biçiminde olmalı ve 1 ≤ |a| < 10 şartını sağlamalıdır. Virgülü 4 ile 5 arasına getirmek için sağa kaç basamak kaydırırsın?",
        feedbackCorrect: "Mükemmel! Virgülü 8 basamak sağa kaydırdığımızda sayı 4,5 olur. Sağa kaydığı için üs negatifleşir: 4,5 · 10<sup>-8</sup> (1 ≤ 4,5 < 10).",
        feedbackWrong: "Bilimsel gösterim kuralı: Katsayı 1 ile 10 arasında olmalıdır (4,5). Virgülü sağa 8 basamak kaydırınca 10'un kuvveti -8 olur. Tekrar incele!"
      },
      {
        id: "l4_p_q2",
        type: "multiple_choice",
        title: "Soru 2: Bakteri Bölünmesi Problemi",
        text: "Bir biyoloji deneyinde bir bakteri türü her 20 dakikada bir 2'ye bölünerek çoğalmaktadır. Başlangıçta tüpte 4<sup>5</sup> adet bakteri olduğuna göre, <b>2 saatin sonunda</b> tüpte kaç bakteri olur?",
        options: [
          { key: "A", text: "2<sup>14</sup>" },
          { key: "B", text: "2<sup>16</sup>" },
          { key: "C", text: "2<sup>18</sup>" },
          { key: "D", text: "4<sup>8</sup>" }
        ],
        correct: "B",
        hint: "2 saat = 120 dakika. 120 / 20 = 6 kez bölünür. Başlangıç: 4<sup>5</sup> = (2<sup>2</sup>)<sup>5</sup> = 2<sup>10</sup>. 6 bölünmede 2<sup>6</sup> ile çarpılır.",
        feedbackCorrect: "Harika problem analizi! 2 saatte 6 kez bölünür: 2<sup>6</sup> katına çıkar. Başlangıç bakteri sayısı 4<sup>5</sup> = 2<sup>10</sup>'dur. Toplam = 2<sup>10</sup> · 2<sup>6</sup> = 2<sup>16</sup>.",
        feedbackWrong: "Adımları incele: 2 saatte 6 defa bölünür (120/20 = 6). Bu miktar 2<sup>6</sup> ile çarpılır. Başlangıçtaki 4<sup>5</sup> = 2<sup>10</sup> olduğuna göre: 2<sup>10</sup> · 2<sup>6</sup> kaçtır?"
      },
      {
        id: "l4_p_q3",
        type: "multiple_choice",
        title: "Soru 3: Kağıt Katlama ve Yüzey Alanı",
        text: "Alanı 4<sup>8</sup> mm<sup>2</sup> olan kare biçimindeki bir kağıt, tam ortasından üst üste gelecek şekilde art arda 3 kez katlanıyor. Son durumda oluşan şeklin görünen üst yüzey alanı kaç mm<sup>2</sup>'dir?",
        options: [
          { key: "A", text: "2<sup>11</sup>" },
          { key: "B", text: "2<sup>12</sup>" },
          { key: "C", text: "2<sup>13</sup>" },
          { key: "D", text: "2<sup>14</sup>" }
        ],
        correct: "C",
        hint: "Kağıt her katlandığında görünen yüzey alanı yarıya düşer (2'ye bölünür). 3 katlamada toplam 2<sup>3</sup> = 8'e bölünür. 4<sup>8</sup> = 2<sup>16</sup>'dır.",
        feedbackCorrect: "Tebrikler! Başlangıç alanı 4<sup>8</sup> = (2<sup>2</sup>)<sup>8</sup> = 2<sup>16</sup> mm<sup>2</sup>. 3 kez yarıya inince 2<sup>16</sup> / 2<sup>3</sup> = 2<sup>13</sup> mm<sup>2</sup> kalır!",
        feedbackWrong: "Katlama alan ilişkisi: Her katlamada alan yarıya iner (÷ 2). 3 kez katlanınca 2<sup>3</sup>'e bölünür. 2<sup>16</sup> / 2<sup>3</sup> işlemini düşün!"
      },
      {
        id: "l4_p_q4",
        type: "fill_blank",
        title: "Soru 4: 10'un Kuvvetleriyle Çözümleme",
        text: "4 · 10<sup>2</sup> + 7 · 10<sup>0</sup> + 3 · 10<sup>-1</sup> + 5 · 10<sup>-3</sup> biçiminde çözümlenen ondalık gösterim kaçtır? (Virgül kullanarak yazınız)",
        correct: "407,305",
        acceptableAnswers: ["407,305", "407.305"],
        hint: "Yüzler: 4, Onlar: 0, Birler: 7 -> 407. Onda birler: 3, Yüzde birler: 0, Binde birler: 5 -> ,305.",
        feedbackCorrect: "Kusursuz! Olmayan basamaklar yerine 0 yazılır: Yüzler(4), Onlar(0), Birler(7) -> 407, Onda birler(3), Yüzde birler(0), Binde birler(5) -> 407,305.",
        feedbackWrong: "Basamak değerlerini sırayla yaz: 10<sup>1</sup> (onlar) ve 10<sup>-2</sup> (yüzde birler) terimleri olmadığı için o basamaklara 0 yazılmalıdır: 407,305."
      },
      {
        id: "l4_p_q5",
        type: "multiple_choice",
        title: "Soru 5: LGS Tarzı Ağaçlandırma Problemi",
        text: "Bir fidan dikme kampanyasında 81 ilin her birine 3<sup>5</sup> adet fidan gönderilmiştir. Her ildeki fidanlar o ilde bulunan 3<sup>3</sup> farklı okula eşit olarak dağıtılırsa, <b>bir okula düşen fidan sayısı</b> kaç olur?",
        options: [
          { key: "A", text: "3<sup>2</sup>" },
          { key: "B", text: "3<sup>4</sup>" },
          { key: "C", text: "3<sup>6</sup>" },
          { key: "D", text: "3<sup>8</sup>" }
        ],
        correct: "A",
        hint: "Bir ildeki fidan sayısı 3<sup>5</sup>'tir. Bu fidanlar o ildeki 3<sup>3</sup> okula eşit paylaştırılıyor: 3<sup>5</sup> / 3<sup>3</sup> = ?",
        feedbackCorrect: "Harika odaklanma! Soru tek bir ildeki bir okula düşen fidanı soruyor: 3<sup>5</sup> / 3<sup>3</sup> = 3<sup>5-3</sup> = 3<sup>2</sup> = 9 fidan düşer.",
        feedbackWrong: "Dikkatli oku: Her ildeki fidanlar (3<sup>5</sup>) kendi ilindeki 3<sup>3</sup> okula paylaştırılıyor. 3<sup>5</sup> / 3<sup>3</sup> işleminin sonucu kaçtır?"
      }
    ],

    // MAVİ TAKIM
    blue: [
      {
        id: "l4_b_q1",
        type: "multiple_choice",
        title: "Soru 1: Bilimsel Gösterim (Çok Büyük Sayı)",
        text: "Güneş'in Samanyolu galaksisi merkezine olan uzaklığı yaklaşık 260 000 000 000 000 000 kilometredir. Bu uzaklığın kilometre cinsinden <b>bilimsel gösterimi</b> hangisidir?",
        options: [
          { key: "A", text: "26 · 10<sup>16</sup>" },
          { key: "B", text: "2,6 · 10<sup>17</sup>" },
          { key: "C", text: "2,6 · 10<sup>16</sup>" },
          { key: "D", text: "0,26 · 10<sup>18</sup>" }
        ],
        correct: "B",
        hint: "Bilimsel gösterimde katsayı 1 ≤ |a| < 10 olmalıdır: Virgülü 2 ile 6 arasına getirmek için en sağdan sola kaç basamak kaydırırsın?",
        feedbackCorrect: "Tebrikler! Virgülü sola 17 basamak kaydırınca sayı 2,6 · 10<sup>17</sup> olur. 1 ≤ 2,6 < 10 şartı sağlanır.",
        feedbackWrong: "Bilimsel gösterimde katsayı 1 ile 10 arasında olmalıdır (2,6). Virgül 17 basamak sola kaydığı için 10'un kuvveti +17 olur."
      },
      {
        id: "l4_b_q2",
        type: "multiple_choice",
        title: "Soru 2: Dijital Veri Depolama Problemi",
        text: "1 GB = 2<sup>10</sup> MB ve 1 MB = 2<sup>10</sup> KB'tır. 16 GB kapasiteli bir belleğe her biri 2<sup>8</sup> KB boyutunda olan dijital matematik testlerinden <b>en fazla kaç adet</b> yüklenebilir?",
        options: [
          { key: "A", text: "2<sup>14</sup>" },
          { key: "B", text: "2<sup>16</sup>" },
          { key: "C", text: "2<sup>18</sup>" },
          { key: "D", text: "2<sup>20</sup>" }
        ],
        correct: "B",
        hint: "16 GB = 2<sup>4</sup> · 2<sup>10</sup> · 2<sup>10</sup> KB = 2<sup>24</sup> KB. 2<sup>24</sup> KB belleği 2<sup>8</sup> KB'lık bir teste böl.",
        feedbackCorrect: "Mükemmel LGS çözümü! 16 GB = 2<sup>4</sup> · 2<sup>20</sup> KB = 2<sup>24</sup> KB. Test adedi = 2<sup>24</sup> / 2<sup>8</sup> = 2<sup>16</sup> adet!",
        feedbackWrong: "Toplam kapasiteyi KB'a çevir: 16 · 2<sup>10</sup> · 2<sup>10</sup> = 2<sup>4</sup> · 2<sup>20</sup> = 2<sup>24</sup> KB. Şimdi 2<sup>24</sup>'ü 2<sup>8</sup>'e böl: 2<sup>24 - 8</sup> kaçtır?"
      },
      {
        id: "l4_b_q3",
        type: "multiple_choice",
        title: "Soru 3: Pano Kesme ve Parça Alanı",
        text: "Alanı 9<sup>6</sup> cm<sup>2</sup> olan büyük bir ahşap pano, her adımda 3 eş parçaya kesilerek küçültülüyor. Bu kesme işlemi art arda 4 kez uygulandığında elde edilen <b>en küçük parçanın alanı</b> kaç cm<sup>2</sup> olur?",
        options: [
          { key: "A", text: "3<sup>6</sup>" },
          { key: "B", text: "3<sup>8</sup>" },
          { key: "C", text: "3<sup>9</sup>" },
          { key: "D", text: "3<sup>10</sup>" }
        ],
        correct: "B",
        hint: "Başlangıç alanı 9<sup>6</sup> = (3<sup>2</sup>)<sup>6</sup> = 3<sup>12</sup> cm<sup>2</sup>'dir. 4 kez 3 parçaya bölünürse toplam 3<sup>4</sup>'e bölünür.",
        feedbackCorrect: "Doğru yanıt! Başlangıç alanı 9<sup>6</sup> = 3<sup>12</sup> cm<sup>2</sup>. 4 defa 3'e bölünürse 3<sup>12</sup> / 3<sup>4</sup> = 3<sup>8</sup> cm<sup>2</sup> kalır!",
        feedbackWrong: "9<sup>6</sup>'yı 3 tabanına çevir: 3<sup>12</sup>. 4 kez 3'e bölmek 3<sup>4</sup>'e bölmek demektir: 3<sup>12</sup> / 3<sup>4</sup> = 3<sup>12 - 4</sup> = 3<sup>8</sup>."
      },
      {
        id: "l4_b_q4",
        type: "fill_blank",
        title: "Soru 4: 10'un Kuvvetleriyle Çözümleme",
        text: "5 · 10<sup>2</sup> + 8 · 10<sup>0</sup> + 2 · 10<sup>-1</sup> + 6 · 10<sup>-3</sup> biçiminde çözümlenen ondalık gösterim kaçtır? (Virgül kullanarak yazınız)",
        correct: "508,206",
        acceptableAnswers: ["508,206", "508.206"],
        hint: "Yüzler: 5, Onlar: 0, Birler: 8 -> 508. Onda birler: 2, Yüzde birler: 0, Binde birler: 6 -> ,206.",
        feedbackCorrect: "Tebrikler! Olmayan basamaklara 0 konur: Yüzler(5), Onlar(0), Birler(8) -> 508, Onda birler(2), Yüzde birler(0), Binde birler(6) -> 508,206.",
        feedbackWrong: "Dikkat: 10<sup>1</sup> ve 10<sup>-2</sup> basamakları soruda yer almadığı için değerleri 0'dır: 508,206."
      },
      {
        id: "l4_b_q5",
        type: "multiple_choice",
        title: "Soru 5: LGS Tarzı Geri Dönüşüm Problemi",
        text: "Bir geri dönüşüm projesinde 64 okulun her birinden 16 koli ve her koliden 2<sup>7</sup> adet mavi kapak toplanmıştır. Buna göre <b>yalnızca bir okuldan toplanan mavi kapak sayısı</b> üslü olarak kaçtır?",
        options: [
          { key: "A", text: "2<sup>9</sup>" },
          { key: "B", text: "2<sup>11</sup>" },
          { key: "C", text: "2<sup>13</sup>" },
          { key: "D", text: "2<sup>15</sup>" }
        ],
        correct: "B",
        hint: "Soru BİR okuldan toplanan kapak sayısını soruyor: Bir okulda 16 koli var, her kolide 2<sup>7</sup> kapak var. 16 = 2<sup>4</sup>'tür.",
        feedbackCorrect: "Bravo! Dikkatli okudunuz: Yalnızca bir okul sorulduğu için 16 · 2<sup>7</sup> = 2<sup>4</sup> · 2<sup>7</sup> = 2<sup>11</sup> kapak toplanmıştır!",
        feedbackWrong: "Soru köküne dikkat: Toplam kapak sayısı değil, tek bir okuldan toplanan kapak sayısı istenmektedir: 16 · 2<sup>7</sup> = 2<sup>4</sup> · 2<sup>7</sup> = 2<sup>11</sup>."
      }
    ],

    // Telafi Havuzu
    retry: [
      {
        id: "l4_retry_1",
        type: "multiple_choice",
        title: "Telafi Sorusu 1: Bilimsel Gösterim",
        text: "0,00032 sayısının bilimsel gösterimi hangisidir?",
        options: [
          { key: "A", text: "3,2 · 10<sup>-4</sup>" },
          { key: "B", text: "3,2 · 10<sup>-5</sup>" },
          { key: "C", text: "32 · 10<sup>-5</sup>" },
          { key: "D", text: "0,32 · 10<sup>-3</sup>" }
        ],
        correct: "A",
        hint: "Virgül 4 basamak sağa kaydırılır: 3,2 · 10<sup>-4</sup>.",
        feedbackCorrect: "Doğru! 3,2 · 10<sup>-4</sup> bilimsel gösterim kuralına uygundur.",
        feedbackWrong: "Virgülü 3 ile 2 arasına 4 basamak kaydırırız: 3,2 · 10<sup>-4</sup>."
      },
      {
        id: "l4_retry_2",
        type: "multiple_choice",
        title: "Telafi Sorusu 2: Kare Çevresi Problemi",
        text: "Bir kenar uzunluğu 8<sup>3</sup> mm olan kare şeklindeki bir bahçenin çevresi kaç mm'dir?",
        options: [
          { key: "A", text: "2<sup>10</sup>" },
          { key: "B", text: "2<sup>11</sup>" },
          { key: "C", text: "2<sup>12</sup>" },
          { key: "D", text: "4<sup>7</sup>" }
        ],
        correct: "B",
        hint: "8<sup>3</sup> = (2<sup>3</sup>)<sup>3</sup> = 2<sup>9</sup>. Çevre = 4 · kenar = 2<sup>2</sup> · 2<sup>9</sup> = ?",
        feedbackCorrect: "Harika! Kenar = 2<sup>9</sup> mm. Çevre = 4 · 2<sup>9</sup> = 2<sup>2</sup> · 2<sup>9</sup> = 2<sup>11</sup> mm.",
        feedbackWrong: "Karenin 4 kenarı vardır: 4 · 8<sup>3</sup> = 2<sup>2</sup> · (2<sup>3</sup>)<sup>3</sup> = 2<sup>2</sup> · 2<sup>9</sup> = 2<sup>11</sup>."
      },
      {
        id: "l4_retry_3",
        type: "fill_blank",
        title: "Telafi Sorusu 3: Çok Büyük Sayılarda Kuvvet",
        text: "120 000 000 sayısının bilimsel gösterimi 1,2 · 10<sup>n</sup> olduğuna göre n kaçtır?",
        correct: "8",
        acceptableAnswers: ["8"],
        hint: "Virgülü en sağdan 1 ile 2 arasına getirmek için sola kaç basamak kaydırırsın? Say!",
        feedbackCorrect: "Tebrikler! Virgül 8 basamak sola kaydırılır: 1,2 · 10<sup>8</sup>.",
        feedbackWrong: "Virgülü 120 000 000 sayısının en sonundan 1 ile 2 arasına kadar sayarak sola kaydır: 8 basamak ilerlenir!"
      }
    ]
  },

  // ==========================================
  // BERABERLİK / ALTIN SORULAR (Tie-Breaker)
  // ==========================================
  golden: [
    {
      id: "golden_1",
      type: "multiple_choice",
      title: "ALTIN SORU: Şampiyonluk Hamlesi",
      text: "(2<sup>20</sup> + 2<sup>20</sup>) / 2<sup>15</sup> işleminin sonucu kaçtır?",
      options: [
        { key: "A", text: "32" },
        { key: "B", text: "64" },
        { key: "C", text: "128" },
        { key: "D", text: "2<sup>25</sup>" }
      ],
      correct: "B",
      hint: "2<sup>20</sup> + 2<sup>20</sup> = 2 · 2<sup>20</sup> = 2<sup>21</sup>'dir. 2<sup>21</sup> / 2<sup>15</sup> = 2<sup>6</sup>.",
      feedbackCorrect: "İNANILMAZ BİR ÇÖZÜM! 2<sup>20</sup> + 2<sup>20</sup> = 2 · 2<sup>20</sup> = 2<sup>21</sup>'dir. 2<sup>21</sup> / 2<sup>15</sup> = 2<sup>6</sup> = 64!",
      feedbackWrong: "Toplama kuralını hatırla: İki tane 2<sup>20</sup>'nin toplamı 2 · 2<sup>20</sup> = 2<sup>21</sup> yapar. 2<sup>21</sup>'i 2<sup>15</sup>'e bölersen 2<sup>6</sup> = 64 kalır!"
    },
    {
      id: "golden_2",
      type: "fill_blank",
      title: "ALTIN SORU: Basamak Ustası",
      text: "25<sup>4</sup> · 8<sup>3</sup> sayısının sondan kaç basamağı sıfırdır?",
      correct: "8",
      acceptableAnswers: ["8"],
      hint: "25<sup>4</sup> = 5<sup>8</sup> ve 8<sup>3</sup> = 2<sup>9</sup> = 2 · 2<sup>8</sup>'dir. 2 · (2 · 5)<sup>8</sup> = 2 · 10<sup>8</sup>.",
      feedbackCorrect: "ŞAMPİYONLUK CEVABI! 25<sup>4</sup> = 5<sup>8</sup>, 8<sup>3</sup> = 2<sup>9</sup> = 2 · 2<sup>8</sup>. Sayı 2 · 10<sup>8</sup> olur ve sondan tam 8 basamağı sıfırdır!",
      feedbackWrong: "5 ve 2 tabanlarına çevir: (5<sup>2</sup>)<sup>4</sup> = 5<sup>8</sup> ve (2<sup>3</sup>)<sup>3</sup> = 2<sup>9</sup>. 5<sup>8</sup> ile 2<sup>8</sup> birleşerek 10<sup>8</sup> oluşturur; dolayısıyla 8 tane sıfır oluşur!"
    }
  ]
};

if (typeof window !== 'undefined') {
  window.QUESTION_BANK = QUESTION_BANK;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QUESTION_BANK;
}

