/**
 * Asal Dedektif: Çarpanlar ve Katlar Macerası - Soru Bankası ve Pedagojik Veriler
 */

const GAME_DATA = {
  // =========================================================================
  // SEVİYE 1: ÇARPAN AVCISI (Gökkuşağı Yöntemi - Temel / Kolay)
  // =========================================================================
  level1: [
    {
      id: "l1_q1",
      target: 24,
      title: "24'ün Tüm Pozitif Çarpanları",
      allFactors: [1, 2, 3, 4, 6, 8, 12, 24],
      missingFactors: [4, 8, 12],
      options: [4, 5, 8, 9, 12, 16],
      pairs: [
        { a: 1, b: 24, color: "rainbow-arc-1" },
        { a: 2, b: 12, color: "rainbow-arc-2" },
        { a: 3, b: 8, color: "rainbow-arc-3" },
        { a: 4, b: 6, color: "rainbow-arc-4" }
      ],
      isPerfectSquare: false,
      totalCount: 8,
      explanation: "24 sayısının 8 adet çarpanı vardır: 1×24, 2×12, 3×8, 4×6. Gökkuşağı gibi baştan ve sondan eşleşirler!"
    },
    {
      id: "l1_q2",
      target: 36,
      title: "36'nın Çarpanları (Tam Kare Sayı Sırrı)",
      allFactors: [1, 2, 3, 4, 6, 9, 12, 18, 36],
      missingFactors: [3, 6, 18],
      options: [3, 5, 6, 8, 18, 24],
      pairs: [
        { a: 1, b: 36, color: "rainbow-arc-1" },
        { a: 2, b: 18, color: "rainbow-arc-2" },
        { a: 3, b: 12, color: "rainbow-arc-3" },
        { a: 4, b: 9, color: "rainbow-arc-4" },
        { a: 6, b: 6, color: "rainbow-arc-5" }
      ],
      isPerfectSquare: true,
      totalCount: 9,
      explanation: "36 = 6×6 olduğu için 6 sayısı bir kez sayılır. Bu yüzden 36'nın 9 tane (TEK SAYIDA) çarpanı vardır! Tam kare sayıların çarpan sayısı daima tektir."
    },
    {
      id: "l1_q3",
      target: 45,
      title: "45'in Tüm Çarpanları",
      allFactors: [1, 3, 5, 9, 15, 45],
      missingFactors: [3, 9, 15],
      options: [2, 3, 7, 9, 15, 20],
      pairs: [
        { a: 1, b: 45, color: "rainbow-arc-1" },
        { a: 3, b: 15, color: "rainbow-arc-2" },
        { a: 5, b: 9, color: "rainbow-arc-3" }
      ],
      isPerfectSquare: false,
      totalCount: 6,
      explanation: "45 sayısının 6 adet çarpanı vardır: 1×45, 3×15, 5×9."
    },
    {
      id: "l1_q4",
      target: 60,
      title: "60'ın Çarpan Zenginliği",
      allFactors: [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60],
      missingFactors: [4, 10, 15, 30],
      options: [4, 8, 10, 15, 25, 30],
      pairs: [
        { a: 1, b: 60, color: "rainbow-arc-1" },
        { a: 2, b: 30, color: "rainbow-arc-2" },
        { a: 3, b: 20, color: "rainbow-arc-3" },
        { a: 4, b: 15, color: "rainbow-arc-4" },
        { a: 5, b: 12, color: "rainbow-arc-5" },
        { a: 6, b: 10, color: "rainbow-arc-1" }
      ],
      isPerfectSquare: false,
      totalCount: 12,
      explanation: "60 sayısının toplam 12 adet pozitif çarpanı bulunmaktadır."
    }
  ],

  // =========================================================================
  // SEVİYE 2: ASAL KALKAN & TUZAK SAYILAR (Orta Seviye)
  // =========================================================================
  level2: [
    {
      id: "l2_q1",
      number: 91,
      isPrime: false,
      trapReason: "91 = 7 × 13'tür! LGS'nin en meşhur tuzağıdır. Asal gibi görünür ama 7 ve 13'e bölünür.",
      factors: [1, 7, 13, 91],
      ruleTip: "💡 91 sayısı 7'ye bölündüğünde 13 kalır (7×13 = 91), ASAL DEĞİLDİR!"
    },
    {
      id: "l2_q2",
      number: 51,
      isPrime: false,
      trapReason: "51 sayısının rakamları toplamı 5 + 1 = 6'dır (3'ün katı). 51 = 3 × 17 olduğundan ASAL DEĞİLDİR.",
      factors: [1, 3, 17, 51],
      ruleTip: "💡 Bir sayının rakamları toplamı 3'ün katıysa o sayı 3'e bölünür, asal olamaz!"
    },
    {
      id: "l2_q3",
      number: 2,
      isPrime: true,
      trapReason: "2 sayısı ÇİFT olan TEK asal sayıdır ve EN KÜÇÜK asal sayıdır!",
      factors: [1, 2],
      ruleTip: "💡 2'den başka çift asal sayı yoktur!"
    },
    {
      id: "l2_q4",
      number: 1,
      isPrime: false,
      trapReason: "1 asal sayı DEĞİLDİR! Bir sayının asal olması için tam olarak 2 farklı pozitif böleni (1 ve kendisi) olmalıdır.",
      factors: [1],
      ruleTip: "💡 Asal sayılar 2'den başlar: 2, 3, 5, 7, 11, 13..."
    },
    {
      id: "l2_q5",
      number: 57,
      isPrime: false,
      trapReason: "57 = 3 × 19'dur (5 + 7 = 12, 3'e bölünür). Bu yüzden asal değildir.",
      factors: [1, 3, 19, 57],
      ruleTip: "💡 5 + 7 = 12 (3'e kalansız bölünür)."
    },
    {
      id: "l2_q6",
      number: 43,
      isPrime: true,
      trapReason: "43 sadece 1'e ve 43'e tam bölünür. Gerçek bir asal sayıdır!",
      factors: [1, 43],
      ruleTip: "💡 43 hiçbir küçük asal sayıya (2, 3, 5, 7) bölünmez."
    }
  ],

  // =========================================================================
  // SEVİYE 3: ARALARINDA ASAL DEDEKTİFİ (Orta - İleri)
  // =========================================================================
  level3: [
    {
      id: "l3_q1",
      pair: [8, 9],
      isCoprime: true,
      commonDivisors: [1],
      reason: "8 = 2³ ve 9 = 3² sayıları asal değildir ama 1'den başka ortak bölenleri OLMADIĞI için **Aralarında Asaldır!** Ayrıca ardışık sayılar her zaman aralarında asaldır.",
      ruleBadge: "Ardışık Sayılar Kuralı"
    },
    {
      id: "l3_q2",
      pair: [15, 25],
      isCoprime: false,
      commonDivisors: [1, 5],
      reason: "15 ve 25 sayılarının her ikisi de 5'e tam bölünür (EBOB = 5). 1 dışında ortak böleni olduğu için **Aralarında Asal Değildir.**",
      ruleBadge: "Ortak Bölen: 5"
    },
    {
      id: "l3_q3",
      pair: [1, 48],
      isCoprime: true,
      commonDivisors: [1],
      reason: "1 sayısı BÜTÜN pozitif tam sayılarla **Aralarında Asaldır.**",
      ruleBadge: "1 ile Asallık Kuralı"
    },
    {
      id: "l3_q4",
      pair: [14, 15],
      isCoprime: true,
      commonDivisors: [1],
      reason: "14 ve 15 ardışık sayılardır. Ardışık doğal sayıların 1'den başka ortak böleni olamaz, daima aralarında asaldır!",
      ruleBadge: "Ardışık Sayılar Kuralı"
    },
    {
      id: "l3_q5",
      pair: [26, 39],
      isCoprime: false,
      commonDivisors: [1, 13],
      reason: "26 = 2 × 13 ve 39 = 3 × 13'tür. Her ikisi de 13'e bölünür (EBOB = 13). Aralarında asal değildir!",
      ruleBadge: "Tuzak Ortak Bölen: 13"
    },
    {
      id: "l3_q6",
      pair: [21, 22],
      isCoprime: true,
      commonDivisors: [1],
      reason: "21 ve 22 ardışık sayılardır, EBOB(21, 22) = 1 olduğu için aralarında asaldır.",
      ruleBadge: "Ardışık Sayılar Kuralı"
    }
  ],

  // =========================================================================
  // SEVİYE 4: LGS ŞAMPİYONLUK MEYDAN OKUMASI (İleri - Mantık & Strateji)
  // =========================================================================
  level4: [
    {
      id: "l4_q1",
      title: "Görev 1: Ortak Kenarlı Dikdörtgen Alanları",
      story: "Kenar uzunlukları santimetre cinsinden birer tam sayı olan iki dikdörtgenin alanları **$48\\text{ cm}^2$** ve **$72\\text{ cm}^2$**'dir. Bu iki dikdörtgenin birer kenarı ortaktır. **Ortak kenar uzunluğu bir ASAL SAYI olduğuna göre**, ortak kenar EN FAZLA kaç cm olabilir?",
      correctAnswer: 3,
      options: [2, 3, 6, 12],
      hints: [
        "💡 1. İpucu: Ortak kenar, hem 48'in hem de 72'nin ortak böleni (çarpanı) olmalıdır.",
        "💡 2. İpucu: 48 ve 72'nin ortak bölenleri: 1, 2, 3, 4, 6, 8, 12, 24'tür. Bunlardan ASAL olanlar yalnızca 2 ve 3'tür. En büyüğü 3'tür."
      ],
      solution: {
        steps: [
          "48 ve 72'nin ortak bölenleri bulunur: 1, 2, 3, 4, 6, 8, 12, 24.",
          "Soruda ortak kenarın 'ASAL SAYI' olduğu belirtilmiştir.",
          "Ortak bölenler içindeki asal sayılar: {2, 3}.",
          "Asal olanların en büyüğü: 3 cm'dir."
        ]
      }
    },
    {
      id: "l4_q2",
      title: "Görev 2: Aralarında Asal Kart Seçimi",
      story: "Masa üzerinde üzerlerinde **12, 25, 27 ve 35** yazan 4 adet kart bulunmaktadır. Bir öğrenci bu kartlardan **aralarında asal olan iki kart** seçecektir. Seçilen bu iki kartın üzerindeki sayıların toplamı **EN FAZLA** kaç olabilir?",
      correctAnswer: 62,
      options: [52, 60, 62, 70],
      hints: [
        "💡 1. İpucu: Toplamın en fazla olması için en büyük sayılardan (35 ve 27) başlamalısın.",
        "💡 2. İpucu: 35 = 5 × 7 ve 27 = 3³. Ortak asal çarpanları yoktur! EBOB(27, 35) = 1. Toplam: 27 + 35 = 62."
      ],
      solution: {
        steps: [
          "En büyük iki sayı: 35 ve 27.",
          "35'in asal çarpanları: {5, 7}",
          "27'nin asal çarpanları: {3}",
          "Ortak bölenleri yalnızca 1'dir, yani 27 ve 35 aralarında asaldır.",
          "Maksimum toplam = 27 + 35 = 62 olur."
        ]
      }
    },
    {
      id: "l4_q3",
      title: "Görev 3: Tam Kare Çarpan Kilidi",
      story: "Bir kasanın şifresi, pozitif çarpan sayısı **TEK ADET** olan 2 basamaklı bir tam kare sayıdır. Aşağıdaki sayılardan hangisinin pozitif çarpan sayısı tek adettir?",
      correctAnswer: 64,
      options: [48, 54, 64, 72],
      hints: [
        "💡 1. İpucu: Bir sayının pozitif çarpan sayısının tek olması için o sayının bir tam kare sayı (kendi kendisiyle çarpılan $a^2$) olması gerekir.",
        "💡 2. İpucu: Seçenekler arasında $8^2 = 64$ tam karedir. 64'ün çarpanları: 1, 2, 4, 8, 16, 32, 64 (Toplam 7 adet çarpan!)."
      ],
      solution: {
        steps: [
          "Kural: Pozitif çarpan sayısı yalnızca TAM KARE sayılarda tektir.",
          "64 = 8² tam karedir.",
          "64'ün çarpanları: {1, 2, 4, 8, 16, 32, 64} $\\rightarrow$ Toplam 7 adet (Tek sayı!).",
          "Diğer sayıların çarpan sayıları çifttir (48 $\\rightarrow$ 10 adet, 54 $\\rightarrow$ 8 adet, 72 $\\rightarrow$ 12 adet)."
        ]
      }
    }
  ]
};
